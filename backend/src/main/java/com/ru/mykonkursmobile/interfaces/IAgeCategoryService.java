package com.ru.mykonkursmobile.interfaces;

import com.ru.mykonkursmobile.exceptions.NotFoundEntityException;
import com.ru.mykonkursmobile.models.AgeCategory;

import java.util.List;

public interface IAgeCategoryService extends IService<AgeCategory>{
    /**
     * A method that returns a List of age categories
     * @return List of the genres
     */
    List<AgeCategory> all();

    /**
     * Method of adding record in the database
     * @param ageCategory - the age category to add
     * @return age category - see {@link AgeCategory}
     */
    AgeCategory add( AgeCategory ageCategory);

    /**
     * Method of adding list of age categories in the database
     * @param ageCategories - the list of age category to add
     * @return list of age categories - see {@link AgeCategory}
     */
    List<AgeCategory> addAll( List<AgeCategory> ageCategories);

    /**
     * Method of changing age category in the database
     * @param ageCategory - age category with changes
     * @return modified age category - see {@link AgeCategory}
     * @throws NotFoundEntityException if the age category to be changed is not found in the database
     */
    AgeCategory update(AgeCategory ageCategory) throws NotFoundEntityException;

    /**
     * Delete the age category from the database by id
     * @param id - id age category
     * @throws NotFoundEntityException if age category with this id does not exist
     */
    void delete(Integer id) throws NotFoundEntityException;

    /**
     * Get a age category with this id from the database
     * @param id - id age category
     * @return age category with this id
     * @throws NotFoundEntityException if age category with this id does not exist
     */
    AgeCategory getById(Integer id) throws NotFoundEntityException;
}
