package it.almaviva.sie.web.form;

import it.almaviva.sie.business.model.DUtentiProfiliVO;

import java.util.ArrayList;
import java.util.List;

public class ProfiliForm extends BaseForm {
	private List<SelectItem> listProfili;
	private String codiProfilo;
	public ProfiliForm(){
		listProfili = new ArrayList<SelectItem>();	
	}

	public List<SelectItem> getListProfili() {
		return listProfili;
	}

	public void setListProfili(List<DUtentiProfiliVO> listProfili) {
		for (int i=0; i < listProfili.size(); i++)
		{
			SelectItem item = new SelectItem();
			item.setLabel(listProfili.get(i).getCodi_pk_profilo() + " - " + listProfili.get(i).getDesc_profilo());
			item.setValue(listProfili.get(i).getCodi_pk_profilo());
			this.listProfili.add(item);
		}
	}

	public String getCodiProfilo() {
		return codiProfilo;
	}

	public void setCodiProfilo(String codiProfilo) {
		this.codiProfilo = codiProfilo;
	}
	
}
