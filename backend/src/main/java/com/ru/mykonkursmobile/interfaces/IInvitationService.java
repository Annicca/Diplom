package com.ru.mykonkursmobile.interfaces;

import com.ru.mykonkursmobile.exceptions.ChangeStatusException;
import com.ru.mykonkursmobile.exceptions.NotFoundEntityException;
import com.ru.mykonkursmobile.models.Invitation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public interface IInvitationService extends IService<Invitation>{

    /**
     * Method of accepting a invitation by id - see {@link Invitation}
     * @param id - id invitation
     * @return accepted invitation
     * @throws NotFoundEntityException if invitation does not exist
     * @throws ChangeStatusException if invitation already has status
     */
    Invitation accept(Integer id) throws NotFoundEntityException, ChangeStatusException;

    /**
     * Method of  rejecting a invitation by id - see {@link Invitation}
     * @param id- id statement
     * @return rejected statement
     * @throws NotFoundEntityException if invitation does not exist
     * @throws ChangeStatusException if invitation already has status
     */
    Invitation reject(Integer id) throws NotFoundEntityException, ChangeStatusException;

    /**
     * A method for getting all invitation of the group by group id
     * if there are no invitation an empty page content is returned
     * @param idGroup id group
     * @param pageable - parameter for page request
     * @return page with  group's invitation - see {@link Invitation}
     * @throws NotFoundEntityException if invitation with this id does not exist
     */
    Page<Invitation> getByGroup(Integer idGroup, Pageable pageable) throws NotFoundEntityException;

    /**
     * A method for getting all invitation of the competition by competition id
     * if there are no invitation an empty page content is returned
     * @param idCompetition id competition
     * @param pageable - parameter for page request
     * @return page with  group's invitation - see {@link Invitation}
     * @throws NotFoundEntityException if invitation with this id does not exist
     */
    Page<Invitation> getByCompetition(Integer idCompetition, Pageable pageable) throws NotFoundEntityException;
}
