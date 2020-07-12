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
@Table(name = "reply")
@SequenceGenerator(name = "REPLY_SEQ_GENERATOR", sequenceName = "REPLY_SEQ", initialValue = 1, allocationSize = 1)
@Embeddable
public class Reply { 
	// 댓글코드
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "REPLY_SEQ_GENERATOR")
	private Long rcd;
	
	// 게시판번호
    @Column(nullable = false)
    private Long bno; 
    
    // 댓글번호
    @Column(nullable = false)
    private Long rno;
    
    // 댓글내용
    @Column(length = 2000 ,nullable = false)
    private String replyText;
    
    // 작성자
    @Column(length = 50, nullable = false)
    private String replyer;
    
    // 작성자코드
    @Column(nullable = false)
    private Long replyerNo;
    
    // 생성일
    @CreationTimestamp
    private LocalDateTime createDt;
    
    // 수정일
    @UpdateTimestamp
    private LocalDateTime updateDt;
    
    // 작성여부
    @Column(length = 2)
    private String writeYn;
    
    // 수정여부
    @Column(length = 2)
    private String updateYn;
    
    // 사용여부
    @Column(length = 2)
    private String useYn;
    
    // 삭제여부
    @Column(length = 2)
    private String delYn;
    
    // 좋아요 갯수
    @Column
    private Long likeCnt;
    
    // 싫어요 갯수
    @Column
    private Long hateCnt;
    
    public Reply() {
		super();
	}

    @Builder
	public Reply(Long rcd, Long bno, Long rno, String replyText, String replyer, Long replyerNo, LocalDateTime createDt,
			LocalDateTime updateDt, String writeYn, String updateYn, String useYn, String delYn, Long likeCnt,
			Long hateCnt) {
		super();
		this.rcd = rcd;
		this.bno = bno;
		this.rno = rno;
		this.replyText = replyText;
		this.replyer = replyer;
		this.replyerNo = replyerNo;
		this.createDt = createDt;
		this.updateDt = updateDt;
		this.writeYn = writeYn;
		this.updateYn = updateYn;
		this.useYn = useYn;
		this.delYn = delYn;
		this.likeCnt = likeCnt;
		this.hateCnt = hateCnt;
	}

	public Long getRcd() {
		return rcd;
	}

	public void setRcd(Long rcd) {
		this.rcd = rcd;
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

	public String getReplyText() {
		return replyText;
	}

	public void setReplyText(String replyText) {
		this.replyText = replyText;
	}

	public String getReplyer() {
		return replyer;
	}

	public void setReplyer(String replyer) {
		this.replyer = replyer;
	}

	public Long getReplyerNo() {
		return replyerNo;
	}

	public void setReplyerNo(Long replyerNo) {
		this.replyerNo = replyerNo;
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

	public String getWriteYn() {
		return writeYn;
	}

	public void setWriteYn(String writeYn) {
		this.writeYn = writeYn;
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

	public Long getLikeCnt() {
		return likeCnt;
	}

	public void setLikeCnt(Long likeCnt) {
		this.likeCnt = likeCnt;
	}

	public Long getHateCnt() {
		return hateCnt;
	}

	public void setHateCnt(Long hateCnt) {
		this.hateCnt = hateCnt;
	}
}