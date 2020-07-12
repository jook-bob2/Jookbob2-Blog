package com.management.service.recommendation;

import java.util.List;
import java.util.Map;

import com.management.domain.model.HateReply;
import com.management.domain.model.LikeReply;

public interface RecommendationService {
	public Long likeReplyInsert(LikeReply entity);
	public Long hateReplyInsert(HateReply entity);
}
