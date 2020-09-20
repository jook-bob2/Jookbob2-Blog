package com.management.mapper.admin;


import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.management.domain.model.Admin;

@Mapper
public interface AdminMapper {
	public List<Map<String, Object>> adminList(Map<String, Object> param);
	public int adminCnt(Map<String, Object> param);
	public int userCnt(Map<String, Object> param);
	public int idCheck(Map<String, Object> param);
	public int emailCheck(Map<String, Object> param);
	public int phoneCheck(Map<String, Object> param);
	public Map<String, Object> adminUpdateList(String adminId);
	public void adminUpdate(Map<String, Object> param);
	public String pwCheck(Map<String, Object> param);
	public Boolean loginCheck(Admin entity);
	public Map<String, Object> viewMember(Map<String, Object> map);
	public void adminSec(long adminNo);
	public void adminRestore(long adminNo);
}
