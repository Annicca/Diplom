package com.ru.mykonkursmobile.models;

import com.ru.mykonkursmobile.enums.Status;
import com.ru.mykonkursmobile.enums.TypeStatement;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.sql.Date;

@Entity
@Table(name = "statement")
public class Statement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idStatement;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_user")
    private User user;

    @Enumerated(EnumType.STRING)
    @NotNull
    private TypeStatement type;

    @NotBlank
    private String name;

    private String description;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_city")
    @NotNull
    private City city;

    private String address;

    @JoinColumn(name = "date_start")
    private Date dateStart;

    @JoinColumn(name = "date_finish")
    private Date dateFinish;

    @Enumerated(EnumType.STRING)
    private Status statusStatement;

    @JoinColumn(name = "competition_fee")
    private Double competitionFee;

    private String regulation;

    private String rules;

    public int getIdStatement() {
        return idStatement;
    }

    public void setIdStatement(int idStatement) {
        this.idStatement = idStatement;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public TypeStatement getType() {
        return type;
    }

    public void setType(TypeStatement type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Date getDateStart() {
        return dateStart;
    }

    public void setDateStart(Date dateStart) {
        this.dateStart = dateStart;
    }

    public Date getDateFinish() {
        return dateFinish;
    }

    public void setDateFinish(Date dateFinish) {
        this.dateFinish = dateFinish;
    }

    public Status getStatusStatement() {
        return statusStatement;
    }

    public void setStatusStatement(Status statusStatement) {
        this.statusStatement = statusStatement;
    }

    public Double getCompetitionFee() {
        return competitionFee;
    }

    public void setCompetitionFee(Double competitionFee) {
        this.competitionFee = competitionFee;
    }

    public String getRegulation() {
        return regulation;
    }

    public void setRegulation(String regulation) {
        this.regulation = regulation;
    }

    public String getRules() {
        return rules;
    }

    public void setRules(String rules) {
        this.rules = rules;
    }

    public Statement(int idStatement,
                     User user,
                     TypeStatement type,
                     String name,
                     String description,
                     City city,
                     String address,
                     Date dateStart,
                     Date dateFinish,
                     Double competitionFee,
                     String regulation,
                     String rules) {
        this.idStatement = idStatement;
        this.user = user;
        this.type = type;
        this.name = name;
        this.description = description;
        this.city = city;
        this.address = address;
        this.dateStart = dateStart;
        this.dateFinish = dateFinish;
        this.competitionFee = competitionFee;
        this.rules = rules;
        this.regulation = regulation;
    }

    public Statement(User user, TypeStatement type, String name, String description, City city, String address) {
        this.user = user;
        this.type = type;
        this.name = name;
        this.description = description;
        this.city = city;
        this.address = address;
    }

    public Statement(User user,
                     TypeStatement type,
                     String name,
                     String description,
                     City city,
                     Date dateStart,
                     Date dateFinish,
                     Double competitionFee,
                     String regulation,
                     String rules) {
        this.user = user;
        this.type = type;
        this.name = name;
        this.description = description;
        this.city = city;
        this.dateStart = dateStart;
        this.dateFinish = dateFinish;
        this.competitionFee = competitionFee;
        this.rules = rules;
        this.regulation = regulation;
    }

    public Statement(){}
}

