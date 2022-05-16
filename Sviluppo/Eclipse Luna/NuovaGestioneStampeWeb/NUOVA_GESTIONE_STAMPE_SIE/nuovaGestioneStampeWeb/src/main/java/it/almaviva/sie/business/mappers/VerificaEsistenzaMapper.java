/**
 * 
 */
package it.almaviva.sie.business.mappers;

import it.almaviva.sie.business.model.DAmministrazioneVO;
import it.almaviva.sie.business.model.DUtentiDestinatariVO;

import org.apache.ibatis.annotations.Select;

/**
 * @author Teresa
 *
 */
public interface VerificaEsistenzaMapper {
	 @Select
	 ("SELECT COD_LIV01,COD_LIV02,COD_LIV03,COD_LIV04,COD_LIV05 from d_amministrazione where trim(descrizione)=#{descrAmm} order by cod_liv01,cod_liv02,cod_liv03,cod_liv04,cod_liv05")
	 public DAmministrazioneVO getAmministrazione(String descrAmm);
	 
	 @Select
	 ("SELECT TITOLO_REPORT,LOGIN_MICROSTRATEGY from D_UTENTI_DESTINATARI_REPORT where TITOLO_REPORT= #{TITOLO_REPORT} and LOGIN_MICROSTRATEGY=#{LOGIN_MICROSTRATEGY}")
	 public DUtentiDestinatariVO verificaEsistenzaDest(DUtentiDestinatariVO vo);
}
