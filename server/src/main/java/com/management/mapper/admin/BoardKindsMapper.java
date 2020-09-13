package com.management.mapper.admin;


import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BoardKindsMapper {
	public List<Map<String, Object>> boardKindsList(Map<String, Object> param);
	public int boardKindsCnt(Map<String, Object> param);
	public void boardKindsUpdate(Map<String, Object> param);
	public void boardKindsDelete(String brdCode);
	public void boardKindsRestore(String brdCode);
	public boolean dupBrdCodeCheck(String brdCode);
}
