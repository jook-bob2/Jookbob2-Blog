package com.management.mapper.admin;


import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface NoticeMapper {
	public List<Map<String, Object>> noticeList(Map<String, Object> param);
	public int noticeCnt(Map<String, Object> param);
	public void noticeDelete(Long noticeNo);
	public void noticeRestore(Long noticeNo);
	public Map<String, Object> noticeUpdateList(Long noticeNo);
	public void updateNotice(Map<String, Object> param);
}
