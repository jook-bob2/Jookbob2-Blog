package com.management.domain.repository.likeReply;

import org.springframework.data.jpa.repository.JpaRepository;
import com.management.domain.model.LikeReply;


public interface LikeReplyRepository extends JpaRepository<LikeReply, Long>{ 
	
}