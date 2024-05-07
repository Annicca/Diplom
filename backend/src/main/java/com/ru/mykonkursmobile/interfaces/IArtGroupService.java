package com.ru.mykonkursmobile.interfaces;

import com.ru.mykonkursmobile.dto.GroupChangeDTO;
import com.ru.mykonkursmobile.exceptions.NotFoundEntityException;
import com.ru.mykonkursmobile.models.ArtGroup;
import com.ru.mykonkursmobile.models.User;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public interface IArtGroupService{

    /**
     * A method that returns a page of groups from all groups
     * if there are no groups an empty page content is returned
     * @param pageable - parameter for page request
     * @return Page of the groups
     */
    Page<ArtGroup> all(Pageable pageable);

    /**
     * Method of adding record in the database
     * @param group - the group to add
     * @return group - see {@link ArtGroup}
     */
    ArtGroup add( ArtGroup group);

    /**
     * Method of changing group in the database
     * @param group - group with changes
     * @return modified group - see {@link ArtGroup}
     * @throws NotFoundEntityException if the group to be changed is not found in the database
     * @throws IOException if failed to save file - img of group
     */
    ArtGroup update(GroupChangeDTO group) throws NotFoundEntityException, IOException;

    /**
     * Delete the group corresponding to the group from the database by id
     * @param id - id group
     * @throws NotFoundEntityException if group with this id does not exist
     */
    void delete(Integer id) throws NotFoundEntityException;

    /**
     * Get a group with this id from the database
     * @param id - id group
     * @return group with this id
     * @throws NotFoundEntityException if group with this id does not exist
     */
    ArtGroup getById(Integer id) throws NotFoundEntityException;

    /**
     * A method for getting all groups in the city
     * @param pageable - parameter for page request
     * @param city - the city of the groups
     * @return Page of the groups in the city - see {@link ArtGroup}
     */
    Page<ArtGroup> getByCity(Pageable pageable, String city);

    /**
     * A method for getting all groups of the director by director's id - see {@link User}
     * @param idDirector id director
     * @param pageable - parameter for page request
     * @return List of the  director's groups - see {@link ArtGroup}
     * @throws NotFoundEntityException if director with this id does not exist
     */
    Page<ArtGroup> getByDirectorId(Integer idDirector, Pageable pageable) throws NotFoundEntityException;

    /**
     * Method that returns the list of competition participants (group)
     * @param idCompetition - id competition
     * @return list of competition participants (group)
     */
    List<ArtGroup> getParticipant(Integer idCompetition);
}
