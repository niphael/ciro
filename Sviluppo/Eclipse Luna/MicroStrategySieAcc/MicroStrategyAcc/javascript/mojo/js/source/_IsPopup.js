(function(){mstrmojo._IsPopup={visible:false,opener:null,onOpen:null,onClose:null,open:function open(opener,config){if(this.updatePopupConfig){this.updatePopupConfig(config,opener);}else{if(config){for(var k in config){this.set(k,config[k]);}}}this.set("opener",opener);if(!this.hasRendered){this.render();}if(this.nudge){this.domNode.style.top="-10000px";}this.set("visible",true);if(this.nudge){this.nudge();}if(this.onOpen){this.onOpen();}},close:function cls(config){if(this.onClose){this.onClose(config);}this.set("visible",false);this.set("opener",null);}};})();