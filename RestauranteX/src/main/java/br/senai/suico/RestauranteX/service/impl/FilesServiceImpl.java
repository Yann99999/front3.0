package br.senai.suico.RestauranteX.service.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import br.senai.suico.RestauranteX.model.dto.ProdutoDto;
import br.senai.suico.RestauranteX.model.entity.Files;
import br.senai.suico.RestauranteX.model.repository.FilesRepository;
import br.senai.suico.RestauranteX.model.repository.ProdutoRepository;
import br.senai.suico.RestauranteX.service.FilesService;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Service
public class FilesServiceImpl implements FilesService {


	static final Logger LOG = LogManager.getLogger(FilesServiceImpl.class);
	FilesRepository filesRepository;
	ProdutoRepository produtoRepository;
	
	public FilesServiceImpl(FilesRepository filesRepository, ProdutoRepository produtoRepository) {
		super();
		this.filesRepository = filesRepository;
		this.produtoRepository = produtoRepository;
	}
	
	@Override
	public Files save(MultipartFile file, Long produtoId) {
		try {
			return uploadFile(file, produtoId);

		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}

		return null;
	}
	
	public Files uploadFile(MultipartFile file, Long produtoId) throws IOException {
		byte[] data = file.getBytes();
		String filename = file.getOriginalFilename();
		String type = file.getContentType();
		validateFileName(filename);
		System.out.print("PASSOU");

		
		var produto = produtoRepository.findById(produtoId);
		if (produto.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product[" + produtoId + "] not found");
		}

		var prod = produto.get();

		var image = filesRepository.findByProduto(prod);
		Files files;

		if (image.isPresent()) {
			files = image.get();
			files.setData(data);
			files.setFilename(filename);
			files.setProduto(prod);
		} else {
			files = Files.builder().filename(filename).data(data).type(type).produto(prod).build();

		}
		var files1 = filesRepository.saveAndFlush(files);
		prod.setFiles(files1);
		produtoRepository.save(prod);

		return files;
	}

	private void validateFileName(String filename) {
		if (filename.contains("..")) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
					"Sorry! filename contains invalid path sequence[" + filename + "] ");

		}
	}


	@Override
	public byte[] getDocumentFile(Long produtoId) {
		var prod = produtoRepository.findById(produtoId);
		if (prod.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product[" + produtoId + "] not found");
		}

		var image = filesRepository.findByProduto(prod.get());

		if (image.isPresent()) {
			return image.get().getData();
		}
		return null;
	}


	@Override
	public List<ProdutoDto> buscarTodos() {
		var listaFiles =filesRepository.findAll();

		List<ProdutoDto> lstDto = new ArrayList<ProdutoDto>();
		listaFiles.forEach(item ->
		{ lstDto.add(item.toMapperDto()); });
		
		return lstDto;
	}

}
