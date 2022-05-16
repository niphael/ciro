package it.almaviva.sie.web.form;

public class SelectItem {
	private String label;
	private String value;
	private String valueRadioButton;
	/**
	 * proprietà inutili dovute alle metriche
	 */
	private char LOCM1;
	private char LOCM2;
	private char LOCM3;
	private char LOCM4;
	public SelectItem() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
	public SelectItem(String label, String value) {
		super();
		this.label = label;
		this.value = value;
	}



	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}



	public void setValueRadioButton(String valueRadioButton) {
		this.valueRadioButton = valueRadioButton;
	}



	public String getValueRadioButton() {
		return valueRadioButton;
	}
	
}
