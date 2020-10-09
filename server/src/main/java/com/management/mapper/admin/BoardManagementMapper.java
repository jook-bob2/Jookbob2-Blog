package com.management.mapper.admin;


import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BoardManagementMapper {
	public List<Map<String, Object>> boardList(Map<String, Object> param);
	public int boardCnt(Map<String, Object> param);
	public void boardDelete(long bno);
	public void boardRestore(long bno);
	public List<Map<String, Object>> getShowText();
	public Map<String, Object> boardUpdateList(Long bno);
	public void updateBoard(Map<String, Object> param);
}
