/**
 * 
 */
package it.almaviva.sie.web.form;

/**
 * @author Teresa
 *
 */
public class InserisciStampaForm extends BaseForm {
	// Codice Profilo Stampe
	private String codiceProfilo;
	// Descrizione Profilo Stampe
	private String descrizioneProfilo;
	// Indica la Lista delle Stampe da inserire
	private String[] indexSelezionati;
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
	public String[] getIndexSelezionati() {
		return indexSelezionati;
	}
	public void setIndexSelezionati(String[] indexSelezionati) {
		this.indexSelezionati = indexSelezionati;
	}
	
	
}
