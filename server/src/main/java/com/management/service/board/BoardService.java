package com.management.service.board;

import com.management.domain.model.Board;
import com.management.domain.model.Notice;
import com.management.domain.model.Upload;

public interface BoardService {
	public void saveBoard(Board entity);
	public void deleteBoard(Long bno);
	public void updateBoard(Board entity);
	public Long getViewcnt(Long bno);
	public Long uploadImg(Upload entity);
	public String getFileUrl(Upload entity);
	public void updateNotice(Notice entity);
	public Long getNoticeViewCnt(Long noticeNo);
}
