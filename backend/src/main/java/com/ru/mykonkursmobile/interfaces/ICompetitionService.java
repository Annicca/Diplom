package com.ru.mykonkursmobile.interfaces;

import com.ru.mykonkursmobile.dto.CompetitionChangeDTO;
import com.ru.mykonkursmobile.exceptions.ChangeStatusException;
import com.ru.mykonkursmobile.exceptions.NotFoundEntityException;
import com.ru.mykonkursmobile.exceptions.TakePartException;
import com.ru.mykonkursmobile.filter.CompetitionFilter;
import com.ru.mykonkursmobile.models.ArtGroup;
import com.ru.mykonkursmobile.models.Competition;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.sql.Date;
import java.util.List;

@Service
public interface ICompetitionService{

    /**
     * Method that returns a page from all competitions
     * @param pageable - parameter for page request
     * @return page of the competitions - see {@link Competition}
     */
    Page<Competition> getAll(Pageable pageable);

    /**
     * Method of adding competition in the database
     * @param competition - see {@link Competition}
     * @return added competition
     */
    Competition add( Competition competition);

    /**
     * Method of changing competition in the database
     * @param competition - competition with changes
     * @return modified competition - see {@link Competition}
     * @throws NotFoundEntityException if the competition to be changed is not found in the database
     * @throws IOException if failed to save file - img of competition
     */
    Competition update( CompetitionChangeDTO competition) throws NotFoundEntityException, IOException;

    /**
     * Delete the competition corresponding to the entity from the database by id
     * @param id - id competition
     * @throws NotFoundEntityException if competition with this id does not exist
     */
    void delete(Integer id) throws NotFoundEntityException;

    /**
     * Get a competition with this id from the database
     * @param id - id competition
     * @return competition with this id
     * @throws NotFoundEntityException if competition with this id does not exist
     */
    Competition getById(Integer id) throws NotFoundEntityException;

    /**
     * Method that returns a page from all competitions that match the specified filter parameters
     * if there are no competitions an empty page content is returned
     * if the filter parameters are not specified, the  page from all competitions will be returned.
     * @param filter - a set of parameters for data selection
     * @param pageable - parameter for page request
     * @return page of the filtered competitions - see {@link Competition}
     */
    Page<Competition> filterCompetition(CompetitionFilter filter, Pageable pageable);

    /**
     * A method for getting a page from all competitions of the organizer by organizer's id
     * if there are no competitions an empty page content is returned
     * @param idOrganizer id organizer
     * @param pageable - parameter for page request
     * @return page of the  organizer's competitions - see {@link Competition}
     * @throws NotFoundEntityException if user with this id does not exist
     */
    Page<Competition> getByOrganizerId(Integer idOrganizer, Pageable pageable) throws NotFoundEntityException;

    /**
     * Method of cancellation of the competition by id
     * @param id - id competition
     * @param pageable - parameter for page request
     * @return list of organizer's competition
     * @throws NotFoundEntityException if competition does not exist
     * @throws ChangeStatusException if competition has already been canceled then it cannot be canceled
     */
    Page<Competition> cancel(Integer id, Pageable pageable) throws NotFoundEntityException, ChangeStatusException;

    /**
     * Method of adding a team to the contest participants
     * @param idCompetition - id competition
     * @param idGroup - id group - see {@link ArtGroup}
     * @throws NotFoundEntityException - if competition with this id does not exist and if group does not exist
     * @throws TakePartException - if the group is already in the competition's participants
     */
    void takePart(Integer idCompetition, Integer idGroup) throws NotFoundEntityException, TakePartException;

    /**
     * Method for getting competitions in which the group takes part in the amount of 10 pieces
     * @param idGroup - id group
     * @return List of competitions in which the group with this id takes part in the amount of 10 pieces
     * @throws NotFoundEntityException if group with this id does not exist
     */
    List<Competition> getCompetitionByGroupLimit10(Integer idGroup)throws NotFoundEntityException;

    /**
     * Method for getting competitions in which the group takes part
     * @param idGroup - id group
     * @return Page of competitions in which the group with this id takes part
     */
    Page<Competition> getCompetitionByGroup(Integer idGroup, Pageable pageable);

    /**
     * Method called once a day to change the status of competitions
     */
    void sheduleStatusCompetition();

    /**
     * Method for update status competition
     * @param competition - competition for update
     * @return competition - see {@link Competition}
     */
    Competition updateStatusCompetition(Competition competition);

}
