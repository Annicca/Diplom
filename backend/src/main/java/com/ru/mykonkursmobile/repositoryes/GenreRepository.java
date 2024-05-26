package com.ru.mykonkursmobile.repositoryes;

import com.ru.mykonkursmobile.models.Genre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GenreRepository extends JpaRepository<Genre,Integer> {

}
