package com.management.mapper.admin;


import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface NoticeMapper {
	public List<Map<String, Object>> noticeList(Map<String, Object> param);
	public int noticeCnt(Map<String, Object> param);
	public void noticeDelete(long noticeNo);
	public void noticeRestore(long noticeNo);
	public Map<String, Object> noticeUpdateList(Long noticeNo);
	public void updateNotice(Map<String, Object> param);
}
