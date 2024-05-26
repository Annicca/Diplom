package com.ru.mykonkursmobile.interfaces;

import com.ru.mykonkursmobile.exceptions.NotFoundEntityException;
import com.ru.mykonkursmobile.models.Perfomance;

import java.util.List;

public interface IPerfomanceService extends IService<Perfomance> {

    /**
     * A method that returns a List of acts
     * @return List of the acts
     */
    List<Perfomance> all();

    /**
     * Method of adding record in the database
     * @param act - the act to add
     * @return act - see {@link Perfomance}
     */
    Perfomance add( Perfomance act);

    /**
     * Method of changing act in the database
     * @param act - act with changes
     * @return modified act - see {@link Perfomance}
     * @throws NotFoundEntityException if the act to be changed is not found in the database
     */
    Perfomance update(Perfomance act) throws NotFoundEntityException;

    /**
     * Delete the act from the database by id
     * @param id - id act
     * @throws NotFoundEntityException if act with this id does not exist
     */
    void delete(Integer id) throws NotFoundEntityException;

    /**
     * Get a genre with this id from the database
     * @param id - id act
     * @return act with this id
     * @throws NotFoundEntityException if act with this id does not exist
     */
    Perfomance getById(Integer id) throws NotFoundEntityException;
}
