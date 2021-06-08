
package com.cs.csservermanager.dto;

import com.google.gson.annotations.SerializedName;

public class MapData {

  @SerializedName("preview")
  private String preview;

  @SerializedName("name")
  private String name;

  public String getPreview() {
    return preview;
  }

  public void setPreview(String preview) {
    this.preview = preview;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

}
