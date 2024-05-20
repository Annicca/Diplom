package com.ru.mykonkursmobile.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "act")
public class Act {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull(message = "Укажите количество участников номера")
    private Integer countParticipants;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_genre")
    private Genre genre;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_age_category")
    private AgeCategory ageCategory;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_group_category")
    private GroupCategory groupCategory;

    private String award;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Integer getCountParticipants() {
        return countParticipants;
    }

    public void setCountParticipants(Integer countParticipants) {
        this.countParticipants = countParticipants;
    }

    public Genre getGenre() {
        return genre;
    }

    public void setGenre(Genre genre) {
        this.genre = genre;
    }

    public AgeCategory getAgeCategory() {
        return ageCategory;
    }

    public void setAgeCategory(AgeCategory ageCategory) {
        this.ageCategory = ageCategory;
    }

    public GroupCategory getGroupCategory() {
        return groupCategory;
    }

    public void setGroupCategory(GroupCategory groupCategory) {
        this.groupCategory = groupCategory;
    }

    public String getAward() {
        return award;
    }

    public void setAward(String award) {
        this.award = award;
    }

    public Act() {
    }

    public Act(int id, Integer countParticipants, Genre genre, AgeCategory ageCategory, GroupCategory groupCategory, String award) {
        this.id = id;
        this.countParticipants = countParticipants;
        this.genre = genre;
        this.ageCategory = ageCategory;
        this.groupCategory = groupCategory;
        this.award = award;
    }

    public Act(Integer countParticipants, Genre genre, AgeCategory ageCategory, GroupCategory groupCategory) {
        this.countParticipants = countParticipants;
        this.genre = genre;
        this.ageCategory = ageCategory;
        this.groupCategory = groupCategory;
    }
}
