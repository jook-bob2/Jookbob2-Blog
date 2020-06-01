package com.management.service;

import java.util.List;

import com.management.domain.ManagementDTO;

public interface ManagementService {
	public void deleteManagement(Long id);
	public List<ManagementDTO> getManagementList();
	public void customerAdd(ManagementDTO dto);
}
