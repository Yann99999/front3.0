package br.senai.suico.RestauranteX.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;


import br.senai.suico.RestauranteX.model.dto.ProdutoDto;
import br.senai.suico.RestauranteX.model.entity.Files;

public interface FilesService {
   Files save(MultipartFile file, Long produtoId);
   public byte[] getDocumentFile(Long produtoId);

   public List<ProdutoDto> buscarTodos();
   
}
