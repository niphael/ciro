package it.almaviva.sie.business.model;

import java.io.Serializable;

public class DProfiloVO extends BaseVO implements Serializable{

	private String codi_pk_profilo;
    private String desc_profilo;
    private String codi_livello_org;
    private String codi_ragioneria;
    
    
	public String getCodi_pk_profilo() {
		return codi_pk_profilo;
	}
	public void setCodi_pk_profilo(String codi_pk_profilo) {
		this.codi_pk_profilo = codi_pk_profilo;
	}
	public String getDesc_profilo() {
		return desc_profilo;
	}
	public void setDesc_profilo(String desc_profilo) {
		this.desc_profilo = desc_profilo;
	}
	public String getCodi_livello_org() {
		return codi_livello_org;
	}
	public void setCodi_livello_org(String codi_livello_org) {
		this.codi_livello_org = codi_livello_org;
	}
	public String getCodi_ragioneria() {
		return codi_ragioneria;
	}
	public void setCodi_ragioneria(String codi_ragioneria) {
		this.codi_ragioneria = codi_ragioneria;
	}

    
}
