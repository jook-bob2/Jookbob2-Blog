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
@Table(name = "member_info", uniqueConstraints = {
		@UniqueConstraint(columnNames = {"userId", "email"})
})
@SequenceGenerator(name = "MEMBER_SEQ_GENERATOR", sequenceName = "MEMBER_SEQ", initialValue = 1, allocationSize = 1)
public class Member { 
	// 관리자번호
    @Id 
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "MEMBER_SEQ_GENERATOR")
    private Long memberNo; 
    
    // 아이디
    @Column(length = 30, nullable = false)
    private String userId;
    
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
    
    // 주소1
    @Column(length = 100, nullable = true)
    private String address1;
    
    // 주소2
    @Column(length = 100, nullable = true)
    private String address2;
    
    // 우편번호
    @Column(length = 20, nullable = true)
    private String postNo;
    
    
    public Member() {
		super();
		// TODO Auto-generated constructor stub
	}

    @Builder
	public Member(Long memberNo, String userId, String passwd, String name, String email, LocalDateTime createDt,
			LocalDateTime updateDt, String address1, String address2, String postNo) {
		this.memberNo = memberNo;
		this.userId = userId;
		this.passwd = passwd;
		this.name = name;
		this.email = email;
		this.createDt = createDt;
		this.updateDt = updateDt;
		this.address1 = address1;
		this.address2 = address2;
		this.postNo = postNo;
	}

	public Long getMemberNo() {
		return memberNo;
	}

	public void setMemberNo(Long memberNo) {
		this.memberNo = memberNo;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
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

}