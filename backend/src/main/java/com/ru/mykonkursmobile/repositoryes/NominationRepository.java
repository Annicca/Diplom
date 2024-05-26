package com.ru.mykonkursmobile.repositoryes;

import com.ru.mykonkursmobile.models.Nomination;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface NominationRepository extends JpaRepository<Nomination,Integer> {

}
