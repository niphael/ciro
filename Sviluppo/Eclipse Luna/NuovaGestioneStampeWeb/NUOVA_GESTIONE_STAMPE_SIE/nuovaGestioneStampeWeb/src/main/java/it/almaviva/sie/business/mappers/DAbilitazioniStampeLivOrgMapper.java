package it.almaviva.sie.business.mappers;

import it.almaviva.sie.business.model.DAbilitazStampeLivOrgVO;

import org.apache.ibatis.annotations.Select;

public interface DAbilitazioniStampeLivOrgMapper {
	@Select
	 ("select CODI_PK_PROFILO,CODI_LIVELLO_ORG,CODI_RAGIONERIA"
		 		+ " from D_ABILITAZ_STAMPE_LIV_ORG where CODI_PK_PROFILO = #{codiProfilo} "
		 		+ "group by CODI_PK_PROFILO,CODI_LIVELLO_ORG,CODI_RAGIONERIA")
	public DAbilitazStampeLivOrgVO getLivelloOrganizzativo(String codiProfilo);
}
