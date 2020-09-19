package com.management.service.admin;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.management.domain.model.Member;

public interface UserService {
	public List<Map<String, Object>> userList(Map<String, Object> param);
	public void registration(Member entity) throws SQLException;
	public void userUpdate(Map<String, Object> param);
	public void userSecChk(List<Long> checkArr);
	public void userRestoreChk(List<Long> checkArr);
}
