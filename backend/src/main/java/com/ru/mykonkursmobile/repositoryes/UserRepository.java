package com.ru.mykonkursmobile.repositoryes;

import com.ru.mykonkursmobile.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    @Query(value = "select * from User where login_user = :login", nativeQuery = true)
    Page<User> findByLogin(@Param("login") String loginUser, Pageable pageable);

    @Query(value = "select * from User where login_user = :login", nativeQuery = true)
    User getByLogin(@Param("login") String loginUser);
}
