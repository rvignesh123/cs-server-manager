package com.cs.csservermanager.api;

import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.cs.csservermanager.dto.MapData;
import com.cs.csservermanager.dto.UploadFileResponse;
import com.cs.csservermanager.properties.ApplicationProps;
import com.cs.csservermanager.service.FileStorageService;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import org.apache.commons.io.FileUtils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/maps")
@CrossOrigin(origins = "http://localhost:3000")
public class MapsApiController {

  private static Logger log = LoggerFactory.getLogger(MapsApiController.class);

  @Autowired
  private FileStorageService fileStorageService;

  @PostMapping(value = "/fetchMaps", produces = MediaType.APPLICATION_JSON_VALUE)
  public List<MapData> fetchMaps() throws IOException {
    log.info("MapsApiController : fetchMaps");
    return readMapsList();
  }

  @PostMapping(value = "/mapList", produces = MediaType.APPLICATION_JSON_VALUE)
  public List<String> getMapList() throws IOException {
    log.info("MapsApiController : getMapList");
    List<MapData> mapDataList = readMapsList();
    List<String> mapList = new ArrayList<>();
    for (MapData mapData : mapDataList) {
      mapList.add(mapData.getName());
    }
    return mapList;
  }

  private List<MapData> readMapsList() throws IOException {
    File mapsFile = new File(ApplicationProps.getMapsFile());
    if (mapsFile.exists()) {
      Type type = new TypeToken<List<MapData>>() {
      }.getType();
      return parseJson(ApplicationProps.getMapsFile(), type);
    }
    List<MapData> mapList = new ArrayList<>();
    File mapsPath = new File(ApplicationProps.getServerResourcePath() + File.separator + "maps");
    File[] actualMapList = mapsPath.listFiles(new FilenameFilter() {
      public boolean accept(File dir, String name) {
        return name.toLowerCase().endsWith(".bsp");
      }
    });
    for (File eachMap : actualMapList) {
      MapData mapData = new MapData();
      mapData.setName(eachMap.getName().substring(0, eachMap.getName().indexOf('.')));
      String previewExt = getPreviewFileExt(mapData.getName());
      if (previewExt != null) {
        mapData.setPreview("ServerResourceList/MapPreview/" + mapData.getName() + previewExt);
      } else {
        mapData.setPreview("ServerResourceList/MapPreview/default.png");
      }
      mapList.add(mapData);
    }
    writeMapsListToFile(mapsFile, mapList);
    return mapList;
  }

  private void writeMapsListToFile(File mapsFile, List<MapData> mapList) throws IOException {
    Gson gson = new GsonBuilder().setPrettyPrinting().create();
    FileUtils.writeStringToFile(mapsFile, gson.toJson(mapList), "UTF-8");
  }

  private String getPreviewFileExt(String name) {
    File previewPath = new File(ApplicationProps.getServerResourcePath() + File.separator + "MapPreview");
    List<String> supportedExt = Arrays.asList(".jpg", ".png", ".bmp", ".webp");
    for (String eachExt : supportedExt) {
      File previewFile = new File(previewPath.getAbsolutePath() + File.separator + name + eachExt);
      if (previewFile.exists()) {
        return eachExt;
      }
    }
    return null;
  }

  /**
   * To parse a specific JSON file with given Type
   * 
   * @param <T>
   * @param fileName
   * @param type
   * @return
   * @throws IOException
   */
  public <T> T parseJson(String fileName, Type type) throws IOException {
    Gson gson = new Gson();
    return gson.fromJson(readFile(fileName), type);
  }

  /**
   * Read a file with UTF8 encoding
   * 
   * @param fileName
   * @return fileContent
   * @throws IOException
   */
  private String readFile(String fileName) throws IOException {
    File file = new File(fileName);
    return FileUtils.readFileToString(file, "UTF-8");
  }

  @PostMapping("/uploadMap")
  public UploadFileResponse uploadFile(@RequestParam("file") MultipartFile file) {
    String fileName = fileStorageService.storeFile(file);

    String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/downloadFile/").path(fileName)
        .toUriString();

    return new UploadFileResponse(fileName, fileDownloadUri, file.getContentType(), file.getSize());
  }

}