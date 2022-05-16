<%@ taglib uri="/webUtilTL.tld" prefix="web" %>
<%@ page import="com.microstrategy.web.app.beans.PageComponent" %>

<div id="pagePlaceholder" ></div>

<script type="text/javascript">
 mstrmojo.App = mstrApp;

 var di=new mstrmojo.DataImport(
  {
    placeholder: 'pagePlaceholder',
    id:"DataImport"  
  });      
  
  di.render();
  di.initParams(mstrApp.diParams);
</script>
