package com.ru.mykonkursmobile.repositoryes;

import com.ru.mykonkursmobile.models.GroupUpdate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupUpdateRepository extends JpaRepository<GroupUpdate,Integer> {
    @Query("select g from GroupUpdate g where g.statusModeration = 'ON_MODERATION'")
    Page<GroupUpdate> findAllByStatusModeration(Pageable pageable);
}
