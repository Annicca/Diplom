package com.ru.mykonkursmobile.models;

import com.ru.mykonkursmobile.enums.Status;
import jakarta.persistence.*;

@Entity
@Table(name = "invitation")
public class Invitation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_competition")
    private Competition competition;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_group")
    private ArtGroup artGroup;

    @Enumerated(EnumType.STRING)
    private Status status;

    public Competition getCompetition() {
        return competition;
    }

    public void setCompetition(Competition competition) {
        this.competition = competition;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public ArtGroup getArtGroup() {
        return artGroup;
    }

    public void setArtGroup(ArtGroup artGroup) {
        this.artGroup = artGroup;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Invitation() {
    }

    public Invitation(Integer id, Competition competition, ArtGroup artGroup, Status status) {
        this.id = id;
        this.competition = competition;
        this.artGroup = artGroup;
        this.status = status;
    }

    public Invitation(Competition competition, ArtGroup artGroup, Status status) {
        this.competition = competition;
        this.artGroup = artGroup;
        this.status = status;
    }
}
