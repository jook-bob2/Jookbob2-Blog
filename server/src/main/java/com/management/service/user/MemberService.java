package com.management.service.user;

import java.sql.SQLException;
import java.util.Map;

import javax.servlet.http.HttpSession;

import com.management.domain.model.Member;

public interface MemberService {
	public Long joinMember(Member entity) throws SQLException;
	public int idCheck(Map<String, Object> map);
	public int emailCheck(Map<String, Object> map);
	public String pwCheck(Map<String, Object> map);
	public Boolean loginCheck(Member entity, HttpSession session);
}
