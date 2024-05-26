package com.ru.mykonkursmobile.interfaces;

import com.ru.mykonkursmobile.exceptions.NotFoundEntityException;
import com.ru.mykonkursmobile.models.Participant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IParticipantService {

    /**
     * A method that returns a Page of participants competition
     * @param idCompetition - id of competition
     * @param pageable - parameter for page request
     * @return Page of the participants
     */
    Page<Participant> allByCompetition(Pageable pageable, Integer idCompetition);

    /**
     * Method of adding participant in the database
     * @param participant - the participant to add
     * @return nomination - see {@link Participant}
     */
    Participant add( Participant participant);


    /**
     * Method of changing participant in the database
     * @param participant - participant with changes
     * @return modified participant - see {@link Participant}
     * @throws NotFoundEntityException if the participant to be changed is not found in the database
     */
    Participant update(Participant participant) throws NotFoundEntityException;
}
