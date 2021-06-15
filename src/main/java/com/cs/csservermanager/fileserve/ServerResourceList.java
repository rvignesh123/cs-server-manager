package com.cs.csservermanager.fileserve;

import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.text.CharacterIterator;
import java.text.SimpleDateFormat;
import java.text.StringCharacterIterator;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.cs.csservermanager.properties.ApplicationProps;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class ServerResourceList {

  public static final String SERVER_RESOURCE_LIST = "ServerResourceList";

  @RequestMapping("/ServerResourceList")
  public String serveFileList() {
    return "fileList";
  }

  @RequestMapping("/ServerResourceList/**")
  public Object serveWithPath(HttpServletRequest request) throws IOException {
    File target = new File(getFetchPath(request.getRequestURI()));
    if (target.isFile() && target.exists()) {
      return sendDownloadResponse(target);
    } else if (!target.exists()) {
      return ResponseEntity.notFound();
    }
    return "fileList";
  }

  private Object sendDownloadResponse(File target) throws IOException {
    InputStreamResource resource = new InputStreamResource(new FileInputStream(target));
    return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + target.getName())
        .contentLength(target.length()).contentType(MediaType.APPLICATION_OCTET_STREAM).body(resource);
  }

  @RequestMapping(value = "/fileList", method = RequestMethod.POST)
  @ResponseBody
  public List<Object> sendFileList(@RequestBody Map<String, String> data) {
    String filePath = data.get("path");
    return getFileList(getFetchPath(filePath));
  }

  private String getFetchPath(String requestPath) {
    String filteredPath = requestPath
        .substring(requestPath.indexOf(SERVER_RESOURCE_LIST) + SERVER_RESOURCE_LIST.length());
    String fetchPath = ApplicationProps.getServerResourcePath() + File.separator + filteredPath;
    return fetchPath;
  }

  private List<Object> getFileList(String path) {
    File fetchFolder = new File(path);
    File basePath = new File(ApplicationProps.getServerResourcePath());
    List<Object> resultList = new ArrayList<>();

    if (fetchFolder.isDirectory() && fetchFolder.exists()) {
      for (File eachFile : fetchFolder.listFiles()) {
        Map<String, Object> fileObject = new HashMap<>();
        fileObject.put("name", eachFile.getName());
        fileObject.put("folder", eachFile.isDirectory());
        fileObject.put("time", getDateString(eachFile.lastModified()));
        fileObject.put("size", humanReadableByteCountSI(eachFile.length()));
        resultList.add(fileObject);
      }
      if (!basePath.getAbsolutePath().equals(fetchFolder.getAbsolutePath())) {
        Map<String, Object> fileObject = new HashMap<>();
        fileObject.put("name", "..");
        fileObject.put("folder", true);
        fileObject.put("time", "");
        fileObject.put("size", "");
        resultList.add(0, fileObject);
      }
    } else {
      return null;
    }
    return resultList;
  }

  public static String humanReadableByteCountSI(long bytes) {
    if (-1000 < bytes && bytes < 1000) {
      return bytes + " B";
    }
    CharacterIterator ci = new StringCharacterIterator("kMGTPE");
    while (bytes <= -999_950 || bytes >= 999_950) {
      bytes /= 1000;
      ci.next();
    }
    return String.format("%.1f %cB", bytes / 1000.0, ci.current());
  }

  public static String getDateString(long time) {
    SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss");
    Date date = new Date(time);
    return formatter.format(date);
  }

}
