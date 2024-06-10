package com.ru.mykonkursmobile.repositoryes;

import com.ru.mykonkursmobile.models.CompetitionUpdate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CompetitionUpdateRepository extends JpaRepository<CompetitionUpdate,Integer> {
    @Query("select c from CompetitionUpdate c where c.statusModeration = 'ON_MODERATION'")
    Page<CompetitionUpdate> findAllByStatusModeration(Pageable pageable);
}
