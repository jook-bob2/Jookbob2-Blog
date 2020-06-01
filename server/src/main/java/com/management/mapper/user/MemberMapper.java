package com.management.mapper.user;


import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.management.domain.model.Member;

@Mapper
public interface MemberMapper {
	public int idCheck(Map<String, Object> map);
	public int emailCheck(Map<String, Object> map);
	public String pwCheck(Map<String, Object> map);
	public Boolean loginCheck(Member entity);
	public String viewMember(Map<String, Object> map);
}
