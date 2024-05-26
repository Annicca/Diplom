package com.ru.mykonkursmobile.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "participant")
public class Participant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_competition")
    @NotNull
    private Competition competition;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_group")
    @NotNull
    private ArtGroup group;

    @NotNull
    private int countParticipants;

    @NotNull
    private int countAccompanying;

    @NotBlank
    private String nameAct;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Competition getCompetition() {
        return competition;
    }

    public void setCompetition(Competition competition) {
        this.competition = competition;
    }

    public ArtGroup getGroup() {
        return group;
    }

    public void setGroup(ArtGroup group) {
        this.group = group;
    }

    public int getCountParticipants() {
        return countParticipants;
    }

    public void setCountParticipants(int countParticipants) {
        this.countParticipants = countParticipants;
    }

    public int getCountAccompanying() {
        return countAccompanying;
    }

    public void setCountAccompanying(int countAccompanying) {
        this.countAccompanying = countAccompanying;
    }

    public Participant() {
    }

    public Participant(int id, Competition competition, ArtGroup group, int countParticipants, int countAccompanying) {
        this.id = id;
        this.competition = competition;
        this.group = group;
        this.countParticipants = countParticipants;
        this.countAccompanying = countAccompanying;
    }

    public Participant(Competition competition, ArtGroup group, int countParticipants, int countAccompanying) {
        this.competition = competition;
        this.group = group;
        this.countParticipants = countParticipants;
        this.countAccompanying = countAccompanying;
    }
}
