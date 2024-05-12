package com.ru.mykonkursmobile.dto;

import jakarta.validation.constraints.*;

public class AuthenticationRequestDTO {

    @NotBlank(message = "Логин обязателен")
    @Size(min = 5, message = "Минимальная длина логина 5 символов")
    @Pattern(regexp = "^[A-Za-z0-9]+$", message = "Логин может содержать только буквы латинского алфавита и цифры")
    private String login;

    @Size(min = 8, message = "Минимальная длина пароля 8 символов")
    @Pattern(regexp = "((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Za-z]).*$", message = "Пароль должен включать буквы латинского алфавита, цифры и хотя бы 1 спец символ")
    @NotBlank(message = "Пароль обязателен")
    private String password;

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
