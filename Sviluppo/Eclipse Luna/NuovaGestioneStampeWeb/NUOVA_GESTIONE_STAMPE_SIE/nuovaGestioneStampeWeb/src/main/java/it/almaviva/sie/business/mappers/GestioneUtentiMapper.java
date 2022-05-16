package it.almaviva.sie.business.mappers;
import java.sql.SQLException;

import it.almaviva.sie.business.model.DUtentiDestinatariVO;
import it.almaviva.sie.business.provider.BuilderSelectUtentiProvider;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectProvider;

public interface GestioneUtentiMapper {

	 @SelectProvider(type = BuilderSelectUtentiProvider.class, method = "builderCountDestinatariPec")
    public DUtentiDestinatariVO countDestinatariPec(DUtentiDestinatariVO vo); 

	 @SelectProvider(type = BuilderSelectUtentiProvider.class, method = "builderInsertDestinatariPec")
	 public void insertDestinatarioPec(DUtentiDestinatariVO vo); 
	 
	 @SelectProvider(type = BuilderSelectUtentiProvider.class, method = "builderInsertDestinatari")
	 public void insertDestinatario(DUtentiDestinatariVO vo) throws SQLException; 
}
