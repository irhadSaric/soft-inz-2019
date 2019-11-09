package ba.unsa.pmf.pragma.web;

import java.util.Collections;
import java.util.Date;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@EnableSwagger2
@Configuration
public class SwaggerConfig {
	
	@Bean
	public Docket api() {		
		return new Docket(DocumentationType.SWAGGER_2)
				.select()
				.apis(RequestHandlerSelectors.basePackage("ba.unsa.pmf.pragma.controller"))
				.paths(PathSelectors.any())
				.build()
				.apiInfo(apiInfo())
				.useDefaultResponseMessages(false)
				.directModelSubstitute(Date.class, Integer.class);
	}
	
	private ApiInfo apiInfo() {
	    return new ApiInfo(
	    		"Pragma API", 
	    		"Backend API for Pragma application.", 
	    		"v1", 
	    		null, 
	    		new Contact("Pragma", null, null), 
	    		null, 
	    		null, 
	    		Collections.emptyList());
	}
}
