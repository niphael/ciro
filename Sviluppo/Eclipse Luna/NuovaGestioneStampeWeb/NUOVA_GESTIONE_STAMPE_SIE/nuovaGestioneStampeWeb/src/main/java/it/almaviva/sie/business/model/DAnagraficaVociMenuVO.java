package it.almaviva.sie.business.model;

import java.io.Serializable;

public class DAnagraficaVociMenuVO implements Serializable {
	private String CODI_PK_VOCE_MENU;
	private String DESC_DESCRIZIONE_VOCE;
	private String TEXT_NEW_URL;
	public String getCODI_PK_VOCE_MENU() {
		return CODI_PK_VOCE_MENU;
	}
	public void setCODI_PK_VOCE_MENU(String cODI_PK_VOCE_MENU) {
		CODI_PK_VOCE_MENU = cODI_PK_VOCE_MENU;
	}
	public String getDESC_DESCRIZIONE_VOCE() {
		return DESC_DESCRIZIONE_VOCE;
	}
	public void setDESC_DESCRIZIONE_VOCE(String dESC_DESCRIZIONE_VOCE) {
		DESC_DESCRIZIONE_VOCE = dESC_DESCRIZIONE_VOCE;
	}
	public String getTEXT_NEW_URL() {
		return TEXT_NEW_URL;
	}
	public void setTEXT_NEW_URL(String tEXT_NEW_URL) {
		TEXT_NEW_URL = tEXT_NEW_URL;
	}
	
	
}
