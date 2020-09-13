package com.management.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.management.domain.ManagementDTO;
import com.management.service.ManagementService;
import com.management.util.S3Service;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("api")
@AllArgsConstructor
public class ManagementController {
	@Autowired
	private ManagementService managementService;
	
	@Autowired
	private S3Service s3Service;
	
	@GetMapping(value = "/customers") 
	public Map<String, Object> getManagementList() {
		List<ManagementDTO> customers = managementService.getManagementList();
		Map<String, Object> map = new HashMap<>();
		map.put("data", customers);
		return map; 
	}
	@PostMapping(value = "/customers", headers = "content-type=multipart/form-data")
	public void customersAdd(@RequestParam Map<String, Object> param,
			@RequestPart("image") MultipartFile file) throws Exception {
		ManagementDTO dto = new ManagementDTO();
		String name = (String) param.get("name");
		String birthday = (String) param.get("birthday");
		String gender = (String) param.get("gender");
		String job = (String) param.get("job");
		
		dto.setName(name);
		dto.setBirthday(birthday);
		dto.setGender(gender);
		dto.setJob(job);
		
		if (file != null) {
			String url = s3Service.upload(file, "upload/", file.getBytes());
			dto.setImage(url);
			managementService.customerAdd(dto);
		}
	}
	
	@RequestMapping(value = "customers/{id}", method = RequestMethod.DELETE)
	public void customerDelete(@PathVariable("id") Long id) {
		managementService.deleteManagement(id);
	}
	
}
