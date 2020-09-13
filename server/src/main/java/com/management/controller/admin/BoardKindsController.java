package com.management.controller.admin;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.management.domain.model.BoardKinds;
import com.management.domain.repository.boardKinds.BoardKindsRepository;
import com.management.mapper.admin.BoardKindsMapper;
import com.management.mapper.admin.MenuMapper;
import com.management.mapper.board.BoardMapper;
import com.management.service.admin.BoardKindsService;
import com.management.service.admin.MenuService;

@RestController
@RequestMapping("boardKinds")
public class BoardKindsController {
	@Autowired
	private BoardKindsService boardKindsService;
	
	@Autowired
	private BoardKindsMapper boardKindsMapper;
	
	@PostMapping(value = "/boardKindsList")
	public Map<String, Object> boardKindsList(@RequestParam Map<String, Object> param) {
		Map<String, Object> map = new HashMap<>();
		
		int page = Integer.parseInt(param.get("page").toString());
		int rowsPerPage = Integer.parseInt(param.get("rowsPerPage").toString());
		
		int pageBegin = (page - 1) * rowsPerPage; // 0, 5, 10 이런식으로 페이징
		
		param.put("pageBegin", pageBegin);
		param.put("pageEnd", rowsPerPage);
		
		List<Map<String, Object>> menuList = boardKindsService.boardKindsList(param);
		
		int boardKindsCnt = boardKindsMapper.boardKindsCnt(param);
		
		map.put("list", menuList);
		map.put("boardKindsCnt", boardKindsCnt);
		
		return map;
	}
	
	@PostMapping(value = "/boardKindsUpdate")
	public String boardKindsUpdate(@RequestParam Map<String, Object> param) {
		String msg = "error";
		String brdCode = param.get("brdCode").toString();
		String orgBrdCode = param.get("orgBrdCode").toString();
		boolean dupBrdCodeCheck = boardKindsMapper.dupBrdCodeCheck(brdCode);
		
		if (!dupBrdCodeCheck || brdCode.equals(orgBrdCode)) {
			boardKindsMapper.boardKindsUpdate(param);
			msg = "succeed";
			return msg;
		}
		
		return msg;
	}
	
	@DeleteMapping(value = "/boardKindsDelete/{brdCode}")
	public void boardKindsDelete(@PathVariable("brdCode") String brdCode) {
		boardKindsMapper.boardKindsDelete(brdCode);
	}
	
	@PostMapping(value = "/boardKindsRestore/{brdCode}")
	public void boardKindsRestore(@PathVariable("brdCode") String brdCode) {
		boardKindsMapper.boardKindsRestore(brdCode);
	}
}
