(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo.Wizard");mstrmojo.WizardSlide=mstrmojo.declare(mstrmojo.Container,null,{scriptClass:"mstrmojo.WizardSlide",name:"",markupString:'<div id="{@id}" class="mstrmojo-WizardSlide {@cssClass}"><div></div></div>',markupSlots:{containerNode:function(){return this.domNode.firstChild;}},markupMethods:{onvisibleChange:function(){this.domNode.style.display=this.visible?"block":"none";}},displayingSlide:function(){},aboutToGoNext:function(){},getNextSlide:function(){},getPreviousSlide:function(){}});})();