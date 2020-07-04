package com.management.domain.repository.upload;

import org.springframework.data.jpa.repository.JpaRepository;

import com.management.domain.model.Upload;

public interface UploadRepository extends JpaRepository<Upload, Long>{ 

}