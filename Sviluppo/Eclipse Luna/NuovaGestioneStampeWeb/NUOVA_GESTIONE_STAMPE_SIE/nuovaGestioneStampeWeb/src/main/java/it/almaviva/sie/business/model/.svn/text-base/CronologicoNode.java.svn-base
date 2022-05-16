/**
 * 
 */
package it.almaviva.sie.business.model;

import java.util.ArrayList;

/**
 * @author Teresa
 *
 */
public class CronologicoNode {
	private String className;
	private String label;
	private String value;
	
	private CronologicoNode father;
	private ArrayList children;
	/**
	 * metodo che aggiunge un figlio
	 * @param childrenToAdd
	 */
	public void addChildren( CronologicoNode childrenToAdd )
	{
		// metodo che aggiunge un figlio
		
		if( children == null )
			children = new ArrayList();
		
		childrenToAdd.setFather( this );
		children.add( childrenToAdd );
	}
	
	/**
	 * metodo che restituisce i figli
	 * @return children: figli
	 */
	public ArrayList getChildren() {
		return children;
	}
	
	/**
	 * metodo che imposta i filgi
	 * @param children: figli
	 */
	public void setChildren(ArrayList children) {
		this.children = children;
	}
	
	/**
	 * metodo che preleva il nome della classe
	 * 	   @return className
	 */
	public String getClassName() {
		return className;
	}
	/**
	 * metodo che imposta il nome della classe
	 * 
	 * @param className
	 */
	public void setClassName(String className) {
		this.className = className;
	}
	/**
	 * metodo che preleva il messaggio che stamperà a video quando verrà stampato nodo crolologico
	 * @return label
	 */
	public String getLabel() {
		return label;
	}
	/**
	 * metodo che imposta il messaggio che stamperà a video quando verrà stampato nodo crolologico
	 * @param label
	 */
	public void setLabel(String label) {
		this.label = label;
	}
	/**
	 * metodo che preleva il valore 
	 * @return value
	 */
	public String getValue() {
		return value;
	}
	
	/**
	 * metodo che imposta il valore
	 * @param value
	 */
	public void setValue(String value) {
		this.value = value;
	}
	/**
	 * metodo che preleva il padre
	 * @return father
	 */
	public CronologicoNode getFather() {
		return father;
	}
	/**
	 * metodo che imposta il padre
	 * @param father
	 */
	public void setFather(CronologicoNode father) {
		this.father = father;
	}
}
