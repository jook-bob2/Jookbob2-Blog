package com.management.domain.repository.notice;

import org.springframework.data.jpa.repository.JpaRepository;
import com.management.domain.model.Notice;


public interface NoticeRepository extends JpaRepository<Notice, Long>{ 

}