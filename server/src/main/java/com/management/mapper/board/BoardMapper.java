package com.management.mapper.board;


import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.management.domain.model.Board;
import com.management.domain.model.Notice;
import com.management.domain.model.Upload;

@Mapper
public interface BoardMapper {
	public List<Map<String, Object>> boardList(Map<String, Object> map);
	public void deleteBoard(Long bno);
	public void updateBoard(Board entity);
	public Long getViewcnt(Long bno);
	public int boardCount(Map<String, Object> map);
	public String getFileUrl(Upload entity);
	public List<Map<String, Object>> noticeList(Map<String, Object> map);
	public List<Map<String, Object>> brdKindsList(Map<String, Object> map);
	public void updateNotice(Notice entity);
	public Long getNoticeViewCnt(Long noticeNo);
}
