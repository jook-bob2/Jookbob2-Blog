package com.management.service.admin;

import java.sql.SQLException;
import com.management.domain.model.Admin;

public interface AdminService {
	public void registration(Admin entity) throws SQLException;
}
