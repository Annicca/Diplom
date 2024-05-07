package com.ru.mykonkursmobile.security;

import com.ru.mykonkursmobile.enums.Role;
import com.ru.mykonkursmobile.models.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;

public final class JwtUserFactory {
    public JwtUserFactory() {
    }

    public  static  JwtUser create(User user){
        return new JwtUser(
                user.getIdUser(),
                user.getSurnameUser(),
                user.getNameUser(),
                user.getPatronimycUser(),
                user.getLoginUser(),
                user.getPasswordUser(),
                user.getMailUser(),
                user.getPhoneUser(),
                mapToGrantedAuthorities(user.getRole()));
    }

    private static List<GrantedAuthority> mapToGrantedAuthorities(Role role) {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }
}
