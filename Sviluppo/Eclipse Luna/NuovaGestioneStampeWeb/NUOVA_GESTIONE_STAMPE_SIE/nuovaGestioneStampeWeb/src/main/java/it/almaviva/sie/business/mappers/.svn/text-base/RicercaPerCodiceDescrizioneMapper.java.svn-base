/**
 * 
 */
package it.almaviva.sie.business.mappers;

import it.almaviva.sie.business.model.CodiceDescrizioneTO;
import it.almaviva.sie.business.model.DAmministrazioneVO;
import it.almaviva.sie.business.model.DAnagraficaVociMenuVO;
import it.almaviva.sie.business.model.DPeriodicitaVO;
import it.almaviva.sie.business.model.DRagionerieVO;
import it.almaviva.sie.business.model.DUtentiDestinatariVO;
import it.almaviva.sie.business.model.ParametriCodiceDescrizioneTO;
import it.almaviva.sie.business.provider.BuilderSelectProvider;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectProvider;

/**
 * @author Teresa
 *
 */
public interface RicercaPerCodiceDescrizioneMapper {

	 @SelectProvider(type = BuilderSelectProvider.class, method = "builderQueryRicercaPerCodiceDescrizione")
	public ArrayList<DRagionerieVO> getListaCodiceDescrizione(ParametriCodiceDescrizioneTO to);

	 @Select
	 ("SELECT codi_pk_periodicita, desc_periodicita FROM d_periodicita  WHERE SCHEDULABILE = '1' ORDER BY codi_pk_periodicita")
	 public ArrayList<DPeriodicitaVO> getListaPeriodicitaSchedulabili();

	 @SelectProvider(type = BuilderSelectProvider.class, method = "builderQueryDestinatario")
	public ArrayList<DUtentiDestinatariVO> getListaUtentiDestinatari(ParametriCodiceDescrizioneTO to);
	 
	 @SelectProvider(type = BuilderSelectProvider.class, method = "builderQueryAmministrazione")
	public ArrayList<DAmministrazioneVO> getListaAmministrazioni(ParametriCodiceDescrizioneTO to);
	 

}
