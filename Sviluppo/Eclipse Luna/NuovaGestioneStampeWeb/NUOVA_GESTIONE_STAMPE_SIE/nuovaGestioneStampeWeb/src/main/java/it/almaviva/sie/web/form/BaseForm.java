package it.almaviva.sie.web.form;

import java.util.HashMap;
import java.util.Map;

public class BaseForm {
	private String mode;
	private String fase;

	private Map<String, SubmitButton> buttons;

	private String currentMainButton;
	public BaseForm() {
		// costruttore
		buttons = new HashMap<String, SubmitButton>();
		buttons.put("0",new SubmitButton("metodo", "Avanti"));
		buttons.put("1",new SubmitButton("metodo", "Indietro"));
	}

	public String getMode() {
		// restituisce mode
		return mode;
	}

	public void setMode(String mode) {
		// imposta mode
		this.mode = mode;
	}

	public String getCurrentMainButton() {
		// restituisce currentMainButton
		return currentMainButton;
	}

	public void setCurrentMainButton(String currentMainButton) {
		// imposta currentMainButton
		this.currentMainButton = currentMainButton;
	}

	public Map<String, SubmitButton> getButtons() {
		return buttons;
	}

	public void setButtons(Map<String, SubmitButton> buttons) {
		this.buttons = buttons;
	}

	/**
	 * @param fase the fase to set
	 */
	public void setFase(String fase) {
		this.fase = fase;
	}

	/**
	 * @return the fase
	 */
	public String getFase() {
		return fase;
	}
}
