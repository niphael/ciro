/**
 * 
 */
package it.almaviva.sie.business.model;

import it.almaviva.sie.sicurezza.model.DatiControllatiTO;
import it.almaviva.sie.sicurezza.model.DatoControllato;
import it.almaviva.sie.sicurezza.model.Funzione;

import java.io.Serializable;

/**
 * @author Teresa
 *
 */
public class VisualizzaStampaTO implements Serializable {
	//Codice del Profilo Stampe
		private String codiceProfiloStampa = null;
		//Codice della Stampa
		private String codiceStampa = null;
		//Modalita della Stampa
		private String modalita = null; 
		private String nomeStampa = null;
		private String descStampa = null;
		//Connessione MicroStrategy
		private ConnessioneMstrTO connessioneMstrTO = null;
		private String codiceFunzioneInExe;
		private String modalitaAccesso;
		private Funzione funzioneInExe;
		private String userID;
		
		
		

		
		
		public String getNomeStampa() {
			return nomeStampa;
		}

		public void setNomeStampa(String nomeStampa) {
			this.nomeStampa = nomeStampa;
		}

		public String getDescStampa() {
			return descStampa;
		}

		public void setDescStampa(String descStampa) {
			this.descStampa = descStampa;
		}

		public String getUserID() {
			return userID;
		}

		public void setUserID(String userID) {
			this.userID = userID;
		}

		public Funzione getFunzioneInExe() {
			return funzioneInExe;
		}

		public void setFunzioneInExe(Funzione funzioneInExe) {
			this.funzioneInExe = funzioneInExe;
		}

		public String getCodiceFunzioneInExe() {
			return codiceFunzioneInExe;
		}

		public void setCodiceFunzioneInExe(String codiceFunzioneInExe) {
			this.codiceFunzioneInExe = codiceFunzioneInExe;
		}

		public String getModalitaAccesso() {
			return modalitaAccesso;
		}

		public void setModalitaAccesso(String modalitaAccesso) {
			this.modalitaAccesso = modalitaAccesso;
		}

		/**
		 * Metodo che ritorna il codice del 
		 * profilo di stampe  
		 * 
		 * @return
		 */
		public String getCodiceProfiloStampa() {
	        // Ritorno il codice profilo stampe
			return codiceProfiloStampa;
		}

		/**
		 * Metodo che ritorna il codice 
		 * identificativo della stampa
		 * 
		 * @return
		 */
		public String getCodiceStampa() {
	        // Ritorno il codice della Stampa
			return codiceStampa;
		}

		/**
		 * Metodo che ritorna la modalita 
		 * della stampa
		 * 
		 * @return
		 */
		public String getModalita() {
	        // Ritorno la modalita
			return modalita;
		}

		/**
		 * Metodo che imposta il codice del 
		 * profilo di stampe
		 * 
		 * @param string
		 */
		public void setCodiceProfiloStampa(String string) {
	        // Valorizzo il codice profilo Stampe
			codiceProfiloStampa = string;
		}

		/**
		 * Metodo che imposta il codice 
		 * identificativo della stampa
		 * 
		 * @param string
		 */
		public void setCodiceStampa(String string) {
	        // Valorizzo il codice della Stampa
			codiceStampa = string;
		}

		/**
		 * Metodo che imposta la modalita 
		 * della stampa
		 * 
		 * @param string
		 */
		public void setModalita(String string) {
	        // Valorizzo la modalita
			modalita = string;
		}
		
		/**
		 * Metodo che ritorna un nuovo To con codice 
		 * identificativo della stampa e codice profilo 
		 * di stampe
		 * 
		 * @param funzione
		 */
		public DatiControllatiTO getDatiControllati(String funzione){
		
			DatiControllatiTO datiControllati = new DatiControllatiTO();
			datiControllati.setCodiceStampa(new DatoControllato(this.codiceStampa.toUpperCase(),0));
			datiControllati.setCodiceProfiloStampa(new DatoControllato(this.codiceProfiloStampa.toUpperCase(),0));
			return datiControllati;
		}
		
		/**
		 * Metodo che ritorna un nuovo To con codice 
		 * identificativo della stampa e codice profilo 
		 * di stampe
		 * 
		 * @param funzione
		 */
		public DatiControllatiTO getDatiControllatiProspetto(String funzione){
		
			DatiControllatiTO datiControllati = new DatiControllatiTO();
			datiControllati.setCodiceStampa(new DatoControllato(this.codiceStampa.toUpperCase(),0));
			//datiControllati.setCodiceProfiloStampa(new DatoControllato(this.codiceProfiloStampa.toUpperCase(),Costanti.CONTROLLO_FORTE_O_DEBOLE));
			return datiControllati;
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
}
