package com.management.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.management.domain.ManagementDTO;
import com.management.mapper.ManagementMapper;

@Service
public class ManagementServiceImpl implements ManagementService {

	@Autowired
	private ManagementMapper managementMapper;

	@Override
	public void deleteManagement(Long id) {
		managementMapper.deleteManagement(id);
	}

	@Override
	public List<ManagementDTO> getManagementList() {
		return managementMapper.selectManagementList();
	}

	@Override
	public void customerAdd(ManagementDTO dto) {
		managementMapper.insertCustomer(dto);
	}
}
