package it.almaviva.sie.business.util;

import java.io.Serializable;

import org.apache.log4j.Level;
import org.apache.log4j.Logger;

//classe utilizzata per scrivere nel file di log
public class TraceLogger implements Serializable {

    private static final long serialVersionUID = 1L;
    private static final int DEBUG = 1;
    private static final int INFO = 2;
    private static final int WARNING = 3;
    private static final int ERROR = 4;
    private static Logger logger = Logger.getLogger(TraceLogger.class);

    private static void init() {
    	
    }

    public static void traceLog(int livello, String messaggio , Class classe) {
        init();
        
        logger = Logger.getLogger(classe);
        logger.log(getLevelLog4j(livello), messaggio);
    }

    public static void traceLog(String messaggio, Class classe) {
        init();
        logger = Logger.getLogger(classe);
        logger.log(Level.DEBUG, messaggio);
    }
    
    public static void traceError(  String messaggio, Class classe,Throwable th) {
        init();
        logger = Logger.getLogger(classe);
        logger.error(messaggio, th);
    }

    private static Level getLevelLog4j(int livello) {
        if (livello == WARNING) {
            return Level.WARN;
        } else if (livello == INFO) {
            return Level.INFO;
        } else if (livello == WARNING) {
            return Level.WARN;
        } else if (livello == ERROR) {
            return Level.ERROR;
        } else {
            return Level.DEBUG;
        }
    }

	public static int getDEBUG() {
		return DEBUG;
	}

	public static int getINFO() {
		return INFO;
	}

	public static int getWARNING() {
		return WARNING;
	}



	public static int getERROR() {
		return ERROR;
	}
}
