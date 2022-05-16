package it.almaviva.sie.business.model;

import java.io.Serializable;

public class DAnagraficheStampeVO implements Serializable,Comparable{
	private String text_object_name;
	private String desc_object_desc;
	private String codi_pk_object_id;
	private Integer codi_object_type;
	private String object_path;
	private String codi_profilo;
	private String text_url_api;
	private String flag_stampa_attiva;
	private String ROW_CREATED_USER_APP;
	private Integer NUME_POSIZIONE_ELENCO;
	private String ROW_CODI_FUNZIONE;
	private String selected;
	
	
	/**
	 * Metodo che verifica se due stampe 
	 * sono uguali  
	 * 
	 * @param o
	 */
	public boolean equals(Object o) {
		if (o == null || o instanceof DAnagraficheStampeVO) {
			DAnagraficheStampeVO s = (DAnagraficheStampeVO)o;
			// Controllo che entrambi i codici siano uguali
			return this.getText_object_name().equals(s.getText_object_name()) && this.desc_object_desc.equals(s.getDesc_object_desc());
		} else
			return false;
	}
	
	public String getSelected() {
		return selected;
	}
	public void setSelected(String selected) {
		this.selected = selected;
	}
	public Integer getCodi_object_type() {
		return codi_object_type;
	}
	public void setCodi_object_type(Integer codi_object_type) {
		this.codi_object_type = codi_object_type;
	}
	public String getROW_CREATED_USER_APP() {
		return ROW_CREATED_USER_APP;
	}
	public void setROW_CREATED_USER_APP(String rOW_CREATED_USER_APP) {
		ROW_CREATED_USER_APP = rOW_CREATED_USER_APP;
	}
	public Integer getNUME_POSIZIONE_ELENCO() {
		return NUME_POSIZIONE_ELENCO;
	}
	public void setNUME_POSIZIONE_ELENCO(Integer nUME_POSIZIONE_ELENCO) {
		NUME_POSIZIONE_ELENCO = nUME_POSIZIONE_ELENCO;
	}
	public String getROW_CODI_FUNZIONE() {
		return ROW_CODI_FUNZIONE;
	}
	public void setROW_CODI_FUNZIONE(String rOW_CODI_FUNZIONE) {
		ROW_CODI_FUNZIONE = rOW_CODI_FUNZIONE;
	}
	public String getText_object_name() {
		return text_object_name;
	}
	public void setText_object_name(String text_object_name) {
		this.text_object_name = text_object_name;
	}
	public String getCodi_pk_object_id() {
		return codi_pk_object_id;
	}
	public void setCodi_pk_object_id(String codi_pk_object_id) {
		this.codi_pk_object_id = codi_pk_object_id;
	}
	public String getObject_path() {
		return object_path;
	}
	public void setObject_path(String object_path) {
		this.object_path = object_path;
	}
	public String getCodi_profilo() {
		return codi_profilo;
	}
	public void setCodi_profilo(String codi_profilo) {
		this.codi_profilo = codi_profilo;
	}
	public String getDesc_object_desc() {
		return desc_object_desc;
	}
	public void setDesc_object_desc(String desc_object_desc) {
		this.desc_object_desc = desc_object_desc;
	}

	public String getText_url_api() {
		return text_url_api;
	}
	public void setText_url_api(String text_url_api) {
		this.text_url_api = text_url_api;
	}
	
	public String getFlag_stampa_attiva() {
		return flag_stampa_attiva;
	}
	public void setFlag_stampa_attiva(String flag_stampa_attiva) {
		this.flag_stampa_attiva = flag_stampa_attiva;
	}



	public int hashCode(){
		if(text_object_name!=null && desc_object_desc!=null)
		return text_object_name.hashCode() + 31*(desc_object_desc.hashCode());
		else
			return 0;
		
	
	}

	@Override
	public int compareTo(Object o) {
		DAnagraficheStampeVO fiVO = (DAnagraficheStampeVO)o;
		if(this.text_object_name == null )
		{
			return -1;
		}
		else if(fiVO.getText_object_name() == null )
		{
			return 1;
		}
		else
		{
			return (this.text_object_name).compareTo( fiVO.getText_object_name() );
		}
		
	}
}
