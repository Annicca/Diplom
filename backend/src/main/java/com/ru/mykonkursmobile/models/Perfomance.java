package com.ru.mykonkursmobile.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.sql.Date;

@Entity
@Table(name = "perfomance")
public class Perfomance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_statement_participant")
    @JsonIgnore
    @NotNull
    private StatementParticipant statementParticipant;

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIgnore
    @JoinColumn(name = "id_participant")
    private Participant participant;

    @NotBlank
    private String name;

    @Min(value = 1, message = "Значение должно быть больше 0")
    private int countPeople;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_nomination")
    private Nomination nomination;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_genre")
    private Genre genre;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_group_category")
    private GroupCategory groupCategory;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_age_category")
    private AgeCategory ageCategory;

    private String award;

//    @JoinColumn(name = "award_img")
//    private String awardImg;
//
//    private int numberBlock;
//
//    private int number;

//    @JoinColumn(name = "perfomance_time")
//    private Date perfomanceTime;
//
//    private String location;
//
//    @JoinColumn(name = "additional_info")
//    private String additionalInfo;

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

    public int getCountPeople() {
        return countPeople;
    }

    public void setCountPeople(int countPeople) {
        this.countPeople = countPeople;
    }

    public Genre getGenre() {
        return genre;
    }

    public void setGenre(Genre genre) {
        this.genre = genre;
    }

    public Participant getParticipant() {
        return participant;
    }

    public void setParticipant(Participant participant) {
        this.participant = participant;
    }

    public String getAward() {
        return award;
    }

    public void setAward(String award) {
        this.award = award;
    }

    public GroupCategory getGroupCategory() {
        return groupCategory;
    }

    public void setGroupCategory(GroupCategory groupCategory) {
        this.groupCategory = groupCategory;
    }

    public AgeCategory getAgeCategory() {
        return ageCategory;
    }

    public void setAgeCategory(AgeCategory ageCategory) {
        this.ageCategory = ageCategory;
    }

    public Nomination getNomination() {
        return nomination;
    }

    public void setNomination(Nomination nomination) {
        this.nomination = nomination;
    }

    public Perfomance() {
    }

    public Perfomance(Integer id,
                      StatementParticipant statementParticipant,
                      String name,
                      Integer countPeople,
                      Nomination nomination,
                      Genre genre,
                      AgeCategory ageCategory,
                      GroupCategory groupCategory,
                      String award) {
        this.id = id;
        this.statementParticipant = statementParticipant;
        this.name = name;
        this.countPeople = countPeople;
        this.nomination = nomination;
        this.genre = genre;
        this.groupCategory = groupCategory;
        this.ageCategory = ageCategory;
        this.award = award;
    }

    public Perfomance(
                      StatementParticipant statementParticipant,
                      String name,
                      int countPeople,
                      Nomination nomination,
                      Genre genre,
                      AgeCategory ageCategory,
                      GroupCategory groupCategory,
                      String award) {
        this.statementParticipant = statementParticipant;
        this.name = name;
        this.countPeople = countPeople;
        this.nomination = nomination;
        this.genre = genre;
        this.groupCategory = groupCategory;
        this.ageCategory = ageCategory;
        this.award = award;
    }
}
