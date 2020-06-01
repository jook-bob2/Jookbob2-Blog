package com.management.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.management.domain.model.Product;
import com.management.domain.repository.ProductRepository;

@RestController
public class ProductController {
	@Autowired
	private ProductRepository productRepository;

	@GetMapping("/hello")
	public String hello() {
		return "Hello World";
	}

	@GetMapping("/create")
	public void create(Product product) {
		productRepository.save(product);
	}

	@GetMapping("/readOne")
	public Optional readOne(Long id) {
		return productRepository.findById(id);
	}

	@GetMapping("/readAll")
	public List readAll() {
		return productRepository.findAll();
	}

	@GetMapping("/update")
	public void update(Product product, Long id) {
		productRepository.update(product, id);
	}

	@GetMapping("/delete")
	public void delete(Long id) {
		productRepository.deleteById(id);
	}
	
}
