package com.ru.mykonkursmobile.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.List;

@Entity
@Table(name = "nomination")
public class Nomination {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull
    private String name;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_statement")
    @JsonIgnore
    private Statement statement;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_competition", nullable = true)
    @JsonIgnore
    private Competition competition;

    @OneToMany(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "id_nomination")
    private List<Genre> genres;

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

    public Statement getStatement() {
        return statement;
    }

    public void setStatement(Statement statement) {
        this.statement = statement;
    }

    public Competition getCompetition() {
        return competition;
    }

    public void setCompetition(Competition competition) {
        this.competition = competition;
    }

    public List<Genre> getGenres() {
        return genres;
    }

    public void setGenres(List<Genre> genres) {
        this.genres = genres;
    }

    public Nomination() {
    }

    public Nomination(int id, Statement statement, Competition competition, String name, List<Genre> genres) {
        this.id = id;
        this.name = name;
        this.statement = statement;
        this.competition = competition;
        this.genres = genres;
    }

    public Nomination(int id,Statement statement, String name, List<Genre> genres) {
        this.id = id;
        this.name = name;
        this.statement = statement;
        this.genres = genres;
    }

    public Nomination(Statement statement, String name, List<Genre> genres) {
        this.name = name;
        this.statement = statement;
        this.genres = genres;
    }

    public Nomination(String name) {
        this.name = name;
    }
}
