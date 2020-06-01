package com.management.controller.user;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.management.domain.model.Member;
import com.management.mapper.user.MemberMapper;
import com.management.service.user.MemberService;

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
				String name = memberMapper.viewMember(map);
				session.setAttribute("userId", auth);
				session.setAttribute("name", name);
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
	public String getSession(HttpSession session) throws Exception {
		if (session.getAttribute("userId") != null) {
			return session.getAttribute("userId").toString();
		} else {
			return "";
		}
	}
	
	@PostMapping(value = "/logout")
	public void logout(HttpSession session) {
		session.invalidate();
		System.out.println("세션 Kill");
	}
	
}
