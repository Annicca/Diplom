package com.ru.mykonkursmobile.enums;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum StatusModeration {
    @JsonProperty("ON_MODERATION")
    ON_MODERATION,
    @JsonProperty("PASSED")
    PASSED,
    @JsonProperty("NOT_PASSED")
    NOT_PASSED
}
