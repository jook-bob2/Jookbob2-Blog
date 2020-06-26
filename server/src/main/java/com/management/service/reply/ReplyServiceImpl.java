package com.management.service.reply;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.management.domain.model.Reply;
import com.management.domain.repository.reply.ReplyRepository;
import com.management.mapper.reply.ReplyMapper;

@Service
public class ReplyServiceImpl implements ReplyService {

	@Autowired
	private ReplyRepository replyRepository;
	
	@Autowired
	private ReplyMapper replyMapper;

	@Override
	public List<Map<String, Object>> replyList(Map<String, Object> map) {
		return replyMapper.replyList(map);
	}

	@Override
	public void replyInsert(Reply entity) {
		replyRepository.save(entity);
	}

	@Override
	public int selectMaxRno(int bno) {
		return replyMapper.selectMaxRno(bno);
	}
}
