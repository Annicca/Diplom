package com.ru.mykonkursmobile.services;

import com.ru.mykonkursmobile.dto.CompetitionChangeDTO;
import com.ru.mykonkursmobile.enums.StatusModeration;
import com.ru.mykonkursmobile.exceptions.ChangeStatusException;
import com.ru.mykonkursmobile.exceptions.NotFoundEntityException;
import com.ru.mykonkursmobile.models.Competition;
import com.ru.mykonkursmobile.models.CompetitionUpdate;
import com.ru.mykonkursmobile.repositoryes.CompetitionUpdateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;

@Service
public class CompetitionUpdateService {
    @Autowired
    CompetitionUpdateRepository repository;

    @Autowired
    private CompetitionService competitionService;

    @Autowired
    CityService cityService;

    @Autowired
    private FileService fileServise;

    @Transactional
    public CompetitionUpdate requestUpdate(CompetitionChangeDTO competitionDto) throws IOException {
        Competition competition = competitionService.getById(competitionDto.getIdCompetition());
        if(competition.getStatusModeration() == StatusModeration.ON_MODERATION) {
            throw new ChangeStatusException(HttpStatus.BAD_REQUEST, "Дождитесь когда ваш коллектив пройдет модерацию");
        }

        CompetitionUpdate competitionUpdate = new CompetitionUpdate();
        if( competitionDto.getImg() != null) {
            competitionUpdate.setImg(fileServise.saveImg(competitionDto.getImg()));
        }
        competitionUpdate.update(competitionDto);
        competitionUpdate.setCompetition(competition);
        competitionUpdate.setStatusModeration(StatusModeration.ON_MODERATION);

        competition.setStatusModeration(StatusModeration.ON_MODERATION);

        return repository.save(competitionUpdate);
    }

    @Transactional
    public CompetitionUpdate passedUpdate(Integer idCompetitionUpdate) throws IOException {
        CompetitionUpdate competitionUpdate = getById(idCompetitionUpdate);
        if(competitionUpdate.getStatusModeration() != StatusModeration.ON_MODERATION) {
            throw new ChangeStatusException(HttpStatus.BAD_REQUEST, "Вы уже обработали этот запрос");
        }
        competitionService.updateFromRequest(competitionUpdate);
        competitionUpdate.setStatusModeration(StatusModeration.PASSED);

        return repository.save(competitionUpdate);
    }

    @Transactional
    public CompetitionUpdate notPassedUpdate(Integer idCompetitionUpdate) {
        CompetitionUpdate competitionUpdate = getById(idCompetitionUpdate);
        if(competitionUpdate.getStatusModeration() != StatusModeration.ON_MODERATION) {
            throw new ChangeStatusException(HttpStatus.BAD_REQUEST, "Вы уже обработали этот запрос");
        }
        competitionUpdate.getCompetition().setStatusModeration(StatusModeration.NOT_PASSED);
        competitionUpdate.setStatusModeration(StatusModeration.NOT_PASSED);

        return repository.save(competitionUpdate);
    }

    public CompetitionUpdate getById(Integer idCompetitionUpdate) {
        return  repository .findById(idCompetitionUpdate).orElseThrow(
                () -> new NotFoundEntityException(HttpStatus.NOT_FOUND, "Такого запроса на изменение не существует")
        );
    }

    public Page<CompetitionUpdate> all(Pageable pageable){
        return repository.findAllByStatusModeration(pageable);
    }
}
