package com.cs.csservermanager.properties;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class ApplicationProps {

  public static Properties APPLICATION_PROP = null;
  private static String appDir = null;

  public static Properties getProperties(String appDir) {
    if (APPLICATION_PROP == null) {
      ApplicationProps.appDir = appDir;
      APPLICATION_PROP = loadApplicationProperties(appDir);
    }
    return APPLICATION_PROP;
  }

  private static Properties loadApplicationProperties(String appDir) {
    return loadProperties("Application.properties");
  }

  public static String getAppDir() {
    return appDir;
  }

  public static Properties loadProperties(String propertiesFileName) {
    try (InputStream input = new FileInputStream(appDir + "/" + propertiesFileName)) {
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

  public static String getMapsFile() {
    return appDir + File.separator + "maps.json";
  }

}
