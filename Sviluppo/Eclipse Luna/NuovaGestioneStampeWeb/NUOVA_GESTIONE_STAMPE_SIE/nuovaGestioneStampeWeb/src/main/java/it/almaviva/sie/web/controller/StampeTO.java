/**
 * 
 */
package it.almaviva.sie.web.controller;

import java.util.ArrayList;

import it.almaviva.sie.business.model.BaseTO;
import it.almaviva.sie.web.util.WebApplicationConstants;

/**
 * @author Teresa
 *
 */
public class StampeTO extends BaseTO {

	private ArrayList listaDaAttivare = new ArrayList();
	private ArrayList listaDaDisattivare = new ArrayList();
	public ArrayList getListaDaAttivare() {
		return listaDaAttivare;
	}
	public void setListaDaAttivare(ArrayList listaDaAttivare) {
		this.listaDaAttivare = listaDaAttivare;
	}
	public ArrayList getListaDaDisattivare() {
		return listaDaDisattivare;
	}
	public void setListaDaDisattivare(ArrayList listaDaDisattivare) {
		this.listaDaDisattivare = listaDaDisattivare;
	}
	
	
}
