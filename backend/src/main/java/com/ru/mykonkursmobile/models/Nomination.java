package com.ru.mykonkursmobile.models;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
@Entity
@Table(name = "nomination")
public class Nomination {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull
    private String name;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_statement")
    @NotNull
    private Statement statement;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_competition")
    @NotNull
    private Competition competition;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Nomination() {
    }

    public Nomination(int id, Statement statement, Competition competition, String name) {
        this.id = id;
        this.name = name;
        this.statement = statement;
        this.competition = competition;
    }

    public Nomination(Statement statement, Competition competition, String name) {
        this.name = name;
        this.statement = statement;
        this.competition = competition;
    }

    public Nomination(Integer id, Statement statement, String name) {
        this.id = id;
        this.name = name;
        this.statement = statement;
    }

    public Nomination(Statement statement, String name) {
        this.name = name;
        this.statement = statement;
    }
}
