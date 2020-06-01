package com.management.domain.repository.board;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.management.domain.model.Board;


public interface BoardRepository extends JpaRepository<Board, Long>{ 

	@Modifying
	@Transactional
	@Query(value = "UPDATE "
			+ "management.board SET "
			+ "title=:#{#board.title}, writer=:#{#board.writer}, content=:#{#board.content}, "
			+ "viewcnt=:#{#board.viewcnt}, update_yn=:#{#board.updateYn}, write_yn=:#{#board.writeYn}, "
			+ "b_kinds=:#{#board.bKinds} WHERE bno = :bno", nativeQuery = true)
	void update(@Param("board") Board board, @Param("bno") Long bno);
}