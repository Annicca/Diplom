package com.ru.mykonkursmobile.repositoryes;

import com.ru.mykonkursmobile.models.Act;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActRepository extends JpaRepository<Act,Integer> {
}
