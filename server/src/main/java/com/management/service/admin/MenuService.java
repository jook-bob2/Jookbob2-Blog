package com.management.service.admin;

import java.util.List;
import java.util.Map;

public interface MenuService {
	public List<Map<String, Object>> menuList(Map<String, Object> param);
	public boolean dupMenuCdCheck(String menuCd);
}
