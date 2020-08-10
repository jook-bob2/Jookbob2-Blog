package com.management.controller.admin;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.management.domain.model.Member;
import com.management.mapper.admin.UserMapper;
import com.management.service.admin.UserService;
import com.management.util.S3Service;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("user")
@AllArgsConstructor
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncode;
	
	@Autowired
	private UserMapper userMapper;
	
	@Autowired
	private S3Service s3Service;
	
	@PostMapping(value = "/registration")
	public int registration(@RequestParam Map<String, Object> param) throws Exception {
		Member entity = new Member();
		String passwd = passwordEncode.encode(param.get("passwd").toString());
		int result = 0;
		
		try {
			entity.setAddress1(param.get("address1").toString());
			entity.setAddress2(param.get("address2").toString());
			entity.setUserId(param.get("userId").toString());
			entity.setEmail(param.get("email").toString());
			entity.setName(param.get("name").toString());
			entity.setPasswd(passwd);
			entity.setPhoneNo(param.get("phoneNo").toString());
			entity.setPostNo(param.get("postNo").toString());
			entity.setProfileImg(param.get("profileImg").toString());
			entity.setUseYn("Y");
			entity.setSecYn("N");
			
			int idCheckCnt = userMapper.userIdCheck(param);
			int emailCheckCnt = userMapper.userEmailCheck(param);
			int phoneCheckCnt = userMapper.userPhoneCheck(param);
			
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
				userService.registration(entity);
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
	
	@PostMapping(value = "/userList")
	public Map<String, Object> memberList(@RequestParam Map<String, Object> param) {
		Map<String, Object> map = new HashMap<>();
		
		int page = Integer.parseInt(param.get("page").toString());
		int rowsPerPage = Integer.parseInt(param.get("rowsPerPage").toString());
		
		int pageBegin = (page - 1) * rowsPerPage; // 0, 5, 10 이런식으로 페이징
		
		param.put("pageBegin", pageBegin);
		param.put("pageEnd", rowsPerPage);
		
		List<Map<String, Object>> userList = userService.userList(param);
		
		int userCnt = userMapper.userCnt(param);
		
		map.put("list", userList);
		map.put("userCnt", userCnt);
		
		return map;
	}
	
	@PostMapping(value = "/userUpdateList/{userId}")
	public Map<String, Object> userUpdateList(@PathVariable String userId) {
		Map<String, Object> updateList = userMapper.userUpdateList(userId);
		
		return updateList;
	}
	
	@PostMapping(value = "/userUpdate")
	public int userUpdate(@RequestParam Map<String, Object> param) throws Exception {
		String passwd = passwordEncode.encode(param.get("passwd").toString());
		int result = 0;
		
		try {
			String updateId = param.get("userId").toString();
			
			param.put("updateId", updateId);
			param.put("passwd", passwd);
			
			int emailCheckCnt = userMapper.userEmailCheck(param);
			int phoneCheckCnt = userMapper.userPhoneCheck(param);
			
			if (emailCheckCnt > 0) {
				result = -1;
				return result;
			} else if (phoneCheckCnt > 0) {
				result = -2;
				return result;
			} else if (emailCheckCnt + phoneCheckCnt == 0) {
				userService.userUpdate(param);
				result = 1;
				return result;
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
	
}
