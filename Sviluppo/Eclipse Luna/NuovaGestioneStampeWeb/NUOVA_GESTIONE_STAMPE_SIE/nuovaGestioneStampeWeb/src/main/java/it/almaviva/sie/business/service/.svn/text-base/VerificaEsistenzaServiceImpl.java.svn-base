/**
 * 
 */
package it.almaviva.sie.business.service;

import it.almaviva.sie.business.mappers.VerificaEsistenzaMapper;
import it.almaviva.sie.business.model.DAmministrazioneVO;
import it.almaviva.sie.business.model.DUtentiDestinatariVO;
import it.almaviva.sie.business.model.UtenteDestinatarioReportTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author Teresa
 *
 */
@Service("verificaEsistenzaService")
public class VerificaEsistenzaServiceImpl implements VerificaEsistenzaService {
	 @Autowired
	  private VerificaEsistenzaMapper mapper;
	@Override
	public DAmministrazioneVO getAmministrazione(String descrizione) {
		// TODO Auto-generated method stub
		DAmministrazioneVO amm = mapper.getAmministrazione(descrizione);
		return amm;
	}
	@Override
	public UtenteDestinatarioReportTO verificaEsistenzaDest(UtenteDestinatarioReportTO to) {
		// TODO Auto-generated method stub
		DUtentiDestinatariVO vo = new DUtentiDestinatariVO();
		vo.setTITOLO_REPORT(to.getTitoloReport());
		vo.setLOGIN_MICROSTRATEGY(to.getLoginMicrostrategy());
		DUtentiDestinatariVO user = mapper.verificaEsistenzaDest(vo);
		if(user!=null)
			to.setErrorMessage("Report gia' associato al destinatario");
		return to;
	}
	

}
