/**
 * 
 */
package it.almaviva.sie.business.mappers;

import it.almaviva.sie.business.model.DAnagraficheStampeVO;
import it.almaviva.sie.business.model.DCronologicoStampeVO;
import it.almaviva.sie.business.provider.BuilderSelectProvider;

import java.util.ArrayList;

import org.apache.ibatis.annotations.SelectProvider;

/**
 * @author Teresa
 *
 */
public interface DCronologicoStampeMapper {
	
	 @SelectProvider(type = BuilderSelectProvider.class, method = "builderInsertCronologico")
	 public void writeCronologico(DCronologicoStampeVO vo);
}
