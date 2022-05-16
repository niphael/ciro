package com.giano.transforms;

import com.microstrategy.web.app.transforms.AttributeFormsQualificationTransform;
import com.microstrategy.web.beans.MarkupOutput;

public class SieAttributeFormsQualificationTransform extends AttributeFormsQualificationTransform{
	public void renderShell(MarkupOutput out){
		out.append("<!-- Start Bean Transform -->\n");
		out.append("<div>\n");
		this.transformForRequestSuccessful(out);
		out.append("</div>\n");
		out.append("<!-- End Bean Transform -->\n");
	}
	public void transformForRequestSuccessful(MarkupOutput out) {
		out.append("<!-- SieAttributeFormsQualificationTransform.transformForRequestSuccessful -->");
	}
}
