package com.cs.csservermanager.properties;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class ApplicationProps {

  public static Properties APPLICATION_PROP = null;

  public static Properties getProperties(String appDir) {
    if (APPLICATION_PROP == null) {
      APPLICATION_PROP = loadApplicationProperties(appDir);
    }
    return APPLICATION_PROP;
  }

  private static Properties loadApplicationProperties(String appDir) {
    try (InputStream input = new FileInputStream(appDir + "/Application.properties")) {
      Properties prop = new Properties();
      prop.load(input);
      return prop;
    } catch (IOException ex) {
      ex.printStackTrace();
      return null;
    }
  }

  public static String getServerResourcePath() {
    return APPLICATION_PROP.getProperty("ServerResourceDir");
  }

}
