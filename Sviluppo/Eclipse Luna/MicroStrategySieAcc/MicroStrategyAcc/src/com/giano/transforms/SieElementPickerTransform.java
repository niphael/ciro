package com.giano.transforms;

import com.microstrategy.web.app.transforms.ElementPickerTransform;
import com.microstrategy.web.beans.MarkupOutput;

public class SieElementPickerTransform extends ElementPickerTransform{
	public void renderShell(MarkupOutput out){
		out.append("<!-- Start Bean Transform -->\n");
		out.append("<div>\n");
		this.transformForRequestSuccessful(out);
		out.append("</div>\n");
		out.append("<!-- End Bean Transform -->\n");
	}
	public void transformForRequestSuccessful(MarkupOutput out) {
		out.append("<!-- SieElementPickerTransform.transformForRequestSuccessful -->");
	}
}
