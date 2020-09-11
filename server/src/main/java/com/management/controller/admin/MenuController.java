package com.management.controller.admin;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.management.domain.model.BoardKinds;
import com.management.domain.repository.boardKinds.BoardKindsRepository;
import com.management.mapper.admin.MenuMapper;
import com.management.mapper.board.BoardMapper;
import com.management.service.admin.MenuService;

@RestController
@RequestMapping("menu")
public class MenuController {
	@Autowired
	private MenuService menuService;
	
	@Autowired
	private MenuMapper menuMapper;
	
	@Autowired
	private BoardKindsRepository boardKindsRepo;
	
	@Autowired
	private BoardMapper boardMapper;
	
	@PostMapping(value = "/menuList")
	public Map<String, Object> menuList(@RequestParam Map<String, Object> param) {
		Map<String, Object> map = new HashMap<>();
		
		int page = Integer.parseInt(param.get("page").toString());
		int rowsPerPage = Integer.parseInt(param.get("rowsPerPage").toString());
		
		int pageBegin = (page - 1) * rowsPerPage; // 0, 5, 10 이런식으로 페이징
		
		param.put("pageBegin", pageBegin);
		param.put("pageEnd", rowsPerPage);
		
		List<Map<String, Object>> menuList = menuService.menuList(param);
		
		int menuCnt = menuMapper.menuCnt(param);
		
		map.put("list", menuList);
		map.put("menuCnt", menuCnt);
		
		return map;
	}
	
	@PostMapping(value = "/menuUpdate")
	public String menuUpdate(@RequestParam Map<String, Object> param) {
		System.out.println(param.toString());
		String msg = "error";
		String menuCd = param.get("menuCd").toString();
		String orgMenuCd = param.get("orgMenuCd").toString();
		String menuType = param.get("menuType").toString();
		String pathSrc = param.get("pathSrc").toString();
		boolean dupMenuCdCheck = menuService.dupMenuCdCheck(menuCd);
		boolean dupPathCheck = boardMapper.dupPathCheck(pathSrc);
		
		if (!dupPathCheck) {
			if (menuType.equals("list")) {
				param.put("menuIcon", "/images/icons/list-24px.svg");
			} else if (menuType.equals("board")) {
				BoardKinds brdKindEntity = new BoardKinds();
				
				Map<String, Object> lowerBrdKindList = boardMapper.selectLowerBoardKind();
				String brdCode = lowerBrdKindList.get("brdCode").toString();
				String startBrdCode = brdCode.substring(0,1);
				int endBrdCode = Integer.parseInt(brdCode.substring(1)) + 1;
				String lastBrdCode = startBrdCode + endBrdCode;
				
				brdKindEntity.setBrdCode(lastBrdCode);
				brdKindEntity.setBrdText(param.get("pathSrc").toString());
				brdKindEntity.setShowText(param.get("menuNm").toString());
				boardKindsRepo.save(brdKindEntity);
				
				param.put("menuIcon", "/images/icons/note-24px.svg");
			}
		}
		
		if (!dupMenuCdCheck || menuCd.equals(orgMenuCd)) {
			menuMapper.menuUpdate(param);
			msg = "succeed";
			return msg;
		}
		
		return msg;
	}
	
	@DeleteMapping(value = "/menuDelete/{menuCd}")
	public void menuDelete(@PathVariable("menuCd") String menuCd) {
		menuMapper.menuDelete(menuCd);
	}
	
	@PostMapping(value = "/menuRestore/{menuCd}")
	public void menuRestore(@PathVariable("menuCd") String menuCd) {
		menuMapper.menuRestore(menuCd);
	}
	
	@PostMapping(value = "/createMenu")
	public String createMenu(@RequestParam Map<String, Object> param) {
		String msg = "error";
		String menuCd = param.get("menuCd").toString();
		String menuType = param.get("menuType").toString();
		int menuLvl = Integer.parseInt(param.get("menuLvl").toString());
		int menuOrdr = Integer.parseInt(param.get("menuOrdr").toString());
		boolean dupMenuCdCheck = menuService.dupMenuCdCheck(menuCd);
		
		param.put("menuLvl", menuLvl);
		param.put("menuOrdr", menuOrdr);
		
		if (menuType.equals("list")) {
			param.put("menuIcon", "/images/icons/list-24px.svg");
		} else if (menuType.equals("board")) {
			BoardKinds brdKindEntity = new BoardKinds();
			
			Map<String, Object> lowerBrdKindList = boardMapper.selectLowerBoardKind();
			String brdCode = lowerBrdKindList.get("brdCode").toString();
			String startBrdCode = brdCode.substring(0,1);
			int endBrdCode = Integer.parseInt(brdCode.substring(1)) + 1;
			String lastBrdCode = startBrdCode + endBrdCode;
			
			brdKindEntity.setBrdCode(lastBrdCode);
			brdKindEntity.setBrdText(param.get("pathSrc").toString());
			brdKindEntity.setShowText(param.get("menuNm").toString());
			boardKindsRepo.save(brdKindEntity);
			
			param.put("menuIcon", "/images/icons/note-24px.svg");
		}
		
		if (!dupMenuCdCheck) {
			menuMapper.createMenu(param);
			msg = "succeed";
			return msg;
		}
		
		return msg;
	}
}
