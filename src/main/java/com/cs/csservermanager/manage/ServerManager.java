package com.cs.csservermanager.manage;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ServerManager {

  static ServerProcess gameProcess = new ServerProcess();

  @GetMapping("/ManagerPortal")
  public String showPortal() {
    return "serverManager";
  }

  @PostMapping("/startServer")
  @ResponseBody
  public HashMap<String, String> startServer() {
    HashMap<String, String> resultMap = new HashMap<>();
    Thread gameThread = new Thread(gameProcess);
    gameThread.start();
    resultMap.put("result", "success");
    return resultMap;
  }

  @PostMapping("/serverStatus")
  @ResponseBody
  public ServerProcess serverStatus() {
    return gameProcess;
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
