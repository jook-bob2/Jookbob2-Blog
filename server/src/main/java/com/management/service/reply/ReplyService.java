package com.management.service.reply;

import java.util.List;
import java.util.Map;

import com.management.domain.model.HateReply;
import com.management.domain.model.LikeReply;
import com.management.domain.model.Reply;

public interface ReplyService {
	public List<Map<String, Object>> replyList(Map<String, Object> map);
	public Long replyInsert(Reply entity);
	public int selectMaxRno(int bno);
	public Map<String, Object> getLikeState(Map<String, Object> param);
	public Map<String, Object> getHateState(Map<String, Object> param);
	public void updateRecom(Map<String, Object> param);
	public void deleteReply(Long rcd);
}
