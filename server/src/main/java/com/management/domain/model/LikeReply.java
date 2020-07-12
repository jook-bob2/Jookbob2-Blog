package com.management.domain.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Embeddable;
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
@Table(name = "like_reply")
@SequenceGenerator(name = "LIKE_SEQ_GENERATOR", sequenceName = "LIKE_SEQ", initialValue = 1, allocationSize = 1)
@Embeddable
public class LikeReply { 
	// 좋아요 코드
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "LIKE_SEQ_GENERATOR")
	private Long likeNo;
	
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
    
    // 좋아요 여부
    @Column(length = 2)
    private String likeYn;
    
    public LikeReply() {
		super();
	}

    @Builder
	public LikeReply(Long likeNo, Long rcd, Long memberNo, LocalDateTime createDt, LocalDateTime updateDt, String useYn,
			String delYn, String likeYn) {
		super();
		this.likeNo = likeNo;
		this.rcd = rcd;
		this.memberNo = memberNo;
		this.createDt = createDt;
		this.updateDt = updateDt;
		this.useYn = useYn;
		this.delYn = delYn;
		this.likeYn = likeYn;
	}

	public Long getLikeNo() {
		return likeNo;
	}

	public void setLikeNo(Long likeNo) {
		this.likeNo = likeNo;
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

	public String getLikeYn() {
		return likeYn;
	}

	public void setLikeYn(String likeYn) {
		this.likeYn = likeYn;
	}
}