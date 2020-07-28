package com.management.controller.bkmenu;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.management.service.bkmenu.BkMenuService;
import com.management.service.ftmenu.FtMenuService;

@RestController
@RequestMapping("bkmenu")
public class BkMenuController {
	@Autowired
	private BkMenuService bkMenuService;
	
	@PostMapping(value = "/menuList")
	public Map<String, Object> menuList() {
		Map<String, Object> map = new HashMap<>();
		List<Map<String, Object>> menuList = bkMenuService.menuList();
		
		map.put("menuList", menuList);
		
		return map;
	}
}
