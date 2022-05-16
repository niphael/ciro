package it.almaviva.sie.business.service;

import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.almaviva.sie.business.mappers.GestioneUtentiMapper;
import it.almaviva.sie.business.model.BaseTO;
import it.almaviva.sie.business.model.DCronologicoOnlineModVO;
import it.almaviva.sie.business.model.DUtentiDestinatariVO;
import it.almaviva.sie.business.model.UtenteDestinatarioReportTO;
import it.almaviva.sie.business.util.ApplicationException;

@Service("gestioneUtentiService")
public class GestioneUtentiServiceImpl implements GestioneUtentiService {
	@Autowired
	private GestioneUtentiMapper mapper;

	@Override
	public BaseTO inserisciDestinatarioReport(UtenteDestinatarioReportTO to)
			throws SQLException {
		// TODO Auto-generated method stub
		DUtentiDestinatariVO vo = new DUtentiDestinatariVO();
		vo.setDESTINATARIO(to.getDestinatario());
		vo.setEMAIL(to.getEmail());
		if(to.getTipoSpedizione().equals("P")){
			DUtentiDestinatariVO dd=mapper.countDestinatariPec(vo);
			if(dd==null)
			mapper.insertDestinatarioPec(vo);
		}
				vo.setAMMINISTRAZIONE(to.getCodiceAmministrazione());
			vo.setID_REPORT(to.getIdReport());
			vo.setTITOLO_REPORT(to.getTitoloReport());
			vo.setCODI_PERIODICITA(to.getCodicePeriodicita());
			vo.setNOTE(to.getNote());
			vo.setROW_CREATED_USER_APP(to.getUtente());
			vo.setROW_CODI_FUNZIONE(to.getFunzione());
			vo.setLOGIN_MICROSTRATEGY(to.getLoginMicrostrategy());
			vo.setTIPO_SPEDIZIONE(to.getTipoSpedizione());
			vo.setOGGETTO(to.getOggetto());
			vo.setTESTO(to.getTesto());
			mapper.insertDestinatario(vo);
			
			
	
		return null;
	}
	
	private void insCronologico(UtenteDestinatarioReportTO to) throws SQLException{
		DCronologicoOnlineModVO vo = new DCronologicoOnlineModVO();
		
	}

}
