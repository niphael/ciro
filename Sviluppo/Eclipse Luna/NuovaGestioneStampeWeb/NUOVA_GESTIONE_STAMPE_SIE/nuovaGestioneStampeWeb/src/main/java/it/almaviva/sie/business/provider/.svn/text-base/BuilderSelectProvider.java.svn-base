package it.almaviva.sie.business.provider;

import java.io.UnsupportedEncodingException;

import it.almaviva.sie.business.model.DAbilitazStampeVO;
import it.almaviva.sie.business.model.DAnagraficheStampeVO;
import it.almaviva.sie.business.model.DCronologicoStampeVO;
import it.almaviva.sie.business.model.ParametriCodiceDescrizioneTO;
import it.almaviva.sie.business.util.Util;

public class BuilderSelectProvider {
	
	public static String builderQueryStampe(DAnagraficheStampeVO vo){
		String select="";
		StringBuffer query = new StringBuffer();
		query.append("select distinct a.CODI_PK_OBJECT_ID, a.CODI_OBJECT_TYPE,a.TEXT_OBJECT_NAME, a.DESC_OBJECT_DESC, a.TEXT_URL_API, a.NUME_POSIZIONE_ELENCO, a.OBJECT_PATH")
		.append( " from D_ANAGRAFICA_STAMPE a,D_ABILITAZ_STAMPE b where a.FLAG_STAMPA_ATTIVA = 1 ")
		.append( "and a.CODI_PK_OBJECT_ID = b.CODI_PK_OBJECT_ID ");
		if(!Util.isEmpty( vo.getCodi_profilo()))
			query.append(" and b.CODI_PK_PROFILO = '"+vo.getCodi_profilo()+"' ");	
		if(!Util.isEmpty(vo.getObject_path()))
			query.append("and a.OBJECT_PATH like '%"+vo.getObject_path().replace("&agrave;", "à")+"%'");
		if(!Util.isEmpty(vo.getCodi_pk_object_id()))
			query.append(" and a.CODI_PK_OBJECT_ID = '"+vo.getCodi_pk_object_id()+"'");
		if(!Util.isEmpty(vo.getText_object_name()))
			query.append(" and upper(a.TEXT_OBJECT_NAME) like UPPER('%"+vo.getText_object_name()+"%') ");
		query.append(" order by a.OBJECT_PATH");
		select=query.toString();
		return select;
	}
	
	public static String builderQueryStampeForRicerca(DAnagraficheStampeVO vo){
		String select="";
		StringBuffer query = new StringBuffer();
		query.append("select distinct a.CODI_PK_OBJECT_ID, a.CODI_OBJECT_TYPE,a.TEXT_OBJECT_NAME, a.DESC_OBJECT_DESC, a.TEXT_URL_API, a.NUME_POSIZIONE_ELENCO, a.OBJECT_PATH")
		.append( " from D_ANAGRAFICA_STAMPE a,D_ABILITAZ_STAMPE b where a.FLAG_STAMPA_ATTIVA = 1 ")
		.append( "and a.CODI_PK_OBJECT_ID = b.CODI_PK_OBJECT_ID ");
		if(!Util.isEmpty(vo.getCodi_profilo()))
			query.append(" and b.CODI_PK_PROFILO='"+vo.getCodi_profilo()+"'");
			
		if(!Util.isEmpty(vo.getObject_path())){
				query.append("and a.OBJECT_PATH like '%"+vo.getObject_path().replace("&agrave;", "à")+"'");
			
		}
			
		if(!Util.isEmpty(vo.getCodi_pk_object_id()))
			query.append(" and a.CODI_PK_OBJECT_ID = '"+vo.getCodi_pk_object_id()+"'");
		if(!Util.isEmpty(vo.getText_object_name()))
			query.append(" and upper(a.TEXT_OBJECT_NAME) like UPPER('%"+vo.getText_object_name()+"%') ");
		query.append(" order by a.OBJECT_PATH");
		select=query.toString();
		return select;
	}
	
	public static String builderQueryStampeForRicercaNew(DAnagraficheStampeVO vo){
		String select="";
		StringBuffer query = new StringBuffer();
		query.append("select distinct a.OBJECT_PATH")
		.append( " from D_ANAGRAFICA_STAMPE a,D_ABILITAZ_STAMPE b where a.FLAG_STAMPA_ATTIVA = 1 ")
		.append( "and a.CODI_PK_OBJECT_ID = b.CODI_PK_OBJECT_ID ");
		if(!Util.isEmpty(vo.getCodi_profilo()))
			query.append(" and b.CODI_PK_PROFILO='"+vo.getCodi_profilo()+"'");
			
		if(!Util.isEmpty(vo.getObject_path()))
			query.append("and a.OBJECT_PATH like '%"+vo.getObject_path().replace("&agrave;", "à")+"%'");
		if(!Util.isEmpty(vo.getCodi_pk_object_id()))
			query.append(" and a.CODI_PK_OBJECT_ID = '"+vo.getCodi_pk_object_id()+"'");
		if(!Util.isEmpty(vo.getText_object_name()))
			query.append(" and upper(a.TEXT_OBJECT_NAME) like UPPER('%"+vo.getText_object_name()+"%') ");
		query.append(" order by a.OBJECT_PATH");
		select=query.toString();
		return select;
	}
	
	public static String builderQueryAbilitazStampe(DAbilitazStampeVO vo){
		String select="SELECT count(*) FROM D_ABILITAZ_STAMPE where CODI_PK_OBJECT_ID = '"+vo.getCODI_PK_OBJECT_ID()+"'  and CODI_PK_PROFILO= '"+vo.getCODI_PK_PROFILO()+"'";
		return select;
		
	}
	
	public static String builderInsertCronologico(DCronologicoStampeVO vo){
		String select="INSERT into D_CRONOLOGICO_STAMPE (SEQU_PK_ID , CODI_PK_USERID, CODI_PK_OBJECT_ID, CODI_OBJECT_TYPE, TEXT_OBJECT_NAME, DESC_OBJECT_DESC,TEXT_USER_MSTR ,"
				+ "ROW_CREATED_USER_APP, ROW_CODI_FUNZIONE, ROW_TIPO_ELABORAZIONE ) values( S_CRONOLOGICO_STAMPE.NEXTVAL,'"+vo.getCODI_PK_USERID()+"','"+vo.getCODI_PK_OBJECT_ID()+
				"',"+vo.getCODI_OBJECT_TYPE()+",'"+vo.getTEXT_OBJECT_NAME().replaceAll("'", "''")+"','"+vo.getDESC_OBJECT_DESC().replaceAll("'", "''")+"','"+vo.getTEXT_USER_MSTR()+"','"+vo.getCODI_PK_USERID()+"','"+vo.getROW_CODI_FUNZIONE()+"','L')";
			return select;
	}
	
	public static String builderInsertDAnagraficaStampe(DAnagraficheStampeVO vo){
		String select="INSERT INTO D_ANAGRAFICA_STAMPE (CODI_PK_OBJECT_ID , CODI_OBJECT_TYPE, TEXT_OBJECT_NAME, DESC_OBJECT_DESC, TEXT_URL_API, ROW_CREATED_USER_APP,ROW_UPDATED_USER_APP ,"
				+ "ROW_CODI_FUNZIONE, ROW_TIPO_ELABORAZIONE, NUME_POSIZIONE_ELENCO,OBJECT_PATH ) values( '"+vo.getCodi_pk_object_id()+"','"+vo.getCodi_object_type()+"','"+vo.getText_object_name()+"','"+vo.getDesc_object_desc()+"',"
						+ "'"+vo.getText_url_api()+"','"+vo.getROW_CREATED_USER_APP()+"','"+vo.getROW_CREATED_USER_APP()+"','"+vo.getROW_CODI_FUNZIONE()+"','L','"+vo.getNUME_POSIZIONE_ELENCO()+"','"+vo.getObject_path()+"')";
			return select;
	}
	public static String builderQueryTitoliReport(DAnagraficheStampeVO vo){
		StringBuffer query = new StringBuffer();
		String select="";
		query.append("select distinct CODI_PK_OBJECT_ID, CODI_OBJECT_TYPE, OBJECT_PATH,TEXT_OBJECT_NAME, DESC_OBJECT_DESC, TEXT_URL_API, NUME_POSIZIONE_ELENCO")
		.append( " from D_ANAGRAFICA_STAMPE where FLAG_STAMPA_ATTIVA = 1 AND SCHEDULABILE = '1'");
		if(!Util.isEmpty(vo.getText_object_name()))
			query.append(" and upper(TEXT_OBJECT_NAME) like UPPER('%"+vo.getText_object_name()+"%') ");
		select=query.toString();
		return select;
	}
		
	public static String builderQueryRicercaPerCodiceDescrizione(ParametriCodiceDescrizioneTO to){
		StringBuffer query = new StringBuffer();
		String select="";
		if(to.getTipologiaRicerca().equals("Ragioneria")){
			query.append(" SELECT DISTINCT codi_pk_ragioneria, desc_ragioneria FROM d_ragionerie WHERE FK_CODI_TIPOL_RAGIONERIA = 'P'");
			if(!Util.isEmpty(to.getCodice()))
				query.append(" and to_number(trim(codi_pk_ragioneria)) LIKE %"+to.getCodice()+"%");
			if(!Util.isEmpty(to.getDescrizione()))
				query.append(" and upper(desc_ragioneria) LIKE %"+to.getDescrizione()+"%");
			query.append(" ORDER BY codi_pk_ragioneria");
		}
		select=query.toString();
		return select;
	}
	public static String builderQueryDestinatario(ParametriCodiceDescrizioneTO to){
		StringBuffer query = new StringBuffer();
		String select="";
		if(to.getTipologiaRicerca().equals("destinatario")){
			query.append("SELECT DISTINCT DESTINATARIO, EMAIL FROM D_UTENTI_DESTINATARI_REPORT ");
			}
		if(to.getTipologiaRicerca().equals("destinatario pec")){
			query.append("SELECT DISTINCT DESTINATARIO, EMAIL FROM D_DESTINATARI_PEC ");
		}
		if(!Util.isEmpty(to.getDescrizione()))
			query.append(" WHERE upper(DESTINATARIO) like upper('%"+to.getDescrizione()+"%') ");
		select=query.toString();
		return select;
		
	}
	
	public static String builderQueryAmministrazione(ParametriCodiceDescrizioneTO to){
		StringBuffer query = new StringBuffer();
		String select="";
		query.append("select distinct DESCRIZIONE from  d_amministrazione a")
		.append(" where 1=1");
		if(!Util.isEmpty(to.getDescrizione()))
			query.append("	and upper(DESCRIZIONE) like upper('%"+to.getDescrizione()+"%') ");
		query.append(" order by descrizione");
		select=query.toString();
		return select;
		
	}
		
	public static String builderQueryRicercaStampeForModifica(DAnagraficheStampeVO vo){
		String select="";
		StringBuffer query = new StringBuffer();
		query.append("select CODI_PK_OBJECT_ID, CODI_OBJECT_TYPE, TEXT_OBJECT_NAME, DESC_OBJECT_DESC, OBJECT_PATH, TEXT_URL_API, NUME_POSIZIONE_ELENCO")
		.append(" from D_ANAGRAFICA_STAMPE where FLAG_STAMPA_ATTIVA = '1'");
		if(!Util.isEmpty(vo.getObject_path()))
			query.append(" AND OBJECT_PATH ='"+vo.getObject_path().replaceAll("'", "''")+"'");
		if(!Util.isEmpty(vo.getText_object_name()))
			query.append(" AND TEXT_OBJECT_NAME='"+vo.getText_object_name().replaceAll("'", "''")+"'");
		query.append(" order by OBJECT_PATH ASC");
		select=query.toString();
		return select;
		
	}
	public static String builderQueryRicercaStampeDaAttivare(DAnagraficheStampeVO vo){
		String select="";
		StringBuffer query = new StringBuffer();
		query.append("select CODI_PK_OBJECT_ID,  TEXT_OBJECT_NAME, DESC_OBJECT_DESC, OBJECT_PATH, FLAG_STAMPA_ATTIVA")
		.append(" from D_ANAGRAFICA_STAMPE where 1=1");
		if(!Util.isEmpty(vo.getObject_path()))
			query.append(" AND OBJECT_PATH ='"+vo.getObject_path().replaceAll("'", "''")+"'");
		if(!Util.isEmpty(vo.getText_object_name()))
			query.append(" AND TEXT_OBJECT_NAME='"+vo.getText_object_name().replaceAll("'", "''")+"'");
		query.append(" order by OBJECT_PATH ASC");
		select=query.toString();
		return select;
		
	}
}
