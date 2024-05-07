package com.ru.mykonkursmobile.models;

import com.ru.mykonkursmobile.enums.StatusStatement;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "statement_participant")
public class StatementParticipant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

//    @ManyToOne(fetch = FetchType.EAGER, optional = false)
//    @JoinColumn(name = "id_user", nullable = false)
//    @NotNull
//    public User user;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_group", nullable = false)
    @NotNull
    public ArtGroup group;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_competition", nullable = false)
    @NotNull
    public Competition competition;

    @NotBlank
    private String nameAct;

    @NotNull
    private Integer countParticipants;

    @NotNull
    private Integer countAccompanying;

    private Double cost;

    @Enumerated(EnumType.STRING)
    private StatusStatement status;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

//    public User getUser() {
//        return user;
//    }
//
//    public void setUser(User user) {
//        this.user = user;
//    }

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

    public String getNameAct() {
        return nameAct;
    }

    public void setNameAct(String nameAct) {
        this.nameAct = nameAct;
    }

    public Integer getCountParticipants() {
        return countParticipants;
    }

    public void setCountParticipants(Integer countParticipants) {
        this.countParticipants = countParticipants;
    }

    public StatusStatement getStatus() {
        return status;
    }

    public void setStatus(StatusStatement status) {
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

    public StatementParticipant(int id, ArtGroup group, Competition competition, String nameAct, Integer countParticipants, Integer countAccompanying, Double cost, StatusStatement status) {
        this.id = id;
        this.group = group;
        this.competition = competition;
        this.nameAct = nameAct;
        this.countParticipants = countParticipants;
        this.countAccompanying = countAccompanying;
        this.cost = cost;
        this.status = status;
    }

    public StatementParticipant() {}
}
