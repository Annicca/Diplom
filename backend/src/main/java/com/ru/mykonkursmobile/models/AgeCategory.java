package com.ru.mykonkursmobile.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "age_category")
public class AgeCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull
    private String name;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_statement", nullable = false)
    @JsonIgnore
    private Statement statement;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_competition", nullable = true)
    @JsonIgnore
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

    public AgeCategory() {
    }

    public AgeCategory(int id, String name, Statement statement, Competition competition) {
        this.id = id;
        this.name = name;
        this.statement = statement;
        this.competition = competition;
    }

    public AgeCategory(int id, String name, Statement statement) {
        this.id = id;
        this.name = name;
        this.statement = statement;
    }

    public AgeCategory(String name) {
        this.name = name;
    }
}
