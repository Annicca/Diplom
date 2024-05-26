package com.ru.mykonkursmobile.repositoryes;

import com.ru.mykonkursmobile.models.Perfomance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PerfomanceRepository extends JpaRepository<Perfomance,Integer> {
}
