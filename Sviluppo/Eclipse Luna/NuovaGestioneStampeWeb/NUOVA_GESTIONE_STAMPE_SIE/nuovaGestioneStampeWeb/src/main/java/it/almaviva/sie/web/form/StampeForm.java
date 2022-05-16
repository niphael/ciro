/**
 * 
 */
package it.almaviva.sie.web.form;

import it.almaviva.sie.business.model.DAnagraficheStampeVO;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Teresa
 *
 */
public class StampeForm extends BaseForm {
	private List<SelectItem> listaStampe;
	private String path;
	private String codiStampa;
	private String descStampa;
	private String formato;
	private List cancellazioneStampe ;
	
	public StampeForm(){
		listaStampe = new ArrayList<SelectItem>();	
	}
	
	public List<SelectItem> getListaStampe() {
		return listaStampe;
	}
	public void setListaStampe(List<DAnagraficheStampeVO> listaStampe) {
		SelectItem item = new SelectItem();
		item.setLabel("--" );
		item.setValue("");
		this.listaStampe.add(item);
		for (int i=0; i < listaStampe.size(); i++)
		{
			item = new SelectItem();
			item.setLabel(listaStampe.get(i).getObject_path() );
			item.setValue(listaStampe.get(i).getObject_path());
			this.listaStampe.add(item);
		}
	
	}
	public String getCodiStampa() {
		return codiStampa;
	}
	public void setCodiStampa(String codiStampa) {
		this.codiStampa = codiStampa;
	}

	public String getDescStampa() {
		return descStampa;
	}

	public void setDescStampa(String descStampa) {
		this.descStampa = descStampa;
	}

	public String getFormato() {
		return formato;
	}

	public void setFormato(String formato) {
		this.formato = formato;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public List getCancellazioneStampe() {
		return cancellazioneStampe;
	}

	public void setCancellazioneStampe(List cancellazioneStampe) {
		this.cancellazioneStampe = cancellazioneStampe;
	}


}
