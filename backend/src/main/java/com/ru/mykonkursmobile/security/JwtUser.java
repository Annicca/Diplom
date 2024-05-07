package com.ru.mykonkursmobile.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class JwtUser implements UserDetails{

    private final int idUser;

    private final String surnameUser;

    private final String nameUser;

    private final String patronimycUser;

    @Column(name="login_user", unique = true, nullable = false)
    private final String loginUser;

    @Column(name="password_user", nullable = false)
    private final String passwordUser;

    private final String mailUser;

    private final String phoneUser;

    private final Collection<? extends GrantedAuthority> authorities;

    public JwtUser(int idUser,
                   String surnameUser,
                   String nameUser,
                   String patronimycUser,
                   String loginUser,
                   String passwordUser,
                   String mailUser,
                   String phoneUser,
                   Collection<? extends GrantedAuthority> authorities){
        this.idUser = idUser;
        this.surnameUser = surnameUser;
        this.nameUser = nameUser;
        this.patronimycUser = patronimycUser;
        this.loginUser = loginUser;
        this.passwordUser = passwordUser;
        this.mailUser = mailUser;
        this.phoneUser = phoneUser;
        this.authorities = authorities;
    }

    @JsonIgnore
    public int getIdUser() {
        return idUser;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @JsonIgnore
    @Override
    public String getPassword() {
        return passwordUser;
    }

    @Override
    public String getUsername() {
        return loginUser;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public String getSurnameUser() {
        return surnameUser;
    }

    public String getNameUser() {
        return nameUser;
    }

    public String getPatronimycUser() {
        return patronimycUser;
    }

    public String getMailUser() {
        return mailUser;
    }

    public String getPhoneUser() {
        return phoneUser;
    }
}
