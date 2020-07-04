package com.management.domain.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.Builder;
import lombok.Getter;

//@NoArgsConstructor(access = AccessLevel.PROTECTED) 
@Getter 
@Entity 
@Table(name = "upload")
@SequenceGenerator(name = "UPLOAD_SEQ_GENERATOR", sequenceName = "UPLOAD_SEQ", initialValue = 1, allocationSize = 1)
public class Upload { 
	// 업로드 코드
    @Id 
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "UPLOAD_SEQ_GENERATOR")
    private Long uploadCd; 
    
    // 작성자 코드
    @Column(nullable = false)
    private Long memberNo;
    
    // 파일 URL
    @Column(length = 1024, nullable = false)
    private String fileUrl;
    
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
    
    
    public Upload() {
		super();
		// TODO Auto-generated constructor stub
	}

    @Builder
	public Upload(Long uploadCd, Long memberNo, String fileUrl, LocalDateTime createDt,
			LocalDateTime updateDt, String useYn, String delYn) {
		super();
		this.uploadCd = uploadCd;
		this.memberNo = memberNo;
		this.fileUrl = fileUrl;
		this.createDt = createDt;
		this.updateDt = updateDt;
		this.useYn = useYn;
		this.delYn = delYn;
	}

	public Long getUploadCd() {
		return uploadCd;
	}

	public void setUploadCd(Long uploadCd) {
		this.uploadCd = uploadCd;
	}

	public Long getMemberNo() {
		return memberNo;
	}

	public void setMemberNo(Long memberNo) {
		this.memberNo = memberNo;
	}

	public String getFileUrl() {
		return fileUrl;
	}

	public void setFileUrl(String fileUrl) {
		this.fileUrl = fileUrl;
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