package com.management.service.admin;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.management.domain.model.Admin;

public interface AdminService {
	public void registration(Admin entity) throws SQLException;
	public List<Map<String, Object>> adminList(Map<String, Object> param);
	public void adminUdpate(Map<String, Object> param);
}
