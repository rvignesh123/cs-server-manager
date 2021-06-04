package com.cs.csservermanager.manage;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import com.cs.csservermanager.properties.ApplicationProps;

public class ServerProcess implements Runnable {

  public List<String> commands;
  public String output = "";
  public boolean isRunning = false;

  private Process process = null;

  public ServerProcess() {
    String[] commandArray = ApplicationProps.APPLICATION_PROP.getProperty("gameCommand").split(" ");
    commands = Arrays.asList(commandArray);
  }

  /**
   * runProcess method runs a process with given command and options
   * 
   * @param toLog
   * 
   * @param toLog
   * @param path
   * @param commands
   * @param environment
   * @return exitStatus
   * @throws IOException
   * @throws InterruptedException
   */
  public int runProcess(boolean toLog, File path, List<String> commands, Map<String, String> environment)
      throws IOException, InterruptedException {
    ProcessBuilder processBuilder = new ProcessBuilder(commands);
    if (path != null) {
      processBuilder.directory(path);
    }
    if (environment != null) {
      processBuilder.environment().putAll(environment);
    }
    processBuilder.redirectErrorStream(true);
    process = processBuilder.start();
    isRunning = true;
    BufferedReader r = new BufferedReader(new InputStreamReader(process.getInputStream()));
    String line = "";
    StringBuilder builder = new StringBuilder();
    while (true) {
      line = r.readLine();
      if (line == null) {
        break;
      }
      builder.append(line + "\n\r");
      output = builder.toString();
      if (toLog) {
        System.out.println(line);
      }
    }
    process.waitFor();
    return process.exitValue();
  }

  @Override
  public String toString() {
    return output;
  }

  public void writeCommand(String lineCommand) throws IOException {
    OutputStream stdin = process.getOutputStream();

    BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(stdin));
    // content is the string that I want to write to the process.

    writer.write(lineCommand);
    writer.newLine();
    writer.flush();
  }

  @Override
  public void run() {
    try {
      File gameDir = new File(ApplicationProps.APPLICATION_PROP.getProperty("gameDir"));
      runProcess(true, gameDir, commands, null);
      isRunning = false;
    } catch (IOException e) {
      e.printStackTrace();
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
  }

  public void stopProcess() {
    if (process != null) {
      process.destroy();
    }
  }
}
