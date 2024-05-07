package com.ru.mykonkursmobile.enums;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum Role {

    @JsonProperty("ADMIN")
    ADMIN,
    @JsonProperty("CLIENT")
    CLIENT,
    @JsonProperty("DIRECTOR")
    DIRECTOR,
    @JsonProperty("ORGANIZER")
    ORGANIZER
}
