package br.senai.suico.RestauranteX.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProdutoDto {

	     
	   private Long id;
	   
	   private String nomeProduto;
	   
	   private String filename;

	   private String imagemBase64;
	   

}
