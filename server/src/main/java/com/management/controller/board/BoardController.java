package com.management.controller.board;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
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

	@GetMapping("/save")
	public void create(Board board) {
		boardRepository.save(board);
	}

	@GetMapping("/selectOne")
	public Optional readOne(Long bno) {
		return boardRepository.findById(bno);
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
		System.out.println("bno ===========> " + bno);
		map.put("bno", bno);
		List<Map<String, Object>> boardList = boardMapper.boardList(map);
		map.put("list", boardList);
		return map;
	}
	
	@PostMapping(value = "/setSession/{bno}")
	public void setBno(@PathVariable("bno") Long bno ,HttpSession session) {
		session.setAttribute("bno", bno);
		System.out.println("세션 셋팅 : " + bno);
	}
	
	@PostMapping(value = "/getSession")
	public Long getBno(HttpSession session) {
		if (session.getAttribute("bno") != null) {
			return (Long) session.getAttribute("bno");
		}
		return null;
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
		}
		boardService.saveBoard(entity);
	}

	@GetMapping("/update")
	public void update(Board board, Long bno) {
		boardRepository.update(board, bno);
	}
}
