package com.management.domain.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

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
@Table(name = "board_kinds")
@SequenceGenerator(name = "BOARD_KINDS_SEQ_GENERATOR", sequenceName = "BOARD_KINDS_SEQ", initialValue = 1, allocationSize = 1)
@Embeddable
public class BoardKinds { 
	// 게시판 종류 번호
    @Id 
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "BOARD_KINDS_SEQ_GENERATOR")
    private Long bKindsNo; 
    
    // 게시판 종류 코드
    @Column(length = 100, nullable = false)
    private String brdCode;
    
    // 게시판 종류 텍스트
    @Column(length = 100, nullable = false)
    private String brdText;
    
    // 게시판 종류 노출값
    @Column(length = 100, nullable = false)
    private String showText;
    
    // 생성일
    @CreationTimestamp
    private LocalDateTime createDt;
    
    // 수정일
    @UpdateTimestamp
    private LocalDateTime updateDt;
    
    // 수정여부
    @Column(length = 2)
    private String updateYn;
    
    // 사용여부
    @Column(length = 2)
    private String useYn;
    
    // 삭제여부
    @Column(length = 2)
    private String delYn;
    
    public BoardKinds() {
		super();
		// TODO Auto-generated constructor stub
	}

    @Builder
	public BoardKinds(Long bKindsNo, String brdCode, String brdText, String showText, LocalDateTime createDt,
			LocalDateTime updateDt, String updateYn, String useYn, String delYn) {
		super();
		this.bKindsNo = bKindsNo;
		this.brdCode = brdCode;
		this.brdText = brdText;
		this.showText = showText;
		this.createDt = createDt;
		this.updateDt = updateDt;
		this.updateYn = updateYn;
		this.useYn = useYn;
		this.delYn = delYn;
	}

	public Long getbKindsNo() {
		return bKindsNo;
	}

	public void setbKindsNo(Long bKindsNo) {
		this.bKindsNo = bKindsNo;
	}

	public String getBrdCode() {
		return brdCode;
	}

	public void setBrdCode(String brdCode) {
		this.brdCode = brdCode;
	}

	public String getBrdText() {
		return brdText;
	}

	public void setBrdText(String brdText) {
		this.brdText = brdText;
	}

	public String getShowText() {
		return showText;
	}

	public void setShowText(String showText) {
		this.showText = showText;
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

	public String getUpdateYn() {
		return updateYn;
	}

	public void setUpdateYn(String updateYn) {
		this.updateYn = updateYn;
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