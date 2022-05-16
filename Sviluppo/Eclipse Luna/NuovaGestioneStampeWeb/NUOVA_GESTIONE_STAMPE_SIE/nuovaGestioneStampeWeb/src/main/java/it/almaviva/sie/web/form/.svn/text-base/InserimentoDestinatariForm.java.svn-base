/**
 * 
 */
package it.almaviva.sie.web.form;

import it.almaviva.sie.business.model.CodiceDescrizioneTO;
import it.almaviva.sie.business.model.DProfiloVO;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Teresa
 *
 */
public class InserimentoDestinatariForm extends BaseForm {
	private String nome;
	private String email;
	private String amministrazione;
	private String periodicita;
	private List<SelectItem> listaPeriodicita;
	private String oggetto;
	private String testo;
	private String note;
	
	
	public InserimentoDestinatariForm(){
		listaPeriodicita = new ArrayList<SelectItem>();	
		
	}
	
	
	public String getNome() {
		return nome;
	}


	public void setNome(String nome) {
		this.nome = nome;
	}


	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getAmministrazione() {
		return amministrazione;
	}
	public void setAmministrazione(String amministrazione) {
		this.amministrazione = amministrazione;
	}
	
	public String getPeriodicita() {
		return periodicita;
	}
	public void setPeriodicita(String periodicita) {
		this.periodicita = periodicita;
	}
	public List<SelectItem> getListaPeriodicita() {
		return listaPeriodicita;
	}
	public void setListaPeriodicita(List<CodiceDescrizioneTO> listaPeriodicita) {
		for (int i=0; i < listaPeriodicita.size(); i++)
		{
			SelectItem item = new SelectItem();
			item.setLabel(listaPeriodicita.get(i).getDescrizione());
			item.setValue(listaPeriodicita.get(i).getCodice());
			this.listaPeriodicita.add(item);
		}
	}
	public String getOggetto() {
		return oggetto;
	}
	public void setOggetto(String oggetto) {
		this.oggetto = oggetto;
	}
	public String getTesto() {
		return testo;
	}
	public void setTesto(String testo) {
		this.testo = testo;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	
	

}
