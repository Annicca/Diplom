package com.ru.mykonkursmobile.interfaces;

import com.ru.mykonkursmobile.exceptions.ChangeStatusException;
import com.ru.mykonkursmobile.exceptions.NotFoundEntityException;
import com.ru.mykonkursmobile.models.StatementParticipant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public interface IStatementParticipant extends IService<StatementParticipant>{

    /**
     * Method of accepting a statement by id - see {@link StatementParticipant}
     * @param id - id statement
     * @return accepted statement
     * @throws NotFoundEntityException if statement does not exist
     * @throws ChangeStatusException if statement already has status and failed to place participant
     */
    StatementParticipant accept(Integer id) throws NotFoundEntityException, ChangeStatusException;

    /**
     * Method of  rejecting a statement by id - see {@link StatementParticipant}
     * @param id- id statement
     * @return rejected statement
     * @throws NotFoundEntityException if statement does not exist
     * @throws ChangeStatusException if statement already has status
     */
    StatementParticipant reject(Integer id) throws NotFoundEntityException, ChangeStatusException;

    /**
     * A method for getting all statements of the director by director's id
     * if there are no statements an empty page content is returned
     * @param idUser id user
     * @param pageable - parameter for page request
     * @return page with  user's statements - see {@link StatementParticipant}
     * @throws NotFoundEntityException if director with this id does not exist
     */
    Page<StatementParticipant> getByDirectorId(Integer idUser, Pageable pageable) throws NotFoundEntityException;

    /**
     * A method for getting all statements of the competition by competition's id
     * if there are no statements an empty page content is returned
     * @param idCompetition id user
     * @param pageable - parameter for page request
     * @return page with  competition's statements - see {@link StatementParticipant}
     * @throws NotFoundEntityException if competition with this id does not exist
     */
    Page<StatementParticipant> getByCompetition(Integer idCompetition, Pageable pageable) throws NotFoundEntityException;
}
