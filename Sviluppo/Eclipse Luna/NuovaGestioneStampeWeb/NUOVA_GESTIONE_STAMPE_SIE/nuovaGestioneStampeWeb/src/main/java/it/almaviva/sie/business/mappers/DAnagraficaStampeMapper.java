package it.almaviva.sie.business.mappers;

import it.almaviva.sie.business.model.DAnagraficheStampeVO;
import it.almaviva.sie.business.model.DCronologicoOnlineModVO;
import it.almaviva.sie.business.provider.BuilderSelectProvider;

import java.sql.SQLException;
import java.util.ArrayList;







import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectProvider;
import org.apache.ibatis.annotations.Update;

public interface DAnagraficaStampeMapper {
	
	@Select
	 ("SELECT DISTINCT A.OBJECT_PATH FROM   D_ANAGRAFICA_STAMPE A, D_ABILITAZ_STAMPE B"
		 		+ " WHERE   A.CODI_PK_OBJECT_ID = B.CODI_PK_OBJECT_ID AND B.CODI_PK_PROFILO  = #{codiProfilo} "
		 		+ "ORDER BY   A.OBJECT_PATH ASC")
	 public ArrayList<DAnagraficheStampeVO> getStampeForProfilo(String codiProfilo);
	 
	 @SelectProvider(type = BuilderSelectProvider.class, method = "builderQueryStampeForRicerca")
	 public ArrayList<DAnagraficheStampeVO> getListaStampe(DAnagraficheStampeVO vo);
	 
	 @SelectProvider(type = BuilderSelectProvider.class, method = "builderQueryStampeForRicercaNew")
	 public ArrayList<DAnagraficheStampeVO> getListaStampeNew(DAnagraficheStampeVO vo);
	 
	 @SelectProvider(type = BuilderSelectProvider.class, method = "builderQueryTitoliReport")
	 public ArrayList<DAnagraficheStampeVO> getListaTitoliReport(DAnagraficheStampeVO vo);
	 
	@Select
	("SELECT CODI_PK_OBJECT_ID,CODI_OBJECT_TYPE,TEXT_OBJECT_NAME,"
			 		+ "DESC_OBJECT_DESC,TEXT_URL_API,NUME_POSIZIONE_ELENCO,FLAG_STAMPA_ATTIVA,OBJECT_PATH FROM D_ANAGRAFICA_STAMPE "
			 		+ "WHERE CODI_PK_OBJECT_ID = #{codiId}")
	public DAnagraficheStampeVO getStampa(String codiId);
	
	@Select
	("Select CODI_PK_OBJECT_ID, TEXT_OBJECT_NAME, DESC_OBJECT_DESC, FLAG_STAMPA_ATTIVA, OBJECT_PATH from D_ANAGRAFICA_STAMPE")
	 public ArrayList<DAnagraficheStampeVO> getListaStampeTotale();
	
	 @SelectProvider(type = BuilderSelectProvider.class, method = "builderInsertDAnagraficaStampe")
	 public void insertDAnagraficaStampe(DAnagraficheStampeVO vo);
	 
	 
	 @Select
	 ("UPDATE D_ANAGRAFICA_STAMPE SET FLAG_STAMPA_ATTIVA = 0 WHERE CODI_PK_OBJECT_ID =  #{id} ")
	 public void updateFlagStampaNoAttiva(String id);
		
	 @Select
	 ("SELECT DISTINCT OBJECT_PATH FROM D_ANAGRAFICA_STAMPE ORDER BY OBJECT_PATH ASC")
	 public ArrayList<DAnagraficheStampeVO> getListaPercorsi();	
	 
	 
		@Select
		 ("SELECT a.TEXT_OBJECT_NAME, a.CODI_PK_OBJECT_ID, a.OBJECT_PATH,a.DESC_OBJECT_DESC from  D_ANAGRAFICA_STAMPE a, D_ABILITAZ_STAMPE b where"
			 		+ " b.CODI_PK_OBJECT_ID=a.CODI_PK_OBJECT_ID and a.FLAG_STAMPA_ATTIVA = 1 and  b.CODI_PK_PROFILO= #{codiProfilo} "
			 		+ " ORDER BY a.OBJECT_PATH, a.TEXT_OBJECT_NAME ")
		 public ArrayList<DAnagraficheStampeVO> getStampeProfiloForModifica(String codiProfilo);
		
		 @SelectProvider(type = BuilderSelectProvider.class, method = "builderQueryRicercaStampeForModifica")
		 public ArrayList<DAnagraficheStampeVO> ricercaStampeForModifica(DAnagraficheStampeVO vo);
		 
		 @SelectProvider(type = BuilderSelectProvider.class, method = "builderQueryRicercaStampeDaAttivare")
		 public ArrayList<DAnagraficheStampeVO> getListaStampeDaAttivare(DAnagraficheStampeVO vo);
		 
		 @Update
		 ("UPDATE D_ANAGRAFICA_STAMPE SET FLAG_STAMPA_ATTIVA = #{flag_stampa_attiva} WHERE CODI_PK_OBJECT_ID =  #{codi_pk_object_id} ")
		 public void upateStatoStampa(DAnagraficheStampeVO vo) throws SQLException;
}
