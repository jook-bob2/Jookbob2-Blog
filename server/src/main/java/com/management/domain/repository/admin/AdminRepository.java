package com.management.domain.repository.admin;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.management.domain.model.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long>{ 
	Optional<Admin> findByEmail(String userEmail);
}