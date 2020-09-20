package com.management.service.admin;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.management.mapper.admin.BoardManagementMapper;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class BoardManagementServiceImpl implements BoardManagementService {
	
	@Autowired
	private BoardManagementMapper boardManagementMapper; 
	
	@Autowired
	PasswordEncoder passwordEncoder;

	@Override
	public List<Map<String, Object>> boardList(Map<String, Object> param) {
		return boardManagementMapper.boardList(param);
	}

	@Override
	public void boardDeleteChk(List<Long> checkArr) {
		for(int i = 0; i < checkArr.size(); i++) {
			long bno = checkArr.get(i);
			boardManagementMapper.boardDelete(bno);
		}
	}

	@Override
	public void boardRestoreChk(List<Long> checkArr) {
		for(int i = 0; i < checkArr.size(); i++) {
			long bno = checkArr.get(i);
			boardManagementMapper.boardRestore(bno);
		}
	}
}
