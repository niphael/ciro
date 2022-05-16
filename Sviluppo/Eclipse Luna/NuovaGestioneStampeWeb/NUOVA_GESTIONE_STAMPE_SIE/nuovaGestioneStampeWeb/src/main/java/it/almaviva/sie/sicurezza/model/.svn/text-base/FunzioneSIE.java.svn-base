package it.almaviva.sie.sicurezza.model;

import java.io.Serializable;

import org.apache.log4j.Logger;

public class FunzioneSIE implements Serializable {
	private String  codiceFunzione;
	private String  flagTipoElab;
	private String  flagCodAccesso;
	private String  descrSezione;
	private String  descrSottosezione;
	private String  descrFunzione;
	private String  codiceFunzPadre;
	private String  modalitaAccesso;
		
	private String flagTipoLogin;
	private String flagRaggrupp;
	private String flagInvioNews;
	private String codicePosElenco;
	private String flagFunzAtt;
	
	private Logger logger;	
	
	/**
	 * costruttore di FunzioneSIE
	 * @param string: codice della funzione
	 * @param string: tipologia della funzione - 'L' online 
	 * @param string: modalità accesso della funzione
	 */

	public FunzioneSIE(String codice, String tipologia, String modalitaAccesso) {
		this.codiceFunzione = codice;
		this.flagTipoElab = tipologia;
		this.modalitaAccesso = modalitaAccesso;

	}	
	
	/**
	 * costruttore di FunzioneSIE
	 * @param string: codice della funzione
	 * @param string: descrizione della funzione
	 * @param string: flag che indica se la funzione è attiva  
	 * @param string: flag che indica se la funzione invia news 
	 */
	public FunzioneSIE(String codice, String nome, String flagAttivazione, String flagInvioNews) {
		this.codiceFunzione=codice;
		this.descrFunzione=nome;
		this.flagFunzAtt=flagAttivazione;
		this.flagInvioNews=flagInvioNews;
	}
	public FunzioneSIE() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * metodo che preleva il codice
	 * @return codice
	 */
	public String getCodice() {
		return codiceFunzione;
	}

	/**
	 * metodo che preleva la modalità d'accesso
	 * @return modalitaAccesso
	 */
	public String getModalitaAccesso() {
		return modalitaAccesso;
	}
	/**
	 * metodo che preleva il flag attivazione
	 * @return flag attivazione
	 */
	public String getFlagAttivazione() {
		return flagFunzAtt;
	}
	/**
	 * metodo che preleva la modalità d'accesso
	 * @return modalitaAccesso
	 */
	public String getFlagInvioNews() {
		return flagInvioNews;
	}
	/**
	 * metodo che preleva il flagTipoLogin
	 * @return codiceSottosezione: codice della sottosezione
	 */
	public String getTipologia() {
		return flagTipoLogin;
	}	
	/**
	 * metodo che preleva la funzione padre
	 * @return modalitaAccesso
	 */
	public String getFunzionePadre() {
		return codiceFunzPadre;
	}
	/**
	 * metodo che preleva il nome funzione
	 * @return nomeFunzione
	 */
	public String getNomeFunzione() {
		return descrFunzione;
	}


	public String getPosizioneInElenco() {
		return codicePosElenco;
	}

	/** 
	 * metodo che preleva la sezione
	 * @return sezione
	 */
	public String getSezione() {
		return descrSezione;
	}

	/**
	 * metodo che preleva la sotto sezione
	 * @return sottosezione
	 */
	public String getSottosezione() {
		return descrSottosezione;
	}

	/**
	 * metodo che imposta la modalità d'accesso
	 * @param string
	 */
	public void setModalitaAccesso(String string) {
		modalitaAccesso = string;
	}


	/**
	 * metodo che setta il flag attivazione
	 * @return flag attivazione
	 */
	public void setFlagAttivazione(String flag) {
		flagFunzAtt = flag;
	}
	/**
	 * metodo che setta il flag attivazione
	 * @return flag attivazione
	 */
	public void setFlagInvioNews(String flag) {
		flagInvioNews = flag;
	}
	/**
	 * metodo che imposta il flag tipo login della funzione
	 * @param string: descrizione della funzione
	 */
	public void setTipologia(String string) {
		flagTipoElab = string;
	}
	/**
	 * metodo che preleva la funzione padre
	 * @return modalitaAccesso
	 */
	public void setFunzionePadre(String padre) {
		codiceFunzPadre = padre;
	}

	/**
	 * metodo che imposta il nome della funzione
	 * @param string
	 */
	public void setNomeFunzione(String string) {
		descrFunzione = string;
	}

	/**
	 * metodo che imposta la posizione in elenco
	 * @param short1
	 */
	public void setPosizioneInElenco(String pos) {
		codicePosElenco = pos;
	}

	/**
	 * metodo che imposta la sezione 
	 * @param short1
	 */
	public void setSezione(String sez) {
		descrSezione = sez;
	}

	/**
	 * metodo che imposta la sotto sezione
	 * @param short1
	 */
	public void setSottosezione(String underSez) {
		descrSottosezione = underSez;
	}
	/**
	 * 
	 *	metodo che imposta il codice della funzione
	 * 
	 * @see
	 * 
	 */
	public void setCodice(String string) {
		codiceFunzione = string;
	}

	
	
	protected void getLogger(String ObjClass)
	{
		logger = Logger.getLogger(ObjClass);
	}
}
