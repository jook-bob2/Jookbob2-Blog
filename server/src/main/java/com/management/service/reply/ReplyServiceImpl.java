package com.management.service.reply;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.management.domain.model.HateReply;
import com.management.domain.model.LikeReply;
import com.management.domain.model.Reply;
import com.management.domain.repository.reply.ReplyRepository;
import com.management.mapper.reply.ReplyMapper;
import com.management.service.recommendation.RecommendationService;

@Service
public class ReplyServiceImpl implements ReplyService {

	@Autowired
	private ReplyRepository replyRepository;
	
	@Autowired
	private ReplyMapper replyMapper;
	
	@Autowired
	private RecommendationService recomService;
	
	@Override
	public List<Map<String, Object>> replyList(Map<String, Object> map) {
		return replyMapper.replyList(map);
	}

	@Override
	public Long replyInsert(Reply entity) {
		return replyRepository.save(entity).getRcd();
	}

	@Override
	public int selectMaxRno(int bno) {
		return replyMapper.selectMaxRno(bno);
	}

	@Override
	public Map<String, Object> getLikeState(Map<String, Object> param) {
		return replyMapper.getLikeState(param);
	}
	
	@Override
	public Map<String, Object> getHateState(Map<String, Object> param) {
		return replyMapper.getHateState(param);
	}

	@Override
	public void updateRecom(Map<String, Object> param) {
		String action = param.get("likeAction").toString();
		
		Long likeCnt = replyMapper.likeCnt(param);
		Long hateCnt = replyMapper.hateCnt(param);
		
		if(action.equals("LIKE_OK")) {
			// 해당 회원이 싫어요를 눌렀는지 이전 이력에서 여부 확인
			String hateYn = param.get("hateYn").toString();
			if (hateYn.equals("Y")) {
				likeCnt = likeCnt + 1;
				hateCnt = hateCnt - 1;
				param.put("likeCnt", likeCnt);
				param.put("hateCnt", hateCnt);
				// 싫어요를 취소하고 좋아요 누르도록 유도
				replyMapper.hateDownLikeUp(param);
				
			} else {
				likeCnt = likeCnt + 1;
				param.put("likeCnt", likeCnt);
				replyMapper.likeUp(param);
			}
			
		} else if (action.equals("LIKE_CANCEL")){
			likeCnt = likeCnt - 1;
			param.put("likeCnt", likeCnt);
			replyMapper.likeDown(param);
			
		} else if (action.equals("HATE_OK")) {
			String likeYn = param.get("likeYn").toString();
			if (likeYn.equals("Y")) {
				likeCnt = likeCnt - 1;
				hateCnt = hateCnt + 1;
				param.put("likeCnt", likeCnt);
				param.put("hateCnt", hateCnt);
				replyMapper.likeDownHateUp(param);
			} else {
				hateCnt = hateCnt + 1;
				param.put("hateCnt", hateCnt);
				replyMapper.hateUp(param);
			}
		} else if (action.equals("HATE_CANCEL")) {
			hateCnt = hateCnt - 1;
			param.put("hateCnt", hateCnt);
			replyMapper.hateDown(param);
		}
		
		// 이전 like 이력을 삭제
		replyMapper.deletePrevLike(param);
		// 이전 hate 이력을 삭제
		replyMapper.deletePrevHate(param);
	}
}
