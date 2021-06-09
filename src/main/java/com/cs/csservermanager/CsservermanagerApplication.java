package com.cs.csservermanager;

import com.cs.csservermanager.properties.ApplicationProps;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CsservermanagerApplication {

  public static void main(String[] args) {
    String appDir = "/home/vignesh/CS_DIR";
    if (args.length > 0) {
      appDir = args[0];
    }
    ApplicationProps.getProperties(appDir);
    SpringApplication.run(CsservermanagerApplication.class, args);
  }

}
