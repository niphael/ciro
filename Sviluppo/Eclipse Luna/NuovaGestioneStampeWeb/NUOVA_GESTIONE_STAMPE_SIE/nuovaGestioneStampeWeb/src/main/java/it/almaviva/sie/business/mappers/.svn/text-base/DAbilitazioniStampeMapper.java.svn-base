/**
 * 
 */
package it.almaviva.sie.business.mappers;

import java.sql.SQLException;

import it.almaviva.sie.business.model.DAbilitazStampeVO;
import it.almaviva.sie.business.provider.BuilderSelectProvider;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectProvider;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author Teresa
 *
 */
public interface DAbilitazioniStampeMapper {
	 @SelectProvider(type = BuilderSelectProvider.class, method = "builderQueryAbilitazStampe")
	 public int getAbilitazione(DAbilitazStampeVO vo);
		 		
	 @Delete(" delete from D_ABILITAZ_STAMPE WHERE CODI_PK_PROFILO = #{CODI_PK_PROFILO}")
	 @Transactional(rollbackFor = Exception.class, propagation = Propagation.REQUIRED)
	 public void delete(DAbilitazStampeVO vo) throws SQLException;
	 
	 @Insert("insert into D_ABILITAZ_STAMPE (CODI_PK_PROFILO, CODI_PK_OBJECT_ID, VERSIONE,ROW_CREATED_USER_APP, ROW_CODI_FUNZIONE, ROW_TIPO_ELABORAZIONE) "
	 		+ " values (#{CODI_PK_PROFILO}, #{CODI_PK_OBJECT_ID}, #{VERSIONE},#{ROW_CREATED_USER_APP}, #{ROW_CODI_FUNZIONE}, #{ROW_TIPO_ELABORAZIONE})")
	 public void insert(DAbilitazStampeVO vo) throws SQLException;
}
