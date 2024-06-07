package com.ru.mykonkursmobile.repositoryes;

import com.ru.mykonkursmobile.models.ArtGroup;
import com.ru.mykonkursmobile.models.Competition;
import com.ru.mykonkursmobile.models.Invitation;
import com.ru.mykonkursmobile.models.StatementParticipant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvitationRepository extends JpaRepository<Invitation,Integer> {
    Page<Invitation> findAllByCompetition(Competition competition, Pageable pageable);

    Page<Invitation> findAllByGroup(ArtGroup group, Pageable pageable);
}
