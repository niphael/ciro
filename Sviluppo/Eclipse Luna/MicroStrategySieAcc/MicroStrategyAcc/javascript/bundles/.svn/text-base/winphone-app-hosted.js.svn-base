mstrmojo.android.EnumOrientationTypes = {
    PORTRAIT: 1,
    LANDSCAPE: 2
};
/**
 * EnumWebAPIErrorCodes.js 
 * Copyright 2011-2013 MicroStrategy Incorporated. All rights reserved.
 *
 * @fileoverview Conversion of BIWebSDK/code/java/src/com/microstrategy/utils/localization/WebAPIErrorCodes.java to JavaScript.
 * 
 * NOTE: that due to the Java file's size, only those error codes that are in use in the JavaScript code are listed here. Copy them from the Java file as necessary.
 *
 * NOTE: Due to differences in the number representations between Java and JavaScript, you must convert the constant values to signed two's completment
 *          where the JS constant value =   JAVA_CONSTANT - 0xFFFFFFFF - 1
 *
 * @author <a href="mailto:dhill@microstrategy.com">Doug Hill</a>
 * @version 1.0
 */
 
mstrmojo.mstr.EnumWebAPIErrorCodes = {
    	MSI_INBOX_MSG_NOT_FOUND:                    -2147468986, // 0x80003946
		E_MSI_USERMGR_USER_NOTFOUND:                -2147209051, // 0x800430A5
		AUTHEN_E_LOGIN_FAIL_EXPIRED_PWD:            -2147216963, // 0x800411BD
		AUTHEN_E_LOGIN_FAILED_NEW_PASSWORD_REQD:    -2147216960, // 0x800411C0
		AUTHEN_E_LOGIN_FAIL:						-2147216959, // 0x800411C1

		
		E_UNUSED: 0xFFFFFFFF
};
(function() {
    mstrmojo.BarcodeReader = mstrmojo.provide(
        'mstrmojo.BarcodeReader',
        {
            /**
             * Call backs registered for the pending location request.
             */
            _callback: null,
            _callbackId: 0,
            
            /**
             * Method for JavaScript client to start barcode reading activity
             * 
             */
            readBarcodes: function readBarcodes(params, callback, name, selectedPrompts, displayKeypadView) {
                this._callbackId++;
                var id = '' + this._callbackId;
                this._callback = callback;
                var callbackStr = 'mstrmojo.BarcodeReader.onBarcodeResult';
                if ( params ) {
                    params.blockBegin = 0;
                    params.blockCount = -1;
                    params.serverUrl = mstrApp.getConfiguration().getTaskUrlByProject(mstrApp.getCurrentProjectId());
                    params.sessionState = mstrApp.getSessionState();
                }
               
                mstrMobileApp.readBarcodes(id, name, (params && JSON.stringify(params)) || null, (selectedPrompts && JSON.stringify(selectedPrompts)) || null, displayKeypadView || null, callbackStr);
            },
            
            onBarcodeResult: function onBarcodeResult(id, resCode, value) {
                //Ignore old calls;
                var callback = this._callback;
                if ( id != this._callbackId || (! callback)) {
                    return;
                }
                delete this._callback;
                if ( resCode == -1 ) { //Success
                    callback.success(value);
                } else if ( resCode != 0 ) {//Cancelled
                    callback.failure(value || 'Error reading bare code.');
                }
            }
        }
    );
    //checkLoadingStatus(mstrmojo.BarcodeReader, {});

})();
(function() {
    /**
     * A class to simulate Java StringBuffer class.
     * 
     * @class
     */
    mstrmojo.StringBuffer = mstrmojo.declare(
        null, 
        null,
        /**
         * @lends mstrmojo.StringBuffer.prototype
         */
        {
            scriptClass: 'mstrmojo.StringBuffer',
            
            /**
             * Appends new string into buffer.
             * 
             * @param txt The string to be appended.
             * @return current StringBuffer, so append() can be chained in usage. For example, sb.append('text:').append('3');
             */
            append: function append(txt) {
                if (!this.buf) {
                    this.reset();
                }
                this.buf[++this.len] = txt;
                return this; 
            },
            
            /**
             * Resets current string buffer, which will lose all previous content.
             */
            reset: function reset() {
                this.buf = [];
                this.len = -1;
            }
        }
    );

    /**
     * Returns the string representation of this string buffer.
     */    
    mstrmojo.StringBuffer.prototype.toString = function(sep) {
        var buf = this.buf;
        return (buf && buf.join(sep || '')) || '';         
    }
})();
(function() {
    
    mstrmojo.requiresCls("mstrmojo.StringBuffer",
                         "mstrmojo.hash");
    
    var CLASS_NAME = 'AndroidServerTransport';
    
    /**
     * The Android server transport.
     * 
     * @type Object
     */
    mstrmojo.android.AndroidServerTransport = {
            
        /**
         * Makes a request to the Android Java shell.
         * 
         * @param {String} id The id of the {@link mstrmojo.ServerProxy} making the request.
         * @param {Object} request An object with properties defining this XHR request.
         * @param {Object} request.params An object with task parameters for this XHR request.
         * @param {String} request.taskURL The URL for accessing the server task servlet.
         */
        serverRequest: function serverRequest(id, requestId, request) {
            // Convert parameters hash to URL string.
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
            
            // Submit request to Android java class bound into the JavaScript scope.
            mstrMobileTransport.serverRequest(id, requestId, rqst, 'response', 'progress');
        },
        
        /**
         * Cancels a request.
         * 
         * @param {String} requestId The id of the request to cancel.
         * 
         * @returns Boolean True if the request was successfully canceled.
         */
        cancelRequest: function cancelRequest(requestId) {
            $MAPF(false, CLASS_NAME, 'transportRequest');
            
            return mstrMobileTransport.cancelRequest(requestId);
        }
    };
    
})();
(function () {
    
    /**
     * A pool of xhr's used for supporting multiple, simultaneous requests.
     *
     * @private
     */
    var xhrPool = {};
    
    var CLASS_NAME = 'XHRServerTransport';
    
    /**
     * An XHR based server transport.
     * 
     * @type Object
     */
    mstrmojo.XHRServerTransport = {
            
        /**
         * Makes a request to the server via XHR.
         * 
         * @param {String} id The id of the {@link mstrmojo.Obj} making the request.
         * @param {Object} request An object with properties defining this XHR request.
         * @param {Object} request.params An object with task parameters for this XHR request.
         */
        serverRequest: function serverRequest(id, requestId, request) {
            // Get reference to proxy and create new XHR.
            var proxy = mstrmojo.all[id],
                xhr = xhrPool[requestId] = new mstrmojo.SimpleXHR(); 
            
            $MAPF(true, CLASS_NAME, 'transportRequest');
            
            // Make request to XHR.
            xhr.request(request.config.method || 'POST', request.taskURL || mstrConfig.taskURL, {
                success: function (res) {
                    // Respond with a "true" status and the response from the XHR.
                    proxy.response(requestId, true, res);
                },
                
                failure: function (res) {
                    // Respond with a "false" status and an object containing the error code and message.
                    proxy.response(requestId, false, {
                        code: res.getResponseHeader('X-MSTR-TaskErrorCode'),
                        message: res.getResponseHeader('X-MSTR-TaskFailureMsg')
                    });
                },
                
                complete: function () {
                    // Remove this xhr from the pool.
                    delete xhrPool[requestId];
                }
            }, request.params);            
        },
        
        /**
         * Cancels a request.
         * 
         * @param {String} requestId The id of the request to cancel.
         * 
         * @returns Boolean True if the request was successfully canceled.
         */
        cancelRequest: function cancelRequest(requestId) {
            var xhr = xhrPool[requestId],
                didCancel = false;
            
            if (xhr) {
                didCancel = xhr.cancel();
                delete xhrPool[requestId];
            }
            
            //Close the transport request log.
            $MAPF(false, CLASS_NAME, 'transportRequest');
            
            return didCancel;
        }
    };
    
}());
(function () {

    mstrmojo.requiresCls("mstrmojo.hash",
                         "mstrmojo.func",
                         "mstrmojo.Obj");

    var $HASH = mstrmojo.hash;
    
    /**
     * Counter for ensuring unique request submission IDs.
     *
     * @type Integer
     * @static
     * @private
     */
    var cnt = 0;

    /**
     * Queue for requests.
     *
     * @type Object[]
     * @static
     * @private
     */
    var requestQueue = [];

    /**
     * Collection of currently processing graph request keys.
     *
             * @type Object
     * @static
     */
    var graphRequests = {};

    /**
     * Flag to indicate that all requests should be held until graphs have processed.
     *
     * @type boolean
     * @default false
     * @static
     */
    var holdForGraphs = false;

    /**
     * Method for submitting requests.
     *
     * @param {Object} request The request to submit.
     *
     * @private
     */
    function handleSubmission(request) {
        var callback = request.callback;

        // Do we have a submission handler?
        if (callback.submission) {
            // Call it.
            callback.submission( this.userInteractionRequired( request ) );
        }

        // Submit the request.
        this.submitRequest(request);
    }

    /**
     * Checks queue for requests and submits next request (if found).
     *
     * @private
     */
    function submitNextInQueue() {
        // Are there any requests in the queue?
    	// #532349. Do not submit the request if we're still processing graph requests.
    	// the last added graph will submit the holding request.
        if (requestQueue.length && !holdForGraphs) {
            // Shift the first request out of the queue and submit.
            handleSubmission.call(this, requestQueue.shift());
        }
    }

    /**
     * Proxy object to handle server requests.
     *
     * @class
     * @extends mstrmojo.Obj
     */
    mstrmojo.ServerProxy = mstrmojo.declare(
        mstrmojo.Obj,

        null,

        /**
         * @lends mstrmojo.ServerProxy.prototype
         */
        {
            scriptClass: 'mstrmojo.ServerProxy',

            /**
             * The server transport mechanism.
             *
             * @type mstrmojo.Obj
             */
            transport: null,

            cnt: 0,

            /**
             * Assembles the request and submits it to the server transport mechanism.
             *
             * @param {Object} callback An object containing functions to be called as the request process proceeds.
             * @param {Function} callback.submission A function called as the server request is initiated.
             * @param {Function} callback.success A function called when the server request completes successfully.
             * @param {Function} callback.failure A function called if the server request fails for any reason.
             * @param {Function} callback.complete A function called when the server request is completed, regardless of status.
             * @param {Object} params An object containing the task parameters for this request.
             * @param {Boolean} [override=false] TRUE if all preceding server requests should be canceled in favor of this one.
             * @param {Object} [config] An optional object containing configuration parameters for the server transport.
             */
            request: function request(callback, params, override, config) {
                // If override is true then kill any outstanding requests.
                if (override) {
                    this.cancelRequests();
                }

                var proxyId = this.id,
                    transport = this.transport,
                    requestId = mstrmojo.now() + params.taskId + cnt++,
                    callbackCancel = callback.canceled || mstrmojo.emptyFn;

                // We don't want to wrap the cancelled method since we need to propagate the return value.
                callback.canceled = function (id) {
                    // Call the callback paramter's cancel method.
                    callbackCancel();

                    // Call complete, passing TRUE to indicate that the request was canceled.
                    callback.complete(true);

                    // Cancel server request.
                    return transport.cancelRequest(id);
                };

                // Wrap callback methods.
                callback = mstrmojo.func.wrapMethods(callback, {
                    complete: function (id) {
                        // Delete request.
                        mstrmojo.all[proxyId].deleteRequest(id);
                    }
                });

                // Determine holding status and then create new request object.
                // DJH: don't hold the request if it is a login task. On Android we automatically issue
                //      login tasks if the user is not currently logged into the project.
                var existingRequests = !$HASH.isEmpty(this._requests),
                    newRequest = this.createRequest(requestId, callback, params, config),
                    /*                                                      TQMS 652803 */
                    holdRequests = (holdForGraphs || existingRequests) && ! config.doNotHold;

                // Should we hold requests?
                if (holdRequests) {
                    // YES, add this request to the queue.
                    requestQueue.push(newRequest);
                } else {
                    // NO, submit this request.
                    handleSubmission.call(this, newRequest);
                }
            },

            /**
             * <p>Creates a request and stores it in the _requests collection.</p>
             *
             * <p>Subclasses should override this method to add custom data to the request object.
             *
             * @param {String} requestId The id for the new request.
             * @param {Object} callback The callback object as submitted in {@link mstrmojo.ServerProxy.request}.
             * @param {Object} params An object containing the task parameters for this request.
             *
             * @returns Object Newly created request object.
             */
            createRequest: function createRequest(requestId, callback, params, config) {
                var reqsCollection = this._requests;

                // Is this the first request?
                if (!reqsCollection) {
                    // Initial the requests collection.
                    reqsCollection = this._requests = {};
                }

                // Store request.
                var request = reqsCollection[requestId] = {
                    id: requestId,
                    callback: callback,
                    params: params,
                    config: config
                };

                // Return request.
                return request;
            },

            /**
             * <p>Submits the request via the transport mechanism indicated in {@link mstrmojo.ServerProxy.transport}.</p>
             *
             * <p>Subclasses will override this method to add any custom transport handling.</p>
             *
             * @param {Object} request The request object as created in {@link mstrmojo.ServerProxy.createRequest}.
             */
            submitRequest: function submitRequest(request) {
                this.transport.serverRequest(this.id, request.id, request);
            },

            /**
             * Cancels all outstanding requests.
             *
             */
            cancelRequests: function cancelRequests() {
                var didCancel = false;

                // Iterate current requests and call their complete callback handler.
                $HASH.forEach(this._requests, function (request) {
                    // Has the request NOT already gotten a response?
                    if (typeof request.gotResponse === "undefined") {
                        // Cancel the request, caching the returned cancel status.
                        didCancel |= request.callback.canceled(request.id);
                    }
                });

                // Reset requests collection.
                this._requests = {};

                // Reset request queue.
                requestQueue = [];

                // Return cancel status.
                return didCancel;
            },

            /**
             * Receives the results from making the server request.
             *
             * @param {String} requestId The id of the request results being returned.
             * @param {Boolean} status True if the request succeeded.
             * @param {Object} res The response from the server.
             */
            response: function response(requestId, status, res) {

                // Cease profiling the server request.
                $MAPF(false, "AndroidServerTransport", 'transportRequest');

                // Do we have a request for this ID?
                var request = this.getRequest(requestId);
                if (request) {
                    // Mark the response as handled.  This will prevent the response being cancelled if
                // our success or failure callback attempts to fire off another request that has the override property set TRUE
                request.gotResponse = true;

                    // Retrieve the callback from the request object and determine whether to call 'success' or 'failure' (based on status and presence of "mstrerr" property).
                var callback = request.callback,
                    methodName = (status && !res.mstrerr) ? 'success' : 'failure';  // mstrerr means the request completed, but with an error on the server.

                try {
                    // Does the callback have a handler for the result?  If not we ignore assuming the callback doesn't care about result.
                    if (callback[methodName]) {
                        // Call it.
                        callback[methodName](res, request);
                    }
                } finally {
                    // Always call the 'complete' handler.
                    callback.complete(requestId);
                }
                }

                // Submit next request in queue.
                submitNextInQueue.call(this);
            },

            /**
             * Deletes a request from the request collection.
             *
             * @param {String} requestId The ID of the request to be cancelled.
             */
            deleteRequest: function deleteRequest(requestId) {
                var requestCollection = this._requests;
                delete requestCollection[requestId];
            },

            /**
             * Returns a request from the request collection.
             *
             * @param {String} requestId The ID of the request to be returned.
             */
            getRequest: function getRequest(requestId) {
                var requestCollection = this._requests;
                return requestCollection && requestCollection[requestId];
            },
      
            /**
             * Returns TRUE if user interaction is required to process request
             *
             * @param {Object} request request being processed
             */      
            userInteractionRequired: function userInteractionRequired(request) {
                return false;
            },

            /**
             * Adds the graph key to the graph requests collection and holds all requests until collection is empty.
             *
             * @param {String} key The key of the graph currently processing.
             */
            addLoadingGraph: function addLoadingGraph(key) {
                // Store key in collection.
                graphRequests[key] = true;

                // Hold all requests.
                holdForGraphs = true;
            },

            /**
             * Adds the graph key from the graph requests collection and submits queued requests (if any).
             *
             * @param {String} key The key of the graph that is done processing.
             */
            removeLoadingGraph: function removeLoadingGraph(key) {
                // Remove key from collection.
                delete graphRequests[key];

                // Is collection empty?
                if ($HASH.isEmpty(graphRequests)) {
                    // Clear hold status.
                    holdForGraphs = false;

                    // Submit next request in queue.
                    submitNextInQueue.call(this);
                }
            }
        }
    );
}());
/**
 * DebugResSetStore.js Copyright 2010 MicroStrategy Incorporated. All rights reserved.
 * 
 * @version 1.0
 */
/*
 * @fileoverview Widget that contains the entire application UI on Mobile devices.
 */
var debugRsStore = {
    "-1":{
        eId: "-1",
        children:{}
    }
};
var debugRsStoreCount = 1;

(function() {

    mstrmojo.requiresCls(
            "mstrmojo.Obj"
    );

    /**
     * @private
     */
    var CLASS_NAME = 'DebugResSetStore';
    
    var NO_ROW_ID = -1,
    
    //Cache tree levels
    LVL_ROOT = 0,
    LVL_PROMPT = 1,
    LVL_LAYOUT = 2,
    LVL_PAGE_BY = 3,
    LVL_IF = 4,
    
    VN_DATA = "data",
    VN_PROMPT = "prompt",
    VN_PB_TREE = "pb";

    var LVL_NAMES = ['root', 'prompt', 'layout', 'pb', 'ifc'];

    /**
     * Main Widget class for mobile applications.
     * 
     * @class
     * @extends mstrmojo.Container
     * 
     * @borrows mstrmojo._FillsBrowser
     */
    mstrmojo.DebugResSetStore = mstrmojo.declare(
        mstrmojo.Obj,
        null,

        /**
         * @lends mstrmojo.DebugResSetStore.prototype
         */
        {
            scriptClass: "mstrmojo.DebugResSetStore",
            
            //nodes: [],
            root: {
                children: {}
            },
            init: function init(projId){
                this._super();
                this.nodes = [];
                var root = this.root,
                    projNod;
                if (projId) {
                    projNode = root.children[projId];
                    if (! projNode ) {
                        projNode = {
                            key: projId, 
                            level: 0, 
                            //values: {},
                            children: {}
                        };
                        root.children[projId] = projNode;
                    }
                    this.nodes.push(projNode);
                }
            },
            
            getData: function getData(level, keys) {
                var p = level ? this.nodes[level - 1] : this.root,
                    nodes = this.nodes,
                    n, i;
                nodes.length = level + keys.length;
                for ( i = 0; i < keys.length; i++) {
                    n = nodes[level + i];
                    if ( n && n.key == keys[i]) {
                        p = n;
                    } else {
                        break;
                    }
                }
                for ( ; p && i < keys.length; i++) {
                    n = p.children[keys[i]];
                    if ( n ) {
                        nodes[level + i] = n;
                    }
                    p = n;
                }
                if ( n ) {
                    while ( n.child ) {
                        n = n.child;
                        nodes[level + i++] = n;
                    }
                    return n.values[VN_DATA];
                }
            },
            
            putData: function putData(paramStr) {
                var params = JSON.parse(paramStr),
                    level = params.level,
                    keys = params.keys, 
                    data = params.data, 
                    updateParent = params.updateParent,
                    extras = params.extras,
                    nodes = this.nodes,
                    p = level ? nodes[level - 1] : this.root,
                    i, n ;
                nodes.length = level + keys.length;
                for ( i = 0; i < keys.length; i++) {
                    n = nodes[level + i];
                    if ( n && n.key == keys[i]) {
                        p = n;
                    } else {
                        break;
                    }
                }
                for (; i < keys.length; i++) {
                    n = {
                            key: keys[i], 
                            level: level + i, 
                            values: {},
                            children: {}
                        };
                    n.parent = p;
                    p.children[keys[i]] = n;
                    if ( ! p.child || updateParent ) {
                        p.child = n;
                    }
                    updateParent = true;
                    nodes[level + i] = n;
                    p = n;
                }
                if ( data ) {
                    this.setValue(n.level, 'data', data);
                }
                if ( extras ) {
                    for ( i = 0; i < extras.length; i++ ) {
                        var e = extras[i];
                        this.setValue(e.l, e.n, e.v);
                    }
                }
            },
            
            setAsDefault: function setAsDefault(level) {
                var node = this.nodes[level],
                    parent = node.parent;
                parent.child = node;
            },
            
            setValue: function setValue(level, name, value) {
                var e = this.nodes[level]; 
                e.values[name] = value;
            },
            
            getValue: function getValue(name, level) {
                if (typeof(level) != 'undefined'  && level >= 0 ) {
                    return this.nodes[level].values[name];
                } else {
                    var v, nodes = this.nodes, vals;
                    for ( var i = 0; i < nodes.length; i++) {
                        vals = nodes[i].values; 
                        v = vals && vals[name];
                        if ( v ) {
                            return v;
                        }
                    }
                    return null;
                }
            },
            
            hasNode: function hasNode(level) {
                return this.nodes[level];
            },
            
            getKey: function getKey(level) {
                var n = this.nodes[level];
                return n && n.key;
            },
            
            
            getKeys: function getKeys () {
                var res = [];
                for ( var i = 0; i < this.nodes.length; i++ ) {
                    if (this.nodes[i]) {
                        res[i] = this.nodes[i].key;
                    }
                }
                return JSON.stringify(res);
            },
            
            //===========================================================================================
            getNodeByKey: function getNodeByKey(parent, key) {
                parent = parent || this.root;
                var res = parent.children[key],
                    nodes = this.nodes;
                if ( res ) {
                    var n = res;
                    for ( var i = res.level; i < nodes.length; i++ ) {
                        if ( n && i === n.level ) {
                            nodes[i] = n;
                            n = n.child;
                        } else {
                            nodes[i] = null;
                        }
                    }
                }
                return res;
            },
            
            addNode: function addNode(key, level, value, valueName, valueLevel, updateParent) {
                var n = {
                        key: key, 
                        level: level, 
                        values: {},
                        children: {}
                    };
                if ( level === valueLevel) {
                    n.values[valueName] = value;
                }
                var p = this.getParent(level) || this.root;
                n.parent = p;
                p.children[key] = n;
                if ( ! p.child || updateParent ) {
                    p.child = n;
                }
                this.nodes[level] = n;
                return n;
            },

            addDataNodes: function addDataNodes(data, layout, pbKey, ifPosition, dataLevel) {
                if ( layout ) {
                    this.addNode(layout, LVL_LAYOUT, data, VN_DATA, dataLevel, false);
                }
                if ( pbKey ) {
                    this.addNode(pbKey, LVL_PAGE_BY, data, VN_DATA, dataLevel, false);
                }
                if ( ifPosition ) {
                    this.addNode(ifPosition, LVL_IF, data, VN_DATA, dataLevel, false);
                }
            },
            
            getParent: function getParent(level) {
                for ( var i = level - 1; i >= 0; i--) {
                    if ( this.nodes[i]) {
                        return this.nodes[i];
                    }
                }
                return null;
            },
            
            removeProjectCaches: function removeProjectCaches(projId) {
                delete this.root.children[projId];
            },
            
            clear: function clear() {
                this.root.children = {};
                this.nodes = [];
            },

            getImage: function getImage(url) {
                return url;
            }
            
        });
})();

(function() {
    
    mstrmojo.requiresCls("mstrmojo.Obj");
    
    var $DOM = mstrmojo.dom;

    /**
     * Removes every children of a node
     * 
     * @param {Object} node. Node whose children will be removed 
     * 
     * @private
     */    
    function removeChildren(node) {

        if ( node.hasChildNodes() )
        {
            while ( node.childNodes.length >= 1 )
            {
                node.removeChild( node.firstChild );       
            } 
        }       
    }
    
    /**
     * Animate page using fx animation package
     * 
     * @param {Integer} cmdCode Indicates whether we are showing a new view, or hiding the current view (turning backward).
     * @param {Integer} duration Duration of the animation
     * 
     * @private
     */      
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

    /**
     * A mixin to add common Mobile Booklet animation functionality
     */
    mstrmojo.winphone._IsMobileBookletWinPhone = {
            
        _mixinName: 'mstrmojo.winphone._IsMobileBookletWinPhone',
        
        cleanCurrentPage: function cleanCurrentPage(page) {
            removeChildren(page);
        },  
        
        /**
         * Turn to next page
         */
        turnPageAnimation: function turnPageAnimation(position, command, className) {                
            
            animatePageTurn.call(this, command, 500);
        },  
        
        /**
         * <p>Empty hook</p>
         */           
        moveNextView: function moveNextView(nextVisPage, sliderPosition) {                

        },        
        
        /**
         * Hides the application level wait message.
         */
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
    
    /**
     * MobileDoc class for Windows phone
     * 
     * @class
     * @extends mstrmojo.MobileDoc
     * 
     * @borrows mstrmojo.winphone._IsMobileBookletWinPhone
     */
    mstrmojo.winphone.MobileDoc = mstrmojo.declare(
            
        mstrmojo.MobileDoc,

        [ mstrmojo.winphone._IsMobileBookletWinPhone ],

        /**
         * @lends mstrmojo.android.medium.RootView.prototype
         */
        {
            scriptClass: "mstrmojo.winphone.RootView"
        });
})();
(function() {

    mstrmojo.requiresCls("mstrmojo.android.medium.RootView", 
                         "mstrmojo.winphone._IsMobileBookletWinPhone");      
    
    /**
     * RootView class for Windows phone
     * 
     * @class
     * @extends mstrmojo.android.medium.RootView
     * 
     * @borrows mstrmojo.winphone._IsMobileBookletWinPhone
     */
    mstrmojo.winphone.RootView = mstrmojo.declare(
            
        mstrmojo.android.medium.RootView,

        [ mstrmojo.winphone._IsMobileBookletWinPhone ],

        /**
         * @lends mstrmojo.android.medium.RootView.prototype
         */
        {
            scriptClass: "mstrmojo.winphone.RootView"
        });
})();
/**
 * MobileAppProxy.js Copyright 2010 MicroStrategy Incorporated. All rights reserved.
 *
 * @version 1.0
 * @fileoverview Proxy object to handle interactions with the native Mobile application shell when running a Mobile Application hosted within a web browser.
 */
(function () {

    mstrmojo.requiresCls("mstrmojo.dom",
                         "mstrmojo.storage.DOMLocalStorage",
                         "mstrmojo.DebugResSetStore",
                         "mstrmojo.BarcodeReader",
                         "mstrmojo.SimpleXHR",
                         "mstrmojo.android.EnumOrientationTypes");

    var SIZE_PHONE = 4.3,
        SIZE_TABLET = 10.1,
        DPI_SIZES = [ 160, 213, 240, 320, 480 ],
        DPI = -1;

    var $D = mstrmojo.dom,
        $MATH = Math,
        _cfgKey = "DefaultMobileDeviceConfig",
        _diagnosticModeKey = "DiagnosticMode",
        debug = false,
        startProfile = 0,
        EnumOrientationTypes = mstrmojo.android.EnumOrientationTypes,
        OR_PORTRAIT = EnumOrientationTypes.PORTRAIT,
        OR_LANDSCAPE = EnumOrientationTypes.LANDSCAPE,
        lockedOrientation = 0,
        profileData;


    /**
     * Logs trace logging calls to the window.console.
     *
     * @param {String} direction 'enter' or 'exit'.
     * @param {String} when The time in milliseconds.
     * @param {String} methodName The name of the method.
     * @param {String} className The name of the class.
     *
     * @private
     */
    function logJsMethod(direction, when, methodName, className) {
        // Are we debugging?
        if (debug) {
            // Create identifier.
            var id = className + '::' + methodName;

            // Is this an entry log?
            if (direction) {
                // Do we have not profile data yet?
                if (!profileData) {
                    // Set start time and initialize profile data.
                    startProfile = when;
                    profileData = {};
                }

                // Store current when as method start time.
                profileData[id] = when;

                // Log enter item.
                console.log(id + ' enter: ' + (when - startProfile));

            } else {
                // Log exit item.
                console.log(id + ' exit: ' + (when - startProfile) + '\t' + (when - profileData[id]));

                // Kill profile data for this method.
                delete profileData[id];

                // Is profile data empty?
                if (mstrmojo.hash.isEmpty(profileData)) {
                    // Kill profile data.
                    profileData = null;
                }
            }
        }
    }

    /**
     * Logs passed arguments to the console if the static debug flag is true.
     *
     * @private
     */
    function debugLog() {
        if (debug) {
            console.log('Log:', arguments);
        }
    }

    /**
     * XHR transport for use in development mode.
     *
     * @private
     */
    window.mstrMobileApp = {

        /**
         * Flag to indicate that the proxy is being used.
         */
        isProxy: true,

        setTaskServletName: mstrmojo.emptyFn,
        putSession:  mstrmojo.emptyFn,
        setBinaryFormat: mstrmojo.emptyFn,
        setDiagnosticMode: mstrmojo.emptyFn,

        useBinaryFormat: function () {
            return false;
        },

        getDiagnosticMode: function () {
            return $LS.getItem(_diagnosticModeKey) === true;
        },

        // Stub for CSPAT Lite profiling.
        enterJavaScriptMethod: function (when, methodName, className) {
            logJsMethod(true, when, methodName, className);
        },

        // Stub for CSPAT Lite profiling.
        exitJavaScriptMethod: function (when, methodName, className) {
            logJsMethod(false, when, methodName, className);
        },

        reloadDefaultConfiguration: function () {
            return true;
        },

        takeScreenShot: function () {
            debugLog('take screen shot', arguments);
        },

        getScreenShot: function () {
            debugLog('retrieve screen shot', arguments);
            return '';
        },

        takeScreenShotAndSend: function () {
            debugLog('share', arguments);
        },

        getDeviceDPI: function getDeviceDPI() {
            var dpi = DPI,
                sizes = DPI_SIZES;

            if (dpi < 0) {
                // Calculate screen DPI based on screen size (constant) and actual screen pixel measurement.
                var isTablet = mstrApp.isTablet(),
                    dimensions = mstrApp.getScreenDimensions(),
                    calculatedDPI = $MATH.round($MATH.sqrt($MATH.pow(dimensions.h, 2) + $MATH.pow(dimensions.w, 2)) / (isTablet ? SIZE_TABLET : SIZE_PHONE));

                // clamp the calculated DPI to our range of sizes
                calculatedDPI = $MATH.min( $MATH.max(sizes[0], calculatedDPI ), 320 );

                // Iterate DPI choices.
                mstrmojo.array.forEach(sizes, function (d) {
                    // Is this a phone AND is this the special 213 DPI?
                    if (!isTablet && d === 213) {
                        // Skip it.
                        return;
                    }

                    // Is the calculated DPI less than the DPI choice (plus 20%)?
                    if (calculatedDPI < d + (d * 0.05)) {
                        // Close enough so use this DPI.
                        DPI = dpi = d;

                        // Return to halt iteration.
                        return false;
                    }
                });
            }

            return dpi;
        },

        useNativeMap: function useNativeMap() {
            return true;
        },

        showMapView: function showMapView(forceShow) {
            return;
        },

        hideMapView: function hideMapView(forceShow) {
            return;
        },

        registerMapRendering: function registerMapRendering(id) {
            //if there is already a different map id registered
            if (this.mapId && this.mapId !== id) {
                return false;
            }

            this.mapId = id;
            return true;
        },

        deregisterMapRendering: function deregisterMapRendering(id) {
            if (this.mapId === id) {
                delete this.mapId;
            }
        },

        toast: function toast(msg) {
            mstrmojo.alert(msg);
        },

        getGeoLocation: function getGeoLocation(callbackName) {
            var cb = mstrmojo.hash.walk(callbackName);
            cb({
                coords: {
                    latitude: 38.916138,
                    longitude: -77.2183157,
                    altitude: 0
                }
            });
            //cb({success: false , msg: "blah, blan"});
        },

        isTablet: function isTablet() {
            return (mstrApp.deviceType === 4);
        },

        /**
         * Show the wait message on the Mobile App Proxy since we don't have a progress bar.
         */
        showProgress: function showProgress(text) {
            mstrApp.showHTMLProgress(text);
        },

        /**
         * Hide the message whenever we hide the progress bar.
         */
        hideProgress: function hideProgress() {
            mstrApp.hideHTMLProgress();
        },

        setNetworkMonitoringEnabled: function () {
            return; // do nothing
        },

        /**
         * Loads specified URL into web view
         */
        loadURL: function (url) {
            window.location = url;
        },

        setSysMenu: function setSysMenu(id, groups, labels, actions, checked, icons) {
            //debugLog('menu', arguments);
            var view = mstrmojo.all[id],
                dialog,
                items = [];

            // Create set of dialog items from menu items.
            mstrmojo.array.forEach(labels, function (txt, idx) {
                items.push({
                    n: txt,
                    v: groups[idx] + '|' + actions[idx]
                });
            });

            // Iterate up the parent chain from the current view.
            var menuHostView;
            while (view) {
                // Can this view host a title bar button?
                if (view.createTitleBarButton) {
                    // Cache reference to view and halt iteration.
                    menuHostView = view;
                    break;
                }

                // Check parent.
                view = view.parent;
            }

            // Did we find a menu host?
            if (menuHostView) {
                // Create the title bar button.
                menuHostView.createTitleBarButton('hostedMenuBtn', function () {
                    // Notify app that menu is about to be shown.
                    mstrApp.menuShown();

                    // Show menu dialog.
                    dialog = mstrApp.showDialog({
                        cssClass: 'mstrmojo-SimpleOptions',
                        buttons: [ mstrmojo.Button.newInteractiveButton('Cancel') ],
                        children: [{
                            scriptClass: 'mstrmojo.android.SimpleList',
                            isElastic: true,
                            items: items,
                            postselectionChange: function (evt) {
                                // Close the dialog.
                                dialog.close();

                                // Handle the menu item.
                                mstrmojo.all[id].handleMenuItem(this.items[evt.added[0]].v);
                            }
                        }]
                    });
                }, 'Menu');

            }
        },

        allowLandscapeOrientation: function () {
            debugLog('orientation', arguments);
        },

        setWaitScreenVisibility: function () {
            debugLog('wait screen visibility', arguments);
        },

        resetDPC: function () {
            debugLog('reset device passcode', arguments);
        },

        openLink: function (uri, target) {
            debugLog('openLink', arguments);
            window.open(uri, (target || '_blank'));
        },

        clearWebViewCache: function (includeDisk) {
            debugLog('clearWebViewCache', includeDisk);
        },

        displayHelp: function () {
            debugLog('help');

            window.open('http://dev-mrkt-web/producthelp/9.4/mobile/Android/en/index.html', 'mstrHelp');
            return '';
        },

        displayLearnMore: function () {
            debugLog('learn more');

            window.open('http://www.microstrategy.com/m/', 'mstrLearnMore');
            return '';
        },

        getLocaleInfo: function () {
            debugLog('getLocale', arguments);
            // locale support for native environment.  Currently using english us as default.  If want to test for a different locale just update the lan and cntry var values.
            var lan = "en",
                cntry = "_US";
            return "metadataLocale:" + lan + ",displayLocale:" + lan + ",messagesLocale:" + lan + ",warehouseDataLocale:" + lan + ",numberLocale:" + lan + cntry + ",numberLocaleOverride:true";
        },

        getResourceBundleJson: function () {
            debugLog('getResourceBundleJson', arguments);
        },

        displaySelectBox: function (cb) {
            debugLog("select_box", arguments);
            cb(1);
        },

        getScreenDimensions: function getScreenDimensions() {
            var body = document.body;
            return body.offsetHeight + '|' + body.offsetWidth;
        },

        /**
         * Proxy for the method that returns the orientation of the device.
         */
        getOrientation: function () {
            var body = document.body;
            return body.offsetWidth < body.offsetHeight ? OR_PORTRAIT : OR_LANDSCAPE;
        },


        /**
         * Proxy for the method that saves the device configuration; in host environment this method updates the config. stored in DOM local storage
         * @param {String} newCfg New configuration data in JSON form
         * @param {boolean} silently unused
         */

        saveConfiguration: function (newCfg,silently) {
            $LS.setItem(_cfgKey, newCfg, -1);
        },

        /**
         * Retrieves the device configuration; in hosted environment the device configuration is retrieved from the DOM local storage if exists
         * otherwise returns a hard coded default.
         * @returns Configuration data in JSON form
         * @type String
         */
        getConfiguration: function () {
            var cfg = $LS.getItemAsString(_cfgKey);
            if (!cfg) {
                cfg = '{"n":"Android","cid":"be4dc468-c070-429f-a8f2-f57491b99c36","v":1,"bld":"9.2.300.069J","dt":3,"cntr":0,"lnk":{"am":1,"rt":0,"nm":"","po":-1,"ipo":true},"gnl":{"ml":250,"nt":60,"ll":12,"mls":50,"uas":true,"usc":true,"usl":true,"usd":true,"fc":true,"mgc":10,"plc":2,"cc":1,"pe":-1,"uptc":-1,"cvi":600,"sci":600,"pn":2,"rar":5,"es":true,"efs":true,"art":2,"ucs":false,"cs":"","ipe":false,"dmatp":10,"dcn":4,"dd":0,"dtm":true,"drn":false,"drsc":false,"drcl":false},"cty":{"am":1,"ow":false,"wsl":[{"nm":"10.21.16.91","po":"8080","pt":"mobile","ty":0,"rt":0,"udc":false,"wsc":{"am":1,"lo":"","ps":""},"pdc":{"am":1,"lo":"","ps":""},"pl":[{"pc":{"am":1,"lo":"mhaugen","ps":""},"pn":"MicroStrategy Tutorial (for RW)","sn":"intqe64-1","sp":0,"udc":false,"pid":"51D31B4070ABC9D9A7F7C2A743352574"},{"pc":{"am":1,"lo":"mhaugen","ps":""},"pn":"MicroStrategy Tutorial (for RW)","sn":"intqe64-2","sp":0,"udc":false,"pid":"8766A305D2D235181079A1D2A5A1565D"}]}]},"hsc":{"tp":1,"cst":{"fmt":{"bkg":{"tp":1,"fll":{"tp":0,"clr":0}},"ttl":{"tp":1,"cap":"MicroStrategy Mobile"},"btn":{"fnt":16777215,"stl":2,"brd":16777215,"fll":{"tp":0,"clr":2500134}},"btnl":{"rc":3,"cc":1},"vw":{"rpt":true,"rct":true,"stg":true,"hlp":true}},"btns":[{"act":5,"cap":"Shared Library","dsc":"Navigates to the default folder of the project(s) in the deployment.","icn":1},{"act":4,"cap":"Settings","dsc":"Opens the Application Settings dialog.","icn":1},{"act":6,"cap":"Help","dsc":"Displays the application\'s Help file.","icn":1}]}}}';
                this.saveConfiguration(cfg);
            }

            return cfg;
        },

        goBack: mstrmojo.emptyFn,

        getResSetStore: function getResSetStore(projId) {
            //return null;
            return new mstrmojo.DebugResSetStore(projId);
        },

        getResSetStoreMgr: function getResSetStoreMgr() {
            if (!this.resSetStoreMgr) {
                this.resSetStoreMgr = {
                    getResSetStore: function getResSetStore(projId) {
                        //return null;
                        return new mstrmojo.DebugResSetStore(projId);
                    },
                    removeProjectCaches: function removeProjectCaches(projId) {
                        var store = new mstrmojo.DebugResSetStore(projId);
                        store.removeProjectCaches(projId);
                    },
                    clear: function clear() {
                        var store = new mstrmojo.DebugResSetStore();
                        store.clear();
                    }
                };
                return this.resSetStoreMgr;
            }
            mstrMobileApp.getResSetStoreMgr();
        },

        removeProjectCaches: function removeProjectCaches(pid) {
            if (mstrApp.getConfiguration().getCacheEnabled()) {
                mstrApp.getResSetStoreMgr().removeProjectCaches(pid);
            }
        },

        loadMap: function () {
            debugLog("load map", arguments);
        },

        getTitleBarHeight: function () {
            debugLog("get title bar height", arguments);
        },

        nudgeWidget: function () {
            debugLog("nudge widget", arguments);
        },

        scrollerUpdated: function () {
            debugLog('scrollerUpdated', arguments);
        },

        sliceResponse: function () {
            debugLog('sliceResponse', arguments);
        },

        layoutResponse: function () {
            debugLog('sliceResponse', arguments);
        },

        sendCallback: function () {
            debugLog("send callback", arguments);
        },

        showPopupDialog: function () {
            debugLog("show up Dialog", arguments);
        },

        closePopupDialog: function () {
            debugLog("close Dialog", arguments);
        },

        navigateAway: function () {
            debugLog("navigate away from a document", arguments);
        },

        renderDataRow: function () {
            debugLog("render data row inside info window", arguments);
        },

        findAddress: function () {
            debugLog("find address for geo location", arguments);
        },

        hideLayoutSelector: function () {
            debugLog("hide Layout Selector", arguments);
        },

        getAppVersion: function () {
            return "9.3.000.047";
        },

        getSDKVersion: function () {
            return 15;
        },

        getTextAsset: function (path) {
            var xhr = new mstrmojo.SimpleXHR({
                    isTask: false,
                    async: false
                }),
                results = "";

            // Make request to XHR.
            xhr.request('GET', "../assets/" + path, {
                success: function (res) {
                    results = res;
                }
            });
            return results;
        },

        hasCertificate: function hasCertificate() {
            return false;
        },
        getCertificateAuthenticationFields: function getCertificateAuthenticationFields() {
            return "{\"login_info\":{\"field\":[{\"n\":\"login\",\"tp\":\"text\",\"dn\":\"Login: \"},{\"n\":\"pwd\",\"pass\":true,\"tp\":\"text\",\"dn\":\"Password: \"}],\"msg\":\"Please enter credentials for the certificate server.\"}}";
        },
        getNewCertificate: function getNewCertificate(settings) {
            // alert(JSON.stringify(settings));
            // return "{ \"message\": \"(Incorrect login\\/password.[User not found.])\", \"code\": \"-5\"}";
            return "{\"prs\":{\"pr\":[{\"n\":\"edat\",\"v\":1345242803706},{\"n\":\"issr_n\",\"v\":\"1.2.840.113549.1.9.1=#1616686c6565406d6963726f73747261746567792e636f6d,cn=was-tzlee77.corp.microstrategy.com,o=microstrategy,l=vienna,st=virginia,c=us\"}]}}";
        },
        getCertificateDetails: function getCertificateDetails() {
            return "{\"prs\":{\"pr\":[{\"n\":\"edat\",\"v\":1345242803706},{\"n\":\"issr_n\",\"v\":\"1.2.840.113549.1.9.1=#1616686c6565406d6963726f73747261746567792e636f6d,cn=was-tzlee77.corp.microstrategy.com,o=microstrategy,l=vienna,st=virginia,c=us\"}]}}";
        },

        readBarcodes: function readBarcodes(id, name, paramStr, selectedPrompts, displayKeypadView, callbackStr) {
            if (!paramStr) {
                var bv = '28536598';
                alert("Barcode value: " + bv);
                mstrmojo.BarcodeReader.onBarcodeResult(id, -1, bv);
                return;
            }

            var params = JSON.parse(paramStr),
                factory = mstrApp.modelFactory || mstrApp.viewFactory,
                es = factory.newElementDataService();

            params.searchPattern = "28536598";
            es.getElements(params, {
                success: function (res) {
                    mstrmojo.BarcodeReader.onBarcodeResult(id, -1, JSON.stringify(res));
                },
                failure: function (details) {
                    alert("---Failed");
                }
            });
        },

        uploadPhotos: function (paramstr, callback) {
            eval(callback + "('http://www.google.com.hk/intl/zh-CN/images/logo_cn.png', 'google_logo');");
        },

        captureSignature: function (paramStr, callback) {
            eval(callback + "('http://www.modernshortstories.net/thingsonawhitebackground/images/" + (Math.floor(Math.random() * 10) + 1) + ".jpg')");
        },

        getCachedTime: function getCachedTime(did, st) {
            //For debugging purposes
            return new Date().getTime() - 240000;
        },

        isDPCEnabled: function isDPCEnabled() {
            return false;
        },

        lockOrientation: function lockOrientation(or) {
            debugLog("lock orientation", arguments);
            lockedOrientation = or;
        },

        releaseOrientation: function releaseOrientation() {
            debugLog("release orientation", arguments);
            lockedOrientation = 0;
        },

        getLockedOrientation: function getLockedOrientation() {
            return lockedOrientation;
        },

        enterFullScreen: function enterFullScreen() {
            debugLog("enter fullscreen", arguments);
        },

        exitFullScreen: function exitFullScreen() {
            debugLog("exit fullscreen", arguments);
        },

        forceRepaint: function forceRepaint() {
            // Do nothing for now.
        },

        restartReconciler: function restartReconciler() {
        	// stub
        },

        sendEmail: function sendEmail(address, subject, txtBody, cc) {
            window.location = 'mailto:' + address + '?Subject=' + subject.replace(/ /g, '%20') + '&body=' + txtBody.replace(/\r\n/g, '%0D%0A') + '&cc=' + (cc || '').replace(/ /g, '%20');
        },

        onlineFlag: true,

        isOnline: function isOnline() {
            return this.onlineFlag;
        },

        isCached: function isCached(realPid, oid, t) {
            return false;
        },

        /**
         * Simulates a change in connectivity.
         *
         * @param {Boolean} isOnline Whether the application is now online.
         *
         */
        setOnlineMode: function setOnlineMode(isOnline) {
            this.onlineFlag = isOnline;
            mstrApp.onConnectivityChanged(isOnline);
        }
    };

    // Attach an event handler so that the backspace key will step backwards through the mobile app.
    $D.attachEvent(document.body, 'keydown', function (e) {
        e = e || window.event;
        var kc = e.keyCode || e.which;

        if ((kc === 8) && !e.shiftKey) {
            // if the target of the keydown is an INPUT element (but not a SELECT) then
            // use the default behavior.
            if (e.target.nodeName.match(/INPUT/i) && !e.target.type.match(/SELECT/i)) {
                return true;
            }

            $D.preventDefault(window, e);
            $D.stopPropogation(window, e);
            mstrmojo.all.mobileApp.goBack();
            return false;
        }
        return true;
    });

}());
(function () {

    mstrmojo.requiresCls("mstrmojo.Button",
                         "mstrmojo.css",
                         "mstrmojo.hash");

    var $CSS = mstrmojo.css,
        $HASH = mstrmojo.hash,
        cssGlow = 'glow';

    /**
     * <p>A touch enabled button that can hold an image or text.</p>
     *
     * @class
     * @extends mstrmojo.Button
     * 
     * @borrows mstrmojo._TouchGestures
     */
    var $BTN = mstrmojo.android.ui.Button = mstrmojo.declare(
        mstrmojo.Button,

        [ mstrmojo._TouchGestures ],

        /**
         * @lends mstrmojo.android.ui.Button.prototype
         */
        {
            scriptClass: 'mstrmojo.android.ui.Button',

            onclick: mstrmojo.emptyFn,

            touchBegin: function touchBegin() {
                // Add glow class if enabled.
            	if ( this.enabled ) {
                    $CSS.addClass(this.domNode, cssGlow);
            	}
            }, 

            touchTap: function touchTap(touch) {
                // Simulate click event if enabled.
            	if ( this.enabled ) {
	                this.onclick({
	                    e: touch.evt
	                });
            	}
            },

            // Needed so that _TouchGestures will create select action.
            touchSelectBegin: mstrmojo.emptyFn,

            touchSelectEnd: function touchSelectEnd(touch) {
                // Simulate click event if enabled.
            	if ( this.enabled ) {
                    this.onclick({
                        e: touch.evt
                    });
            	}
            },

            touchEnd: function touchEnd() {
                // Remove glow class.
                $CSS.removeClass(this.domNode, cssGlow);
            }
        }
    );

    // Strip "mstrAttach" event handler tokens from markup string.
    $BTN.prototype.markupString = $BTN.prototype.markupString.replace(new RegExp(' mstrAttach:[a-zA-Z,]*'), '');

    /**
     * Creates an interactive button that will glow when user touches it.
     * 
     * @param {String} text The text to appear in the button.
     * @param {Function} [fnClick] An optional function to execute when the button is clicked.
     * @param {Object} [props] An optional collection of properties to add to the button.
     *
     * @return {Object} The button configuration object.
     * @static
     */
    $BTN.newButton = function newButton(text, fnClick, props) {
        // Create base button config.
        var btn = {
            scriptClass: 'mstrmojo.android.ui.Button',
            text: text
        };

        // Do we have an onclick function?
        if (fnClick) {
            btn.onclick = fnClick;
        }

        // Copy extra properties.
        $HASH.copy(props, btn);

        return btn;
    };
}());
(function () {
    
    mstrmojo.requiresCls("mstrmojo.android.medium.ViewFactory",
                         "mstrmojo.winphone.MobileDoc");
 
    /**
     * <p>A static factory for creating windows phone specific objects.</p>
     * 
     * @class
     * @extends mstrmojo.android.medium.ViewFactory
     * @public
     */
    mstrmojo.winphone.ViewFactory = mstrmojo.declare(
        mstrmojo.android.medium.ViewFactory,
        
        null,
        
        /**
         * @lends mstrmojo.android.medium.ViewFactory
         */
        {
            scriptClass: 'mstrmojo.winphone.ViewFactory',
            
            /**
             * Creates application root view
             * 
             * @param {String} params.id A view ID.
             * @param {String} params.placeholder A view placeholder.
             * 
             * @returns mstrmojo.winphone.RootView
             */
            newRootView: function newRootView(params) {
                return new mstrmojo.winphone.RootView(params);
            },

            /**
             * Custom hook used to create MobileDoc from winphone package
             * 
             */            
            mobileDoc: mstrmojo.winphone.MobileDoc            
        }
    );
}());
(function() {

    mstrmojo.requiresCls("mstrmojo.Widget", "mstrmojo.css", "mstrmojo.TextBox");
    
    /**
     * A text box with a label next to it.
     * 
     * @class
     * @extends mstrmojo.TextBox
     */
    mstrmojo.TextBoxWithLabel = mstrmojo.declare(
        // superclass
        mstrmojo.TextBox,
        
        // mixins
        null,
        
        /**
         * @lends mstrmojo.TextBoxWithLabel.prototype
         */
        {
            scriptClass: 'mstrmojo.TextBoxWithLabel',
                        
            /**
             * The string to appear before the textbox.
             * 
             * @type String
             */
            label: '',
            
            /**
             * The string to appear after the textbox.
             * 
             * @type String
             */
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
(function(){
    mstrmojo.requiresCls("mstrmojo.Box");

    /**
     * <p>A widget to display an Android specific Android Map.</p> 
     * 
     * This is intended to live inside an AndroidView widget as the contentChild.
     * 
     * @class
     * @extends mstrmojo.Box
     */
    mstrmojo.maps.jsmap.InfoWindow = mstrmojo.declare(
        mstrmojo.Box,

        null,

        {            
            scriptClass: "mstrmojo.maps.jsmap.InfoWindow",
            
            rowIndex : -1,
            
            init: function init(props){
                this._super(props);
            },

            start : function start(){
                this.render();
                this.update(this.rowIndex);
            },
            
            update : function update(rowIndex){
                this.rowIndex = rowIndex;
                var res = this.containerNode,
                innerHTML = '<table><tbody>' + 
                '<tr>' + 
                '<td colspan="2" class="androidMap-infoWindowTitle">'+ mapDataObj.getAttributeName(rowIndex) + '</td>' + 
                '</tr>';
                //Default font and background colors
                innerHTML += this.getMetricInfo();
                innerHTML += '</tbody></table>';
                res.innerHTML = innerHTML;
            },
            
            getMetricInfo : function getMetricInfo(){            
                // NOTE: Using eval() here to parse the metric values array did NOT work. eval() returned some quasi-array that was part object
                //          and part array, e.g.  metricData instanceof Array returned FALSE, typeof metricData === "object", length was a function, not a property.
                //          This is likely because the getMetricValues() method on the Java side returns a JSONArray.
                var metricData = JSON.parse(mapDataObj.getMetricValues(this.rowIndex).toString()),
                    res = '',
                    mdLen = metricData.length;
                                                        
                for(var i = 0; i < mdLen; i++){
                    var item = metricData[i]; 
                    if(item.ts == 4){
                        res += '<tr><td class="androidMap-infoWindowText"> '+ mapDataObj.getMetricName(i) +' </td><td><img src="' + item.v +'"></td></tr>';
                    }else{
                      //Default font and background colors
                      var fColor = 'black',
                          bColor = 'transparent';
                      
                      //If using thresholds, use the background and font color from the data
                      if(mapDataObj.useThresholds()){
                          fColor = mapDataObj.getThresholdColorRGB(item.fcti); //font color
                          bColor = mapDataObj.getThresholdColorRGB(item.bcti); //background color
                      }
                      res += '<tr><td class="androidMap-infoWindowText">'+ mapDataObj.getMetricName(i) +'</td><td style="background-color:'+ bColor +';color:'+ fColor +';">'+ item.v + '</td></tr>';
                    }
                }
                return res;
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
        //Contains boolean values keyed by project Id. The value true for a given project indicates that postLogin was called successfully
        //for it. This is necessary for off-line mode to prevent calling postLogin multiple times.
        postLoginFlag = {};

    /**
     * Get user runtime info after login. Used for drilling when using binary format.
     *
     * @param {Object} request The request created in the {@link mstrmojo.MobileServerProxy.request} method.
     */
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
            //Offline mode
            params.projectID = realPid;
        }
        mstrApp.serverRequest(
            params,
            { //Callback
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
            { //Config
                //We shall submit it immediately without checking session state otherwise we will
                //get into infinite loop in off-line mode
                skipLogin : true,
                /*TQMS 652803 Make sure we don't hold this request in ServerProxy.request method*/
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

        // push the edit box item (with label) for the password
        items.push( {
            scriptClass: "mstrmojo.Label",
            cssClass: "mstrmojo-PasswordDialog-Label",
            text: "You must supply a new password."
        });

        dialogConfig.children = items;

        // Add Ok and Cancel buttons.
        dialogConfig.buttons = [
            $BTN($DESC(221, 'Cancel'), function() {
                // user clicked the cancel button; indicate that we are manually closing the dialog
                // as a side effect of cancelling all pending connections
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

            // push the edit box item (with label) for the password
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

        // Add Ok and Cancel buttons.
        dialogConfig.buttons = [
            $BTN($DESC(221, 'Cancel'), function() {
                mstrApp.cancelPending();
            }  ),
            btnOk
        ];

        dialog = mstrApp.showDialog(dialogConfig);
    }


    /**
     * Handles the "password expired" error case when logging in.  Does six things:
     *  1. Alerts user that a new password is required
     *  2. Prompts the user for the old password
     *  3. Prompts the user for the new password
     *  4. Confirms the new password
     *  5. Sends "changePassword" task to the server
     *  6. Updates and saves the device configuration with the new password
     *
     */

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

        // TQMS #658948 hide the loading indicator before prompting the user
        mstrApp.hideMessage();

        // the login info from the cfg. may not contain the user id.  We will have prompted the user
        // for it earlier so just extract it from the requeset and use for the changePassword task.
        params.loginInfo.uid = request.params.userid;

        // alert the user that a new password is required
        notifyUserNewPasswordRequired( params, function(params) {

            // prompt the user for the old password
            doPasswordDialog( $H.copy({ title: "Enter your old password",
                                        dlgType: EnumPasswordDlgType.OLD_PASSWORD,
                                        enableOK: true }, params ), function(params) {

                // prompt the user for the new password
                doPasswordDialog( $H.copy({ title: "Enter your new password",
                                            dlgType: EnumPasswordDlgType.NEW_PASSWORD,
                                            enableOK: true }, params ), function(params) {

                    // prompt the user to confirm the new password
                    doPasswordDialog( $H.copy( { title: "Confirm your new password",
                                                dlgType: EnumPasswordDlgType.CONFIRM_NEW_PASSWORD,
                                                enableOK: (params.loginInfo.npwd == "") }, params ), function(params) {

                        // success callback - called when password changed on the server
                        var fnSuccess = function(p) {
                            return function(res) {
                                var liInfo = p.loginInfo,
                                	npwd = liInfo.npwd,
                                	nuid = liInfo.uid;

                                // update the device configuration with the new password
                                if ( project.udc ) {
                                    var server = cfg.getServerByProjectId(projectId);
                                    server.pdc.ps = npwd;
                                    server.pdc.lo = nuid;
                                } else {
                                    project.pc.ps = npwd;
                                    project.pc.lo = nuid;
                                }
                                cfg.saveConfiguration();

                                // re-attempt the login with the updated password
                                request.params.password = npwd;

                                login.call(me,request);
                            };
                        }(params),

                        // failure callback - called when password could not be changed on server, usually due to bad 'old password'
                        fnFailure = function(res) {
                            var callback = request.callback;

                            // Failed so call the original failure callback.
                            if (callback.failure !== undefined) {
                                callback.failure(res);
                            }

                            // Call the complete callback as well.  Don't need to test for handler because the
                            // _super added one in the request method.
                            callback.complete(request.id);
                        };

                        // Invoke "changePassword" task to update the password on the server
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
                            // TQMS#658948 Make sure we don't hold this request in ServerProxy.request method
                            doNotHold : true
                        });
                    });

                });

            });

        });
    }

    /**
     * prompts the user for login name and password.  Returns FALSE if user cancels.
     */
    function promptForCredentials(loginInfo, isServer, callback) {

        var dialog,
            btnOk,
            getInstance = mstrmojo.getInstance,
            fnNewInput = function (descId, valueNode, type, props) {
                // Return text box with label config.
                return getInstance($H.copy(props, {
                    scriptClass: 'mstrmojo.TextBoxWithLabel',
                    cssDisplay: 'table-row',
                    label: $DESC(descId) + ":",
                    value: loginInfo[valueNode],
                    type: type || 'text',
                    onEnter: function () {
                        // Is the button enabled?
                        if (btnOk.enabled) {
                            // Simulate an onclick event.
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
                    // Set focus to input element.
                    this.focus();
                },
                onvalueChange: function() {
                    // Set Ok button enablement.
                    btnOk.set('enabled', !!this.value.length);
                }
            }),
            userPwd = fnNewInput(18, 'pwd', 'password');

        btnOk = getInstance($BTN($DESC(9935, 'Log In'), function () {
            // Pass new values to login info.
            var name = loginInfo.uid = userId.value;
            loginInfo.pwd = userPwd.value;

            // Is there a user name?
            if (name.length) {
                // Execute callback after time out.
                window.setTimeout(function() {
                    callback();
                }, 100);                             // #528431  Please don't change the timeout it should be 100 for this issue.
            }
        }, {
            enabled: false
        }));

        // Show dialog.
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
                // User clicked the cancel button; indicate that we are manually closing the dialog
                // as a side effect of canceling all pending connections.
                dialog.manualClose = true;
                mstrApp.cancelPending();
            }), btnOk ]
        });
    }

    /**
     * Determines whether we need to prompt the user for mobile server creds, project creds, or both.
     *
     * If creds. are needed from the user we display prompt dialog.  The callback function is called
     * once all creds. have been gathered.
     *
     */

    function needServerCreds( loginInfo ) {
    	return ( ( loginInfo.wsam > 1 ) && !loginInfo.wsuid );
    }

    function needProjectCreds( loginInfo ) {
    	return ( !loginInfo.uid && loginInfo.am != 2  );
    }

    function getCredentials( li, callback ) {
        var loginInfo = li,
            needUpdateCfg = false;

        // local function that prompts for server creds. and chains to provided callback
        var promptForServerCreds = function(cb) {
            var serverCreds = { uid: loginInfo.wsuid, pwd: loginInfo.wspwd },
                callback = function() {
                    loginInfo.wsuid = serverCreds.uid;
                    loginInfo.wspwd = serverCreds.pwd;

                    // indicate that the server creds have changed
                    loginInfo.updateCfgAfterLogin |= 0x01;

                    cb();
                };

            promptForCredentials.call(this, serverCreds, true, callback );
        };

        // local function that prompts for PROJECT creds. and chains to provided callback
        var promptForProjectCreds = function(cb) {
            var projCreds = { uid: loginInfo.uid, pwd: loginInfo.pwd },
                callback = function() {
                    loginInfo.uid = projCreds.uid;
                    loginInfo.pwd = projCreds.pwd;

                    // indicate that the project creds have changed
                    loginInfo.updateCfgAfterLogin |= 0x02;

                    cb();
                };
            promptForCredentials.call(this, projCreds, false, callback);
        };

        // do we need both SERVER and PROJECT creds?
        if ( needServerCreds(loginInfo) && needProjectCreds( loginInfo )  ) {
            // yes - call both local functions to get the creds.
            var ths = this;
            promptForServerCreds.call(this, function() {
                promptForProjectCreds.call(ths,callback);
            } );

        // do we just need the SERVER creds?
        } else if ( needServerCreds( loginInfo ) ) {

            promptForServerCreds.call(this,callback);

        // do we just need the PROJECT creds?
        } else if ( needProjectCreds( loginInfo ) ) {

            promptForProjectCreds.call(this, callback);

        } else {

            // we have all the creds we need  - just login
            callback();
        }
    }

    /*
     * Checks if we can use a cache. Called when we cannot get session state
     */
    function canUseCache(request) {
        var cfg = this._mobileCfg,
            pid = request.pid,
            project = cfg.getProject(pid),
            realPid = project.realPid,
            loginInfo = cfg.getLoginInfo(pid);

        //We can use cache if the project has real project ID and if login info contains user ID
        if ( mstrApp.useBinaryFormat && realPid && loginInfo.uid) {
            request.params.projectID = realPid;
            return true;
        }
        return false;
    }

    /**
     * Postprocessing after successful login. It is also called in offline mode or
     * if login failed but we can use caches
     */
    function postLogin(request) {
        var me = this,
            cfg = me._mobileCfg,
            projectId = request.pid,
            realPid = request.params.projectID,
            transport = me.transport,
            id = me.id,
            callback = {
                success: function(res){
                    // Cache it for future use
                    var l = localeInfoMap[projectId] = mstrmojo.hash.obj2array(res);
                    mstrmojo.hash.copy(l, mstrmojo.locales);

                    if ( mstrApp.useBinaryFormat ) {
                        // If using binary format, then get user runtime first.
                        getProjectSettings.call(me, request);
                    } else {
                        postLoginFlag[projectId] = true;
                        // Submit the request.
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
                //We shall submit it immediately without checking session state otherwise we will
                //get into infinite loop in off-line mode
                skipLogin : true,
                /*TQMS 652803 Make sure we don't hold this request in ServerProxy.request method*/
                doNotHold : true
            };
        if ( realPid) {
            params.projectID = realPid;
        }

        // Invoke "getLocaleInfo" task to get mstrmojo.locales instance.
        me.request(callback, params, false, config);
    }
    /**
     * Logs into the server/project for the passed in requests and submits the request if login succeeds.
     *
     * @param {Object} request The request created in the {@link mstrmojo.MobileServerProxy.request} method.
     */
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

                        	// stop reprompt timer now that we've logged in
                        	clearInterval(repromptTimer);

                            //
                            // NOTE: if you modify the project configuration by adding new properties client-side, you
                            //          MUST add appropriate code to MstrMainActivity.removeClientAddedProperties() to remove these properties.
                            //          Failure to do so will result in caches being cleared for each configuration install. See #756850
                            //

                        	// TQMS 690526: Save 'Email screenshot from device' setting to configuration
                        	// so that it can be saved to DB for offline mode use.
                        	project.es = res.hasEmailScreenPriv;

                            // #512703 update configuration after successful prompt and login
                            if ( loginInfo.updateCfgAfterLogin ) {
                                cfg.updateLoginInfo(projectId,loginInfo);
                            }

                            //Save real project ID
                            cfg.setRealPid(project, res.projectID);
                            // Cache the sessionState.
                            var sessionState = sessions[projectId] = res.sessionState;
                            mstrMobileApp.putSession(projectId, sessionState);

                            // Add the new sessionState to the request.
                            request.params.sessionState = sessionState;

                            // #640811,640813 check for Mobile Server compatibility
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

	                        // Failed so call the original failure callback.
	                        if ((callback.failure !== undefined) && !isHttpAuthFail) {
	                            //Suppress error messag
	                            res.noErrorMessage = canUseCacheFlag || needToReprompt || res.requireDeviceCertificate;

	                            // for authentication fail errors, suppress any dialog that may result from calling the failure handler
	                            res.handledError = needToReprompt || res.requireDeviceCertificate;

	                            callback.failure(res);
	                        }


	                        // are we NOT reprompting the user for credentials?  If not then
	                        // call the complete callback as well.  Don't need to test for handler because the
	                        // _super added one in the request method.

	                        if ( !needToReprompt ) {
		                        callback.complete(request.id);
	                        }

	                        //TQMS 515357
	                        //If we can use cashes, then we still can submit request.
	                        //Otherwise we shall report an error.
	                        if ( canUseCacheFlag && !mstrMobileApp.isOnline()) {
	                            postLogin.call(me, request);
	                        } else {
	                            res.method = "login";

	                            // is this an authentication fail error?
	                            if ( needToReprompt ) {

                                    if ( isAuthFail ) {
                                        cfg.clearLoginInfoForProject(projectId);
                                    }

	                            	// TQMS #727819 for HTTP auth. errors, remove any stored creds. before reprompting
		                            if ( isHttpAuthFail ) {
		                            	var	server = cfg.getServerByProjectId(projectId),
		                            		creds;

		                            	// does the server use the default creds?
		                            	if ( server.udc ) {
		                            		// yes, reset the default creds
		                                    creds = cfg.getDefaultServerCreds();
		                            	} else {
		                            		// reset the creds for this specific server
		                            		creds = server.wsc;
		                            	}
		                            	// remove the user name and password
	                                    delete creds.lo;
	                                    delete creds.ps;

	                                    // save the configuration so the getLoginInfo() call below picks up the changes.  This
	                                    // also causes the user to be prompted next time if he cancels this current login attempt
		                                cfg.saveConfiguration();

		                                // TQMS#732090 display better msg. for HTTP 401 errors
	                                    res.message = $DESC( 10672, "The username or password you entered is incorrect." );
		                            }

	                            	// YES, reset the 'handled' flag so we display an alert
	                            	res.handledError = false;

	                            	// pass a callback function that will cause the creds. to be reprompted
	                            	errorCallback = function() {
			                            repromptForCreds = true;
		                            };
	                            }

	                            // Ask the app to handle the error.
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
                        //TQMS 491366
                        wsSize: 10,
                        //TQMS 504283
                        authMode: loginInfo.am,

                        //TQMS 507404
                        wsuid: loginInfo.wsuid,
                        wspwd: loginInfo.wspwd,
                        wsam: loginInfo.wsam,

                        //TQMS 640811,640813 add client type and version
                        clientVersion: mstrMobileApp.getAppVersion(),
                        clientType: mstrMobileApp.isTablet() ? devTypes.ANDROID_TAB : devTypes.ANDROID_PHONE

                    }),
                    loginConfig = {
                        projectId: projectId,
                        mobileConfig: cfg,
                        /*TQMS 652803 Make sure we don't hold this request in ServerProxy.request method*/
                        doNotHold : true
                    };
                me.request(loginCallback, loginParams, false, loginConfig); // Submit false so we don't override the current request.
            },
            foo = doLogin;

        getCredentials.call( this, loginInfo, doLogin );

        repromptTimer = setInterval( function () {

            if ( repromptForCreds ) {
            	// stop reprompting
            	repromptForCreds = false;

            	// get a fresh copy of the login info (i.e. uid and password)
            	loginInfo = cfg.getLoginInfo(projectId);

            	// reprompt the user for credentials
            	getCredentials.call( me, loginInfo, doLogin );
            }

        }, 500 );

    }

    /**
     * Proxy object to handle Mobile server requests.
     *
     * @class
     * @extends mstrmojo.ServerProxy
     */
    mstrmojo.MobileServerProxy = mstrmojo.declare(
        mstrmojo.ServerProxy,

        null,

        /**
         * @lends mstrmojo.MobileServerProxy.prototype
         */
        {
            scriptClass: "mstrmojo.MobileServerProxy",

            getSessions: function() {
                return sessions;
            },

            /**
             * @override to cache project id for request object.
             * @ignore
             */
            request: function request(callback, params, override, config) {
                // Store the project Id so it can be added to the request object.
                this._projectId = config.projectId;

                // Store the mobile configuration so it can be used to assemble requests.
                this._mobileCfg = config.mobileConfig;

                this._super(callback, params, override, config);
            },

            /**
             * @override To add custom request properties for Mobile applications.
             * @ignore
             */
            createRequest: function createRequest(requestId, callback, params, config) {
                var request;
                try {
                    // Get default request.
                    request = this._super(requestId, callback, params, config);

                    // Add mobile specific properties to the default request.
                    var projectId = this._projectId;
                    request.pid = projectId;
                    if ( ! config.noTaskURL ) {
                    request.taskURL = this._mobileCfg.getTaskUrlByProject(projectId);
                    }
                    request.isLogin = (params.taskId === $mobileLogin);
                    request.isPwdChange = (params.taskId == $chgPassword);
                } catch(ex) {
                    // delete the request from the collection since we have failed to create it completely
                    this.deleteRequest(requestId);
                    throw ex;
                }

                // Return request.
                return request;
            },

            /**
             * Returns TRUE if user interaction is required to process request.  Overridden to determine if we are
             * going to need to present a login dialog.
             *
             * @param {Object} request request being processed
             */
            userInteractionRequired: function userInteractionRequired(request) {
                var result = false;

                // do we need to login to the project before handling this request?
                if ( request.pid && !sessions[request.pid]) {

                    var loginInfo = request.config.mobileConfig.getLoginInfo(request.pid),
                        needServerCreds = ( ( loginInfo.wsam > 1 ) && !loginInfo.wsuid ),
                        needProjectCreds = ( !loginInfo.uid && loginInfo.am != 2  );

                    // if we need to prompt for either creds. then we return TRUE
                    return needServerCreds || needProjectCreds;
                }

                return result;
            },

            /**
             * @override To add session state and login automatically is session state is missing.
             * @ignore
             */
            submitRequest: function submitRequest(request) {
                // Is this a login request.
                if (request.isLogin || request.isPwdChange  ) {
                    // Submit request...
                    this._super(request);

                    // and exit, no more to do.
                    return;
                }

                // Try to retrieve session based on project Id.
                var state = sessions[request.pid],
                    localeInfo = localeInfoMap[request.pid];

                // Do we already have a session for this project?
                if (state) {
                    // Add session state to params.
                    request.params.sessionState = state;

                    if (localeInfo){
                        mstrmojo.hash.copy(localeInfo, mstrmojo.locales);
                    }

                      // Submit request using super.
                    this._super(request);

                } else {
                    if ( request.config.skipLogin ) {
                        this._super(request);
                        return;
                    }
                    if ( mstrMobileApp.isOnline() ) {
                        // We don't have session state so we need to login first.  The login method will automatically
                        // submit the request if the login succeeds.
                        login.call(this, request);
                    } else {
                        //TQMS 515357
                        //If we can use cashes then we still can submit request.
                        if ( canUseCache.call(this, request)) {
                            //If this is the first call in offline mode we must call postLogin to get locale info
                            //and project settings
                            if ( ! postLoginFlag[request.pid] ) {
                                postLogin.call(this, request);
                            } else {
                                this._super(request);
                            }
                        } else {
                            //Let it fail. It will produce a proper message
                            login.call(this, request);
                        }
                    }
                }
            },

            /**
             * @override To automatically login if session is stale.
             * @ignore
             */
            response: function response(requestId, status, res) {
                var request = this.getRequest(requestId);

                // Do we NOT have a request?
                if (!request) {
                    // Request must have been canceled so there is nothing to do here.
                    return;
                }

                // Did the server request fail?
                if (!status && mstrMobileApp.isOnline()) {
                    switch (parseInt(res.code,10)) {
                        case $ERRS.AUTHEN_E_LOGIN_FAIL_EXPIRED_PWD:
                        case $ERRS.AUTHEN_E_LOGIN_FAILED_NEW_PASSWORD_REQD:
                            handleExpiredPassword.call(this,request);
                            return;
                            break;

                        case $ERRS.MSI_INBOX_MSG_NOT_FOUND:
                            // what to do?
                            break;

                        case $ERRS.E_MSI_USERMGR_USER_NOTFOUND:
                            if (!request.isLogin) {
                                // Delete the stale session.
                                delete request.params.sessionState;

                                // Login.  The login method will automatically submit the request again if the login call succeeds.
                                login.call(this, request);

                                // Return since the request hasn't really completed yet.
                                return;
                            }
                            break;
                    }
                }

                // Let the _super handle it.
                this._super(requestId, status, res);
            },

            getSession: function getSession(projectId) {
                return sessions[projectId];
            },

            closeSession: function closeSession(projectId) {
                //To do....
            },

            closeAllSessions: function closeAllSessions() {
                //To do...
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
