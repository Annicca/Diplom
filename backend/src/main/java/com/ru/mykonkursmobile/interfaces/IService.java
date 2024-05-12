package com.ru.mykonkursmobile.interfaces;

import com.ru.mykonkursmobile.exceptions.NotFoundEntityException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public interface IService<T>{

    /**
     * Method of adding record in the database
     * @param t - entity
     * @return entity
     */
    T add( T t);

    /**
     * Method of changing record in the database
     * @param t - entity
     * @return entity
     * @throws NotFoundEntityException if the record to be changed is not found in the database
     */
    T update( T t) throws NotFoundEntityException;

    /**
     * Delete the record corresponding to the entity from the database by id
     * @param id - id entity
     * @throws NotFoundEntityException if entity with this id does not exist
     */
    void delete(Integer id) throws NotFoundEntityException;

    /**
     * Get a record with this ID from the database
     * @param id - id entity
     * @return entity
     * @throws NotFoundEntityException if entity with this id does not exist
     */
    T getById(Integer id) throws NotFoundEntityException;
}
