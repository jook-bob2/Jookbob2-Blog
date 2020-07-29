package com.management.controller.admin;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.management.domain.model.Admin;
import com.management.domain.model.Board;
import com.management.domain.model.Member;
import com.management.mapper.admin.AdminMapper;
import com.management.mapper.board.BoardMapper;
import com.management.mapper.user.MemberMapper;
import com.management.service.admin.AdminService;
import com.management.service.user.MemberService;
import com.management.util.S3Service;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("admin")
@AllArgsConstructor
public class AdminController {
	@Autowired
	private AdminService adminService;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncode;
	
	@Autowired
	private AdminMapper adminMapper;
	
	@Autowired
	private BoardMapper boardMapper;
	
	@Autowired
	private S3Service s3Service;
	
	@PostMapping(value = "/registration")
	public void joinMember(@RequestParam Map<String, Object> map) throws Exception {
		Admin entity = new Admin();
		String passwd = passwordEncode.encode(map.get("passwd").toString());
		
		try {
			entity.setAddress1(map.get("address1").toString());
			entity.setAddress2(map.get("address2").toString());
			entity.setAdminId(map.get("adminId").toString());
			entity.setEmail(map.get("email").toString());
			entity.setName(map.get("name").toString());
			entity.setPasswd(passwd);
			entity.setPhoneNo(map.get("phoneNo").toString());
			entity.setPostNo(map.get("postNo").toString());
			entity.setProfileImg(map.get("profileImg").toString());
			
			adminService.registration(entity);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@PostMapping(value = "/uploadPicture", headers = "content-type=multipart/form-data")
	public Map<String, Object> uploadPicture(
			@RequestPart("image") MultipartFile file, @RequestParam Map<String, Object> param) throws Exception {
		Map<String, Object> map = new HashMap<>();
		System.out.println(param.toString());
		try {
			if (file != null) {
				if (param.get("profileImg") != null) {
					s3Service.deleteFile(param.get("profileImg").toString());
				}
				// 새로운 이미지를 업로드하여 이미지를 화면에 뿌려줌.
				String profileImg = s3Service.upload(file, "upload/", file.getBytes());
				map.put("profileImg", profileImg);
				
				return map;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return map;
	}
	
	@PostMapping(value = "/removePicture")
	public void removePicture(@RequestParam Map<String, Object> param) throws Exception {
		String prevFile = null;
		System.out.println(param.toString());
		try {
			prevFile = param.get("profileImg").toString();
			s3Service.deleteFile(prevFile);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
}
