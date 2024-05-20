package com.ru.mykonkursmobile.services;

import com.ru.mykonkursmobile.exceptions.NotFoundEntityException;
import com.ru.mykonkursmobile.interfaces.IGroupCategoryService;
import com.ru.mykonkursmobile.models.AgeCategory;
import com.ru.mykonkursmobile.models.Competition;
import com.ru.mykonkursmobile.models.GroupCategory;
import com.ru.mykonkursmobile.repositoryes.GroupCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GroupCategoryService implements IGroupCategoryService {
    @Autowired
    GroupCategoryRepository repository;

    @Override
    public List<GroupCategory> all() {
        return repository.findAll();
    }

    @Override
    public GroupCategory add(GroupCategory groupCategory) {
        return repository.save(groupCategory);
    }

    @Override
    public List<GroupCategory> addAll(List<GroupCategory> groupCategories) {
        return repository.saveAll(groupCategories);
    }

    @Override
    public GroupCategory update(GroupCategory groupCategory) throws NotFoundEntityException {
        return repository.save(groupCategory);
    }

    @Override
    public void delete(Integer id) throws NotFoundEntityException {
        GroupCategory groupCategory = getById(id);
        repository.delete(groupCategory);
    }

    @Override
    public GroupCategory getById(Integer id) throws NotFoundEntityException {
        return repository.findById(id).orElseThrow(
                () -> new NotFoundEntityException(HttpStatus.NOT_FOUND, "Такой групповой категории не существует")
        );
    }

    public List<GroupCategory>  setCompetitionForAll(List<GroupCategory> groupCategories, Competition competition) {
        groupCategories.forEach(groupCategory -> groupCategory.setCompetition(competition));
        return new ArrayList<>(groupCategories);
    }
}
