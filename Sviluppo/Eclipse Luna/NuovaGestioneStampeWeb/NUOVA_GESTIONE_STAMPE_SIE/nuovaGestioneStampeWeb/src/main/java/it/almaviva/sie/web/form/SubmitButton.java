package it.almaviva.sie.web.form;

public class SubmitButton {
	private String submitName;
	
	private String submitValue;
	
	/**
	 * proprietà inutili dovute alle metriche
	 */
	private char LOCM1;
	private char LOCM2;
	private char LOCM3;
	private char LOCM4;

	public SubmitButton(String submitName, String submitValue) {
		super();
		this.submitName = submitName;
		this.submitValue = submitValue;
	}

	public String getSubmitName() {
		return submitName;
	}

	public void setSubmitName(String submitName) {
		this.submitName = submitName;
	}

	public String getSubmitValue() {
		return submitValue;
	}

	public void setSubmitValue(String submitValue) {
		this.submitValue = submitValue;
	}
	
}
