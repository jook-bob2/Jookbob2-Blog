package com.management.service.ftmenu;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.management.mapper.ftmenu.FtMenuMapper;

@Service
public class FtMenuServiceImpl implements FtMenuService {

	@Autowired
	private FtMenuMapper ftMenuMapper;
	
	@Override
	public List<Map<String, Object>> menuList() {
		return ftMenuMapper.menuList();
	}
	
}
