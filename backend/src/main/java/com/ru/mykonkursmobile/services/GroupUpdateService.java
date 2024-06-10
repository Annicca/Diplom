package com.ru.mykonkursmobile.services;

import com.ru.mykonkursmobile.dto.GroupChangeDTO;
import com.ru.mykonkursmobile.enums.StatusModeration;
import com.ru.mykonkursmobile.exceptions.ChangeStatusException;
import com.ru.mykonkursmobile.exceptions.NotFoundEntityException;
import com.ru.mykonkursmobile.models.ArtGroup;
import com.ru.mykonkursmobile.models.GroupUpdate;
import com.ru.mykonkursmobile.repositoryes.GroupUpdateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;

@Service
public class GroupUpdateService {

    @Autowired
    GroupUpdateRepository repository;

    @Autowired
    private GroupService groupService;

    @Autowired
    CityService cityService;

    @Autowired
    private FileService fileServise;

    @Transactional
    public GroupUpdate requestUpdate(GroupChangeDTO groupDto) throws IOException {
        ArtGroup group = groupService.getById(groupDto.getIdGroup());
        if(group.getStatusModeration() == StatusModeration.ON_MODERATION) {
            throw new ChangeStatusException(HttpStatus.BAD_REQUEST, "Дождитесь когда ваш коллектив пройдет модерацию");
        }

        GroupUpdate groupUpdate = new GroupUpdate();
        if( groupDto.getImg() != null){
            groupUpdate.setImg(fileServise.saveImg(groupDto.getImg()));
        }
        groupUpdate.setCityGroup(cityService.getById(groupDto.getIdCity()));
        groupUpdate.update(groupDto);
        groupUpdate.setArtGroup(group);
        groupUpdate.setStatusModeration(StatusModeration.ON_MODERATION);

        group.setStatusModeration(StatusModeration.ON_MODERATION);

        return repository.save(groupUpdate);
    }

    @Transactional
    public GroupUpdate passedUpdate(Integer idGroupUpdate) throws IOException {
        GroupUpdate groupUpdate = getById(idGroupUpdate);
        if(groupUpdate.getStatusModeration() != StatusModeration.ON_MODERATION) {
            throw new ChangeStatusException(HttpStatus.BAD_REQUEST, "Вы уже обработали этот запрос");
        }
        groupService.updateFromRequest(groupUpdate);
        groupUpdate.setStatusModeration(StatusModeration.PASSED);

        return repository.save(groupUpdate);
    }

    @Transactional
    public GroupUpdate notPassedUpdate(Integer idGroupUpdate) {
        GroupUpdate groupUpdate = getById(idGroupUpdate);
        if(groupUpdate.getStatusModeration() != StatusModeration.ON_MODERATION) {
            throw new ChangeStatusException(HttpStatus.BAD_REQUEST, "Вы уже обработали этот запрос");
        }
        groupUpdate.getArtGroup().setStatusModeration(StatusModeration.NOT_PASSED);
        groupUpdate.setStatusModeration(StatusModeration.NOT_PASSED);

        return repository.save(groupUpdate);
    }

    public GroupUpdate getById(Integer idGroupUpdate) {
        return  repository .findById(idGroupUpdate).orElseThrow(
                () -> new NotFoundEntityException(HttpStatus.NOT_FOUND, "Такого запроса на изменение не существует")
        );
    }

    public Page<GroupUpdate> all(Pageable pageable){
        return repository.findAllByStatusModeration(pageable);
    }
}
