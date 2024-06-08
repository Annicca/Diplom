package com.ru.mykonkursmobile.enums;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum Status{
    @JsonProperty("ACCEPTED")
    ACCEPTED,
    @JsonProperty("REJECTED")
    REJECTED
}