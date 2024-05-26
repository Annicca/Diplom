package com.ru.mykonkursmobile.repositoryes;

import com.ru.mykonkursmobile.models.AgeCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AgeCategoryRepository extends JpaRepository<AgeCategory,Integer> {
}
