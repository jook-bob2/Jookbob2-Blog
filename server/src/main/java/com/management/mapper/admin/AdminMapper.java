package com.management.mapper.admin;


import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.management.domain.model.Member;

@Mapper
public interface AdminMapper {
	public int idCheck(Map<String, Object> map);
	public int emailCheck(Map<String, Object> map);
	public String pwCheck(Map<String, Object> map);
	public Boolean loginCheck(Member entity);
	public Map<String, Object> viewMember(Map<String, Object> map);
	public void uploadPicture(Member entity);
	public void saveProfile(Member entity);
}
