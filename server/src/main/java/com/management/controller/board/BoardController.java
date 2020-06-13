package com.management.controller.board;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.management.domain.model.Board;
import com.management.domain.model.BoardKinds;
import com.management.domain.repository.board.BoardRepository;
import com.management.domain.repository.boardKinds.BoardKindsRepository;
import com.management.mapper.board.BoardMapper;
import com.management.service.board.BoardService;

@RestController
@RequestMapping("board")
public class BoardController {
	@Autowired
	private BoardRepository boardRepository;
	
	@Autowired
	private BoardKindsRepository boardKindsRepository;
	
	@Autowired
	private BoardService boardService;
	
	@Autowired
	private BoardMapper boardMapper;
	
	@GetMapping("/insert")
	public void create(BoardKinds boardKinds) {
		boardKindsRepository.save(boardKinds);
	}

	@GetMapping("/boardList")
	public Map<String, Object> readAll() {
		Map<String, Object> map = new HashMap<>();
		List<Map<String, Object>> boardList = boardMapper.boardList(map);
		map.put("list", boardList);
		
		return map;
	}
	
	@PostMapping(value = "/boardDetail/{bno}")
	public Map<String, Object> boardDetail(@PathVariable("bno") Long bno ) {
		Map<String, Object> map = new HashMap<>();
		if (bno != null) {
			Board entity = new Board();
			Long viewcnt = boardService.getViewcnt(bno);
			entity.setBno(bno);
			entity.setViewcnt(viewcnt);
			boardService.updateBoard(entity);
			map.put("bno", bno);
			List<Map<String, Object>> boardList = boardMapper.boardList(map);
			
			map.put("list", boardList);
		}
		return map;
	}
	
	@PostMapping(value = "/setSession/{bno}")
	public void setBno(@PathVariable("bno") Long bno ,HttpSession session) {
		session.setAttribute("bno", bno);
	}
	
	@PostMapping(value = "/getSession")
	public Map<String, Object> getBno(HttpSession session) {
		Map<String, Object> map = new HashMap<>();
		if (session.getAttribute("bno") != null) {
			map.put("bno", session.getAttribute("bno"));
			map.put("memberNo", session.getAttribute("memberNo"));
			return map;
		}
		return map;
	}
	
	@PostMapping(value = "/saveBoard")
	public void saveBoard(Board entity, HttpSession session) {
		String name = "";
		Long memberNo = null;
		Long num = (long) 0;
		if (session.getAttribute("name") != null && session.getAttribute("memberNo") != null) {
			name = session.getAttribute("name").toString();
			memberNo = (Long) session.getAttribute("memberNo");
			entity.setWriter(name);
			entity.setWriterNo(memberNo);
			entity.setWriteYn("Y");
			entity.setViewcnt(num);
			entity.setUpdateYn("N");
			entity.setUseYn("Y");
			entity.setDelYn("N");
		}
		boardService.saveBoard(entity);
	}
	
	@PostMapping(value = "/updateBoard")
	public void updateBoard(Board entity, HttpSession session) {
		Long bno = null;
		if (session.getAttribute("bno") != null) {
			bno = (Long) session.getAttribute("bno");
			entity.setBno(bno);
			entity.setUpdateYn("Y");
		}
		boardService.updateBoard(entity);
	}
	
	@DeleteMapping(value = "/deleteBoard/{bno}")
	public void deleteBoard(@PathVariable("bno") Long bno) {
		boardService.deleteBoard(bno);
	}
}
