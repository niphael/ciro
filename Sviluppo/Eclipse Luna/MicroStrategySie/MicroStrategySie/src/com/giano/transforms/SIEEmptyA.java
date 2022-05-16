/**
 * Classe che scrive l'header per il SIE con l'URL per tornare alla pagina chiamante 
 */
package com.giano.transforms;
import com.giano.transforms.HeaderBean;
import com.microstrategy.web.app.transforms.AbstractAppTransform;
import com.microstrategy.web.beans.MarkupOutput;

/**
 * @author gianluca
 *
 */
public class SIEEmptyA extends AbstractAppTransform{

	/**
	 * 
	 */
	public SIEEmptyA() {
		// TODO Auto-generated constructor stub
	}
	/**
	 * Questo metodo disegna l'intestazione di tutti gli Header
	 * 
	 * @param MarkupOutput out HTML dell'header per il SIE
	 * @author Gianluca Masci aka (GLM) www.giano-solutions.com
	 * 
	 * */

	public Class<HeaderBean> getSupportedBeanType() {
		return HeaderBean.class;
	}
	public String getDescription() {
		return "A custom transform that renders header";
	}

	public void transformForRequestSuccessful(MarkupOutput out) {
		out.append("<!-- SIEEmpty -> transformForRequestSuccessful -->");
	}
	public void renderShell(MarkupOutput out){
		out.append("<!-- Start Bean Transform -->\n");
		out.append("<div>\n");
		this.transformForRequestSuccessful(out);
		out.append("</div>\n");
		out.append("<!-- End Bean Transform -->\n");
	}
}
