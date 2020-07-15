package com.management.controller.reply;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.management.domain.model.HateReply;
import com.management.domain.model.LikeReply;
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
	public Map<String, Object> replyList (@RequestParam Map<String, Object> param, HttpSession session) {
		Map<String, Object> map = new HashMap<>();
		
		if (session.getAttribute("memberNo") != null) {
			param.put("memberNo", (long) Integer.parseInt(session.getAttribute("memberNo").toString()));
		}
		
		List<Map<String, Object>> list = replyService.replyList(param);
		
		map.put("list", list);
		
		return map;
	}
	
	@PostMapping(value = "/getLikeState")
	public Map<String, Object> getLikeState (@RequestParam Map<String, Object> param) {
		Map<String, Object> map = new HashMap<>();
		System.out.println("=============================== " + param.toString());
		
		Map<String, Object> data = replyService.getLikeState(param);
		
		map.put("data", data);
		
		return map;
	}
	
	@PostMapping(value = "/replyInsert")
	public String replyInsert (@RequestParam Map<String, Object> param, HttpSession session) {
		String msg = "error";
		Reply replyEntity = new Reply();
		//Recommendation recomEntity = new Recommendation();
		
		int bno = Integer.parseInt(param.get("bno").toString());
		int memberNo = Integer.parseInt(session.getAttribute("memberNo").toString());
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
		replyEntity.setLikeCnt((long) 0);
		replyEntity.setHateCnt((long) 0);
		
//		recomEntity.setBno((long) bno);
//		recomEntity.setUseYn("Y");
//		recomEntity.setDelYn("N");
//		recomEntity.setHateYn("N");
//		recomEntity.setLikeYn("N");
//		recomEntity.setMemberNo((long) memberNo);
		
		if (rno == 0) {
			rno = rno + 1;
			replyEntity.setRno((long) rno);
			Long rcd = replyService.replyInsert(replyEntity);
			//recomEntity.setRcd(rcd);
			//recommendationService.recomInsert(recomEntity);
			
			msg = "succeed";
			return msg;
			
		} else if (rno >= 1) {
			rno = rno + 1;
			replyEntity.setRno((long) rno);
			Long rcd = replyService.replyInsert(replyEntity);
			//recomEntity.setRcd(rcd);
			//recommendationService.recomInsert(recomEntity);
			
			msg = "succeed";
			return msg;
		}
		
		return msg;
	}
	
	@PostMapping(value = "/updateRecom")
	public Map<String, Object> updateRecom(@RequestParam Map<String, Object> param, HttpSession session) {
		Map<String, Object> stateMp = new HashMap<>();
		LikeReply likeEntity = new LikeReply();
		HateReply hateEntity = new HateReply();
		
		Long likeNo = null;
		Long hateNo = null;
		
		int memberNo = Integer.parseInt(session.getAttribute("memberNo").toString());
		
		param.put("memberNo", (long) memberNo);
		
		likeEntity.setRcd((long) Integer.parseInt(param.get("rcd").toString()));
		likeEntity.setMemberNo((long) Integer.parseInt(param.get("memberNo").toString()));
		likeEntity.setUseYn("Y");
		likeEntity.setDelYn("N");
		
		hateEntity.setRcd((long) Integer.parseInt(param.get("rcd").toString()));
		hateEntity.setMemberNo((long) Integer.parseInt(param.get("memberNo").toString()));
		hateEntity.setUseYn("Y");
		hateEntity.setDelYn("N");
		
		String action = param.get("likeAction").toString();
		
		if (action.equals("LIKE_OK")) {
			likeEntity.setLikeYn("Y"); 
			hateEntity.setHateYn("N");
		} else if (action.equals("LIKE_CANCEL")) {
			likeEntity.setLikeYn("N"); 
			hateEntity.setHateYn("N");
		} else if (action.equals("HATE_OK")) {
			likeEntity.setLikeYn("N"); 
			hateEntity.setHateYn("Y");
		} else if (action.equals("HATE_CANCEL")) {
			likeEntity.setLikeYn("N"); 
			hateEntity.setHateYn("N");
		}
		
		// like 이력을 추가
		likeNo = recommendationService.likeReplyInsert(likeEntity);
		param.put("likeNo", likeNo);
		// hate 이력을 추가
		hateNo = recommendationService.hateReplyInsert(hateEntity);
		param.put("hateNo", hateNo);
		
		replyService.updateRecom(param);
		
		if (action.equals("LIKE_OK") || action.equals("LIKE_CANCEL")) {
			stateMp.put("data", replyService.getLikeState(param));
		} else if (action.equals("HATE_OK") || action.equals("HATE_CANCEL")) {
			stateMp.put("data", replyService.getHateState(param));
		}
		
		return stateMp;
	}
	
	@PostMapping(value = "/confirmRecom")
	public Map<String, Object> confirmRecom(@RequestParam Map<String, Object> param, HttpSession session) throws Exception{
		try {
			Long memberNo = (long) Integer.parseInt(session.getAttribute("memberNo").toString());
			param.put("memberNo", memberNo);
			Map<String, Object> like = replyMapper.confirmLike(param);
			Map<String, Object> hate = replyMapper.confirmHate(param);
			Long likeMember = (long) Integer.parseInt(like.get("likeMember").toString());
			Long hateMember = (long) Integer.parseInt(hate.get("hateMember").toString());
			
			param.put("likeMember", likeMember);
			param.put("hateMember", hateMember);
			param.put("likeYn", like.get("likeYn"));
			param.put("hateYn", hate.get("hateYn"));
		} catch (Exception e) {
			// e.printStackTrace();
		}
		
		return param;
	}
	
	@DeleteMapping(value = "/deleteReply/{rcd}")
	public void deleteReply(@PathVariable("rcd") Long rcd, HttpSession session) {
		replyService.deleteReply(rcd);
	}
}
