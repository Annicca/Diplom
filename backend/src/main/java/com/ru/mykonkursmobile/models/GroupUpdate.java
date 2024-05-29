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
}
