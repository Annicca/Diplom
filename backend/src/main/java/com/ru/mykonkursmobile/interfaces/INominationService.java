package com.ru.mykonkursmobile.interfaces;

import com.ru.mykonkursmobile.exceptions.NotFoundEntityException;
import com.ru.mykonkursmobile.models.GroupCategory;
import com.ru.mykonkursmobile.models.Nomination;
import com.ru.mykonkursmobile.models.Statement;

import java.util.List;

public interface INominationService extends IService<Nomination>{
    /**
     * A method that returns a List of nominations
     * @return List of the nominations
     */
    List<Nomination> all();

    /**
     * Method of adding nomination in the database
     * @param nomination - the nomination to add
     * @return nomination - see {@link Nomination}
     */
    Nomination add( Nomination nomination);

    /**
     * Method of adding list of nominations in the database
     * @param nominations - the list of nominations to add
     * @param statement - the statement for which the nominations are being created
     * @return list of nominations - see {@link Nomination}
     */
    List<Nomination> addAll(List<Nomination> nominations, Statement statement);

    /**
     * Method of changing nomination in the database
     * @param nomination - nomination with changes
     * @return modified nomination - see {@link Nomination}
     * @throws NotFoundEntityException if the nomination to be changed is not found in the database
     */
    Nomination update(Nomination nomination) throws NotFoundEntityException;

    /**
     * Delete the nomination from the database by id
     * @param id - id nomination
     * @throws NotFoundEntityException if nomination with this id does not exist
     */
    void delete(Integer id) throws NotFoundEntityException;

    /**
     * Get a nomination with this id from the database
     * @param id - id nomination
     * @return nomination with this id
     * @throws NotFoundEntityException if nomination with this id does not exist
     */
    Nomination getById(Integer id) throws NotFoundEntityException;
}
