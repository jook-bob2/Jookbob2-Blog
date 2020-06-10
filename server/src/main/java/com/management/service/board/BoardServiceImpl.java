package com.management.service.board;

import java.sql.SQLException;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.management.domain.model.Board;
import com.management.domain.model.Member;
import com.management.domain.repository.board.BoardRepository;
import com.management.domain.repository.user.MemberRepository;
import com.management.mapper.user.MemberMapper;

import lombok.AllArgsConstructor;

@Service
//@AllArgsConstructor
public class BoardServiceImpl implements BoardService {
	
	@Autowired
	private BoardRepository boardRepository;

	@Override
	public void saveBoard(Board entity) {
		boardRepository.save(entity);
	}
}
