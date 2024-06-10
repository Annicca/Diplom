package com.ru.mykonkursmobile.services;

import com.ru.mykonkursmobile.dto.GroupChangeDTO;
import com.ru.mykonkursmobile.enums.StatusModeration;
import com.ru.mykonkursmobile.exceptions.NotFoundEntityException;
import com.ru.mykonkursmobile.interfaces.IArtGroupService;
import com.ru.mykonkursmobile.models.ArtGroup;
import com.ru.mykonkursmobile.models.GroupUpdate;
import com.ru.mykonkursmobile.models.User;
import com.ru.mykonkursmobile.repositoryes.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.IOException;
import java.util.List;

@Service
public class GroupService implements IArtGroupService {

    @Autowired
    GroupRepository repository;

    @Autowired
    private UserService userService;

    @Autowired
    CityService cityService;

    @Autowired
    private FileService fileServise;

    @Override
    public Page<ArtGroup> all(Pageable pageable){
        return repository.findAllByOrderByIdGroupDesc(pageable);
    }

    @Override
    public ArtGroup add(ArtGroup artGroup){
        return repository.save(artGroup);
    }

    @Override
    public ArtGroup update(GroupChangeDTO group) throws NotFoundEntityException, IOException {

        ArtGroup groupChange = getById(group.getIdGroup());
        if( group.getImg() != null){
            groupChange.setImg(fileServise.saveImg(group.getImg()));
        }
        groupChange.setCityGroup(cityService.getById(group.getIdCity()));
        groupChange.update(group);
        return repository.save(groupChange);
    }

    public ArtGroup updateFromRequest(GroupUpdate groupUpdate) throws NotFoundEntityException, IOException {
        ArtGroup group = getById(groupUpdate.getArtGroup().getIdGroup());
        if( groupUpdate.getImg() != null){
            group.setImg(groupUpdate.getImg());
        }
        group.updateFromRequest(groupUpdate);
        group.setStatusModeration(StatusModeration.PASSED);
        return repository.save(group);
    }

    @Override
    public void delete(Integer id) throws NotFoundEntityException, DataIntegrityViolationException {
        ArtGroup artGroup = getById(id);
        repository.delete(artGroup);
    }

    @Override
    public ArtGroup getById(Integer id) throws NotFoundEntityException {
        ArtGroup group = repository.findById(id).orElseThrow(
                () -> new NotFoundEntityException(HttpStatus.NOT_FOUND, "Такого коллектива не существует")
        );
        return group;
    }

    @Override
    public Page<ArtGroup> getByDirectorId(Integer idDirector, Pageable pageable) throws NotFoundEntityException {
        User user = userService.getById(idDirector);
        Page<ArtGroup> groups = repository.findByDirectorId(user.getIdUser(), pageable);
//        groups.forEach(g->g.setCompetitions(
//                competitionService.getCompetitionByGroupLimit10(g.getIdGroup())
//        ));
        return groups;
    }

    public List<ArtGroup> getListByDirectorId(Integer idDirector) throws NotFoundEntityException {
        User user = userService.getById(idDirector);
        return repository.findListByDirectorId(user.getIdUser());
    }

    @Override
    public Page<ArtGroup> getByCity(Pageable pageable, String city) {
        return repository.findAllByCityGroup(city,pageable);
    }

    @Override
    public List<ArtGroup> getParticipant(Integer idCompetition){

        return repository.findParticipant(idCompetition);
    }

    public Page<ArtGroup> getPageParticipants(Integer idCompetition, Pageable pageable) {
        return repository.findPageParticipant(idCompetition, pageable);
    }
}
