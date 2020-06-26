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
@Table(name = "recommendation")
@SequenceGenerator(name = "RECOM_SEQ_GENERATOR", sequenceName = "RECOM_SEQ", initialValue = 1, allocationSize = 1)
@Embeddable
public class Recommendation { 
	// 추천코드
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "RECOM_SEQ_GENERATOR")
	private Long recomNo;
	
	// 게시판코드
    @Column(nullable = false)
    private Long bno; 
    
    // 댓글코드
    @Column(nullable = false)
    private Long rno;
    
    // 회원코드
    @Column(nullable = false)
    private Long memberNo;
    
    // 생성일
    @CreationTimestamp
    private LocalDateTime createDt;
    
    // 수정일
    @UpdateTimestamp
    private LocalDateTime updateDt;
    
    // 추천여부
    @Column(length = 2)
    private String recYn;
    
    public Recommendation() {
		super();
	}
    
    @Builder
    public Recommendation(Long recomNo, Long bno, Long rno, Long memberNo, LocalDateTime createDt,
			LocalDateTime updateDt, String recYn) {
		super();
		this.recomNo = recomNo;
		this.bno = bno;
		this.rno = rno;
		this.memberNo = memberNo;
		this.createDt = createDt;
		this.updateDt = updateDt;
		this.recYn = recYn;
	}

	public Long getRecomNo() {
		return recomNo;
	}

	public void setRecomNo(Long recomNo) {
		this.recomNo = recomNo;
	}

	public Long getBno() {
		return bno;
	}

	public void setBno(Long bno) {
		this.bno = bno;
	}

	public Long getRno() {
		return rno;
	}

	public void setRno(Long rno) {
		this.rno = rno;
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

	public String getRecYn() {
		return recYn;
	}

	public void setRecYn(String recYn) {
		this.recYn = recYn;
	}
}