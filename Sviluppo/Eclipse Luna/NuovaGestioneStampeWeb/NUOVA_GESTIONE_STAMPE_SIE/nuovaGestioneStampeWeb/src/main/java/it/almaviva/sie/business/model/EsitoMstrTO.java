package it.almaviva.sie.business.model;

import java.io.Serializable;
import java.util.ArrayList;

public class EsitoMstrTO implements Serializable {
	/*
	 * esitoCorretto è true se l'operazione è andata a buon fine;
	 * false altrimenti
	 */
	private boolean esitoCorretto;
	
	private int		valore;
	private String  messaggio;
	
	private int		contatore;
	
//	Versione Non Accessibile della Stampa Mstr
	private String UrlApi = null;
//	Versione Accessibile della Stampa Mstr	
	private String UrlApiAcc = null;
//	ConnessioneMstrTO	
	private ConnessioneMstrTO connessioneMstrTO = null;	
//  Livello Organizzativo	
	private String livOrg = null;
	private String linkSession= null;
	private ArrayList resultSearch;
	
	
	
	



	public ArrayList getResultSearch() {
		return resultSearch;
	}

	public void setResultSearch(ArrayList resultSearch) {
		this.resultSearch = resultSearch;
	}

	public String getLinkSession() {
		return linkSession;
	}

	public void setLinkSession(String linkSession) {
		this.linkSession = linkSession;
	}

	/**
	 * @return
	 */
	public String getUrlApi() {
        // Ritorno l'UrlApi
		return UrlApi;
	}

	/**
	 * @param string
	 */
	public void setUrlApi(String string) {
		// Valorizzo l'UrlApi
		UrlApi = string;
	}

	/**
	 * @return
	 */
	public String getUrlApiAcc() {
        // Ritorno l'UrlApiAcc
		return UrlApiAcc;
	}

	/**
	 * @param string
	 */
	public void setUrlApiAcc(String string) {
        // Valorizzo l'UrlApiAcc
		UrlApiAcc = string;
	}

	/**
	 * @return
	 */
	public String getLivOrg() {
        // Ritorno il livOrg
		return livOrg;
	}

	/**
	 * @param string
	 */
	public void setLivOrg(String string) {
        // Valorizzo il livOrg
		livOrg = string;
	}

/**
 * @return
 */
public ConnessioneMstrTO getConnessioneMstrTO() {
	return connessioneMstrTO;
}

/**
 * @param mstrTO
 */
public void setConnessioneMstrTO(ConnessioneMstrTO mstrTO) {
	connessioneMstrTO = mstrTO;
}


	public EsitoMstrTO(boolean esitoCorretto, int valore, String messaggio, int contatore) {
		this.esitoCorretto=esitoCorretto;
		this.valore=valore;
		this.messaggio=messaggio;
		this.contatore=contatore;
	}
	public EsitoMstrTO(boolean esitoCorretto, int valore, String messaggio) {
		this.esitoCorretto=esitoCorretto;
		this.valore=valore;
		this.messaggio=messaggio;
	}
	public EsitoMstrTO(boolean esitoCorretto, int valore) {
		this.esitoCorretto=esitoCorretto;
		this.valore=valore;
		this.messaggio=null;
	}
	public EsitoMstrTO(boolean esitoCorretto) {
		this.esitoCorretto=esitoCorretto;
		this.valore=0;
		this.messaggio=null;
	}	

	/**
	 * @return
	 */
	public boolean isEsitoCorretto() {
		return esitoCorretto;
	}

	/**
	 * metodo che preleva il mssaggio
	 * @return messaggio
	 */
	public String getMessaggio() {
		return messaggio;
	}

	/**
	 * metodo che preleva il valore
	 * @return valore
	 */
	public int getValore() {
		return valore;
	}

	/**
	 * metodo che preleva l'esito  
	 * @param b
	 */
	public void setEsitoCorretto(boolean b) {
		esitoCorretto = b;
	}

	/**
	 * @param string
	 */
	public void setMessaggio(String string) {
		messaggio = string;
	}

	/**
	 * metodo che imposta il valore
	 * @param i
	 */
	public void setValore(int i) {
		valore = i;
	}
   
	/**
	 * @return
	 */
	public int getContatore() {
		return contatore;
	}

	/**
	 * @param i
	 */
	public void setContatore(int i) {
		contatore = i;
	}

}
