/**
 * MicroStrategy SDK Sample
 *
 * Copyright © 2007 MicroStrategy Incorporated. All Rights Reserved.
 *
 * MICROSTRATEGY MAKES NO REPRESENTATIONS OR WARRANTIES ABOUT THE
 * SUITABILITY OF THIS SAMPLE CODE, EITHER EXPRESS OR IMPLIED, INCLUDING
 * BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. MICROSTRATEGY SHALL NOT
 * BE LIABLE FOR ANY DAMAGES SUFFERED BY LICENSEE AS A RESULT OF USING,
 * MODIFYING OR DISTRIBUTING THIS SAMPLE CODE OR ITS DERIVATIVES.
 *
 *
 */
package com.giano.transforms;


import com.microstrategy.utils.serialization.FlatStateSerializer;
import com.microstrategy.utils.serialization.FlatStateTokenizer;
import com.microstrategy.web.app.beans.AbstractPersistableAppComponent;
import com.microstrategy.web.beans.WebEventHandler;


/**
 * This is a very simple example of a custom bean with only one property which
 *  can be updated through a custom event handler.
 * <p>Title: SampleCustomBean</p>
 * <p>Description: </p>
 * <p>Company: Microstrategy, Inc.</p>
 */

// AbstractAppComponent
public class HeaderBean extends AbstractPersistableAppComponent {
    // The text to be updated by SampleCustomEventHandler
    private String _param1;
    private String _param2;
    private String _documentID;
    private String _reportID;
    private String _server;
    private String _ServerNameG;

    /**
     * Constructor for this bean 
     */
    public HeaderBean() {
        super();
    }

    /**
     * Setter for the  property
     * @param value String - The new value for the property
     */
    public void setParam1(String value) {
        this._param1 = value;
    }

    public void setParam2(String value) {
        this._param2 = value;
    }

    public void setDocumentID(String value) {
        this._documentID = value;
    }
    
    public void setReportID(String value) {
        this._reportID = value;
    }

    public void setServer(String value) {
        this._server = value;
    }
    
    public void setServerNameG(String value) {
        this._ServerNameG = value;
    }

    /**
     * Getter for the property
     * @return String - The value of the property
     */
    public String getParam1() {
        return _param1;
    }

    public String getParam2() {
        return _param2;
    }

    public String getDocumentID() {
        return _documentID;
    }
    
    public String getReportID() {
        return _reportID;
    }

    public String getServer() {
        return _server;
    }
    
    public String getServerNameG() {
        return _ServerNameG;
    }

    /**
     * Method for saving and loading the state of a bean
     * @Override
     */
    protected void doFlatState(FlatStateSerializer input, int howMuchState, FlatStateTokenizer tokenizer) {
        boolean saving = (input != null);

        if (saving) {
            input.addStr(getParam1());
            input.addStr(getParam2());
            input.addStr(getDocumentID());
            input.addStr(getReportID());
	    input.addStr(getServer());
	    input.addStr(getServerNameG());
        } else {
            setParam1(tokenizer.nextStr());
            setParam2(tokenizer.nextStr());
            setDocumentID(tokenizer.nextStr());
            setReportID(tokenizer.nextStr());
	    setServer(tokenizer.nextStr());
	    setServerNameG(tokenizer.nextStr());
	     }
    }
    
}


