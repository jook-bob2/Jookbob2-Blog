package com.management.service.board;

import java.sql.SQLException;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.management.domain.model.Board;
import com.management.domain.model.Member;
import com.management.domain.model.Notice;
import com.management.domain.model.Upload;
import com.management.domain.repository.board.BoardRepository;
import com.management.domain.repository.upload.UploadRepository;
import com.management.domain.repository.user.MemberRepository;
import com.management.mapper.board.BoardMapper;
import com.management.mapper.user.MemberMapper;

import lombok.AllArgsConstructor;

@Service
//@AllArgsConstructor
public class BoardServiceImpl implements BoardService {
	
	@Autowired
	private BoardRepository boardRepository;
	
	@Autowired
	private BoardMapper boardMapper;
	
	@Autowired
	private UploadRepository uploadRepositoy;

	@Override
	public void saveBoard(Board entity) {
		boardRepository.save(entity);
	}

	@Override
	public void deleteBoard(Long bno) {
		boardMapper.deleteBoard(bno);
	}

	@Override
	public void updateBoard(Board entity) {
		boardMapper.updateBoard(entity);
	}

	@Override
	public Long getViewcnt(Long bno) {
		return boardMapper.getViewcnt(bno);
	}

	@Override
	public Long uploadImg(Upload entity) {
		return uploadRepositoy.save(entity).getUploadCd();
	}

	@Override
	public String getFileUrl(Upload entity) {
		return boardMapper.getFileUrl(entity);
	}

	@Override
	public void updateNotice(Notice entity) {
		boardMapper.updateNotice(entity);
	}

	@Override
	public Long getNoticeViewCnt(Long noticeNo) {
		return boardMapper.getNoticeViewCnt(noticeNo);
	}
}
