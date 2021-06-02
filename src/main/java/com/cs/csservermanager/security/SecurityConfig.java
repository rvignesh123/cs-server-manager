package com.cs.csservermanager.security;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.authorizeRequests().antMatchers("/css/**").permitAll().antMatchers("/js/**").permitAll()
        .antMatchers("/ServerResourceList/**").permitAll().antMatchers("/fileList/**").permitAll().anyRequest()
        .authenticated().and().formLogin().loginPage("/login").permitAll();
    http.csrf().disable();
  }

  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.authenticationProvider(new CustomAuthenticationProvider());
    super.configure(auth);
  }
}
