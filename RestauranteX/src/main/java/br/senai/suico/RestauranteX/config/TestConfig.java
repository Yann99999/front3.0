package br.senai.suico.RestauranteX.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import br.senai.suico.RestauranteX.service.DBService;



@Configuration
@Profile("test")
public class TestConfig {

	@Autowired
	private DBService dbService;

	@Value("${spring.jpa.hibernate.ddl-auto}")
	private String ddl;

	@Bean
	public boolean instanciaDB() {
		if (ddl.equals("create")) {
			this.dbService.instanciaDB();
		}
		return false;
	}

}
