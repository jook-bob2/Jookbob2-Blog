package com.management.domain.repository.hateReply;

import org.springframework.data.jpa.repository.JpaRepository;

import com.management.domain.model.HateReply;


public interface HateReplyRepository extends JpaRepository<HateReply, Long>{ 
	
}