package com.ru.mykonkursmobile.repositoryes;

import com.ru.mykonkursmobile.models.Competition;
import com.ru.mykonkursmobile.models.Participant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant,Integer> {
    Page<Participant> findAllByCompetition(Competition competition, Pageable pageable);
}
