package com.ru.mykonkursmobile.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.web.multipart.MultipartFile;

public class GroupChangeDTO {
    @NotNull
    private Integer idGroup;

    @NotBlank(message = "Название обязательно")
    @Size(max = 25, message = "Максимальная длина названия 25 символов")
    private String nameGroup;

    private String descriptionGroup;

    @NotNull(message = "Город обязателен для заполнения")
    private Integer idCity;

    @NotBlank(message = "Адрес обязателен для заполнения")
    private String addressGroup;

    private String category;

    private MultipartFile img;

    public Integer getIdGroup() {
        return idGroup;
    }

    public void setIdGroup(Integer idGroup) {
        this.idGroup = idGroup;
    }

    public String getNameGroup() {
        return nameGroup;
    }

    public void setNameGroup(String nameGroup) {
        this.nameGroup = nameGroup;
    }

    public String getDescriptionGroup() {
        return descriptionGroup;
    }

    public void setDescriptionGroup(String descriptionGroup) {
        this.descriptionGroup = descriptionGroup;
    }

    public Integer getIdCity() {
        return idCity;
    }

    public void setIdCity(Integer idCity) {
        this.idCity = idCity;
    }

    public String getAddressGroup() {
        return addressGroup;
    }

    public void setAddressGroup(String addressGroup) {
        this.addressGroup = addressGroup;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public MultipartFile getImg() {
        return img;
    }

    public void setImg(MultipartFile img) {
        this.img = img;
    }
}
