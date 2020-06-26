package com.management.mapper.reply;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ReplyMapper {
	public List<Map<String, Object>> replyList(Map<String, Object> map);
	public int selectMaxRno(int bno);
}
