package com.ru.mykonkursmobile.repositoryes;

import com.ru.mykonkursmobile.models.ArtGroup;
import com.ru.mykonkursmobile.models.Competition;
import com.ru.mykonkursmobile.models.Statement;
import com.ru.mykonkursmobile.models.StatementParticipant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StatementParticipantRepository extends JpaRepository<StatementParticipant,Integer> {

    @Query(value = "select * from statement_participant where id_user = :id order by id desc", nativeQuery = true)
    Page<StatementParticipant> findAllByUserId(@Param("id") Integer id, Pageable pageable);

    StatementParticipant findFirstByCompetitionAndGroup(Competition competition, ArtGroup group);

    Page<StatementParticipant> findAllByCompetition(Competition competition, Pageable pageable);
}
