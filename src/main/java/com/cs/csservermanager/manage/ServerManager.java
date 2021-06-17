package com.cs.csservermanager.manage;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Set;
import java.util.Map.Entry;

import com.cs.csservermanager.dto.Player;
import com.cs.csservermanager.dto.Players;
import com.cs.csservermanager.properties.ApplicationProps;

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

  @PostMapping("/getCurrentPlayers")
  @ResponseBody
  public Players getCurrentPlayers() {
    Players players = new Players();
    String lineCommand = "amx_list_players";
    try {
      gameProcess.writeCommand(lineCommand);
      Thread.sleep(2000);
      long index = gameProcess.lineCount - 30;
      if (index < 0) {
        index = 0;
      }
      String rawData = gameProcess.getOutput(index);
      rawData = rawData.substring(rawData.lastIndexOf("PLAYER LIST"), rawData.lastIndexOf("END_OF_PLAYER_LIST") - 1);
      String lines[] = rawData.split("\n");
      for (int i = 0; i < lines.length; i++) {
        if (i == 0) {
          continue;
        }
        Player player = trimPlayer(lines[i]);
        if (player.getTeam().equals("CT")) {
          players.getCt().add(player);
        } else if (player.getTeam().equals("TERRORIST")) {
          players.getT().add(player);
        } else {
          players.getSpec().add(player);
        }
      }

    } catch (Exception e) {
      e.printStackTrace();
    }
    return players;
  }

  private Player trimPlayer(String line) {
    Player player = new Player();
    String[] lineSplit = line.trim().split("==:==");
    player.setName(lineSplit[0]);
    player.setTeam(lineSplit[1]);
    player.setId(lineSplit[2]);
    return player;
  }
  // CT
  // TERRORIST
  // SPECTATOR
  // UNASSIGNED

  private String backTrim(String line, int max) {
    int count = 0;
    boolean wordFlag = true;
    int index;
    for (index = line.length() - 1; index >= 0; index--) {
      char character = line.charAt(index);
      if (character == ' ') {
        if (wordFlag) {
          wordFlag = false;
          count++;
        }
      } else {
        wordFlag = true;
        if (count == max) {
          break;
        }
      }

    }
    return line.substring(0, index + 1);
  }

  private String frontTrim(String line, int max) {
    int count = 0;
    boolean wordFlag = true;
    int index;
    for (index = 0; index < line.length(); index++) {
      char character = line.charAt(index);
      if (character == ' ') {
        if (wordFlag) {
          wordFlag = false;
          count++;
        }
      } else {
        wordFlag = true;
        if (count == max) {
          break;
        }
      }

    }
    return line.substring(index);
  }

  @PostMapping("/getQuickUtilCommands")
  @ResponseBody
  public List<Map<String, String>> getQuickUtilCommands() {
    List<Map<String, String>> commands = new ArrayList<>();
    Properties quickUtils = ApplicationProps.loadProperties("quickutils.properties");
    Set<Entry<Object, Object>> entries = quickUtils.entrySet();
    for (Entry<Object, Object> entry : entries) {
      Map<String, String> eachCommand = new HashMap<>();
      eachCommand.put("label", entry.getKey().toString());
      eachCommand.put("command", entry.getValue().toString());
      commands.add(eachCommand);
    }
    return commands;
  }
}
