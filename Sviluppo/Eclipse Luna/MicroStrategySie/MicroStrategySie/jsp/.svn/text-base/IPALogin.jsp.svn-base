<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<%@ page errorPage="JSP_Error.jsp"%><%@ page
	contentType="text/html; charset=UTF-8"%><%@ page
	import="com.microstrategy.web.app.utils.JavaScriptBundles"%><%@ taglib
	uri="/webUtilTL.tld" prefix="web"%>
<%@ page import="com.microstrategy.web.app.beans.PageComponent"%><%@ taglib
	uri="/webUtilTL.tld" prefix="web"%>
<%PageComponent mstrPage = (PageComponent)request.getAttribute("mstrPage");
%>

<%-- Start up the Web Statistics... --%>
<web:performanceTimer action="initialize" />
<web:performanceTimer action="start" />
<!--  favicon -->

<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=9" >
<link rel="shortcut icon" href="../style/mstr/images/favicon.ico"
	type="image/x-icon" />
<web:resource type="style" name="mstr/mstr.css" />
<web:resource type="style" name="mstr/mstrTheme.css" />
<!-- Base Mojo CSS file -->
<web:resource type="js-style" name="mojo/css/core.css"/>
<web:resource type="js-style" name="mojo/css/IPA/IPALogin-jsp.css"/>
<web:resource type="custom-style" />
<title>Cloud Operations Manager Login</title>

</head>
<body style="width:960px; margin:0 auto;"
	class="mstrWeb <web:ifConnectionValue><web:then>
	<web:value type='preference' name='colorTheme' />
	</web:then><web:else><web:value type='browserSetting' name='colorTheme' />
	</web:else></web:ifConnectionValue> 
	<web:ifFeature name='page-full-screen-mode'>
	<web:then> mstrFullScreen</web:then>
	</web:ifFeature><web:ifFeature name='dhtml'>
	<web:else> mstrHTML</web:else></web:ifFeature>
    <web:ifFeature name='doubleByte'><web:then> mstrDB</web:then></web:ifFeature>">
<table width="100%" cellspacing="0" cellpadding="0"
	class="mstrToolbarWrapper">

	<tr>
		<td>

		<div class="mstrHeader" id="mstrWeb_shortcutsBar"
			name="mstrWeb_shortcutsBar" iframe="true"><%--
		 Display the "shortcutsBar" section of the template as specified in pageConfig.xml (i.e. About_ShortcutsBar.jsp)
		 <jsp:include page="[a page section]" />
		--%> <jsp:include
			page='<%=mstrPage.getTemplateInfo().getSection("header")%>'
			flush="true" /></div>
		<div class="mstrPath" id="mstrWeb_path" name="mstrWeb_path"
			iframe="true"><%--
	 Display the "path" section of the template as specified in pageConfig.xml (i.e. Change_Password_Path.jsp)
	 <jsp:include page="[a page section]" />
	--%> <jsp:include
			page='<%=mstrPage.getTemplateInfo().getSection("path")%>'
			flush="true" /></div>

		</td>
	</tr>
</table>
<web:ifFeature name="IE6">
	<web:then>
		<web:descriptor key="mstrWeb.7912" />
	</web:then>
	<web:else>	
	
	<div id="ipaLoginContents" class='ipa-login-contents-div'>
		<div class="mstrError" id="mstrWeb_error" name="mstrWeb_error" iframe="true"></div>
		<div id="loginsection"></div>	
		<div id="authsection"></div>
	</div>
	
	</web:else>
</web:ifFeature>
</body>

<jsp:include page='<%=mstrPage.getTemplateInfo().getSection("footer")%>'
	flush="true" />
<script src="../javascript/mojo/js/source/mstrmojo.js"></script>
<script src="../javascript/mojo/js/source/Xhr.js"></script>
<script type="text/javascript">	
    mstrConfig = {
        taskURL: '<web:taskProcessorName/>'
    };

    var mstrApp = {
        name: '<web:value type="config" name="servletDeploymentName"/>',
        jsRoot: '../javascript/',
        jsMojoRoot: '../javascript/mojo/js/source/',
        localeId: '<web:connectionValue property="locale"/>',
        helpUrl: '<web:value type="systemPreference" name="helpUrl" />',
        displayLocaleId: '<web:connectionValue property="displayLocaleID"/>'
    };
  </script>

<script><!--
	if (! mstrConfig.taskURL)
	  mstrmojo.App.taskURL = mstrConfig.taskURL;

	mstrmojo.requiresCls("mstrmojo.Table","mstrmojo.Box","mstrmojo.VBox","mstrmojo.CheckBox",
			"mstrmojo.Label","mstrmojo.TextBox","mstrmojo.HBox","mstrmojo.HTMLButton",
			"mstrmojo.List","mstrmojo.ListHoriz","mstrmojo.ListBoxSelector","mstrmojo.ListBase2",
			"mstrmojo.SelectBox","mstrmojo.IPA.TopNavigation");

	mstrmojo.requiresDescs(806,8878,1161,1162,8879,4020,8880,8881,9183,274,1947,1948,298,5595,4611);
		
	 
	 var CONFIGPAGE_URL=mstrmojo.insert({
		  	scriptClass:"mstrmojo.Label",
		  	id:'cfgurl',		  	
		  	text: 'href="mstrIPAAdmin"'
		 });

	//to fix heights for various resolutions
	document.getElementById("ipaLoginContents").style.height = window.innerHeight-90 + "px";
		
	 	function _sortFunc(a,b){	    		    	
	    		var e = a.name == b.name;
				var r = a.name > b.name;
				if(e) { return 0;} 
				else if(r) {return 1;} 
				else {return -1;}
	    }
	    
	mstrmojo.all.topNavigation.children[1].set('visible',false);
	
	var allEnvs = '[' + mstrmojo.desc(9183, "All Environments") + ']';
	var environments = [];		
	 //we get the environments
	 mstrmojo.xhr.request('POST', mstrConfig.taskURL, {
	            success: function(res){ 
         			var resObj = res.elementList;        
         			var disabledEnv = 0; 		
         			var totalEnv = 0;
         			var loginModes;	          		 	
	          		for(var i=0; i < resObj.length; i++){
		          		if(typeof(resObj[i].enable)!='undefined' && typeof(resObj[i].port)=='undefined'){
		          			loginModes = [];
			          		totalEnv++
			          		if(resObj[i].enable !== "00"){ //something is enabled
								var name;
		          				if(resObj[i].name.length > 29) {
									name = resObj[i].name.substring(0, 29) + '...';								
								} else {
									name = resObj[i].name;
								}
								
		          				loginModes.push({name:'DssXmlAuthStandard',value:resObj[i].DssXmlAuthStandard});
		          				loginModes.push({name:'DssXmlAuthLDAP',value:resObj[i].DssXmlAuthLDAP});
		          				loginModes.push({name:'DssXmlAuthWarehousePassthrough',value:resObj[i].DssXmlAuthWarehousePassthrough});
		          				loginModes.push({name:'DssXmlAuthNTCredential',value:resObj[i].DssXmlAuthNTCredential});
		          				loginModes.push({name:'DssXmlAuthIntegrated',value:resObj[i].DssXmlAuthIntegrated});
		          				loginModes.push({name:'DssXmlAuthTrusted',value:resObj[i].DssXmlAuthTrusted});
		          						          											
			         			environments.push({name:name,id:resObj[i].id,fullName:resObj[i].name,loginModes:loginModes});
			         					         		
		          			}else if (resObj[i].enable === "00"){
		          				disabledEnv++;	
		          			}	  		
	          			}
	          		}

	          		//all the environments are disabled for monitoring and managing
	          		if(disabledEnv == totalEnv){
	          			mstrmojo.alert(mstrmojo.desc(8882,"No environment is enabled for monitoring and managing. Redirecting to Cloud Operations Manager Configuration Page"));
	    				setTimeout("window.location = mstrmojo.all.cfgurl.text.split('=')[1].split('\"')[1];",10);
	    				return;
	          		}

	          		if(environments.length > 0){
	          			environments.sort(_sortFunc);
	          			//add [All Environments]	          			
	          			environments.splice(0,0,{name: allEnvs,id:"",fullName: allEnvs,loginModes:[]});
	          		}
					
	          		createTable(false);
	  				createAuthModes();
	  				modeForAllEnv();
	    		},
		        failure:function(res){mstrmojo.alert("Failed to retrieve topology")},
		       }, {taskId: 'getEnvironmentNameTask',timestamp: null}
	  );

	 /**
	 *	calculates the mode for all environment, by going through all other environments login modes	
	 */
	 function modeForAllEnv(){
		var mode = 0; 
		var loginModes = [];
		var count = 0;

		for(var j=0;j<environments[1].loginModes.length;j++){
			for(var i=1; i<environments.length; i++){			
				mode = mode | parseInt(environments[i].loginModes[j].value);
				if(mode == 3){
					count++;
				}		
			}			
			loginModes.push({name:environments[1].loginModes[j].name,value:mode.toString()});
			mode = 0;
		}

		//TBD: more than 1 mode is enabled and default, so use std in this case??
		if(count > 0){
			
		}	
		
		environments[0].loginModes = loginModes;		
		dynamicLoginModes(environments[0].loginModes);		 
	 }
	 
	 /**
	 *	utility function to set or unset the login options
	 *	w: widget to set/unset
	 *	value: enable/disable/default
	 */	 
	 function setLoginOption(w, value){
		if(value === "0"){
			w.set('visible',false);
			w.set('checked',false);
		}
		if(value === "2"){
			w.set('visible',true);
			w.set('checked',false);
		}
		if(value === "3"){
			w.set('visible',true);
			w.set('checked',true);
		}		
	}

	 /**
	 *	Show login modes dynamiccally based on environment selection
	 *	Issue #724078 
	 */
	function dynamicLoginModes(loginModes){
		for(var i = 0; i < loginModes.length; i++){					
  			if(loginModes[i].name === 'DssXmlAuthStandard'){
				setLoginOption(mstrmojo.all.loginBox.children[6].children[0],loginModes[i].value);						
			}
			if(loginModes[i].name === 'DssXmlAuthLDAP'){
				setLoginOption(mstrmojo.all.loginBox.children[6].children[1],loginModes[i].value);						
			}					
			if(loginModes[i].name === 'DssXmlAuthWarehousePassthrough'){
				setLoginOption(mstrmojo.all.loginBox.children[6].children[2],loginModes[i].value);						
			}
			if(loginModes[i].name === 'DssXmlAuthNTCredential'){
				setLoginOption(mstrmojo.all.authBox.children[1],loginModes[i].value);						
			}
			if(loginModes[i].name === 'DssXmlAuthIntegrated'){
				setLoginOption(mstrmojo.all.authBox.children[2],loginModes[i].value);						
			}
			if(loginModes[i].name === 'DssXmlAuthTrusted'){
				setLoginOption(mstrmojo.all.authBox.children[3],loginModes[i].value);						
			}
  		} 
  		
  		//if all 3 login modes are visible=false then hide username, password and login button
  		if(mstrmojo.all.loginBox.children[6].children[0].visible==false &&
  				mstrmojo.all.loginBox.children[6].children[1].visible==false && 
  				mstrmojo.all.loginBox.children[6].children[2].visible==false){
  				mstrmojo.all.loginBox.children[0].set('visible',false);
  				mstrmojo.all.loginBox.children[1].set('visible',false);
  				mstrmojo.all.loginBox.children[2].set('visible',false);
  				mstrmojo.all.loginBox.children[3].set('visible',false);
  				mstrmojo.all.loginBox.children[8].set('visible',false); //login button
  		}


  		//if only std radio is enabled, hide that as well
  		if(mstrmojo.all.loginBox.children[6].children[1].visible==false && 
  				mstrmojo.all.loginBox.children[6].children[2].visible==false){
  			mstrmojo.all.loginBox.children[6].children[0].set('visible',false);
		} 
	}
	
	  
   	mstrmojo.insert({
   		scriptClass: "mstrmojo.Box",		
		placeholder: "mstrWeb_error", 
		id: "LoginErrorBox",
		visible: false,	
		cssClass:"ipa-login-errorBox",
   		children:[{
			scriptClass: "mstrmojo.Box",						
			cssClass: "ipa-login-alertbox",
			children: [
                  {
                      scriptClass: "mstrmojo.Label",
                      cssClass: "mstrAlertTitle",
                      text: mstrmojo.desc(806,"Error in Login") + ":",
                  },
                  {
                      scriptClass: "mstrmojo.Label",
                      cssClass: "mstrAlertMessage",
                      cssText:"margin-bottom:0;",
                      text: mstrmojo.desc(8878,"Display Error Message"),
                      alias: "errorLabel"
                  }
        	]
   		}]
  	}).render();

  
	function createTable(isMHA){
		mstrmojo.insert({ 
		scriptClass: "mstrmojo.Table",
        id: "loginBox",
        placeholder: "loginsection",
        alias: "loginBox",
        cssClass: "ipa-login-box",
		        	
        findSelectedLoginModeRadio:function(){
            var loginModes = this.children[6].children;			
            for (var i = 0 ; i < loginModes.length; i++){
            	if(loginModes[i].checked)
                	return i;
            }
        },
           
        login: function(){                
          	var wi = this.waitingIcon;
	 	  	wi.set('visible',true);
          	var u = this.username.value;
          	var p = this.password.value;
          	//var ac = this.mhacode.value;          	
          	var lb = mstrmojo.all.LoginErrorBox.children[0];
          	lb.parent.set('visible',false);
          	var auth = "";
          	var envId="";

          	if(this.selectEnvironmentBox.selectedIndex == 0){
              	envId = "";
          	}
          	else if(this.selectEnvironmentBox.selectedIndex == -1){
              	envId = "";
          	}else{
              	envId = this.selectEnvironmentBox.selectedItem.id;
          	}

          	
          	
          	var loginModeRadio = this.findSelectedLoginModeRadio();
          	debugger;
          	switch(loginModeRadio){
          		case 0: auth = 1; /* STD */
          				break;
          		case 1: auth = 16; /* LDAP */
          				break;
          		case 2: auth = 32; /* DB */
          				break;
          		default: auth = 1;
          				break;				 
          	}          	
          	          	
      	  	var requestParams ;
     		if(u=="") // Check if Username is empty, do not send request to Server       	
			{    			     			
     			wi.set('visible',false);
				lb.parent.set('visible',true);
				lb.children[1].set('text',"No user name provided.");	
				//lb.parent.render();			
				//window.setTimeout("window.location.reload();",5000);    
         	}
       		else{
       			//if (mstrmojo.all.loginBox.mhacode.enabled){
       				//requestParams=  {taskId: 'IPALoginTask',
            	   	//uid: u,
               		//pwd: p,
               		//envid:envId,
               		//accesscode: ac
           			//};
       			//}else{       				
       				requestParams=  {taskId: 'IPALoginTask',
                		uid: u,
                    	pwd: p,
                    	authmode:auth,
                    	envid:envId,
             		};       			
			
    	  		mstrmojo.xhr.request('POST', mstrConfig.taskURL, {
              		success: function(res){
    	  				var text = "";
    	  				if(res.envLoginMsgs.length > 0){ //there are some errors in login

        	  				//all env failed; no need of refresh
        	  				if(res.envLoginMsgs.length == environments.length-1){
        	  					text += "Total number of successfully logged in environments: 0" + "<br>";
        	  					text += "Total number of environments for which login failed: " + res.envLoginMsgs.length + "<br><br>";

        	  					text += "Messages:<br>";
        	  					for(var i = 0; i < res.envLoginMsgs.length;i++){
									text += res.envLoginMsgs[i].id + ": ";
									text += res.envLoginMsgs[i].msg + "<br>";									
        	  					}
    	  						wi.set('visible',false);
    	  						lb.parent.set('visible',true);
    	  						lb.children[1].set('text',text);	
    	  						//lb.parent.render();    	  		
    	  						//window.setTimeout("window.location.reload();",5000);    				
        	  				}else{
        	  				    if (envId === ""){
        	  				    	//Go to landing page if there is at least one successful login
		        	  				wi.set('visible',false);	      
		              				window.location.reload();
        	  				    } 
        	  				    else {//dropdown selection on some env other than ALL
            	  					//show message for some time and reload to landing page
	        	  					for(var i = 0; i < res.envLoginMsgs.length;i++){
										text += "Environment:" + " " + res.envLoginMsgs[i].id + "<br>";
										text += res.envLoginMsgs[i].msg + "<br><br>";
	        	  					}
		        	  						        	  					
            	  					if(res.envLoginMsgs.length == 1){
        	  							text += "Logins succeeded: 0" + "<br>";
        	  							text += "Logins failed: 1" + "<br><br>";
            	  					}else{
            	  						text += "Logins succeeded: 1" + "<br>";
        	  							text += "Logins failed: 0" + "<br><br>";
        	  							window.setTimeout("window.location.reload();",5000);
            	  					}        	  					        	  					
	        	  					
	    	  						wi.set('visible',false);
	    	  						lb.parent.set('visible',true);
	    	  						lb.children[1].set('text',text);
	    	  						//lb.parent.render();
    	  						}    	  						    	  							
        	  				}	
    	  				}else{
        	  				//no errors go to landing page
        	  				wi.set('visible',false);	      
              				window.location.reload();
    	  				}
    	  	  		},
              		failure:function(res){                  		
    		  			wi.set('visible',false);
    		  			lb.parent.set('visible',true);
    		  			lb.errorLabel.set('text',res.getResponseHeader("X-MSTR-TaskFailureMsg"));
    	  	  		},
          		}, requestParams);  
       		}
          },          
		
        cellPadding: 1,
        cols: 3,
        rows: 9,
        children:[
                  {
                      scriptClass: "mstrmojo.Label",                      
                      cssClass: "ipa-login-username-lbl",
                      text: mstrmojo.desc(1161), // "User name:"
                      slot: "0,0"
                  },
                  {
                      scriptClass: "mstrmojo.TextBox",
                      cssClass: "ipa-login-textbox",
                      alias: "username",
                      slot: "1,0",                                                
                      onEnter: function() {               
                    	this.parent.login();
                 	  }
                  },
                  {
                      scriptClass: "mstrmojo.Label",
                      cssClass: "ipa-login-password-lbl",
                      text: mstrmojo.desc(1162), // "Password:"
                      slot: "2,0",
                  },
                  {
                	  slot: "3,0",
                      scriptClass: "mstrmojo.TextBox",
                      cssClass: "ipa-login-textbox",
                      type: "password",
                      alias: "password",
                      onEnter: function() {               
                    	this.parent.login();
                    }
                  }, 
                  {
                	  slot: "4,0",
                	  scriptClass: "mstrmojo.Label",
                	  cssClass: "ipa-login-environments-lbl",
                      text: mstrmojo.desc(8881,"Environment") + ":",                      
                  },
                  {
                	  slot: "5,0",
                	  scriptClass: "mstrmojo.SelectBox",
                	  alias:'selectEnvironmentBox',
                	  itemDisplayField : "name",
                	  showItemTooltip: true,
   		  		   	  itemIdField : 'fullName',
   		  		   	  size:1,   		  		   	  
   		  		   	  cssClass :"ipa-login-selectbox",   		  		   	  
   		  		 	  bindings:{   	   		  		 	  
  	  					items:'environments'	
					  },

					  onselectionChange: function onselchg(evt){
			                if (!this._syncDom) {
			                    this._super(evt);
			                }			                
			                dynamicLoginModes(this.selectedItem.loginModes);			                
			          },

                 	  //overwrite itemrenderer to show tooltips
                 	 itemRenderer: {
                          render: function(/*Object*/ item, /*Integer*/ idx, /*Widget*/ widget) {
                              var itemNm = mstrmojo.string.htmlAngles((widget.getItemName) ? widget.getItemName(item, idx) : (widget.itemDisplayField && item[widget.itemDisplayField]));                              
                              return '<option class="' + widget.itemCssClass + '" ' +
                                          'value="' + ((widget.getItemValue) ? widget.getItemValue(item, idx) : (widget.itemIdField && item[widget.itemIdField])) + '" ' + 
                                          ((widget.selectedIndices[idx]) ? 'selected="true" ' : '') + ((widget.showItemTooltip)? 'title="' + mstrmojo.string.encodeXMLAttribute(item[widget.itemIdField])+ '"' : '') + '>' +
                                              itemNm + 
                                     '</option>';
                          },
                          select: function(/*DomNode*/ el, /*Object*/ item, /*Integer*/ idx, /*Widget*/ widget) {
                              el.selected = true;
                          },
                          unselect: function(/*DomNode*/ el, /*Object*/ item, /*Integer*/ idx, /*Widget*/ widget) {
                              el.selected = false;
                          }
                      },                 	 
                  },
                  {
                      slot: "6,0",
                      scriptClass:"mstrmojo.Table",
                      cssClass:"ipa-login-modes-tbl",
                      rows:3,
                      cols:1,
                      children:[
                         {
                             	scriptClass:"mstrmojo.RadioButton",
                             	label:mstrmojo.desc(274,"Standard (user name & password)"),
                             	slot:"0,0",
                             	checked:true,
                             	onclick:function(){
     								if(this.checked){
     									this.parent.children[1].set('checked',false);
     									this.parent.children[2].set('checked',false);
     								}
     							}
                         },	
                         {
                          	scriptClass:"mstrmojo.RadioButton",
                          	label:mstrmojo.desc(1947,"LDAP Authentication"),
                          	slot:"1,0",
                          	checked:false,
                          	onclick:function(){
								if(this.checked){
									this.parent.children[0].set('checked',false);
									this.parent.children[2].set('checked',false);
								}
							}
                      	 },
                      	{
                          	scriptClass:"mstrmojo.RadioButton",
                          	label:mstrmojo.desc(1948,"Database Authentication"),
                          	slot:"2,0",
                          	checked:false,
                          	onclick:function(){
								if(this.checked){
									this.parent.children[0].set('checked',false);
									this.parent.children[1].set('checked',false);
								}
							}
                      	}       
                      ]
                  },
                  {
                	  slot: "7,0",
                      scriptClass: "mstrmojo.Label",
                      cssClass: "ipa-login-filler-lbl",
                  },
                  {
                      slot: "7,0",
                      scriptClass: "mstrmojo.HTMLButton",
                      alias: "loginButton", 
                      text: mstrmojo.desc(4020), // "Login"                      
                      cssClass: "ipa-login-btn",
                      onclick: function(){
                      	this.parent.login();	                	  
                      }
                  },  
                  {
                      slot: "8,2",
                      scriptClass: "mstrmojo.WaitIcon",
                      visible: false,
                      cssClass:"ipa-login-waiticon",
                      alias: "waitingIcon"
                  }
        ]}).render();
	}

	function createAuthModes(){
		mstrmojo.insert({ 
			scriptClass: "mstrmojo.Box",
			cssClass:"ipa-login-authbox",	        
	        placeholder: "authsection",
	        id:'authBox',

	        login:function(mode){
				var envId = "";
				var wi = mstrmojo.all.loginBox.children[9];
				var lb = mstrmojo.all.LoginErrorBox.children[0];
				lb.parent.set('visible',false);  
		 	  	wi.set('visible',true);
				
		 		if(mstrmojo.all.loginBox.children[5].selectedIndex == 0){
            		envId = "";
        		}else if(mstrmojo.all.loginBox.children[5].selectedIndex == -1){
            		envId = "";
        		}else{
            		envId = mstrmojo.all.loginBox.children[5].selectedItem.id;
        		}
    	  		var requestParams=  {taskId: 'IPALoginTask',
          			uid: "",
              		pwd: "",
              		authmode:mode,
              		envid:envId,
       			};
       		    
    	 	 	mstrmojo.xhr.request('POST', mstrConfig.taskURL, {
        			success: function(res){
	  				var text = "";
	  				if(res.envLoginMsgs.length > 0){ //there are some errors in login

    	  				//all env failed; no need of refresh
    	  				if(res.envLoginMsgs.length == environments.length-1){
    	  					for(var i = 0; i < res.envLoginMsgs.length;i++){
								text += "Environment:" + " " + res.envLoginMsgs[i].id + "<br>";
								text += res.envLoginMsgs[i].msg + "<br><br>";									
    	  					}        	  					
    	  					text += "Logins succeeded: 0" + "<br>";
    	  					text += "Logins failed: " + res.envLoginMsgs.length + "<br>";        	  					
    	  					
	  						wi.set('visible',false);
	  						lb.parent.set('visible',true);
	  						lb.children[1].set('text',text);	
	  						//lb.parent.render();    	  		
	  						//window.setTimeout("window.location.reload();",5000);    				
    	  				}else{
        	  				//show message for some time and reload to landing page
    	  					for(var i = 0; i < res.envLoginMsgs.length;i++){
								text += "Environment:" + " " + res.envLoginMsgs[i].id + "<br>";
								text += res.envLoginMsgs[i].msg + "<br><br>";
    	  					}

    	  					if(envId === "") //all env was selected
        	  				{
    	  						var succeeded = environments.length-res.envLoginMsgs.length - 1
    	  						text += "Logins succeeded: " + succeeded + "<br>";
    	  						text += "Logins failed: " + res.envLoginMsgs.length + "<br>";
    	  						window.setTimeout("window.location.reload();",5000);
    	  					}else{ //dropdown selection on some env other than ALL
        	  					if(res.envLoginMsgs.length == 1){
    	  							text += "Logins succeeded: 0" + "<br>";
    	  							text += "Logins failed: 1" + "<br><br>";
        	  					}else{
        	  						text += "Logins succeeded: 1" + "<br>";
    	  							text += "Logins failed: 0" + "<br><br>";
    	  							window.setTimeout("window.location.reload();",5000);
        	  					}
    	  					}
    	  					        	  					
    	  					
	  						wi.set('visible',false);
	  						lb.parent.set('visible',true);
	  						lb.children[1].set('text',text);
	  						//lb.parent.render();    	  						    	  							
    	  				}	
	  				}else{
    	  				//no errors go to landing page
    	  				wi.set('visible',false);	      
          				window.location.reload();
	  				}	  	  			},
        			failure:function(res){
		  				wi.set('visible',false);
		  				lb.parent.set('visible',true);
		  				lb.errorLabel.set('text',res.getResponseHeader("X-MSTR-TaskFailureMsg"));
	  	  			},
    			}, requestParams);  	        	
			},
			
	        children:[
	                  {    
                          scriptClass:"mstrmojo.Button",
                          cssClass:"ipa-login-auth-btn",
                          text:"Guest User",
                          visible:false,
                          onclick:function(){                          	
                          	this.parent.login(8);
                      	  }			              
                      },
                      {
    		            scriptClass:"mstrmojo.HBox",
    			        children:[
    		    		  {
    				        scriptClass:"mstrmojo.Label",
    		                cssClass:"ipa-login-auth-bg",    				              	
    				      },
    				      {
                          	scriptClass:"mstrmojo.Button",                          
                          	cssClass:"ipa-login-auth-btn",
                          	text:mstrmojo.desc(298,"Windows Authentication"),
                          	onclick:function(){                          	
	                    	  	this.parent.parent.login(2);
                    	  }}]
                      },
                      {
                    	  scriptClass:"mstrmojo.HBox",
          			      children:[
          		    		 {
          				        scriptClass:"mstrmojo.Label",
          		                cssClass:"ipa-login-auth-bg",    				              	
          				      },
          				      {
                          		scriptClass:"mstrmojo.Button",
                          		cssClass:"ipa-login-auth-btn",
                          		text:mstrmojo.desc(5595,"Integrated Authentication"),
                          		onclick:function(){                          	
                    	  			this.parent.parent.login(128);
                    	  		}}]
                      },
                      {
      		            scriptClass:"mstrmojo.HBox",
      			        children:[
      		    		  {
      				        scriptClass:"mstrmojo.Label",
      		                cssClass:"ipa-login-auth-bg",    				              	
      				      },
      				      {
                          	scriptClass:"mstrmojo.Button",
                          	cssClass:"ipa-login-auth-btn",
                          	text:mstrmojo.desc(4611,"Trusted Authentication Request"),
                          	onclick:function(){                          	
                    	  		this.parent.parent.login(64);
                    	  	}}]
                      }            
               	  ]
		}).render();
	}		
 
 </script>

</html>