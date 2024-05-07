package com.ru.mykonkursmobile.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class Act {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
//    @JoinColumn(name = "id_pa", nullable = false)
    @NotNull
    private StatementParticipant statementParticipant;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    private Participant participant;


    @NotBlank
    private String name;

    @NotNull
    private Number countPeople;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_genre", nullable = false)
    @NotNull
    private Genre genre;

    private String award;

    @JoinColumn(name = "award_img", nullable = false)
    private String awardImg;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public StatementParticipant getStatementParticipant() {
        return statementParticipant;
    }

    public void setStatementParticipant(StatementParticipant statementParticipant) {
        this.statementParticipant = statementParticipant;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Number getCountPeople() {
        return countPeople;
    }

    public void setCountPeople(Number countPeople) {
        this.countPeople = countPeople;
    }

    public Genre getGenre() {
        return genre;
    }

    public void setGenre(Genre genre) {
        this.genre = genre;
    }

    public Act() {
    }

    public Act(int id, StatementParticipant statementParticipant, String name, Number countPeople, Genre genre) {
        this.id = id;
        this.statementParticipant = statementParticipant;
        this.name = name;
        this.countPeople = countPeople;
        this.genre = genre;
    }
}
