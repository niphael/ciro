package it.almaviva.sie.business.mappers;

import it.almaviva.sie.business.model.DAnagraficaVociMenuVO;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Select;

public interface DVociMenuMapper {
	@Select
	("select distinct c.CODI_PK_VOCE_MENU,C.DESC_DESCRIZIONE_VOCE, C.TEXT_NEW_URL "
			+ "from D_ANAGRAFICA_FUNZIONI_ON a,  D_ABILITAZIONE_FUNZIONI  b, d_anagrafica_voci_menu c, d_assoc_voci_funzioni d, d_utente_profili_t e"
			+ " where a.CODI_PK_FUNZIONE=b.CODI_PK_FUNZIONE "
			+ "and A.CODI_PK_FUNZIONE=D.CODI_PK_FUNZIONE and C.CODI_PK_VOCE_MENU=D.CODI_PK_VOCE_MENU and B.CODI_PK_PROFILO=E.CODI_PK_PROFILO"
			+ " and E.CODI_PK_UTENTE=#{username}"
			+ "and TEXT_NEW_URL is not null")
	public ArrayList<DAnagraficaVociMenuVO> getListaVociMenu(String username);
}
