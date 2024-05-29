package com.ru.mykonkursmobile.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ru.mykonkursmobile.enums.StatusModeration;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.sql.Date;

@Entity
@Table(name = "competition_update")
public class CompetitionUpdate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(columnDefinition = "TEXT")
    private String descriptionCompetition;

    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dateStart;

    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dateFinish;

    @Enumerated(EnumType.STRING)
    private StatusModeration statusModeration;

    private String img;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    private Competition competition;
}
