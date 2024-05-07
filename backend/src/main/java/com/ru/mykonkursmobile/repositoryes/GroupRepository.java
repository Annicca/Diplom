package com.ru.mykonkursmobile.repositoryes;

import com.ru.mykonkursmobile.models.ArtGroup;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupRepository extends JpaRepository<ArtGroup,Integer> {

    Page<ArtGroup> findAllByOrderByIdGroupDesc(Pageable pageable);

    @Query(value = "select * from art_group WHERE id_city in (select c.id_city from city c where c.city like :city% )", nativeQuery = true)
    Page<ArtGroup> findAllByCityGroup(@Param("city")String city, Pageable pageable);

    @Query(value = "select a from ArtGroup a WHERE a.director.idUser = :id")
    Page<ArtGroup> findByDirectorId(@Param("id") Integer id, Pageable pageable);

    @Query(value ="select * from art_group WHERE id_user = :id", nativeQuery = true)
    List<ArtGroup> findListByDirectorId(@Param("id") Integer id);

    @Query(value ="select * from art_group g WHERE g.id_group in (select p.id_group from participant p where p.id_competition = :idCompetition)", nativeQuery = true)
    List<ArtGroup> findParticipant(@Param("idCompetition") Integer idCompetition);

    @Query(value ="select * from art_group g WHERE g.id_group in (select p.id_group from participant p where p.id_competition = :idCompetition)", nativeQuery = true)
    Page<ArtGroup> findPageParticipant(@Param("idCompetition") Integer idCompetition, Pageable pageable);

}
