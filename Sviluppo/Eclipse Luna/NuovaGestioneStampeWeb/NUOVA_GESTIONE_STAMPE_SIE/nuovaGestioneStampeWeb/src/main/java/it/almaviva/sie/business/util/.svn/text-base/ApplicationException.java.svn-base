package it.almaviva.sie.business.util;

import java.util.Properties;

public class ApplicationException extends Exception {
	/**
	 * 
	 */
	private static final long serialVersionUID = -5644960139675459949L;
	private static final String AUTH = "AUTH_";
	/**
	 * 
	 */

	private int level;
	private String msgCode;
	private String msgField;
	private String msgText;

	public ApplicationException(String code) {
		super(code);
		setMsgCode(code);
		setMsgText(code);
		setMsgField(code);

	}
	
	public ApplicationException() {
		super("Errore applicativo");
		setMsgCode("Errore applicativo");
		setMsgText("Errore applicativo");

	}

	/**
	 * @param code
	 * @param field
	 */
	public ApplicationException(String code, String field) {
		super(code + ": " + field);
		setMsgCode(code);
		setMsgField(field);
	}

	/**
	 * @param code
	 * @param field
	 * @param text
	 * @param level
	 */
	public ApplicationException(String code, String field, String text, int level) {
		super(code + ": " + text);
		setMsgCode(code);
		setMsgField(field);
		setMsgText(text);
		setLevel(level);
	}

	/**
	 * @return
	 */
	public int getLevel() {
		return level;
	}

	/**
	 * @return
	 */
	public String getMsgCode() {
		// restituisce il codice del messaggio
		return msgCode;
	}

	/**
	 * @return
	 */
	public String getMsgField() {
		// restituisce il campo del messaggio
		return msgField;
	}

	/**
	 * @return
	 */
	public String getMsgText() {
		// restituisce il testo del messaggio
		return msgText;
	}

	/**
	 * @param i
	 */
	public void setLevel(int i) {
		// setta il livello del messaggio
		level = i;
	}

	/**
	 * @param string
	 */
	public void setMsgCode(String string) {
		// setta il codice del messaggio
		msgCode = string;
	}

	/**
	 * @param string
	 */
	public void setMsgField(String string) {
		// setta il campo messaggio
		msgField = string;
	}

	/**
	 * @param string
	 */
	public void setMsgText(String string) {
		// setta il testo del messaggio
		msgText = string;
	}

	public static String getAuth() {
		return AUTH;
	}


}
