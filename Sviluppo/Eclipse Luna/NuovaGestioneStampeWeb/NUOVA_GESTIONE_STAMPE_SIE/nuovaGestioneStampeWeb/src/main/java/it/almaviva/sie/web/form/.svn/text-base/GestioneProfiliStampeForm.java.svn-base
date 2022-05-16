/**
 * 
 */
package it.almaviva.sie.web.form;

import it.almaviva.sie.business.model.DAnagraficheStampeVO;
import it.almaviva.sie.business.model.DProfiloVO;
import it.almaviva.sie.business.model.DUtentiProfiliVO;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Teresa
 *
 */
public class GestioneProfiliStampeForm extends BaseForm {
	private List<SelectItem> listProfiliDa;
	private List<SelectItem> listProfiliA;
	private String codiProfiloDa;
	private String codiProfiloA;
/*	// Livello Organizzativo Profilo
	private String livelloOrganizzativo="Nessuno";
	  // Codice Ragioneria Profilo
		private String codiceRagioneria;
	    // Descrizione Ragioneria Profilo
		private String descrizioneRagioneria;
	    // Codice UCB Profilo
		private String codiceUCB;
	    // Descrizione UCB Profilo
		private String descrizioneUCB;
	// Stampa
	private String flagStampa="Nessuno";
	// Codice Stampa
	private String codiceStampa;
	// Descrizione Stampa
	private String descrizioneStampa;
	private List<SelectItem> listPath;
	private String codicePath;
	*/
	public GestioneProfiliStampeForm(){
		listProfiliDa = new ArrayList<SelectItem>();	
		listProfiliA = new ArrayList<SelectItem>();	
	}
	
	
	public List<SelectItem> getListProfiliDa() {
		return listProfiliDa;
	}
	
	
	public void setListProfiliDa(List<DProfiloVO> listProfiliDa) {
		for (int i=0; i < listProfiliDa.size(); i++)
		{
			SelectItem item = new SelectItem();
			item.setLabel(listProfiliDa.get(i).getCodi_pk_profilo() + " - " + listProfiliDa.get(i).getDesc_profilo());
			item.setValue(listProfiliDa.get(i).getCodi_pk_profilo());
			this.listProfiliDa.add(item);
		}
	}
	
	public List<SelectItem> getListProfiliA() {
		return listProfiliA;
	}
	public void setListProfiliA(List<DProfiloVO> listProfiliA) {
		for (int i=0; i < listProfiliA.size(); i++)
		{
			SelectItem item = new SelectItem();
			item.setLabel(listProfiliA.get(i).getCodi_pk_profilo() + " - " + listProfiliA.get(i).getDesc_profilo());
			item.setValue(listProfiliA.get(i).getCodi_pk_profilo());
			this.listProfiliA.add(item);
		}
	}
	public String getCodiProfiloDa() {
		return codiProfiloDa;
	}
	public void setCodiProfiloDa(String codiProfiloDa) {
		this.codiProfiloDa = codiProfiloDa;
	}
	public String getCodiProfiloA() {
		return codiProfiloA;
	}
	public void setCodiProfiloA(String codiProfiloA) {
		this.codiProfiloA = codiProfiloA;
	}

	
}
