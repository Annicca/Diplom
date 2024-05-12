package com.ru.mykonkursmobile.repositoryes;

import com.ru.mykonkursmobile.models.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CityRepository extends JpaRepository<City,Integer> {
}
