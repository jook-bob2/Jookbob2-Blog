package com.management.service.recommendation;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.management.domain.model.HateReply;
import com.management.domain.model.LikeReply;
import com.management.domain.model.Reply;
import com.management.domain.repository.hateReply.HateReplyRepository;
import com.management.domain.repository.likeReply.LikeReplyRepository;
import com.management.domain.repository.reply.ReplyRepository;
import com.management.mapper.reply.ReplyMapper;

@Service
public class RecommendationServiceImpl implements RecommendationService {

	@Autowired
	private LikeReplyRepository likeReplyRepo;
	
	@Autowired
	private HateReplyRepository hateReplyRepo;
	
	@Autowired
	private ReplyMapper replyMapper;

	@Override
	public Long likeReplyInsert(LikeReply entity) {
		return likeReplyRepo.save(entity).getLikeNo();
	}
	
	@Override
	public Long hateReplyInsert(HateReply entity) {
		return hateReplyRepo.save(entity).getHateNo();
	}
}
