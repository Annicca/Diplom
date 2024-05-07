package com.ru.mykonkursmobile.enums;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum StatusCompetition {
    @JsonProperty("CREATED")
    CREATED,
    @JsonProperty("STARTED")
    STARTED,
    @JsonProperty("CANCELLED")
    CANCELLED,
    @JsonProperty("FINISHED")
    FINISHED
}
