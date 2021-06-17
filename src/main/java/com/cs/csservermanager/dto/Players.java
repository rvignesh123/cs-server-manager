package com.cs.csservermanager.dto;

import java.util.ArrayList;
import java.util.List;

public class Players {
  private List<Player> ct;
  private List<Player> t;
  private List<Player> spec;

  public Players() {
    ct = new ArrayList<>();
    t = new ArrayList<>();
    spec = new ArrayList<>();
  }

  public List<Player> getCt() {
    return ct;
  }

  public void setCt(List<Player> ct) {
    this.ct = ct;
  }

  public List<Player> getT() {
    return t;
  }

  public void setT(List<Player> t) {
    this.t = t;
  }

  public List<Player> getSpec() {
    return spec;
  }

  public void setSpec(List<Player> spec) {
    this.spec = spec;
  }

}
