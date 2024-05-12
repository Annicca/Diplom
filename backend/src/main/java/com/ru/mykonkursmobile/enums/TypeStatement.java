package com.ru.mykonkursmobile.enums;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum TypeStatement {
    @JsonProperty("COMPETITION")
    COMPETITION,
    @JsonProperty("GROUP")
    GROUP
}
