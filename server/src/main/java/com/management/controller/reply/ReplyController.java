package com.management.controller.reply;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.management.domain.model.Recommendation;
import com.management.domain.model.Reply;
import com.management.mapper.reply.ReplyMapper;
import com.management.service.recommendation.RecommendationService;
import com.management.service.reply.ReplyService;

@RestController
@RequestMapping("reply")
public class ReplyController {
	@Autowired
	private ReplyService replyService;
	
	@Autowired
	private RecommendationService recommendationService;
	
	@Autowired
	private ReplyMapper replyMapper;
	
	@PostMapping(value = "/replyList")
	public Map<String, Object> replyList (@RequestParam Map<String, Object> param) {
		Map<String, Object> map = new HashMap<>();

		List<Map<String, Object>> list = replyService.replyList(param);
		
		map.put("list", list);
		
		return map;
	}
	
	@PostMapping(value = "/replyInsert")
	public String replyInsert (@RequestParam Map<String, Object> param) {
		String msg = "error";
		Reply replyEntity = new Reply();
		int bno = Integer.parseInt(param.get("bno").toString());
		int memberNo = Integer.parseInt(param.get("memberNo").toString());
		String replyer = param.get("replyer").toString();
		String replyText = param.get("replyText").toString();
		
		int rno = replyService.selectMaxRno(bno);
		
		replyEntity.setBno((long) bno);
		replyEntity.setReplyer(replyer);
		replyEntity.setReplyText(replyText);
		replyEntity.setReplyerNo((long) memberNo);
		replyEntity.setDelYn("N");
		replyEntity.setUseYn("Y");
		replyEntity.setWriteYn("Y");
		replyEntity.setUpdateYn("N");
		replyEntity.setRecCnt((long) 0);
		
		if (rno == 0) {
			rno = rno + 1;
			replyEntity.setRno((long) rno);
			replyService.replyInsert(replyEntity);
			msg = "succeed";
			return msg;
		} else if (rno >= 1) {
			rno = rno + 1;
			replyEntity.setRno((long) rno);
			replyService.replyInsert(replyEntity);
			msg = "succeed";
			return msg;
		}
		
		return msg;
	}
}
