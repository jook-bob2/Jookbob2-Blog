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

import io.micrometer.core.annotation.Counted;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

//@NoArgsConstructor(access = AccessLevel.PROTECTED) 
@Getter 
@Entity 
@Table(name = "hate_reply")
@SequenceGenerator(name = "HATE_SEQ_GENERATOR", sequenceName = "HATE_SEQ", initialValue = 1, allocationSize = 1)
@Embeddable
public class HateReply { 
	// 싫어요 코드
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "HATE_SEQ_GENERATOR")
	private Long hateNo;
	
    // 댓글코드
    @Column(nullable = false, unique = true)
    private Long rcd;
    
    // 회원코드
    @Column(nullable = false, unique = true)
    private Long memberNo;
    
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
    
    // 싫어요 여부
    @Column(length = 2)
    private String hateYn;
    
    public HateReply() {
		super();
	}

    @Builder
	public HateReply(Long hateNo, Long rcd, Long memberNo, LocalDateTime createDt, LocalDateTime updateDt, String useYn,
			String delYn, String hateYn) {
		super();
		this.hateNo = hateNo;
		this.rcd = rcd;
		this.memberNo = memberNo;
		this.createDt = createDt;
		this.updateDt = updateDt;
		this.useYn = useYn;
		this.delYn = delYn;
		this.hateYn = hateYn;
	}

	public Long getHateNo() {
		return hateNo;
	}

	public void setHateNo(Long hateNo) {
		this.hateNo = hateNo;
	}

	public Long getRcd() {
		return rcd;
	}

	public void setRcd(Long rcd) {
		this.rcd = rcd;
	}

	public Long getMemberNo() {
		return memberNo;
	}

	public void setMemberNo(Long memberNo) {
		this.memberNo = memberNo;
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

	public String getHateYn() {
		return hateYn;
	}

	public void setHateYn(String hateYn) {
		this.hateYn = hateYn;
	}
}