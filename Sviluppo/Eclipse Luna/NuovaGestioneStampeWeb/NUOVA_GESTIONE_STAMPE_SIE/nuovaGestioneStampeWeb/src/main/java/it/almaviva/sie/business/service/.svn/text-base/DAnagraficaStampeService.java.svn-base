package it.almaviva.sie.business.service;

import it.almaviva.sie.business.exception.MstrException;
import it.almaviva.sie.business.model.BaseTO;
import it.almaviva.sie.business.model.DAnagraficheStampeVO;
import it.almaviva.sie.business.model.MstrConnectionParam;
import it.almaviva.sie.business.util.ApplicationException;
import it.almaviva.sie.web.controller.StampeTO;

import java.util.ArrayList;

import org.springframework.stereotype.Component;

import com.microstrategy.web.objects.WebObjectsException;

@Component
public interface DAnagraficaStampeService {
	 public ArrayList<DAnagraficheStampeVO> getStampeForProfilo(String codiProfilo);
	 public ArrayList<DAnagraficheStampeVO> getListaStampe(DAnagraficheStampeVO vo);
	 public ArrayList<DAnagraficheStampeVO> getListaStampeNew(DAnagraficheStampeVO vo);
	 public ArrayList<DAnagraficheStampeVO> getListaTitoliReport(DAnagraficheStampeVO vo);
	 public DAnagraficheStampeVO getStampa(String codiId);
	 public ArrayList<DAnagraficheStampeVO> getListaStampeTotale();
	 public boolean aggiornaProfili(String utente)  throws WebObjectsException, ApplicationException  ;
	 public MstrConnectionParam getParametriConnessione()throws MstrException;
	 public ArrayList<DAnagraficheStampeVO> getListaPercorsi();
	 public ArrayList<DAnagraficheStampeVO> getStampeProfiloForModifica(String codiProfilo);
	 public ArrayList<DAnagraficheStampeVO> ricercaStampeForModifica(DAnagraficheStampeVO vo);
	 public ArrayList<DAnagraficheStampeVO> getListaStampeDaAttivare(DAnagraficheStampeVO vo);
	 public BaseTO modificaStatoStampe(StampeTO to);
}
