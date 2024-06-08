package com.ru.mykonkursmobile.services;

import com.ru.mykonkursmobile.enums.Status;
import com.ru.mykonkursmobile.exceptions.ChangeStatusException;
import com.ru.mykonkursmobile.exceptions.NotFoundEntityException;
import com.ru.mykonkursmobile.interfaces.IInvitationService;
import com.ru.mykonkursmobile.models.ArtGroup;
import com.ru.mykonkursmobile.models.Competition;
import com.ru.mykonkursmobile.models.Invitation;
import com.ru.mykonkursmobile.repositoryes.InvitationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class InvitationService implements IInvitationService {
    @Autowired
    InvitationRepository repository;

    @Autowired
    CompetitionService competitionService;

    @Autowired
    GroupService groupService;
    @Override
    public Invitation accept(Integer id) throws NotFoundEntityException, ChangeStatusException {
        Invitation invitation = getById(id);
        if(invitation.getStatus() != null) {
            throw new ChangeStatusException(HttpStatus.BAD_REQUEST, "Приглашение уже имеет статус, вы не можеет его изменить");
        }
        invitation.setStatus(Status.ACCEPTED);
        return update(invitation);
    }

    @Override
    public Invitation reject(Integer id) throws NotFoundEntityException, ChangeStatusException {
        Invitation invitation = getById(id);
        if(invitation.getStatus() != null) {
            throw new ChangeStatusException(HttpStatus.BAD_REQUEST, "Приглашение уже имеет статус, вы не можеет его изменить");
        }
        invitation.setStatus(Status.REJECTED);
        return update(invitation);
    }

    @Override
    public Page<Invitation> getByGroup(Integer idGroup, Pageable pageable) throws NotFoundEntityException {
        ArtGroup group = groupService.getById(idGroup);

        return repository.findAllByGroup(group, pageable);
    }

    @Override
    public Page<Invitation> getByCompetition(Integer idCompetition, Pageable pageable) throws NotFoundEntityException {
        Competition competition = competitionService.getById(idCompetition);
        return repository.findAllByCompetition(competition, pageable);
    }

    @Override
    public Invitation add(Invitation invitation) {
        return repository.save(invitation);
    }

    @Override
    public Invitation update(Invitation invitation) throws NotFoundEntityException {
        repository.findById(invitation.getId()).orElseThrow(
                () -> new NotFoundEntityException(HttpStatus.NOT_FOUND, "Такого приглашения не существует")
        );
        return repository.save(invitation);
    }

    @Override
    public void delete(Integer id) throws NotFoundEntityException {

    }

    @Override
    public Invitation getById(Integer id) throws NotFoundEntityException {
        return repository.findById(id).orElseThrow(
                () -> new NotFoundEntityException(HttpStatus.NOT_FOUND, "Такого приглашения не существует")
        );
    }
}
