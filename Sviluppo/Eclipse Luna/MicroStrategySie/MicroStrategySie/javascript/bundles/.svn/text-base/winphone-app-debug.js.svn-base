(function() {
    
    mstrmojo.StringBuffer = mstrmojo.declare(
        null, 
        null,
        
        {
            scriptClass: 'mstrmojo.StringBuffer',
            
            
            append: function append(txt) {
                if (!this.buf) {
                    this.reset();
                }
                this.buf[++this.len] = txt;
                return this; 
            },
            
            
            reset: function reset() {
                this.buf = [];
                this.len = -1;
            }
        }
    );

        
    mstrmojo.StringBuffer.prototype.toString = function(sep) {
        var buf = this.buf;
        return (buf && buf.join(sep || '')) || '';         
    }
})();

 
mstrmojo.mstr.EnumWebAPIErrorCodes = {
    	MSI_INBOX_MSG_NOT_FOUND:                    -2147468986, 
		E_MSI_USERMGR_USER_NOTFOUND:                -2147209051, 
		AUTHEN_E_LOGIN_FAIL_EXPIRED_PWD:            -2147216963, 
		AUTHEN_E_LOGIN_FAILED_NEW_PASSWORD_REQD:    -2147216960, 
		AUTHEN_E_LOGIN_FAIL:						-2147216959, 

		
		E_UNUSED: 0xFFFFFFFF
};
(function() {
    
    mstrmojo.requiresCls("mstrmojo.StringBuffer",
                         "mstrmojo.hash");
    
    var CLASS_NAME = 'AndroidServerTransport';
    
    
    mstrmojo.android.AndroidServerTransport = {
            
        
        serverRequest: function serverRequest(id, requestId, request) {
            
            var url = new mstrmojo.StringBuffer(),
                urlStr, rqst;
            mstrmojo.hash.forEach(request.params, function (v, n) {
                url.append(n + '=' + encodeURIComponent(v));
            });
            urlStr = request.taskURL + '?' + url.toString('&');
            request.params.hostUrl = request.taskURL;
            if ( mstrApp.useBinaryFormat) {
                rqst = JSON.stringify({
                    params: request.params,
                    url: urlStr
                });
            } else {
                rqst = urlStr;
            }
            
            $MAPF(true, CLASS_NAME, 'transportRequest');
            
            
            mstrMobileTransport.serverRequest(id, requestId, rqst, 'response', 'progress');
        },
        
        
        cancelRequest: function cancelRequest(requestId) {
            $MAPF(false, CLASS_NAME, 'transportRequest');
            
            return mstrMobileTransport.cancelRequest(requestId);
        }
    };
    
})();
(function () {

    mstrmojo.requiresCls("mstrmojo.hash",
                         "mstrmojo.func",
                         "mstrmojo.Obj");

    var $HASH = mstrmojo.hash;
    
    
    var cnt = 0;

    
    var requestQueue = [];

    
    var graphRequests = {};

    
    var holdForGraphs = false;

    
    function handleSubmission(request) {
        var callback = request.callback;

        
        if (callback.submission) {
            
            callback.submission( this.userInteractionRequired( request ) );
        }

        
        this.submitRequest(request);
    }

    
    function submitNextInQueue() {
        
    	
    	
        if (requestQueue.length && !holdForGraphs) {
            
            handleSubmission.call(this, requestQueue.shift());
        }
    }

    
    mstrmojo.ServerProxy = mstrmojo.declare(
        mstrmojo.Obj,

        null,

        
        {
            scriptClass: 'mstrmojo.ServerProxy',

            
            transport: null,

            cnt: 0,

            
            request: function request(callback, params, override, config) {
                
                if (override) {
                    this.cancelRequests();
                }

                var proxyId = this.id,
                    transport = this.transport,
                    requestId = mstrmojo.now() + params.taskId + cnt++,
                    callbackCancel = callback.canceled || mstrmojo.emptyFn;

                
                callback.canceled = function (id) {
                    
                    callbackCancel();

                    
                    callback.complete(true);

                    
                    return transport.cancelRequest(id);
                };

                
                callback = mstrmojo.func.wrapMethods(callback, {
                    complete: function (id) {
                        
                        mstrmojo.all[proxyId].deleteRequest(id);
                    }
                });

                
                
                
                var existingRequests = !$HASH.isEmpty(this._requests),
                    newRequest = this.createRequest(requestId, callback, params, config),
                    
                    holdRequests = (holdForGraphs || existingRequests) && ! config.doNotHold;

                
                if (holdRequests) {
                    
                    requestQueue.push(newRequest);
                } else {
                    
                    handleSubmission.call(this, newRequest);
                }
            },

            
            createRequest: function createRequest(requestId, callback, params, config) {
                var reqsCollection = this._requests;

                
                if (!reqsCollection) {
                    
                    reqsCollection = this._requests = {};
                }

                
                var request = reqsCollection[requestId] = {
                    id: requestId,
                    callback: callback,
                    params: params,
                    config: config
                };

                
                return request;
            },

            
            submitRequest: function submitRequest(request) {
                this.transport.serverRequest(this.id, request.id, request);
            },

            
            cancelRequests: function cancelRequests() {
                var didCancel = false;

                
                $HASH.forEach(this._requests, function (request) {
                    
                    if (typeof request.gotResponse === "undefined") {
                        
                        didCancel |= request.callback.canceled(request.id);
                    }
                });

                
                this._requests = {};

                
                requestQueue = [];

                
                return didCancel;
            },

            
            response: function response(requestId, status, res) {

                
                $MAPF(false, "AndroidServerTransport", 'transportRequest');

                
                var request = this.getRequest(requestId);
                if (request) {
                    
                
                request.gotResponse = true;

                    
                var callback = request.callback,
                    methodName = (status && !res.mstrerr) ? 'success' : 'failure';  

                try {
                    
                    if (callback[methodName]) {
                        
                        callback[methodName](res, request);
                    }
                } finally {
                    
                    callback.complete(requestId);
                }
                }

                
                submitNextInQueue.call(this);
            },

            
            deleteRequest: function deleteRequest(requestId) {
                var requestCollection = this._requests;
                delete requestCollection[requestId];
            },

            
            getRequest: function getRequest(requestId) {
                var requestCollection = this._requests;
                return requestCollection && requestCollection[requestId];
            },
      
                  
            userInteractionRequired: function userInteractionRequired(request) {
                return false;
            },

            
            addLoadingGraph: function addLoadingGraph(key) {
                
                graphRequests[key] = true;

                
                holdForGraphs = true;
            },

            
            removeLoadingGraph: function removeLoadingGraph(key) {
                
                delete graphRequests[key];

                
                if ($HASH.isEmpty(graphRequests)) {
                    
                    holdForGraphs = false;

                    
                    submitNextInQueue.call(this);
                }
            }
        }
    );
}());
(function() {
    
    mstrmojo.requiresCls("mstrmojo.Obj");
    
    var $DOM = mstrmojo.dom;

        
    function removeChildren(node) {

        if ( node.hasChildNodes() )
        {
            while ( node.childNodes.length >= 1 )
            {
                node.removeChild( node.firstChild );       
            } 
        }       
    }
    
          
    function animatePageTurn(cmdCode, duration) {               

        var pages = this.getPages.call(this),
        curVisPage = pages.current,
        nextVisPage = pages.next,
        me = this;

        var curPageOffset = 0, 
        nextPageOffset = 0,
        nextPageInit = 0, 
        nextPageEnd = 0,
        nextOffsetWidth = nextVisPage.offsetWidth;          

        if(cmdCode.an === this.ANIMATION_FORWARD) {
            nextPageEnd = -nextOffsetWidth;
            nextPageOffset = nextOffsetWidth;

        } else {

            nextPageInit = -nextOffsetWidth;
            curPageOffset = nextOffsetWidth;
        }                

        $DOM.translate(curVisPage, curPageOffset, 0, 0);
        $DOM.translate(nextVisPage, nextPageOffset, 0, 0);

        animatePage(nextPageInit, nextPageEnd, duration, {
            target: me.sliderNode,
            duration: duration,
            onEnd: function(){
                me.finishTurn.call(me);
            },                
            preStart : function(){
                this.target.style.overflowY = "hidden";
            }
        });                  
    }
      
    function animatePage(start, stop, duration, props) {
        var cfg = mstrmojo.hash.copy(props, {
            props: {
                left: { 
                    isStyle: true, 
                    start: start, 
                    stop: stop, 
                    suffix: 'px', 
                    ease: mstrmojo.ease.linear
                }
            },
            duration: duration
        });

        (new mstrmojo.fx.AnimateProp(cfg)).play();     
    }       

    
    mstrmojo.winphone._IsMobileBookletWinPhone = {
            
        _mixinName: 'mstrmojo.winphone._IsMobileBookletWinPhone',
        
        cleanCurrentPage: function cleanCurrentPage(page) {
            removeChildren(page);
        },  
        
        
        turnPageAnimation: function turnPageAnimation(position, command, className) {                
            
            animatePageTurn.call(this, command, 500);
        },  
        
                   
        moveNextView: function moveNextView(nextVisPage, sliderPosition) {                

        },        
        
        
        hideMessage: function hideMessage() {

            var msgNode = this.msg.domNode;

            (new mstrmojo.fx.FadeOut({
                target: msgNode
            })).play();
            mstrmojo.css.parkAfterFade({
                target: msgNode
            });
        }
    };
}());
(function() {

    mstrmojo.requiresCls("mstrmojo.MobileDoc", 
                         "mstrmojo.winphone._IsMobileBookletWinPhone");      
    
    
    mstrmojo.winphone.MobileDoc = mstrmojo.declare(
            
        mstrmojo.MobileDoc,

        [ mstrmojo.winphone._IsMobileBookletWinPhone ],

        
        {
            scriptClass: "mstrmojo.winphone.RootView"
        });
})();
(function() {

    mstrmojo.requiresCls("mstrmojo.android.medium.RootView", 
                         "mstrmojo.winphone._IsMobileBookletWinPhone");      
    
    
    mstrmojo.winphone.RootView = mstrmojo.declare(
            
        mstrmojo.android.medium.RootView,

        [ mstrmojo.winphone._IsMobileBookletWinPhone ],

        
        {
            scriptClass: "mstrmojo.winphone.RootView"
        });
})();
(function () {

    mstrmojo.requiresCls("mstrmojo.Button",
                         "mstrmojo.css",
                         "mstrmojo.hash");

    var $CSS = mstrmojo.css,
        $HASH = mstrmojo.hash,
        cssGlow = 'glow';

    
    var $BTN = mstrmojo.android.ui.Button = mstrmojo.declare(
        mstrmojo.Button,

        [ mstrmojo._TouchGestures ],

        
        {
            scriptClass: 'mstrmojo.android.ui.Button',

            onclick: mstrmojo.emptyFn,

            touchBegin: function touchBegin() {
                
            	if ( this.enabled ) {
                    $CSS.addClass(this.domNode, cssGlow);
            	}
            }, 

            touchTap: function touchTap(touch) {
                
            	if ( this.enabled ) {
	                this.onclick({
	                    e: touch.evt
	                });
            	}
            },

            
            touchSelectBegin: mstrmojo.emptyFn,

            touchSelectEnd: function touchSelectEnd(touch) {
                
            	if ( this.enabled ) {
                    this.onclick({
                        e: touch.evt
                    });
            	}
            },

            touchEnd: function touchEnd() {
                
                $CSS.removeClass(this.domNode, cssGlow);
            }
        }
    );

    
    $BTN.prototype.markupString = $BTN.prototype.markupString.replace(new RegExp(' mstrAttach:[a-zA-Z,]*'), '');

    
    $BTN.newButton = function newButton(text, fnClick, props) {
        
        var btn = {
            scriptClass: 'mstrmojo.android.ui.Button',
            text: text
        };

        
        if (fnClick) {
            btn.onclick = fnClick;
        }

        
        $HASH.copy(props, btn);

        return btn;
    };
}());
(function () {
    
    mstrmojo.requiresCls("mstrmojo.android.medium.ViewFactory",
                         "mstrmojo.winphone.MobileDoc");
 
    
    mstrmojo.winphone.ViewFactory = mstrmojo.declare(
        mstrmojo.android.medium.ViewFactory,
        
        null,
        
        
        {
            scriptClass: 'mstrmojo.winphone.ViewFactory',
            
            
            newRootView: function newRootView(params) {
                return new mstrmojo.winphone.RootView(params);
            },

                        
            mobileDoc: mstrmojo.winphone.MobileDoc            
        }
    );
}());
(function() {

    mstrmojo.requiresCls("mstrmojo.Widget", "mstrmojo.css", "mstrmojo.TextBox");
    
    
    mstrmojo.TextBoxWithLabel = mstrmojo.declare(
        
        mstrmojo.TextBox,
        
        
        null,
        
        
        {
            scriptClass: 'mstrmojo.TextBoxWithLabel',
                        
            
            label: '',
            
            
            rightLabel: '',
            
            cssDisplay: 'inline',
            
            type: "text",
                 
            markupString: '<div class="mstrmojo-TextBoxWithLabel {@cssClass}" style="{@cssText}">' +
                            '<span class="mstrmojo-TextBox-label">{@label}</span>' +
                            '<input id="{@id}" class="mstrmojo-TextBox {@inputNodeCssClass}"  style="{@inputNodeCssText}" '
                                + 'title="{@tooltip}" type="{@type}" '
                                + 'value="{@value}" size="{@size}" maxlength="{@maxLength}" index="{@tabIndex}"' +
                                ' mstrAttach:focus,keyup,blur ' +                              
                              '/>' +
                              '<span class="mstrmojo-TextBox-label-right">{@rightLabel}</span>' +
                          '</div>',
                          
            markupSlots: {
                inputNode: function(){return this.domNode.firstChild.nextSibling;}
            },
            
            preBuildRendering: function() {
                this.markupMethods = mstrmojo.hash.copy({
                                          onvisibleChange: function(){ this.domNode.style.display = this.visible ? this.cssDisplay : 'none'; },
                                          oncssClassChange: function(){this.domNode.className = "mstrmojo-TextBoxWithLabel " + (this.cssClass||'');}
                                     },
                                     mstrmojo.hash.copy(this.markupMethods));
            }
        }
    );
})();
(function() {

    mstrmojo.requiresCls("mstrmojo.ServerProxy",
                         "mstrmojo.android.ui.Button",
                         "mstrmojo.Box",
                         "mstrmojo.TextBoxWithLabel",
                         "mstrmojo.Label",
                         "mstrmojo.hash",
                         "mstrmojo.mstr.EnumWebAPIErrorCodes");

    mstrmojo.requiresDescs(11,17,18,26,7904,5088,9935,10672);

    var $mobileLogin = 'mobileLogin',
        $chgPassword = 'changePassword',
        $BTN = mstrmojo.android.ui.Button.newButton,
        $DESC = mstrmojo.desc,
        $H = mstrmojo.hash,
        $ERRS = mstrmojo.mstr.EnumWebAPIErrorCodes,
        sessions = {},
        localeInfoMap = {},
        EnumDeviceType = { ANDROID_PHONE: 3,
                            ANDROID_TAB: 4 },
        EnumPasswordDlgType = {
            OLD_PASSWORD: 0,
            NEW_PASSWORD: 1,
            CONFIRM_NEW_PASSWORD: 2
        },
        
        
        postLoginFlag = {};

    
    function getProjectSettings(request) {
        var me = this,
            projectId = request.pid,
            realPid = request.params.projectID,
            requestId = request.id,
            sessionState = sessions[projectId],
            realPid = request.params.projectID,
            params = {
                taskId: 'getProjectSettings'
            };

        if ( sessionState ) {
            params.sessionState = sessionState;
        } else {
            
            params.projectID = realPid;
        }
        mstrApp.serverRequest(
            params,
            { 
                success: function (response) {
                    postLoginFlag[projectId] = true;
                    me.transport.serverRequest(me.id, requestId, request);
                },
                failure: function (response) {
                    var callback = request.callback;

                    if (callback.failure !== undefined) {
                        callback.failure(response);
                    }

                    callback.complete(requestId);
                }
            },
            { 
                
                
                skipLogin : true,
                
                doNotHold : true
            });
    }

    function setLocaleInfo(params) {
    	var locStr = String(mstrMobileApp.getLocaleInfo());

    	if(locStr) {
    		var locArr = locStr.split(',');

    		for(var i = 0; i < locArr.length; i++) {
    			var locInfo = locArr[i].split(':');
    			params[locInfo[0]] = locInfo[1];
    		}
    	}
    	return params;
    }

    function notifyUserNewPasswordRequired(params,cb) {
        var dialog,
            items = [],
            dialogConfig = {
                id: "new_pwd_reqd",
                title: $DESC(5088),
                cssClass: 'mstrmojo-CredentialsDialog',
                loginInfo: params.loginInfo
            },
            loginInfo = params.loginInfo,
            fnOK = function(p,callback) {
                return function() {
                    callback(p);
                };
            }(params,cb);

        
        items.push( {
            scriptClass: "mstrmojo.Label",
            cssClass: "mstrmojo-PasswordDialog-Label",
            text: "You must supply a new password."
        });

        dialogConfig.children = items;

        
        dialogConfig.buttons = [
            $BTN($DESC(221, 'Cancel'), function() {
                
                
                dialog.manualClose = true;
                mstrApp.cancelPending();
            }  ),
            $BTN($DESC(1442, 'OK'), fnOK, { enabled: true } )
        ];

        dialog = mstrApp.showDialog(dialogConfig);
    }

    function doPasswordDialog(params,cb) {
        var dialog,
        	btnOk,
            items = [],
            dialogConfig = {
                id: "password_prompt" + mstrmojo.now(),
                title: params.title,
                cssClass: 'mstrmojo-CredentialsDialog',
                loginInfo: params.loginInfo
            },
            loginInfo = params.loginInfo,
            fnOK = function(p,callback) {
                return function() {
                    var ch = dialog.children,
                        pe = ch[0].children[0];

                    switch( p.dlgType ) {
                        case EnumPasswordDlgType.OLD_PASSWORD:
                            loginInfo.pwd = pe.value;
                            break;
                        case EnumPasswordDlgType.NEW_PASSWORD:
                            loginInfo.npwd = pe.value;
                            break;
                    }
                    callback(p);
                };
            }(params,cb);

        btnOk = mstrmojo.getInstance( $BTN($DESC(1442, 'OK'), fnOK, { enabled: params.enableOK } ) );

            
        items.push({
            scriptClass: 'mstrmojo.Box',
            cssDisplay: 'table',
            children: [ {
            				scriptClass: "mstrmojo.TextBoxWithLabel",
            				label: $DESC(18) + ":",
            				value: "",
            				type: "password",
            				cssDisplay: 'table-row',
            				onvalueChange: function() {
            					if ( params.dlgType == EnumPasswordDlgType.CONFIRM_NEW_PASSWORD ) {
            						btnOk.set("enabled", this.value == loginInfo.npwd );
                               }
                           }
                       }
                   ]
        });

        dialogConfig.children = items;

        
        dialogConfig.buttons = [
            $BTN($DESC(221, 'Cancel'), function() {
                mstrApp.cancelPending();
            }  ),
            btnOk
        ];

        dialog = mstrApp.showDialog(dialogConfig);
    }


    

    function handleExpiredPassword(request) {

        var cfg = this._mobileCfg,
            projectId = request.pid,
            project = cfg.getProject(projectId),
		    params = {
                cfg: cfg,
                projectId: projectId,
                project: project,
                transport: this.transport,
                loginInfo: cfg.getLoginInfo(projectId)
             },
             me = this;

        
        mstrApp.hideMessage();

        
        
        params.loginInfo.uid = request.params.userid;

        
        notifyUserNewPasswordRequired( params, function(params) {

            
            doPasswordDialog( $H.copy({ title: "Enter your old password",
                                        dlgType: EnumPasswordDlgType.OLD_PASSWORD,
                                        enableOK: true }, params ), function(params) {

                
                doPasswordDialog( $H.copy({ title: "Enter your new password",
                                            dlgType: EnumPasswordDlgType.NEW_PASSWORD,
                                            enableOK: true }, params ), function(params) {

                    
                    doPasswordDialog( $H.copy( { title: "Confirm your new password",
                                                dlgType: EnumPasswordDlgType.CONFIRM_NEW_PASSWORD,
                                                enableOK: (params.loginInfo.npwd == "") }, params ), function(params) {

                        
                        var fnSuccess = function(p) {
                            return function(res) {
                                var liInfo = p.loginInfo,
                                	npwd = liInfo.npwd,
                                	nuid = liInfo.uid;

                                
                                if ( project.udc ) {
                                    var server = cfg.getServerByProjectId(projectId);
                                    server.pdc.ps = npwd;
                                    server.pdc.lo = nuid;
                                } else {
                                    project.pc.ps = npwd;
                                    project.pc.lo = nuid;
                                }
                                cfg.saveConfiguration();

                                
                                request.params.password = npwd;

                                login.call(me,request);
                            };
                        }(params),

                        
                        fnFailure = function(res) {
                            var callback = request.callback;

                            
                            if (callback.failure !== undefined) {
                                callback.failure(res);
                            }

                            
                            
                            callback.complete(request.id);
                        };

                        
                        me.request( {
                            success: fnSuccess,
                            failure: fnFailure
                        }, {
                            taskId: $chgPassword,
                            server: params.project.sn,
                            userid: params.loginInfo.uid,
                            oldPassword: params.loginInfo.pwd,
                            newPassword: params.loginInfo.npwd
                        },
                        false, {
                            projectId: projectId,
                            mobileConfig: cfg,
                            
                            doNotHold : true
                        });
                    });

                });

            });

        });
    }

    
    function promptForCredentials(loginInfo, isServer, callback) {

        var dialog,
            btnOk,
            getInstance = mstrmojo.getInstance,
            fnNewInput = function (descId, valueNode, type, props) {
                
                return getInstance($H.copy(props, {
                    scriptClass: 'mstrmojo.TextBoxWithLabel',
                    cssDisplay: 'table-row',
                    label: $DESC(descId) + ":",
                    value: loginInfo[valueNode],
                    type: type || 'text',
                    onEnter: function () {
                        
                        if (btnOk.enabled) {
                            
                            btnOk.onclick({
                                e: {
                                    stopPropagation: mstrmojo.emptyFn
                                }
                            });
                        }
                    }
                }));
            },
            userId = fnNewInput(17, 'uid', null, {
                onRender: function () {
                    
                    this.focus();
                },
                onvalueChange: function() {
                    
                    btnOk.set('enabled', !!this.value.length);
                }
            }),
            userPwd = fnNewInput(18, 'pwd', 'password');

        btnOk = getInstance($BTN($DESC(9935, 'Log In'), function () {
            
            var name = loginInfo.uid = userId.value;
            loginInfo.pwd = userPwd.value;

            
            if (name.length) {
                
                window.setTimeout(function() {
                    callback();
                }, 100);                             
            }
        }, {
            enabled: false
        }));

        
        dialog = mstrApp.showDialog({
            id: 'user_creds_prompt',
            title: (isServer ? $DESC(7904) : $DESC(11) ) + ' ' + $DESC(26),
            cssClass: 'mstrmojo-CredentialsDialog',
            loginInfo: loginInfo,
            children: [{
                scriptClass: 'mstrmojo.Box',
                cssDisplay: 'table',
                children: [ userId, userPwd ]
            }],
            buttons: [ $BTN($DESC(221, 'Cancel'), function() {
                
                
                dialog.manualClose = true;
                mstrApp.cancelPending();
            }), btnOk ]
        });
    }

    

    function needServerCreds( loginInfo ) {
    	return ( ( loginInfo.wsam > 1 ) && !loginInfo.wsuid );
    }

    function needProjectCreds( loginInfo ) {
    	return ( !loginInfo.uid && loginInfo.am != 2  );
    }

    function getCredentials( li, callback ) {
        var loginInfo = li,
            needUpdateCfg = false;

        
        var promptForServerCreds = function(cb) {
            var serverCreds = { uid: loginInfo.wsuid, pwd: loginInfo.wspwd },
                callback = function() {
                    loginInfo.wsuid = serverCreds.uid;
                    loginInfo.wspwd = serverCreds.pwd;

                    
                    loginInfo.updateCfgAfterLogin |= 0x01;

                    cb();
                };

            promptForCredentials.call(this, serverCreds, true, callback );
        };

        
        var promptForProjectCreds = function(cb) {
            var projCreds = { uid: loginInfo.uid, pwd: loginInfo.pwd },
                callback = function() {
                    loginInfo.uid = projCreds.uid;
                    loginInfo.pwd = projCreds.pwd;

                    
                    loginInfo.updateCfgAfterLogin |= 0x02;

                    cb();
                };
            promptForCredentials.call(this, projCreds, false, callback);
        };

        
        if ( needServerCreds(loginInfo) && needProjectCreds( loginInfo )  ) {
            
            var ths = this;
            promptForServerCreds.call(this, function() {
                promptForProjectCreds.call(ths,callback);
            } );

        
        } else if ( needServerCreds( loginInfo ) ) {

            promptForServerCreds.call(this,callback);

        
        } else if ( needProjectCreds( loginInfo ) ) {

            promptForProjectCreds.call(this, callback);

        } else {

            
            callback();
        }
    }

    
    function canUseCache(request) {
        var cfg = this._mobileCfg,
            pid = request.pid,
            project = cfg.getProject(pid),
            realPid = project.realPid,
            loginInfo = cfg.getLoginInfo(pid);

        
        if ( mstrApp.useBinaryFormat && realPid && loginInfo.uid) {
            request.params.projectID = realPid;
            return true;
        }
        return false;
    }

    
    function postLogin(request) {
        var me = this,
            cfg = me._mobileCfg,
            projectId = request.pid,
            realPid = request.params.projectID,
            transport = me.transport,
            id = me.id,
            callback = {
                success: function(res){
                    
                    var l = localeInfoMap[projectId] = mstrmojo.hash.obj2array(res);
                    mstrmojo.hash.copy(l, mstrmojo.locales);

                    if ( mstrApp.useBinaryFormat ) {
                        
                        getProjectSettings.call(me, request);
                    } else {
                        postLoginFlag[projectId] = true;
                        
                        transport.serverRequest(id, request.id, request);
                    }
                },
                failure: function(response){
                    var cb = request.callback;

                    if (cb.failure !== undefined) {
                        cb.failure(response);
                    }

                    cb.complete(request.id);
                }
            },
            params = {
                taskId: 'getLocaleInfo'
            },
            config = {
                projectId: projectId,
                mobileConfig: cfg,
                
                
                skipLogin : true,
                
                doNotHold : true
            };
        if ( realPid) {
            params.projectID = realPid;
        }

        
        me.request(callback, params, false, config);
    }
    
    function login(request) {
        var me = this,
            cfg = me._mobileCfg,
            projectId = request.pid,
            project = cfg.getProject(projectId),
            transport = me.transport,
            id = me.id,
            loginInfo = cfg.getLoginInfo(projectId),
            repromptForCreds = false,
            repromptTimer,
            doLogin = function( f ){
                project.posLoginFlag = false;
                var loginCallback = {
                        success: function(res) {

                        	
                        	clearInterval(repromptTimer);

                            
                            
                            
                            
                            

                        	
                        	
                        	project.es = res.hasEmailScreenPriv;

                            
                            if ( loginInfo.updateCfgAfterLogin ) {
                                cfg.updateLoginInfo(projectId,loginInfo);
                            }

                            
                            cfg.setRealPid(project, res.projectID);
                            
                            var sessionState = sessions[projectId] = res.sessionState;
                            mstrMobileApp.putSession(projectId, sessionState);

                            
                            request.params.sessionState = sessionState;

                            
                            if ( res.isCompatible === false ) {
                                mstrApp.handleCompatibilityError(request);
                            }

                            postLogin.call(me, request);

                        },
                        failure: function( res ) {
                            var callback = request.callback,
                            	canUseCacheFlag = canUseCache.call(me, request),
                            	isHttpAuthFail = (res.status==401),
                            	isAuthFail = ( res.code == $ERRS.AUTHEN_E_LOGIN_FAIL ) || (res.status==401),
                            	errorCallback = mstrmojo.emptyFn,
                            	li = cfg.getLoginInfo(projectId),
                            	needToReprompt = isHttpAuthFail ||  isAuthFail || ( needServerCreds(li) || needProjectCreds( li ) );

	                        
	                        if ((callback.failure !== undefined) && !isHttpAuthFail) {
	                            
	                            res.noErrorMessage = canUseCacheFlag || needToReprompt || res.requireDeviceCertificate;

	                            
	                            res.handledError = needToReprompt || res.requireDeviceCertificate;

	                            callback.failure(res);
	                        }


	                        
	                        
	                        

	                        if ( !needToReprompt ) {
		                        callback.complete(request.id);
	                        }

	                        
	                        
	                        
	                        if ( canUseCacheFlag && !mstrMobileApp.isOnline()) {
	                            postLogin.call(me, request);
	                        } else {
	                            res.method = "login";

	                            
	                            if ( needToReprompt ) {

                                    if ( isAuthFail ) {
                                        cfg.clearLoginInfoForProject(projectId);
                                    }

	                            	
		                            if ( isHttpAuthFail ) {
		                            	var	server = cfg.getServerByProjectId(projectId),
		                            		creds;

		                            	
		                            	if ( server.udc ) {
		                            		
		                                    creds = cfg.getDefaultServerCreds();
		                            	} else {
		                            		
		                            		creds = server.wsc;
		                            	}
		                            	
	                                    delete creds.lo;
	                                    delete creds.ps;

	                                    
	                                    
		                                cfg.saveConfiguration();

		                                
	                                    res.message = $DESC( 10672, "The username or password you entered is incorrect." );
		                            }

	                            	
	                            	res.handledError = false;

	                            	
	                            	errorCallback = function() {
			                            repromptForCreds = true;
		                            };
	                            }

	                            
	                            mstrApp.onerror(res, errorCallback );
	                        }
	                	}
                    },
                    devTypes = EnumDeviceType,
                    loginParams = setLocaleInfo({
                        taskId: $mobileLogin,
                        server: project.sn,
                        project: project.pn,
                        userid: loginInfo.uid,
                        password: loginInfo.pwd,
                        
                        wsSize: 10,
                        
                        authMode: loginInfo.am,

                        
                        wsuid: loginInfo.wsuid,
                        wspwd: loginInfo.wspwd,
                        wsam: loginInfo.wsam,

                        
                        clientVersion: mstrMobileApp.getAppVersion(),
                        clientType: mstrMobileApp.isTablet() ? devTypes.ANDROID_TAB : devTypes.ANDROID_PHONE

                    }),
                    loginConfig = {
                        projectId: projectId,
                        mobileConfig: cfg,
                        
                        doNotHold : true
                    };
                me.request(loginCallback, loginParams, false, loginConfig); 
            },
            foo = doLogin;

        getCredentials.call( this, loginInfo, doLogin );

        repromptTimer = setInterval( function () {

            if ( repromptForCreds ) {
            	
            	repromptForCreds = false;

            	
            	loginInfo = cfg.getLoginInfo(projectId);

            	
            	getCredentials.call( me, loginInfo, doLogin );
            }

        }, 500 );

    }

    
    mstrmojo.MobileServerProxy = mstrmojo.declare(
        mstrmojo.ServerProxy,

        null,

        
        {
            scriptClass: "mstrmojo.MobileServerProxy",

            getSessions: function() {
                return sessions;
            },

            
            request: function request(callback, params, override, config) {
                
                this._projectId = config.projectId;

                
                this._mobileCfg = config.mobileConfig;

                this._super(callback, params, override, config);
            },

            
            createRequest: function createRequest(requestId, callback, params, config) {
                var request;
                try {
                    
                    request = this._super(requestId, callback, params, config);

                    
                    var projectId = this._projectId;
                    request.pid = projectId;
                    if ( ! config.noTaskURL ) {
                    request.taskURL = this._mobileCfg.getTaskUrlByProject(projectId);
                    }
                    request.isLogin = (params.taskId === $mobileLogin);
                    request.isPwdChange = (params.taskId == $chgPassword);
                } catch(ex) {
                    
                    this.deleteRequest(requestId);
                    throw ex;
                }

                
                return request;
            },

            
            userInteractionRequired: function userInteractionRequired(request) {
                var result = false;

                
                if ( request.pid && !sessions[request.pid]) {

                    var loginInfo = request.config.mobileConfig.getLoginInfo(request.pid),
                        needServerCreds = ( ( loginInfo.wsam > 1 ) && !loginInfo.wsuid ),
                        needProjectCreds = ( !loginInfo.uid && loginInfo.am != 2  );

                    
                    return needServerCreds || needProjectCreds;
                }

                return result;
            },

            
            submitRequest: function submitRequest(request) {
                
                if (request.isLogin || request.isPwdChange  ) {
                    
                    this._super(request);

                    
                    return;
                }

                
                var state = sessions[request.pid],
                    localeInfo = localeInfoMap[request.pid];

                
                if (state) {
                    
                    request.params.sessionState = state;

                    if (localeInfo){
                        mstrmojo.hash.copy(localeInfo, mstrmojo.locales);
                    }

                      
                    this._super(request);

                } else {
                    if ( request.config.skipLogin ) {
                        this._super(request);
                        return;
                    }
                    if ( mstrMobileApp.isOnline() ) {
                        
                        
                        login.call(this, request);
                    } else {
                        
                        
                        if ( canUseCache.call(this, request)) {
                            
                            
                            if ( ! postLoginFlag[request.pid] ) {
                                postLogin.call(this, request);
                            } else {
                                this._super(request);
                            }
                        } else {
                            
                            login.call(this, request);
                        }
                    }
                }
            },

            
            response: function response(requestId, status, res) {
                var request = this.getRequest(requestId);

                
                if (!request) {
                    
                    return;
                }

                
                if (!status && mstrMobileApp.isOnline()) {
                    switch (parseInt(res.code,10)) {
                        case $ERRS.AUTHEN_E_LOGIN_FAIL_EXPIRED_PWD:
                        case $ERRS.AUTHEN_E_LOGIN_FAILED_NEW_PASSWORD_REQD:
                            handleExpiredPassword.call(this,request);
                            return;
                            break;

                        case $ERRS.MSI_INBOX_MSG_NOT_FOUND:
                            
                            break;

                        case $ERRS.E_MSI_USERMGR_USER_NOTFOUND:
                            if (!request.isLogin) {
                                
                                delete request.params.sessionState;

                                
                                login.call(this, request);

                                
                                return;
                            }
                            break;
                    }
                }

                
                this._super(requestId, status, res);
            },

            getSession: function getSession(projectId) {
                return sessions[projectId];
            },

            closeSession: function closeSession(projectId) {
                
            },

            closeAllSessions: function closeAllSessions() {
                
                sessions = {};
            },

            getLocaleInfo: function getLocaleInfo(projectId) {
                return localeInfoMap[projectId];
            },

            hasEmailScreenPrivilege : function hasEmailScreenPrivilege(projectId) {
            	return false;
            }
        });

}());
