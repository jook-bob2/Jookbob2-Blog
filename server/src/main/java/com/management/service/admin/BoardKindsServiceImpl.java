package com.management.service.admin;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.management.mapper.admin.BoardKindsMapper;

@Service
public class BoardKindsServiceImpl implements BoardKindsService {

	@Autowired
	private BoardKindsMapper boardKindsMapper;

	@Override
	public List<Map<String, Object>> boardKindsList(Map<String, Object> param) {
		return boardKindsMapper.boardKindsList(param);
	}

}
