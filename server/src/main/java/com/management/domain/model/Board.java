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
import lombok.Setter;

// @NoArgsConstructor(access = AccessLevel.PROTECTED) 
@Getter 
@Setter
@Entity 
@Table(name = "board")
@SequenceGenerator(name = "BOARD_SEQ_GENERATOR", sequenceName = "BOARD_SEQ", initialValue = 1, allocationSize = 1)
@Embeddable
public class Board { 
	// 게시판번호
    @Id 
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "BOARD_SEQ_GENERATOR")
    private Long bno; 
    
    // 제목
    @Column(length = 200, nullable = false)
    private String title;
    
    // 작성자
    @Column(length = 50, nullable = false)
    private String writer;
    
    // 내용
    @Column(length = 4000, nullable = true)
    private String content;
    
    // 생성일
    @CreationTimestamp
    private LocalDateTime createDt;
    
    // 수정일
    @UpdateTimestamp
    private LocalDateTime updateDt;
    
    // 조회수
    @ColumnDefault("0")
    private Long viewcnt;
    
    // 수정여부
    @Column(length = 2)
    private String updateYn;
    
    // 작성여부
    @Column(length = 2)
    private String writeYn;
    
    // 게시물 종류
    @Column(length = 100,nullable = false)
    private String brdCode; 
    
    // 작성자 번호
    @Column(nullable = false)
    private Long writerNo;
    
    // 사용여부
    @Column(length = 2)
    private String useYn;
    
    // 삭제여부
    @Column(length = 2)
    private String delYn;
    
    public Board() {
		super();
		// TODO Auto-generated constructor stub
	}

    @Builder
	public Board(Long bno, String title, String writer, String content, LocalDateTime createDt, LocalDateTime updateDt,
			Long viewcnt, String updateYn, String writeYn, String brdCode, Long writerNo, String useYn, String delYn) {
		super();
		this.bno = bno;
		this.title = title;
		this.writer = writer;
		this.content = content;
		this.createDt = createDt;
		this.updateDt = updateDt;
		this.viewcnt = viewcnt;
		this.updateYn = updateYn;
		this.writeYn = writeYn;
		this.brdCode = brdCode;
		this.writerNo = writerNo;
		this.useYn = useYn;
		this.delYn = delYn;
	}

	public Long getBno() {
		return bno;
	}

	public void setBno(Long bno) {
		this.bno = bno;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getWriter() {
		return writer;
	}

	public void setWriter(String writer) {
		this.writer = writer;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
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

	public Long getViewcnt() {
		return viewcnt;
	}

	public void setViewcnt(Long viewcnt) {
		this.viewcnt = viewcnt;
	}

	public String getUpdateYn() {
		return updateYn;
	}

	public void setUpdateYn(String updateYn) {
		this.updateYn = updateYn;
	}

	public String getWriteYn() {
		return writeYn;
	}

	public void setWriteYn(String writeYn) {
		this.writeYn = writeYn;
	}

	public String getBrdCode() {
		return brdCode;
	}

	public void setBrdCode(String brdCode) {
		this.brdCode = brdCode;
	}

	public Long getWriterNo() {
		return writerNo;
	}

	public void setWriterNo(Long writerNo) {
		this.writerNo = writerNo;
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