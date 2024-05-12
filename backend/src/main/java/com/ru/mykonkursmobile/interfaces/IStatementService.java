package com.ru.mykonkursmobile.interfaces;

import com.ru.mykonkursmobile.exceptions.ChangeStatusException;
import com.ru.mykonkursmobile.exceptions.NotFoundEntityException;
import com.ru.mykonkursmobile.models.Statement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IStatementService extends IService<Statement>{

    /**
     * A method that returns page of statements from all statements
     * if there are no records an empty page content is returned
     * @return page of the entity
     */
    Page<Statement> all(Pageable pageable);

    /**
     * Method of accepting a statement by id - see {@link Statement}
     * @param id - id statement
     * @return accepted statement
     * @throws NotFoundEntityException if statement does not exist
     * @throws ChangeStatusException if statement already has status and failed to place competition - see {@link com.ru.mykonkursmobile.models.Competition} or group - see {@link com.ru.mykonkursmobile.models.ArtGroup}
     */
    Statement accept(Integer id) throws NotFoundEntityException, ChangeStatusException;

    /**
     * Method of  rejecting a statement by id - see {@link Statement}
     * @param id- id statement
     * @return rejected statement
     * @throws NotFoundEntityException if statement does not exist
     * @throws ChangeStatusException if statement already has status
     */
    Statement reject(Integer id) throws NotFoundEntityException, ChangeStatusException;

    /**
     * A method for getting all statements of the user by user's id
     * if there are no statements an empty page content is returned
     * @param idUser id user
     * @param pageable - parameter for page request
     * @return page with  user's statements - see {@link Statement}
     * @throws NotFoundEntityException if user with this id does not exist
     */
    Page<Statement> getByUserId(Integer idUser, Pageable pageable) throws NotFoundEntityException;

    /**
     * Method of finding the statement by id
     * if there are no statements an empty page content is returned
     * @param id - id statement
     * @param pageable - parameter for page request
     * @return page with any statements
     */
    Page<Statement> findById(Integer id, Pageable pageable);


}
