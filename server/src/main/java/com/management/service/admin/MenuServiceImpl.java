package com.management.service.admin;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.management.mapper.admin.MenuMapper;

@Service
public class MenuServiceImpl implements MenuService {

	@Autowired
	private MenuMapper menuMapper;
	
	@Override
	public List<Map<String, Object>> menuList(Map<String, Object> param) {
		return menuMapper.menuList(param);
	}

	@Override
	public boolean dupMenuCdCheck(String menuCd) {
		return menuMapper.dupMenuCdCheck(menuCd);
	}
	
}
