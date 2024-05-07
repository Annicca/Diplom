package com.ru.mykonkursmobile.enums;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum StatusOrder {
    @JsonProperty("IN_BASKET")
    IN_BASKET,
    @JsonProperty("CREATE")
    CREATE,
    @JsonProperty("SENT")
    SENT,
    @JsonProperty("DELIVERED")
    DELIVERED,
    @JsonProperty("CANCELLED")
    CANCELLED
}
