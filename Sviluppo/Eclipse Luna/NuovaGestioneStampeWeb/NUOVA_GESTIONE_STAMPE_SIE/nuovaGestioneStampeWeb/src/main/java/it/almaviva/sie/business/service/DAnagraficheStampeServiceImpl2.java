package it.almaviva.sie.business.service;

import it.almaviva.sie.business.exception.MstrException;
import it.almaviva.sie.business.mappers.DAnagraficaStampeMapper;
import it.almaviva.sie.business.mappers.DParametriApplicazioneMapper;
import it.almaviva.sie.business.model.BaseTO;
import it.almaviva.sie.business.model.DAnagraficheStampeVO;
import it.almaviva.sie.business.model.DParametriApplicazioneVO;
import it.almaviva.sie.business.model.EsitoMstrTO;
import it.almaviva.sie.business.model.MstrConnectionParam;
import it.almaviva.sie.business.model.ReportMstrTO;
import it.almaviva.sie.business.util.ApplicationException;
import it.almaviva.sie.business.util.MstrCodedErrors;
import it.almaviva.sie.business.util.MstrCostanti;
import it.almaviva.sie.business.util.TraceLogger;
import it.almaviva.sie.business.util.Util;
import it.almaviva.sie.web.controller.StampeTO;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.microstrategy.web.objects.WebObjectsException;

public abstract class DAnagraficheStampeServiceImpl2 implements DAnagraficaStampeService {

    @Autowired
	private DAnagraficaStampeMapper mapper;
	
	@Autowired
	private CronologicoService service2;
	
	@Override
	public ArrayList<DAnagraficheStampeVO> getListaPercorsi() {
		// TODO Auto-generated method stub
		ArrayList<DAnagraficheStampeVO> listaPercorsi = mapper.getListaPercorsi();
		return listaPercorsi;
	}

	@Override
	public ArrayList<DAnagraficheStampeVO> getStampeProfiloForModifica(
			String codiProfilo) {
		// TODO Auto-generated method stub
		ArrayList<DAnagraficheStampeVO> listaStampe= mapper.getStampeProfiloForModifica(codiProfilo);
		return listaStampe;
	}

	@Override
	public ArrayList<DAnagraficheStampeVO> ricercaStampeForModifica(
			DAnagraficheStampeVO vo) {
		// TODO Auto-generated method stub
		ArrayList<DAnagraficheStampeVO> listaStampe= mapper.ricercaStampeForModifica(vo);
		return listaStampe;
	}

	@Override
	public ArrayList<DAnagraficheStampeVO> getListaStampeDaAttivare(
			DAnagraficheStampeVO vo) {
		// TODO Auto-generated method stub
		ArrayList<DAnagraficheStampeVO> listaStampe= mapper.getListaStampeDaAttivare(vo);
		return listaStampe;
	}

	@Override
	@Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = SQLException.class)
	public BaseTO modificaStatoStampe(StampeTO to) {
		// TODO Auto-generated method stub
		ArrayList listaAtt = to.getListaDaAttivare();
		ArrayList listaDis = to.getListaDaDisattivare();
		try {
		for(int i=0;i<to.getListaDaAttivare().size();i++){
			DAnagraficheStampeVO vo = (DAnagraficheStampeVO)to.getListaDaAttivare().get(i);
			vo.setFlag_stampa_attiva("1");
			mapper.upateStatoStampa(vo);
		}
		for(int i=0;i<to.getListaDaDisattivare().size();i++){
			DAnagraficheStampeVO vo = (DAnagraficheStampeVO)to.getListaDaDisattivare().get(i);
			vo.setFlag_stampa_attiva("0");
			mapper.upateStatoStampa(vo);
		}
		service2.write(to);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			// TODO Auto-generated catch block
			TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
					+ e.getMessage(), DAnagraficheStampeServiceImpl.class);
			to.setErrorMessage(" Errore sql");
		}
		 catch (Exception e) {
				// TODO Auto-generated catch block
			 TraceLogger.traceLog(TraceLogger.getERROR(), "Eccezione:  "
						+ e.getMessage(), DAnagraficheStampeServiceImpl.class);
				to.setErrorMessage(" Errore generico");
			}
		return to;
	}
}
