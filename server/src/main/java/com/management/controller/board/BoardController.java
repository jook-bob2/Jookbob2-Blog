package com.management.controller.board;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.management.domain.model.Board;
import com.management.domain.repository.board.BoardRepository;

@RestController
@RequestMapping("board")
public class BoardController {
	@Autowired
	private BoardRepository boardRepository;

	@GetMapping("/save")
	public void create(Board board) {
		boardRepository.save(board);
	}

	@GetMapping("/selectOne")
	public Optional readOne(Long bno) {
		return boardRepository.findById(bno);
	}

	@GetMapping("/selectAll")
	public List readAll() {
		return boardRepository.findAll();
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
