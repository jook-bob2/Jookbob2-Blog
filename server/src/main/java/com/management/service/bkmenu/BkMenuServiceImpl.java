package com.management.service.bkmenu;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.management.mapper.bkmenu.BkMenuMapper;
import com.management.mapper.ftmenu.FtMenuMapper;

@Service
public class BkMenuServiceImpl implements BkMenuService {

	@Autowired
	private BkMenuMapper bkMenuMapper;
	
	@Override
	public List<Map<String, Object>> menuList() {
		return bkMenuMapper.menuList();
	}
	
}
