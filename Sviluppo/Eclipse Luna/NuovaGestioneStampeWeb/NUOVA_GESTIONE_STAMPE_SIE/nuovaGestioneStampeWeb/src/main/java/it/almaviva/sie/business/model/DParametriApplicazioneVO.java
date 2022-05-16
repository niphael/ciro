/**
 * 
 */
package it.almaviva.sie.business.model;

import java.io.Serializable;

/**
 * @author Teresa
 *
 */
public class DParametriApplicazioneVO implements Serializable {

	private String codi_pk_parametro;
	private String text_valore_parametro;
	private String text_descrizione;
	public String getCodi_pk_parametro() {
		return codi_pk_parametro;
	}
	public void setCodi_pk_parametro(String codi_pk_parametro) {
		this.codi_pk_parametro = codi_pk_parametro;
	}
	public String getText_valore_parametro() {
		return text_valore_parametro;
	}
	public void setText_valore_parametro(String text_valore_parametro) {
		this.text_valore_parametro = text_valore_parametro;
	}
	public String getText_descrizione() {
		return text_descrizione;
	}
	public void setText_descrizione(String text_descrizione) {
		this.text_descrizione = text_descrizione;
	}
	
	
}
