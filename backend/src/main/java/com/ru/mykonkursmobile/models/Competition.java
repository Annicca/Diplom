package com.ru.mykonkursmobile.models;

import com.ru.mykonkursmobile.dto.CompetitionChangeDTO;
import com.ru.mykonkursmobile.enums.StatusCompetition;
import com.ru.mykonkursmobile.enums.StatusModeration;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.sql.Date;

@Entity
@Table(name = "competition")
public class Competition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idCompetition;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_user", nullable = false)
    @NotNull
    private User organizer;

    @NotNull
    private String nameCompetition;

    private String descriptionCompetition;

    @NotNull
    private Date dateStart;

    @NotNull
    private Date dateFinish;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_city", nullable = false)
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

//    @JsonBackReference
//    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    @JoinTable(name = "participant",
//            joinColumns = @JoinColumn(name = "id_competition"),
//            inverseJoinColumns = @JoinColumn(name = "id_group"))
//    private List<ArtGroup> groups = new ArrayList<>();
//
//    public List<ArtGroup> getGroups () {
//        return groups;
//    }

//    public void setGroups(List<ArtGroup> groups) {
//        this.groups = groups;
//    }

    public void setIdCompetition(Integer idCompetition) {
        this.idCompetition = idCompetition;
    }

    public Integer getIdCompetition() {
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

    public Competition(Integer idCompetition,
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
                       String img){
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
        this.nameCompetition = competitionChangeDTO.getNameCompetition();
        this.descriptionCompetition = competitionChangeDTO.getDescriptionCompetition();
        this.dateStart = competitionChangeDTO.getDateStart();
        this.dateFinish = competitionChangeDTO.getDateFinish();
        this.img = competitionChangeDTO.getImg();
    }
}
