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
import com.management.domain.model.Upload;
import com.management.mapper.admin.BoardManagementMapper;
import com.management.service.admin.BoardManagementService;
import com.management.service.board.BoardService;
import com.management.util.S3Service;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("boardManagement")
@AllArgsConstructor
public class BoardManagementController {
	@Autowired
	private BoardManagementService boardManagementService;
	
	@Autowired
	private BoardManagementMapper boardManagementMapper;
	
	@Autowired
	private BoardService boardService;
	
	@Autowired
	private S3Service s3Service;
	
	@PostMapping(value = "/boardList")
	public Map<String, Object> boardList(@RequestParam Map<String, Object> param) {
		Map<String, Object> map = new HashMap<>();
		
		int page = Integer.parseInt(param.get("page").toString());
		int rowsPerPage = Integer.parseInt(param.get("rowsPerPage").toString());
		
		int pageBegin = (page - 1) * rowsPerPage; // 0, 5, 10 이런식으로 페이징
		
		param.put("pageBegin", pageBegin);
		param.put("pageEnd", rowsPerPage);
		
		List<Map<String, Object>> boardList = boardManagementService.boardList(param);
		
		int boardCnt = boardManagementMapper.boardCnt(param);
		
		map.put("list", boardList);
		map.put("boardCnt", boardCnt);
		
		return map;
	}
	
	@DeleteMapping(value = "/boardDelete/{bno}")
	public void boardDelete(@PathVariable("bno") Long bno) {
		boardManagementMapper.boardDelete(bno);
	}
	
	@PostMapping(value = "/boardRestore/{bno}")
	public void boardRestore(@PathVariable("bno") Long bno) {
		boardManagementMapper.boardRestore(bno);
	}
	
	@PostMapping(value = "/getShowText")
	public Map<String, Object> getShowText() {
		Map<String, Object> map = new HashMap<>();
		List<Map<String, Object>> list = boardManagementMapper.getShowText();
		
		map.put("list", list);
		
		return map;
	}
	
	@PostMapping(value = "/boardUpdateList/{bno}")
	public Map<String, Object> boardUpdateList(@PathVariable("bno") Long bno, HttpSession session) {
		Map<String, Object> map = boardManagementMapper.boardUpdateList(bno);
		
		session.setAttribute("bno", bno);
		session.setAttribute("memberNoAdmin", map.get("memberNo"));
		
		return map;
	}
	
	@PostMapping(value = "/uploadImg", headers = "content-type=multipart/form-data")
	public Map<String, Object> uploadImg (@RequestPart("upload") MultipartFile file, HttpSession session) throws Exception {
		Map<String, Object> map = new HashMap<>();
		if (file != null && session.getAttribute("memberNoAdmin") != null) {
			Upload entity = new Upload();
			entity.setMemberNo((Long) session.getAttribute("memberNoAdmin"));
			
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
	
	@PostMapping(value = "/updateBoard")
	public void updateBoard(@RequestParam Map<String, Object> param) {
		boardManagementMapper.updateBoard(param);
	}
}
