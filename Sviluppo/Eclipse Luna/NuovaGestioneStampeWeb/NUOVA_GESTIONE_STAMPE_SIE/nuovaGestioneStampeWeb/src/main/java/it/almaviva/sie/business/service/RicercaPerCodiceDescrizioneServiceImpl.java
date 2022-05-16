/**
 * 
 */
package it.almaviva.sie.business.service;

import it.almaviva.sie.business.mappers.RicercaPerCodiceDescrizioneMapper;
import it.almaviva.sie.business.model.CodiceDescrizioneTO;
import it.almaviva.sie.business.model.DAmministrazioneVO;
import it.almaviva.sie.business.model.DPeriodicitaVO;
import it.almaviva.sie.business.model.DRagionerieVO;
import it.almaviva.sie.business.model.DUtentiDestinatariVO;
import it.almaviva.sie.business.model.ParametriCodiceDescrizioneTO;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author Teresa
 *
 */
@Service("ricercaPerCodiceDescrizioneService")
public class RicercaPerCodiceDescrizioneServiceImpl implements
		RicercaPerCodiceDescrizioneService {
	  @Autowired
	  private RicercaPerCodiceDescrizioneMapper mapper;
	
	/* (non-Javadoc)
	 * @see it.almaviva.sie.business.service.RicercaPerCodiceDescrizioneService#getListaCodiceDescrizione(it.almaviva.sie.business.model.ParametriCodiceDescrizioneTO)
	 */
	
	@Override
	public ArrayList<CodiceDescrizioneTO> getListaCodiceDescrizione(
			ParametriCodiceDescrizioneTO to) {
		// TODO Auto-generated method stub
		ArrayList<CodiceDescrizioneTO> listaCod = new ArrayList<CodiceDescrizioneTO>();
		ArrayList<DRagionerieVO> lista=  mapper.getListaCodiceDescrizione(to);
		for (int i =0;i<lista.size();i++){
			DRagionerieVO rag = (DRagionerieVO)lista.get(i);
			CodiceDescrizioneTO cod= new CodiceDescrizioneTO();
			cod.setCodice(rag.getCODI_PK_RAGIONERIA());
			cod.setDescrizione(rag.getDESC_RAGIONERIA());
			listaCod.add(cod);
		}
		return listaCod;
	}

	@Override
	public ArrayList<CodiceDescrizioneTO> getListaPeriodicitaSchedulabili() {
		// TODO Auto-generated method stub
		ArrayList<DPeriodicitaVO> lista = mapper.getListaPeriodicitaSchedulabili();
		ArrayList<CodiceDescrizioneTO> listaCod = new ArrayList<CodiceDescrizioneTO>();
		for (int i =0;i<lista.size();i++){
			DPeriodicitaVO vo = (DPeriodicitaVO)lista.get(i);	
			CodiceDescrizioneTO cod= new CodiceDescrizioneTO();
			cod.setCodice(vo.getCODI_PK_PERIODICITA());
			cod.setDescrizione(vo.getDESC_PERIODICITA());
			listaCod.add(cod);
		}
		
		return listaCod;
	}

	@Override
	public ArrayList<CodiceDescrizioneTO> getListaUtentiDestinatari(
			ParametriCodiceDescrizioneTO to) {
		// TODO Auto-generated method stub
		ArrayList<DUtentiDestinatariVO> lista= mapper.getListaUtentiDestinatari(to);
		ArrayList<CodiceDescrizioneTO> listaCod = new ArrayList<CodiceDescrizioneTO>();
		for (int i =0;i<lista.size();i++){
			DUtentiDestinatariVO utente = (DUtentiDestinatariVO)lista.get(i);
			CodiceDescrizioneTO cod= new CodiceDescrizioneTO();
			cod.setCodice(utente.getDESTINATARIO());
			cod.setDescrizione(utente.getEMAIL());
			listaCod.add(cod);
			
		}
		
		return listaCod;
	}
	
	@Override
	public ArrayList<CodiceDescrizioneTO> getListaAmministrazione(
			ParametriCodiceDescrizioneTO to) {
		// TODO Auto-generated method stub
		ArrayList<DAmministrazioneVO> lista= mapper.getListaAmministrazioni(to);
		ArrayList<CodiceDescrizioneTO> listaCod = new ArrayList<CodiceDescrizioneTO>();
		for (int i =0;i<lista.size();i++){
			DAmministrazioneVO amm = (DAmministrazioneVO)lista.get(i);
			CodiceDescrizioneTO cod= new CodiceDescrizioneTO();
			cod.setDescrizione(amm.getDESCRIZIONE());
			listaCod.add(cod);
		}
		
		return listaCod;
	}

}
