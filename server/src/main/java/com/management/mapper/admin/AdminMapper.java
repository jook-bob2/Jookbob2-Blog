package com.management.mapper.admin;


import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;

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
}
