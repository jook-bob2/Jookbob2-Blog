package com.management.mapper.ftmenu;


import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FtMenuMapper {
	public List<Map<String, Object>> menuList();
}
