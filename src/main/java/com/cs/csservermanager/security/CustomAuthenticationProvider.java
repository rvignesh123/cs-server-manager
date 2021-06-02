package com.cs.csservermanager.security;

import java.util.ArrayList;
import java.util.Properties;

import com.cs.csservermanager.properties.ApplicationProps;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

  @Override
  public Authentication authenticate(Authentication authentication) throws AuthenticationException {
    String name = authentication.getName();
    String password = authentication.getCredentials().toString();
    if (checkValidDetails(name, password)) {
      return new UsernamePasswordAuthenticationToken(name, password, new ArrayList<>());
    } else {
      return null;
    }
  }

  private boolean checkValidDetails(String name, String password) {
    Properties userProperties = ApplicationProps.loadProperties("Authentication.properties");
    if (userProperties.containsKey(name)) {
      return userProperties.getProperty(name).equals(password);
    }
    return false;
  }

  @Override
  public boolean supports(Class<?> authentication) {
    return authentication.equals(UsernamePasswordAuthenticationToken.class);
  }
}