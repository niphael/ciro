package it.almaviva.sie.sicurezza.model;

import java.io.Serializable;

public class LivelliAbilitazione implements Serializable {
	private boolean allImpAbil=false;
	private boolean allClasseAbil=false;
	private boolean capoImpAbil=false;
	private boolean clsClasseAbil=false;
	private boolean allRagAbil=false;
	private boolean unicoLivTerrAbil=false;
	
	


	/**
	 * @return
	 */
	public boolean isAllClasseAbil() {
		return allClasseAbil;
	}

	/**
	 * @return
	 */
	public boolean isAllImpAbil() {
		return allImpAbil;
	}

	/**
	 * @return
	 */
	public boolean isCapoImpAbil() {
		return capoImpAbil;
	}

	/**
	 * @return
	 */
	public boolean isClsClasseAbil() {
		return clsClasseAbil;
	}

	/**
	 * @param b
	 */
	public void setAllClasseAbil(boolean b) {
		allClasseAbil = b;
	}

	/**
	 * @param b
	 */
	public void setAllImpAbil(boolean b) {
		allImpAbil = b;
	}

	/**
	 * @param b
	 */
	public void setCapoImpAbil(boolean b) {
		capoImpAbil = b;
	}

	/**
	 * @param b
	 */
	public void setClsClasseAbil(boolean b) {
		clsClasseAbil = b;
	}

	/**
	 * @return
	 */
	public boolean isAllRagAbil() {
		return allRagAbil;
	}

	/**
	 * @param b
	 */
	public void setAllRagAbil(boolean b) {
		allRagAbil = b;
	}

	/**
	 * @return
	 */
	public boolean isUnicoLivTerrAbil() {
		return unicoLivTerrAbil;
	}

	/**
	 * @param b
	 */
	public void setUnicoLivTerrAbil(boolean b) {
		unicoLivTerrAbil = b;
	}
 public String toString(){
	return " allImp " +allImpAbil +
		   " allCls "  +allClasseAbil +
		   " clsCls "  +clsClasseAbil +
		   " capImp "  +capoImpAbil +
		   " allRag "  +allRagAbil +
		   " unicLivTerr "  +unicoLivTerrAbil;
	
}
}
