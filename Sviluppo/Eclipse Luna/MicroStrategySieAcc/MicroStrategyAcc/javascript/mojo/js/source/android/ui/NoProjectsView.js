(function(){mstrmojo.requiresCls("mstrmojo.Container");mstrmojo.requiresDescs(9936,9937);var IMAGE_MARGIN_BOTTOM=25,$DESC=mstrmojo.desc;mstrmojo.android.ui.NoProjectsView=mstrmojo.declare(mstrmojo.Container,null,{scriptClass:"mstrmojo.android.ui.NoProjectsView",markupString:'<div id="{@id}" class="mstrmojo-NoProjectsView"><div><div class="mstrmojo-NoProjectsViewImage"></div><div class="mstrmojo-NoProjectsViewMsg1">{@msg1}</div><div class="mstrmojo-NoProjectsViewMsg2">{@msg2}</div></div></div>',markupSlots:{wrapperNode:function(){return this.domNode.firstChild;}},markupMethods:{onheightChange:mstrmojo.Widget.heightMarkupMethod,onwidthChange:mstrmojo.Widget.widthMarkupMethod},preBuildRendering:function preBuildRendering(){this.msg1=$DESC(9936,"No projects have been configured.");this.msg2=$DESC(9937,"Contact your administrator");},postBuildRendering:function postBuildRendering(){this._super();var wrapperNode=this.wrapperNode;wrapperNode.style.marginTop=(-(wrapperNode.clientHeight/2)-IMAGE_MARGIN_BOTTOM)+"px";}});}());