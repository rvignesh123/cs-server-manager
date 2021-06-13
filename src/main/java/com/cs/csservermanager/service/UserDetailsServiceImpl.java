package com.cs.csservermanager.service;

import java.util.ArrayList;
import java.util.Properties;

import com.cs.csservermanager.properties.ApplicationProps;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

  private String getPassword(String name) {
    Properties userProperties = ApplicationProps.loadProperties("Authentication.properties");
    if (userProperties.containsKey(name)) {
      return userProperties.getProperty(name);
    }
    return null;
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    String password = getPassword(username);
    if (password == null) {
      return null;
    }
    return new User(username, password, new ArrayList<>());
  }

}
