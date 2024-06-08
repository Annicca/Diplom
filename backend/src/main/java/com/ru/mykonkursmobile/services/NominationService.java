package com.ru.mykonkursmobile.services;

import com.ru.mykonkursmobile.dto.NominationDto;
import com.ru.mykonkursmobile.exceptions.NotFoundEntityException;
import com.ru.mykonkursmobile.interfaces.INominationService;
import com.ru.mykonkursmobile.models.Competition;
import com.ru.mykonkursmobile.models.Genre;
import com.ru.mykonkursmobile.models.Nomination;
import com.ru.mykonkursmobile.models.Statement;
import com.ru.mykonkursmobile.repositoryes.GenreRepository;
import com.ru.mykonkursmobile.repositoryes.NominationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class NominationService implements INominationService {

    @Autowired
    NominationRepository repository;

    @Autowired
    GenreRepository genreRepository;
    @Override
    public List<Nomination> all() {
        return repository.findAll();
    }

    @Override
    public Nomination add(Nomination nomination) {
        List<Genre> genres = nomination.getGenres();
        if(!genres.isEmpty()) {
            genres.forEach(genre -> genre.setNomination(nomination));
        }
        return repository.save(nomination);
    }

    @Override
    public List<Nomination> addAll(List<Nomination> nominations, Statement statement) {
        return nominations.stream().map(nomination -> {
            nomination.setStatement(statement);
            return add(nomination);
        }).toList();
    }

    public List<Nomination> savePreparation(List<Nomination> nominations, Statement statement) {
        nominations.forEach(nomination -> {
            nomination.setStatement(statement);
            if(nomination.getGenres() != null && nomination.getGenres().size() > 0) {
                nomination.getGenres().forEach(genre -> {
                    genre.setNomination(nomination);
                });
            }
        });
        return nominations;
    }
    @Override
    public Nomination update(Nomination nomination) throws NotFoundEntityException {
        return repository.save(nomination);
    }

    @Override
    public void delete(Integer id) throws NotFoundEntityException {
        Nomination nomination = getById(id);
        repository.delete(nomination);
    }

    @Override
    public Nomination getById(Integer id) throws NotFoundEntityException {
        return repository.findById(id).orElseThrow(
                () -> new NotFoundEntityException(HttpStatus.NOT_FOUND, "Такой номинации не существует")
        );
    }

    public List<Nomination>  setCompetitionForAll(List<Nomination> nominations, Competition competition) {
        nominations.forEach(nomination -> nomination.setCompetition(competition));
        return new ArrayList<>(nominations);
    }
}
