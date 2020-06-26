package com.management.domain.repository.recommendation;

import org.springframework.data.jpa.repository.JpaRepository;

import com.management.domain.model.Recommendation;

public interface RecommendationRepository extends JpaRepository<Recommendation, Long>{

}
