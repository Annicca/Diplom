package com.ru.mykonkursmobile.services;

import com.ru.mykonkursmobile.exceptions.NotFoundEntityException;
import com.ru.mykonkursmobile.interfaces.IGenreService;
import com.ru.mykonkursmobile.models.Genre;
import com.ru.mykonkursmobile.repositoryes.GenreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GenreService implements IGenreService {

    @Autowired
    GenreRepository repository;

    @Override
    public List<Genre> all() {
        return repository.findAll();
    }

    @Override
    public Genre add(Genre genre) {
        return repository.save(genre);
    }

    @Override
    public List<Genre> addAll(List<Genre> genres) {
        return repository.saveAll(genres);
    }

    @Override
    public Genre update(Genre genre) throws NotFoundEntityException {
        return repository.save(genre);
    }

    @Override
    public void delete(Integer id) throws NotFoundEntityException {
        Genre genre = getById(id);
        repository.delete(genre);
    }

    @Override
    public Genre getById(Integer id) throws NotFoundEntityException {
        return repository.findById(id).orElseThrow(
                () -> new NotFoundEntityException(HttpStatus.NOT_FOUND, "Такого жанра не существует")
        );
    }
}
