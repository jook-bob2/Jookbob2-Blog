package com.management.service.admin;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import com.management.domain.model.Admin;

public interface AdminService {
	public void registration(Admin entity) throws SQLException;
	public List<Map<String, Object>> adminList(Map<String, Object> param);
	public void adminUdpate(Map<String, Object> param);
	public String pwCheck(Map<String, Object> map);
	public Boolean loginCheck(Admin entity, HttpSession session);
	public void adminRestoreChk(List<Long> checkArr);
	public void adminSecChk(List<Long> checkArr);
}
