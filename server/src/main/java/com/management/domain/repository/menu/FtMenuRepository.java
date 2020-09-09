package com.management.domain.repository.menu;

import org.springframework.data.jpa.repository.JpaRepository;

import com.management.domain.model.FtMenu;

public interface FtMenuRepository extends JpaRepository<FtMenu, Long>{ 
	
}