package com.management.controller.admin;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.management.domain.model.Admin;
import com.management.mapper.admin.AdminMapper;
import com.management.service.admin.AdminService;
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
	private S3Service s3Service;
	
	@PostMapping(value = "/login")
	public Map<String, Object> login(@RequestParam Map<String, Object> param, HttpSession session) {
		String auth = null;
		String password = param.get("password").toString();
		String pwCheck = null;
		Admin entity = new Admin();
		Map<String, Object> map = new HashMap<>();
		
		
		// @ 가 있으면 email 값으로 비밀번호를 가져옴.
		if (param.get("email").toString().indexOf("@") > -1) {
			auth = param.get("email").toString();
			entity.setEmail(auth);
			map.put("email", entity.getEmail());
			pwCheck = adminService.pwCheck(map);
		} else {
			auth = param.get("email").toString();
			entity.setAdminId(auth);
			map.put("adminId", entity.getAdminId());
			pwCheck = adminService.pwCheck(map);
		}
		
		if (passwordEncode.matches(password, pwCheck)) {
			entity.setPasswd(pwCheck);
			boolean result = adminService.loginCheck(entity, session);
			
			if(result) {
				Map<String, Object> memberList = adminMapper.viewMember(map);
				Long adminNo = (Long) memberList.get("adminNo");
				String adminName = memberList.get("name").toString();
				
				session.setAttribute("adminId", auth);
				session.setAttribute("adminNo", adminNo);
				session.setAttribute("adminName", adminName);
				
				map.put("adminNo", adminNo);
				map.put("message", "succeed");
				
				return map;
			}
		} else {
			map.put("message", "error");
			return map;
		}
		return map;
	}
	
	@PostMapping(value = "/getSession")
	public Long getSession(HttpSession session) {
		if (session.getAttribute("adminNo") != null)
			return (long) Integer.parseInt(session.getAttribute("adminNo").toString());
		else
			return (long) -1;
	}
	
	@PostMapping(value = "/logout")
	public void logout(HttpSession session) {
		session.invalidate();
	}
	
	@PostMapping(value = "/registration")
	public int registration(@RequestParam Map<String, Object> param) throws Exception {
		Admin entity = new Admin();
		String passwd = passwordEncode.encode(param.get("passwd").toString());
		int result = 0;
		
		try {
			entity.setAddress1(param.get("address1").toString());
			entity.setAddress2(param.get("address2").toString());
			entity.setAdminId(param.get("adminId").toString());
			entity.setEmail(param.get("email").toString());
			entity.setName(param.get("name").toString());
			entity.setPasswd(passwd);
			entity.setPhoneNo(param.get("phoneNo").toString());
			entity.setPostNo(param.get("postNo").toString());
			entity.setProfileImg(param.get("profileImg").toString());
			entity.setUseYn("Y");
			entity.setSecYn("N");
			
			int idCheckCnt = adminMapper.idCheck(param);
			int emailCheckCnt = adminMapper.emailCheck(param);
			int phoneCheckCnt = adminMapper.phoneCheck(param);
			
			if (idCheckCnt > 0) {
				result = -1;
				return result;
			} else if (emailCheckCnt > 0) {
				result = -2;
				return result;
			} else if (phoneCheckCnt > 0) {
				result = -3;
				return result;
			} else if (idCheckCnt + emailCheckCnt + phoneCheckCnt == 0) {
				adminService.registration(entity);
				result = 1;
				return result;
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
	
	@PostMapping(value = "/uploadPicture", headers = "content-type=multipart/form-data")
	public Map<String, Object> uploadPicture(
			@RequestPart("image") MultipartFile file, @RequestParam Map<String, Object> param) throws Exception {
		Map<String, Object> map = new HashMap<>();
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
		try {
			prevFile = param.get("profileImg").toString();
			s3Service.deleteFile(prevFile);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@PostMapping(value = "/adminList")
	public Map<String, Object> adminList(@RequestParam Map<String, Object> param) {
		Map<String, Object> map = new HashMap<>();
		
		int page = Integer.parseInt(param.get("page").toString());
		int rowsPerPage = Integer.parseInt(param.get("rowsPerPage").toString());
		
		int pageBegin = (page - 1) * rowsPerPage; // 0, 5, 10 이런식으로 페이징
		
		param.put("pageBegin", pageBegin);
		param.put("pageEnd", rowsPerPage);
		
		List<Map<String, Object>> adminList = adminService.adminList(param);
		
		int adminCnt = adminMapper.adminCnt(param);
		
		map.put("list", adminList);
		map.put("adminCnt", adminCnt);
		
		return map;
	}
	
	@PostMapping(value = "/adminUpdateList/{adminId}")
	public Map<String, Object> adminUpdateList(@PathVariable String adminId) {
		Map<String, Object> updateList = adminMapper.adminUpdateList(adminId);
		
		return updateList;
	}
	
	@PostMapping(value = "/adminUpdate")
	public int adminUpdate(@RequestParam Map<String, Object> param) throws Exception {
		String passwd = passwordEncode.encode(param.get("passwd").toString());
		int result = 0;
		
		try {
			String updateId = param.get("adminId").toString();
			
			param.put("updateId", updateId);
			param.put("passwd", passwd);
			
			int emailCheckCnt = adminMapper.emailCheck(param);
			int phoneCheckCnt = adminMapper.phoneCheck(param);
			
			if (emailCheckCnt > 0) {
				result = -1;
				return result;
			} else if (phoneCheckCnt > 0) {
				result = -2;
				return result;
			} else if (emailCheckCnt + phoneCheckCnt == 0) {
				adminService.adminUdpate(param);
				result = 1;
				return result;
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
	
	@PostMapping(value = "/viewAdmin")
	public Map<String, Object> viewAdmin(HttpSession session) {
		Map<String, Object> map = new HashMap<>();
		
		if(session.getAttribute("adminId") != null) {
			map.put("adminNo", session.getAttribute("adminNo").toString());
			
			map.put("data", adminMapper.viewMember(map));
		}
		
		return map;
	}
	
	@PostMapping(value = "/adminSecChk")
	public void adminSecChk(@RequestBody List<Long> checkArr) {
		adminService.adminSecChk(checkArr);
	}
	
	@PostMapping(value = "/adminRestoreChk")
	public void adminRestoreChk(@RequestBody List<Long> checkArr) {
		adminService.adminRestoreChk(checkArr);
	}
}
