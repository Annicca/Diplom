package com.ru.mykonkursmobile.dto;

import com.ru.mykonkursmobile.enums.Status;
import com.ru.mykonkursmobile.enums.TypeStatement;
import com.ru.mykonkursmobile.models.AgeCategory;
import com.ru.mykonkursmobile.models.GroupCategory;
import com.ru.mykonkursmobile.models.Nomination;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

public class StatementDTO {
    private Integer idStatement;
    @NotNull
    private TypeStatement type;

    @NotBlank
    private String name;

    private String description;

    @NotNull(message = "Город обязателен для заполнения")
    private Integer idCity;

    private String address;

    private Date dateStart;

    private Date dateFinish;

    @Enumerated(EnumType.STRING)
    private Status statusStatement;

    private Double competitionFee;

    private List<Nomination> nominations = new ArrayList<>();

    private List<GroupCategory> groupCategories = new ArrayList<>();

    private List<AgeCategory> ageCategories = new ArrayList<>();

    private MultipartFile regulation;

    private MultipartFile rules;

    public Integer getIdStatement() {
        return idStatement;
    }

    public void setIdStatement(Integer idStatement) {
        this.idStatement = idStatement;
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

    public Integer getIdCity() {
        return idCity;
    }

    public void setIdCity(Integer idCity) {
        this.idCity = idCity;
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

    public MultipartFile getRegulation() {
        return regulation;
    }

    public void setRegulation(MultipartFile regulation) {
        this.regulation = regulation;
    }

    public MultipartFile getRules() {
        return rules;
    }

    public void setRules(MultipartFile rules) {
        this.rules = rules;
    }

    public List<Nomination> getNominations() {
        return nominations;
    }

    public void setNominations(List<Nomination> nominations) {
        this.nominations = nominations;
    }

    public List<GroupCategory> getGroupCategories() {
        return groupCategories;
    }

    public void setGroupCategories(List<GroupCategory> groupCategories) {
        this.groupCategories = groupCategories;
    }

    public List<AgeCategory> getAgeCategories() {
        return ageCategories;
    }

    public void setAgeCategories(List<AgeCategory> ageCategories) {
        this.ageCategories = ageCategories;
    }
}
