package com.ru.mykonkursmobile.interfaces;

import com.ru.mykonkursmobile.exceptions.NotFoundEntityException;
import com.ru.mykonkursmobile.models.AgeCategory;
import com.ru.mykonkursmobile.models.GroupCategory;

import java.util.List;

public interface IGroupCategoryService extends  IService<GroupCategory>{
    /**
     * A method that returns a List of group categories
     * @return List of the group categories
     */
    List<GroupCategory> all();

    /**
     * Method of adding record in the database
     * @param groupCategory - the group category to add
     * @return group category - see {@link GroupCategory}
     */
    GroupCategory add( GroupCategory groupCategory);

    /**
     * Method of adding list of group categories in the database
     * @param groupCategories - the list of group category to add
     * @return list of group categories - see {@link GroupCategory}
     */
    List<GroupCategory> addAll( List<GroupCategory> groupCategories);

    /**
     * Method of changing group category in the database
     * @param groupCategory - group category with changes
     * @return modified group category - see {@link GroupCategory}
     * @throws NotFoundEntityException if the group category to be changed is not found in the database
     */
    GroupCategory update(GroupCategory groupCategory) throws NotFoundEntityException;

    /**
     * Delete the group category from the database by id
     * @param id - id group category
     * @throws NotFoundEntityException if group category with this id does not exist
     */
    void delete(Integer id) throws NotFoundEntityException;

    /**
     * Get a group category with this id from the database
     * @param id - id group category
     * @return group category with this id
     * @throws NotFoundEntityException if group category with this id does not exist
     */
    GroupCategory getById(Integer id) throws NotFoundEntityException;
}
