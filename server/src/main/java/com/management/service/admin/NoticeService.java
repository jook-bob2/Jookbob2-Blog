package com.management.service.admin;

import java.util.List;
import java.util.Map;

import com.management.domain.model.Notice;

public interface NoticeService {
	public void saveNotice(Notice entity);
	public List<Map<String, Object>> noticeList(Map<String, Object> param);
	public void noticeDeleteChk(List<Long> checkArr);
	public void noticeRestoreChk(List<Long> checkArr);
}
