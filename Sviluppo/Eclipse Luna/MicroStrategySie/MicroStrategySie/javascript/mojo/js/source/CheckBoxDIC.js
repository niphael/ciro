(function(){mstrmojo.requiresCls("mstrmojo.TristateCheckBox","mstrmojo._IsInputControl");mstrmojo.CheckBoxDIC=mstrmojo.declare(mstrmojo.TristateCheckBox,[mstrmojo._IsInputControl],{scriptClass:"mstrmojo.CheckBoxDIC",markupString:'<div id="{@id}" class="mstrmojo-Label {@cssClass}" style="{@cssText}" tabindex="1" mstrAttach:click,keydown></div>',cssText:"width: 0; margin:0 auto; max-height: 18px; cursor: pointer;",onclick:function(){if(this.grayed){this.set("grayed",!this.grayed);this.set("checked",true);}else{this.set("checked",!this.checked);}},oncheckedChange:function(e){this.set("value",this[this.checked?"onValue":"offValue"]);},preBuildRendering:function(){this._super();var vls=this.dic.vls;this.offValue=vls[0].v;this.onValue=vls[1].v;this.grayed=(this.onValue!==this.value)&&(this.offValue!==this.value);this.checked=(this.onValue===this.value);},postBuildRendering:function(){this._super();this.domNode.style.height=this.openerStyle.ih+"px";},onkeydown:function(evt){var hWin=evt.hWin,e=evt.e||hWin.event;if(e.keyCode===mstrmojo.Enum_Keys.SPACE){mstrmojo.dom.preventDefault(hWin,e);this.onclick();}},focus:function(){this.domNode.focus();}});})();