package com.cs.csservermanager;

import com.cs.csservermanager.configuration.FileStorageProperties;
import com.cs.csservermanager.properties.ApplicationProps;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({ FileStorageProperties.class })
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
