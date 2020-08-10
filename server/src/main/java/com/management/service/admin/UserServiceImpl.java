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
import com.management.domain.repository.user.MemberRepository;
import com.management.mapper.admin.AdminMapper;
import com.management.mapper.admin.UserMapper;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
	
	@Autowired
	private MemberRepository memberRepository;
	
	@Autowired
	private UserMapper userMapper;
	
	@Autowired
	PasswordEncoder passwordEncoder;

	@Transactional
	public void registration(Member entity) throws SQLException {
		memberRepository.save(entity);
	}

	@Override
	public List<Map<String, Object>> userList(Map<String, Object> param) {
		return userMapper.userList(param);
	}

	@Override
	public void userUpdate(Map<String, Object> param) {
		userMapper.userUpdate(param);
	}
}
