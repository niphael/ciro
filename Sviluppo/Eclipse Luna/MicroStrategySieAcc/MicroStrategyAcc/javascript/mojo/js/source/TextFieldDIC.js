(function(){mstrmojo.requiresCls("mstrmojo.ValidationTextBox","mstrmojo._IsInputControl","mstrmojo.dom","mstrmojo.num");var _VAL=mstrmojo.validation,SC=_VAL.STATUSCODE,_VALIDATOR=_VAL.VALIDATOR,_DTP=mstrmojo.expr.DTP,NO_VALIDATION=0,PHONE_NO=1,EMAIL_ADDRESS=2,ZIP_CODE=3,SOCIAL_SECURITY_NO=4,REG_EXP=5;mstrmojo.TextFieldDIC=mstrmojo.declare(mstrmojo.ValidationTextBox,[mstrmojo._IsInputControl],{scriptClass:"mstrmojo.TextFieldDIC",cssClass:"mstrmojo-TextFieldDIC",dtp:_DTP.VARCHAR,validationDelay:0,getInputNode:function(){return this.inputNode;},focus:function(){this.validate();mstrmojo.dom.setCaret(this.domNode,(this.value&&this.value.length||0));},init:function(props){if(this._super){this._super(props);}this.constraints=mstrmojo.hash.copy();var di=props.dic,c=this.constraints={trigger:mstrmojo.validation.TRIGGER.ONKEYUP},dt=di.dt;if(di.ml){this.maxLength=di.ml;}if(di.psw){this.type="password";this.value=this.lv="";this.owner.applyPasswordMask&&this.owner.applyPasswordMask();}if(_VAL.isNumeric(dt)||_VAL.isInt(dt)||_VAL.isString(dt)){this.dtp=dt;}switch(di.vm){case PHONE_NO:c.validator=_VALIDATOR.VALIDATE_PHONENO;break;case EMAIL_ADDRESS:c.validator=_VALIDATOR.VALIDATE_EMAIL;break;case ZIP_CODE:c.validator=_VALIDATOR.VALIDATE_ZIPCODE;break;case SOCIAL_SECURITY_NO:c.validator=_VALIDATOR.VALIDATE_SSN;break;case REG_EXP:c.regExp=new RegExp("^"+di.rgx+"$");break;}c.min=di.emin?di.min:null;c.max=di.emax?di.max:null;c.maxLen=(di.ml!==undefined)?di.ml:null;c.minLen=(di.mnl!==undefined)?di.mnl:null;if(di.req||di.emin){this.required=true;}},onInvalid:function(){if(this.popup){this.popup.set("hasInvalidData",true);}},onValid:function(){if(this.popup){this.popup.set("hasInvalidData",false);}},applyChanges:function(){this.validate();if(this.isValid()){this._super();}else{this.handleInvalid();return false;}return true;},handleInvalid:function(){if(mstrmojo.all.mojoConfirmx9){return ;}var me=this;mstrmojo.confirm(this.validationStatus.msg+"<br>("+mstrmojo.desc(9199)+")",[{scriptClass:"mstrmojo.Button",text:mstrmojo.desc(1442),onclick:function(){me.focus();}},{scriptClass:"mstrmojo.Button",text:mstrmojo.desc(221),onclick:function(){me.popup.onCancel();}}],mstrmojo.desc(7548));},cancelChanges:function(){this.inputNode.blur();this.value=this.lv;this.clearValidation();}});})();