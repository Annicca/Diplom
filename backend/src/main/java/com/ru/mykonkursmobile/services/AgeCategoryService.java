package com.ru.mykonkursmobile.services;

import com.ru.mykonkursmobile.exceptions.NotFoundEntityException;
import com.ru.mykonkursmobile.interfaces.IAgeCategoryService;
import com.ru.mykonkursmobile.models.AgeCategory;
import com.ru.mykonkursmobile.models.Competition;
import com.ru.mykonkursmobile.repositoryes.AgeCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AgeCategoryService implements IAgeCategoryService {

    @Autowired
    AgeCategoryRepository repository;
    @Override
    public List<AgeCategory> all() {
        return repository.findAll();
    }

    @Override
    public AgeCategory add(AgeCategory ageCategory) {
        return repository.save(ageCategory);
    }

    public List<AgeCategory> addAll(List<AgeCategory> ageCategories) {
        return repository.saveAll(ageCategories);
    }

    @Override
    public AgeCategory update(AgeCategory ageCategory) throws NotFoundEntityException {
        return repository.save(ageCategory);
    }

    @Override
    public void delete(Integer id) throws NotFoundEntityException {
        AgeCategory ageCategory = getById(id);
        repository.delete(ageCategory);
    }

    @Override
    public AgeCategory getById(Integer id) throws NotFoundEntityException {
        return repository.findById(id).orElseThrow(
                () -> new NotFoundEntityException(HttpStatus.NOT_FOUND, "Такой возрастной категории не существует")
        );
    }

    public List<AgeCategory>  setCompetitionForAll(List<AgeCategory> ageCategories, Competition competition) {
        ageCategories.forEach(ageCategory -> ageCategory.setCompetition(competition));
        return new ArrayList<>(ageCategories);
    }
}
