(function(){mstrmojo.requiresCls("mstrmojo.mstr.EnumFunction","mstrmojo.mstr.EnumWebFunctionType","mstrmojo.mstr.EnumExpressionType","mstrmojo.mstr.EnumNodeType","mstrmojo.mstr.EnumDataType","mstrmojo.mstr.WebOperatorNode","mstrmojo.mstr.WebFormShortcutNode","mstrmojo.mstr.WebConstantNode","mstrmojo.mstr.WebTimeNode");var $F=mstrmojo.mstr.EnumFunction,$F_TP=mstrmojo.mstr.EnumWebFunctionType,$EXP_TP=mstrmojo.mstr.EnumExpressionType,$N_T=mstrmojo.mstr.EnumNodeType,$D_T=mstrmojo.mstr.EnumDataType;mstrmojo.mstr.WebExpression=mstrmojo.declare(mstrmojo.Obj,null,{scriptClass:"mstrmojo.mstr.WebExpression",rottNode:null,init:function(props){if(!props){props={};}if(!props.rootNode){props.rootNode=new mstrmojo.mstr.WebOperatorNode({exprType:$EXP_TP.FilterBranchQual,funcType:$F_TP.WebFunctionTypeGeneric,func:$F.FunctionAnd});}if(this._super){this._super(props);}},createOperatorNode:function createOperatorNode(expressionType,func,parent){if(!parent){parent=this.rootNode;}var node=new mstrmojo.mstr.WebOperatorNode({exprType:expressionType});node.set("func",func);parent.appendChild(node);return node;},createFormShortcutNode:function createFormShortcutNode(attr,form,parent){if(!parent){parent=this.rootNode;}var node=new mstrmojo.mstr.WebFormShortcutNode({attribute:attr,form:form});parent.appendChild(node);return node;},createValueNode:function createValueNode(value,dataType,parent){var node=null;switch(dataType){case $D_T.DataTypeDate:case $D_T.DataTypeTime:case $D_T.DataTypeTimeStamp:return this.createTimeNode(value,parent);default:return this.createConstantNode(value,dataType,parent);}},createConstantNode:function createConstantNode(value,dataType,parent){if(!parent){parent=this.rootNode;}var node=new mstrmojo.mstr.WebConstantNode({value:value,type:dataType});parent.appendChild(node);return node;},createTimeNode:function(time,parent){var node=new mstrmojo.mstr.WebTimeNode({value:time});if(!parent){parent=this.rootNode;}parent.appendChild(node);return node;},newAQSubExpression:function(attr,form,func,dt,value){if(func<0){func=$F.FunctionEquals;}var subExpr=this.createOperatorNode($EXP_TP.FilterSingleBaseFormQual,func),fmNode=this.createFormShortcutNode(attr,form,subExpr),valNode=this.createValueNode(value,dt,subExpr);return subExpr;},buildShortXML:function buildShortXML(builder){builder.addChild("exp");var rt=this.rootNode;if(rt){if(rt.exprType==$EXP_TP.FilterBranchQual&&rt.nodeType==$N_T.NodeOperator){if(!rt.childNodes||!rt.childNodes.length){}else{if(rt.childNodes.length==1){if(rt.func==$F.FunctionAnd||rt.func==$F.FunctionOr){rt.childNodes[0].buildShortXML(builder);}else{rt.buildShortXML(builder);}}else{rt.buildShortXML(builder);}}}else{rt.buildShortXML(builder);}}builder.closeElement();}});})();