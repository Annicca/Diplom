package com.ru.mykonkursmobile.models;

import com.ru.mykonkursmobile.enums.Status;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "statement_participant")
public class StatementParticipant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST, optional = false)
    @JoinColumn(name = "id_group")
    @NotNull(message = "Выберите коллектив")
    public ArtGroup group;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST, optional = false)
    @JoinColumn(name = "id_competition")
    @NotNull(message = "Выберите конкурс")
    public Competition competition;


    @OneToMany(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "id_act")
    private List<Act> acts = new ArrayList<>();

    @NotNull(message = "Укажите общее количество участников")
    private Integer countParticipants;

    @NotNull(message = "Укажите количество сопровождающих")
    private Integer countAccompanying;

    private Double cost;

    @Enumerated(EnumType.STRING)
    private Status status;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public ArtGroup getGroup() {
        return group;
    }

    public void setGroup(ArtGroup group) {
        this.group = group;
    }

    public Competition getCompetition() {
        return competition;
    }

    public void setCompetition(Competition competition) {
        this.competition = competition;
    }

    public Integer getCountParticipants() {
        return countParticipants;
    }

    public void setCountParticipants(Integer countParticipants) {
        this.countParticipants = countParticipants;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Integer getCountAccompanying() {
        return countAccompanying;
    }

    public void setCountAccompanying(Integer countAccompanying) {
        this.countAccompanying = countAccompanying;
    }

    public Double getCost() {
        return cost;
    }

    public void setCost(Double cost) {
        this.cost = cost;
    }

    public List<Act> getActs() {
        return acts;
    }

    public void setActs(List<Act> acts) {
        this.acts = acts;
    }

    public StatementParticipant() {}
    public StatementParticipant(int id, ArtGroup group, Competition competition, List<Act> acts, Integer countParticipants, Integer countAccompanying, Double cost, Status status) {
        this.id = id;
        this.group = group;
        this.competition = competition;
        this.countParticipants = countParticipants;
        this.countAccompanying = countAccompanying;
        this.cost = cost;
        this.status = status;
        this.acts = acts;
    }

    public StatementParticipant(ArtGroup group, Competition competition, List<Act> acts,  Integer countParticipants, Integer countAccompanying) {
        this.group = group;
        this.competition = competition;
        this.countParticipants = countParticipants;
        this.countAccompanying = countAccompanying;
        this.acts = acts;
    }
}
