package com.ru.mykonkursmobile.repositoryes;

import com.ru.mykonkursmobile.models.Statement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StatementRepository extends JpaRepository<Statement,Integer> {

    Page<Statement> findAllByIdStatement(Integer idStatement, Pageable pageable);

    Page<Statement> findAllByOrderByStatusStatement(Pageable pageable);

    @Query(value = "select * from statement where id_user = :id order by id_statement desc", nativeQuery = true)
    Page<Statement> findAllByUserId(@Param("id") Integer id, Pageable pageable);
}
