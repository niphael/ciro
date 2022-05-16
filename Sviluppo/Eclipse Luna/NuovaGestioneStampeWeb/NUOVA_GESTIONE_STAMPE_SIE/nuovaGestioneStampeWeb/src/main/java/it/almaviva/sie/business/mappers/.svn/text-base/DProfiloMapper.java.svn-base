package it.almaviva.sie.business.mappers;
import java.sql.SQLException;
import java.util.ArrayList;

import it.almaviva.sie.business.model.DProfiloVO;
import it.almaviva.sie.business.model.Profilo;
import it.almaviva.sie.business.provider.BuilderSelectUtentiProvider;

import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectProvider;
import org.apache.ibatis.annotations.Update;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

public interface DProfiloMapper {
	 @Select
	 ("SELECT distinct a.CODI_PK_PROFILO,a.DESC_PROFILO,b.CODI_LIVELLO_ORG,b.CODI_RAGIONERIA,a.VERSIONE"
		 		+ " FROM   D_PROFILO a, D_ABILITAZ_STAMPE_LIV_ORG b, D_ABILITAZ_STAMPE d"
		 		+ " WHERE       a.CODI_PK_PROFILO = b.CODI_PK_PROFILO AND a.CODI_PK_PROFILO = d.CODI_PK_PROFILO"
		 		+ " AND a.CODI_PK_PROFILO= #{codiProfilo} ")
	 public DProfiloVO getDettaglioProfilo(String codiProfilo);
	 
	 @Select
	 ("select CODI_PK_PROFILO, DESC_PROFILO FROM   D_PROFILO where FLAG_STAMPE_01 = '1' order by CODI_PK_PROFILO")
	 public ArrayList<DProfiloVO> getListaProfiliStampe();
	 
	 
	 @SelectProvider(type = BuilderSelectUtentiProvider.class, method = "builderSelectProfiliStampe")
	 public ArrayList<DProfiloVO> getListaProfiliStampeDaModificare(Profilo vo);	
	 
	 @Transactional(rollbackFor = Exception.class, propagation = Propagation.REQUIRED)
	 @Update("update D_PROFILO set DESC_PROFILO=#{desc_profilo}, ROW_UPDATED_USER_APP=#{ROW_UPDATED_USER_APP},ROW_CODI_FUNZIONE=#{ROW_CODI_FUNZIONE},ROW_TIPO_ELABORAZIONE=#{ROW_TIPO_ELABORAZIONE},VERSIONE=#{VERSIONE} where CODI_PK_PROFILO=#{codi_pk_profilo}")
	 public void update(DProfiloVO vo) throws SQLException;
	 
	 @Select(" select VERSIONE from D_PROFILO where CODI_PK_PROFILO= #{codiProfilo}") 
	 public Integer getVersione(String codiProfilo)throws SQLException;

}
