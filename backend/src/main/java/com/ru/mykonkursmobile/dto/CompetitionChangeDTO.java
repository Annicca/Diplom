package com.ru.mykonkursmobile.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.*;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Date;

public class CompetitionChangeDTO {

    @NotNull
    private Integer idCompetition;

    @NotBlank
    @Size(max = 25, message = "Максимальная длина названия 25 символов")
    private String nameCompetition;

    private String descriptionCompetition;

    @NotNull
    private Date dateStart;

    @NotNull
    private Date dateFinish;

    @NotNull
    private Integer idCity;

//    private MultipartFile img;

    private String img;

    public Integer getIdCompetition() {
        return idCompetition;
    }

    public void setIdCompetition(Integer idCompetition) {
        this.idCompetition = idCompetition;
    }

    public String getNameCompetition() {
        return nameCompetition;
    }

    public void setNameCompetition(String nameCompetition) {
        this.nameCompetition = nameCompetition;
    }

    public String getDescriptionCompetition() {
        return descriptionCompetition;
    }

    public void setDescriptionCompetition(String descriptionCompetition) {
        this.descriptionCompetition = descriptionCompetition;
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

    public Integer getIdCity() {
        return idCity;
    }

    public void setIdCity(Integer idCity) {
        this.idCity = idCity;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    //    public MultipartFile getImg() {
//        return img;
//    }
//
//    public void setImg(MultipartFile img) {
//        this.img = img;
//    }
}
