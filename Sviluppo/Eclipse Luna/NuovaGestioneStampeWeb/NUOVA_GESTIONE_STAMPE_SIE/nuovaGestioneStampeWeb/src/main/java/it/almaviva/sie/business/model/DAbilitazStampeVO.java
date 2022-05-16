/**
 * 
 */
package it.almaviva.sie.business.model;

import java.io.Serializable;

/**
 * @author Teresa
 *
 */
public class DAbilitazStampeVO  implements Serializable{
	private String CODI_PK_PROFILO;
	private String CODI_PK_OBJECT_ID;
	private String ROW_CREATED_DTTM;
	private String ROW_CREATED_USER_APP;
	private Integer VERSIONE;
	private String ROW_CODI_FUNZIONE;
	private String 	ROW_UPDATED_USER_APP;
	private String ROW_TIPO_ELABORAZIONE;
	
	
	
	public String getROW_CREATED_DTTM() {
		return ROW_CREATED_DTTM;
	}
	public void setROW_CREATED_DTTM(String rOW_CREATED_DTTM) {
		ROW_CREATED_DTTM = rOW_CREATED_DTTM;
	}
	public String getROW_CREATED_USER_APP() {
		return ROW_CREATED_USER_APP;
	}
	public void setROW_CREATED_USER_APP(String rOW_CREATED_USER_APP) {
		ROW_CREATED_USER_APP = rOW_CREATED_USER_APP;
	}
	public Integer getVERSIONE() {
		return VERSIONE;
	}
	public void setVERSIONE(Integer vERSIONE) {
		VERSIONE = vERSIONE;
	}
	public String getROW_CODI_FUNZIONE() {
		return ROW_CODI_FUNZIONE;
	}
	public void setROW_CODI_FUNZIONE(String rOW_CODI_FUNZIONE) {
		ROW_CODI_FUNZIONE = rOW_CODI_FUNZIONE;
	}
	public String getROW_UPDATED_USER_APP() {
		return ROW_UPDATED_USER_APP;
	}
	public void setROW_UPDATED_USER_APP(String rOW_UPDATED_USER_APP) {
		ROW_UPDATED_USER_APP = rOW_UPDATED_USER_APP;
	}
	public String getROW_TIPO_ELABORAZIONE() {
		return ROW_TIPO_ELABORAZIONE;
	}
	public void setROW_TIPO_ELABORAZIONE(String rOW_TIPO_ELABORAZIONE) {
		ROW_TIPO_ELABORAZIONE = rOW_TIPO_ELABORAZIONE;
	}
	public String getCODI_PK_PROFILO() {
		return CODI_PK_PROFILO;
	}
	public void setCODI_PK_PROFILO(String cODI_PK_PROFILO) {
		CODI_PK_PROFILO = cODI_PK_PROFILO;
	}
	public String getCODI_PK_OBJECT_ID() {
		return CODI_PK_OBJECT_ID;
	}
	public void setCODI_PK_OBJECT_ID(String cODI_PK_OBJECT_ID) {
		CODI_PK_OBJECT_ID = cODI_PK_OBJECT_ID;
	}

}
