package com.management.mapper.reply;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ReplyMapper {
	public List<Map<String, Object>> replyList(Map<String, Object> map);
	public int selectMaxRno(int bno);
	public Map<String, Object> getLikeState(Map<String, Object> param);
	public Map<String, Object> getHateState(Map<String, Object> param);
	public void hateDownLikeUp (Map<String, Object> param);
	public void likeDownHateUp (Map<String, Object> param);
	public void likeUp (Map<String, Object> param);
	public void likeDown (Map<String, Object> param);
	public void hateUp (Map<String, Object> param);
	public void hateDown (Map<String, Object> param);
	public void deletePrevLike(Map<String, Object> param);
	public void deletePrevHate(Map<String, Object> param);
	public Long likeCnt (Map<String, Object> param);
	public Long hateCnt (Map<String, Object> param);
	public Map<String, Object> confirmLike (Map<String, Object> param);
	public Map<String, Object> confirmHate (Map<String, Object> param);
	public void deleteReply(Long rcd);
	public void deleteLike(Long rcd);
	public void deleteHate(Long rcd);
	public String getReplyForm(Long rcd);
	public void updateReply(Map<String, Object> param);
}
