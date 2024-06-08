package com.ru.mykonkursmobile.models;

import com.ru.mykonkursmobile.enums.Status;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "invitation")
public class Invitation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE, optional = false)
    @JoinColumn(name = "id_competition")
    @NotNull(message = "Выберите конкурс")
    private Competition competition;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE, optional = false)
    @JoinColumn(name = "id_group")
    @NotNull(message = "Выберите коллектив")
    private ArtGroup group;

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

    public void setId(int id) {
        this.id = id;
    }

    public ArtGroup getGroup() {
        return group;
    }

    public void setGroup(ArtGroup group) {
        this.group = group;
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
        this.group = artGroup;
        this.status = status;
    }

    public Invitation(Competition competition, ArtGroup artGroup, Status status) {
        this.competition = competition;
        this.group = artGroup;
        this.status = status;
    }
}
