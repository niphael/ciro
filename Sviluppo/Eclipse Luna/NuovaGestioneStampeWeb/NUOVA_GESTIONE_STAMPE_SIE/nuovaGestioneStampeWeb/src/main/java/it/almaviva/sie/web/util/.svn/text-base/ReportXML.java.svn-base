/**
 * 
 */
package it.almaviva.sie.web.util;
import java.util.ArrayList;

import org.jdom.Attribute;
import org.jdom.Element;

/**
 * @author Teresa
 *
 */
public class ReportXML {

	private static Element mountNode(String codice, String valore){
		
		Element el = new Element("pa");
		el.setAttribute(new Attribute("pt","3"));
		el.setAttribute(new Attribute("pin","0"));
		el.setAttribute(new Attribute("did",codice));
		el.setAttribute(new Attribute("tp","10"));

		el.addContent(valore);

		return el;
	}
	
	private static Element mountNodeEsercizio(Element answer, String codice, String valore){
			Element el = new Element("pa");
		el.setAttribute(new Attribute("pt","7"));
		el.setAttribute(new Attribute("pin","0"));
		el.setAttribute(new Attribute("did","DF9EE8D745E103DB575FDC9B78DADE67"));
		el.setAttribute(new Attribute("tp","10"));
		
		Element el1 = new Element("mi");
		el.addContent(el1);
		
		
		Element el2 = new Element("es");
		el1.addContent(el2);
		
		Element el3 = new Element("at");
		el3.setAttribute(new Attribute("did",codice));
		el3.setAttribute(new Attribute("tp","12"));
		el2.addContent(el3);
		
		Element el4 = new Element("e");
		el4.setAttribute(new Attribute("emt","1"));
		el4.setAttribute(new Attribute("ei",codice+":"+valore));
		el4.setAttribute(new Attribute("art","1"));
		el4.setAttribute(new Attribute("disp_n",valore));
		el2.addContent(el4); 
		answer.addContent(el);
		
		return answer;
	}
	public static Element generaXMLCapitoliDevolutiPerCapitoloArticolo(Element answer, String esercizio, String capitoloArticolo){
			
		
		//answer.addContent(mountNode(Parameters.esercizio, esercizio));
		answer = mountNodeEsercizio(answer,Parameters.esercizio, esercizio);
		answer.addContent(mountNode(Parameters.capitoloArticolo, capitoloArticolo));
		return answer;		
	}
	
}
