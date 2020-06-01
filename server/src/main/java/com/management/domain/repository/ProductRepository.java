package com.management.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.management.domain.model.Product; 

public interface ProductRepository extends JpaRepository<Product, Long>{ 

@Modifying
@Transactional
@Query(value="UPDATE management.product m SET m.name=:#{#product.name}, m.memo=:#{#product.memo}, m.price=:#{#product.price} WHERE m.id = :id", nativeQuery=true)
	void update(@Param("product") Product product, @Param("id") Long id);
}