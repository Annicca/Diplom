package com.ru.mykonkursmobile.repositoryes;

import com.ru.mykonkursmobile.models.GroupCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupCategoryRepository extends JpaRepository<GroupCategory,Integer> {
}
