package com.management.service.recommendation;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.management.domain.model.Recommendation;
import com.management.domain.model.Reply;
import com.management.domain.repository.recommendation.RecommendationRepository;
import com.management.domain.repository.reply.ReplyRepository;
import com.management.mapper.reply.ReplyMapper;

@Service
public class RecommendationServiceImpl implements RecommendationService {

	@Autowired
	private RecommendationRepository recommendationRepository;
	
	@Autowired
	private ReplyMapper replyMapper;

	@Override
	public void recomInsert(Recommendation entity) {
		recommendationRepository.save(entity);
	}
}
