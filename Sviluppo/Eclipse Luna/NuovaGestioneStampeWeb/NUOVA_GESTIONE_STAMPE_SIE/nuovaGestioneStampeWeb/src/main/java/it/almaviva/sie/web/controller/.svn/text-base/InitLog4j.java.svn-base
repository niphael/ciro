package it.almaviva.sie.web.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.log4j.Appender;
import org.apache.log4j.FileAppender;
import org.apache.log4j.Level;
import org.apache.log4j.Logger;
import org.apache.log4j.PatternLayout;
import org.apache.log4j.RollingFileAppender;

public class InitLog4j extends HttpServlet {

   public void init() {
        String initPath = getInitParameter("logPath");
        String logPath = "/WEB-INF/logs/nuovaGestioneStampeSie.log";
        if (initPath != null) logPath = initPath;
        FileAppender appender = getAppender(logPath);
        if (appender == null) return;
        initLogger(null, appender, Level.ALL);
  }

  private FileAppender getAppender(String fileName) {
    RollingFileAppender appender = null;
    try {
      appender = new RollingFileAppender(
          new PatternLayout("%-5p %c %t%n%29d - %m%n"),
          getServletContext().getRealPath(fileName),
          true);
      appender.setMaxBackupIndex(5);
      appender.setMaxFileSize("1MB");
    } catch (IOException ex) {
      System.out.println(
          "Could not create appender for " 
          + fileName + ":"
          + ex.getMessage());
    }
    return appender;
  }

  private void initLogger(String name, 
                          FileAppender appender, 
                          Level level) 
  {
    Logger logger;
    if (name == null) {
      logger = Logger.getRootLogger();
    } else {
      logger = Logger.getLogger(name);
    }
    logger.setLevel(level);
    logger.addAppender(appender);
    logger.info("Starting " + logger.getName());
  }


}