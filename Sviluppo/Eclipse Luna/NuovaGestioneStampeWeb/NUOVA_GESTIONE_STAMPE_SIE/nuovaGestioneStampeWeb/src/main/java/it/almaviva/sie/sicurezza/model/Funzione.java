package it.almaviva.sie.sicurezza.model;

import java.io.Serializable;

public class Funzione implements Serializable {

	private FunzioneSIE funzione;
	private LivelliAbilitazione livelliAbilitazione;

	public Funzione(String codice, String tipologia, String modalitaAccesso) {
		this.funzione = new FunzioneSIE(codice, tipologia, modalitaAccesso);
		this.livelliAbilitazione = new LivelliAbilitazione();
	}

	/**
	 * metodo che preleva il codice
	 * @return codice
	 */
	public String getCodice() {
		return funzione.getCodice();
	}

	/**
	 * metodo che preleva la modalità d'accesso
	 * @return modalitaAccesso
	 */
	public String getModalitaAccesso() {
		return funzione.getModalitaAccesso();
	}

	/**
	 * metodo che preleva la news
	 * @return news
	 */
	public String getNews() {
		return funzione.getFlagInvioNews();
	}

	/**
	 * metodo che preleva la tipologia
	 * @return tipologia
	 */
	public String getTipologia() {
		return funzione.getTipologia();
	}

	/**
	 * metodo che imposta la modalità d'accesso
	 * @param string
	 */
	public void setModalitaAccesso(String string) {
		funzione.setModalitaAccesso(string);
	}

	/**
	 * metodo che imposta la news
	 * @param short1
	 */
	public void setNews(String news) {
		funzione.setFlagInvioNews(news);
	}

	/**
	 * metodo che imposta la tipologia
	 * @param string
	 */
	public void setTipologia(String string) {
		funzione.setTipologia(string);
	}

	/**
	 * metodo che preleva la funzione padre
	 * @return funzionePadre
	 */
	public String getFunzionePadre() {
		return funzione.getFunzionePadre();
	}

	/**
	 * metodo che preleva il nome funzione
	 * @return nomeFunzione
	 */
	public String getNomeFunzione() {
		return funzione.getNomeFunzione();
	}

	/**
	 * metodo che preleva la posizione in elenco
	 * @return posizioneInElenco
	 */
	public String getPosizioneInElenco() {
		return funzione.getPosizioneInElenco();
	}

	/** 
	 * metodo che preleva la sezione
	 * @return sezione
	 */
	public String getSezione() {
		return funzione.getSezione();
	}

	/**
	 * metodo che preleva la sotto sezione
	 * @return sottosezione
	 */
	public String getSottosezione() {
		return funzione.getSottosezione();
	}

	/**
	 * metodo che imposta la funzione padre
	 * @param integer
	 */
	public void setFunzionePadre(String integer) {
		funzione.setFunzionePadre(integer);
	}

	/**
	 * metodo che imposta il nome della funzione
	 * @param string
	 */
	public void setNomeFunzione(String string) {
		funzione.setNomeFunzione(string);
	}

	/**
	 * metodo che imposta la posizione in elenco
	 * @param short1
	 */
	public void setPosizioneInElenco(String pos) {
		funzione.setPosizioneInElenco(pos);
	}

	/**
	 * metodo che imposta la sezione 
	 * @param short1
	 */
	public void setSezione(String sez) {
		funzione.setSezione(sez);
	}

	/**
	 * metodo che imposta la sotto sezione
	 * @param short1
	 */
	public void setSottosezione(String undersez) {
		funzione.setSottosezione(undersez);
	}

	/**
	 * 
	 * @param Type : descrizione del contenuto
	 * @return Type : descrizione del contenuto
	 * 
	 * @throws Exception (in ordine alfabetico)
	 * 
	 * @see
	 * 
	 */
	public void setCodice(String string) {
		funzione.setCodice(string);
	}

	public int hashCode() {
		return 0;
	}

	/**
	 * metodo che confronta 
	 */
	public boolean equals(Object obj) {
		//boolean isEqual = false;
		Funzione obj2 = null;

		if (obj instanceof Funzione) {
			obj2 = (Funzione) obj;
		} else {
			return false;
		}
		if ((obj2.getCodice().equals(this.getCodice()))
			&& (obj2.getTipologia().equals(this.getTipologia()))) {
			return true;
		} else {
			return false;
		}

	}
	/**
	 * @return
	 */
	public LivelliAbilitazione getLivelliAbilitazione() {
		return livelliAbilitazione;
	}

	/**
	 * @param abilitazione
	 */
	public void setLivelliAbilitazione(LivelliAbilitazione abilitazione) {
		livelliAbilitazione = abilitazione;
	}

}
