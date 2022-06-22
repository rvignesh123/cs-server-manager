package com.cs.csservermanager.api;

import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import net.lingala.zip4j.ZipFile;
import net.lingala.zip4j.exception.ZipException;

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

  @PostMapping(value = "/deleteMap", produces = MediaType.APPLICATION_JSON_VALUE)
  public List<MapData> deleteMap(@RequestBody Map<String, String> data) throws IOException {
    log.info("MapsApiController : deleteMap");
    String map = data.get("map");
    File mapsFolder = new File(ApplicationProps.getServerResourcePath() + File.separator + "maps");
    File previewPath = new File(ApplicationProps.getServerResourcePath() + File.separator + "MapPreview");
    File[] deleteList = getList(mapsFolder, map);
    File[] previewList = getList(previewPath, map);
    deleteFiles(deleteList);
    deleteFiles(previewList);
    deleteMapsFile();
    return fetchMaps();
  }

  private File[] getList(File searchPath, String searchName) {
    String strictName = searchName + ".";
    return searchPath.listFiles(new FilenameFilter() {
      public boolean accept(File dir, String name) {
        return name.contains(strictName);
      }
    });
  }

  private void deleteFiles(File[] files) {
    for (File file : files) {
      file.delete();
    }
  }

  private void deleteMapsFile() {
    File mapsFile = new File(ApplicationProps.getMapsFile());
    mapsFile.delete();
  }

  private List<MapData> readMapsList() throws IOException {
    File mapsFile = new File(ApplicationProps.getMapsFile());
    if (mapsFile.exists()) {
      Type type = new TypeToken<List<MapData>>() {
      }.getType();
      return parseJson(ApplicationProps.getMapsFile(), type);
    }
    List<MapData> mapList = new ArrayList<>();
    List<String> maps = new ArrayList<>();
    File mapsPath = new File(ApplicationProps.getServerResourcePath() + File.separator + "maps");
    File mapsIni = new File(
        ApplicationProps.getServerResourcePath() + File.separator + "addons/amxmodx/configs/maps.ini");

    File[] actualMapList = mapsPath.listFiles(new FilenameFilter() {
      public boolean accept(File dir, String name) {
        return name.toLowerCase().endsWith(".bsp");
      }
    });
    for (File eachMap : actualMapList) {
      MapData mapData = new MapData();
      mapData.setName(eachMap.getName().substring(0, eachMap.getName().indexOf('.')));
      maps.add(mapData.getName());
      String previewExt = getPreviewFileExt(mapData.getName());
      if (previewExt != null) {
        mapData.setPreview("ServerResourceList/MapPreview/" + mapData.getName() + previewExt);
      } else {
        mapData.setPreview("ServerResourceList/MapPreview/default.png");
      }
      mapList.add(mapData);
    }
    FileUtils.writeLines(mapsIni, maps, "UTF-8");
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
  public List<MapData> uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
    File downloadedFile = fileStorageService.storeFile(file);
    ZipFile zipFile = new ZipFile(downloadedFile);
    zipFile.extractAll(ApplicationProps.getServerResourcePath());
    deleteMapsFile();
    downloadedFile.delete();
    return fetchMaps();
  }

}