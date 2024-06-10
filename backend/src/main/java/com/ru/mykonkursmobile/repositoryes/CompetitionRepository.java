package com.ru.mykonkursmobile.repositoryes;

import com.ru.mykonkursmobile.filter.CompetitionFilter;
import com.ru.mykonkursmobile.models.Competition;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;


@Repository
public interface CompetitionRepository extends JpaRepository<Competition,Integer>, JpaSpecificationExecutor<Competition> {

    @Query(value = "select * from competition where status_competition != 'CANCELLED' ", nativeQuery = true)
    List<Competition> findAllNotCancel();

    @Query(value = "select * from competition where id_user = :id order by id_competition desc", nativeQuery = true)
    Page<Competition> findByOrganizerId(@Param("id") Integer id, Pageable pageable);

    @Query(value = "select * from competition where id_user = :id and status_competition = 'CREATED'", nativeQuery = true)
    Page<Competition> findStartedByOrganizerId(@Param("id") Integer id, Pageable pageable);

    @Query(value = "select * from competition c WHERE c.id_competition in (select p.id_competition from participant p where p.id_group = :idGroup) limit 10", nativeQuery = true)
    List<Competition> findByGroupLimit(@Param("idGroup") Integer idGroup);

    @Query(value = "select * from competition c WHERE c.id_competition in (select p.id_competition from participant p where p.id_group = :idGroup)", nativeQuery = true)
    Page<Competition> findByGroup(@Param("idGroup") Integer idGroup, Pageable pageable);

    
}
