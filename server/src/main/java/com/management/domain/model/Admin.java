package com.management.domain.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

//@NoArgsConstructor(access = AccessLevel.PROTECTED) 
@Getter 
@Entity 
@Table(name = "admin_info", uniqueConstraints = {
		@UniqueConstraint(columnNames = {"adminId", "email"})
})
@SequenceGenerator(name = "ADMIN_SEQ_GENERATOR", sequenceName = "ADMIN_SEQ", initialValue = 1, allocationSize = 1)
public class Admin { 
	// 관리자번호
    @Id 
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ADMIN_SEQ_GENERATOR")
    private Long adminNo; 
    
    // 아이디
    @Column(length = 30, nullable = false)
    private String adminId;
    
    // 패스워드
    @Column(length = 150, nullable = false)
    private String passwd;
    
    // 이름
    @Column(length = 20, nullable = false)
    private String name;
    
    // 이메일
    @Column(length = 100, nullable = false)
    private String email;
    
    // 가입일
    @CreationTimestamp
    private LocalDateTime createDt;
    
    // 수정일
    @UpdateTimestamp
    private LocalDateTime updateDt;
    
    // 연락처
    @Column(length = 20, nullable = true)
    private String phoneNo;
    
    // 주소1
    @Column(length = 100, nullable = true)
    private String address1;
    
    // 주소2
    @Column(length = 100, nullable = true)
    private String address2;
    
    // 우편번호
    @Column(length = 20, nullable = true)
    private String postNo;
    
    // 프로필 이미지
    @Column(length = 1024)
    private String profileImg;
    
    // 사용여부
    @Column(length = 2)
    private String useYn;
    
    // 탈퇴여부 
    @Column(length = 2)
    private String secYn;
    
    public Admin() {
		super();
		// TODO Auto-generated constructor stub
	}

    @Builder
	public Admin(Long adminNo, String adminId, String passwd, String name, String email, LocalDateTime createDt,
			LocalDateTime updateDt, String phoneNo, String address1, String address2, String postNo, String profileImg,
			String useYn, String secYn) {
		super();
		this.adminNo = adminNo;
		this.adminId = adminId;
		this.passwd = passwd;
		this.name = name;
		this.email = email;
		this.createDt = createDt;
		this.updateDt = updateDt;
		this.phoneNo = phoneNo;
		this.address1 = address1;
		this.address2 = address2;
		this.postNo = postNo;
		this.profileImg = profileImg;
		this.useYn = useYn;
		this.secYn = secYn;
	}

	public Long getAdminNo() {
		return adminNo;
	}

	public void setAdminNo(Long adminNo) {
		this.adminNo = adminNo;
	}

	public String getAdminId() {
		return adminId;
	}

	public void setAdminId(String adminId) {
		this.adminId = adminId;
	}

	public String getPasswd() {
		return passwd;
	}

	public void setPasswd(String passwd) {
		this.passwd = passwd;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
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

	public String getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}

	public String getAddress1() {
		return address1;
	}

	public void setAddress1(String address1) {
		this.address1 = address1;
	}

	public String getAddress2() {
		return address2;
	}

	public void setAddress2(String address2) {
		this.address2 = address2;
	}

	public String getPostNo() {
		return postNo;
	}

	public void setPostNo(String postNo) {
		this.postNo = postNo;
	}

	public String getProfileImg() {
		return profileImg;
	}

	public void setProfileImg(String profileImg) {
		this.profileImg = profileImg;
	}

	public String getUseYn() {
		return useYn;
	}

	public void setUseYn(String useYn) {
		this.useYn = useYn;
	}

	public String getSecYn() {
		return secYn;
	}

	public void setSecYn(String secYn) {
		this.secYn = secYn;
	}
}