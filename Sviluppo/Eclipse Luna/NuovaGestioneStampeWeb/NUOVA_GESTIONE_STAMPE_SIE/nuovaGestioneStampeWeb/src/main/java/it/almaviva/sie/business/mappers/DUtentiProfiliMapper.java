package it.almaviva.sie.business.mappers;

import java.util.ArrayList;

import it.almaviva.sie.business.model.DUtentiProfiliVO;

import org.apache.ibatis.annotations.Select;


public interface DUtentiProfiliMapper {

	 @Select("SELECT a.CODI_PK_PROFILO,b.DESC_PROFILO FROM D_UTENTE_PROFILI_T a, D_PROFILO b"
	 		+ " WHERE a.CODI_PK_PROFILO=b.CODI_PK_PROFILO and CODI_PK_UTENTE = #{userName}  and b.FLAG_STAMPE_01 = '1'") 
     public ArrayList<DUtentiProfiliVO> getProfiliByUserName(String userName); 

}
