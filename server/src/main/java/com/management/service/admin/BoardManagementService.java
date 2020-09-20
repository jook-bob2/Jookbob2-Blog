package com.management.service.admin;

import java.util.List;
import java.util.Map;

public interface BoardManagementService {
	public List<Map<String, Object>> boardList(Map<String, Object> param);
	public void boardDeleteChk(List<Long> checkArr);
	public void boardRestoreChk(List<Long> checkArr);
}
