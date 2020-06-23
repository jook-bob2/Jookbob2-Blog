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
@Embeddable
public class Reply { 
	// 게시판번호
    @Id 
    private Long bno; 
    
    // 댓글번호
    @Column(nullable = false)
    private Long rno;
    
    // 댓글내용
    @Column(length = 2000 ,nullable = false)
    private String replytext;
    
    // 작성자
    @Column(length = 50, nullable = false)
    private String replyer;
    
    // 작성자코드
    @Column(length = 4000, nullable = false)
    private String replyerNo;
    
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
    
    // 게시물 종류
    @Column(length = 100,nullable = false)
    private String brdCode; 
    
    // 사용여부
    @Column(length = 2)
    private String useYn;
    
    // 삭제여부
    @Column(length = 2)
    private String delYn;
    
    public Reply() {
		super();
	}
    
	@Builder
	public Reply(Long bno, Long rno, String replytext, String replyer, String replyerNo, LocalDateTime createDt,
			LocalDateTime updateDt, String writeYn, String updateYn, String brdCode, String useYn, String delYn) {
		super();
		this.bno = bno;
		this.rno = rno;
		this.replytext = replytext;
		this.replyer = replyer;
		this.replyerNo = replyerNo;
		this.createDt = createDt;
		this.updateDt = updateDt;
		this.writeYn = writeYn;
		this.updateYn = updateYn;
		this.brdCode = brdCode;
		this.useYn = useYn;
		this.delYn = delYn;
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

	public String getReplytext() {
		return replytext;
	}

	public void setReplytext(String replytext) {
		this.replytext = replytext;
	}

	public String getReplyer() {
		return replyer;
	}

	public void setReplyer(String replyer) {
		this.replyer = replyer;
	}

	public String getReplyerNo() {
		return replyerNo;
	}

	public void setReplyerNo(String replyerNo) {
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

	public String getBrdCode() {
		return brdCode;
	}

	public void setBrdCode(String brdCode) {
		this.brdCode = brdCode;
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