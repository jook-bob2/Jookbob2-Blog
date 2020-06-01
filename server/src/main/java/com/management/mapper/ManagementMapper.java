package com.management.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.management.domain.ManagementDTO;

@Mapper
// 기존의 스프링에서 Data Access Object(이하 DAO) 클래스에 @Repository를 지정해서 해당 클래스가 데이터베이스와 통신하는 클래스임을 나타내고는 했었습니다.
// 하지만 마이바티스(MyBatis)는 인터페이스에 @Mapper만 지정해주면 XML에서 메서드의 이름과 일치하는 SQL 문을 찾아서 실행합니다. 
// Mapper 영역은 데이터베이스와의 통신, 즉 쿼리를 호출하는 것이 전부이기 때문에 다른 로직은 전혀 필요하지 않습니다.
public interface ManagementMapper {
	public int insertManagement(ManagementDTO params);
	
	public int deleteManagement(Long id);
	
	public List<ManagementDTO> selectManagementList();
	
	public void insertCustomer(ManagementDTO dto);
}
