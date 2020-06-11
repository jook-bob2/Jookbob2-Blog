package com.management.service.board;

import com.management.domain.model.Board;

public interface BoardService {
	public void saveBoard(Board entity);
	public void deleteBoard(Long bno);
}
