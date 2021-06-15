package com.cs.csservermanager.manage;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.cs.csservermanager.properties.ApplicationProps;

import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ServerProcess implements Runnable {

  private static Logger log = LoggerFactory.getLogger(ServerProcess.class);
  public List<String> commands;
  public boolean isRunning = false;
  public long lineCount = 0;
  public long processId = 0;

  private Process process = null;
  private ProcessHandle processHandle = null;
  private File logFile = null;

  public ServerProcess() {
    logFile = new File(ApplicationProps.getAppDir() + File.separator + "gameLog.txt");
    String[] commandArray = ApplicationProps.APPLICATION_PROP.getProperty("gameCommand").split(" ");
    commands = Arrays.asList(commandArray);
  }

  private void initFile() {
    try {
      FileUtils.writeStringToFile(logFile, "", "UTF-8");
      lineCount = 0;
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  private void appendLog(String log) throws IOException {
    FileUtils.writeStringToFile(logFile, log, "UTF-8", true);
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
    processId = process.pid();
    processHandle = process.toHandle();
    initFile();
    isRunning = true;
    BufferedReader r = new BufferedReader(new InputStreamReader(process.getInputStream()));
    String line = "";
    while (true) {
      line = r.readLine();
      if (line == null) {
        break;
      }
      appendLog(line + "\n");
      lineCount++;
      if (toLog) {
        System.out.println(line);
      }
    }
    process.waitFor();
    return process.exitValue();
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

  public void stopProcess() throws IOException {
    if (processHandle != null) {
      log.info("Stopping game process");
      try {
        Runtime.getRuntime().exec("pkill hlds");
      } catch (Exception e) {
        log.error("Process failed", e);
      }
      log.info("Clearing file");
      initFile();
      processHandle.destroy();
      log.info("Destroyed handle");
    }
  }

  public String getOutput(long lineCount) throws IOException {
    String result = "";
    if (!logFile.exists()) {
      return result;
    }
    try (Stream<String> lines = Files.lines(Paths.get(logFile.toURI()))) {
      result = lines.skip(lineCount).collect(Collectors.joining("\n\r"));
    }
    return result;
  }
}
