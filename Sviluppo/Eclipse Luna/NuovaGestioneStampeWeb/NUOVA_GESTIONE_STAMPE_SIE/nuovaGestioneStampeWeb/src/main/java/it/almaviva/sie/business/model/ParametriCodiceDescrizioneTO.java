/**
 * 
 */
package it.almaviva.sie.business.model;

import java.io.Serializable;

/**
 * @author Teresa
 *
 */
public class ParametriCodiceDescrizioneTO implements Serializable {
	private String codice = null;
	private String descrizione = null;
	private String tipologiaRicerca=null;
	public String getCodice() {
		return codice;
	}
	public void setCodice(String codice) {
		this.codice = codice;
	}
	public String getDescrizione() {
		return descrizione;
	}
	public void setDescrizione(String descrizione) {
		this.descrizione = descrizione;
	}
	public String getTipologiaRicerca() {
		return tipologiaRicerca;
	}
	public void setTipologiaRicerca(String tipologiaRicerca) {
		this.tipologiaRicerca = tipologiaRicerca;
	}
	
	
	
	
}
