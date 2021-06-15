package com.cs.csservermanager.manage;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/server")
@CrossOrigin(origins = "http://localhost:3000")
public class ServerManager {

  static ServerProcess gameProcess = new ServerProcess();

  @GetMapping("/ManagerPortal")
  public String showPortal() {
    return "serverManager";
  }

  @GetMapping("/updateServer")
  public Boolean updateServer(@RequestParam("status") Boolean status) {
    return status ? startServer() : stopServer();
  }

  @PostMapping("/startServer")
  @ResponseBody
  public Boolean startServer() {
    Thread gameThread = new Thread(gameProcess);
    gameThread.start();
    try {
      Thread.sleep(2000);
    } catch (InterruptedException e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    }
    return gameProcess.isRunning;
  }

  @PostMapping("/stopServer")
  @ResponseBody
  public Boolean stopServer() {
    try {
      gameProcess.stopProcess();
    } catch (IOException e) {
      e.printStackTrace();
    }
    try {
      Thread.sleep(2000);
    } catch (InterruptedException e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    }
    return gameProcess.isRunning;
  }

  @PostMapping("/serverStatus")
  @ResponseBody
  public Map<String, Object> serverStatus(@RequestBody Map<String, String> data) throws IOException {
    long lineCount = Long.parseLong(data.get("lineCount"));
    Map<String, Object> status = new HashMap<>();
    status.put("isRunning", gameProcess.isRunning);
    status.put("output", gameProcess.getOutput(lineCount));
    status.put("lineCount", gameProcess.lineCount);
    return status;
  }

  @PostMapping("/writeCommand")
  @ResponseBody
  public ServerProcess writeCommand(@RequestBody Map<String, String> data) {
    String lineCommand = data.get("command");
    try {
      gameProcess.writeCommand(lineCommand);
    } catch (IOException e) {
      e.printStackTrace();
    }
    return gameProcess;
  }
}
