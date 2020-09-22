package com.management.service.user;

import java.sql.SQLException;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.management.domain.model.Member;
import com.management.domain.repository.user.MemberRepository;
import com.management.mapper.user.MemberMapper;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class MemberServiceImpl implements MemberService {
	@Autowired
	private MemberRepository memberRepository;
	
	@Autowired
	private MemberMapper memberMapper;
	
	@Autowired
	PasswordEncoder passwordEncoder;

	@Transactional
	public Long joinMember(Member entity) throws SQLException {
		if (entity.getPasswd() != null) {
			entity.setPasswd(passwordEncoder.encode(entity.getPasswd()));
		}
		return memberRepository.save(entity).getMemberNo();
	}

	@Override
	public int idCheck(Map<String, Object> map) {
		return memberMapper.idCheck(map);
	}

	@Override
	public int emailCheck(Map<String, Object> map) {
		return memberMapper.emailCheck(map);
	}

	@Override
	public String pwCheck(Map<String, Object> map) {
		return memberMapper.pwCheck(map);
	}

	@Override
	public Boolean loginCheck(Member entity, HttpSession session) {
		return memberMapper.loginCheck(entity);
	}

	@Override
	public void uploadPicture(Member entity) {
		memberMapper.uploadPicture(entity);
	}

}
