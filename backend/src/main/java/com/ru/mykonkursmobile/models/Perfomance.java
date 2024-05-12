package com.ru.mykonkursmobile.models;

import jakarta.persistence.*;
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
    @NotNull
    private StatementParticipant statementParticipant;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_participant")
    private Participant participant;

    @NotBlank
    private String name;

    @NotNull
    private int countPeople;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_genre")
    @NotNull
    private Genre genre;

    private String award;

    @JoinColumn(name = "award_img")
    private String awardImg;

    private int numberBlock;

    private int number;

    @JoinColumn(name = "perfomance_time")
    private Date perfomanceTime;

    private String location;

    @JoinColumn(name = "additional_info")
    private String additionalInfo;

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

    public String getAwardImg() {
        return awardImg;
    }

    public void setAwardImg(String awardImg) {
        this.awardImg = awardImg;
    }

    public int getNumberBlock() {
        return numberBlock;
    }

    public void setNumberBlock(int numberBlock) {
        this.numberBlock = numberBlock;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public Date getPerfomanceTime() {
        return perfomanceTime;
    }

    public void setPerfomanceTime(Date perfomanceTime) {
        this.perfomanceTime = perfomanceTime;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getAdditionalInfo() {
        return additionalInfo;
    }

    public void setAdditionalInfo(String additionalInfo) {
        this.additionalInfo = additionalInfo;
    }

    public Perfomance() {
    }

    public Perfomance(Integer id,
                      StatementParticipant statementParticipant,
                      String name,
                      Integer countPeople,
                      Genre genre,
                      String award,
                      String awardImg,
                      int numberBlock,
                      int number,
                      Date perfomanceTime,
                      String location) {
        this.id = id;
        this.statementParticipant = statementParticipant;
        this.name = name;
        this.countPeople = countPeople;
        this.genre = genre;
        this.award = award;
        this.awardImg = awardImg;
        this.numberBlock = numberBlock;
        this.number = number;
        this.perfomanceTime = perfomanceTime;
        this.location = location;
    }

    public Perfomance(
                      StatementParticipant statementParticipant,
                      String name,
                      int countPeople,
                      Genre genre,
                      String award,
                      String awardImg,
                      int numberBlock,
                      int number,
                      Date perfomanceTime,
                      String location) {
        this.statementParticipant = statementParticipant;
        this.name = name;
        this.countPeople = countPeople;
        this.genre = genre;
        this.award = award;
        this.awardImg = awardImg;
        this.numberBlock = numberBlock;
        this.number = number;
        this.perfomanceTime = perfomanceTime;
        this.location = location;
    }

    public Perfomance(int id,
                      StatementParticipant statementParticipant,
                      Participant participant,
                      String name,
                      int countPeople,
                      Genre genre,
                      String award,
                      String awardImg,
                      int numberBlock,
                      int number,
                      Date perfomanceTime,
                      String location) {
        this.id = id;
        this.statementParticipant = statementParticipant;
        this.participant = participant;
        this.name = name;
        this.countPeople = countPeople;
        this.genre = genre;
        this.award = award;
        this.awardImg = awardImg;
        this.numberBlock = numberBlock;
        this.number = number;
        this.perfomanceTime = perfomanceTime;
        this.location = location;
    }

    public Perfomance(
                      StatementParticipant statementParticipant,
                      Participant participant,
                      String name,
                      int countPeople,
                      Genre genre,
                      String award,
                      String awardImg,
                      int numberBlock,
                      int number,
                      Date perfomanceTime,
                      String location) {
        this.statementParticipant = statementParticipant;
        this.participant = participant;
        this.name = name;
        this.countPeople = countPeople;
        this.genre = genre;
        this.award = award;
        this.awardImg = awardImg;
        this.numberBlock = numberBlock;
        this.number = number;
        this.perfomanceTime = perfomanceTime;
        this.location = location;
    }
}
