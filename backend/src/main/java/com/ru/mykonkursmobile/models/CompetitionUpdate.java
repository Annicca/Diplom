package com.ru.mykonkursmobile.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ru.mykonkursmobile.dto.CompetitionChangeDTO;
import com.ru.mykonkursmobile.dto.GroupChangeDTO;
import com.ru.mykonkursmobile.enums.StatusModeration;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.sql.Date;

@Entity
@Table(name = "competition_update")
public class CompetitionUpdate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(columnDefinition = "TEXT")
    private String descriptionCompetition;

    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dateStart;

    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dateFinish;

    @Enumerated(EnumType.STRING)
    private StatusModeration statusModeration;

    private String img;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE, optional = false)
    private Competition competition;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescriptionCompetition() {
        return descriptionCompetition;
    }

    public void setDescriptionCompetition(String descriptionCompetition) {
        this.descriptionCompetition = descriptionCompetition;
    }

    public Date getDateStart() {
        return dateStart;
    }

    public void setDateStart(Date dateStart) {
        this.dateStart = dateStart;
    }

    public Date getDateFinish() {
        return dateFinish;
    }

    public void setDateFinish(Date dateFinish) {
        this.dateFinish = dateFinish;
    }

    public StatusModeration getStatusModeration() {
        return statusModeration;
    }

    public void setStatusModeration(StatusModeration statusModeration) {
        this.statusModeration = statusModeration;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public Competition getCompetition() {
        return competition;
    }

    public void setCompetition(Competition competition) {
        this.competition = competition;
    }

    public CompetitionUpdate(int id, String descriptionCompetition, Date dateStart, Date dateFinish, StatusModeration statusModeration, String img, Competition competition) {
        this.id = id;
        this.descriptionCompetition = descriptionCompetition;
        this.dateStart = dateStart;
        this.dateFinish = dateFinish;
        this.statusModeration = statusModeration;
        this.img = img;
        this.competition = competition;
    }
    public CompetitionUpdate(){}

    public void update(CompetitionChangeDTO competitionChangeDTO){
        this.descriptionCompetition  = competitionChangeDTO.getDescriptionCompetition();
        this.dateStart = competitionChangeDTO.getDateStart();
        this.dateFinish = competitionChangeDTO.getDateFinish();
    }
}
