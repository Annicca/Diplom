package com.ru.mykonkursmobile.config;

import com.ru.mykonkursmobile.enums.Role;
import com.ru.mykonkursmobile.security.auth.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig{
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authenticationProvider;

    @Autowired
    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter, AuthenticationProvider authenticationProvider) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.authenticationProvider = authenticationProvider;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests( request -> request
                        .requestMatchers("/api/login", "/api/register").permitAll()
                        .requestMatchers(HttpMethod.POST,  "/api/statements/**").hasAnyAuthority(Role.DIRECTOR.name(), Role.ORGANIZER.name(), Role.CLIENT.name())
                        .requestMatchers(HttpMethod.GET,"/api/competitions/**", "/api/groups/**", "/api/cities").permitAll()

                        .requestMatchers(HttpMethod.GET, "/api/statementsparticipant/group/").hasAuthority(Role.DIRECTOR.name())
                        .requestMatchers(HttpMethod.GET, "/api/statementsparticipant/competition/**").hasAuthority(Role.ORGANIZER.name())
                        .requestMatchers(HttpMethod.POST, "/api/statementsparticipant/**").hasAuthority(Role.DIRECTOR.name())
                        .requestMatchers(HttpMethod.PUT, "/api/statementsparticipant/**").hasAuthority(Role.ORGANIZER.name())

                        .requestMatchers(HttpMethod.GET, "/api/participant/**").hasAnyAuthority(Role.ORGANIZER.name(), Role.DIRECTOR.name())
                        .requestMatchers(HttpMethod.PUT, "/api/perfomance/**").hasAuthority(Role.ORGANIZER.name())

                        .requestMatchers(HttpMethod.GET, "/api/mystatements/**").authenticated()
                        .requestMatchers(HttpMethod.GET,"/api/statements/**").hasAuthority(Role.ADMIN.name())
                        .requestMatchers(HttpMethod.PUT,"/api/statements/**").hasAuthority(Role.ADMIN.name())

                        .requestMatchers(HttpMethod.GET,"/api/users/id").authenticated()
                        .requestMatchers(HttpMethod.GET,"/api/users/**").hasAuthority(Role.ADMIN.name())
                        .requestMatchers(HttpMethod.PUT,"/api/users/**").hasAuthority(Role.ADMIN.name())

                        .requestMatchers(HttpMethod.PUT, "/api/competitions/participants/**").hasAuthority(Role.DIRECTOR.name())
                        .requestMatchers(HttpMethod.PUT, "/api/competitions/**").hasAnyAuthority(Role.ADMIN.name(), Role.ORGANIZER.name())
                        .requestMatchers(HttpMethod.PUT, "/api/competitions/img/**").hasAnyAuthority(Role.ADMIN.name(), Role.ORGANIZER.name())
                        .requestMatchers(HttpMethod.GET, "/api/mycompetitions/**").hasAuthority(Role.ORGANIZER.name())
                        .requestMatchers(HttpMethod.GET, "/api/mycompetitions/started/**").hasAuthority(Role.ORGANIZER.name())

                        .requestMatchers(HttpMethod.GET, "/api/mygroups/**", "/api/usergroups/**").hasAuthority(Role.DIRECTOR.name())
                        .requestMatchers(HttpMethod.PUT, "/api/groups").hasAnyAuthority(Role.DIRECTOR.name(), Role.ADMIN.name())
                        .requestMatchers(HttpMethod.PUT, "/api/groups/img/**").hasAnyAuthority(Role.DIRECTOR.name(), Role.ADMIN.name())
                        .requestMatchers(HttpMethod.DELETE, "/api/groups").hasAuthority(Role.DIRECTOR.name())

                        .requestMatchers(HttpMethod.POST, "/api/invitations").hasAuthority(Role.ORGANIZER.name())
                        .requestMatchers(HttpMethod.GET, "/api/invitations/**").hasAnyAuthority(Role.ORGANIZER.name(), Role.DIRECTOR.name())
                        .requestMatchers(HttpMethod.PUT, "/api/invitations/**").hasAuthority(Role.DIRECTOR.name())

                        .anyRequest().permitAll()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

}
