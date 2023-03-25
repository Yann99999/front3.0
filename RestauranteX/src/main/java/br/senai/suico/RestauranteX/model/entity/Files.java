package br.senai.suico.RestauranteX.model.entity;

import java.time.LocalDateTime;
import java.util.Base64;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import br.senai.suico.RestauranteX.model.dto.ProdutoDto;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="files")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Files {
   @Id
   @GeneratedValue(strategy = GenerationType.AUTO)
   private Long id;
   
   @Column(name="create_at")
   @JsonFormat(pattern="dd-MM-yyyy HH:mm:ss")
   private LocalDateTime createdAt;
   
   @Column(name="updated_at")
   @JsonFormat(pattern="dd-MM-yyyy HH:mm:ss")
   private LocalDateTime updatedAt;
   
   private String filename;

   @Column(columnDefinition = "MEDIUMBLOB")
   private byte[] data;
   

   private String type;
   
   @JsonIgnore
   @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
   @JoinColumn(name= "produto_id", referencedColumnName ="id")
   private Produto produto;
   
   @PrePersist
   protected void onCreate() {
	   this.createdAt = LocalDateTime.now();
   }
   
   @PreUpdate
   protected void onUpdate() {
	   this.updatedAt = LocalDateTime.now();
   }

	public ProdutoDto toMapperDto() {	
		
	 	 String encodeImage = Base64.getEncoder().withoutPadding().encodeToString( data); 
	 	 String nome = produto.getNome();
	 	 
	 	   
		var dto=  ProdutoDto.builder().id(produto.getId()).nomeProduto(nome).filename(filename).imagemBase64(encodeImage).build();
		
		
	
		return dto;
	}

}
