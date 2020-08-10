package com.management.mapper.admin;


import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
	public List<Map<String, Object>> userList(Map<String, Object> param);
	public int userCnt(Map<String, Object> param);
	public int phoneCheck(Map<String, Object> param);
	public int userIdCheck(Map<String, Object> param);
	public int userEmailCheck(Map<String, Object> param);
	public int userPhoneCheck(Map<String, Object> param);
	public Map<String, Object> userUpdateList(String adminId);
	public void userUpdate(Map<String, Object> param);
}
