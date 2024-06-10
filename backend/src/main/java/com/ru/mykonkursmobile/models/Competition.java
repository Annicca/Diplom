package com.ru.mykonkursmobile.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ru.mykonkursmobile.dto.CompetitionChangeDTO;
import com.ru.mykonkursmobile.enums.StatusCompetition;
import com.ru.mykonkursmobile.enums.StatusModeration;
import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.validation.constraints.NotNull;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "competition")
public class Competition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idCompetition;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_user")
    @NotNull
    private User organizer;

    @NotNull
    private String nameCompetition;

    @Column(columnDefinition = "TEXT")
    private String descriptionCompetition;

    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dateStart;

    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dateFinish;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_city")
    @NotNull
    private City cityCompetition;

    @Enumerated(EnumType.STRING)
    private StatusCompetition statusCompetition;

    @Enumerated(EnumType.STRING)
    private StatusModeration statusModeration;

    private Double competitionFee;

    @NotNull
    private String regulation;

    private String rules;
    private String img;

    @OneToMany(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "id_competition")
    List<Nomination> nominations = new ArrayList<>();

    @OneToMany(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "id_competition")
    List<GroupCategory> groupCategories = new ArrayList<>();

    @OneToMany(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "id_competition")
    List<AgeCategory> ageCategories = new ArrayList<>();

    public void setIdCompetition(int idCompetition) {
        this.idCompetition = idCompetition;
    }

    public int getIdCompetition() {
        return idCompetition;
    }

    public User getOrganizer() {
        return organizer;
    }

    public void setOrganizer(User organizer) {
        this.organizer = organizer;
    }

    public void setNameCompetition(String nameCompetition) {
        this.nameCompetition = nameCompetition;
    }

    public String getNameCompetition() {
        return nameCompetition;
    }

    public void setDescriptionCompetition(String descriptionCompetition) {
        this.descriptionCompetition = descriptionCompetition;
    }

    public String getDescriptionCompetition() {
        return descriptionCompetition;
    }

    public void setDateStart(Date dateStart) {
        this.dateStart = dateStart;
    }

    public Date getDateStart() {
        return dateStart;
    }

    public void setDateFinish(Date dateFinish) {
        this.dateFinish = dateFinish;
    }

    public Date getDateFinish() {
        return dateFinish;
    }

    public City getCityCompetition() {
        return cityCompetition;
    }

    public void setCityCompetition(City cityCompetition) {
        this.cityCompetition = cityCompetition;
    }

    public void setStatusCompetition(StatusCompetition idStatusCompetition) {
        this.statusCompetition = idStatusCompetition;
    }

    public StatusCompetition getStatusCompetition() {
        return statusCompetition;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getImg() {
        return img;
    }

    public StatusModeration getStatusModeration() {
        return statusModeration;
    }

    public void setStatusModeration(StatusModeration statusModeration) {
        this.statusModeration = statusModeration;
    }

    public Double getCompetitionFee() {
        return competitionFee;
    }

    public void setCompetitionFee(Double competitionFee) {
        this.competitionFee = competitionFee;
    }

    public String getRegulation() {
        return regulation;
    }

    public void setRegulation(String regulation) {
        this.regulation = regulation;
    }

    public String getRules() {
        return rules;
    }

    public void setRules(String rules) {
        this.rules = rules;
    }

    public List<Nomination> getNominations() {
        return nominations;
    }

    public void setNominations(List<Nomination> nominations) {
        this.nominations = nominations;
    }

    public List<GroupCategory> getGroupCategories() {
        return groupCategories;
    }

    public void setGroupCategories(List<GroupCategory> groupCategories) {
        this.groupCategories = groupCategories;
    }

    public List<AgeCategory> getAgeCategories() {
        return ageCategories;
    }

    public void setAgeCategories(List<AgeCategory> ageCategories) {
        this.ageCategories = ageCategories;
    }

    public Competition(int idCompetition,
                       User organizer,
                       String nameCompetition,
                       String descriptionCompetition,
                       Date dateStart,
                       Date dateFinish,
                       City cityCompetition,
                       StatusCompetition statusCompetition,
                       StatusModeration statusModeration,
                       Double competitionFee,
                       String regulation,
                       String rules,
                       String img,
                       List<Nomination> nominations,
                       List<GroupCategory> groupCategories,
                       List<AgeCategory> ageCategories){
        this.idCompetition = idCompetition;
        this.organizer = organizer;
        this.nameCompetition = nameCompetition;
        this.descriptionCompetition = descriptionCompetition;
        this.dateStart = dateStart;
        this.dateFinish = dateFinish;
        this.cityCompetition = cityCompetition;
        this.statusCompetition = statusCompetition;
        this.statusModeration = statusModeration;
        this.competitionFee = competitionFee;
        this.rules = rules;
        this.regulation = regulation;
        this.img = img;
        this.nominations = nominations;
        this.groupCategories = groupCategories;
        this.ageCategories = ageCategories;
    }

    public Competition( User organizer,
                       String nameCompetition,
                       String descriptionCompetition,
                       Date dateStart,
                       Date dateFinish,
                       City cityCompetition,
                       StatusCompetition statusCompetition,
                        Double competitionFee,
                        StatusModeration statusModeration,
                        String regulation,
                        String rules,
                        List<Nomination> nominations,
                        List<GroupCategory> groupCategories,
                        List<AgeCategory> ageCategories){
        this.organizer = organizer;
        this.nameCompetition = nameCompetition;
        this.descriptionCompetition = descriptionCompetition;
        this.dateStart = dateStart;
        this.dateFinish = dateFinish;
        this.cityCompetition = cityCompetition;
        this.statusCompetition = statusCompetition;
        this.statusModeration = statusModeration;
        this.competitionFee = competitionFee;
        this.rules = rules;
        this.regulation = regulation;
        this.nominations = nominations;
        this.groupCategories = groupCategories;
        this.ageCategories = ageCategories;
    }

    public Competition( User organizer,
                        String nameCompetition,
                        String descriptionCompetition,
                        Date dateStart,
                        Date dateFinish,
                        City cityCompetition,
                        StatusCompetition statusCompetition,
                        Double competitionFee,
                        StatusModeration statusModeration,
                        String regulation,
                        String rules){
        this.organizer = organizer;
        this.nameCompetition = nameCompetition;
        this.descriptionCompetition = descriptionCompetition;
        this.dateStart = dateStart;
        this.dateFinish = dateFinish;
        this.cityCompetition = cityCompetition;
        this.statusCompetition = statusCompetition;
        this.statusModeration = statusModeration;
        this.competitionFee = competitionFee;
        this.rules = rules;
        this.regulation = regulation;
    }

    public Competition() {
    }
    public void update(CompetitionChangeDTO competitionChangeDTO){
//        this.nameCompetition = competitionChangeDTO.getNameCompetition();
        this.descriptionCompetition = competitionChangeDTO.getDescriptionCompetition();
        this.dateStart = competitionChangeDTO.getDateStart();
        this.dateFinish = competitionChangeDTO.getDateFinish();
    }

    public void updateFromRequest(CompetitionUpdate competitionUpdate){
        this.descriptionCompetition = competitionUpdate.getDescriptionCompetition();
        this.dateStart = competitionUpdate.getDateStart();
        this.dateFinish = competitionUpdate.getDateFinish();
    }
}
