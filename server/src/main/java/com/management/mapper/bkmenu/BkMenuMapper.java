package com.management.mapper.bkmenu;


import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BkMenuMapper {
	public List<Map<String, Object>> menuList();
}
