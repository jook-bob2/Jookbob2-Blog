package com.management.mapper.admin;


import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MenuMapper {
	public List<Map<String, Object>> menuList(Map<String, Object> param);
	public int menuCnt(Map<String, Object> param);
	public void menuUpdate(Map<String, Object> param);
	public void menuDelete(String menuCd);
	public void menuRestore(String menuCd);
	public boolean dupMenuCdCheck(String menuCd);
	public void createMenu(Map<String, Object> param);
}
