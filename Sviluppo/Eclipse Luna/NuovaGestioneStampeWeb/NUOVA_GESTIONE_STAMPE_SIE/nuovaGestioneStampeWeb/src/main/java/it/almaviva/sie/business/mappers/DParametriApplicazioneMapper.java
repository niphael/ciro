/**
 * 
 */
package it.almaviva.sie.business.mappers;

import it.almaviva.sie.business.model.DParametriApplicazioneVO;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Select;

/**
 * @author Teresa
 *
 */
public interface DParametriApplicazioneMapper {
	@Select
	 ("SELECT CODI_PK_PARAMETRO,TEXT_VALORE_PARAMETRO FROM D_PARAMETRI_APPLICAZIONE_MS")
	public ArrayList<DParametriApplicazioneVO>getParametriApplicazione();
}
