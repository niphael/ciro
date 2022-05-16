/**
 * 
 */
package it.almaviva.sie.web.form;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Teresa
 *
 */
public class ModificaProfiloStampaForm extends BaseForm {
	// Codice Profilo Stampe
		private String codiceProfilo;
		// Descrizione Profilo Stampe
		private String descrizioneProfilo;
		// Lista Stampe Associate
		private List listaStampe = null;
	  
		
		
	
		public String getCodiceProfilo() {
			return codiceProfilo;
		}

		public void setCodiceProfilo(String codiceProfilo) {
			this.codiceProfilo = codiceProfilo;
		}

		public String getDescrizioneProfilo() {
			return descrizioneProfilo;
		}

		public void setDescrizioneProfilo(String descrizioneProfilo) {
			this.descrizioneProfilo = descrizioneProfilo;
		}

		public List getListaStampe() {
			return listaStampe;
		}

		public void setListaStampe(List listaStampe) {
			this.listaStampe = listaStampe;
		}

	

	
}
