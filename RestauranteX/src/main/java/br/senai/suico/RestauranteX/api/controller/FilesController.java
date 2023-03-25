package br.senai.suico.RestauranteX.api.controller;

import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import br.senai.suico.RestauranteX.model.dto.ProdutoDto;
import br.senai.suico.RestauranteX.model.entity.Files;
import br.senai.suico.RestauranteX.service.impl.FilesServiceImpl;


@RequestMapping("/api")
@RestController
public class FilesController {
	@Autowired
	FilesServiceImpl service;

	
	@PostMapping("/uploadfile/{produtoId}")
	public  ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file, 
			@PathVariable (name="produtoId") Long produtoId ){
		Files files =service.save(file,produtoId);
		
		return ResponseEntity.ok(ServletUriComponentsBuilder.fromCurrentContextPath()
				.path("/downloadFile/").path(files.getId().toString()).toString());
		
	}
	
	 @GetMapping(value = "/getimage/{id}")   
	    public @ResponseBody Map<String, String> getImage(@PathVariable Long id) {
	         
	        byte[] image= service.getDocumentFile(id);
	        
	        if (image != null) {
	        	 String encodeImage = Base64.getEncoder().withoutPadding().encodeToString( image); 
	 	        Map<String, String> jsonMap = new HashMap<String, String>(); 
	 	        jsonMap.put("content", encodeImage); 
	 	       return jsonMap;     	
	        }
	        return null;
	       
	    }
	
		@GetMapping("/produtosimage")   
		public List<ProdutoDto> buscarTodos() {
			return service.buscarTodos();
		}
	
}
