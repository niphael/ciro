(function(){function measureDimension(node,dim,ch){var x=0,i=0,len=(ch&&ch.length)||0;if(!node||!ch){return x;}for(;i<len;i++){x+=ch[i][dim]();}return x;}function resolveChildrenToMeasure(ch,count){if(count===undefined||isNaN(count)){return ch;}return(ch&&[ch[count-1]]);}mstrmojo._CanMeasureChildren={height:function height(count){return measureDimension(this.domNode,"height",resolveChildrenToMeasure(this.children,count));},width:function width(count){return measureDimension(this.domNode,"width",resolveChildrenToMeasure(this.children,count));}};}());