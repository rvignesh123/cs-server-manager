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
    HashMap<String, String> resultMap = new HashMap<>();
    Thread gameThread = new Thread(gameProcess);
    gameThread.start();
    resultMap.put("result", "success");
    return true;
  }

  @PostMapping("/stopServer")
  @ResponseBody
  public Boolean stopServer() {
    HashMap<String, String> resultMap = new HashMap<>();
    gameProcess.stopProcess();
    resultMap.put("result", "success");
    return false;
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
