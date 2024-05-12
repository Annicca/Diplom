package com.ru.mykonkursmobile.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "genre")
public class Genre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull
    private String name;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_nomination")
    @NotNull
    private Nomination nomination;

    public int getId() {
        return id;
    }

    public void setIdGroup(int idGroup) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Nomination getNomination() {
        return nomination;
    }

    public void setNomination(Nomination nomination) {
        this.nomination = nomination;
    }

    public Genre() {
    }

    public Genre(int id, String name, Nomination nomination) {
        this.id = id;
        this.name = name;
        this.nomination = nomination;
    }
    public Genre(String name, Nomination nomination) {
        this.name = name;
        this.nomination = nomination;
    }
}
