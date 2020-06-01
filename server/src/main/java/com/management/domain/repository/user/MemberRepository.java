package com.management.domain.repository.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.management.domain.model.Member;

public interface MemberRepository extends JpaRepository<Member, Long>{ 
	Optional<Member> findByEmail(String userEmail);
}