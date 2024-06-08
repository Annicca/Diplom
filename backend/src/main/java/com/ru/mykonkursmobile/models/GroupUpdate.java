package com.ru.mykonkursmobile.models;

import com.ru.mykonkursmobile.enums.StatusModeration;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "group_update")
public class GroupUpdate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank
    @Size(max = 25, message = "Максимальная длина названия 25 символов")
    private String nameGroup;

    @Column(columnDefinition = "TEXT")
    private String descriptionGroup;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_city")
    @NotNull
    private City cityGroup;

    @NotBlank
    private String addressGroup;

    private String category;

    @Enumerated(EnumType.STRING)
    private StatusModeration statusModeration;

    private String img;
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    private ArtGroup artGroup;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public City getCityGroup() {
        return cityGroup;
    }

    public void setCityGroup(City cityGroup) {
        this.cityGroup = cityGroup;
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

    public StatusModeration getStatusModeration() {
        return statusModeration;
    }

    public void setStatusModeration(StatusModeration statusModeration) {
        this.statusModeration = statusModeration;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public ArtGroup getArtGroup() {
        return artGroup;
    }

    public void setArtGroup(ArtGroup artGroup) {
        this.artGroup = artGroup;
    }

    
}
