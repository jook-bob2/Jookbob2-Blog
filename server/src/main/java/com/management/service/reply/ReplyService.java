package com.management.service.reply;

import java.util.List;
import java.util.Map;

import com.management.domain.model.Reply;

public interface ReplyService {
	public List<Map<String, Object>> replyList(Map<String, Object> map);
	public void replyInsert(Reply entity);
	public int selectMaxRno(int bno);
}
