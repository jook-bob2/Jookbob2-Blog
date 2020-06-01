package com.management.domain.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

//@NoArgsConstructor(access = AccessLevel.PROTECTED) 
@Getter 
@Entity 
public class Product { 
    @Id 
    @GeneratedValue 
    private Long id; 

    @Column(length = 20, nullable = false) 
    private String name; 

    @Column(nullable = false) 
    private Integer price; 

    @Column(nullable = true)
    private String memo; 
    
    public Product() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Builder 
    public Product(String name, Integer price, String memo) { 
        this.name = name; 
        this.price = price; 
        this.memo = memo; 
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getPrice() {
		return price;
	}

	public void setPrice(Integer price) {
		this.price = price;
	}

	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}
	
	
}