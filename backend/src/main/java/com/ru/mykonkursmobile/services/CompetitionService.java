package com.ru.mykonkursmobile.services;

import com.ru.mykonkursmobile.dto.CompetitionChangeDTO;
import com.ru.mykonkursmobile.enums.StatusCompetition;
import com.ru.mykonkursmobile.exceptions.ChangeStatusException;
import com.ru.mykonkursmobile.exceptions.NotFoundEntityException;
import com.ru.mykonkursmobile.exceptions.TakePartException;
import com.ru.mykonkursmobile.filter.CompetitionFilter;
import com.ru.mykonkursmobile.interfaces.ICompetitionService;
import com.ru.mykonkursmobile.models.ArtGroup;
import com.ru.mykonkursmobile.models.Competition;
import com.ru.mykonkursmobile.models.User;
import com.ru.mykonkursmobile.repositoryes.CompetitionRepository;
import com.ru.mykonkursmobile.repositoryes.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.sql.Date;
import java.util.List;
import java.util.Objects;

@Service
public class CompetitionService implements ICompetitionService {

    @Autowired
    private UserService userService;

    @Autowired
    private CompetitionRepository repository;

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    CityService cityService;

    @Autowired
    private FileService fileServise;

    @Override
    public Page<Competition> getAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @Override
    public Page<Competition> filterCompetition(CompetitionFilter filter, Pageable pageable) {
        return repository.findAll(filter, pageable);
    }

    @Override
    public Competition add(Competition competition)
    {
      return repository.save(competition);
    }

    @Override
    public Competition update(CompetitionChangeDTO competition) throws NotFoundEntityException, DataIntegrityViolationException, IOException {
        Competition competitionChange = getById(competition.getIdCompetition());
        if( competition.getImg() != null){
            competitionChange.setImg(fileServise.saveImg(competition.getImg()));
        }
        competitionChange.setCityCompetition(cityService.getById(competition.getIdCity()));
        competitionChange.update(competition);
        return updateStatusCompetition(competitionChange);
    }

//    public Competition change(Competition competition) throws NotFoundEntityException{
//        if(!repository.existsById(competition.getIdCompetition())){
//            throw new NotFoundEntityException(HttpStatus.NOT_FOUND, "Такого конкурса не существует");
//        }
//        return repository.save(competition);
//    }


    @Override
    public void delete(Integer id) throws NotFoundEntityException{
        Competition competition = getById(id);
        repository.delete(competition);
    }

    @Override
    public Competition getById(Integer id) {
        Competition competition = repository.findById(id).orElseThrow(
                () -> new NotFoundEntityException(HttpStatus.NOT_FOUND, "Такого конкурса не существует")
        );
//        competition.setGroups(null);
        return competition;
    }

    public Competition findById(Integer id) {
        Competition competition = repository.findById(id).orElseThrow(
                () -> new NotFoundEntityException(HttpStatus.NOT_FOUND, "Такого конкурса не существует")
        );
        return competition;
    }

    @Override
    public Page<Competition> getByOrganizerId(Integer idUser, Pageable pageable) throws NotFoundEntityException {
        User user = userService.getById(idUser);
       return repository.findByOrganizerId(user.getIdUser(), pageable);

    }

    @Override
    public Page<Competition> cancel(Integer id, Pageable pageable) throws NotFoundEntityException, ChangeStatusException {
        Competition competition = repository.findById(id).orElseThrow(
                () -> new NotFoundEntityException(HttpStatus.NOT_FOUND, "Вы не можете отменить несуществующий коллектив")
        );
        if(competition.getStatusCompetition() != StatusCompetition.CANCELLED){
            competition.setStatusCompetition(StatusCompetition.CANCELLED);
        }
        else{
            throw new ChangeStatusException(HttpStatus.BAD_REQUEST, "Конкурс уже отменен, вы не можете отменить его");
        }
        Competition resultCompetition = repository.save(competition);
        return getByOrganizerId(resultCompetition.getOrganizer().getIdUser(), pageable);
    }

    @Override
    public void takePart(Integer idCompetition, Integer idGroup) throws NotFoundEntityException, TakePartException{
        Competition competition = repository.findById(idCompetition).orElseThrow(
                ()->new NotFoundEntityException(HttpStatus.NOT_FOUND, "Такого конкурса не существует")
        );
        if(competition.getStatusCompetition() != StatusCompetition.CREATED){
            throw new TakePartException(HttpStatus.BAD_REQUEST, "К сожадению, вы не можете принять участие в конкурсе");
        }
        ArtGroup groupParticipant  = groupRepository.findById(idGroup).orElseThrow(
                () -> new NotFoundEntityException(HttpStatus.NOT_FOUND, "Такого коллектива не существует")
        );
//        List<ArtGroup> groups = competition.getGroups();
//
//        if(!groups.isEmpty()) {
//            for(ArtGroup competitionGroup: groups ){
//                if(Objects.equals(competitionGroup.getIdGroup(), idGroup)){
//                    throw new TakePartException(HttpStatus.BAD_REQUEST, "Вы уже приняли участие в этом конкурсе, вы не можете принять участие ещё раз");
//                }
//            }
//        }
//
//        groups.add(groupParticipant);
//        competition.setGroups(groups);

        //реалтзовать участие в конкурсе
        repository.save(competition);

    }

    @Override
    public List<Competition> getCompetitionByGroupLimit10(Integer idGroup) throws NotFoundEntityException{
        if(!groupRepository.existsById(idGroup)){
            throw new NotFoundEntityException(HttpStatus.NOT_FOUND, "Такого коллектива не существует");
        }
        return repository.findByGroupLimit(idGroup);
    }

    @Override
    public Page<Competition> getCompetitionByGroup(Integer idGroup, Pageable pageable){
        return repository.findByGroup(idGroup, pageable);
    }

    @Override
    @Scheduled(fixedDelayString = "${interval}")
    public void sheduleStatusCompetition(){
        List<Competition> competitions  = repository.findAllNotCancel();
        for (Competition competition : competitions)
        {
            updateStatusCompetition(competition);
        }
    }

    @Override
    public Competition updateStatusCompetition(Competition competition){
        if (competition.getDateStart().after(new Date(new java.util.Date().getTime())) )
        {
            competition.setStatusCompetition(StatusCompetition.CREATED);
        }
        else if ((competition.getDateStart().before(new Date(new java.util.Date().getTime())) || competition.getDateStart().equals(new Date(new java.util.Date().getTime())) ) && (competition.getDateFinish().after(new Date(new java.util.Date().getTime())) || competition.getDateFinish().equals(new Date(new java.util.Date().getTime())) ))
        {
            competition.setStatusCompetition(StatusCompetition.STARTED);
        }
        else if (competition.getDateFinish().before(new Date(new java.util.Date().getTime())))
        {
            competition.setStatusCompetition(StatusCompetition.FINISHED);
        }
        return repository.save(competition);
    }


}
