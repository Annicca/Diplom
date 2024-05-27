package com.ru.mykonkursmobile.models;

import com.ru.mykonkursmobile.enums.Status;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import org.springframework.boot.context.properties.bind.DefaultValue;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "statement_participant")
public class StatementParticipant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE, optional = false)
    @JoinColumn(name = "id_group")
    @NotNull(message = "Выберите коллектив")
    public ArtGroup group;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE, optional = false)
    @JoinColumn(name = "id_competition")
    @NotNull(message = "Выберите конкурс")
    public Competition competition;


    @OneToMany(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "id_statement_participant")
    private List<Perfomance> perfomances = new ArrayList<>();

    @NotNull(message = "Укажите общее количество участников")
    @Min(value = 1, message = "Значение должно быть больше 0")
    private Integer countParticipants;

    @NotNull(message = "Укажите количество сопровождающих")
    @Min(value = 0, message = "Значение не должно быть меньше 0")
    private Integer countAccompanying;

    private Double cost;

    @Enumerated(EnumType.STRING)
    private Status status;

    private boolean isPayment;

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

    public List<Perfomance> getPerfomances() {
        return perfomances;
    }

    public void setPerfomances(List<Perfomance> perfomances) {
        this.perfomances = perfomances;
    }

    public boolean isPayment() {
        return isPayment;
    }

    public void setPayment(boolean payment) {
        isPayment = payment;
    }

    public StatementParticipant() {}
    public StatementParticipant(int id, ArtGroup group, Competition competition, List<Perfomance> perfomances, Integer countParticipants, Integer countAccompanying, Double cost, Status status, boolean isPayment) {
        this.id = id;
        this.group = group;
        this.competition = competition;
        this.countParticipants = countParticipants;
        this.countAccompanying = countAccompanying;
        this.cost = cost;
        this.status = status;
        this.isPayment = isPayment;
        this.perfomances = perfomances;
    }

    public StatementParticipant(ArtGroup group, Competition competition, List<Perfomance> perfomances,  Integer countParticipants, Integer countAccompanying, boolean isPayment) {
        this.group = group;
        this.competition = competition;
        this.countParticipants = countParticipants;
        this.countAccompanying = countAccompanying;
        this.isPayment = isPayment;
        this.perfomances = perfomances;
    }
}
