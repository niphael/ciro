<%@ taglib uri="/webUtilTL.tld" prefix="web" %>
<%@ page import="com.microstrategy.web.app.beans.PageComponent" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd " >

<html>
<head>
<web:metaContentType/>
<title>MicroStrategy Architect</title>
<link rel="shortcut icon" href="../style/mstr/images/favicon.ico" type="image/x-icon" />
<web:resource type="js-style" name="mojo/css/core.css"/>
<web:resource type="js-style" name="mojo/css/architect.css"/>

<body>
<div id="pagePlaceholder"></div>
<script type="text/javascript">
	//Set application globals.
	
	var mstrApp = {
		Privs : '<web:connectionValue property="privsXML"/>',
		FlashResBundleURL : '<web:value name="resBundles/DashboardViewerBundle_" type="flashResURL"/>',    
		name: '<web:value type="config" name="servletDeploymentName"/>',
		pageName: '<web:beanValue property="name"/>',
		//_JSP[    
		<%-- no need to add jsession id for asp --%>
		<web:ifFeature type="systemPreference" name="useCookies" value="1"><web:then><%-- add jsessionid only cookie is not disabled --%>
		 sessionId: '<web:connectionValue property="containerSessionId" />',
		</web:then></web:ifFeature>
		 //_JSP]  
		sessionState:'<web:connectionValue property="sessionState"/>',
		servletState: '<web:connectionValue property="servletState"/>',
		localeId: '<web:connectionValue property="locale"/>',
		displayLocaleId: '<web:connectionValue property="displayLocaleID"/>',
		thousandsSep: '<web:value type="misc" name="thousandSeparator"/>',
		decimalSep: '<web:value type="misc" name="decimalSeparator"/>',
		listSep: '<web:value type="misc" name="listSeparator"/>',
		taskURL: '<web:taskProcessorName />',
		jsRoot: '../javascript/',   <%-- TODO: Need to send down actual value --%>
		jsMojoRoot: '../javascript/mojo/js/source/',
		mstrDescs : <web:bundleDescriptor name="mojo-oivm"/>,
		persistTaskParams: <web:value type="persistParameters" name=""/>,
		getPersistParams: function () {return this.persistTaskParams;},
		isOIVM: function() {return true;}
	};
	
</script>
<web:resource type="jsbundle" bundleName="mojo-bootstrap" />
<web:resource type="jsbundle" bundleName="mojo-pm" />

<script type="text/javascript">
   mstrmojo.App = mstrApp;
   var manager=new mstrmojo.Architect.ProjectManager({
	 id:'ProjectManager',
     placeholder: 'pagePlaceholder'
   });
    manager.render();
</script>

<%-- <div  style="visibility:hidden; postion: absoulte; top: 100px; left:100px" id="progress">
  This Process may take several minutes, please wait..<div></div>
<img id="progress_image" src="../style/mstr/images/loader.gif" alt="Loading..."/> </div>
--%>

</body>
</html>