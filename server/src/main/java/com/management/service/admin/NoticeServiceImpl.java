package com.management.service.admin;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.management.domain.model.Notice;
import com.management.domain.repository.notice.NoticeRepository;
import com.management.mapper.admin.NoticeMapper;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class NoticeServiceImpl implements NoticeService {
	
	@Autowired
	private NoticeMapper noticeMapper;
	
	@Autowired
	private NoticeRepository noticeRepo;
	
	@Autowired
	PasswordEncoder passwordEncoder;

	@Override
	public void saveNotice(Notice entity) {
		noticeRepo.save(entity);
	}

	@Override
	public List<Map<String, Object>> noticeList(Map<String, Object> param) {
		return noticeMapper.noticeList(param);
	}

	@Override
	public void noticeDeleteChk(List<Long> checkArr) {
		for (int i = 0; i < checkArr.size(); i++) {
			long noticeNo = checkArr.get(i);
			noticeMapper.noticeDelete(noticeNo);
		}
	}

	@Override
	public void noticeRestoreChk(List<Long> checkArr) {
		for (int i = 0; i < checkArr.size(); i++) {
			long noticeNo = checkArr.get(i);
			noticeMapper.noticeRestore(noticeNo);
		}
	}
}
