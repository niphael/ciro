(function(){mstrmojo.requiresCls("mstrmojo.array");mstrmojo._HasBuilder={postBuildRendering:function postBldRndr(){if(!this.builtChildren){this.buildChildren();}return this._super();},getChildren:function getChildren(){return this.model.getChildren(this.node,false);},buildChildren:function bldChdn(noAddChildren){if(!this.builder||!this.model){return false;}if(this.children&&this.children.length){this.set("children",[]);}var m=this.model,children=this.builder.build(this.getChildren(),m,this.buildConfig);if(!noAddChildren){this.addChildren(children);}this.builtChildren=true;return(noAddChildren)?children:true;}};})();