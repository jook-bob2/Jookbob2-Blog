package com.management.controller.board;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.management.domain.model.Board;
import com.management.domain.repository.board.BoardRepository;
import com.management.mapper.board.BoardMapper;

@RestController
@RequestMapping("board")
public class BoardController {
	@Autowired
	private BoardRepository boardRepository;
	
	@Autowired
	private BoardMapper boardMapper;

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
		List<Board> boardList = boardMapper.boardList();
		Map<String, Object> map = new HashMap<>();
		map.put("list", boardList);
		
		return map;
	}

	@GetMapping("/update")
	public void update(Board board, Long bno) {
		boardRepository.update(board, bno);
	}

	@GetMapping("/delete")
	public void delete(Long bno) {
		boardRepository.deleteById(bno);
	}
	
}
