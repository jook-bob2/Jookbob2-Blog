package com.management.domain.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter
@Entity 
@Table(name = "ft_menu")
@Embeddable
public class FtMenu { 
	// 메뉴코드
    @Id
    @Column(length = 20)
    private String menuCd; 
    
    // 상위메뉴코드
    @Column(length = 20)
    private String upperMenuCd;
    
    // 메뉴이름
    @Column(length = 50, nullable = false)
    private String menuNm;
    
    // 메뉴아이콘
    @Column(length = 50)
    private String menuIcon;
    
    // 메뉴순서
    @Column
    private int menuOrdr;
    
    // 메뉴레벨
    @Column
    private int menuLvl;
    
    // 경로
    @Column(length = 20)
    private String pathSrc;
    
    // 생성일
    @CreationTimestamp
    private LocalDateTime createDt;
    
    // 수정일
    @UpdateTimestamp
    private LocalDateTime updateDt;
    
    // 사용여부
    @Column(length = 2)
    private String useYn;
    
    // 삭제여부
    @Column(length = 2)
    private String delYn;
    
    public FtMenu() {
		super();
		// TODO Auto-generated constructor stub
	}

    @Builder
	public FtMenu(String menuCd, String upperMenuCd, String menuNm, String menuIcon, int menuOrdr, int menuLvl,
			String pathSrc, LocalDateTime createDt, LocalDateTime updateDt, String useYn, String delYn) {
		super();
		this.menuCd = menuCd;
		this.upperMenuCd = upperMenuCd;
		this.menuNm = menuNm;
		this.menuIcon = menuIcon;
		this.menuOrdr = menuOrdr;
		this.menuLvl = menuLvl;
		this.pathSrc = pathSrc;
		this.createDt = createDt;
		this.updateDt = updateDt;
		this.useYn = useYn;
		this.delYn = delYn;
	}

	public String getMenuCd() {
		return menuCd;
	}

	public void setMenuCd(String menuCd) {
		this.menuCd = menuCd;
	}

	public String getUpperMenuCd() {
		return upperMenuCd;
	}

	public void setUpperMenuCd(String upperMenuCd) {
		this.upperMenuCd = upperMenuCd;
	}

	public String getMenuNm() {
		return menuNm;
	}

	public void setMenuNm(String menuNm) {
		this.menuNm = menuNm;
	}

	public String getMenuIcon() {
		return menuIcon;
	}

	public void setMenuIcon(String menuIcon) {
		this.menuIcon = menuIcon;
	}

	public int getMenuOrdr() {
		return menuOrdr;
	}

	public void setMenuOrdr(int menuOrdr) {
		this.menuOrdr = menuOrdr;
	}

	public int getMenuLvl() {
		return menuLvl;
	}

	public void setMenuLvl(int menuLvl) {
		this.menuLvl = menuLvl;
	}

	public String getPathSrc() {
		return pathSrc;
	}

	public void setPathSrc(String pathSrc) {
		this.pathSrc = pathSrc;
	}

	public LocalDateTime getCreateDt() {
		return createDt;
	}

	public void setCreateDt(LocalDateTime createDt) {
		this.createDt = createDt;
	}

	public LocalDateTime getUpdateDt() {
		return updateDt;
	}

	public void setUpdateDt(LocalDateTime updateDt) {
		this.updateDt = updateDt;
	}

	public String getUseYn() {
		return useYn;
	}

	public void setUseYn(String useYn) {
		this.useYn = useYn;
	}

	public String getDelYn() {
		return delYn;
	}

	public void setDelYn(String delYn) {
		this.delYn = delYn;
	}
}