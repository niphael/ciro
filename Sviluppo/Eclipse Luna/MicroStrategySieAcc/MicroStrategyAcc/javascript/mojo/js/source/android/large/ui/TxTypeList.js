(function(){mstrmojo.requiresCls("mstrmojo.android.SimpleList");var itemMarkup;mstrmojo.android.large.ui.TxTypeList=mstrmojo.declare(mstrmojo.android.SimpleList,null,{scriptClass:"mstrmojo.android.large.ui.TxTypeList",getItemMarkup:function(item){if(!itemMarkup){itemMarkup='<div class="item {@cls}" idx="{@idx}" style="{@style}"><h3>{@n}</h3><em>{@cnt}</em></div>';}return itemMarkup;},getItemProps:function getItemProps(item,idx){var props=this._super(item,idx);props.cnt=item.v;return props;}});}());