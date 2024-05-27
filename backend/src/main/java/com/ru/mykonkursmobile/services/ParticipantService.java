package com.ru.mykonkursmobile.services;

import com.ru.mykonkursmobile.exceptions.NotFoundEntityException;
import com.ru.mykonkursmobile.interfaces.IParticipantService;
import com.ru.mykonkursmobile.models.Competition;
import com.ru.mykonkursmobile.models.Participant;
import com.ru.mykonkursmobile.repositoryes.ParticipantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class ParticipantService implements IParticipantService {

    @Autowired
    ParticipantRepository repository;

    @Autowired
    CompetitionService competitionService;

    @Override
    public Page<Participant> allByCompetition(Pageable pageable, Integer idCompetition) {
        Competition competition = competitionService.getById(idCompetition);
        return repository.findAllByCompetition(competition, pageable);
    }

    @Override
    public Participant add(Participant participant) {
        return repository.save(participant);
    }

    @Override
    public Participant update(Participant participant) throws NotFoundEntityException {
        repository.findById(participant.getId()).orElseThrow(
                () -> new NotFoundEntityException(HttpStatus.NOT_FOUND, "Такого номера не существует")
        );
        return repository.save(participant);
    }
}
