package com.management.controller.user;

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

import com.management.domain.model.Member;
import com.management.mapper.user.MemberMapper;
import com.management.service.user.MemberService;
import com.management.util.S3Service;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("member")
@AllArgsConstructor
public class MemberController {
	@Autowired
	private MemberService memberService;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncode;
	
	@Autowired
	private MemberMapper memberMapper;
	
	@Autowired
	private S3Service s3Service;
	
	@PostMapping(value = "/login")
	public Map<String, Object> login(@RequestParam Map<String, Object> param, HttpSession session) {
		String auth = null;
		String password = param.get("password").toString();
		String pwCheck = null;
		Member entity = new Member();
		Map<String, Object> map = new HashMap<>();
		
		
		// @ 가 있으면 email 값으로 비밀번호를 가져옴.
		if (param.get("email").toString().indexOf("@") > -1) {
			auth = param.get("email").toString();
			entity.setEmail(auth);
			map.put("email", entity.getEmail());
			pwCheck = memberService.pwCheck(map);
		} else {
			auth = param.get("email").toString();
			entity.setUserId(auth);
			map.put("userId", entity.getUserId());
			pwCheck = memberService.pwCheck(map);
		}
		
		ModelAndView mav = new ModelAndView();
		
		if (passwordEncode.matches(password, pwCheck)) {
			entity.setPasswd(pwCheck);
			boolean result = memberService.loginCheck(entity, session);
			if(result) {
				Map<String, Object> memberList = memberMapper.viewMember(map);
				String name = (String) memberList.get("name");
				Long memberNo = (Long) memberList.get("memberNo");
				System.out.println("로그인 : " + memberNo);
				
				session.setAttribute("userId", auth);
				session.setAttribute("name", name);
				session.setAttribute("memberNo", memberNo);
				String userId = session.getAttribute("userId").toString();
				String name2 = session.getAttribute("name").toString();
				Map<String, Object> map2 = new HashMap<>();
				map2.put("userId", userId);
				map2.put("name", name2);
				map2.put("url", "/");
				
				return map2;
			}
		} else {
			map.put("message", "error");
			mav.addObject("message", map);
			return map;
		}
		return map;
	}
	
	@PostMapping(value = "/join")
	public String joinMember(@RequestParam Map<String, Object> map) throws Exception {
		String formData = map.get("formData").toString();
		formData = "{\"data\":[" + formData + "]}";
		
		Member entity = new Member();
		JSONParser jsonParse = new JSONParser();
		
		JSONObject jsonObj = (JSONObject) jsonParse.parse(formData);
		JSONArray dataArr = (JSONArray) jsonObj.get("data");
		
		for(int i = 0; i < dataArr.size(); i++) {
			JSONObject dataObj = (JSONObject) dataArr.get(i);
			entity.setUserId((String) dataObj.get("userId"));
			entity.setPasswd((String) dataObj.get("password"));
			entity.setName((String) dataObj.get("userName"));
			entity.setEmail((String) dataObj.get("email"));
			entity.setProfileImg("");
		}
		String userId = entity.getUserId();
		String email = entity.getEmail();
		Map<String, Object> map2 = new HashMap<>();
		
		String msg = "";
		
		map2.put("userId", userId);
		int idCheck = memberService.idCheck(map2);
		map2.put("email", email);
		int emailCheck = memberService.emailCheck(map2);
		if (idCheck > 0) {
			msg = "id";
			return msg;
		} else if (emailCheck > 0) {
			msg = "email";
			return msg;
		} else if (idCheck == 0 && emailCheck == 0) {
			memberService.joinMember(entity);
			return "/sign-in";
		} else {
			msg = "결과가 없습니다.";
			return msg;
		}
		
	}
	
	@PostMapping(value = "/denied")
	public String denied() {
		return "/not-found";
	}
	
	@PostMapping(value = "/session")
	public Long getSession(HttpSession session) throws Exception {
		if (session.getAttribute("memberNo") != null) {
			System.out.println("세션 memberNo : " + session.getAttribute("memberNo"));
			return (Long) session.getAttribute("memberNo");
		} else {
			return (long) -1;
		}
	}
	
	@PostMapping(value = "/logout")
	public void logout(HttpSession session) {
		session.invalidate();
		System.out.println("세션 Kill");
	}
	
	@PostMapping(value = "/uploadPicture", headers = "content-type=multipart/form-data")
	public Map<String, Object> uploadPicture(
			@RequestPart("image") MultipartFile file, HttpSession session ) throws Exception {
		Member entity = new Member();
		Map<String, Object> map = new HashMap<>();
		entity.setMemberNo((Long) session.getAttribute("memberNo"));
		
		if (file != null) {
			// 회원번호를 가져옴.
			map.put("memberNo", (Long) session.getAttribute("memberNo"));
			// 이미지 URL을 가져옴.
			Map<String, Object> memberList = memberMapper.viewMember(map);
			String prevFile = "";
			if (memberList.get("profileImg").toString() != null && !memberList.get("profileImg").toString().equals("")) {
				prevFile = memberList.get("profileImg").toString();
				// 기존 이미지를 삭제함.
				s3Service.deleteFile(prevFile);
			}

			// 새로운 이미지를 업로드하여 이미지를 화면에 뿌려줌.
			String url = s3Service.upload(file, "upload/", file.getBytes());
			entity.setProfileImg(url);
			memberService.uploadPicture(entity);
			map.put("profileImg", url);
			return map;
		}
		return map;
	}
	
	@PostMapping(value = "/removePicture")
	public Boolean removePicture(HttpSession session) throws Exception {
		Map<String, Object> map = new HashMap<>();
		map.put("memberNo", (Long) session.getAttribute("memberNo"));
		Map<String, Object> memberList = memberMapper.viewMember(map);
		
		// 멤버리스트에 프로필사진이 있다면 삭제 진행
		if (memberList.get("profileImg").toString() != null && !memberList.get("profileImg").toString().equals("")) {
			// DB에서 URL 삭제
			Member entity = new Member();
			entity.setProfileImg("");
			entity.setMemberNo((Long) memberList.get("memberNo"));
			memberService.uploadPicture(entity);
			
			// 이전 프로필 이미지 삭제
			String prevFile = memberList.get("profileImg").toString();
			s3Service.deleteFile(prevFile);
			return true;
		}
		return false;
	}

	
	@PostMapping(value = "/viewMember", headers = "accept=application/json; charset=utf-8")
	public Map<String, Object> viewMember(@RequestParam Map<String, Object> param, HttpSession session) {
		Map<String, Object> map = new HashMap<>();
		String message = "error";
		
		// 회원정보 추출을 위한 멤버키를 가져옴.
		System.out.println(session.getAttribute("memberNo"));
		if (session.getAttribute("memberNo") != null) {
			map.put("memberNo", session.getAttribute("memberNo"));
			Map<String, Object> map2 = new HashMap<>();
			// 회원정보 추출
			Map<String, Object> memberList = memberMapper.viewMember(map);
			message = "succeed";
			// list로 전송
			map2.put("list", memberList);
			map2.put("message", message);
			return map2;
		}
		map.put("message", message);
		return map;
	}
	
	@PostMapping(value = "saveProfile")
	public void saveProfile(@RequestParam Map<String, Object> param, HttpSession session) {
		Long memberNo = (Long) session.getAttribute("memberNo");
		Member entity = new Member();
		System.out.println(param.toString());
		entity.setMemberNo(memberNo);
		entity.setName(param.get("name").toString());
		entity.setAddress1(param.get("address1").toString());
		entity.setAddress2(param.get("address2").toString());
		entity.setEmail(param.get("email").toString());
		entity.setPhoneNo(param.get("phoneNo").toString());
		memberMapper.saveProfile(entity);
	}
	
	@PostMapping(value = "updatePw")
	public Boolean updatePw(@RequestParam Map<String, Object> param, HttpSession session) {
		Long memberNo = null;
		String passwd = "";
		Member entity = new Member();
		
		if (session.getAttribute("memberNo") != null && param.get("passwd") != null) {
			memberNo = (Long) session.getAttribute("memberNo");	
			entity.setMemberNo(memberNo);
			
			passwd = passwordEncode.encode(param.get("passwd").toString());
			entity.setPasswd(passwd);
			memberMapper.saveProfile(entity);
			return true;
		}
		return false;
	}
	
}
