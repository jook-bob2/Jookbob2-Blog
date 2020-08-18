package com.management.controller.admin;

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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.management.domain.model.Board;
import com.management.domain.model.Notice;
import com.management.domain.model.Upload;
import com.management.mapper.admin.BoardManagementMapper;
import com.management.mapper.admin.NoticeMapper;
import com.management.service.admin.BoardManagementService;
import com.management.service.admin.NoticeService;
import com.management.service.board.BoardService;
import com.management.util.S3Service;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("notice")
@AllArgsConstructor
public class NoticeController {
	@Autowired
	private NoticeService noticeService;
	
	@Autowired
	private NoticeMapper noticeMapper;
	
	@Autowired
	private BoardService boardService;
	
	@Autowired
	private S3Service s3Service;
	
	@PostMapping(value = "/uploadImg", headers = "content-type=multipart/form-data")
	public Map<String, Object> uploadImg (@RequestPart("upload") MultipartFile file, HttpSession session) throws Exception {
		Map<String, Object> map = new HashMap<>();
		
		if (file != null && session.getAttribute("adminNo") != null) {
			Upload entity = new Upload();
			entity.setAdminNo((Long) session.getAttribute("adminNo"));
			
			String fileUrl = s3Service.upload(file, "upload/", file.getBytes());
			entity.setFileUrl(fileUrl);
			
			Long uploadCd = boardService.uploadImg(entity);
			
			entity.setUploadCd(uploadCd);
			
			String url = boardService.getFileUrl(entity);
			
			map.put("uploaded", true);
			map.put("url", url);
			
			return map;
		} else {
			map.put("uploaded", false);
			map.put("url", null);
			
			return map;
		}
	}
	
	@PostMapping(value = "/saveNotice")
	public void saveNotice(Notice entity, HttpSession session) {
		String name = "";
		Long adminNo = null;
		Long num = (long) 0;
		if (session.getAttribute("adminName") != null && session.getAttribute("adminNo") != null) {
			name = session.getAttribute("adminName").toString();
			adminNo = (Long) session.getAttribute("adminNo");
			entity.setWriter(name);
			entity.setWriterNo(adminNo);
			entity.setWriteYn("Y");
			entity.setViewcnt(num);
			entity.setUpdateYn("N");
			entity.setUseYn("Y");
			entity.setDelYn("N");
			
			noticeService.saveNotice(entity);
		}
	}
	
	@PostMapping(value = "/noticeList")
	public Map<String, Object> noticeList(@RequestParam Map<String, Object> param) {
		Map<String, Object> map = new HashMap<>();
		
		int page = Integer.parseInt(param.get("page").toString());
		int rowsPerPage = Integer.parseInt(param.get("rowsPerPage").toString());
		
		int pageBegin = (page - 1) * rowsPerPage; // 0, 5, 10 이런식으로 페이징
		
		param.put("pageBegin", pageBegin);
		param.put("pageEnd", rowsPerPage);
		
		List<Map<String, Object>> noticeList = noticeService.noticeList(param);
		
		int noticeCnt = noticeMapper.noticeCnt(param);
		
		map.put("list", noticeList);
		map.put("noticeCnt", noticeCnt);
		
		return map;
	}
	
	@DeleteMapping(value = "/noticeDelete/{noticeNo}")
	public void noticeDelete(@PathVariable("noticeNo") Long noticeNo) {
		noticeMapper.noticeDelete(noticeNo);
	}
	
	@PostMapping(value = "/noticeRestore/{noticeNo}")
	public void noticeRestore(@PathVariable("noticeNo") Long noticeNo) {
		noticeMapper.noticeRestore(noticeNo);
	}
	
	@PostMapping(value = "/noticeUpdateList/{noticeNo}")
	public Map<String, Object> noticeUpdateList(@PathVariable("noticeNo") Long noticeNo, HttpSession session) {
		Map<String, Object> map = noticeMapper.noticeUpdateList(noticeNo);
		
		session.setAttribute("noticeNo", noticeNo);
		session.setAttribute("adminNo", map.get("adminNo"));
		
		return map;
	}
	
	@PostMapping(value = "/updateNotice")
	public void updateNotice(@RequestParam Map<String, Object> param) {
		noticeMapper.updateNotice(param);
	}
}
