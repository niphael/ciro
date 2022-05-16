package it.almaviva.sie.business.service;

import java.lang.reflect.InvocationTargetException;
import java.sql.SQLException;
import java.util.ArrayList;

import it.almaviva.sie.business.model.BaseTO;
import it.almaviva.sie.business.model.CodiceDescrizioneTO;
import it.almaviva.sie.business.model.DProfiloVO;
import it.almaviva.sie.business.model.Profilo;
import it.almaviva.sie.business.util.ApplicationException;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Component
public interface DProfiloService {
public Profilo getDettaglioProfilo(String codiProfilo);

public ArrayList<DProfiloVO> getListaProfiliStampe();
public ArrayList<CodiceDescrizioneTO> getListaProfiliStampeDaModificare(Profilo vo) throws ApplicationException;	
public BaseTO modificaProfiloStampe(Profilo p) throws SQLException;	
}
