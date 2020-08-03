package com.management.service.admin;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.management.domain.model.Admin;
import com.management.domain.model.Member;
import com.management.domain.repository.admin.AdminRepository;
import com.management.mapper.admin.AdminMapper;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AdminServiceImpl implements AdminService {
	@Autowired
	private AdminRepository adminRepository;
	
	@Autowired
	private AdminMapper adminMapper;
	
	@Autowired
	PasswordEncoder passwordEncoder;

	@Transactional
	public void registration(Admin entity) throws SQLException {
		adminRepository.save(entity);
	}

	@Override
	public List<Map<String, Object>> adminList(Map<String, Object> param) {
		return adminMapper.adminList(param);
	}

	@Override
	public void adminUdpate(Map<String, Object> param) {
		adminMapper.adminUpdate(param);
	}
}
