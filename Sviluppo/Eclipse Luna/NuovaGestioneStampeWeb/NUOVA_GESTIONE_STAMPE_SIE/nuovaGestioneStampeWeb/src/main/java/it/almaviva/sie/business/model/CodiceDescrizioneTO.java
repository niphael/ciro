/**
 * 
 */
package it.almaviva.sie.business.model;

import java.io.Serializable;

/**
 * @author Teresa
 *
 */
public class CodiceDescrizioneTO implements Serializable{
	private String codice;
	private String descrizione;
	private String path;
	private String descrizioneObject;
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
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public String getDescrizioneObject() {
		return descrizioneObject;
	}
	public void setDescrizioneObject(String descrizioneObject) {
		this.descrizioneObject = descrizioneObject;
	}


}
