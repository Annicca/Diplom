package com.ru.mykonkursmobile.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "participant")
public class Participant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_competition", nullable = false)
    @NotNull
    private Competition competition;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_group", nullable = false)
    @NotNull
    private ArtGroup group;

    @NotNull
    private Integer countParticipants;

    @NotNull
    private Integer countAccompanying;

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

    public Integer getCountParticipants() {
        return countParticipants;
    }

    public void setCountParticipants(Integer countParticipants) {
        this.countParticipants = countParticipants;
    }

    public Integer getCountAccompanying() {
        return countAccompanying;
    }

    public void setCountAccompanying(Integer countAccompanying) {
        this.countAccompanying = countAccompanying;
    }

    public Participant() {
    }

    public Participant(int id, Competition competition, ArtGroup group, Integer countParticipants, Integer countAccompanying) {
        this.id = id;
        this.competition = competition;
        this.group = group;
        this.countParticipants = countParticipants;
        this.countAccompanying = countAccompanying;
    }
}
