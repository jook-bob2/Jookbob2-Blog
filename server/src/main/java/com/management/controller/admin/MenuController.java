package com.management.controller.admin;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.management.mapper.admin.MenuMapper;
import com.management.service.admin.MenuService;

@RestController
@RequestMapping("menu")
public class MenuController {
	@Autowired
	private MenuService menuService;
	
	@Autowired
	private MenuMapper menuMapper;
	
	@PostMapping(value = "/menuList")
	public Map<String, Object> menuList(@RequestParam Map<String, Object> param) {
		Map<String, Object> map = new HashMap<>();
		
		int page = Integer.parseInt(param.get("page").toString());
		int rowsPerPage = Integer.parseInt(param.get("rowsPerPage").toString());
		
		int pageBegin = (page - 1) * rowsPerPage; // 0, 5, 10 이런식으로 페이징
		
		param.put("pageBegin", pageBegin);
		param.put("pageEnd", rowsPerPage);
		
		List<Map<String, Object>> menuList = menuService.menuList(param);
		
		int menuCnt = menuMapper.menuCnt(param);
		
		map.put("list", menuList);
		map.put("menuCnt", menuCnt);
		
		return map;
	}
	
	@PostMapping(value = "/menuUpdate")
	public void menuUpdate(@RequestParam Map<String, Object> param) {
		menuMapper.menuUpdate(param);
	}
	
	@DeleteMapping(value = "/menuDelete/{menuCd}")
	public void menuDelete(@PathVariable("menuCd") String menuCd) {
		menuMapper.menuDelete(menuCd);
	}
	
	@PostMapping(value = "/menuRestore/{menuCd}")
	public void menuRestore(@PathVariable("menuCd") String menuCd) {
		menuMapper.menuRestore(menuCd);
	}
}
