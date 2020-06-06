package com.management.mapper.board;


import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.management.domain.model.Board;

@Mapper
public interface BoardMapper {
	public List<Board> boardList();
}
