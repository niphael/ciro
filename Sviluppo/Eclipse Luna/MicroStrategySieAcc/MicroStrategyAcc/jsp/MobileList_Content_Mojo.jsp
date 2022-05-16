<%@ taglib uri="/webUtilTL.tld" prefix="web" %>

<div id="mobileConfigView"></div>
  
<script type="text/javascript">
    //Set application config.
    mstrConfig = {
      thousandsSep: '<web:value type="misc" name="thousandSeparator"/>',
      decimalSep: '<web:value type="misc" name="decimalSeparator"/>',
      listSep: '<web:value type="misc" name="listSeparator"/>',              
      taskURL: '<web:taskProcessorName type="admin"/>',              
      taskProcURL: '<web:taskProcessorName />',     
      mstrDescs: <web:bundleDescriptor name="mojo-mobile-list"/>,
      
      <web:ifFeature type="systemPreference" name="validateRandNum"><web:then>
 			validateRandNum: '<web:value type="httpSession" name="validateRandNum"/>',
 	  </web:then></web:ifFeature> 	  	  
      onMobileDevice: false
    };
    
   


    var mstrApp = {
        name: '<web:value type="config" name="servletDeploymentName"/>',
        jsRoot: '../javascript/',
        jsMojoRoot: '../javascript/mojo/js/source/',
        localeId: '<web:connectionValue property="locale"/>',
        helpUrl: '<web:value type="systemPreference" name="helpUrl" />',
        displayLocaleId: '<web:connectionValue property="displayLocaleID"/>',
        resourceFeedURL: '<web:resourceFeedName/>',
 	
        isTouchApp: function() {return false;}
    };   
   
    
</script>

 

    


<web:resource type="jsbundle" bundleName="mojo-coreui" debugBundleName="mojo-coreui-debug" />
<web:resource type="jsbundle" bundleName="mojo-mobile-list" />
<web:showBundleDescriptor name="mojo-mobile-list"/>
