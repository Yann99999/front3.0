package br.senai.suico.RestauranteX.model.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import br.senai.suico.RestauranteX.model.entity.Files;
import br.senai.suico.RestauranteX.model.entity.Produto;

public interface FilesRepository extends JpaRepository<Files, UUID> {
    public Optional<Files> findByProduto(Produto produto); 
}
