package it.almaviva.sie.business.provider;

import java.io.ByteArrayInputStream;

import it.almaviva.sie.business.model.DCronologicoOnlineModVO;
import it.almaviva.sie.business.model.DProfiloVO;
import it.almaviva.sie.business.model.DUtentiDestinatariVO;
import it.almaviva.sie.business.model.Profilo;
import it.almaviva.sie.business.util.Util;
public class BuilderSelectUtentiProvider {

	
	public static String builderInsertDestinatari(DUtentiDestinatariVO vo){
		String select="";
		StringBuffer query = new StringBuffer();
		query.append("INSERT INTO D_UTENTI_DESTINATARI_REPORT (DESTINATARIO, EMAIL, AMMINISTRAZIONE, ID_REPORT, TITOLO_REPORT, ")
		.append( " CODI_PERIODICITA, NOTE, ROW_CREATED_DTTM, ROW_CREATED_USER_APP, VERSIONE, ROW_CODI_FUNZIONE, LOGIN_MICROSTRATEGY, TIPO_SPEDIZIONE, OGGETTO, ")
		.append( "TESTO, VALIDITA) values ")
		.append(" (UPPER('"+vo.getDESTINATARIO()+"'), '"+vo.getEMAIL()+"', UPPER('"+vo.getAMMINISTRAZIONE()+"'), '"+vo.getID_REPORT()+"', '"+vo.getTITOLO_REPORT()+"',")
		.append("'"+vo.getCODI_PERIODICITA()+"', '"+vo.getNOTE()+"', SYSDATE, '"+vo.getROW_CREATED_USER_APP()+"', 1, '"+vo.getROW_CODI_FUNZIONE()+"', '"+vo.getLOGIN_MICROSTRATEGY()+"', ")
		.append("'"+vo.getTIPO_SPEDIZIONE()+"', '"+vo.getOGGETTO()+"',  '"+vo.getTESTO()+"',1)");
		select=query.toString();
		return select;
	}
	public static String builderCountDestinatariPec(DUtentiDestinatariVO vo){
		String select="select DESTINATARIO from D_DESTINATARI_PEC where UPPER(DESTINATARIO) = UPPER('"+vo.getDESTINATARIO()+"')  and UPPER(email) = UPPER('"+vo.getEMAIL()+"')";
	
		return select;
	}
	
	public static String builderInsertDestinatariPec(DUtentiDestinatariVO vo){
		String select="INSERT INTO D_DESTINATARI_PEC(DESTINATARIO, EMAIL) VALUES (UPPER('"+vo.getDESTINATARIO()+"'), '"+vo.getEMAIL()+"')";
	
		return select;
	}
	
	
	public static String builderInsertCronologico(DCronologicoOnlineModVO vo){
		String select="";
		StringBuffer query = new StringBuffer();
		// temporaneo per ovviare nullPointerExc
		query.append("INSERT into D_CRONOLOGICO_ONLINE_MOD ( CODI_PK_USERID, CODI_PK_FUNZIONE, DATA_PK_DATA_UTILIZZO,TEXT_MODIFICA,")
		.append("ROW_CREATED_USER_APP, ROW_CODI_FUNZIONE, ROW_TIPO_ELABORAZIONE, HTML_COMPRESSED)")
		.append(" values ( '"+vo.getCODI_PK_USERID()+"', '"+vo.getCODI_PK_FUNZIONE()+"',sysdate,"+vo.getTEXT_MODIFICA()+",")
		.append(" '"+vo.getROW_CREATED_USER_APP()+"','"+vo.getROW_CODI_FUNZIONE()+"','"+vo.getROW_TIPO_ELABORAZIONE()+"',"+vo.getHTML_COMPRESSED()+")");
		select=query.toString();
		return select;
	}
	
	public static String builderSelectProfiliStampe(Profilo vo){
		String select="";
		StringBuffer query = new StringBuffer();
		query.append("select CODI_PK_PROFILO, DESC_PROFILO from d_profilo where FLAG_STAMPE_01=1");
		if(!Util.isEmpty(vo.getCodiProfiloDa()))
			query.append(" and CODI_PK_PROFILO >='"+vo.getCodiProfiloDa()+"'");
		if(!Util.isEmpty(vo.getCodiProfiloA()))
			query.append(" and CODI_PK_PROFILO <='"+vo.getCodiProfiloA()+"'");
		query.append(" order by CODI_PK_PROFILO"); 
		select=query.toString();
		return select;
	}
}
