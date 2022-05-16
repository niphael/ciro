package it.almaviva.sie.business.mappers;

import it.almaviva.sie.business.model.DCronologicoOnlineModVO;
import it.almaviva.sie.business.model.DCronologicoStampeVO;
import it.almaviva.sie.business.provider.BuilderSelectProvider;
import it.almaviva.sie.business.provider.BuilderSelectUtentiProvider;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.SelectProvider;

public interface DCronologicoMapper {
	 
	 @Insert("INSERT into D_CRONOLOGICO_ONLINE_MOD ( CODI_PK_USERID, CODI_PK_FUNZIONE, DATA_PK_DATA_UTILIZZO,TEXT_MODIFICA,ROW_CREATED_USER_APP,ROW_CODI_FUNZIONE, ROW_TIPO_ELABORAZIONE, HTML_COMPRESSED)"
	 		+ " values ( #{CODI_PK_USERID}, #{CODI_PK_FUNZIONE},SYSDATE,#{TEXT_MODIFICA},#{ROW_CREATED_USER_APP},#{ROW_CODI_FUNZIONE},#{ROW_TIPO_ELABORAZIONE},#{HTML_COMPRESSED})")
	//@SelectProvider(type = BuilderSelectUtentiProvider.class, method = "builderInsertCronologico")
	void writeCronologico(DCronologicoOnlineModVO vo);


}
