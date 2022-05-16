

var xmjd = mstrmojo && mstrmojo.descriptors;

var mstrmojo = {


    
    descriptors: xmjd || {},

    
    meta: {
        TP: "t",     
        STP: "st"    
    },

    emptyFn: function () {},

    
    now: function now() {
        return new Date().getTime();
    },

    
    usesFrames: false
};



mstrmojo.gmaps = {};

(function () {
    var $mojo = mstrmojo;

    
    $mojo.global = (function () {
        var f = function () {
            return this;
        };
        return f.call(null);
    }());

    
    $mojo.dbg = $mojo.emptyFn;
    $mojo.dbg_stack = $mojo.emptyFn;
    $mojo.dbg_xhr = $mojo.emptyFn;
    $mojo.dbg_profile = $mojo.emptyFn;


    
    $mojo.platform = {};
    $mojo.prompt = {};
    $mojo.settings = {};
    $mojo.ui = {};
    $mojo.ACL = {};
    $mojo.storage = {};
    $mojo.utils = {};
    $mojo.maps = {};
    $mojo.maps.androidmap = {};
    $mojo.maps.jsmap = {};
    $mojo.graph = {};
    $mojo.IPA = {};
    $mojo.ME = {};
    $mojo.Architect = {};
    $mojo.plugins = {};
    $mojo.gmaps = {};
    $mojo.DI = {};
    $mojo.qb = {};
    $mojo.WH = {};
    $mojo.txEditor = {};

    
    $mojo.express = {
        ui: {}
    };

    
    $mojo.android = {
        controllers: {},
        factories: {},
        inputControls: {},
        large: {
            controllers: {},
            factories: {},
            ui: {}
        },
        medium: {
            controllers: {},
            factories: {},
            ui: {}
        },
        selectors: {},
        ui: {}
    };

    
    $mojo.iphone = {};

    
    $mojo.winphone = {};

    
    $mojo.mstr = {};


    
    $mojo.err = function err(e) {
        
        var s = e.name + ': "' + e.message + '"';

        if ($mojo.debug) {
            if (e.fileName) {
                s += ' at\n    ' + e.fileName;
            }
            if (e.hasOwnProperty('lineNumber')) {
                s += ': ' + e.lineNumber;
            } else if (e.hasOwnProperty('line') && e.sourceURL) { 
                var a = e.sourceURL.split('/');
                s += '(' + a[a.length > 1 ? a.length - 1 : 0] + ':' + e.line + ')';
            }
        }

        
        this.dbg(s);
 

        
        if ($mojo.Dialog) {
            $mojo.alert(e.message, null, e.name);
        } else {
            window.alert(s);
        }
    };

    
    $mojo.confirm = function confirm(msg) {
        return window.confirm(msg);
    };

    
    $mojo.alert = function alrt(msg) {
        window.alert(msg);
    };

    
    var canParseFuncs = !!(/return true/.test(function () {
        return true;
    }));

    
    $mojo.mixin = function mixin(src, dest) {
        if (src) {
            dest = dest || {};
            var funcCallsSuper = /this\.\_super/;

            
            var fnWrapMethod = function (overwriting, inher) {
                return function superwrap() {
                    var tmp = this._super;
                    this._super = inher;
                    var ret = overwriting.apply(this, arguments || []);
                    this._super = tmp;
                    return ret;
                };
            };

            
            var fnOnMixin = src.__onmixin__;
            if (fnOnMixin) {
                delete src.__onmixin__;
            }

            var n;
            for (n in src) {
                
                
                if ((typeof src[n]  === 'function') && (!canParseFuncs || funcCallsSuper.test(src[n]))) {
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    dest[n] = fnWrapMethod(src[n], dest[n]);
                } else {
                    
                    dest[n] = src[n];
                }
            }

            
            if (fnOnMixin) {
                src.__onmixin__ = fnOnMixin;
            }
        }
        return dest;
    };
}());

(function () {

    
    var _xhr;

    
    var _missing = {};

    var _G = mstrmojo.global,
        _app = _G.mstrApp || {},
        _jsRoot = _app.jsRoot || "../javascript/",
        _jsMojoRoot = _app.jsMojoRoot || "../javascript/mojo/js/source/",
        _isIE = !!document.all;     

    
    function _fqcn2File(fqcn) {
        if (fqcn.match(/^mstrmojo\.plugins\./)) {
            var pluginName = fqcn.substring(17, fqcn.indexOf(".", 17));
            fqcn = '../plugins/' + pluginName + '/javascript/' + _jsMojoRoot + fqcn.replace("mstrmojo.plugins." + pluginName + '.', "").replace(/\./gm, '/');
        } else if (fqcn.match(/^mstrmojo\./)) {
            fqcn = _jsMojoRoot + fqcn.replace("mstrmojo.", "").replace(/\./gm, '/');
        } else {
            fqcn = _jsRoot + fqcn.replace(/\./gm, '/');
        }
        return fqcn + '.js';
    }

    function _getXHR() {
        
        
        _xhr = self.XMLHttpRequest ? new XMLHttpRequest() : (self.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : null);
    }
    
    function _syncGet(file) {
        var result = null;

        if (!_xhr) {
            _getXHR();
        }
        if (_xhr) {
            try {
                
                _xhr.open("GET", file, false);
                _xhr.send(null);
                
                result = _xhr.responseText || null;
            } catch (localerr) {}

            
            
            if (!_isIE && _xhr.abort) {
                _xhr.abort();
            }

        }
        return result;
    }

    
    function encodeParams(params) {
        var x = -1,
            url = [],
            p;

        if (params) {
            for (p in params) {
                url[++x] = p + '=' + encodeURIComponent(params[p]);
            }
        }

        return url.join('&');
    }

    
    function appendUrlParams(method, baseUrl, params) {
        if (method !== 'GET' || !params) {
            return baseUrl;
        }

        return baseUrl + '?' + encodeParams(params);
    }

    function _syncXHR(method, baseUrl, params) {
        var result = null;

        
        method = method.toUpperCase();
        if (!_xhr) {
            _getXHR();
        }
        if (_xhr) {
            try {
                var config = mstrConfig,
                    m = null;

                if (window.microstrategy !== undefined && microstrategy) {
                    m = microstrategy;
                }

                
                params.taskContentType = params.taskContentType || 'json';
                params.taskEnv = 'xhr';
                params.xts = mstrmojo.now();

                params = mstrmojo.addCSRFTokenToTaskParams(params);

                
                var ptp = (config && config.persistTaskParams) || (m && m.persistParams);
                if (ptp) {
                    mstrmojo.requiresCls("mstrmojo.hash");
                    mstrmojo.hash.copy(ptp, params);
                }

                _xhr.open(method, appendUrlParams(method, baseUrl, params), false);

                if (method !== 'POST') {
                    params = null;
                } else {
                    params = encodeParams(params);
                    _xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                }

                _xhr.send(params);
                
                result = _xhr.responseText || null;
            } catch (localerr) {
                window.console.log(localerr);
            }
        }
        return result;
    }
    
    function _jsGet(file, nullCheck) {
        var js = _syncGet(file);
        if (js) {
            try {
                eval(js);

                return nullCheck ?
                        !!eval(nullCheck) :
                        true;
            } catch (localerr) {
                window.alert('JavaScript compile error:\n\nFile: ' + file + '\n\nError: ' + localerr.message);
            }
        }
        return false;
    }

    
    mstrmojo.loader = {
        
        loaded: {
            mstrmojo: true,
            "mstrmojo.loader": true
        },

        
        isLoaded: function isLd(fqcn) {
            var o;
            try {
                o = eval(fqcn);
            } catch (localerr) {}
            if (o) {
                this.loaded[fqcn] = true;
            }
            return !!o;
        },

        
        load: function ld(fqcn) {
            
            if (_missing[fqcn]) {
                return false;
            }
            
            if (this.loaded[fqcn] || this.isLoaded(fqcn)) {
                return true;
            }
            
            if (_jsGet(_fqcn2File(fqcn), fqcn)) {
                this.loaded[fqcn] = true;
                return true;
            }

            _missing[fqcn] = true;
            return false;
        }
    };

    var _L = mstrmojo.loader,
        _LL = _L.loaded;

    
    var _reqCache = {};

    
    mstrmojo.requiresCls = function reqCls() {
        
        var as = arguments,
            ns = [],
            len = as.length,
            i;

        
        for (i = 0; i < len; i++) {

            
            var n = as[i];
            if (!n || _LL[n] || _reqCache[n] || _missing[n]) {
                continue;
            }

            if (!n.match(/^mstrmojo\.plugins\./)) {
                
                var ps = n.split('.'),
                    klen = ps.length,
                    k;

                for (k = 1; k < klen; k++) {
                    var s = ps.slice(0, k).join('.');
                    if (!_reqCache[s]) {
                        ns.push(s);
                        _reqCache[s] = true;
                    }
                }
            }
            
            ns.push(n);
            _reqCache[n] = true;
        }
        
        var jlen = ns.length,
            j;
        for (j = 0; j < jlen; j++) {
            if (!_L.load(ns[j])) {
                window.alert('Warning: Javascript class not found:\n' + ns[j]);
                break;
            }
        }
        return true;
    };

    
    var _D = mstrmojo.descriptors,
        _dPrefix = 'mstrWeb.';

    
    function populateDescriptors(ds) {
        if (ds) {
            var dlen = ds.length,
                di;
            for (di = 0; di < dlen; di++) {
                var d = ds[di];
                _D[d.key] = d.v;
            }
        }
    }

    mstrmojo.populateDescriptors = populateDescriptors;

    
    if (window.mstrConfig !== undefined) {
        populateDescriptors(mstrConfig.mstrDescs && mstrConfig.mstrDescs.descriptors);

    
        mstrConfig.mstrDescs = null;
    }
    if (typeof mstrApp != 'undefined') {
        populateDescriptors(mstrApp.mstrDescs && mstrApp.mstrDescs.descriptors);
    }

    
    if (typeof mstrApp != 'undefined') {
        populateDescriptors(mstrApp.mstrDescs && mstrApp.mstrDescs.descriptors);
    }

    
    var _reqDesc = function (prefix, ids) {
        
        var as = ids,
            ns = [],
            len = as.length,
            i;

        for (i = 0; i < len; i++) {
            var k = as[i];
            if (k && !(_D.hasOwnProperty(prefix + k))) {
                ns.push(k);
            }
        }
        if (ns.length > 0) {
            var response = _syncXHR('POST', (window.mstrConfig && mstrConfig.taskURL) || 'taskProc', {
                taskId: 'getDescriptors',
                keys: ns.join(','),
                prefix: prefix
            });

            if (response) {
                var r = eval('(' + response + ')');
                populateDescriptors(r && r.descriptors);
            }
        }
    };

    
    mstrmojo.requiresDescsWPrefix = function reqDescP(prefix) {
        var p = prefix,
            args = [].slice.call(arguments);

        args[0] = null;
        _reqDesc(p, args);
    };

    
    mstrmojo.requiresDescs = function reqDesc() {
        
        
        if (window.mstrConfig !== undefined && !mstrConfig.onMobileDevice) {
            _reqDesc(_dPrefix, arguments);
        }
    };

    
    mstrmojo.desc = function desc(descID, defText) {
        
        if (descID !== null && descID !== undefined) {
            
            mstrmojo.requiresDescs(descID);

            
            if (_D.hasOwnProperty(_dPrefix + descID)) {
                return _D[_dPrefix + descID];
            }

            
            defText = defText || "No string descriptor found for descID=" + descID;
        }

        
        var decDefText = "[" + defText + "]";

        
        _D[_dPrefix + descID] = decDefText;

        return decDefText;
    };

    
    mstrmojo.descP = function descP(prefix, descID, defText) {
        
        mstrmojo.requiresDescsWPrefix(prefix, descID);

        
        if (_D.hasOwnProperty(prefix + descID)) {
            return _D[prefix + descID];
        }

        
        defText = defText || "No string descriptor found for descID=" + descID;

        
        var decDefText = "*" + defText + "*";

        
        _D[prefix + descID] = decDefText;

        return decDefText;
    };

    

    
    mstrmojo.provide = function prv(fqcn, cls) {
        _LL[fqcn] = !!cls;
        return cls;
    };

       
    
    mstrmojo.invalidateCls = function rel(fqcn) {
        _reqCache[fqcn] = false;
        _LL[fqcn] = false;

        eval(fqcn + " = null");
    };

    var mx = mstrmojo.mixin;

    
    mstrmojo.declare = function dcl(SuperCls, mixins, config) {
        
        function constr(props) {
            if ((!props || !props.dontInit) && this.init) {
                this.init(props);
            }
        }

        
        
        
        
        
        
        
        if (SuperCls) {
            constr.prototype = new SuperCls({dontInit: true});
            constr.prototype.constructor = constr;
        }

        var proto = constr.prototype;

        
        var cnt = (mixins && mixins.length) || 0,
            i;
        for (i = 0; i < cnt; i++) {
            mx(mixins[i], proto);
        }

        
        if (config) {
            mx(config, proto);
            if (config.scriptClass) {
                _LL[config.scriptClass] = true;
            }
        }

        return constr;
    };

    
    mstrmojo.findAncestor = function findAncestor(src, property, value, limitClass) {
        var ancestor = src && src.parent;
        while (ancestor && (!limitClass || !(ancestor instanceof limitClass))) {
            var targetProperty = ancestor[property];
            if (targetProperty !== undefined) {
                if (value !== undefined && value !== null) {
                    if (targetProperty === value) {
                        return ancestor;
                    }
                } else {
                    return ancestor;
                }
            }

            ancestor = ancestor.parent;
        }

        return null;
    };

    
    mstrmojo.isDescendant = function isDescendant(parent, child) {
        var ancestor;

        if(!child || !parent) {
            return false;
        }
        ancestor = child.parent;
        
        while(ancestor) {
            
            if(ancestor === parent) {
                return true;
            }
            
            ancestor = ancestor.parent;
        }
        return false;
    };

    
    mstrmojo.getCSRFToken = function getVRN(url) {
        var tkn = null;

        try {
            if (url) { 
                if (url.indexOf('validateRandNum=') >= 0) { 
                    return tkn;
                }

                var curURL = window.location.href;
                var servletName = window.mstrApp && mstrApp.name,
                    taskProcName = window.mstrConfig.taskURL && mstrConfig.taskURL,
                    isSameWebApp = (url.indexOf(servletName) === 0 || 
                        url.indexOf('./' + servletName) === 0 || 
                        url.indexOf(taskProcName) === 0 || 
                        url.indexOf('./' + taskProcName) === 0 || 
                        url.indexOf(curURL) === 0 || 
                        ((curURL.indexOf('?') > 0) && (url.indexOf(curURL.substring(0, curURL.indexOf('?'))) === 0))); 
                if (!isSameWebApp) { 
                    return tkn;
                }
            }
            if (window.mstrApp && mstrApp.validateRandNum) {
                tkn = mstrApp.validateRandNum;
            } else if (window.mstrConfig && mstrConfig.validateRandNum) {
                tkn = mstrConfig.validateRandNum;
            } else if (window.microstrategy !== undefined && microstrategy && microstrategy.validateRandNum) {
                tkn = microstrategy.validateRandNum;
            }
        } catch (err) {
            
        }
        return tkn;
    };

    
    mstrmojo.addCSRFTokenToURL = function addCSRFTknToURL(url) {
        if (!url) {
            return '';
        }
        var tkn = mstrmojo.getCSRFToken(url);
        if (tkn && tkn.length > 0) {
            if (url.indexOf('?') > 0) {
                url += "&";
            } else {
                url += "?";
            }
            url += "validateRandNum=" + tkn;
        }
        return url;
    };

    
    mstrmojo.addCSRFTokenToTaskParams = function addCSRFTknToTaskParams(params) {
        if (params) {
            var tkn = mstrmojo.getCSRFToken();
            if (tkn && tkn.length > 0) {
                params.validateRandNum = tkn;
            }
        }
        return params;
    };

    
    mstrmojo.getInstance = function getInstance(config) {
        var Clazz = mstrmojo.hash.walk(config.scriptClass, window);
        if (Clazz) {
            return new Clazz(config);
        }

        return null;
    };

}());
(function(){
    
    
    mstrmojo.hash = mstrmojo.provide(
    "mstrmojo.hash",
    {
        
        copy: function copy(src, dest) {
            if (src) {
                dest = dest || {};

                for (var n in src) {
                    dest[n] = src[n];
                }
            }
            return dest;
        },

        
        copyProps: function copyProps(ns, src, dest) {
            
            dest = dest || {};
            
            if (src) {
                
                for (var i = 0, len = (ns && ns.length) || 0; i < len; i++) {
                    var n = ns[i];
                    
                    if (n in src) {
                        
                        dest[n] = src[n];
                    }
                }
            }
            return dest;
        },
        
        
        forEach: function forEach(hash, f, scope) {
            if (hash) {
                for (var key in hash) {
                    if (scope) {
                        if (f.call(scope, hash[key], key, hash) === false) {
                            break;
                        }
                    } else {
                        if (f(hash[key], key, hash) === false) {
                            break;
                        }
                    }
                }
            }
        },
        
        
        walk: function walk(path, context) {
            if (!context) {
                context = mstrmojo.global;
            }
            var parts = path.split('.');
            if (parts.length == 1) {
                return context[path];
            }
            for (var i=0, len=parts && parts.length || 0; i<len; i++) {
                context = context[parts[i]];
                if (!context) {
                    break;
                }
            }
            return context;
        },
        
        
        isEmpty: function( hash) {
            if (!hash) {
                return true;
            }
            for (var k in hash) {
                if (hash[k] != null) {  
                    return false;
                }
            }
            return true;
        },
        
        
        clear: function clr(h){
            if (h) {
                for (var k in h){
                    delete h[k];
                }
            }
            return h;
        },
        
        
        any: function( hash,  keyOrValue) {
            if (hash) {
                for (var k in hash) {
                    return keyOrValue ? k : hash[k];
                }
            }
            return undefined;
        },

        
        clone: function cln(obj) {
            if (!obj) {
                return null;
            }
            
            var c;
            if (obj.constructor === Array) {
                
                c = obj.concat();
                
                var first = c[0];
                if (first && typeof(first) === 'object') {
                    for (var i=0, len=c.length; i<len; i++){
                        c[i] = this.clone(obj[i]);
                    }
                }
            } else {
                
                c = {};
                for (var k in obj) {
                    var v = obj[k];
                    
                    if (v && typeof(v) == 'object') {
                        
                        c[k] = this.clone(v);
                    } else {
                        
                        c[k] = v;
                    }
                }
            }
            return c;
        },
        
        
        cloneArray: function clnArr( arr) {
            var arr2 = [];
            for (var i=0, len=(arr&&arr.length)||0; i<len; i++) {
                arr2[i] = this.clone(arr[i]);
            }
            return arr2;
        },

        
        keyarray: function kyarr(h, nums) {
            var arr = [];
            if (h) {
                for (var k in h) {
                    arr.push(nums ? Number(k) : k);
                }
            }
            return arr;
        },
        
        
        valarray: function varr(h){
            var arr = [];
            if (h) {
                for (var k in h) {
                    arr.push(h[k]);
                }
            }
            return arr;
        },
        
        equals: function eq(h1, h2) {
            
            var _H = mstrmojo.hash,
                _rslt = h1 && h2 || (!h1 && !h2 && (h1 === h2));
            
            if (_rslt && h1) {
                
                _rslt = (h1.constructor === h2.constructor);
                if (_rslt) {
                    
                    if (h1.constructor === Array) {
                        var len = h1.length;
                        
                        _rslt = (len === h2.length);
                        
                        if (_rslt && len){
                            
                            for (var i = 0; i < len; i ++) {
                                _rslt = _rslt && _H.equals(h1[i], h2[i]);
                            }
                        }
                    
                    } else if (typeof (h1) === 'object'){
                        
                        var h1k = _H.keyarray(h1),
                            h2k = _H.keyarray(h2);
                        _rslt = h1k.length === h2k.length;
                        if (_rslt){
                            for (var p in h1){
                                _rslt = _rslt && (_H.equals(h1[p], h2[p]));
                            }
                        }
                    
                    } else {
                        _rslt = (h1 === h2);
                    }
                }
            }
            return _rslt;
        },
        
        obj2array: function(o){
           for(var n in o){
              var p = o[n];
              if(p && typeof(p) == 'object'){
                  o[n] = this.obj2array(p);
              } 
           }
           if('isArray' in o && (o.isArray === true)){
               var r = [];
               for(var i=0,len=o.length;i<len;i++){
                   r.push(o[i]);   
               }
               return r;
           } else {
               return o;   
           }
        },
        
        
        
        min: function min(h, vals, nums){
            var m;
            if (h) {
                for (var k in h){
                    var v = vals ? h[k] : k;
                    if (nums) {
                        v = Number(v);
                    }
                    if ((m == null)||(v < m)){
                        m = v;
                    }
                }
            }
            return m;
        },
        
        
        make: function mk(h, c, props) {
            if (!h || !c) {
                return null;
            }
            if (h.attachEventListener) {
                
                return h;
            }
            if (c.makeObservable) {
                h = c.makeObservable(h, props) || h;
            } else {
                this.copy(c.prototype, h);
                if (h.init) {
                    h = h.init(props) || h;
                }
            }
            return h;
        }
    });
    
})();
(function(){

         
    var _reTOKENS = /\{\@([^\}]+)\}/gm,
        _reLT = /\</gm,
        _reGT = /\>/gm,
        _reNEm = /\S/,
        _regSpecials = ['$','^','=','!',':',
                    '/', '.', '*', '+', '?', '|',
                    '(', ')', '[', ']', '{', '}', '\\'
                  ],
        _reRegEsc = new RegExp(
                '(\\' + _regSpecials.join('|\\') + ')', 'g'
        ),
        _xmlRep = {
                    '&': { k: '&(?!#?\\w+;)', v: '&amp;'},
                    '<'            : '&lt;',
                    '>'            : '&gt;',
                    'u0009'        : '&#x09;',  
                    '\n'           : '&#x0A;',  
                    '\r'           : '&#x0D;',  
                    '"'            : '&quot;'
                    },
       _htmlRep = {
                    '&': { k: '&(?!#?\\w+;)', v: '&amp;'},
                    '<'            : '&lt;',
                    '>'            : '&gt;', 
                    ' '            : '&nbsp;',
                    '\n'           : '<br/>',  
                    '\r'           : '&nbsp;&nbsp;&nbsp;&nbsp;',  
                    '\''           : '&#039;',
                    '"'            : '&quot;'                    
                    },
       _htmlDecodeRep = {
                    '&amp;'         :'&',
                    '&lt;'		    : '<',
                    '&gt;'          : '>',
                    '&nbsp;'        : ' ',
                    '<br/>'         : '\n',  
                    '&nbsp;&nbsp;&nbsp;&nbsp;'  : '\r',  
                    '&#039;'        : '\'',
                    '&quot;'        : '"'
    };

    
    var _typeOf = function (v) {
        if (v == null) {
            return 'null';
        }
        var t = typeof(v);
        if (t != 'object') {
            return t;
        } else {
            if (v.length === undefined) {
                return 'object';
            } else {
                return 'array';
            }
        }
    };
    
    var parseUriOptions = {
        strictMode: false,
        
        key: [ 'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor' ],
        
        q: {
            name: 'queryKey',
            parser: /(?:^|&)([^&=]*)=?([^&]*)/g
        },
        
        parser: {
            strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
            loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
        }
    };        
    
	
	mstrmojo.string = mstrmojo.provide(
	        
	   "mstrmojo.string",
	   
	   
	   {

		
		multiReplace: function multiReplace(s, hash) {
			if (!s) {
				return '';
			}
			
			var keys = [];
			for (var k in hash) {
			    keys.push(k.k || k); 
			}
			
			return s.replace(new RegExp(keys.join('|'), 'g'), function ($0) {
				var v = hash[$0];
                return v.v || v;           
			});
		},
			
				
		trim: function trim( s) {
			return (s && s.replace)? s.replace(/^\s+/, "").replace(/\s+$/, ""):s;
		},

        
        ellipsize: function ellipsize(text, length) {
            
            var shortText = this.trim(text.substr(0, (length || 1) - 1));
    
            
            if (shortText !== text) {
                
                shortText += '&hellip;';
            }

            return shortText;
        },

        
        isEmpty: function isEmpty(v){
            return (v == null) || !(_reNEm.test(v)); 
        }, 

        regEscape : function regEscape(text){
            return text.replace(_reRegEsc, '\\$1');
        },
        
		
		encodeXMLAttribute : function(v) {
			return mstrmojo.string.multiReplace(v, _xmlRep);
		},
		
		encodeHtmlString: function(v) {
	        return mstrmojo.string.multiReplace(v, _htmlRep);
		},
		
		
		decodeHtmlString: function(v) {
	        return mstrmojo.string.multiReplace(v, _htmlDecodeRep);
		},
		
		
		htmlAngles: function(s){
		  s = String(s);
		  if (s != null) {    
		      return s.replace(_reLT, '&lt;').replace(_reGT, '&gt;');
		  }
		  return s;
		  
		},
		
        
        apply: function apl(tmpl, obj) {
            if (!tmpl) {
                return "";
            }
            return tmpl.replace(
                                _reTOKENS,
                                function tokenRepl(token, prop) {
                                        return (prop in obj && obj[prop] !== null) ? obj[prop] : "";
                                }
                    );
        },
        
        json2xml: function(nodeName, jsons, config){
            if (!(jsons instanceof Array)){
                jsons = [jsons];
            }
           
            var serial = config && config.isSerializable,
                convertBoolean = (config.convertBoolean === false)? false:true;
            
            
            var att= [],    
                ch = [],    
                n,          
                v,          
                t;          
            
            for (var ji = 0, jlen = jsons.length; ji < jlen; ji ++) {
                var json = jsons[ji];
                
                for (n in json){
                    
                    if (serial) {
                        var ret = serial(n, jsons, ji);
                        if (ret !== true){
                            if (ret === false) {    
                                continue; 
                            } else {
                                if (ret.att){       
                                    att.push(ret.att);
                                }
                                if (ret.child){     
                                    ch.push(ret.child);
                                }
                                continue;
                            }
                        }
                        
                    }                
                    v = json[n];
                    t = _typeOf(v);
                    switch(t) {
                        case 'array':
                            ch.push('<' + n + '>');     
                            
                            for (var i = 0, len = v.length; i < len; i ++){
                                var cn = config.getArrItemName(n,v,i) || i; 
                                ch.push(this.json2xml(cn, v[i], config));   
                            }
                            ch.push('</' + n + '>'); 
                            break;
                        case 'object':
                            ch.push(this.json2xml(n, v, config));
                            break;
                        case 'string':
                            att.push(n + '="' + mstrmojo.string.encodeXMLAttribute(v) + '"'); 
                            break;
                        case 'boolean':
                            att.push(n + '="' + ((convertBoolean)? (v ? '-1': '0'):v) + '"'); 
                            break;
                        case 'null': 
                            if (!config.skipNull) {
                                att.push(n + '="' + config.nullValue + '"');
                            }
                            break;
                        default:
                            att.push(n + '="' + v + '"'); 
                            break;
                    }
                } 
            } 
            return '<' + nodeName + ' ' + att.join(' ') + '>' + ch.join('') + '</' + nodeName + '>';
        },
        
        escape4HTMLText: function escape4HTMLText(v) {
            if (!v || !v.replace) {
                return v;
            }
            var QUOTE = /\"/gm;
            var QUOTE_ENCODED = '&quot;';
            var AMP = /\&/gm;
            var AMP_ENCODED = '&amp;';
            var LESSTHAN = /\</gm;
            var LESSTHAN_ENCODED = '&lt;';
            var GREATERTHAN = /\>/gm;
            var GREATERTHAN_ENCODED = '&gt;';
            return v.replace(AMP, AMP_ENCODED
                                ).replace(QUOTE, QUOTE_ENCODED
                                ).replace(LESSTHAN, LESSTHAN_ENCODED
                                ).replace(GREATERTHAN, GREATERTHAN_ENCODED);
        },
        
        
        parseUri: function (str, options) {
            options = options || parseUriOptions;
            
            var m = options.parser[((options.strictMode) ? 'strict' : 'loose')].exec(str),
                uri = {},
                i = 14;
            
            while (i--) {
                uri[options.key[i]] = m[i] || '';
            }
            
            uri[options.q.name] = {};
            uri[options.key[12]].replace(options.q.parser, function ($0, $1, $2) {
                if ($1) {
                    uri[options.q.name][$1] = $2;
                }
            });
            
            return uri;
        }

	});
	
})();
(function () {
    
    
    mstrmojo.array = mstrmojo.provide(
        "mstrmojo.array",
        
        {
            
            
            indexOf: function indexOf(arr, item) {
                var i = 0,
                    len = (arr && arr.length)  || 0;
                
                for (; i < len; i++) {
                    if (arr[i] == item) {
                        return i;
                    }
                }
                return -1;
            },
            
            
            indexOfMulti: function idxOf( arr,  items) {
                if (!items) {
                    return {indices: null, map: {}, count: 0};
                }
                var len = items.length,
                    idxs = new Array(len),
                    map = {},
                    c = 0;
                for (var i=0, j=(arr&&arr.length)||0; i<j; i++){
                    var a = arr[i];
                    for (var k = 0; k<len; k++) {
                        if (items[k] === a){
                            idxs[k] = i;
                            map[k] = i;
                            c++;
                            break;  
                        }
                    }
                }
                return {indices: idxs, map: map, count: c}; 
            },
            
            
            forEach: function forEach(arr, f, scope) {
                for (var i = 0, len = (arr && arr.length) || 0; i < len; i++) {
                    if (scope) {
                        if (f.call(scope, arr[i], i, arr) === false) {
                            break;
                        }
                    } else {
                        if (f(arr[i], i, arr) === false) {
                            break;
                        }
                    }
                }
            },
            
            
            filter: function filter( arr,  f,  config) {
                var result = [],
                    n = 0;
                for (var i=0, len=arr && arr.length || 0; i < len; i++) {
                    if (f(arr[i])) {
                        result[n] = arr[i];
                        n++;
                        if (config && config.max && (n >= config.max)) {
                            break;
                        }
                    }
                }
                return result;
            },
            
            
            find: function find( arr,  n,  v) {
                for (var i=0, len=arr && arr.length || 0; i < len; i++) {
                    var obj = arr[i];
                    if (obj && obj[n] == v) {
                        return i;
                    }
                }
                return -1;
            },
            
            
            findBin: function fBin( arr,  item,  p,  len) {
                var h = len ? len : arr.length, 
                    l = -1,         
                    m,              
                    v = item[p];    
                while (h-l > 1) {
                    if (arr[m = h+l >> 1][p] < v) { 
                        l = m;
                    } else {
                        h = m;
                    }
                }
                return arr[h][p] === v ? h : -1;
            },

            
            
            search: function search(o,v,p) {
                var h = o.length,
                    l = -1,
                    m,
                    val = v.toUpperCase(),
                    len = v.length;
                    
                while(h - l > 1)
                    if(o[m = h + l >> 1][p].substr(0,len).toUpperCase() < val) l = m;
                    else h = m;
                return h;
            },

            
            findMulti: function idxOf( arr,  n,  items) {
                if (!items) {
                    return {indices: null, map: {}, count: 0};
                }
                var len = items.length,
                    idxs = [], 
                    map = {},
                    c = 0;
                for (var i=0, j=(arr&&arr.length)||0; i<j; i++){
                    var a = arr[i][n];
                    for (var k = 0; k<len; k++) {
                        if (items[k][n] === a){
                            idxs[k] = i;
                            map[k] = i;
                            c++;
                            break;  
                        }
                    }
                }
                return {indices: idxs, map: map, count: c}; 
            },
            
            
            removeItem: function rmI( arr,  item) {
                var i = this.indexOf(arr, item);
                if (i >-1) {
                    this.removeIndices(arr, i, 1);
                }
                return i;
            },
            
            
            removeItems: function rmIts(arr, n, items){
                var ret = this.findMulti(arr, n, items);
                if (ret.count) {
                    
                    var idxs = ret.indices.concat().sort(this.numSorter).slice(0, ret.count);
                    for (var i=idxs.length-1; i>-1; i--) {
                        
                        arr.splice(idxs[i], 1);
                    }
                }
            },
            
            
            numSorter: function ns(a,b) {
                return Number(a)-Number(b);
            },

            stringSorter: function ss(a,b){
                var A = a.toLowerCase();
                var B = b.toLowerCase();
                if (A < B){
                   return -1;
                }else if (A > B){
                  return  1;
                }else{
                  return 0;
                }
            },
            
            
            removeIndices: function removeIds( arr,  start,  count) {
                arr.splice(start, count);
            },
            
            
            insert: function inst(arr, idx, items) {
                if (!arr) {
                    arr = [];
                }
                if (idx == null){
                    idx = arr.length;
                }
                Array.prototype.splice.apply(arr, [idx, 0].concat(items));
                return arr;
            },
            
            
            hash: function hs(arr) {
                var h = {};
                for (var i=0, len=(arr&&arr.length)||0; i<len; i++) {
                    h[arr[i]] = true;
                }
                return h;
            },
            
            
            get: function gt(arr, idxs){
                if (!idxs) {
                    return null;
                }
                var ret = [];
                for (var i=0, len=idxs.length; i<len; i++) {
                    ret[i] = arr[idxs[i]];
                }
                return ret;
            },

            
            deepSortArr: function deepSortArr(arr, prop,  idx, asc) {
                return arr.sort(function(a, b){
                    return (!asc ? (a[idx][prop] <= b[idx][prop]) : (a[idx][prop] > b[idx][prop])) ? -1 : 1;
                    }
                );
            }

        });
    
})();
(function () {

    mstrmojo.requiresCls("mstrmojo.hash",
                         "mstrmojo.array");

    
    var _subs = {};

    
    var _listenerMap = {};

    
    mstrmojo.publisher = mstrmojo.provide(
        "mstrmojo.publisher",

        
        {
            
            publish: function pub(id, type, data) {
                
                var ls = _subs[id] && _subs[id][type],
                    lid;
                if (!ls) {
                    return;
                }

                
                for (lid in ls) {
                    
                    var l = null;
                    if (lid) {
                        l = mstrmojo.all[lid];
                        
                        
                        
                        
                        if (!l) {
                            delete ls[lid];
                            continue;
                        }
                    }
                    
                    var ns = ls[lid].methods;
                    if (ns) {
                        
                        
                        var ctxt = l || mstrmojo.global,
                            n;
                        for (n in ns) {
                            if (ctxt[n]) {
                                ctxt[n](data);
                            }
                        }
                    }
                    
                    
                    
                    
                    var fs = ls[lid] && ls[lid].functions,
                        flen = (fs && fs.length) || 0;
                    if (flen) {
                        var i;
                        if (l) {
                            
                            for (i = flen - 1; i > -1; i--) {
                                if (fs[i]) {
                                    fs[i].apply(l, [data]);
                                }
                            }
                        } else {
                            
                            
                            for (i = flen - 1; i > -1; i--) {
                                if (fs[i]) {
                                    fs[i](data);
                                }
                            }
                        }
                    }

                }
            },

            
            subscribe: function sub(id, type, callback, listener) {

                
                var s = _subs[id];
                if (!s) {
                    s = {};
                    _subs[id] = s;
                }

                
                var e = s[type];
                if (!e) {
                    e = {};
                    s[type] = e;
                }

                
                var l = e[listener || ""];
                if (!l) {
                    l = {};
                    e[listener || ""] = l;
                }

                
                if (typeof callback  === "function") {
                    var fs = l.functions;
                    if (!fs) {
                        fs = [];
                        l.functions = fs;
                    }
                    fs.push(callback);
                } else {
                    
                    var ms = l.methods;
                    if (!ms) {
                        ms = {};
                        l.methods = ms;
                    }
                    ms[callback] = true;
                }

                
                var lmap = _listenerMap,
                    pmap = lmap[listener || ""];
                if (!pmap) {
                    pmap = {};
                    lmap[listener || ""] = pmap;
                }
                var emap = pmap[id];
                if (!emap) {
                    emap = {};
                    pmap[id] = emap;
                }
                emap[type] = true;


                
                return {
                    id: id,
                    type: type,
                    callback: callback,
                    listener: listener,
                    clear: function () {
                        mstrmojo.publisher.unsubscribe(this);
                    }
                };
            },

            
            unsubscribe: function unsub(sub) {
                var s = _subs[sub.id],
                    e = s && s[sub.type],
                    l = e && e[sub.listener || ""];
                if (!l) {
                    return;
                }

                var A = mstrmojo.array,
                    H = mstrmojo.hash,
                    tp = typeof sub.callback,
                    cleanupListener = false;
                if (tp === "function") {
                    
                    var fs = l.functions;
                    if (fs) {
                        A.removeItem(fs, sub.callback);
                        if (!fs.length) {
                            
                            delete l.functions;
                            
                            if (H.isEmpty(l.methods)) {
                                cleanupListener = true;
                            }
                        }
                    }
                } else {
                    
                    var ms = l.methods;
                    if (ms) {
                        delete ms[sub.callback];
                        if (H.isEmpty(ms)) {
                            
                            delete l.methods;
                            
                            if (!l.functions || !l.functions.length) {
                                cleanupListener = true;
                            }
                        }
                    }
                }
                
                if (cleanupListener) {
                    
                    delete e[sub.listener || ""];
                    
                    if (H.isEmpty(e)) {
                        
                        delete s[sub.type];
                    }
                }
            },

            
            hasSubs: function hasSubs(id, type) {
                var s = _subs[id],
                    evt = s && s[type];

                return !!evt;
            },

            
            clearSubscriptions: function clr(listener) {
                if (!listener) {
                    listener = "";
                }
                var sbs = _subs,
                    _H = mstrmojo.hash,
                    id;

                
                if (sbs[listener]) {
                    
                    delete sbs[listener];
                }

                
                var pmap = _listenerMap[listener];
                if (pmap) {
                    
                    for (id in pmap) {
                        var es = sbs[id],
                            emap = pmap[id],
                            e;
                        if (!es) {
                            continue;
                        }
                        
                        for (e in emap) {
                            
                            var ls = es[e];
                            if (!ls) {
                                continue;
                            }
                            delete ls[listener];
                            
                            if (_H.isEmpty(ls)) {
                                
                                delete es[e];
                            }
                        }
                    }
                }
            }
        }
    );

    mstrmojo.publisher.NO_SRC = "NO_SRC";
    mstrmojo.publisher.CONNECTIVITY_CHANGED_EVENT = "CONNECTIVITY_CHANGED";
    mstrmojo.publisher.RECONCILE_END_EVENT = "RECONCILE_END";

}());
(function () {

    var $MATH = Math;

    
    function _evt(hWin, e) {
        return e || (hWin || window).event;
    }

    
    var isIE = !!document.all,
        ua = navigator.userAgent,
        isFF = !isIE && !!ua.match(/Firefox/),
        bv = 0,
        isAndroid = !!ua.match(/Android/),
        isIPad = !!ua.match(/iPad/),
        tch = !!document.createTouch || isAndroid,
        isPlayBook = !!ua.match(/PlayBook/),
        isWinPhone = !!ua.match(/Windows Phone/),
        isIE10 = isIE && !!ua.match(/MSIE 10/),
        isIEW3C = !isIE && !!ua.match(/Trident.*rv/),
        isDXIE = isIE && !isIE10,
        CSS3_PREFIX = isFF ? '-moz-' :
                             isIE ? '' : '-webkit-',
        CSS3_TRANSFORM_PREFIX = isFF ? 'Moz' :
                                       isIE10 ? '' :
                                                isIE ? 'ms' : 'webkit',
        CSS3_T_INITIAL = (isIE10 ? 't' : 'T'),
        CSS3_TRANSITION = CSS3_TRANSFORM_PREFIX + CSS3_T_INITIAL + 'ransition', 
        CSS3_TRANSFORM = buildCSS3Transform(),
        CSS3_TRANSITION_PROPERTY = buildCSS3TransitionProperty(),
        CSS3_TRANSITION_DURATION = buildCSS3TransitionDuration(),
        CSS3_TRANSITION_END = buildCSS3TransitionEnd(),   
        CSS3_BOXSHADOW = buildCSS3BoxShadow();
        
    function buildCSS3Transform(){
        
        

        return CSS3_TRANSFORM_PREFIX + CSS3_T_INITIAL + 'ransform';
    }
    
    function buildCSS3TransitionProperty(){
        
        

        return CSS3_TRANSITION + 'Property';
    }     
    
    function buildCSS3TransitionDuration(){
        
        

        return CSS3_TRANSITION + 'Duration';
    }
    
    function buildCSS3TransitionEnd(){
        
        
        
        return (isIE10 || isFF) ? 'transitionend' :  'webkitTransitionEnd';
    }   
    

    function buildCSS3BoxShadow(){
        
        
        
        return CSS3_TRANSFORM_PREFIX + 'BoxShadow';
    }    
    

    
    function getBrowserVersion() {
        
        if (!bv && isFF) {
            
            
            var nav = ua.match(/.*Firefox\/([\d|\.]*).*/);
            
            if (nav) {
                
                bv = parseFloat(nav[1], 10);
            }
        }

        return bv;
    }

    function _docScroll() {
        var x = 0,
            y = 0,
            w = window,
            d = document,
            b = d.body,
            de = d.documentElement;
        if (typeof w.pageYOffset == 'number') {
            y = w.pageYOffset;
            x = w.pageXOffset;
        } else if (b && (b.scrollLeft || b.scrollTop)) {
            y = b.scrollTop;
            x = b.scrollLeft;
        } else if (de && (de.scrollLeft || de.scrollTop)) {
            y = de.scrollTop;
            x = de.scrollLeft;
        }
        return {
            x: x,
            y: y
        };
    }

    function setTranslateValue(num) {

        
        num = num || 0;

        
        num = String(num);

        return ((num.indexOf("%", 0)) != -1) ? num : (num + 'px');
    }

    function createTransformationString(x, y, z, use3d, translateString) {

        if (!mstrmojo.dom.isWinPhone) {
            use3d = (use3d || false || this.isHWAccelerated);
        } else {
            use3d = false;
        }

        var translateOpen = translateString + (use3d ? '3d' : '') + '(',
            translateClose = use3d ? (',' + z + ')') : ')';

        return translateOpen + x + ',' + y + translateClose;
    }
    
    var TOP = 1, 
        BOTTOM = 2,
        CENTER = 3,
        LEFT = 4,
        RIGHT = 5;
    
    
    function alignDOM(e, h, v) {
        var es = e.style,
            eds = es.display,
            wdim = this.windowDim(),
            ds = _docScroll();
        
        
        es.display = 'block';
        
        var hpos = wdim.w - e.clientWidth,
            vpos = wdim.h - e.clientHeight,
            hm = {
                4: 0, 
                5: hpos, 
                3: hpos/2 
            },
            vm = {
                1: 0, 
                3: vpos/2, 
                2: vpos 
            };
        
        es.left = hm[h] + ds.x + 'px';
        es.top = vm[v] + ds.y + 'px';
        es.display = eds;
    }

    mstrmojo.Enum_Keys = {
        
        
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        CTRL: 17,
        ESCAPE: 27,
        SPACE: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        LEFT_ARROW: 37,
        UP_ARROW: 38,
        RIGHT_ARROW: 39,
        DOWN_ARROW: 40,
        INSERT: 45,
        DELETE: 46
    };

    mstrmojo.dom = mstrmojo.provide(
        "mstrmojo.dom",
        {
            userAgent: ua,

            isIE: isIE,

            isIE6: isIE && !!ua.match(/MSIE 6/),
            isIE7: isIE && !!ua.match(/MSIE 7/),
            isIE8: isIE && !!ua.match(/MSIE 8/),
            isIE9: isIE && !!ua.match(/MSIE 9/),
            isIE10: isIE10,
            isIEW3C: isIEW3C,
            isNSIE: isIE && !isIE10, 
            isDXIE: isDXIE,

            isFF: isFF,

            isWK: !!ua.match(/AppleWebKit/),

            isSafari: !!ua.match(/Safari/) && !ua.match(/Chrome/),

            isHWAccelerated: !isAndroid,

            isAndroid: isAndroid,

            isIPad: isIPad,

            isPlayBook: isPlayBook,

            isWinPhone: isWinPhone,

            supportsTouches: tch,

            TOUCHSTART: tch ? 'touchstart' : 'mousedown',
            TOUCHMOVE: tch ? 'touchmove' : 'mousemove',
            TOUCHEND: tch ? 'touchend' : 'mouseup',
            TOUCHCANCEL: tch ? 'touchcancel' : '',
            RESIZE: tch ? 'orientationchange' : 'resize',

            CSS3_PREFIX: CSS3_PREFIX, 
            CSS3_BOXSHADOW: CSS3_BOXSHADOW,
            CSS3_TRANSFORM: CSS3_TRANSFORM,
            CSS3_TRANSITION: CSS3_TRANSITION,
            CSS3_TRANSITION_PROPERTY: CSS3_TRANSITION_PROPERTY,
            CSS3_TRANSITION_DURATION: CSS3_TRANSITION_DURATION,
            CSS3_TRANSITION_END: CSS3_TRANSITION_END,
                    
            cssFeatures: {
                GRADIENTS: 'gd',
                ROUND_CORNERS: 'rc',
                TEXT_ROTATION: 'tr',
                DROP_SHADOW: 'sh'
            },

            
            supports: function supports(f) {
                var ffVer = this.isFF && getBrowserVersion();
                switch (f) {
                case this.cssFeatures.GRADIENTS:
                    return (this.isIE || this.isIEW3C || this.isWK || ffVer >= 3.6 || this.isWinPhone);

                case this.cssFeatures.ROUND_CORNERS:
                    return (this.isWK || this.isFF || this.isWinPhone || this.isIE10);

                case this.cssFeatures.TEXT_ROTATION:
                case this.cssFeatures.DROP_SHADOW:
                    return (this.isIE || this.isWK || ffVer >= 3.5 || this.isWinPhone || this.isIE10 || this.isIEW3C);
                }

                return false;
            },

            
            replace: function dom_repl( target,  replacement) {
                if (!target || !replacement) {
                    return;
                }

                var p = target.parentNode;
                if (p) {
                    p.replaceChild(replacement, target);
                }
            },

            
            attachEvent: function dom_attch(el, eventName, f, phase) {
                if (el.addEventListener) {
                    return el.addEventListener(eventName, f, !!phase);
                } else {
                    return el.attachEvent("on"+eventName, f);
                }
            },
    
            
            detachEvent: function dom_detach( el,  eventName,  f, phase) {
                if (!el) {
                    return;
                }
    
                if (el.removeEventListener) {
                    el.removeEventListener(eventName, f, !!phase);
                } else {
                    el.detachEvent("on" + eventName, f);
                }
            },
    
            attachOneTimeEvent: function attachOneTimeEvent(el, eventName, f, phase) {
                
                var fn = function(evt) {
                    
                    f(evt);
    
                    
                    mstrmojo.dom.detachEvent(this, eventName, fn, phase);
                };
    
                
                this.attachEvent(el, eventName, fn, phase);
    
                
                el = null;
    
                return fn;
            },
    
            
            captureDomEvent: function captureDomEvent(id, type, hWin, e, config) {
                var x = mstrmojo.all[id];
                if (x) {
                    x.captureDomEvent(type, hWin, e, config);
                }
            },
    
    
            
            translate: function translate(el, x, y, z, extra, useTranslate3d) {
                extra = (extra && ' ' + extra) || '';
    
                el.style[((mstrmojo.dom.isWinPhone || mstrmojo.dom.isIE9 || mstrmojo.dom.isIE10) ? 'ms' : 'webkit') + 'Transform'] = this.createTranslateString(x, y, z, useTranslate3d) + extra;
            },
    
    
            createTranslateString: function createTranslateString(x, y, z, useTranslate3d) {
    
                
                x = setTranslateValue(x);
                y = setTranslateValue(y);
                z = setTranslateValue(z);
    
                return createTransformationString(x, y, z, useTranslate3d, 'translate');
            },
    
            createScaleString: function createScaleString(x, y, z, useScale3d) {
    
                
                x = x || 0;
                y = y || 0;
                z = z || 0;
    
                return createTransformationString(x, y, z, useScale3d, 'scale');
            },
    
            
            _bufferSize: 200,
    
            
            _bufferConnects: {},
    
            
            attachBufferedEvent: function dom_attchbuf( el,  eventName,  f,  bufferSize) {
    
                var key = el.id+"-"+eventName,
                    info = this._bufferConnects[key];
                if (!info) {
                    info = this._bufferConnects[key] = {
                        elId: el.id,
                        eventName: eventName,
                        timer: null,
                        bufferSize: bufferSize,
                        listeners: [],
                        callback:     function(e) {
                                        mstrmojo.dom._callback(e, mstrmojo.global, key);
                                        return true;
                                    }
                    };
                    this.attachEvent(el, eventName, info.callback);
                }
                info.listeners.push(f);
            },
    
            _callback: function dom_callback( e,  hWin,  key) {
                
                if (!e) {
                    e = hWin.event;
                }
                var info = this._bufferConnects[key],
                    timer = info && info.timer;
                if (info && !timer) {
                    var ms = (info.bufferSize === null) ? this._bufferSize : info.bufferSize;
    
                    if (info.bufferSize) {
                        info.timer = hWin.setTimeout(
                                        function() {mstrmojo.dom.updateBuffers(key);},
                                        ms
                                   );
                    } else {
                        
                        mstrmojo.dom.updateBuffers(key);
                    }
                }
            },
    
            updateBuffers: function dom_updateBuffers( key) {
                var info = this._bufferConnects[key],
                    ls = info && info.listeners;
                for (var i=0, len=ls && ls.length || 0; i<len; i++) {
                    ls[i]();
                }
                if (info && info.timer) {
                    delete info.timer;
                }
            },
    
            detachBufferedEvent: function dom_dtchbuf( el,  eventName,  f) {
                if (!el) {
                    return;
                }
    
                var key = el.id+"-"+eventName,
                    info = this._bufferConnects[key],
                    ls = info && info.listeners,
                    len = (ls && ls.length) || 0;
                if (len) {
                    for (var i=len-1; i>-1; i--) {
                        if (ls[i] == f) {
                            ls.splice(i,1);
                        }
                    }
                    
                    
                    if (!ls.length) {
                        this.detachEvent(el, eventName, info.callback);
                        delete this._bufferConnects[key];
                        if (info.timer) {
                            mstrmojo.global.clearTimeout(info.timer);
                        }
                    }
                }
            },
    
            
            eventTarget: function evtTgt( hWin,  e) {
                e = _evt(hWin, e);
                return e.target || e.srcElement;
            },
    
            
            ctrlKey: function ctrl( hWin,  e) {
                return _evt(hWin, e).ctrlKey;
            },
    
            
            shiftKey: function shift( hWin,  e) {
                return _evt(hWin, e).shiftKey;
            },
            
            
            getButton: function getButton( hWin,  e) {
                return ((_evt(hWin, e)).button == 2) ? 2 : 1;    
            },
    
            getMousePosition: function getMousePosition(e, hWin) {
                hWin = hWin || window;
    
                var x, y;
                if (mstrmojo.dom.isIE) {
                    e = e || hWin.event;
                    
                    var d = document,
                        b = d.body,
                        de = d.documentElement;
                    x = e.clientX + b.scrollLeft + (de.scrollLeft || 0);
                    y = e.clientY + b.scrollTop + (de.scrollTop || 0);
                } else {
                    
                    x = e.pageX;
                    y = e.pageY;
                }
    
                return { "x" : x, "y" : y };
            },
    
            
            position: function(el, includeScroll) {
                var p = {
                    x: 0,
                    y: 0
                };
    
                
                if (el && el.getBoundingClientRect) {
                    try {
                        
                        p = el.getBoundingClientRect();
                    } catch (e) {
                        p = {
                            left: 0,
                            top: 0,
                            right: 0,
                            bottom: 0,
                            height: 0,
                            width: 0
                        };
                    }
    
                    
                   p = {
                       x: p.left,
                       y: p.top,
                       w: p.right - p.left,
                       h: p.bottom - p.top
                   };
    
                   
                   if (this.isIE6 || this.isIE7) {
                       
                       var ownerDocument = el.ownerDocument;
                       if (ownerDocument) {
                           
                           var de = ownerDocument.documentElement,
                               deo = de.getBoundingClientRect();
                           p.x -= deo.left;
                           p.y -= deo.top;
                       }
                   }
                }
    
                
                if (includeScroll) {
                    var ds = _docScroll();
                    p.x += ds.x;
                    p.y += ds.y;
                }
    
                return p;
            },
    
            
            delta: function delta( el,  elLimit) {
                elLimit = elLimit || document.body;
                var pe = this.position(el),
                    pr = this.position(elLimit);
    
                return {x: Math.round(pe.x - pr.x), y: Math.round(pe.y - pr.y)};
            },
    
            
            windowDim: function _winDim() {
                var w = 0,
                    h = 0,
                    win = window,
                    d = document,
                    de = d.documentElement,
                    db = d.body;
                if (typeof(win.innerWidth) == 'number') {
                  w = win.innerWidth;
                  h = win.innerHeight;
                } else if (de  && (de.clientWidth || de.clientHeight)) {
                  w = de.clientWidth;
                  h = de.clientHeight;
                } else if (db && (db.clientWidth || db.clientHeight)) {
                  w = db.clientWidth;
                  h = db.clientHeight;
                }
                return {w:w,h:h};
            },
    
            
            center: function center(e) {
                alignDOM.call(this, e, CENTER, CENTER);
            },
            
            
            bottomCenter: function bottomCenter(e) {
                alignDOM.call(this, e, CENTER, BOTTOM);
            },
    
            
            clearBrowserHighlights: function clrHiLits( hWin) {
                hWin = hWin || self;
                if (isIE) {
                    var doc = hWin.document,
                        sel = doc && doc.selection,
                        em = sel && sel.empty;
                    if (em) {
                        try {
                            sel.empty();
                        } catch(ex) {
                            
                        }
                    }
                }
                else {
                    var gs = hWin.getSelection,
                        s = gs && hWin.getSelection();
                    if (s && !s.isCollapsed) {
                        if (s.empty) {
                            s.empty();
                        } else if (s.removeAllRanges) {
                            s.removeAllRanges();
                        }
                    }
                }
            },
    
            
            findAncestorByAttr: function fndAncAttr( el,  attr,  inclusive,  elLimit) {
                var node = inclusive ? el : el && el.parentNode;
                while (node && (node != elLimit)) {
                    var v = node.getAttribute && node.getAttribute(attr);
                    if (v != null) {
                        return {
                                node: node,
                                value: v
                        };
                    }
                    node = node.parentNode;
                }
                return null;
            },
    
            
            findAncestorByName: function fndAncNm( el,  nodeName,  inclusive,  elLimit) {
                nodeName = nodeName && nodeName.toLowerCase();
                var node = inclusive ? el : el && el.parentNode;
                while (node && (node != elLimit)) {
                    var n = node.nodeName;
                    if (n && (n.toLowerCase() == nodeName)) {
                        return node;
                    }
                    node = node.parentNode;
                }
                return null;
            },
    
            
            contains: function cntns( elP,  elC,  inclusive,  elLimit) {
                var node = elC;
    
                
                if (!inclusive) {
                    
                    node = node.parentNode;
                }
    
                while (node) {
                    
                    if (node == elP) {
                        return true;
                    }
    
                    
                    if (node === elLimit) {
                        break;
                    }
    
                    
                    node = node.parentNode;
                }
    
                return false;
            },
    
            preventDefault: function prvDft(hWin, e) {
                if (!e) {
                    e = hWin.event;
                }
                if (e.preventDefault) {
                    e.preventDefault();
                }else{
                    e.returnValue = false;
                }
            },
    
            stopPropogation: function stpPrg(hWin, e) {
                if (!e) {
                    e = hWin.event;
                }
                if (e.stopPropogation) {
                    e.stopPropogation();
                } else {
                    e.cancelBubble = true;
                }
            },
    
            firstTouch: function fstTch(hWin, e) {
                return e && e.touches && e.touches.length ? e.touches[0] : (e || hWin.event);
            },
    
            firstChangedTouch: function fstChTch(hWin, e) {
                return e && e.changedTouches && e.changedTouches.length ? e.changedTouches[0] : (e || hWin.event);
            },
    
            isLandscape: function isLandscape() {
                return !this.supportsTouches || (Math.abs(window.orientation) === 90);
            },
    
            
            findWidget: function(el) {
                while (el) {
                    var id = el.mstrmojoId;
                    if (id != null) {
                        return mstrmojo.all[id];
                    }
                    el = el.parentNode;
                }
                return null;
            },
    
            
            setCaret: function (el, pos) {
                if (el.setSelectionRange) {
                    el.focus();
                    el.setSelectionRange(pos, pos);
                }
                else if (el.createTextRange) { 
                    var tr = el.createTextRange();
                    tr.move("character", pos);
                    tr.select();
                }
            }

    });
    
    var G = mstrmojo.dom,
        w = window,
        d = document,
        de = d && d.documentElement,
        b = d && d.body ;
    







    
    if (w.innerWidth) { 


        G.getHorizontalScroll = function() { return w.pageXOffset;};
        G.getVerticalScroll = function() { return w.pageYOffset;};
    } else if (de && de.clientWidth) {
    


        G.getHorizontalScroll = function() { return de.scrollLeft;};
        G.getVerticalScroll = function() { return de.scrollTop;};
    } else if (b.clientWidth) {
    


        G.getHorizontalScroll = function() { return b.scrollLeft;};
        G.getVerticalScroll = function() { return b.scrollTop;};
    }
    








})();
(function(){

    mstrmojo.requiresCls(
        "mstrmojo.dom",
        "mstrmojo.array",
        "mstrmojo.string");
    
    
    var $D = mstrmojo.dom,
        $S = mstrmojo.string;

    
    mstrmojo.css = mstrmojo.provide(
        "mstrmojo.css",
        
        {
        
            
            DISPLAY_TABLE: $D.isNSIE ? 'block' : 'table',
            
            
            DISPLAY_CELL: $D.isNSIE ? 'block' : 'table-cell',

            
            MINHEIGHT: $D.isIE6 ? 'height' : 'minHeight',
                    
            
            addClass: function addClass(el, s) {
                if (!el) {
                    return;
                }
                
                if (s.constructor !== Array) {
                    s = [ s ];
                }
                var cls = el.className || '',
                    start = ' ' + cls +  ' ',
                    bAdded = false;
                for (var i=0, len=s.length; i<len; i++) {
                    var c = s[i];
                    if (!start.match(new RegExp("\\s" + c + "\\s"))) {
                        cls += ' ' + c;
                        bAdded = true;
                    }
                }
                if (bAdded) {
                    el.className = $S.trim(cls);
                }
            },
            
            
            removeClass: function removeClass(el, s) {
                if (!el) {
                    return;
                }
                
                if (s.constructor !== Array) {
                    s = [ s ];
                }
                var cls = ' ' + (el.className || '') + ' ';
                for (var i=0, len=s.length; i<len; i++) {
                    cls = cls.replace(new RegExp("\\s" + s[i] + "\\s", "g"), " ");
                }
                el.className = $S.trim(cls);
            },
            
            
            addWidgetCssClass: function addWidgetCssClass(widget, classes) {
                
                var origClasses = widget.cssClass,
                    existing = (origClasses && origClasses.split(' ')) || [];
                
                
                if (classes.constructor !== Array) {
                    
                    classes = [ classes ];
                }

                
                widget.cssClass = existing.concat(classes).join(' ');
            },
            
            
            toggleClass: function toggleClass(el, s, b) {
                if (b) {
                    this.addClass(el, s);
                } else {
                    this.removeClass(el, s);
                }
            },
            
            
            applyShadow: function applyShadow(el, xOff, yOff, spread, color) {
                var s = el.style;
                if ($D.isDXIE) {
                    s.filter += "progid:DXImageTransform.Microsoft.dropshadow(OffX=" + xOff + "px, OffY=" + yOff + "px, Color='" + color + "')";
                } else if ($D.isFF || $D.isWK || $D.isIE10) {
                    s[$D.CSS3_BOXSHADOW] = xOff + 'px ' + yOff + 'px ' + spread + 'px ' + color;
                }
            },
            
            
            removeShadow: function removeShadow(el) {
                var s = el.style;
                if ($D.isDXIE) {

                } else if ($D.isFF || $D.isWK || $D.isIE10) {
                    s[$D.CSS3_BOXSHADOW] = '';
                }
            },
            
            
            setOpacity: function setOpacity(el, val) {
                if ($D.isDXIE && !$D.isIE9){
                    var filterText = el.currentStyle.filter; 
                    var filter = null;
                    if (filterText.length > 0 ) {
                        filter = el.filters['DXImageTransform.Microsoft.Alpha'];
                    }
                    
                    if(filter) {
                        filter.opacity = val;
                        filter.enabled = (val != 100);
                    } else if (val < 100){
                        var filterDefinition = 'progid:DXImageTransform.Microsoft.Alpha(Opacity='+val+')';
                        el.style.filter = (filterText?filterText:"") + " " + filterDefinition;
                    }
                }else {
                	
                    el.style.opacity = val / 100 - ($D.isIE9 ? 0.00001: 0);
                }
            },
            
            
            buildGradient: function buildGradient(t, sc, ec) {
                if ($D.supports($D.cssFeatures.GRADIENTS)) {
                    var rtn = {};
                    
                    if ($D.isDXIE) {
                        rtn.n = 'filter';
                        rtn.v = "progid:DXImageTransform.Microsoft.Gradient(GradientType=" + t + ",StartColorStr='" + sc + "',EndColorStr='" + ec + "')";
                        
                    } else if ($D.isFF) {
                        rtn.n = 'background-image';
                        rtn.v = '-moz-linear-gradient(' + ((t === 0) ? 'top' : 'left') + ',' + sc + ',' + ec + ')';
                        
                    } else if ($D.isWK) {
                        rtn.n = 'background';
                        rtn.v = '-webkit-gradient(linear,' + ((t === 0) ? 'left top, left bottom' : 'left top, right top') + ',from(' + sc + '),to('+ ec + '))';
                    } else if ($D.isIE10 || $D.isIEW3C) {
                        rtn.n = 'background';
                        rtn.v = 'linear-gradient(' + ((t === 0) ? 'to bottom' : 'to right') + ',' + sc + ',' + ec + ')';
                    }
                    return rtn;
                }
                
                return null;
            },
            
            
            buildRoundCorners: function buildRoundCorners(r, t) {
                if ($D.supports($D.cssFeatures.ROUND_CORNERS)) {
                    var v = r + 'px';
                    var radiusValue = v + ((t) ? ' ' + v + ' 0 0' : '') + ';';
                    
                    if ($D.isFF) {
                        return '-moz-border-radius:' + radiusValue;
                        
                    } else if ($D.isWinPhone || $D.isIE10) {
                    	return 'border-radius:' + radiusValue;
                    	
                    } else if ($D.isWK) {	
                        
                        if (!t) {
                            
                            return '-webkit-border-radius:' + v + ';';
                            
                        } else {
                            
                            var ds = ['left', 'right'],
                                css = [],
                                x = -1;
                            
                            for (var i = 0; i < 2; i++) {
                                css[++x] = '-webkit-border-top-' + ds[i] + '-radius:' + v;    
                                css[++x] = '-webkit-border-bottom-' + ds[i] + '-radius:0';    
                            }
                            
                            return css.join(';');
                        }
                    }
                }
                
                return '';
            },
            
            
            getBorderWidthsOrPaddings: function getBorderWidthsOrPaddings(b, dpi) {
                
                var o = {
                    t: 0,
                    r: 0,
                    b: 0,
                    l: 0,
                    h: 0,
                    w: 0
                };
                
                
                if (!b) {
                    return o;
                }

                
                var a = b.split(' '),
                    len = a.length;
                
                
                for (var i = 0; i < len; i++) {
                    a[i] = Math.round(dpi * parseFloat(a[i], 10) / 72);
                }
                
                
                if (len < 4) {
                    
                    if (len === 1) {
                        
                        a[1] = a[2] = a[3] = a[0];
                    } else {
                        
                        a[3] = a[1];
                        
                        if (len === 2) {
                            
                            a[2] = a[0];
                        }
                    }
                }
                
                
                o.t = a[0];
                o.r = a[1];
                o.b = a[2];
                o.l = a[3];
                o.h = o.t + o.b; 
                o.w = o.l + o.r;
                
                return o;
            },
            
            
            getBorderWidths: function getBorderWidths(p, dpi) {
                return this.getBorderWidthsOrPaddings(p, dpi);
            },
            
            
            getPaddings: function getPaddings(p, dpi) {
                return this.getBorderWidthsOrPaddings(p, dpi);
            },
            
            
            parkAfterFade: function parkAfterFade(evt) {
                
                var elStyle = evt.target.style;

                
                if (elStyle.opacity == 0) {
                    
                    elStyle.left = '-10000px';
                    
                    
                    
                    window.setTimeout(function() {
                        elStyle.opacity = 0.99;
                    }, 0);

                    
                    return true;
                }
                
                
                return false;
            },
            
            
            
            getStyleValue: function getStyleValue(el, prop) {
                if (el.currentStyle){ 
                    prop = prop == 'float' ? 'styleFloat' : prop;
                    value = el.currentStyle[prop];
                }
                else if (document.defaultView && document.defaultView.getComputedStyle){ 
                    prop = prop == 'float' ? 'cssFloat' : prop; 
                    var styles = document.defaultView.getComputedStyle(el, null); 
                    value = styles ? styles[prop] : null;
                }
                
                return value;           
            },
            
            
            getComputedStyle: function(element, pseudoElement) {
                var fn = (window.getComputedStyle) ? 
                        function (element, pseudoElement) {
                            return window.getComputedStyle(element, pseudoElement || null);
                        } : 
                        function (element) {
                            return element.currentStyle || {};
                        };
                        
                mstrmojo.css.getComputedStyle = fn;
                
                return fn(element, pseudoElement);
            }
            
        });
    
})();

(function(){

    mstrmojo.requiresCls("mstrmojo.hash");
    
    mstrmojo.requiresDescs(3852,3853,3854,3855,3856,3857,3858,3859,3860,3861,3862,3863,
    		1956,1957,1958,1959,1960,1961,1962,1963,1964,1965,1966,1967,
    		9379,9380,9381,9382,9383,9384,9385,
    		6078,7899,7900,7901,6079,6081,6080,6082,7902,7902,6076,6077,7903);
    
    
    mstrmojo.locales = mstrmojo.provide(
        "mstrmojo.locales",
            
            {
                
        	    load: function(callback){
                    var me = this;
                    if (this.isLoaded) {
                        callback();
                    } else {
                        mstrmojo.xhr.request('POST', mstrConfig.taskURL, 
                        {
                            success: function(res) {
                                
                                mstrmojo.hash.copy(mstrmojo.hash.obj2array(res), me);
                                
                                callback();
                                if (mstrmojo.expr) {
                                    mstrmojo.expr.onLocaleUpdated();
                                }
                                mstrmojo.locales.isLoaded = true;
                                
                            },
                            failure: function(res) {
                                alert(res.getResponseHeader('X-MSTR-TaskFailureMsg'));
                            }
                        },
                        
                        {
                            taskId: 'getLocaleInfo'
                        });
                    }            
                },
                
                isLoaded: false,
                
                "datetime": {
                    "MONTHNAME_SHORT": [
                        mstrmojo.desc(3852, "Jan"),
                        mstrmojo.desc(3853, "Feb"),
                        mstrmojo.desc(3854, "Mar"),
                        mstrmojo.desc(3855, "Apr"),
                        mstrmojo.desc(3856, "May"),
                        mstrmojo.desc(3857, "Jun"),
                        mstrmojo.desc(3858, "Jul"),
                        mstrmojo.desc(3859, "Aug"),
                        mstrmojo.desc(3860, "Sep"),
                        mstrmojo.desc(3861, "Oct"),
                        mstrmojo.desc(3862, "Nov"),
                        mstrmojo.desc(3863, "Dec")
                    ],
                    "MONTHNAME_FULL": [
                        mstrmojo.desc(1956, "January"),
                        mstrmojo.desc(1957, "February"),
                        mstrmojo.desc(1958, "March"),
                        mstrmojo.desc(1959, "April"),
                        mstrmojo.desc(1960, "May"),
                        mstrmojo.desc(1961, "June"),
                        mstrmojo.desc(1962, "July"),
                        mstrmojo.desc(1963, "August"),
                        mstrmojo.desc(1964, "September"),
                        mstrmojo.desc(1965, "October"),
                        mstrmojo.desc(1966, "November"),
                        mstrmojo.desc(1967, "December")
                    ],
                    "dayShortNames": [
                        "S",
                        "M",
                        "T",
                        "W",
                        "T",
                        "F",
                        "S"
                    ],
                    "dayNames": [
                        mstrmojo.desc(9379, "Sunday"),
                        mstrmojo.desc(9380, "Monday"),
                        mstrmojo.desc(9381, "Tuesday"),
                        mstrmojo.desc(9382, "Wednesday"),
                        mstrmojo.desc(9383, "Thursday"),
                        mstrmojo.desc(9384, "Friday"),
                        mstrmojo.desc(9385, "Saturday")
                    ],
                    "DATEINPUTFORMATS": [
                        "M/d/yy",
                        "M/d/yyyy",
                        "MMM d, yy"
                    ],
                    "TIMEINPUTFORMATS": [
                        "h:mm a",
                        "H:mm",
                        "h:mm:ss a",
                        "H:mm:ss",
                        "h:mm:ss a z"
                    ],
                    "DATEOUTPUTFORMAT": "M/d/yyyy",
                    "TIMEOUTPUTFORMAT": "h:mm:ss a",
                    "AM_NAME": "AM",
                    "PM_NAME": "PM",
                    "TWODIGITYEARSTART": "2029"
                },
                "number": {
                    "NUMBERINPUTFORMATS": {
                        "0": "#,##0.###"
                    },
                    "INTEGERINPUTFORMATS": {
                        "0": "#,##0"
                    },
                    "NUMBEROUTPUTFORMAT": "#0.##########",
                    "INTEGEROUTPUTFORMAT": "#0",
                    "DECIMALSEPARATOR": ".",
                    "THOUSANDSEPARATOR": ","
                },
                "expression": {
                    "METRICVALIDATIONLEVEL": "0",
                    "PRESERVEWHITESPACE": false,
                    "Include": [
                        {
                            "did": "1",
                            "n": "Include"
                        },
                        {
                            "did": "2",
                            "n": "Exclude"
                        }
                    ],
                    "BranchQual": [
                        {
                            "did": "19",
                            "n": "AND"
                        },
                        {
                            "did": "20",
                            "n": "OR"
                        },
                        {
                            "did": "21",
                            "n": "NOT"
                        },
                        {
                            "did": "19_21",
                            "n": "AND NOT"
                        },
                        {
                            "did": "20_21",
                            "n": "OR NOT"
                        }
                    ],
                    "RootOperator": [
                        {
                            "did": "19",
                            "n": "All selections"
                        },
                        {
                            "did": "20",
                            "n": "Any selection"
                        }
                    ],
                    "ExprType": [
                        {
                            "did": "2",
                            "n": "Qualify"
                        },
                        {
                            "did": "5",
                            "n": "Select"
                        }
                    ],
                    "DimtyLevels": [
                        {
                            "did": "1",
                            "n": "Default"
                        },
                        {
                            "did": "2",
                            "n": "Metric"
                        },
                        {
                            "did": "3",
                            "n": "Report"
                        }
                    ],
                    "Attribute": [
                        {
                            "did": "1,6",
                            "n": "Equals",
                            "t": 1
                        },
                        {
                            "did": "1,7",
                            "n": "Does not equal",
                            "t": 1
                        },
                        {
                            "did": "1,8",
                            "n": "Greater than",
                            "t": 1
                        },
                        {
                            "did": "1,10",
                            "n": "Greater than or equal to",
                            "t": 1
                        },
                        {
                            "did": "1,9",
                            "n": "Less than",
                            "t": 1
                        },
                        {
                            "did": "1,11",
                            "n": "Less than or equal to",
                            "t": 1
                        },
                        {
                            "did": "1,17",
                            "n": "Between",
                            "t": 1
                        },
                        {
                            "did": "1,44",
                            "n": "Not between",
                            "t": 1
                        },
                        {
                            "did": "1,76",
                            "n": "Contains",
                            "t": 1
                        },
                        {
                            "did": "1,79",
                            "n": "Does not contain",
                            "t": 1
                        },
                        {
                            "did": "1,77",
                            "n": "Begins with",
                            "t": 1
                        },
                        {
                            "did": "1,80",
                            "n": "Does not begin with",
                            "t": 1
                        },
                        {
                            "did": "1,78",
                            "n": "Ends with",
                            "t": 1
                        },
                        {
                            "did": "1,81",
                            "n": "Does not end with",
                            "t": 1
                        },
                        {
                            "did": "1,18",
                            "n": "Like",
                            "t": 1
                        },
                        {
                            "did": "1,43",
                            "n": "Not Like",
                            "t": 1
                        },
                        {
                            "did": "1,54",
                            "n": "Is Null",
                            "t": 1
                        },
                        {
                            "did": "1,55",
                            "n": "Is Not Null",
                            "t": 1
                        },
                        {
                            "did": "1,22",
                            "n": "In",
                            "t": 1
                        },
                        {
                            "did": "1,57",
                            "n": "Not In",
                            "t": 1
                        }
                    ],
                    "Metric": [
                        {
                            "did": "1,6",
                            "n": "Equals",
                            "t": 1
                        },
                        {
                            "did": "1,7",
                            "n": "Does not equal",
                            "t": 1
                        },
                        {
                            "did": "1,8",
                            "n": "Greater than",
                            "t": 1
                        },
                        {
                            "did": "1,10",
                            "n": "Greater than or equal to",
                            "t": 1
                        },
                        {
                            "did": "1,9",
                            "n": "Less than",
                            "t": 1
                        },
                        {
                            "did": "1,11",
                            "n": "Less than or equal to",
                            "t": 1
                        },
                        {
                            "did": "1,17",
                            "n": "Between",
                            "t": 1
                        },
                        {
                            "did": "1,44",
                            "n": "Not between",
                            "t": 1
                        },
                        {
                            "did": "1,54",
                            "n": "Is Null",
                            "t": 1
                        },
                        {
                            "did": "1,55",
                            "n": "Is Not Null",
                            "t": 1
                        },
                        {
                            "did": "1,22",
                            "n": "In",
                            "t": 1
                        },
                        {
                            "did": "1,57",
                            "n": "Not In",
                            "t": 1
                        },
                        {
                            "did": "2,1",
                            "n": "Highest",
                            "t": 2
                        },
                        {
                            "did": "2,2",
                            "n": "Lowest",
                            "t": 2
                        },
                        {
                            "did": "3,1",
                            "n": "Highest%",
                            "t": 3
                        },
                        {
                            "did": "3,2",
                            "n": "Lowest%",
                            "t": 3
                        }
                    ],
                    "MDXAttribute": [
                        {
                            "did": "1,6",
                            "n": "Equals",
                            "t": 1
                        },
                        {
                            "did": "1,7",
                            "n": "Does not equal",
                            "t": 1
                        },
                        {
                            "did": "1,8",
                            "n": "Greater than",
                            "t": 1
                        },
                        {
                            "did": "1,10",
                            "n": "Greater than or equal to",
                            "t": 1
                        },
                        {
                            "did": "1,9",
                            "n": "Less than",
                            "t": 1
                        },
                        {
                            "did": "1,11",
                            "n": "Less than or equal to",
                            "t": 1
                        },
                        {
                            "did": "1,17",
                            "n": "Between",
                            "t": 1
                        },
                        {
                            "did": "1,44",
                            "n": "Not between",
                            "t": 1
                        },
                        {
                            "did": "1,22",
                            "n": "In",
                            "t": 1
                        },
                        {
                            "did": "1,57",
                            "n": "Not In",
                            "t": 1
                        }
                    ],
                    "MDXMetric": [
                        {
                            "did": "1,6",
                            "n": "Equals",
                            "t": 1
                        },
                        {
                            "did": "1,7",
                            "n": "Does not equal",
                            "t": 1
                        },
                        {
                            "did": "1,8",
                            "n": "Greater than",
                            "t": 1
                        },
                        {
                            "did": "1,10",
                            "n": "Greater than or equal to",
                            "t": 1
                        },
                        {
                            "did": "1,9",
                            "n": "Less than",
                            "t": 1
                        },
                        {
                            "did": "1,11",
                            "n": "Less than or equal to",
                            "t": 1
                        },
                        {
                            "did": "1,17",
                            "n": "Between",
                            "t": 1
                        }
                    ],
                    "SAPAttribute": [
                        {
                            "did": "1,6",
                            "n": "Equals",
                            "t": 1
                        },
                        {
                            "did": "1,7",
                            "n": "Does not equal",
                            "t": 1
                        },
                        {
                            "did": "1,22",
                            "n": "In",
                            "t": 1
                        },
                        {
                            "did": "1,57",
                            "n": "Not In",
                            "t": 1
                        },
                        {
                            "did": "1,8",
                            "n": "Greater than",
                            "t": 1
                        },
                        {
                            "did": "1,10",
                            "n": "Greater than or equal to",
                            "t": 1
                        },
                        {
                            "did": "1,9",
                            "n": "Less than",
                            "t": 1
                        },
                        {
                            "did": "1,11",
                            "n": "Less than or equal to",
                            "t": 1
                        },
                        {
                            "did": "1,17",
                            "n": "Between",
                            "t": 1
                        }
                    ],
                    "Element": [
                        {
                            "did": "1,22",
                            "n": "In List",
                            "t": 1
                        },
                        {
                            "did": "1,57",
                            "n": "Not In List",
                            "t": 1
                        }
                    ]
                },
                "validation": {
                        "requiredFieldError": mstrmojo.desc(6078, "This field is required."),
                        "invalidCharError": mstrmojo.desc(7899, "This field contains invalid characters for #."),
                        "invalidDateStringError": mstrmojo.desc(7900, "This field contains invalid date/time string."),
                        "invalidNumericFormatError": mstrmojo.desc(7901, "This field contains numeric value with incorrect format."),
                        "outofRangeError": mstrmojo.desc(6079, "This field should be # between ## and ###."),
                        "noLessMinError": mstrmojo.desc(6081,  "This field should be # greater than or equal to ##."),
                        "noGreaterMaxError": mstrmojo.desc(6080, "This field should be # less than or equal to ###."),
                        "failRegexTestError": mstrmojo.desc(6082, "This field failed regular expression validation."),
                        "invalidValueInListError": mstrmojo.desc(7902, "One of the value (#) in this list is not valid."),
                        "integerDataType": mstrmojo.desc(6076, "an Integer value"),
                        "numericDataType": mstrmojo.desc(6077, "a Number value"),
                        "dateDataType": mstrmojo.desc(7903, "a Date/Time value")    
                },
                'color':{
                    'colors':[{'n':'Black','v':'#000000'},{'n':'Brown','v':'#993300'},{'n':'Olive Green','v':'#333300'},{'n':'Dark Green','v':'#003300'},{'n':'Dark Teal','v':'#003366'},{'n':'Dark Blue','v':'#000080'},{'n':'Indigo','v':'#333399'},{'n':'Grey-80%','v':'#333333'},{'n':'Dark Red','v':'#800000'},{'n':'Orange','v':'#FF6600'},{'n':'Dark Yellow','v':'#808000'},{'n':'Green','v':'#008000'},{'n':'Teal','v':'#008080'},{'n':'Blue','v':'#0000FF'},{'n':'Blue-Grey','v':'#666699'},{'n':'Grey-50%','v':'#808080'},{'n':'Red','v':'#FF0000'},{'n':'Light Orange','v':'#FF9900'},{'n':'Lime','v':'#99CC00'},{'n':'Sea Green','v':'#339966'},{'n':'Aqua','v':'#33CCCC'},{'n':'Light Blue','v':'#3366FF'},{'n':'Violet','v':'#800080'},{'n':'Grey-40%','v':'#969696'},{'n':'Pink','v':'#FF00FF'},{'n':'Gold','v':'#FFCC00'},{'n':'Yellow','v':'#FFFF00'},{'n':'Bright Green','v':'#00FF00'},{'n':'Turquoise','v':'#00FFFF'},{'n':'Sky Blue','v':'#00CCFF'},{'n':'Plum','v':'#993366'},{'n':'Grey-25%','v':'#C0C0C0'},{'n':'Rose','v':'#FF99CC'},{'n':'Tan','v':'#FFCC99'},{'n':'Light Yellow','v':'#FFFF99'},{'n':'Light Green','v':'#CCFFCC'},{'n':'Light Turquoise','v':'#CCFFFF'},{'n':'Pale Blue','v':'#99CCFF'},{'n':'Lavender','v':'#CC99FF'},{'n':'White','v':'#ffffff'}],
                    'userPalette':[{'n':'#F00E0E','v':'#F00E0E'},{'n':'#080000','v':'#080000'},{'n':'#E81A1A','v':'#E81A1A'},{'n':'#6E0909','v':'#6E0909'},{'n':'#4F2828','v':'#4F2828'},{'n':'#141212','v':'#141212'},{'n':'#D60202','v':'#D60202'},{'n':'#C40404','v':'#C40404'}]
                }
                                
        	}
        );
})();
(function(){
 
    mstrmojo.requiresCls("mstrmojo.locales");
    
    var _DT = function(){return mstrmojo.locales.datetime;},
        $S = mstrmojo.string;

    
    mstrmojo.date = mstrmojo.provide(
            "mstrmojo.date",
            {
    			monthNumbers : {
					Jan:1,
					Feb:2,
					Mar:3,
					Apr:4,
					May:5,
					Jun:6,
					Jul:7,
					Aug:8,
					Sep:9,
					Oct:10,
					Nov:11,
					Dec:12
				},
				
                REGEXPS: {
                    DATES: {},  
                    TIMES: {}   
                },
                
                CACHE: {
                    PARSEDATE: {
                        CONTAINS: {},
                        EQUALS: {}
                    },
                    PARSETIME: {
                        CONTAINS: {},
                        EQUALS: {}
                    }
                }, 
                
                
                isDate: function isDate( s,  bFormat,  bContains) {
                    
                    var dateInfo = this.parseDate(s, bContains);
                    
                    var isValid = !!(dateInfo && this.doesDateExist(dateInfo.month, dateInfo.day, dateInfo.year));
                    if (bFormat) {
                        if (isValid) {
                            var formatted = this.formatDateInfo(dateInfo, _DT().DATEOUTPUTFORMAT);
                            if (bContains) {
                                return {match: dateInfo.match, formatted: formatted};
                            } else {
                                return formatted;
                            }
                        } else {
                            return null;
                        }
            
                    } else {
                        return !!isValid;
                    }
                },
                
                
                formatDateInfo: function formatDateInfo( dateInfo,  format) {
                    if (!format) return '';
                    var day = dateInfo.day,
                        month = dateInfo.month,
                        year = dateInfo.year;
                    
                    var s = format.replace(/dd/g, this.formatInteger(day, 2)
                                    ).replace(/d/g, Number(day)
                                    ).replace(/yyyy/g, Number(year)
                                    ).replace(/yy/g, this.formatInteger(Number(year) % 100, 2)
                                    ).replace(/MMM/g, "~~~~"
                                    ).replace(/MM/g, "@@"
                                    ).replace(/M/g, "^"
                                    ).replace(/MMMM/g, _DT().MONTHNAME_FULL[Number(month) - 1]
                                    ).replace(/\~\~\~\~/g, _DT().MONTHNAME_SHORT[Number(month) - 1]
                                    ).replace(/\@\@/g, this.formatInteger(month, 2)
                                    ).replace(/\^/g, Number(dateInfo.month)
                                    );
                    return s;
                },
                
                
                
                parseDate: function parseDate( s,  bContains,  format) {
                    if (s == null) return false;
                    if (typeof(s) != 'string') s = String(s);
                    s = $S.trim(s);
                    
                    
                    
                    var cache = this.CACHE.PARSEDATE[bContains ? "CONTAINS" : "EQUALS"],
                        cachedResult = cache[s];
                    if (cachedResult || (cachedResult === null)) return cachedResult;       
                    
                    var parseResult = null;
            
                    
                    var formats;
                    if (format){
                    	formats = [format];
                    }else{
                    	formats = [].concat(_DT().DATEINPUTFORMATS);
                    	formats.unshift(_DT().DATEOUTPUTFORMAT);
                    }
            
                    
                    for (var i = 0, len = formats.length; i < len; i++) {       
                        
                        var reInfo = this._buildRegExp4DateFormat(formats[i]),
                        
                            result = reInfo && s.match(bContains ? reInfo.reContains : reInfo.reEquals);
                        if (result) {
                            
                            parseResult = {
                                match: result[0],
                                year: reInfo.yearIndex && this.fourDigitYear(result[reInfo.yearIndex]),
                                day: reInfo.dayIndex && parseInt(Number(result[reInfo.dayIndex])),
                                month: reInfo.monthIndex && this.numericMonth(result[reInfo.monthIndex])
                            };
                            break;
                        }
                    } 
                    
                    cache[s] = parseResult;
                    return parseResult;
                },
            
                
                isTime: function isTime( s,  bFormat,  bContains) {
                    
                    var timeInfo = this.parseTime(s, bContains);
                    
                    var isValid = !!(timeInfo && this.doesTimeExist(timeInfo.hour, timeInfo.min, timeInfo.sec));
                    if (bFormat) {
                        if (isValid) {
                            var formatted = this.formatTimeInfo(timeInfo, _DT().TIMEOUTPUTFORMAT);
                            if (bContains) {
                                return {match: timeInfo.match, formatted: formatted};
                            } else {
                                return formatted;
                            }
                        } else {
                            return null;
                        }
                    } else {
                        return !!isValid;
                    }
                },
                
                
                parseTime: function parseTime( s,  bContains, format) {
                    if (s == null) return false;
                    if (typeof(s) != 'string') s = String(s);
                    s = $S.trim(s);
                    
                    
                    
                    var cache = this.CACHE.PARSETIME[bContains ? "CONTAINS" : "EQUALS"],
                        cachedResult = cache[s];
                    if (cachedResult || (cachedResult === null)) return cachedResult;       
                    
                    var parseResult = null;
            
                    
                    var formats;
                    if (format){
                    	formats = [format];
                    }else{
                    	formats = [].concat(_DT().TIMEINPUTFORMATS);
                    	formats.unshift(_DT().TIMEOUTPUTFORMAT);
                    }
            
                    
                    for (var i = 0, len = formats.length; i < len; i++) {       
                        
                        var reInfo = this._buildRegExp4TimeFormat(formats[i]),
                        
                            result = reInfo && s.match(bContains ? reInfo.reContains : reInfo.reEquals);
                        if (result) {
                            
                            var ampm = reInfo.ampmIndex && result[reInfo.ampmIndex];
                            parseResult = {
                                match: result[0],
                                
                                hour: reInfo.hourIndex && this.capitalHour(result[reInfo.hourIndex], ampm),
                                min: reInfo.minIndex && parseInt(Number(result[reInfo.minIndex])),
                                sec: reInfo.secIndex && parseInt(Number(result[reInfo.secIndex]))
                            };
                            break;
                        }
                    } 
                    
                    cache[s] = parseResult;
                    return parseResult;
                },
                
                
                formatTimeInfo: function formatTimeInfo( timeInfo,  format) {
                    if (!format) return '';
                    var twelveHour = !(Number(timeInfo.hour) % 12) ? 12 : (Number(timeInfo.hour) % 12),
                        s = format.replace(/HH/g, this.formatInteger(timeInfo.hour, 2)
                                    ).replace(/H/g, Number(timeInfo.hour)
                                    ).replace(/hh/g, this.formatInteger(twelveHour, 2)
                                    ).replace(/h/g, twelveHour
                                    ).replace(/mm/g, this.formatInteger(Number(timeInfo.min) || 0, 2)
                                    ).replace(/m/g, Number(timeInfo.min) || 0
                                    ).replace(/ss/g, this.formatInteger(Number(timeInfo.sec) || 0, 2)
                                    ).replace(/s/g, Number(timeInfo.sec) || 0
                                    ).replace(/a/g, (Number(timeInfo.hour) < 12) ? _DT().AM_NAME : _DT().PM_NAME
                                    );
                    return s;
                },

                
                doesTimeExist: function doesTimeExst( capitalHour,  min,  sec) {
                    var h = parseInt(capitalHour);
                    if (h >= 0 && h <= 23) {
                        var m = parseInt(min);
                        if (m >= 0 && m <= 59) {
                            if (!sec) return true;
                            var s = parseInt(sec);
                            if (s >= 0 && s <= 59) return true;
                        }
                    }
                    return false;
                },
                
                
                
                capitalHour: function capitalHour( hour,  ampm) {
                    
                    
                    
                    hour = parseInt(Number(hour));
                    if (ampm && (ampm.match(_DT().AM_NAME) || ampm.match(/AM/i))) {
                        
                        return hour % 12;
                    } else if (ampm && (ampm.match(_DT().PM_NAME) || ampm.match(/PM/i))) {
                        
                        return 12 + (hour % 12);
                    } else {
                        
                        
                        return hour;
                    }
                },
                
                
                isDateAndOrTime: function isDateAndOrTime( s,  bFormat) {
                    return this.isDateTime(s, bFormat)
                            || this.isDate(s, bFormat)
                            || this.isTime(s, bFormat);
                },
                
                
                isDateTime: function isDateTime( s,  bFormat) {
                    
                    
                    var dateTimeInfo = this.parseDateAndOrTime(s),
                        dateInfo = dateTimeInfo && dateTimeInfo.date,
                        timeInfo = dateTimeInfo && dateTimeInfo.time,
                        isValid = !!dateInfo 
                                    && !!timeInfo
                                    && this.doesDateExist(dateInfo.month, dateInfo.day, dateInfo.year)
                                    && this.doesTimeExist(timeInfo.hour, timeInfo.min, timeInfo.sec);
                    
                    if (bFormat) {
                        
                        if (isValid) {
                            
                            var formattedDate = this.formatDateInfo(dateInfo, _DT().DATEOUTPUTFORMAT),
                                formattedTime = this.formatTimeInfo(timeInfo, _DT().TIMEOUTPUTFORMAT),
                                dateIndex = s.indexOf(dateInfo.match),
                                timeIndex = s.indexOf(timeInfo.match);
                            return (timeIndex < dateIndex) ?
                                    formattedTime + ' ' + formattedDate :
                                    formattedDate + ' ' + formattedTime;
                                
                        } else {
                            return null;
                        }
                    } else {
                        
                        return !!isValid;
                    }
                },
                
                

                
                parseDateAndOrTime: function parseDateAndOrTime( s,  dateFormat, timeFormat) {
                    
                    var dateInfo = this.parseDate(s, true, dateFormat);
                    
                    
                    var sWithoutDate = $S.trim((dateInfo && dateInfo.match) ? 
                                            s.replace(dateInfo.match, "") :
                                            s),
                        timeInfo = this.parseTime(sWithoutDate, false, timeFormat); 
                        
                    
                    if (!dateInfo && !timeInfo) {
                        return null;
                    } else {
                        
                        return {
                            date: dateInfo,
                            time: timeInfo
                            };
                    }
                },
                
                
                inDateTimeRange: function inDateTimeRange(val, min, max) {
                    
                    var valInfo = this.parseDateAndOrTime(val),
                        valDateInfo = valInfo && valInfo.date,
                        valTimeInfo = valInfo && valInfo.time;
                    
                    if (!valDateInfo && !valTimeInfo) return 0;
                    
                    
                    if (min != null) {
                        
                        var minInfo = this.parseDateAndOrTime(min);
                        
                        if (valDateInfo && minInfo && minInfo.date) {
                            var minDiff = this.compareDate(valDateInfo, minInfo.date);
                            if (minDiff < 0) {
                                
                                return -1;
                            } else if (minDiff == 0)  {
                                
                                
                                if (valTimeInfo && minInfo.time
                                    && (this.compareTime(valTimeInfo, minInfo.time) < 0))
                                {
                                    
                                    return -1;
                                } 
                            } 
                        } 
                    } 
            
                    
                    if (max != null) {
                        
                        var maxInfo = this.parseDateAndOrTime(max);
                        
                        if (valDateInfo && maxInfo && maxInfo.date) {
                            var maxDiff = this.compareDate(valDateInfo, maxInfo.date);
                            if (maxDiff > 0) {
                                
                                return 1;
                            } else if (maxDiff == 0) {
                                
                                
                                if (valTimeInfo && maxInfo.time
                                    && (this.compareTime(valTimeInfo, maxInfo.time) > 0))
                                {
                                    
                                    return 1;
                                } 
                            } 
                        } 
                    } 
                    return 0;
                },
                
                
                 
                compareDate: function compareDate( val1,  val2) {
                    if (val1 == val2) return 0;
                    var date1 = typeof(val1) == 'string' ? this.parseDate(val1) : val1,
                        date2 = typeof(val2) == 'string' ? this.parseDate(val2) : val2;
                    if (!date1) return -1;
                    if (!date2) return 1;
                    return (date1.year - date2.year)
                                || (date1.month - date2.month)
                                || (date1.day - date2.day)
                                || 0;
                },
                
                 
                compareTime: function compareTime( val1,  val2) {
                    if (val1 == val2) return 0;
                    var time1 = typeof(val1) == 'string' ? this.parseTime(val1) : val1,
                        time2 = typeof(val2) == 'string' ? this.parseTime(val2) : val2;
                    if (!time1) return -1;
                    if (!time2) return 1;
                    return (time1.hour - time2.hour)
                                || (time1.min - time2.min)
                                || (time1.sec - time2.sec)
                                || 0;
                },
            
                 
                compareDateTime: function compareDateTime( val1,  val2) {
                    return this.compareDate(val1, val2) || this.compareTime(val1, val2);
                },
                
                compareDateAndOrTime: function compareDateAndOrTime( val1,  val2) {
                	if (val1 == val2) return 0;
                	var dt1 = typeof(val1) == 'string' ? this.parseDateAndOrTime(val1) : val1,
                		dt2 = typeof(val2) == 'string' ? this.parseDateAndOrTime(val2) : val2;
                	
                	if (!dt1) return -1;
                	if (!dt2) return 1;
                		
                	var d1 = dt1.date, d2 = dt2.date, t1 = dt1.time, t2 = dt2.time;
                	return this.compareDate(d1, d2) || this.compareTime(t1, t2); 
                },
                
                
                _buildRegExp4DateFormat: function re4DateFmt( formatStr) {
                
                    if (!formatStr) return null;
                    
                    var reInfo = this.REGEXPS.DATES[formatStr];
                    if (!reInfo) {
                        
                        if (!this.REGEXPS.MONTHNAME_FULL) {
                            this.REGEXPS.MONTHNAME_FULL = _DT().MONTHNAME_FULL.join("|");
                            this.REGEXPS.MONTHNAME_SHORT = _DT().MONTHNAME_SHORT.join("|");
                        }
                        
                        reInfo = this.REGEXPS.DATES[formatStr] = {};
                        
                        reInfo.formatStr = formatStr;
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        var reStr = reInfo.reStr = formatStr.replace(/([^M|d|y|\s])/g, "\\$1"
                                        ).replace(/dd/g, "~~~~" 
                                        ).replace(/d/g, "(\\d{1,2})"
                                        ).replace(/\~\~\~\~/g, "(\\d\\d)"   
                                        ).replace(/yyyy/g, "(\\d\\d\\d\\d)"
                                        ).replace(/yy/g, "(\\d\\d)"
                                        ).replace(/MMMM/g, "@@@@"
                                        ).replace(/MMM/g, "@@@"
                                        ).replace(/MM/g, "(\\d\\d)"
                                        ).replace(/M/g, "(\\d{1,2})"
                                        ).replace("@@@@","(" + this.REGEXPS.MONTHNAME_FULL + ")"
                                        ).replace("@@@", "(" + this.REGEXPS.MONTHNAME_SHORT + ")");
                        
                        
                        reInfo.reEquals = new RegExp("^" + reStr + "$");
                        reInfo.reContains = new RegExp("^" + reStr + "\\b");
                        
                        
                        
                        
                        
                        var indices = [
                            {key: "monthIndex", index: formatStr.indexOf("M")},
                            {key: "dayIndex", index: formatStr.indexOf("d")},
                            {key: "yearIndex", index: formatStr.indexOf("y")}
                            ];
                        indices.sort(function(a, b) { return a.index - b.index });
                        var counter = 1;
                        for (var i = 0; i < 3; i++) {
                            reInfo[indices[i].key] = indices[i].index > -1 ?
                                                        counter++ : null;
                        }   
                    }
                    return reInfo;
                },
            
                
                _buildRegExp4TimeFormat: function re4TimeFmt( formatStr) {
                
                    if (!formatStr) return null;
                    
                    var reInfo = this.REGEXPS.TIMES[formatStr];
                    if (!reInfo) {
                        
                        if (!this.REGEXPSTR_AMPM) {
                            
                            this.REGEXPSTR_AMPM = [_DT().AM_NAME, 
                                                _DT().PM_NAME,
                                                String(_DT().AM_NAME).toLowerCase(),
                                                String(_DT().PM_NAME).toLowerCase()
                                                ].join("|");
                        }
                        
                        reInfo = this.REGEXPS.TIMES[formatStr] = {};
                        
                        reInfo.formatStr = formatStr;
                        
                        
                        
                        
                        var reStr = formatStr.replace(/\'\'/g, '"');
                        
                        
                        
                        var literals = reStr.match(/\'(.+?)\'/g);
                        reStr.replace(/\'(.+?)\'/g, '*');
                        
                        
                        
                        reStr = reStr.replace(/([^H|h|m|s|z|Z|a|\s])/g, "\\$1"
                                        ).replace(/HH|hh/g, "(\\d\\d)"
                                        ).replace(/H|h/g, "(\\d{1,2})"
                                        ).replace(/mm/g, "(\\d\\d)"
                                        ).replace(/m/g, "(\\d{1,2})"
                                        ).replace(/ss/g, "(\\d\\d)"
                                        ).replace(/s/g, "(\\d{1,2})"
                                        ).replace(/a/gi, "(" + this.REGEXPSTR_AMPM + ")"
                                        ).replace(/z|Z/g, "(.+?)");
                        
                        for (var i = 1, len = literals && literals.length || 0; i < len; i++) {
                            reStr = reStr.replace(/\*/, literals[i]);
                        }
                        
                        reStr = reStr.replace(/\"/g, "'");
                        
                        
                        
                        
                        reInfo.reEquals = new RegExp("^" + reStr + "$");
                        reInfo.reContains = new RegExp(reStr);
                        
                        
                        
                        
                        
                        var indices = [
                            {key: "hourIndex", index: formatStr.search(/h|H/)},
                            {key: "minIndex", index: formatStr.indexOf("m")},
                            {key: "secIndex", index: formatStr.indexOf("s")},
                            {key: "ampmIndex", index: formatStr.indexOf("a")},
                            {key: "zoneIndex", index: formatStr.search(/z|Z/)}
                            ];
                        indices.sort(function(a, b) { return a.index - b.index });
                        var counter = 1;
                        for (var i = 0; i < 5; i++) {
                            reInfo[indices[i].key] = indices[i].index > -1 ? 
                                                        counter++ : null;
                        }   
                    }
                    return reInfo;
                },
                
                
                doesDateExist: function doesDateExist( month,  day,  year) {
                    var dt = new Date(year, month - 1, day);

                    return year == dt.getFullYear() &&
                           month == dt.getMonth() + 1 &&
                           day == dt.getDate();
                },
            
                
                fourDigitYear: function fourDigitYear( year) {
                    year = parseInt(Number(year));
                    if (!isNaN(year)) {
                        var twoDigitStart = (_DT().TWODIGITYEARSTART  % 100) || 0;   
                        if (year >= 0 && year <= twoDigitStart) 
                            year = 2000 + year; 
                        else if (year > twoDigitStart && year < 100)
                            year = 1900 + year;
                    }
                    return year;
                },
                
                
                numericMonth: function numMonth( month) {
                    
                    var monthInt = parseInt(Number(month)),
                        _A = mstrmojo.array;
                    if (!isNaN(monthInt)) return monthInt;
                    
                    
                    
                    var len = month && month.length || 0,
                        index = -1;
                    if (len) {
                        
                        if (len <= 3) {
                            index = _A.indexOf(_DT().MONTHNAME_SHORT, month);
                        }
                        
                        if (index == -1) {
                            index = _A.indexOf(_DT().MONTHNAME_FULL, month);
                        }
                    }
                    return index + 1;
                },
                
                
                formatInteger: function fmtInt( num,  minLen) {
                    var s = String(num),
                        missing = Math.max(minLen - s.length, 0);
                    if (missing > 0) {
                        var arr = [s];
                        for (var i = 1; i <= missing; i++) {
                            arr.push("0");
                        }
                        s = arr.reverse().join('');
                    }
                    return s;
                },
                
                
                getFirstDateOfMonth: function(y,m){
                    return new Date(y, m-1, 1);
                },
                
                
                getDateObject: function(y,m,d,hh,mm,ss){
                    y = y || 0;
                    m = m || 1;
                    d = d || 1;
                    hh = hh || 0;
                    mm = mm || 0;
                    ss = ss || 0;
                    return new Date(y,m-1,d,hh,mm,ss);
                },
                
                
                getDateFromDateInfo: function (dateInfo) {
                    return this.getDateObject(
                                dateInfo.date && dateInfo.date.year,
                                dateInfo.date && dateInfo.date.month,
                                dateInfo.date && dateInfo.date.day,
                                dateInfo.time && dateInfo.time.hour,
                                dateInfo.time && dateInfo.time.min,
                                dateInfo.time && dateInfo.time.sec
                            );
                },
                
                
                getDateJson: function(date){
                    return {year:date.getFullYear(),month:date.getMonth() + 1,day:date.getDate(),
                            hour:date.getHours(),min:date.getMinutes(),sec:date.getSeconds()};
                },
                
                
                isLeapYear: function(y) {
                    return !(y%400) || (!(y%4) && !!(y%100));
                },
                
                
                getDaysOfMonth: function(y,m){
                    var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                    if(m == 2 && this.isLeapYear(y)){ return 29; } 
                    return days[m - 1];     
                },
                
                
                getPreMonth: function(y,m) {
                    if(m === 1) return {y:y-1, m:12};
                    return {y:y,m:m-1};
                },
                
                
                getNextMonth: function(y,m){
                    if(m === 12) return {y:y+1,m:1};
                    return {y:y,m:m+1};
                }              
                
            });

 })();
(function() {

    mstrmojo.requiresCls("mstrmojo.array", "mstrmojo.locales");

    var _A = mstrmojo.array, MTP = mstrmojo.meta.TP, H = mstrmojo.hash, 
    _ET = {
        ANDOR : 14,
        MQ : 10,
        MC : 12,
        AQ : 2,
        AL : 6,
        AC : 9,
        AE : 5,
        F : 13,
        R : 21,
        B : 20,
        XML : 1
    }, _ETvals = {};
    for ( var k in _ET) {
        _ETvals[_ET[k]] = true;
    }

    
    var ET2TGT = {};
    ET2TGT[_ET.AQ] = 'a';
    ET2TGT[_ET.AL] = 'a';    
    ET2TGT[_ET.AC] = 'a';
    ET2TGT[_ET.AE] = 'a';
    ET2TGT[_ET.MQ] = 'm';
    ET2TGT[_ET.MC] = 'm';
    ET2TGT[_ET.F] = 'f';
    ET2TGT[_ET.R] = 'r';
    ET2TGT[_ET.XML] = 'p';

    
    var ET2C = {};
    ET2C[_ET.MQ] = [ 'not', 'm', 'fn', 'fnt', 'cs', 'dmy' ];
    ET2C[_ET.MC] = [ 'not', 'm', 'fn', 'fnt', 'm2', 'm3', 'p', 'dmy' ]; 
    ET2C[_ET.AE] = [ 'not', 'a', 'fn', 'es', 'a2', 'fm2', 'p']; 
    ET2C[_ET.AQ] = [ 'not', 'a', 'fm', 'fn', 'cs'];
    ET2C[_ET.AL] = [ 'not', 'a', 'fm', 'fn', 'cs'];    
    ET2C[_ET.AC] = [ 'not', 'a', 'fm', 'a2', 'fm2', 'a3', 'fm3', 'fn', 'cs'];
    ET2C[_ET.R] = [ 'not', 'r' ];
    ET2C[_ET.F] = [ 'not', 'f' ];
    ET2C[_ET.XML] = [ 'not', 'n', 'p' ]; 

    

    var _ET2FNS = {};
    _ET2FNS[_ET.MQ] = "METRIC_FNS";
    _ET2FNS[_ET.MC] = "METRIC_FNS";
    _ET2FNS[_ET.AQ] = "FORM_FNS";
    _ET2FNS[_ET.AL] = "FORM_FNS";    
    _ET2FNS[_ET.AC] = "FORM_FNS";
    _ET2FNS[_ET.AE] = "ELEM_FNS";

    var _TP = {
        FILTER : 1,
        REPORT : 3,        
        METRIC : 4,
        FOLDER : 8,        
        PROMPT : 10,
        FUNCTION: 11,
        ATTR : 12,
        FACT: 13,
        DIM:14,
        FORM : 21,
        ROLE: 43 
    }, _STP = {
        FILTER : 256,
        CUSTOMGROUP : 257,
        PROMPT : 2560,
        PROMPT_BOOLEAN : 2561,
        PROMPT_LONG : 2562,
        PROMPT_STRING : 2563,
        PROMPT_DOUBLE : 2564,
        PROMPT_DATE : 2565,
        PROMPT_OBJECTS : 2566,
        PROMPT_ELEMENTS : 2567,
        PROMPT_EXPRESSION : 2568,
        PROMPT_EXPRESSION_DRAFT : 2569,
        PROMPT_DIMTY : 2570,
        PROMPT_BIGDECIMAL : 2571,
        REPORT_GRID : 768,
        REPORT_GRAPH : 769,
        REPORT_ENGINE : 770,
        REPORT_TEXT : 771,
        REPORT_DATAMART : 772,
        REPORT_BASE : 773,
        REPORT_GRIDGRAPH : 774,
        REPORT_NONINTERACTIVE : 775,
        REPORT_CUBE : 776
    }, OBJKEY2TP = {
        a : _TP.ATTR,
        a2 : _TP.ATTR,
        m : _TP.METRIC,
        m2 : _TP.METRIC,
        r : _TP.REPORT,
        f : _TP.FILTER,
        p : _TP.PROMPT
    };

    
    var ET2TP = {};
    ET2TP[_ET.MQ] = _TP.METRIC;
    ET2TP[_ET.MC] = _TP.METRIC;
    ET2TP[_ET.AQ] = _TP.ATTR;
    ET2TP[_ET.AL] = _TP.ATTR;    
    ET2TP[_ET.AC] = _TP.ATTR;
    ET2TP[_ET.AE] = _TP.ATTR;
    ET2TP[_ET.F] = _TP.FILTER;
    ET2TP[_ET.R] = _TP.REPORT;

    
    
    
    
    var _funcTrans = function(funs){
            var len = funs.length,
            r = {};
            for (var i = 0; i < len; i ++){
                var f = funs[i];
                r[f.did] = f.n;
            }
            return r;
        },
        _tpTrans = function(funs){
            var len = funs.length;
            for (var i = 0; i < len; i ++){
                var fun = funs[i];
                if ('tp' in fun) {
                    fun.t = fun.tp;
                }
            }
            return funs;
        },
        _fnTrans = function(funs, t){
            var len = funs.length;
            for (var i = 0; i < len; i ++){
                var fun = funs[i];
                if ('tp' in fun) {
                    if (t) {
                        fun.t = t;
                    } else {
                        delete fun.t;
                    }
                }
            }
            return funs;
        },
        _arrRep = function(funs, desc){
            if (!desc) {
                desc = [];
            }
            
            desc.length = 0;
            for (var i = 0, len = funs.length; i < len; i ++){
                desc[i] = funs [i];
            }
            return desc;
        },
        FORM_PROHIBITED = {
            0: [ 
                 {
                     'did' :'1,76'
                 }, {
                     'did' :'1,79'
                 }, {
                     'did' :'1,77'
                 }, {
                     'did' :'1,80'
                 }, {
                     'did' :'1,78'
                 }, {
                     'did' :'1,81'
                 }, {
                     'did' :'1,18'
                 }, {
                     'did' :'1,43'
                 } ],
            1: [ 
                 {
                     'did' :'2,1'
                 }, {
                     'did' :'2,2'
                 }, {
                     'did' :'3,1'
                 }, {
                     'did' :'3,2'
                 }]
            
        };
        METRIC_PROHIBITED = {
                0:[
                       {
                           'did':'1,22'
                       },{
                            'did':'1,57'
                        }
                  ]
        };
       

    
    mstrmojo.expr = mstrmojo.provide("mstrmojo.expr",
    
    {
        
        ET : _ET,

        ETs : _ETvals,

        ET2TGT : ET2TGT,

        ET2COND : ET2C,

        ET2TP : ET2TP,

        
        FN : {
            EQUAL: 6,
            NOT_EQUAL: 7,
            GREATER: 8,
            LESS: 9,
            GREATER_EQUAL: 10,
            LESS_EQUAL: 11,
            IN_LIST : 22,
            NOT_IN_LIST : 57,
            BETWEEN : 17,
            NOT_BETWEEN : 44,
            IS_NULL : 54,
            IS_NOT_NULL : 55,
            AND : 19,
            OR : 20,
            NOT : 21
        },

        
        FNT : {
            DEF : 1,
            RANK : 2,
            PER : 3
        },

        
        FN_SEP : ",",

        
        TP : _TP,

        
        STP : _STP,

        
        DMY_TP : {
            ATTR : -1,
            DIM : -2
        },

        
        DTP : {
            UNKNOWN : -1,
            INTEGER : 1,
            UNSIGNED : 2,
            NUMERIC : 3,
            DECIMAL : 4,
            REAL : 5,
            DOUBLE : 6,
            FLOAT : 7,
            CHAR : 8,
            VARCHAR : 9,
            LONGVARCHAR : 10,
            BINARY : 11,
            VARBIN : 12,
            LONGVARBIN : 13,
            DATE : 14,
            TIME : 15,
            TIMESTAMP : 16,
            SHORT : 21,
            LONG : 22,
            MBCHAR : 23,
            BOOLEAN : 24,
            PATTERN : 25,
            BIGDECIMAL : 30
        },

        
        METRIC_DTP : 3, 

        
        FN_DTP : {
            NUM : 0,
            CHAR : 1,
            DATE : 2
        },

        
        DTP2PROMPT_STP : {
            "-1" : _STP.PROMPT,
            1 : _STP.PROMPT_LONG,
            2 : _STP.PROMPT_LONG,
            3 : _STP.PROMPT_LONG,
            4 : _STP.PROMPT_DOUBLE,
            5 : _STP.PROMPT_DOUBLE,
            6 : _STP.PROMPT_DOUBLE,
            7 : _STP.PROMPT_DOUBLE,
            8 : _STP.PROMPT_STRING,
            9 : _STP.PROMPT_STRING,
            10 : _STP.PROMPT_STRING,
            14 : _STP.PROMPT_DATE,
            15 : _STP.PROMPT_DATE,
            16 : _STP.PROMPT_DATE,
            21 : _STP.PROMPT_LONG,
            22 : _STP.PROMPT_LONG,
            23 : _STP.PROMPT_STRING,
            24 : _STP.PROMPT_BOOLEAN,
            30 : _STP.PROMPT_BIGDECIMAL
        },

        
        DTP2FN_DTP : {
            "-1" : 0,
            1 : 0,
            2 : 0,
            3 : 0,
            4 : 0,
            5 : 0,
            6 : 0,
            7 : 0,
            8 : 1,
            9 : 1,
            10 : 1,
            11 : 0,
            12 : 0,
            13 : 0,
            14 : 0, 
            15 : 0, 
            16 : 0, 
            21 : 0,
            22 : 0,
            23 : 1,
            24 : 0,
            25 : 1,
            30 : 0
        },
        
        fnCstCount : function fcc(fn, fnt) {
                
            var f = this.FN;
            switch (fn) {
            case f.BETWEEN: 
            case f.NOT_BETWEEN: 
                return 2;
            case f.IS_NULL: 
            case f.IS_NOT_NULL: 
                return 0;
            default:
                return 1;
            }
            
            
        },

        
        fn_List: function fn_List(fn, fnt){
            var f = this.FN;
            return fn == f.IN_LIST || fn == f.NOT_IN_LIST;
        },
        
        
        fn_AC_MC: function fn_AC_MC(fn, fnt){
            var f = this.FN;
            return (fn == f.EQUAL) || (fn == f.NOT_EQUAL) || (fn == f.GREATER) || (fn == f.LESS) || (fn == f.GREATER_EQUAL) || (fn == f.LESS_EQUAL);      
        },
        
        
        
        fnName : function fnn(et, fn, fnt, dtp) {
            var arr = this[_ET2FNS[et]];
            if (arr && arr.constructor === Object) {
                arr = arr[this.DTP2FN_DTP[dtp]] || arr["*"];
            }
            var i = _A.find(arr, "did", (fnt || 1) + this.FN_SEP + fn);
            if (i > -1) {
                return arr[i].n;
            }
            return '';
        },

    
        
        findTargets : function fndT(nd, idField, h) {
            if (!h) {
                h = {};
            }
            if (nd) {
                
                for ( var k in OBJKEY2TP) {
                    var t = nd[k];
                    if (t) {
                        if (!t[MTP]) { 
                            t[MTP] = OBJKEY2TP[k]; 
                        }
                        h[t[idField]] = t;
                    }
                }
        
                if (nd.dmy) {
                    var A = this.TP.ATTR, DA = this.DMY_TP.ATTR, uts = nd.dmy.uts;
                    for ( var u = 0, uLen = (uts && uts.length) || 0; u < uLen; u++) {
                        var ut = uts[u];
                        if (ut && ut.utp === DA) {
                            var dt = ut.utgt;
                            if (!dt.t) {
                                dt.t = A;
                            }
                            h[dt[idField]] = dt;
                        }
                    }
                }

                
                var ch = nd.nds, i, len;
                for ( i = 0, len = (ch && ch.length) || 0; i < len; i++) {
                    this.findTargets(ch[i], idField, h);
                }
                var cs = nd.cs,
                    clen = cs && cs.length;
                if (clen){
                    for (i = 0; i < clen; i ++){
                        this.findTargets(cs[i], idField, h);
                    }
                }
            }
            return h;
        },
        onLocaleUpdated : function() {
            var _STRS = mstrmojo.locales.expression,
                _E = mstrmojo.expr;
        
            _E.BRANCH_FNS = H.copy(_funcTrans(_STRS.BranchQual), _E.BRANCH_FNS); 
        
    
        
            _E.ELEM_FNS = _arrRep(_fnTrans(_STRS.Element, 'fn'), _E.ELEM_FNS); 
            
    
            
            _E.METRIC_FNS = {
                "*" : _fnTrans(_A.filter(_STRS.Metric, function(item){
                        return item.did && (_A.find(METRIC_PROHIBITED['0'], 'did', item.did) < 0);}))
                    
            };
            
            _E.FORM_FNS = {
                0 : 
                    _fnTrans(_A.filter(_STRS.Attribute, function(item){
                        return item.did && (_A.find(FORM_PROHIBITED['0'], 'did', item.did) < 0);})),
                1 : 
                    _fnTrans(_A.filter(_STRS.Attribute, function(item){
                        return item.did && (_A.find(FORM_PROHIBITED['1'], 'did', item.did) < 0);})),
                2 : 
                    _fnTrans(_A.filter(_STRS.Attribute, function(item){
                        return item.did && (_A.find(FORM_PROHIBITED['0'], 'did', item.did) < 0) && (_A.find(FORM_PROHIBITED['1'], 'did', item.did) < 0);}))
                    
                    
            };
    
            _E.DIMTYLEVELS = _arrRep(_fnTrans(_STRS.DimtyLevels), _E.DIMTYLEVELS) ;
                
        }
    });
    
    mstrmojo.expr.onLocaleUpdated();

})();
(function(){

    
    mstrmojo.all = {};
    
    var _A = mstrmojo.all;
    
    
    var _freeIdCounter = 0;

    
    function _freeId() {
        for (;_freeIdCounter++;) {
            if (!_A["mstr" + _freeIdCounter]) {
                break;
            }
        }
        return "mstr" + _freeIdCounter;
    }
    
    
    mstrmojo.registry = mstrmojo.provide(
    "mstrmojo.registry",
    
    {
        
        add: function add(obj) {
            if (!obj) {
                return;
            }
            
            var id = obj.id;
            if (id == null) {   
                id = _freeId();
                obj.id = id;
            } else if (_A[id]) {
                throw new Error("Tried to register 2 objects with same id: " + id);
            }
            _A[id] = obj;
        },
        
        
        remove: function rmv(obj) {
            if (obj && obj.id != null) {    
                delete _A[obj.id];
            }
        },

        
                
        dumpAll: function() {
            for(var o in _A ) {
                if ( _A[o].id != null ) {
                    mstrmojo.dbg(_A[o].id + "(" + (_A[o].scriptClass || "[unknown class]") + ")");
                } 
            }
        },
                        
        
        ref: function ref(config, flags){
            if (!config) {
                return null;
            }
            if (!flags) {
                flags = {};
            }
            var C = config;
            while(C) {
                switch(typeof(C)) {
                    case "string":
                        
                        if (flags.skipLoadChecks !== true) {
                            mstrmojo.requiresCls(config);
                        }
                        C = eval(C);
                        break;
                    case "function":                        
                        
                        return (flags.dontInst !== true) ? new C() : C;
                    case "object":
                        if (C.constructor === Object) {
                            
                            var sc = C.scriptClass;
                            if (sc) {
                                
                                if (flags.skipLoadChecks !== true) {
                                    mstrmojo.requiresCls(sc);
                                }
                                var cls = eval(sc);
                                if (cls) {
                                    
                                    return new cls((flags.clone === true) ? 
                                                    mstrmojo.hash.clone(C) : 
                                                    C);
                                }
                                
                                return null;
                            } else {
                                
                                return C;
                            }
                        } else {
                            
                            return C;
                        }
                        break;
                    default:
                        return null;
                }
            }
        }
    });

    
    mstrmojo.insert = mstrmojo.registry.ref;
    
})();
(function(){
 
    mstrmojo.requiresCls("mstrmojo.locales", "mstrmojo.string");
    
    var _L = mstrmojo.locales,
        _S = mstrmojo.string,
        _G = window.mstrConfig,
        
        
        
        getThousand = function(){ return mstrmojo.locales.number.THOUSANDSEPARATOR;},
        getDecimal = function(){ return mstrmojo.locales.number.DECIMALSEPARATOR;}, 
        _unit = _G.units,
        UNIT = {
            CM: 1,
            IN: 2,
            MM: 3,
            PT: 4,
            PC: 5,
            PX: 6
        },
        CAT = {
            DEFAULT: -2,
            FIXED: 0,
            CURR: 1,
            PERCENT: 4,
            FRACTION : 5,
            SCIENTIFIC: 6,
            GENERAL: 9
        };
  
    
    var DPI_CONVERSION = 96;
    
    String.prototype.reverse = function() {
        var res = "";
        for (var i = this.length; i > 0; --i) {
            res += this.charAt(i - 1);
        }
        return res;
    };    
    
    
    
    mstrmojo.num = mstrmojo.provide(
            "mstrmojo.num",
            {
                
                isInt: function isInt(v){
                    var thousand = getThousand(),
                        INT_THOUSAND = new RegExp('^(\-)?[0-9]{1,3}(\\' + thousand + '[0-9]{3})*$'),
                        INT_NO_THOUSAND = new RegExp('^(\-)?[0-9]+$');
                    
                    return (String(v).indexOf(thousand) && INT_THOUSAND.test(v)) || INT_NO_THOUSAND.test(v);
                }, 
                
                
                isNumeric: function isNumeric(v,noDG){
                    
                   var decimal = getDecimal(),
                       thousand = getThousand(),
                       NUMERIC_THOUSAND = new RegExp('^(\-)?[0-9]{1,3}(\\' + thousand + '[0-9]{3})*(\\' + decimal + '[0-9]+)?$'),
                       NUMERIC_NO_THOUSAND = new RegExp('^(\-)?[0-9]*(\\' + decimal + ')?[0-9]+$');
                   
                   return (String(v).indexOf(thousand) && NUMERIC_THOUSAND.test(v)) || NUMERIC_NO_THOUSAND.test(v);
                },
                
                
                parseInteger: function parseInteger(v, r){
                    if(!this.isInt(v)) return Number.NaN;
                    return parseInt(String(v).replace(getThousand(), ''),r);
                },
                
                
                parseNumeric: function parseNumeric(v){
                    
                    if(!this.isNumeric(v)) return Number.NaN;
                    return parseFloat(String(v).replace(getThousand(),'').replace(getDecimal(), '.'));
                },
                
                   
                inNumericRange: function inNumericRange(v,min,max){
                    v = this.parseNumeric(v);
                    max = (max != null) ? this.parseNumeric(String(max)) : Number.NaN;
                    min = (min != null) ? this.parseNumeric(String(min)) : Number.NaN;   
                    if(max != Number.NaN && (v > max || isNaN(v))) return 1;
                    if(min != Number.NaN && (v < min || isNaN(v))) return -1;
                    return 0;
                },
                
                
                
                convertToUSUnits: function(value, unit, doNotLocalize) {
                        var __result = value;

                        unit = unit || _unit; 
                        switch (parseInt(unit, 10)) {
                            case UNIT.CM:
                                __result = parseFloat(this.toString(value)) / 2.54 + '';
                                break;
                            case UNIT.MM:
                                __result = parseFloat(this.toString(value)) / 25.4 + '';
                                break;
                            case UNIT.PT:
                                __result = parseFloat(this.toString(value)) / 72 + '';
                                break;
                            case UNIT.PC:
                                __result = parseFloat(this.toString(value)) / 6 + '';
                                break;
                            case UNIT.PX:
                                __result = parseFloat(this.toString(value)) / DPI_CONVERSION + '';
                                break;
                        }
                        
                        return doNotLocalize ? __result : this.toLocaleString(__result);
                    },
                    
                    
                    convertToLocalUnits: function(value, unit, doNotLocalize) {
                        var __result;

                        unit = unit || _unit; 
                        switch (parseInt(unit, 10)) {
                        case  UNIT.CM:
                            __result = (parseFloat(this.toString(value)) * 2.5400).toFixed(4) + '';
                            break;
                        case UNIT.MM :
                            __result = (parseFloat(this.toString(value)) * 25.4000).toFixed(4) + '';
                            break;
                        case UNIT.PT:
                            __result = (parseFloat(this.toString(value)) * 72.0000).toFixed(4) + '';
                            break;
                        case UNIT.PC:
                            __result = (parseFloat(this.toString(value)) * 6.0000).toFixed(4) + '';
                            break;
                        case UNIT.PX:
                            __result = (parseFloat(this.toString(value)) * DPI_CONVERSION) + '';
                            break;
                        default:
                            __result = parseFloat(this.toString(value)).toFixed(4) + '';
                        }
                        
                        return doNotLocalize ? __result : this.toLocaleString(__result);
                    },

                    
                    convertUnits: function(unitFrom, unitTo, value) {
                        return this.convertToLocalUnits(unitTo, this.convertToUSUnits(unitFrom, value, true), true);
                    },
                    
                    
                    toLocaleString: function(value) {
                        return (value + '').replace(".", getDecimal());
                    },
                    
                    
                    toString: function(value, removeThousandsSeparator) {
                        if (removeThousandsSeparator === true) {
                            var regex = this.getThousandSepRegex();
                            if (regex) {
                             value = String(value).replace(regex,'');
                            }     
                         }
                        return String(value).replace(getDecimal(), ".");
                    },

                    getThousandSepRegex: function() {
                        if (this.thousandSeparatorRegex == null) {
                              this.thousandSeparatorRegex = new RegExp(getThousand().replace(/(\W){1}/g,'\\$1'), 'g');
                        }
                        return this.thousandSeparatorRegex;
                    },
                    
                    
                    addSeparators: function(val, ts) {
                        var _ts = ts;
                        if (ts == '.' || ts == '*' || ts == '\\') { _ts = '\\' + ts;}
                        return val.reverse().replace(/(\d{3})/g, "$1" + ts).reverse().replace(new RegExp('^(-)?'+ _ts), "$1");
                    },
                    
                    
                    format: function(category, decimalPlaces, curr, nm){
                        var pattern = '',
                        ds = (decimalPlaces > 0)? '.' : '',
                        zeros = [];
                        
                        curr = (curr)? curr: '';
                        
                        for (var i = 0; i < decimalPlaces; i ++) {zeros.push('0');}
                        zeros = zeros.join('');
                        
                        switch(category){
                        case CAT.PERCENT:
                            pattern = '0' + ds + zeros + '%';
                            break;
                        case CAT.SCIENTIFIC:
                            pattern = '0' + ds +zeros + 'E+00';
                            break;
                        default: 
                            pattern = '"' + curr + '"' + '#,##0' + ds +zeros;
                        }
                        return this.formatByMask(pattern, nm);
                    },
                    
                    
                    formatByMask: function(formatMask,nm){
                        var ptns = String(formatMask).split(';'),
                        result = '',
                        pattern = ptns[0],
                        ph = '\u00A4';
                        
                        if(isNaN(nm)){
                            return nm;
                         }
                        
                        var ePos = pattern.indexOf("E+"),
                            pPos = pattern.indexOf("%"),
                            cs = pattern.match(/\".*\"/),
                            fs = pattern.indexOf("?/?") > -1,
                            cat = (ePos != -1)? CAT.SCIENTIFIC : ( (pPos != -1)? CAT.PERCENT : ((cs)? CAT.CURR : fs ? CAT.FRACTION : CAT.FIXED)),
                            currMask = '',
                            negMask = '',
                            isNeg = false,
                            sNm = new String(nm),
                            nN = parseFloat(nm);
                        
                        
                        if(cs) {
                            currMask = pattern.replace(/\".*\"/, 
                                    cs[0].substring(1, cs[0].length -1)).replace(pattern.replace(cs[0], ''), ph);
                        }
                        
                        
                        if(nN<0){
                            sNm = sNm.substring(1, sNm.length);
                            nN = -nN,
                            isNeg = true;
                            if (ptns.length > 1) { 
                                var _ptns1 = ptns[1].replace(/\[.*\]/, ''); 
                                negMask = _ptns1.replace(ptns[0], ph); 
                            }
                        }
                       
                       
                       var negativeFormat = function(sNm, negMask) {
                           return (negMask)? negMask.replace(ph, sNm) :  '-' + sNm;
                       };
                       
                       if (cat == CAT.FRACTION) {
                           var i, 
                               j, 
                               minIndex, 
                               base = 10, 
                               output, 
                               intPart = 0,
                               v, 
                               currentMin, 
                               temp,
                               sepInt = false,
                               stemp;
                           
                           
                           if (formatMask.indexOf("# ") > -1){
                               sepInt = true;
                           }
                           
                           
                           for (i=5; i>0; i--){
                               stemp = "/";
                               for (j=0; j<i; j++){
                                   stemp +="?";
                               }
                               if (formatMask.indexOf(stemp) > -1){
                                   for (j=1;j<i;j++){
                                       base *= 10;
                                   }
                                   break;
                               }
                           }

                           if (sepInt){
                               intPart =  Number(Number(nN).toFixed(0));
                               nN -= intPart;
                           }

                           currentMin = base / 2;
                           minIndex = -1;
                           v = nN * base;
                           for (i = base; i>=2; i--){
                               temp = (v * i) / base;
                               temp = temp - Math.floor(temp);
                               temp = temp * base;

                               if (Math.abs(temp - base) < temp){
                                   temp = Math.abs(temp - base);
                               }
                               
                               temp = temp / i;
                               
                               if (temp < currentMin){
                                   currentMin = temp;
                                   minIndex = i;
                               }
                               else if ((temp == currentMin) && (temp == 0)){
                                   currentMin = temp;
                                   minIndex = i;
                               }
                           }

                           output = Math.round(minIndex * v / base);

                           for (i = minIndex; i>=2; i--){
                               if ((output % i == 0) && (minIndex % i == 0)){
                                   output = output / i;
                                   minIndex = minIndex / i;
                                   break;
                               }
                           }

                           if (minIndex == base){
                               minIndex = 1;
                               output = 0;
                           }
                           if (output == 0){
                               minIndex = 1;
                           }
                           if (output == minIndex){
                               if (sepInt){
                                   result = "" + (intPart + 1);
                               }else{
                                   result = "1";
                               }
                           }else if (sepInt && intPart >0){
                               result = intPart + " " + output + "/" + minIndex;
                           }else{
                               result = output + "/" + minIndex;
                           }
                           
                       }else if (cat == CAT.SCIENTIFIC) {
                           
                           var exp = Math.floor(Math.log(nN) / Math.LN10),
                           m = nN / Math.pow(10, exp),
                           beStr = pattern.substring(0, ePos),
                           dPos = beStr.indexOf('.');
                           
                           result += Number(m).toFixed((dPos != -1)? beStr.length - dPos - 1 : 0);
                           result = ((isNeg) ? negativeFormat(result, negMask) : result )+ 'E' + ((exp > 0)? '+': '') + exp;
                           
                       } else {
                           if(cat == CAT.PERCENT) {
                               pattern=pattern.substring(0,pattern.length - 1);
                               sNm= String(nN * 100);
                           }
                           
                         
                           var dPos = pattern.indexOf('.'),
                           dp = 0;
                           if (dPos != -1) {
                               var dpS = pattern.substr(dPos + 1 , pattern.length).match(/\d+/);
                               if (dpS && dpS.length > 0) {
                                   dp = dpS[0].length;
                               }
                           }
                           
                           result =  String(Number(parseFloat(sNm).toFixed(dp)));
                           
                           var nn = result.split('.');
                           
                           
                           var tsPos = pattern.match(/#.+##/);
                           if (tsPos !== null) {
                               nn[0] =  this.addSeparators(nn[0], getThousand());
                           }
                               
                            result =  nn.join(getDecimal());
                            
                           
                           if (cat == CAT.CURR) { result = currMask.replace(ph, result); }
                           
                           
                           if (cat == CAT.PERCENT) { result += '%'; }
                           
                           
                           if (isNeg) {  
                               result = negativeFormat(result, negMask);
                           }
                       }
                       
                       return result;
                    },
                    
                    
                    
                     generateUniqueID: function( keyLen ) {
                        var     chars="0123456789ABCDEF".split(''),
                                id = [];                        
                        for (var i = 0; i < keyLen; i++) {
                            id[i] = chars[0 | Math.random()*16];
                        }
                        return id.join('');
                     },
                     
                     countOfDecimals: function(v, decimalSep) {
                    	 var sV = String(v);
                    	 return sV.length - (sV.indexOf(decimalSep !== undefined? decimalSep : getDecimal()) + 1); 
                     }         
            });

 })();
(function(){

    var DEFAULT_COLOR = "#000000";
        
    
    mstrmojo.color = mstrmojo.provide(
        "mstrmojo.color",
        
        
        {
            
             
            hexChars: '0123456789ABCDEF',

            
            toHex: function C_toHex(n) {
                n = n || 0;
                n = Math.max(Math.min(isNaN(n) ? 0 : parseInt(n, 10), 255), 0);
        
                return this.hexChars.charAt((n - n % 16) / 16)
                        + this.hexChars.charAt(n % 16);
            },

            toDec: function C_toDec(h) {
                return this.hexChars.indexOf(h.toUpperCase());
            },

            
            rgbStr2rgb: function C_rgbStr2rgb(color) {
                var rgb = [ 0, 0, 0 ];
                color = color.replace(/ /g, ''); 
                var i = color.indexOf('rgb');
                if (i >= 0) {
                    color = color.substring(i + 4, color.length - 1);
                    rgb = color.split(',');
                }
                return rgb;
            },

            
            rgbStr2hex: function C_rgbStr2hex(color) {
                
                if (color.indexOf('rgb') >= 0) {
                    var rgb = this.rgbStr2rgb(color);
                    return "#" + this.rgb2hex(rgb[0], rgb[1], rgb[2]);
                }
                return color;
            },

            rgb2hex: function C_rgb2hex(r, g, b) {
                return this.toHex(r) + this.toHex(g)
                        + this.toHex(b);
            },

            rgb2hsv: function C_rgb2hsv(r, g, b) {
                var rgb = [ r, g, b ];
                rgb.sort( function(a, b) {
                    return a - b;
                });
        
                var h, s, v = 0;
                var min = rgb[0];
                var max = rgb[2];
        
                v = max / 255.0;
                s = (max != 0) ? (parseFloat(max) - parseFloat(min)) / parseFloat(max)
                        : 0;
        
                if (s == 0) {
                    h = 0;
                } else {
                    var d = max - min;
                    var red = (max - r) / d;
                    var green = (max - g) / d;
                    var blue = (max - b) / d;
        
                    if (r == max)
                        h = blue - green;
                    else if (g == max)
                        h = 2.0 + red - blue;
                    else
                        h = 4.0 + green - red;
        
                    h = h / 6.0;
                    if (h < 0)
                        h = h + 1.0;
                }
        
                return [ Math.round(h * 360), Math.round(s * 100), Math.round(v * 100) ];
            },

            hex2rgb: function C_hex2rgb(s) {
                var color = (s.charAt(0) == '#') ? s.substr(1) : s;
                var l = color.length !== 3;
                var rgb = [ 0, 0, 0 ];
                if (l) {
                    rgb[0] = (this.toDec(color.substr(0, 1)) * 16)
                            + (this.toDec(color.substr(1, 1)));
                    rgb[1] = (this.toDec(color.substr(2, 1)) * 16)
                            + (this.toDec(color.substr(3, 1)));
                    rgb[2] = (this.toDec(color.substr(4, 1)) * 16)
                            + (this.toDec(color.substr(5, 1)));
                } else {
                    rgb[0] = (this.toDec(color.substr(0, 1)) * 16)
        	            + (this.toDec(color.substr(0, 1)));
                    rgb[1] = (this.toDec(color.substr(1, 1)) * 16)
                	    + (this.toDec(color.substr(1, 1)));
                    rgb[2] = (this.toDec(color.substr(2, 1)) * 16)
        		    + (this.toDec(color.substr(2, 1)));
	     }        
                return rgb;
            },

            hex2hsv: function (s) {
                var rgb = this.hex2rgb(s);
                return this.rgb2hsv(rgb[0], rgb[1], rgb[2]);
            },

            hsv2rgb: function (h, s, v) {
                h = h / 360;
                s = s / 100;
                v = v / 100;
        
                var r, g, b;
                if (s == 0) {
                    r = v * 255;
                    g = v * 255;
                    b = v * 255;
                } else {
                    var th = h * 6;
                    if (th == 6)
                        th = 0;
        
                    var i = Math.floor(th);
                    var p = v * (1 - s);
                    var q = v * (1 - s * (th - i));
                    var t = v * (1 - s * (1 - (th - i)));
        
                    var tr, tg, tb;
        
                    switch (i) {
                    case 0:
                        tr = v;
                        tg = t;
                        tb = p;
                        break;
        
                    case 1:
                        tr = q;
                        tg = v;
                        tb = p;
                        break;
        
                    case 2:
                        tr = p;
                        tg = v;
                        tb = t;
                        break;
        
                    case 3:
                        tr = p;
                        tg = q;
                        tb = v;
                        break;
        
                    case 4:
                        tr = t;
                        tg = p;
                        tb = v;
                        break;
        
                    default:
                        tr = v;
                        tg = p;
                        tb = q;
                        break;
                    }
        
                    r = tr * 255;
                    g = tg * 255;
                    b = tb * 255;
                }
                return [ Math.round(r), Math.round(g), Math.round(b) ];
        
            },

            hsv2hex: function (h, s, v) {
                var rgb = this.hsv2rgb(h, s, v);
                return this.rgb2hex(rgb[0], rgb[1], rgb[2]);
            },
            
            getContrastingColor : function C_getContrastingColor(hex, colors) {
                var rgb = this.hex2rgb(hex);
                return (((rgb[0] * 299) + (rgb[1] * 587) + (rgb[2] * 114)) / 1000 < 125) ? colors[0] : colors[1];
            },
            
            getHighlightColor: function C_getHighlightColor(rgb, moreDim) {
                var r, g, b, luminosity,
                    refRGB = this.hex2rgb(!moreDim ? '#FFCE7F' : '#EFE6D8'),
                    R1 = parseInt(rgb[0], 10),
                    G1 = parseInt(rgb[1], 10),
                    B1 = parseInt(rgb[2], 10),
                    R2 = parseInt(refRGB[0], 10),
                    G2 = parseInt(refRGB[1], 10),
                    B2 = parseInt(refRGB[2], 10);
                
                    r = (R1 * R2) / 255;
                    g = (G1 * G2) / 255;
                    b = (B1 * B2) / 255;
                    
                    luminosity = R1 * 0.3 + G1 * 0.59 + B1 * 0.11;
                    if (luminosity < 85) {
                        r = r + (63 * (85 - luminosity) / 85); 
                        r = r > 255 ? 255 : r;
                        g = g + (63 * (85 - luminosity) / 85); 
                        g = g > 255 ? 255 : g;
                        b = b + (63 * (85 - luminosity) / 85); 
                        b = b > 255 ? 255 : b;
                    }

                return "#" + this.rgb2hex(Math.round(r), Math.round(g), Math.round(b));
            },
            
            
            get3DBorderColor: function C_get3DBorderColor(bgRGB, stroke) {
                var lum = parseInt(bgRGB[0],10) * 0.3 + parseInt(bgRGB[1],10) * 0.59
                    + parseInt(bgRGB[2],10) * 0.11;

                var r = parseInt(bgRGB[0],10);
                var g = parseInt(bgRGB[1],10);
                var b = parseInt(bgRGB[2],10);

                switch (stroke) {
                case 'light': 
                    if (lum > 150) {
                        r = r * 0.9;
                        g = g * 0.9;
                        b = b * 0.9;
                    } else {
                        r = r * 0.6 + 102;
                        g = g * 0.6 + 102;
                        b = b * 0.6 + 102;
                    }
                    break;
                case 'dark': 
                    if (lum > 10) {
                        r = r * 0.4;
                        g = g * 0.4;
                        b = b * 0.4;
                    } else {
                        r = r * 0.8 + 30;
                        g = g * 0.8 + 30;
                        b = b * 0.8 + 30;
                    }
                }

                return "#" + this.rgb2hex(Math.round(r), Math.round(g), Math.round(b));
            },
            
            
            
            encodeColor: function (v, d) { 
                    if (d != undefined && (v == null || v.length == 0 || v == 'undefined')) {
                        v = d;
                    }
                    if (v == 'transparent') {
                        return -1;
                    } else if (v == -2) {
                        return -2;
                    } else {
                        
                        if (v.substring(0,1) == '#') {
                            v = v.substring(1);
                        }
                        
                        
                        return parseInt(v.substring(4) + v.substring(2,4) + v.substring(0,2), 16); 
                    }
            },
            
            
            decodeColor: function(vbColor) {
                var color = parseInt(vbColor, 10);
                
                if (color == 0) {
                    return  DEFAULT_COLOR;
                } 

                
                var rgb = 0x1000000 + (color & 0xff) * 0x10000 + (color & 0xff00) + (color & 0xff0000) / 0x10000;
                
                
                return '#' + rgb.toString(16).substring(1).toUpperCase();
            }
            
        }
    ); 

 })();
(function(){

    
    mstrmojo.boxmodel =
        
        {
            
    		rangeIntersect:	function rangeInt( top1,  bot1,  top2,  bot2) {
    	            if (top1 < top2) {
    	            	return top2 <= bot1;
    	            } else if (top1 > top2) {
    	            	return top1 <= bot2;
    	            } else {
    	            	return true;
    	            }
    		},
    		
    		
    		px2Inches: function px2Inches(di, v) {
    			
    			v = parseInt(v, 10);
    			
    			
    			return parseFloat((v / di.zf / di.dpi).toFixed(4), 10);
    		},
    		
            
    		offset: function offst( el,  elLimit) {
    		    var org = el,
    		    	x = 0,
                    y = 0;
                while (el) {
                    x += el.offsetLeft;
                    y += el.offsetTop;
                    el = el.offsetParent;
                    if (el === elLimit) break;
                }
                
                
                
                
                
                for (e = org && org.parentNode; e && e != elLimit; e = e.parentNode){
                	if (e.scrollTop) y -= e.scrollTop;
                	if (e.scrollLeft) x -= e.scrollLeft;
                }
                return {left: x, top: y};
    		},
    		
    		
    		convert2px: function convert2px(dom, v) {
    			
    	        if (!/px$/.test(v)) {
    	            var img = document.createElement('img'), pl;
    	            img.style.zIndex = -1;
    	            img.style.left = v;
    	            
    	            dom.appendChild(img);
    	            
    	            
    	            pl = img.style.pixelLeft;
    	            dom.removeChild(img);
    	            
    	            return pl + 'px';
    	        } else {
    	        	return v;
    	        }
    		}
    	};
})();
(function(){
    
    mstrmojo.func = mstrmojo.provide(
            
        "mstrmojo.func",
       
        {
            
            composite: function c(fn) {
                
                if (!fn || !fn.length) {
                    
                    return function(){};
                }
        
                return function() {
                    for (var i = 0, len = fn.length; i < len; i++) {
                        fn[i].apply(this, arguments);
                    }
                };
           },
           
           
           wrapMethods: function wrapMethods(source, destination) {
               
               destination = destination || {};

               
               
               mstrmojo.hash.forEach(source, function(fn, fnName) {
                   destination[fnName] = (fnName in destination && typeof(fn) == 'function') ? mstrmojo.func.composite( [ fn, destination[fnName] ]) : fn;
               });
               
               return destination;
           }, 
           
           addMethods: function addMethods(source, destination) {
               
               destination = destination || {};

               
               
               mstrmojo.hash.forEach(source, function(fn, fnName) {
                   if ( ! (fnName in destination) && typeof(fn) == 'function') {
                       destination[fnName] = fn;
                   }
               });
               
               return destination;
           }           
           
        });
})();
(function(){

    mstrmojo.requiresCls("mstrmojo.dom");

	mstrmojo.fx = {enabled: true};
	
	var $DOM = mstrmojo.dom;	

	
	
	mstrmojo.fx._Effect = mstrmojo.declare(
		
		null,
		
		null,
		
		{
			scriptClass: "mstrmojo.fx._Effect",
			
			
			duration: 500,
			
			
			interval: 50,
			
			
			delay: null,
			
			
			target: null,
			
			
			getTarget: null,
			
			
			widget: null,
			
			
			slot: null,
			
			
			preStart: null,

			
			postStart: null,

			
			onCancel: null,

			
			onEnd: null,

			
			revertOnCancel: true,
			
			
			isPlaying: false,
			
			
			started: false,
			
			
			init: function init( props) {
				mstrmojo.hash.copy(props, this);
			},
									
			
			play: function ply() {
				this.isPlaying = true;
				this.started = false;
				if (this.delay) {
					var me = this;
					this.delayTimer = window.setTimeout(
						function() {
							me._start();
							me = null;
						},  
						this.delay
					);
				} else {
					this._start();
				}
			},
			
			pause: function pause() {
				if (this.delayTimer) {
					window.clearTimeout(this.delayTimer);
					delete this.delayTimer;
				}
				if (this.timer) {
					window.clearInterval(this.timer);
					delete this.timer;
				}
				this.isPlaying = false;
			},

			
			cancel: function cnl() {
				this.pause();
				if (this.started) {
					if (this.revertOnCancel) {
						this.counter = 0;
						this.exec();
					}
					if (this.onCancel) {
						this.onCancel();
					}
					this.started = false;
				}
			},
						
			
			_start: function start() {
				this.started = true;

				
				this._doTarget();

				
				
				this.steps = Math.max(
								Math.ceil(this.duration/this.interval), 
								1);
				
				
				var ea = this.ease;
				if (typeof(ea) == "string") {
					this.ease = mstrmojo.registry.ref(ea);
				}
				
				
				if(this._doPreStart() === false) {
				    this.started = false;
				    this.isPlaying = false;
				    return;
				}

				
				this.counter = 0;
				this.exec();
				this.counter++;

				
				this._doPostStart();
				
				
				if (this.counter >= this.steps) {
					
					this._end();
				} else {
					
					var me = this;
					if (this.timer) {
						window.clearInterval(this.timer);
					}
					this.timer = window.setInterval(
							function fxIntvl(){
							    if (me) {
							        me.exec();
							        me.counter++;
							        if (me.counter >= me.steps) {
							            me._end();
							            me = null;
							        }
							    }
							},
							this.interval);
				}
			},

						
			exec: null,
			
			
			_end: function end(){
				
				this.pause();
				this.started = false;
				if (this.onEnd) {
					this.onEnd();
				}
			},

            _doTarget: function tgt() {
                
                if (this.getTarget) {
                    
                    this.target = this.getTarget.apply(this, []);
                } else if (this.widget) {
                    
                    
                    this.target = this.widget[this.slot || "domNode"];
                } else if (this.target) {
                    
                    var t = this.target;
                    if (t && this.slot && t.scriptClass) {
                        var node = t[this.slot];
                        if (node) {
                            this.widget = t;
                            this.target = node;
                        }
                    }
                }
				
				
				
				
				if (!this.target) {
					var w = this;
					while (w = w.parent) {	
						if (!w || w.domNode){
						  break;
                        }
					}
					if (w) {
						this.widget = w;
						this.target = w[this.slot || "domNode"];
					}
				}
			},

			_doPreStart: function pre(){
				if (this.preStart) {
					 return this.preStart();
				}
			},
			_doPostStart: function post(){
				if (this.postStart) {
					this.postStart();
				}
			}			
		}
	);		

	
	function _callChildren(me, fName) {
		var arr = me.children;
		for (var i=0, len=(arr&&arr.length) || 0; i<len; i++) {
			arr[i][fName]();
		}
	}
	
	
	mstrmojo.fx.Parallel = mstrmojo.declare(
		
		mstrmojo.fx._Effect,
		
		null,
		
		{
			scriptClass: "mstrmojo.fx.Parallel",
			
			init: function init( props) {
				this._super(props);
				
				
				var ch = this.children;
				mstrmojo.registry.refArray(ch);
				
				for (var i=0, len=(ch&&ch.length)||0; i<len; i++) {
					ch[i].parent = this;
				}
			},
			
			
			_start: function start() {
				this.started = true;

				if (this.preStart) {
					this.preStart();
				}

				_callChildren(this, "play");
				
				if (this.postStart) {
					this.postStart();
				}
			},

			
			pause: function pause() {
				_callChildren(this, "pause");
			},

			
			cancel: function cnl() {
				_callChildren(this, "cancel");
			}
		}
	);
	
    
    mstrmojo.fx.AnimateProp = mstrmojo.declare(
		
		mstrmojo.fx._Effect,
		
		null,
		
		{
			scriptClass: "mstrmojo.fx.AnimateProp",
			
			
			props: null,

			
			_start: function st() {
				
				
				
				var ps = this.props;
				for (var n in ps) {
					var p = ps[n],
						ea = p.ease;
					if (typeof(ea) == "string") {
					    p.ease = mstrmojo.registry.ref(ea, {dontInst: true});
					}
				}
				
				this._super();

			},
									
			exec: function exec() {
				var ps = this.props;
				for (var n in ps) {
					var p = ps[n],
						v = (p.ease || mstrmojo.ease.sin)(this.counter, p.start, p.stop-p.start, this.steps-1);
					if(p.fn){
					    v = p.fn(v);
					}
					if (p.suffix){
					   v += p.suffix;
                    }
                    var o = p.isStyle === false ? this.target : this.target.style;
                    o[n] = v;
				}
			}
		}
	);
	
	mstrmojo.fx.Typewriter = mstrmojo.declare(
		
		mstrmojo.fx._Effect,
		
		null,
		
		{
			scriptClass: "mstrmojo.fx.Typewriter",
			
			charGroupSize: 1,
			
			
			srcProp: "text",
			
			
			_doPreStart: function () {
				
				this._super();
				
				
				this._dynStop = false;
				
				if (this.stop == null) {    
					var sp = this.srcProp,
                        st;
					if (sp) {
						var w = this.widget || this.parent;
						st = w && w[sp];
						if ((st != null) && (typeof(st) !== 'string')) {  
							st = String(st);
						}
					}
					this.stop = st;
					this._dynStop = true;
				}
				
				if (this.stop == null) {
					this.stop = "";
				}

				
				var t = this.target,
					ttn = null,
					cgs = 1;

				if (t) {
					t.innerHTML = '';
					ttn = document.createTextNode('');
					t.appendChild(ttn);
					cgs = Math.max(
							Math.floor(this.stop.length / this.steps),
							1);
				}
				this.targetTextNode = ttn;
				this.charGroupSize = cgs;
			},
			
			exec: function() {
				var ttn = this.targetTextNode;
				if (!ttn) {
				    return;
			    }
				
				var v;
				if (this.counter >= this.steps-1) {
					v = this.stop;
				} else if (this.counter === 0) {
					v = '';
				} else {
					v = this.stop.substring(0, this.charGroupSize * this.counter) + '_';
				}
				ttn.nodeValue = v;
			},
			
			_end: function end() {
				this._super();
				if (this._dynStop) {
					this.stop = null;
					delete this._dynStop;
				}
			},
			
			cancel: function cnl() {
				if (this._dynStop) {
					this.stop = null;
					delete this._dynStop;
				}
			}
		}
	);
	
	mstrmojo.requiresCls("mstrmojo.dom");
		
	
	mstrmojo.fx.Fade = mstrmojo.declare(
		
		mstrmojo.fx._Effect,
		
		null,
		
		{
			scriptClass: "mstrmojo.fx.Fade",
			
			
			start: null,
			stop: null,
			
			
			ease: null,

			
			suffix: null,

			exec: function exec(v) {
				if (v == null) {    
					v = (this.ease || mstrmojo.ease.sin)(this.counter, this.start, this.stop-this.start, this.steps-1);
				}
				if ($DOM.isIE && !$DOM.isWinPhone) {
					
					this.target.style.filter = 'alpha(opacity=' + parseInt(v*100,10) + ')';
					
				} else {
					this.target.style.opacity = v;
				}
			}
		}
	);
	
	
	mstrmojo.fx.FadeOut = mstrmojo.declare(
		
		mstrmojo.fx.Fade,
		
		null,
		
		{
			scriptClass: "mstrmojo.fx.FadeOut",
			
			start: 1,
			stop: 0,
			revertOnCancel: true,
			
			
			cssDisplay: 'block',
			
			
			_end: function end(){
				if (this.cssDisplay) {
					this.target.style.display = 'none';
					this.exec(this.start);
				}
				this._super();
			},
			
			
			cancel: function cnl() {
				if (this.started && this.cssDisplay) {
					this.target.style.display = this.cssDisplay;
				}
				this._super();
			}
		}
	);

	
	mstrmojo.fx.FadeIn = mstrmojo.declare(
		
		mstrmojo.fx.Fade,
		
		null,
		
		{
			scriptClass: "mstrmojo.fx.FadeIn",
			
			start: 0,
			stop: 1,
			revertOnCancel: true,
			
			
			cssDisplay: 'block',
			
			
			_doPostStart: function postS(){
				if (this.cssDisplay) {
					this.target.style.display = this.cssDisplay;
				}
				this._super();
			},
			
			
			cancel: function() {
				if (this.started && this.revertOnCancel && this.cssDisplay) {
					this.target.style.display = 'none';
				}
				this._super();
			}
		}
	);


	function fraction(num, dem, digits) {
		var x = Math.pow(10, digits || 2);
		if (dem) {
			return parseInt(x * num / dem, 10) / x;
		} else {
			return parseInt(x * num,10) / x;
		}
	}
	
	
	mstrmojo.ease = {
		linear: function ln(t, b, c, d) {
			if (t === d){
				return b+c;
			}else if (t === 0){
				return b;
			}else {
				return b + c * fraction(t, d);
            }
		},
		
		sin: function sin(t, b, c, d) {
			return b + c * Math.sin((Math.PI / 2) * t / d);
		},
		
		cos: function cos(t, b, c, d) {
			return b + c * Math.cos((Math.PI / 2) * (1 - t / d));
		},
		
		sincos: function sincos(t, b, c, d) {
			if (t > d / 2) {
				return b + c * Math.cos((Math.PI / 2) * (1 - t / d));
			} else {
				return b + c * Math.sin((Math.PI / 2) * t / d);
            }
		},
		
		cossin: function cossin(t, b, c, d) {
			if (t > d / 2) {
				return b + c * Math.sin((Math.PI / 2) * t / d);
			} else {
				return b + c * Math.cos((Math.PI / 2) * (1 - t / d));
            }
		},
		
		bounce: function bounce(t, b, c, d) {
			if ((t /= d) < (1 / 2.75)) {
			      return c * (7.5625 * t * t) + b;
			}
			else if (t < (2 / 2.75)) {
			      return c * (7.5625 * (t-=(1.5/2.75)) * t + 0.75) + b;
			}
			else if (t < (2.5 / 2.75)) {
			      return c * (7.5625 * (t-=(2.25/2.75)) * t + 0.9375) + b;
			}
			else {
			      return c * (7.5625 * (t-=(2.625/2.75)) * t + 0.984375) + b;
			}
		},
		
		shake: function shake(t, b, c, d) {
			if (t < d/2) {
				return b + c * fraction(Math.sin(2 * Math.PI * t/8), null, 2) * 2 * t/d;
			} else {
				return b + c * fraction(Math.sin(2 * Math.PI * t/8), null, 2) * 2 *(1-t/d);

			}
		}

	};
	
})();

(function(){
    
    
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    
    var $SFCC = String.fromCharCode;
    
    function _utf8_encode(string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
     
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += $SFCC(c);
            }else if((c > 127) && (c < 2048)) {
                utftext += $SFCC((c >> 6) | 192);
                utftext += $SFCC((c & 63) | 128);
            }else {
                utftext += $SFCC((c >> 12) | 224);
                utftext += $SFCC(((c >> 6) & 63) | 128);
                utftext += $SFCC((c & 63) | 128);
            }
         }
        return utftext;
    }
     
    function _utf8_decode(utftext) {
        var string = "",
            i = 0,
            c = 0, c1 = 0, c2 = 0;
        
        while ( i < utftext.length ) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += $SFCC(c);
                i++;
            }else if((c > 191) && (c < 224)) {
                c1 = utftext.charCodeAt(i+1);
                string += $SFCC(((c & 31) << 6) | (c1 & 63));
                i += 2;
            }else {
                c1 = utftext.charCodeAt(i+1);
                c2 = utftext.charCodeAt(i+2);
                string += $SFCC(((c & 15) << 12) | ((c1 & 63) << 6) | (c2 & 63));
                i += 3;
            }
        }
        return string;
    }
    
    mstrmojo.base64 = mstrmojo.provide(
        "mstrmojo.base64",
        
        {
            
            decodeHttpHeader: function(value){
                var rEncoded = /\=\?UTF-8\?B\?(.+?)\?\=/g;
                if (value && value.indexOf("=?UTF-8?B?") === 0){
                    var decMsg = "", result;
                    while ((result = rEncoded.exec(value)) !== null){
                        decMsg += mstrmojo.base64.decode(result[1]);
                    }
                    return decMsg;
                }
                return value;
            },
            
            
            encode: function (input) {
                var output = "";
                var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                var i = 0;
                
                input = _utf8_encode(input);
                while (i < input.length) {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);
    
                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;
    
                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }
             
                    output += _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
             
                }
                return output;
            },
            
            
            decode: function (input) {
                var output = "", i = 0;
                var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                while (i < input.length) {
                    enc1 = _keyStr.indexOf(input.charAt(i++));
                    enc2 = _keyStr.indexOf(input.charAt(i++));
                    enc3 = _keyStr.indexOf(input.charAt(i++));
                    enc4 = _keyStr.indexOf(input.charAt(i++));
    
                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;
                    
                    output += $SFCC(chr1);
                    
                    if (enc3 != 64) {
                        output += $SFCC(chr2);
                    }
                    if (enc4 != 64) {
                        output += $SFCC(chr3);
                    }
                }
                output = _utf8_decode(output);
                return output;
            }
        }
    ); 
})();
(function(){
    mstrmojo.requiresCls("mstrmojo.array");
    
    var ESC = '*';
    var D = '.';
    var B = '-';
    var K = '_';
    var L = '<';
    
    var regEx = new RegExp('[' + '\\' + ESC + '\\' + D + '\\' + B + '\\' + K + '\\' + L + ']', 'g');
    var repText = ESC + '$&';
    
    
    mstrmojo.Serializer = {
        scriptClass: 'mstrmojo.Serializer',
            
        
        serializeValueGroup: function(av) {
            mstrmojo.array.forEach(av, function (v, i) {
                av[i] = mstrmojo.Serializer.serializeValues(v);
            });
            return B + this.serializeValues(av) + K;
        },
    
        
        serializeValues: function (av) {
            var t = [];
            mstrmojo.array.forEach(av, function(v) {
                if (typeof(v) === 'Boolean') {
                    v = (v) ? '1' : '0';
                }
                
                t.push(String(v).replace(regEx, repText));
            });
            
            return t.join(D);
        }
        
    };    

})();
(function(){
    mstrmojo.requiresCls(
            "mstrmojo.base64",
            "mstrmojo.func",
            "mstrmojo.hash"
        );

    
    function decodeHeader(value){
        var rEncoded = /\=\?UTF-8\?B\?(.+?)\?\=/g;
        if (value && value.indexOf("=?UTF-8?B?") === 0){
            var decMsg = "", result;
            while ((result = rEncoded.exec(value)) !== null){
                decMsg += mstrmojo.base64.decode(result[1]);
            }
            return decMsg;
        }
        return value;
    }

    
    function encodeParams(params) {
        var x = -1;
        var url = [];
        if (params) {
            for (var p in params) {
                url[++x] = p + '=' + encodeURIComponent(params[p]);
            }
        }

        return url.join('&');
    }

    
    function appendUrlParams(method, baseUrl, params) {
        if (method !== 'GET' || !params) {
            return baseUrl;
        }

        return baseUrl + '?' + encodeParams(params);
    }

    
    function sendXhr(xhr, method, baseUrl, params ) {
        
        method = method.toUpperCase();
        var app = mstrApp;
        	m = null;

    	if (typeof(microstrategy)!='undefined' && microstrategy){
    		m = microstrategy;
    	}

        
        if (this.isTask) {
            params = mstrmojo.addCSRFTokenToTaskParams(params);
            params.taskContentType = params.taskContentType || 'json';
            params.taskEnv = params.taskEnv || 'xhr';
            params.xts = new Date().getTime();
            baseUrl = baseUrl || mstrConfig.taskURL;
        }
        
        if (params && !params.sessionState && app && app.sessionState){
            params.sessionState = app.sessionState;
        }
        
        var ptp = app.persistTaskParams || m&&m.persistParams;
        if ( ptp) {
            mstrmojo.requiresCls("mstrmojo.hash");
            mstrmojo.hash.copy(ptp, params);
        }

        xhr.open(method, appendUrlParams(method, baseUrl, params), this.async );

        if (method !== 'POST') {
        	params = null;
        } else {
            params = encodeParams(params);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        }

        xhr.send(params);

        if ( this.async === false ) {
            xhr.onreadystatechange();
        }
    }

    
    function createXhr() {
        var methods = [
            function() { return new XMLHttpRequest(); },
            function() { return new ActiveXObject('Msxml2.XMLHTTP'); },
            function() { return new ActiveXObject('Microsoft.XMLHTTP'); }
        ];

        for (var i = 0, cnt = methods.length; i < cnt; i++) {
            var xhr;
            try {
                xhr = methods[i]();
            }
            catch (e) {
                continue;
            }

            
            createXhr = methods[i];
            return xhr;
        }

        
        throw new Error('mstrmojo.SimpleXHR: Could not create an XHR object.');
    }

    
    function evalResponse(rt) {
        var _rtn = null;

        try {
            _rtn = eval('(' + rt + ')');
        } catch (ex) {
            _rtn = rt && mstrmojo.string.trim(rt);
        }

        return _rtn;
    }
    
    var MSI_SERVER_NAME_NOT_INITIALIZED = 0x800438F3,  
        MSI_INVALID_SESSION_ID = 0x800438F4,           
        E_MSI_USERMGR_USER_NOTFOUND = 0x800430A5,      
        E_MSI_CONNECT_FAILED = 0x80043705;

    
    function isSessionExpiredError(res){
        var c = res && res.getResponseHeader('X-MSTR-TaskErrorCode');
            c = (c < 0) ? (0x100000000 + parseInt(c, 10)) : c;    
            switch (c){
            case MSI_SERVER_NAME_NOT_INITIALIZED:
            case MSI_INVALID_SESSION_ID:
            case E_MSI_USERMGR_USER_NOTFOUND:
            case E_MSI_CONNECT_FAILED:
                    return true;
            }
            return false;
    }

    function xhrSupportsProgress(xhr) {
        return !! (xhr && ('upload' in xhr) && ('onprogress' in xhr.upload));
    }


    
    mstrmojo.SimpleXHR = mstrmojo.declare(
        
        null,

        
        null,

        
        {
            scriptClass: "mstrmojo.SimpleXHR",

            
            isTask: true,

            
            async: true,

            init: function init(props) {
                
                mstrmojo.hash.copy(props, this);
            },

            onreadystatechange: function onreadystatechange(xhr,callback) {
                
                if (xhr.readyState !== 4) {
                    return;
                }
                
                if (typeof callback !== "object" ) {
                    return;
                }

                try {
                    
                    if ((xhr.status === 200) || (xhr.status === 304)) {

                        
                        
                        this.response = callback.textResponse ? xhr.responseText : evalResponse(xhr.responseText);

                        
                        
                        if (typeof callback.success === "function") {
                            
                            callback.success(this.response);

                        }
                    } else {

                        if (xhr.status == 0) {
                            
                        } else {
                            
                            var app = mstrApp,
                            sessionExp = app && app.onSessionExpired;

                            if (sessionExp && isSessionExpiredError(xhr)) {
                                sessionExp();
                            } else {
                                var _orig = xhr.getResponseHeader;
                                xhr.getResponseHeader = function(name) {
                                    return decodeHeader(_orig.apply ? _orig.apply(xhr, [name]) : _orig(name));
                                };

                                
                                if (typeof callback.failure == "function") {
                                    callback.failure(xhr);
                                }
                            }
                        }
                    }
                } catch(ex) {
                    mstrmojo.err(ex);
                } finally {
                    
                    if (typeof callback.complete === "function") {
                        callback.complete();
                    }
                }

            },

            
            cancel: function(){
                var didCancel = false;
                    var xhr = this.xhr;
                    if (xhr) {
                        delete xhr.onreadystatechange;
                        
                        
                        xhr.isAborted = true;

                        if ( xhr.readyState < 4 ) {
                            xhr.abort();
                            didCancel = true;
                        }
                        this.xhr = null;
                    }
                return didCancel;
            },

            
            request: function request(method, baseUrl, callback, params, webSvrUrl, useResFeed, webSrvParams) {
                
                
                if (webSvrUrl) {
                    if(useResFeed === true){
                        if(!params) { params = {};}
                        params.srcURL = appendUrlParams('GET', webSvrUrl, webSrvParams);
                        this.request(method, baseUrl, callback, params);
                    } else {
                        mstrmojo.jsonp.request(webSvrUrl, params, callback);
                    }
                }else{
                    var xhr = createXhr();
                    xhr.onreadystatechange = function(me,x,c) {
                        return function() {
                            me.onreadystatechange.call(me,x,c);
                        };
                    }(this,xhr,callback);

                    
                    if (xhrSupportsProgress(xhr) && callback.progress ) {
                        xhr.onprogress = function(me,x,c) {
                            return function(evt){
                                c.progress.call(me,evt);
                            };
                        }(this,xhr,callback);
                    }
                    this.xhr = xhr;

                    sendXhr.call( this, xhr, method, baseUrl, params );
                }
            }
        }
    );

    
    mstrmojo.QueuedXHR = mstrmojo.declare(
        
        mstrmojo.SimpleXHR,

        
        null,

        
        {
            scriptClass: "mstrmojo.QueuedXHR",

            
            queue: null,

            
            requestInProgress: false,

            
            retryDelay: 1,

            
            lookup: null,

            
            cancel: function(){
                        
                        var didCancel = this._super();

                        
                    while( this.queue.length) {
                        var x = this.queue.pop();
                        var cb = x.callback;
                    if (cb && cb.complete) {
                        cb.complete();
                    }
                    }
                        this.queue = [];

                        
                this.requestInProgress--;

                return didCancel;
            },

            
            init: function init(){
                this.queue = [];
                this.lookup = [];
            },

            
            request: function request(method, baseUrl, callback, params, override, webSvrUrl, useResFeed, webSrvParams, useCache) {
                
                
                if (webSvrUrl){
                    if(useResFeed === true){
                        if(!params) { params = {};}
                        params.srcURL = appendUrlParams('GET', webSvrUrl, webSrvParams);
                        this.request(method, baseUrl, callback, params);
                    } else {
                        mstrmojo.jsonp.request(webSvrUrl, params, callback);
                    }
                }else{
                    
                    if (this.requestInProgress && !override) {
                        this.queue.push({
                            method: method,
                            baseUrl: baseUrl,
                            callback: callback,
                            params: params
                        });
                    } else {
                        

                        
                        if (this.requestInProgress) {
                            this.cancel();
                        }

                        this.requestInProgress++;


                        var lu = null,
                            oriParams = null;
                        if (useCache) {
                            lu = this._searchForCacheRequest(params);
                            oriParams = mstrmojo.hash.copy(params); 
                        }

                        if (lu) {
                            
                            try {
                                if (callback.success) {
                                    window.setTimeout(
                                        function(){
                                            callback.success(lu.res);
                                        },
                                        10
                                    );
                                    
                                }
                            } catch (ex) {
                                mstrmojo.err(ex);
                            } finally {
                                if (callback.complete) {
                                    callback.complete();
                                }
                                this.advanceQueue();
                            }
                        } else {
                        var xhr = this.xhr = createXhr();

                        
                        callback = mstrmojo.func.wrapMethods(callback, {
                            complete: function(ths){
                                        return function() {
                                                ths.advanceQueue.call(ths);
                                        };
                                }(this),
success: function(ths){
                                        return function() {


                                            
                                            if (useCache) {
                                                ths.lookup.push({
                                                    params: oriParams,
                                                    res: ths.response
                                                });
                                            }
                                        };
                                }(this)
                        });

                        xhr.onreadystatechange = function(me,x,c) { return function() { me.onreadystatechange.call(me,x,c); }; }(this,xhr,callback);

                        
                        if (xhrSupportsProgress(xhr) && callback.progress ) {
                            xhr.onprogress = function(me,x,c) { return function(evt){ c.progress.call(me,evt); }; }(this,xhr,callback);
                        }

                        sendXhr.call( this, xhr, method, baseUrl, params );
                    }
                }
                }
            },

            
            advanceQueue: function advanceQueue() {
                    
                this.requestInProgress--;
                if (this.queue.length === 0) {
                    return;
                }
                var req = this.queue.shift();
                this.request(req.method, req.baseUrl, req.callback, req.params, true);
            },

            
            _searchForCacheRequest: function _searchForCacheRequest(params) {
                for (var i in this.lookup) {
                    if (mstrmojo.hash.equals(params, this.lookup[i]['params'])) {
                        return this.lookup[i];
                    }
                }
                return null;
            }

        }
    );

    mstrmojo.xhr = new mstrmojo.QueuedXHR();

    
    mstrmojo.jsonp = {
            jsc: new Date().getTime(),

            
            timeToWait: 20000,

            
            request: function(url, params, callback){
                var head = document.getElementsByTagName("head")[0] || document.documentElement,
                    jsonp = 'jsonp' + (this.jsc++),
                    script = document.createElement("script");

                params.jsonp = jsonp+"(@R@);"; 
                params.taskContentType = 'jsonp';
                params.taskEnv = 'jsonp';
                params.xts = new Date().getTime();

                
                window[jsonp] = function(response){
                	if (!response){ 
                		if (callback.timeout){
                			callback.timeout();
                		}
                	}else if (response.status === 200){ 
                		callback.success(response.content);
                	}else{ 
                		
                        
                        
                		var res = {
                            	status: response.status,
                            	getResponseHeader: function(name){
            	                	switch (name){
            	                    case 'X-MSTR-TaskFailureMsg': return response.errorMsg;
            	                    case 'X-MSTR-TaskErrorCode': return response.errorCode;
            	                    }
                            	}
                            };
                        if (mstrApp.onSessionExpired && isSessionExpiredError(res)) {
                            mstrApp.onSessionExpired();
                        }else{
                        	callback.failure(res);
                        }
                	}

                   	
                	if (window[jsonp]){
                		if (callback.complete){
                			callback.complete();
                		}
                		
                		window[jsonp] = undefined;
                		try {
                			delete window[jsonp];
                		} catch(e) {}

                		
                		head.removeChild(script);
                	}
                };

                head.insertBefore(script, head.firstChild);
                script.src = appendUrlParams("GET", url, params); 

                
                
                setTimeout(function(){
                	window[jsonp] && window[jsonp]();
                }, this.timeToWait);
            }
        };
})();
mstrmojo.DynamicClassFactory = {
	newComponent: function (comp, mixins, props) {
        var name = comp.prototype.scriptClass.replace(/^mstrmojo./, ''); 
        for (var i = 0, cnt = mixins && mixins.length || 0; i < cnt; i++) {
        	if (!mixins[i]._mixinName){
        		alert("Need mixin have '_mixinName' to be used in DynamicClassFactory");
        		return null;
        	}
        	name += '_' + mixins[i]._mixinName.replace(/^mstrmojo./, ''); 
        }

        var f = mstrmojo[name];
        if (!f) {
             f = mstrmojo.declare(comp, mixins, props);
             mstrmojo[name] = f;
        }
        return f;
    }
};

(function(){

	mstrmojo.requiresCls("mstrmojo.hash");

	mstrmojo.Event = mstrmojo.declare(
		
		null,
		
		
		null,
		
		
		{
			scriptClass: "mstrmojo.Event",
			
			
			init: function init_Event( props) {
				
				if (props && !props.name) props.name = props.type;
				
				
				
				
				mstrmojo.hash.copy(props, this);
			}
		}
	);
	
})();

 
(function(){
    
    mstrmojo.requiresCls( "mstrmojo.hash" );

    
    var _H = mstrmojo.hash;
    
    
    
    
    var elapsedTm = function(ts) {
        return ( mstrmojo.now() - ts.getTime());
    };
    
     
    mstrmojo.storage.DOMStorage = mstrmojo.declare( null, null,     
    
    {
        scriptClass: "mstrmojo.storage.DOMStorage",
        
        
        mIsSupported: false,
        
        
        mStorageObj: null,
        
                
        itemTimeToLive: 3600,

        
        init : function init(props) {
            
            _H.copy(props, this);
            return this;
        },

        
        isSupported: function isSupported() { return this.mIsSupported; },


        checkVersion: function checkVersion(curVer) {
            
            var  existingVer = this.getItem('__version__');
            
            
            if ( existingVer && existingVer < curVer ) {
                mstrmojo.dbg( "DOMStorage data is old - clearing, v="+existingVer );
                this.clear();
            }
            
            this.setItem('__version__',curVer,-1);
            
            return this;
        },



        
        length: function() { return ( this.mIsSupported ? this.mStorageObj.length : 0 ); },

    
    
       
         
        _keyExpired: function _keyExpired(d) {
            return (d && (d.ts>0) && (mstrmojo.now() > d.ts));
        },
        
        
        key: function(index) { return ( this.mIsSupported ? this.mStorageObj.key(index) : null ); },
        
             
        getItemAsString: function( key ) {
            var result = this.getItem(key);
            if (result){
                if ( typeof result == "object" ) {
                    
                    result = JSON.stringify(result);    
                } else {
                    
                    result = result + "";
                }
            }
            return result;
        },
        
              

        getItem: function(key) { 
            var result = null;
            if (this.mIsSupported){            
                var d = this.mStorageObj.getItem(key);
                if ( d ) {
                    try { d = JSON.parse(d); } catch(e) {  }
                    if ( this._keyExpired( d ) ) {
                        this.removeItem(key);
                    } else {
                        
                        result = d.data;
                    }
                }
            }
            return result;
        },



             
         
        setItem: function(key,any_data,ttl) {
            ttl = ttl || this.itemTimeToLive;            
            try {
                
                if ( this.mIsSupported ) {
                    this.mStorageObj.removeItem(key);
                    
                    
                    var exp = (ttl > 0) ? (mstrmojo.now() + (ttl*1000)) : -1;
                    var item = { ts: exp, data: any_data };
                    this.mStorageObj.setItem(key,JSON.stringify(item) );
                }
            } catch ( e ) {
                
                
                if ( e !== QUOTA_EXCEEDED_ERR ) { throw e; }
            } finally {
            }
            return this;
        },


             
         
        removeItem: function(key) {
            if ( this.mIsSupported ) { this.mStorageObj.removeItem(key); }
            return this;
        },


             
         
        clear: function() {
            if ( this.mIsSupported ) { this.mStorageObj.clear(); }
            return this;
        }

    } );
    
})();


(function(){

    mstrmojo.requiresCls( "mstrmojo.storage.DOMStorage" );

    var LOCAL_STORAGE_DATA_FORMAT_VERSION = 4;

    
    mstrmojo.storage.DOMLocalStorage = mstrmojo.declare(mstrmojo.storage.DOMStorage, null, 
             
        {
            scriptClass : "mstrmojo.storage.DOMLocalStorage",
        
                
            
             
            init : function(props) {
                this._super(props);
                
                
                
                try {
                    this.mIsSupported = ('localStorage' in window) && (window['localStorage'] !== null);        
                    this.mStorageObj = this.mIsSupported ? window.localStorage : null;

                    this.checkVersion(LOCAL_STORAGE_DATA_FORMAT_VERSION);                

                } catch (e) {
                    
                    this.mIsSupported = false;
                }
            }
        });

    
    $LS = mstrmojo.global.localStore = new mstrmojo.storage.DOMLocalStorage({ itemTimeToLive: (3600 * 24) });

})();


(function(){

    mstrmojo.requiresCls( "mstrmojo.storage.DOMStorage" );

    var     SESSION_STORAGE_DATA_FORMAT_VERSION = 4;

    
    
    mstrmojo.storage.DOMSessionStorage = mstrmojo.declare(mstrmojo.storage.DOMStorage, null, 
                     
        {
        scriptClass : "mstrmojo.storage.DOMSessionStorage",
        
        
        
        init : function(props) {
            this._super(props);

            
            
            try {
                this.mIsSupported = ('sessionStorage' in window) && (window['sessionStorage'] !== null);        
                this.mStorageObj = this.mIsSupported ? window.sessionStorage : null;

                this.checkVersion(SESSION_STORAGE_DATA_FORMAT_VERSION);
                
            } catch (e) {
                
                this.mIsSupported = false;
            }
        }
    });

    $SS = mstrmojo.global.sessionStore = new mstrmojo.storage.DOMSessionStorage();

})();
(function () {

    mstrmojo.requiresCls("mstrmojo.publisher");

    var $P = mstrmojo.publisher;

    
    mstrmojo._Provider = mstrmojo.provide(

        "mstrmojo._Provider",

        
        {
            
            _meta_usesSuper: false,

            
            audibles: {"*": true},

            
            set: function set(n, v) {
                
                var bChanged = false,
                    f = this["_set_" + n],
                    vWas = this[n];    

                if (f) {
                    
                    bChanged = f.apply(this, arguments);
                } else {
                    
                    this[n] = v;
                    bChanged = (vWas !== v);
                }

                
                if (bChanged) {
                    
                    
                    var evtName = n + "Change",
                        aud = this.audibles || {},
                        isAudible =  (aud[n] === true) || ((aud[n] !== false) && (aud["*"] !== false));

                    if (isAudible && (this['pre' + evtName] || this['on' + evtName] || this['post' + evtName] || $P.hasSubs(this.id, evtName))) {
                        
                        
                        this.raiseEvent({
                            name: evtName,
                            prop: n,
                            value: v,
                            valueWas: vWas
                        });
                    }
                }
                return this;
            },

            
            raiseEvent: function rse(evt) {
                var n = evt && evt.name;
                if (!n) {
                    return null;
                }
                
                evt.src = this;

                
                if (this.preHandleEvent) {
                    this.preHandleEvent(evt);
                }

                
                var ns = ['pre', 'on', 'post'],
                    abort = false,
                    i,
                    len;

                for (i = 0, len = ns.length; i < len; i++) {
                    var fn = ns[i] + n;
                    if (this[fn]) {
                        if (this[fn](evt) === false) {
                            abort = true;
                            break;
                        }
                    }
                }

                
                if (!abort) {
                    
                    if (this.postHandleEvent) {
                        this.postHandleEvent(evt);
                    }
                    
                    $P.publish(this.id, n, evt);
                }

                return evt;
            },

            
            

            
            

            
            attachEventListener: function att(name, listener, callback) {
                return $P.subscribe(this.id, name, callback, listener);
            },

            
            detachEventListener: function det(sub) {
                $P.unsubscribe(sub);
            },

            
            destroy: function destroy() {
                
                $P.clearSubscriptions(this.id);
                
                if (this._super) {
                    this._super();
                }
            }
        }
    );
}());
(function () {

    mstrmojo.requiresCls("mstrmojo.hash",
                         "mstrmojo.registry",
                         "mstrmojo._Provider",
                         "mstrmojo.array");

    var $H = mstrmojo.hash,
        $R = mstrmojo.registry,
        $ARR = mstrmojo.array;

    
    mstrmojo.Obj = mstrmojo.declare(
        
        null,

        
        [ mstrmojo._Provider ],

        
        {
            
            scriptClass: "mstrmojo.Obj",

            
            

            
            

            
            init: function init(props) {
                
                this.disposables = [];
                
                
                $H.copy(props, this);    

                
                if (this.postApplyProperties) {
                    this.postApplyProperties();
                }

                
                $R.add(this);

                
                if (this.postCreate) {
                    this.postCreate();
                }
            },

            
            destroy: function destroy(ignoreDOM) {
                this._super(ignoreDOM);
                
                
                $ARR.forEach(this.disposables, function (d) {
                    
                    if (d.destroy) {
                        
                        d.destroy(ignoreDOM);

                    
                    } else if (d.clear) {
                        
                        d.clear();
                    }
                });
                
                
                this.disposables = [];

                
                $R.remove(this);
            }
        }
    );

    
    
    
    
    
    
    var obj = mstrmojo.Obj;
    obj.free = function free(o) {
        if (o instanceof obj) {
            o.destroy();
        }
    };
}());
(function(){

    mstrmojo.requiresCls(
        "mstrmojo.hash",
        "mstrmojo.array",
        "mstrmojo.registry",
        "mstrmojo.publisher",
        "mstrmojo._Provider");
        
    var _H = mstrmojo.hash,
        _A = mstrmojo.array,
        _R = mstrmojo.registry,
        _P = mstrmojo.publisher;

    
    
    mstrmojo.Arr = mstrmojo.declare(
        
        null,

        
        [mstrmojo._Provider],
                
        
        {
            
            scriptClass: "mstrmojo.Arr",

            
            postApplyProperties: null,
            
            
            postCreate: null,
            
            
            length_bindEvents : ['add', 'remove'],
            
            
            init: function init(props) {
                
                var arr;
                if (props && props.data) {
                    arr = props.data;
                    delete props.data;
                } else if (props) {
                    arr = props;
                    props = null;
                }
                if (!arr || arr.constructor !== Array) {
                    arr = [];
                }

                
                _H.copy(mstrmojo.Arr.prototype, arr);
                
                
                if (props) {
                    _H.copy(props, arr);
                }
                
                
                if (arr.postApplyProperties) {
                    arr.postApplyProperties();
                }
        
                
                _R.add(arr);
                                
                
                if (arr.postCreate) {
                    arr.postCreate();        
                }
                
                return arr;
            },
            
            
            destroy: function dst(){
                
                _P.clearSubscriptions(this.id);

                
                _R.remove(this);
            },
            
            
            add: function add(items, idx, silent){
                var c = items && items.length;
                if (c) {
                    if (idx == null) {  
                        idx = this.length;
                    }
                    _A.insert(this, idx, items);

                    
                    if (!silent && 
                        (this.onadd || _P.hasSubs(this.id, "add")) ) {
                            this.raiseEvent({
                                name: "add", 
                                value: items, 
                                index: idx
                            });
                    }
                }
            },

            
            remove: function rmv(idx, count, silent){
                if (count == null) {    
                    count = 1;
                }
                if ((idx != null) && count) {   
                    var rem = this.splice(idx, count);
                    
                    
                    if (!silent && 
                        (this.onremove || _P.hasSubs(this.id, "remove")) ) {
                            this.raiseEvent({
                                name: "remove", 
                                value: rem, 
                                index: idx
                            });
                    }
                }
            }
        
        });

    
    mstrmojo.Arr.makeObservable = function mk(arr, props) {
        if (!arr) {
            return;
        }
        if (!props) {
            props = {};
        }
        props.data = arr;
        return this.prototype.init(props);        
    };
    
})();


mstrmojo.LoadedExternalJSURLs = {};

function LoadScriptsExternalJSCallback()
{
	
    
    mstrmojo.LoadedExternalJSURLs[mstrmojo._LoadsScript.esScripts.splice(0, 1)[0].url] = true;
	
	mstrmojo._LoadsScript.requiresExternalScripts(mstrmojo._LoadsScript.esScripts,
                                                  mstrmojo._LoadsScript.callback,
												  mstrmojo._LoadsScript.esScritsContext
												  );
    
	mstrmojo._LoadsScript.ExternalJSCallbackIsBusy = false;
}

mstrmojo._LoadsScript = mstrmojo.provide(
"mstrmojo._LoadsScript",

{
    
    _meta_usesSuper: false,

	
	requiresMethod: function rqMth( n) {
		if (!n) {
            return;
        }
		
		
		if (typeof(this[n]) === "function") {
            return true;
        } else {
			
			var fqcn = this[n] || (this.methods && (this.methods[n] || this.methods["*"]));
			if (typeof(fqcn) === "string") {
				this.requiresCls(fqcn);	
				return typeof(this[n]) === "function";
			}
			return false;					
		}
	},

			
			requiresCls: function req( mixins,  callback) {
				
				if (mixins) {
					if (typeof(mixins) == "string") {
						mixins = [mixins];
					}
					
					mstrmojo.requiresCls.apply(mstrmojo, mixins);
					
					
					var p = this.constructor.prototype,
						pm = p.mixins;
					if (!pm) {
						p.mixins = {};
						pm = p.mixins;
					}
					var mx = mstrmojo.mixin;
					for (var i=0, len=mixins.length; i<len; i++) {
						var fqcn = mixins[i];
						if (!pm[fqcn]) {
							var m = eval(mixins[i]);
							mx(m, p);
							pm[fqcn] = true;
							
							if (m.__onmixin__) {
								m.__onmixin__.apply(this, []);
							}
						}
					}
					if (callback) {
						callback.apply(this, []);						
					}
				}
			},
			
			
			requiresContrib: function reqCb( propName,  bForceStartup) {
				var fqcn = this[propName];
				if (fqcn) {
					var c,
						firstTime = false;
					if (typeof(fqcn) == 'string') {
						c = mstrmojo.registry.ref(fqcn);
						this[propName] = c;
						firstTime = true;
					} else {
						c = fqcn;	
					}
					
					
					if (c && (firstTime || bForceStartup)) {
						c.parent = this;
						if (c.startup) {
							c.startup();
						}
					}
					return c;
				}
				return null;
			},
					
			
             requiresExternalScripts : function requiresES(esScripts, callback, context)
			 {
			 	
			 	if(esScripts && esScripts instanceof Array)
				{
					   if (esScripts.length == 0) { 
						   
						   callback && callback.call(context);
						   
						   return;
					   } 		
				        
							   
					   
					   if(esScripts[0].forceReload && esScripts[0].forceReload == false && mstrmojo.LoadedExternalJSURLs [esScripts[0].url])
					   {
					   	
					   	 esScripts.splice(0, 1); 
					   							 
					   	 return this.requiresExternalScripts(esScripts, callback, context);
					   }
				
					  	var script = document.createElement("script"), isIE = !!document.all;
					  						  	
					  	script.type = "text/javascript";
					  	script.src = esScripts[0].url;
						
						if (!esScripts[0].callbackParamName) {
							if (isIE) {
								
								script.onreadystatechange = function(){
									
									
									if (script.readyState == "loaded" || script.readyState == "complete") {
										script.onreadystatechange = null; 
										
										if (esScripts.length > 1) {
											
											
											mstrmojo.LoadedExternalJSURLs [esScripts.splice(0, 1)[0].url] = true;
											mstrmojo._LoadsScript.requiresExternalScripts(esScripts, callback);
										}
										else 
											if (esScripts.length == 1) {
												
											mstrmojo.LoadedExternalJSURLs [esScripts[0].url] = true;
												
												if (callback) {										
													callback.call(context);
												}
											}
									}
								}
							}
							else { 
								script.onload = function(){
								
									script.onload = null; 
									
									if (esScripts.length > 1) {
										
										 
										mstrmojo.LoadedExternalJSURLs [esScripts.splice(0, 1)[0].url] = true;									
										mstrmojo._LoadsScript.requiresExternalScripts(esScripts, callback);
									}
									else 
										if (esScripts.length == 1) {
												mstrmojo.LoadedExternalJSURLs [esScripts[0].url] = true;
												
												if (callback) {										
													callback.call(context);
												}
											
										}
								}
							}
						} 
						else{
							if(esScripts[0].callbackParamName.length != 0){ 
								
								if(mstrmojo._LoadsScript.ExternalJSCallbackIsBusy &&
								   mstrmojo._LoadsScript.ExternalJSCallbackIsBusy == true)
								{								
									   var that = this;
                                       window.setTimeout(function()
									                     {           
                                                            that.requiresExternalScripts(esScripts, callback, context);
                                                         }
                                                         ,500);
						               return;
								}
								
                                mstrmojo._LoadsScript.ExternalJSCallbackIsBusy = true;
								
								
                                script.src += "&" + esScripts[0].callbackParamName + "=LoadScriptsExternalJSCallback" ;
						        
						
								mstrmojo._LoadsScript.esScripts = esScripts;
								mstrmojo._LoadsScript.callback = callback;
								mstrmojo._LoadsScript.esScritsContext = context;
															 
                            }
						}
						
						document.getElementsByTagName("head")[0].appendChild(script);
				}
			 }

});
(function(){
	mstrmojo.requiresCls("mstrmojo.hash");
	
    var reCHAIN_THIS = /this\.([\w\.\[\]\'\"\-]+)/m,
        reCHAIN_THIS_TEST = /this\./m,
        reCHAIN_ALL_BRACKET = /mstrmojo\.all\[[\'\"]([\w]+)[\'\"]\]\.([\w\.\[\]\'\"\-]+)/m,
        reCHAIN_ALL_BRACKET_TEST = /mstrmojo\.all\[/m,
        reCHAIN_ALL_DOT = /mstrmojo\.all\.([\w]+)\.([\w\.\[\]\'\"\-]+)/m,
        reCHAIN_ALL_DOT_TEST = /mstrmojo\.all\./m,
        reCvtIdxs = /\[(\d+)\]/g,
        reCvtSingleQts = /\[\'([\w\-]+)\'\]/g,
        reCvtDblQts = /\[\"([\w\-]+)\"\]/g,
        reTruncBrkts = /([\[\]].*)/;

    mstrmojo.Binding = mstrmojo.declare(
        
        null,
        
        null,
        
        {
			scriptClass: "mstrmojo.Binding",
			
            
            parent: null,
            
            
            source: null,
            
            
            destination: null,

            
            enabled: false,
            
            
            setter: "set",
            
            
            executing: 0,
                        
            init: function init( props) {
                
                mstrmojo.hash.copy(props, this);
                
                
                mstrmojo.registry.add(this);
            },

            destroy: function dest(){
                
                mstrmojo.publisher.clearSubscriptions(this.id);
                
                mstrmojo.registry.remove(this);
            },
                        
            
            exec: function exec(){
                this.executing++;
                
                var fn = this._sourceFn;
                if (!fn) {
                    var s = this.source;
                    if (s != null) {
                        if (typeof(s) == "string") {
                            
                            
                            
                            if (!(s.match("return ")) && !(s.match(/\;\s*\S/))) {
                                s = "return " + s;
                            }
                            fn = new Function(s);
                        } else if (typeof(s) == "function") {
                            fn = s;
                        }
                        this._sourceFn = fn;
                    }
                }
                
                
                var v, p = this.parent;
                if (fn) {
                    try {
                        v = fn.apply(p, []);
                    } catch(ex) {
                        
                    }
                }        
                
                
                var st = this.setter,
                    d = this.destination;
                if (st == null) {
                    p[d] = v;
                } else if (typeof(st) == "string") {
                    p[st](d, v);
                } else if (typeof(st) == "function") {
                    st.apply(p, [d,v]);
                }
                this.executing--;
            },
                        
            
            enable: function en() {
                if (!this.enabled) {        
                    
                    this.exec();        
                    
                    var chs = this._chains;
                    if (!chs) {
                        this._parseChains();
                        chs = this._chains;
                    }
                    
                    for (var k in chs) {
                        this._attachChain(chs[k]);
                    }
                    this.enabled = true;
                }
            },
            
            
            disable: function dis() {
                if (this.enabled) {
                    
                    var chs = this._chains;
                    if (chs) {
                        for (var k in chs) {
                            this._detachChain(chs[k]);
                        }                
                    }        
                    this.enabled = false;        
                }
            },

            
            _chains: null,

            
            _parseChains: function() {
                
                this._chains = {};
                var chains = this._chains;

                
                var s = this.source;
                if (s && (typeof(s) == "function")) {
                    s = s.toString && s.toString();
                }
                if (!s) {
                    return;
                }
                
                
                function _findMatches( str,  re,  hostIdx,  partsIdx) {
                    var sTemp = str,
                        match;
                
                    while (match = sTemp.match(re)) {    
                        
                        var key = match[0],
                            len = key.length,
                            add = true;
                        
                        
                        
                        key = key.replace(reCvtIdxs, ".$1"
                                    ).replace(reCvtSingleQts, ".$1"
                                    ).replace(reCvtDblQts, ".$1"
                                    ).replace(reTruncBrkts, '');
                        
                        
                        for (var k in chains) {
                            if (k.substr(0, len) === key) {
                                
                                add = false;
                                break;
                            } else if (key.indexOf(k) === 0) {
                                
                                delete chains[k];
                            }
                        }
                        if (add) {
                            chains[key] = {
                                host: (hostIdx == null) ? null : match[hostIdx],
                                parts: match[partsIdx].replace(reCvtIdxs, ".$1"
                                        ).replace(reCvtSingleQts, ".$1"
                                        ).replace(reCvtDblQts, ".$1"
                                        ).replace(reTruncBrkts, '').split('.')
                            };
                        }
                        sTemp = sTemp.substr(match.index + len);
                    }
                }                
                
                
                if (reCHAIN_THIS_TEST.test(s)) {
                    _findMatches(s, reCHAIN_THIS, null, 1);
                }
                
                
                if (reCHAIN_ALL_BRACKET_TEST.test(s)) {
                    _findMatches(s, reCHAIN_ALL_BRACKET, 1, 2);
                }
                
                if (reCHAIN_ALL_DOT_TEST.test(s)) {
                    _findMatches(s, reCHAIN_ALL_DOT, 1, 2);
                }
            },

            
             _attachChain: function attCh( ch,  start) {
    
                
                 if (!ch.evt2idx) {
                     ch.evt2idx = {};
                 }
                 if (!ch.idx2evt) {
                     ch.idx2evt = [];
                 }
                 var evt2idx = ch.evt2idx,
                     idx2evt = ch.idx2evt,
                     parts = ch.parts;
    
                 
                 var idx = (start >= 0) ? start : 0,
                     bId = this.id,
                     reg = mstrmojo.all,
                     ctxt = (start > 0) ?
                                 reg[idx2evt[idx-1].context][parts[idx-1]] :
                                 (ch.host ? reg[ch.host] : this.parent), 
                     prop = parts[idx];
                     
                
                var A = mstrmojo.array;                 
                 while (ctxt && prop) {
                     if (ctxt.attachEventListener) {
                         
                         var evts = ctxt[prop+"_bindEvents"] || (prop+"Change");
                         if (typeof(evts) == "string") {
                             evts = [evts];
                         }
                         var subs = [];
                         for (var i = 0, iLen = evts.length; i< iLen; i++) {                           
                             subs[i] = ctxt.attachEventListener(evts[i], bId, "_callback");
                         }
                         
                         
                         for (var i=0; i<evts.length; i++) {
                             evt2idx[ ctxt.id+"_"+evts[i] ] = idx;
                         }
                         
                         
                         idx2evt[idx] = {context: ctxt.id, evts: evts, subs: subs};
                     }
                     
                     ctxt = ctxt[prop];
                     prop = ch.parts[++idx];
                 }
             },
             
            
            _detachChain: function detCh( ch,  start) {

                 var reg = mstrmojo.all,
                     idx2evt = ch.idx2evt,
                     evt2idx = ch.evt2idx,
                     bId = this.id;
    
                 var i = (start > -1) ? start : 0,
                     len = idx2evt.length;
                 if (i < len) {
                     for (; i<len; i++) {
                          
                         var atts = idx2evt[i];
                         if (!atts) {
                             break;
                         }
                         var ctxtid = atts.context,
                             ctxt = reg[ctxtid],
                             evts = atts.evts;
                             
                         
                         if (ctxt && ctxt.detachEventListener) {
                             var s = atts.subs;                                
                             for(var t = 0, tLen = s.length; t < tLen; t++) {                                
                                 ctxt.detachEventListener(s[t]);
                             }
                         }
                         
                         idx2evt[i] = null;
                         
                         for (var j=0, jLen=evts.length; j<jLen; j++) {
                             delete evt2idx[ctxtid+"_"+evts[j]];
                         }
                     }
                 }
            },
            
            
            _callback: function clbk( evt) {
                
                
                this.exec();
                
                
                    
                if (!evt || !evt.name || !evt.src) {
                    return;
                }
                
                
                var k = evt.src.id+"_"+evt.name,
                    chains = this._chains;
                
                for (var c in chains) {
                    
                    var ch = chains[c],
                        idx = ch.evt2idx[k];
                    if (idx != null) {
                        
                        this._detachChain(ch, idx+1);
                        this._attachChain(ch, idx+1);
                    }
                }

            }
                                    
        }
    );

})();
(function(){

    mstrmojo.requiresCls("mstrmojo.registry", "mstrmojo.hash");
    
    var _loadedCls = false,
        _FQCN = "mstrmojo.Binding",
        _B = "bindings",
        _R = mstrmojo.registry;
    
    
    function _shutdown(bs) {
        for (var d in bs) {
            var b = bs[d];
            if (b && b.disable) {
                b.destroy();
            }
        }
    }
    
    
    function _startup(bs, p) {
        
        if (!_loadedCls) {
            mstrmojo.requiresCls(_FQCN);
            _loadedCls = true;
        }
        
        for (var d in bs) {
            var b = bs[d];
            if (b == null) {    
                continue;
            }
            var t = typeof(b);
            
            
            if (t === "string" || t === "function") {
                b = {
                        destination: d,
                        source: b,
                        scriptClass: _FQCN
                    };
            }
            
            b.parent = p;
            
            
            b = _R.ref(b, {skipLoadChecks: true});
            bs[d] = b;
            b.enable();
        }
    }
    
    
    mstrmojo._HasBindings = mstrmojo.provide(
    "mstrmojo._HasBindings",
    
    {
        _meta_usesSuper: false,

        
        
        
        
        

        
        initBindings: function inB() {
            this.hasInitBindings = true;

            var bs = mstrmojo.hash.copy(this[_B]);
                
            if (bs) { 
                delete this[_B];
                this._set_bindings(_B, bs, true);
                
                if (this.postCreateBindings) {
                    this.postCreateBindings();        
                }
            }
            
            var ch = this.children;
            if (ch) {
                for (var i=0, len=ch.length; i<len; i++) {
                    var c = ch[i];
                    if (c && c.initBindings) {
                        c.initBindings();
                    }        
                }
            }
        },
        
        destroyBindings: function destB(){
            var bs = this.bindings;
            if (bs) {
                _shutdown(bs);
                delete this.bindings;
            }
        },
        
        
        _set_bindings: function setB(n, v) {
            var bs = this[_B];
            if (v !== bs){
                if (bs) {
                    _shutdown(bs);
                }
                this[_B] = v;
                if (v) {
                    _startup(v, this);
                }
                return true;
            }
            return false;
        }
    });

})();
(function () {

    mstrmojo.requiresCls("mstrmojo.string",
                         "mstrmojo.dom");

    var _S = mstrmojo.string,
        _D = mstrmojo.dom;

    
    var _elCreate = mstrmojo.useFrames ? null : document.createElement('span');

    var _REG_EXP_EVTS = /\mstrAttach\:([\w\,]+)/g;

    
    var isTouchEnabled;

    
    function _replEvts(s) {
        
        if (isTouchEnabled === undefined) {
            
            isTouchEnabled = (mstrApp !== undefined && mstrApp.isTouchApp && mstrApp.isTouchApp()) || false;
        }

        return s.replace(_REG_EXP_EVTS, function hRepl(token, es) {
            var arr = es.split(","),
                out = [],
                len = arr.length,
                i;

            for (i = 0; i < len; i++) {
                var e = arr[i];
                if (e) {
                    
                    if (isTouchEnabled) {
                        
                        if (e.indexOf('mouse') > -1) {
                            
                            continue;

                        
                        } else if (e === 'click') {
                            
                            e = 'touchend';
                        }
                    }

                    
                    out.push('on' + e + '="mstrmojo.dom.captureDomEvent(\'{@id}\',\'' + e + '\', self, event)"');
                }
            }
            return out.join(" ");
        });
    }

    var PRE = 'preBuildRendering',
        BUILD = 'buildRendering',
        POST = 'postBuildRendering';

    
    function _build(widget) {

        var s = widget.markupString;
        
        if (s.match(/mstrAttach:/)) {
            
            s = _replEvts(s);
            
            if (widget.markupString === widget.constructor.prototype.markupString) {
                
                widget.constructor.prototype.markupString = s;
            }
        }
        var html = _S.apply(s, widget);
        if (html) {
            if (mstrmojo.useFrames) {
                
                
                var doc = (widget.domNode && widget.domNode.ownerDocument) ||
                            self.document;
                if (!_elCreate || _elCreate.ownerDocument !== doc) {
                    _elCreate = doc.createElement('span');
                }
            }
            _elCreate.innerHTML = html;
            var d = _elCreate.firstChild;
            
            d.mstrmojoId = widget.id;
            return d;
        }
        return null;
    }

    
    function _callSlots(widget) {
        
        var ms = widget.markupSlots,
            nodes,
            n;

        if (ms) {
            nodes = {};
            for (n in ms) {
                nodes[n] = ms[n].apply(widget, []);
            }
        }
        return nodes;
    }

    
    mstrmojo._HasMarkup = mstrmojo.provide(
        "mstrmojo._HasMarkup",
        
        {
            
            

            
            

            
            

            onRender: mstrmojo.emptyFn,

            onUnRender: mstrmojo.emptyFn,

            
            render: function rnd() {
                if ((this[PRE] && this[PRE]() === false) || (this[BUILD]() === false) || (this[POST] && this[POST]() === false)) {
                    return false;
                }

                this.hasRendered = !!this.domNode;

                this.onRender();

                
                var evtName = 'renderComplete';
                if (mstrmojo.publisher.hasSubs(this.id, evtName)) {
                    
                    this.raiseEvent({
                        name: evtName
                    });
                }

                return true;
            },


            buildDom: function buildDom() {
                return _build(this);
            },

            preBuildRendering: mstrmojo.emptyFn,

            
            buildRendering: function bldRnd() {

                
                var dnWas = this.domNode,
                    dn = this.buildDom();

                this.domNode = dn;

                
                if (this.postBuildDom) {
                    this.postBuildDom();
                }

                
                if (this.slotNames) {
                    this.removeSlots(this.slotNames);
                }
                
                this.addSlots(_callSlots(this));

                
                this.paint();

                
                if (dn) {
                    
                    var ph = dnWas;
                    if (!ph) {
                        
                        ph = this.placeholder;
                        if (ph) {
                            
                            if (typeof ph === 'string') {
                                ph = document.getElementById(ph);
                            }
                            
                            delete this.placeholder;
                        }
                    }
                    if (ph) {
                        _D.replace(ph, dn);
                    }
                }

                
                
                
                
                var fn = "onchildRenderingChange",
                    p = this.parent;
                if (p && p[fn]) {
                    p[fn](this);
                }

                return true;
            },

            postBuildRendering: mstrmojo.emptyFn,

            
            unrender: function unrn(ignoreDom) {
                
                if (this.hasRendered) {
                    if (!ignoreDom) {
                        try {
                            var dn = this.domNode;
                            
                            if (dn.parentNode) {
                                dn.parentNode.removeChild(dn);
                            }
                            
                            if (mstrmojo.dom.isIE && dn.outerHTML !== "undefined") {
                                dn.outerHTML = "";
                            }
                        } catch (ex) {
                          
                        }
                    }
                    this.domNode = null;
                    this.removeSlots(this.slotNames);
                    this.hasRendered = false;

                    this.onUnRender();
                }
            },

            
            paint: function pnt() {
                var ms = this.markupMethods;
                if (!ms) {
                    return;
                }
                var me = this,
                    callM = function (n) {
                        var f = ms[n];
                        if (f) {
                            try {
                                f.apply(me, [true]);
                            } catch (localerr) {
                                throw new Error([
                                    "Error in markup method.",
                                    "Widget id: " + me.id,
                                    "Method name: " + n,
                                    "Err: " + localerr.message
                                ].join('\n\n'));
                            }
                        }
                    };
                var s = ms.sequence,
                    len,
                    i,
                    n;

                if (s) {
                    len = s.length || 0;
                    for (i = 0; i < len; i++) {
                        callM(s[i]);
                    }
                } else {
                    for (n in ms) {
                        callM(n);
                    }
                }
            },

            
            refresh: function refresh(postUnrender) {
                if (this.hasRendered) {
                    
                    
                    var ph = this.domNode;
                    
                    
                    this.unrender(true);
                    this.placeholder = ph;
                    if (postUnrender) {
                        postUnrender();
                    }
                    this.render();
                }
            },

            
            set: function set(n, v) {
                
                
                this._super(n, v);

                if (this.domNode) {  
                    
                    
                    
                    
                    var ms = this.markupMethods,
                        f = ms && ms["on" + n + "Change"];
                    if (f) {
                        f.apply(this);
                    }
                }
                return this;
            },


            
            slotNames: null,

            
            addSlots: function addSlots(slots) {
                
                var ns = this.slotNames,
                    n;

                if (!ns) {
                    ns = {};
                    this.slotNames = ns;
                }

                
                for (n in slots) {
                    this[n] = slots[n];
                    ns[n] = true;
                }
            },

            
            removeSlots: function rmvSlts(slots) {
                if (slots) {
                    var sns = this.slotNames,
                        n;

                    for (n in slots) {
                        delete this[n];
                        if (sns) {
                            delete sns[n];
                        }
                    }
                }
            },

            
            captureDomEvent: function cap(type, hWin, e, config) {
                if (this.enabled !== false) {
                    this.raiseEvent({
                        name: type,
                        hWin: hWin,
                        e: e || hWin.event,
                        config: config
                    });
                }
            },

            
            playEffect: function playEffect(n) {
                var fx = this[n];
                if (fx && fx.constructor === Object) {
                    fx = mstrmojo.insert(mstrmojo.hash.clone(fx)); 
                    fx.widget = this;
                    this[n] = fx;
                }
                if (fx) {
                    fx.play();
                }
            }
        }
    );
}());
(function() {
    mstrmojo._HasTooltip = mstrmojo.provide(
            'mstrmojo._HasTooltip',
            {

            
            tooltip: '',
            
            
            richTooltip: null,
            
            useRichTooltip: false,
            
            tooltipNode: null,
            
            postBuildRendering: function() {
                var ret;
                if (this._super) {
                    ret = this._super();
                }
                    
                if (this.useRichTooltip){
                    var d = this.tooltipNode || this.domNode,
                        dom = mstrmojo.dom,
                        ttl = d && d.getAttribute('title');
                    
                    if (ttl) {
                        d.setAttribute('title', '');
                    }
                    
                    if (!this._ontooltipover){
                        var id = this.id;
                        this._ontooltipover = function(e) {
                            var me = mstrmojo.all[id];
                            me.showTooltip(e, self);
                        };
                        this._ontooltipout = function(e) {
                            var me = mstrmojo.all[id];
                            me.hideTooltip(e, self);
                        };
                    }
                    dom.attachEvent(d, 'mouseover', this._ontooltipover);
                    dom.attachEvent(d, 'mouseout', this._ontooltipout);
                }
                return ret;
            },
            
            showTooltip: function(e, win) {
                mstrmojo.requiresCls("mstrmojo.tooltip");
                mstrmojo.tooltip.open(this, e, win);
            },
            
            hideTooltip: function(e, win) {
                mstrmojo.requiresCls("mstrmojo.tooltip");
                mstrmojo.tooltip.close();
            },
            
            unrender: function(ignoreDom) {
                var d = this.tooltipNode || this.domNode,
                dom = mstrmojo.dom;
                
                if (d && this._ontooltipover){
                    dom.detachEvent(d, 'mouseover', this._ontooltipover);
                }
                if (d && this._ontooltipout) {
                    dom.detachEvent(d, 'mouseout', this._ontooltipout);
                }
                if (this._super) {
                    this._super(ignoreDom);
                }
                
            }
    });
})();

mstrmojo.DPIManager = {

    
    classes: [],

    
    registerClass: function registerClass(clz, dimension, slot, dpiValues) {
        
        this.classes.push({
            c: clz,
            d: dimension,
            s: slot,
            v: dpiValues
        });
    },

    
    setDPI: function () {
        
        var dpi = mstrMobileApp.getDeviceDPI();

        
        mstrmojo.array.forEach(this.classes, function (clz) {
            
            clz.c.prototype.layoutConfig[clz.d][clz.s] = clz.v[dpi] + 'px';
        });

        
        this.classes = [];
    }
};

(function () {

    
    function calcChildDimension(child, dimension, onlyPercentageSlots) {
        var dim = this._layoutWidgets[dimension],
            slot = child.slot,
            fixedSlots = dim.f,
            percentageSlots = dim.p,
            isFixed = (fixedSlots && fixedSlots[slot] !== undefined),
            isPercent = (percentageSlots && percentageSlots[slot] !== undefined);

        
        if (slot && ((!onlyPercentageSlots && isFixed) || isPercent)) {
            
            return isFixed ? fixedSlots[slot] : (dim.x * parseInt(percentageSlots[slot], 10) / 100) + 'px';
        }

        return child[(dimension === 'h') ? 'height' : 'width'];
    }

    
    function applyChildDimensions(child, h, w) {
        
        if (child.ignoreLayout) {
            
            return;
        }

        
        if (child.setDimensions) {
            
            child.setDimensions(h, w);
        } else {
            
            if (child.set) {
                child.set('height', h);
                child.set('width', w);
            }
        }
    }

    
    function applyDimensions(onlyPercentageSlots) {
        var ch = this.children,
            i,
            len;

        
        for (i = 0, len = (ch && ch.length) || 0; i < len; i++) {
            var child = ch[i],
                slot = child.slot;

            
            if (slot) {
                
                var h = calcChildDimension.call(this, child, 'h', onlyPercentageSlots),
                    w = calcChildDimension.call(this, child, 'w', onlyPercentageSlots);

                
                this.setSlotDimensions(slot, h, w);

                
                applyChildDimensions(child, h, w);

                
                var zh = calcChildDimension.call(this, child, 'h', onlyPercentageSlots),
                    zw = calcChildDimension.call(this, child, 'w', onlyPercentageSlots);

                
                if (zh !== h || zw !== w) {
                    
                    applyChildDimensions(child, zh, zw);
                }

                
                this.setSlotDimensions(slot, zh, zw);
            }
        }

        
        this.afterLayout();
    }

    
    function adjustDimension(child, lw, d) {
        
        var slot = child.slot,
            autoSlots = lw && lw.a;

        
        if (!autoSlots || autoSlots[slot] === undefined) {
            
            return;
        }

        
        var x = this[slot]['offset' + d],
            size = autoSlots[slot];

        
        if (x === size) {
            
            return;
        }

        
        lw.x -= (x - size);

        
        autoSlots[slot] = x;
    }

    
    function adjustLayout(evt) {
        
        this.beforeLayout();

        var lw = this._layoutWidgets,
            child = evt.src;

        
        adjustDimension.call(this, child, lw.h, 'Height');
        adjustDimension.call(this, child, lw.w, 'Width');

        
        applyDimensions.call(this, true);
    }

    
    function calculateDimension(dimensionConfig, dimension) {
        
        if (!dimensionConfig) {
            
            return null;
        }

        var ch = this.children,
            lcDimension = dimension.toLowerCase(),
            widgetDimensionValue = parseInt(this[lcDimension], 10),                     
            fixedSlots,
            percentageSlots,
            autoSlots,
            autoSlotValues,
            i,
            len,
            child,
            v,
            slot;

        
        for (slot in dimensionConfig) {

            
            v = dimensionConfig[slot];

            
            if (v.match(/px$/)) {
                
                widgetDimensionValue -= parseInt(v, 10);

                
                fixedSlots = fixedSlots || {};
                fixedSlots[slot] = v;

            
            } else if (v.match(/\%$/)) {
                
                percentageSlots = percentageSlots || {};
                percentageSlots[slot] = v;

            
            } else {
                autoSlots = autoSlots || {};
                autoSlots[slot] = v;
            }
        }

        
        if (autoSlots && percentageSlots) {

            
            for (i = 0, len = (ch && ch.length) || 0; i < len; i++) {
                child = ch[i];
                slot = child.slot;

                
                if (child.slot && autoSlots[slot] && !child.ignoreLayout) {

                    autoSlotValues = autoSlotValues || {};

                    
                    if (child.hasRendered) {
                        autoSlotValues[slot] = this[child.slot]['offset' + dimension];

                        
                        widgetDimensionValue -= autoSlotValues[slot];

                    } else {
                        
                        autoSlotValues[slot] = 0;

                        
                        child.attachEventListener((child instanceof mstrmojo.Container) ? 'childrenRendered' : 'renderComplete', this.id, adjustLayout);
                    }
                }
            }
        }

        
        return {
            f: fixedSlots,
            p: percentageSlots,
            a: autoSlotValues,
            x: widgetDimensionValue
        };
    }

    
    mstrmojo._HasLayout =
        
        {
            _mixinName: 'mstrmojo._HasLayout',

            
            height: 'auto',

            
            width: 'auto',

            
            beforeLayout: mstrmojo.emptyFn,

            
            afterLayout: mstrmojo.emptyFn,

            
            layoutConfig: null,

            init: function init(props) {
                this._super(props);

                
                this.layoutConfig = mstrmojo.hash.clone(this.layoutConfig);
            },

            preBuildRendering: function preBuildRendering() {
                var cssText = this.cssText || '';

                var height = this.height;
                if (height && height !== 'auto') {
                    cssText += 'height:' + this.height + ';';
                }

                var width = this.width;
                if (width && width !== 'auto') {
                    cssText += 'width:' + this.width + ';';
                }

                this.cssText = cssText;

                return (this._super) ? this._super() : true;
            },

            postBuildRendering: function postBuildRendering() {
                
                this.doLayout();

                return this._super();
            },

            
            doLayout: function doLayout() {
                
                var lc = this.layoutConfig;
                if (!lc) {
                    return;
                }

                
                this.beforeLayout();

                
                this._layoutWidgets = {
                    h: calculateDimension.call(this, lc.h, 'Height'),
                    w: calculateDimension.call(this, lc.w, 'Width')
                };

                
                applyDimensions.call(this, false);
            },

            
            browserResized: function browserResized(size) {
                this.setDimensions(size.h, size.w);
                return true;
            },

            
            onwidthChange: function widthChg() {
                var dn = this.domNode;
                if (!dn || !this.layoutConfig) {
                    return;
                }

                dn.style.width = this.width;
                this.doLayout();
            },

            
            onheightChange: function heightChg() {
                var dn = this.domNode;
                if (!dn || !this.layoutConfig) {
                    return;
                }

                dn.style.height = this.height;
                this.doLayout();
            },

            
            adjustParentDimensions: function adjustParentDimensions() {
                var p = this.parent,
                    lw = p && p._layoutWidgets;

                
                if (lw) {
                    
                    adjustDimension.call(p, this, lw.h, 'Height');
                    adjustDimension.call(p, this, lw.w, 'Width');
                }
            },

            
            setDimensions: function setDimensions(h, w) {
                if (this.height !== h || this.width !== w) {
                    
                    this.height = h;
                    this.width = w;

                    
                    var dn = this.domNode;
                    if (dn) {
                        dn.style.height = h;
                        dn.style.width = w;

                        
                        this.doLayout();
                    }

                    return true;
                }

                return false;
            },

            
            setSlotDimensions: function setSlotDimensions(slot, h, w) {
                
                var sl = this[slot] && this[slot].style;
                if (!sl) {
                    
                    return;
                }

                
                if (h !== undefined && sl.height !== h) {
                    
                    sl.height = h;
                }

                
                if (w !== undefined && sl.width !== w) {
                    
                    sl.width = w;
                }
            }

        };

    
    mstrmojo._HasLayout.getSlotSize = function getSlotSize(constructor, slot) {
        var layoutCfg = constructor && constructor.prototype.layoutConfig;
        if (layoutCfg) {
            var h = layoutCfg.h,
                w = layoutCfg.w;

            return {
                h: (h && h[slot]) || undefined,
                w: (w && w[slot]) || undefined
            };
        }

        return null;
    };

}());
(function () {

    mstrmojo.requiresCls("mstrmojo.Obj",
                         "mstrmojo._LoadsScript",
                         "mstrmojo.Binding",
                         "mstrmojo._HasBindings",
                         "mstrmojo._HasMarkup",
                         "mstrmojo._HasTooltip");

    
    var $WIDGET = mstrmojo.Widget = mstrmojo.declare(
        
        mstrmojo.Obj,

        
        [mstrmojo._LoadsScript, mstrmojo._HasBindings, mstrmojo._HasMarkup, mstrmojo._HasTooltip],

        
        {
            
            scriptClass: "mstrmojo.Widget",

            
            domNode: null,

            
            hasRendered: false,

            
            visible: true,

            
            enabled: true,
            
            tooltip: '',

            
            cssClass: "",

            
            cssText: "",

            
            cssDisplay: 'block',

            
            init: function init(props) {
                this._super(props);

                
                
                
                
                
                
                var p = this.parent;
                if (!p || p.hasInitBindings) {
                    this.initBindings();
                }
            },

            
            destroy: function dst(skipCleanup) {
                if (this.hasRendered) {
                    this.unrender(skipCleanup);
                }
                if (this.bindings) {
                    this.destroyBindings();
                }
                this._super();
            },

            
            invalidate: mstrmojo.emptyFn
        }
    );

    
    $WIDGET.cssTextMarkupMethod = function () {
        this.domNode.style.cssText = this.cssText || '';
    };

    
    $WIDGET.visibleMarkupMethod = function () {
        this.domNode.style.display = (this.visible) ? this.cssDisplay : 'none';
    };

    $WIDGET.heightMarkupMethod = function () {
        this.domNode.style.height = this.height || '';
    };

    $WIDGET.widthMarkupMethod = function () {
        this.domNode.style.width = this.width || '';
    };

}());
(function () {
    mstrmojo.requiresCls("mstrmojo.registry",
                         "mstrmojo.array",
                         "mstrmojo.publisher");

    var _R = mstrmojo.registry,
        _A = mstrmojo.array,
        _P = mstrmojo.publisher;

    
    function _preAdd(p, c) {
        if (c) {
            c.parent = p;
            return _R.ref(c);
        }
        return null;
    }

    
    function _postAdd(p, c) {
        if (c && c.alias != null) { 
            p[c.alias] = c;
        }
    }

    
    function _postRmv(p, c) {
        var a = c.alias;
        if (c.parent === p) {
            delete c.parent;
        }
        if ((a != null) && (p[a] === c)) {  
            delete p[a];
        }
    }

    
    function makeCh(p, refs) {
        var len = refs && refs.length,
            ch,
            i;

        if (len) {
            ch = [];
            for (i = 0; i < len; i++) {
                var c = _preAdd(p, refs[i]);
                if (!c) {
                    continue;
                }
                ch.push(c);
                _postAdd(p, c);
            }
        }
        return ch;
    }

    
    mstrmojo._HasChildren = mstrmojo.provide(

        "mstrmojo._HasChildren",

        
        {
            
            _meta_usesSuper: false,

            
            

            
            

            
            initChildren: function initChildren() {
                var C = "children",
                    c = this[C];

                if (!c) {
                    return;
                }

                
                this[C] = null;
                this._set_children(C, c, true);

                
                if (this.postCreateChildren) {
                    this.postCreateChildren();
                }
            },

            
            _set_children: function setCh(n, v, silent) {
                var ch = this.children;
                if (v !== ch) {
                    if (ch) {
                        
                        this.removeChildren(null, silent);
                    }
                    this.addChildren(v, 0, silent);
                }
                return false;
            },

            
            destroyChildren: function dstCh(meDestroying) {
                var ch = this.children,
                    len = (ch && ch.length) || 0,
                    i;
                if (len) {
                    for (i = len - 1; i > -1; i--) {
                        var c = ch[i];
                        if (c && c.destroy) {
                            c.destroy(meDestroying);
                            if (!meDestroying) {
                                _postRmv(this, c);
                            }
                        }
                    }
                    if (!meDestroying) {
                        ch.length = 0;
                    }
                }
            },

            invalidateChildren: function invalidateChildren() {
                mstrmojo.array.forEach(this.children, function (child) {
                    child.invalidate();
                });
            },

            invalidate: function invalidate() {
                this.invalidateChildren();
            },

            
            addChildren: function addCh(c, idx, silent) {
                if (!c) {
                    return c;
                }
                
                var isArr = c.constructor === Array,
                    arr = makeCh(this, isArr ? c : [c]);

                if (arr && arr.length) {
                    
                    var ch = this.children || [];
                    if (idx == null) {  
                        idx = ch.length;
                    }
                    this.children = _A.insert(ch, idx, arr);

                    
                    if (!silent && (this.onaddChild || _P.hasSubs(this.id, "addChild"))) {
                        this.raiseEvent({
                            name: "addChild",
                            value: arr,
                            index: idx
                        });
                    }
                }
                return isArr ? arr : (arr && arr[0]);
            },

            
            removeChildren: function rmCh(c, silent) {
                var ch = this.children,
                    c2r = c ? [c] : (this.children || []).concat(),
                    len = c2r.length,
                    idx = -1,
                    i;

                if (len) {
                    for (i = len - 1; i > -1; i--) {
                        _postRmv(this, c2r[i]);
                    }

                    if (c) {
                        idx = _A.removeItem(ch, c);
                    } else if (ch) {
                        ch.length = 0;
                        idx = 0;
                    }

                    
                    if (!silent && (this.onremoveChild || _P.hasSubs(this.id, "removeChild"))) {
                        this.raiseEvent({
                            name: "removeChild",
                            value: c2r,
                            index: idx
                        });
                    }
                }
                return idx;
            }
        }
    );
}());
mstrmojo._ShowsStatus = mstrmojo.provide(
"mstrmojo._ShowsStatus",
{
    
    showStatus: function shwSts( show,  txt,  perc) {
        
        var el = this._STATUS;
        
        if (!this.hasRendered || !el) {
            return;
        }
        
        if (!show) {
            
            if (this.showingStatus) {
                el.style.display = 'none';
            }
        } else {
            if (el) {
                
                var zz = this._STATUS_TXT && (this._STATUS_TXT.innerHTML = txt || '');

                
                zz = this._STATUS_BAR && (this._STATUS_BAR.style.width = (perc || 0) + '%');
                
                
                if(!this.isStatusBarPositioned) {
                    el.style.top = Math.max((this.scrollboxHeight || 0) - 50, 12) + 'px';
                    this.isStatusBarPositioned = true;
                }

                if (!this.showingStatus) {
                    el.style.display = 'block';
                }
                
            }
        }
        
        this.showingStatus = show;
    },
    
     updateStatus: function updSts( txt,  perc) {
        this.showStatus(this.showingStatus, txt, perc);
    }
});
(function () {

    mstrmojo.requiresCls("mstrmojo.publisher",
                         "mstrmojo.Widget",
                         "mstrmojo._HasChildren");

    var _P = mstrmojo.publisher;

    
    mstrmojo.Container = mstrmojo.declare(
        
        mstrmojo.Widget,

        
        [ mstrmojo._HasChildren ],

        
        {
            
            scriptClass: "mstrmojo.Container",

            
            defaultChildSlot: "containerNode",

            
            init: function init(props) {
                this._super(props);

                
                if (this.children) {
                    this.initChildren();
                }

                
                
                
                
                var p = this.parent;
                if (!p || p.hasInitBindings) {
                    this.initBindings();
                }
            },

            
            destroy: function dst(skipCleanup) {
                if (this.children) {
                    this.destroyChildren(true);
                }
                if (this.bindings) {
                    this.destroyBindings();
                }
                this._super(skipCleanup);
            },

            
            unrender: function unrn(ignoreDom) {
                var c = this.children,
                    len = (c && c.length) || 0,
                    i;
                for (i = len - 1; i > -1; i--) {
                    c[i].unrender(true);
                }
                this._super(ignoreDom);

            },

            
            postBuildRendering: function pstBR() {
                var ret = this._super ? this._super() : undefined;
                if (ret !== false) {
                    this.renderChildren();
                    
                    ret = true;
                }
                return ret;
            },

            
            renderChildren: function rnCh() {
                var ch = this.children,
                    len = (ch && ch.length) || 0,
                    i;

                for (i = 0; i < len; i++) {
                    var c = ch[i];
                    if (this.childRenderCheck(c)) {
                        c.render(null);
                    }
                }
            },

            
            childRenderCheck: function chRnCk(c) {
                if (c && !c.hasRendered) {
                    var s = c.slot || this.defaultChildSlot;
                    return !!this[s];
                }
                return false;
            },

            
            addChildren: function addCh(c, idx, silent) {
                var arr = this._super(c, idx, silent);
                if (arr) {
                    this.childRenderOnAddCheck(arr);
                }
                return arr;
            },

            
            removeChildren: function rmCh(c, silent) {
                var c2r = c ? [c] : (this.children || []),
                    len = c2r.length,
                    i;

                
                for (i = len - 1; i > -1; i--) {
                    var w = c2r[i],
                        dn = w && w.domNode;
                    if (dn) {
                        var s = this[(w.slot || this.defaultChildSlot)];
                        if (dn.parentNode === s) {
                            s.removeChild(dn);
                        }
                    }
                }

                
                return this._super(c, silent);
            },

            
            childRenderOnAddCheck: function childRndrOnAddChk(ch) {
                if (this.hasRendered && ch) {
                    var len = ch.length,
                        i;

                    for (i = 0; i < len; i++) {
                        var c = ch[i];
                        if (this.childRenderCheck(c)) {
                            c.render();
                        } else if (c && c.hasRendered) {
                            this.onchildRenderingChange(c);
                        }
                    }
                }
            },

            
            preserveChildDomOrder: true,

            
            onchildRenderingChange: function onChldChngRndr(child) {
                var d = child && child.domNode;
                if (!d) {
                    return;
                }

                
                var sdef = this.defaultChildSlot,
                    s = child.slot || sdef,
                    n = this[s],
                    ch = this.children;

                if (!n) {
                    
                    if (d.parentNode) {
                        d.parentNode.removeChild(d);
                    }
                } else {
                    
                    
                    if (d.parentNode === n) {
                        return;
                    }
                    
                    if (!this.preserveChildDomOrder) {
                        
                        n.appendChild(d);
                    } else {
                        
                        var sib,
                            i;

                        for (i = ch.length - 1; i >= 0; i--) {
                            var c = ch[i];

                            
                            if (c === child) {
                                
                                break;
                            }

                            
                            if (s === (c.slot || sdef)) {
                                
                                var cNode = c.domNode;

                                
                                if (cNode && cNode.parentNode === n) {
                                    
                                    sib = cNode;
                                }
                            }
                        }

                        
                        if (sib) {
                            
                            n.insertBefore(d, sib);
                        } else {
                            
                            n.appendChild(d);
                        }
                    }
                }

                
                if (_P.hasSubs(this.id, "childrenRendered")) {
                    var klen = ch.length,
                        k;

                    
                    for (k = 0; k < klen; k++) {
                        
                        
                        if (!ch[k].domNode) {
                            
                            return;
                        }
                    }

                    
                    this.raiseEvent({
                        name: "childrenRendered"
                    });
                }
            }
        }
    );

}());
(function () {

    mstrmojo.requiresCls("mstrmojo.Container");

    var $WIDGET = mstrmojo.Widget;

    mstrmojo.Box = mstrmojo.declare(

        mstrmojo.Container,

        null,

        {
            scriptClass: "mstrmojo.Box",

            markupString: '<div id="{@id}" class="mstrmojo-Box {@cssClass}" style="{@cssText}"></div>',

            markupSlots: {
                containerNode: function () { return this.domNode; }
            },

            markupMethods: {
                onvisibleChange: $WIDGET.visibleMarkupMethod,
                onheightChange: $WIDGET.heightMarkupMethod,
                onwidthChange: $WIDGET.widthMarkupMethod
            }
        }
    );

}());
(function(){

	mstrmojo.requiresCls("mstrmojo.Container");
	
	
	mstrmojo.VBox = mstrmojo.declare(
		
		mstrmojo.Container,
		
		
		null,
		
		
		{
			scriptClass: "mstrmojo.VBox",
			
			markupString: '<table id="{@id}" class="mstrmojo-VBox {@cssClass}" style="{@cssText}" cellspacing="0" cellpadding="0"><tr><td></td></tr></table>',

			markupSlots: {
				containerNode: function() { return this.domNode.rows[0].cells[0]; }
			},
			
			markupMethods: {
				onvisibleChange: function() { this.domNode.style.display = this.visible ? mstrmojo.css.DISPLAY_TABLE : 'none'; }
			}
		}			
	);
	
})();
(function(){

	mstrmojo.requiresCls("mstrmojo.Container");
	
	
	
	var PREFIX = "slot";
	
	
	mstrmojo.HBox = mstrmojo.declare(
		
		mstrmojo.Container,
		
		
		null,
		
		
		{
			scriptClass: "mstrmojo.HBox",
			
			cellCssClass: "",
			
			cellSpacing: 0,
			
			cellPadding: 0,
						
			markupString: '<table id="{@id}" class="mstrmojo-HBox {@cssClass}" style="{@cssText}" cellspacing="{@cellSpacing}" cellpadding="{@cellPadding}">{@colHTML}<tr>{@tableHtml}</tr></table>',
			
			colHTML: '',

			markupSlots: {
				containerNode: function() { return this.domNode.rows[0]; }
			},
			
			markupMethods: {
				onvisibleChange: function() { this.domNode.style.display = this.visible ? mstrmojo.css.DISPLAY_TABLE : 'none'; }
			},

			 
			buildRendering: function bldRn() {
				
				this.tableHtml = '';
				var t = [],
					ch = this.children,
					len = (ch && ch.length) || 0,
					i;
				
				if (len) {
					var counter = 0,
						css = this.cellCssClass ?
								' class="mstrmojo-HBox-cell ' + this.cellCssClass + '" ' :
								'',
						tdHtml = '<td ' + css + '></td>';
					for (i=0; i<len; i++) {
						t[counter++] = tdHtml;
						ch[i].slot = PREFIX+i;
					}
					this.tableHtml = t.join('');
				}				

				
				this._super();				
				
				
				
				
				if (len) {
					var slots = {},
						tds = this.containerNode.cells;
					for (i=0; i<len; i++) {
						slots["slot"+i] = tds[i];
					}
					this.addSlots(slots);
				}
			},
			
			addChildren: function addChild(widget, idx, silent) {
				if (!widget) {
					return widget;
				}
				
				
				if (idx === undefined || isNaN(idx) || idx < 0) {
				    var ch = this.children;
					idx = (ch && ch.length) || 0;
				}
				
				var i = 0,
				    cnt;
				
				
				if (widget.constructor === Array) {
					for (i = 0, cnt = widget.length; i < cnt; i++) {
						widget[i].slot = PREFIX + (idx + i);
					}
				} else {
					
					widget[i].slot = PREFIX + idx;
				}
				
				
				return this._super(widget, idx, silent);
			},
			
			
			childRenderCheck: function childRndrChk( child) {
				if (child && !child.hasRendered) {
					var slotName = child.slot || this.defaultChildSlot;
					return !!this[slotName] || slotName.match(/^slot[\d]+$/);
				}
				return false;
			},
			
			onchildRenderingChange: function chRnChg( obj) {
				var child = (obj && obj.src) || obj,
					d = child && child.domNode;
				
				if (d) {
					
					var s = child.slot;
					
					if (!this[s]) {
						
						
						var match = s && s.match(/^slot([\d]+)$/);
						if (match) {
							
							
							var idx = parseInt(match[1], 10),
								cn = this.containerNode,
								cells = cn.cells,
								cLen = (cells&&cells.length) || 0,
								slots = {};
							for (var i = cLen; i <= idx; i++) {
								var td = cn.insertCell(i);
								slots["slot"+i] = td;
								if (this.cellCssClass) {
									td.className = this.cellCssClass;
								}
							}
							this.addSlots(slots);
						}
					}
				}
				
				
				this._super(obj);
			}			
		
		}
	);
	
})();
(function () {

    mstrmojo.requiresCls("mstrmojo.Widget",
                         "mstrmojo.dom",
                         "mstrmojo.hash",
                         "mstrmojo.css");

    var $DOM = mstrmojo.dom,
        $HASH = mstrmojo.hash,
        $CSS = mstrmojo.css;

    
    mstrmojo.Button = mstrmojo.declare(
        
        mstrmojo.Widget,

        
        null,

        
        {
            scriptClass: 'mstrmojo.Button',

            
            iconClass: '',

            
            innerIconClass: '',

            
            title: '',

            
            text: '&nbsp;',

            
            enabled: true,

            
            selected: false,

            
            cssDisplay: 'block',

            
            markupString: '<div id="{@id}" class="mstrmojo-Button {@cssClass} {@iconClass}" title="{@title}" style="{@cssText}" mstrAttach:touchstart,click,mousedown,mouseup>' +
                            '<div class="mstrmojo-Button-text {@innerIconClass}"></div>' +
                          '</div>',

            
            markupSlots: {
                textNode: function () { return this.domNode.firstChild; }
            },

            
            markupMethods: {
                onvisibleChange: function () { this.domNode.style.display = this.visible ? this.cssDisplay : 'none'; },
                onenabledChange: function () {
                    $CSS[this.enabled ? 'removeClass' : 'addClass'](this.domNode, ['disabled']);
                },

                onselectedChange: function () {
                    $CSS[this.selected ? 'addClass' : 'removeClass'](this.domNode, ['selected']);
                },

                ontextChange: function () {
                    this.textNode.innerHTML = this.text;
                },

                onwidthChange: function () {
                    var w = this.width;
                    if (w) {
                        this.domNode.style.width = w;
                    }
                }
            },

            oniconClassChange: function oniconClassChange(evt) {
                if (this.hasRendered && this.domNode) {
                    var old = evt.valueWas,
                        v = evt.value;
                    this.domNode.className = this.domNode.className.replace(old, '') + ' ' + v;
                }
            },

            
            onclick: mstrmojo.emptyFn,

            ontouchend: function ontouchend(evt) {
                this.onclick(evt);
            }
        }
    );

    
    mstrmojo.Button.newIconButton = function (t, c, fn, b, ps) {
        
        var btn = {
            scriptClass: 'mstrmojo.Button',
            title: t,
            cssClass: c,
            text: '',
            onclick: fn
        };

        
        if (b) {
            
            btn.bindings = b;
        }

        
        $HASH.copy(ps, btn);

        return btn;
    };

    
    mstrmojo.Button.newInteractiveButton = function (t, fn, haloColor, ps) {
        
        var btn = {
            scriptClass: 'mstrmojo.Button',
            cssClass: 'mstrmojo-InteractiveButton',
            text: t,
            glowClass: "glow"
        };

        
        if (fn) {
            btn.onclick = fn;
        }

        
        if (haloColor && ($DOM.isFF || $DOM.isWK)) {
            
            $HASH.copy({
                onmousedown: function () {
                    $CSS.applyShadow(this.domNode, 0, 0, 10, haloColor);
                },
                onmouseup: function () {
                    $CSS.removeShadow(this.domNode);
                }
            }, btn);
        }

        
        $HASH.copy(ps, btn);

        return btn;
    };
}());
(function () { 

    mstrmojo.requiresCls("mstrmojo.array");
    
    var $ARR = mstrmojo.array,
        $HASH = mstrmojo.hash;
    
     
    function _add( me,  idxs) {
        
        
        if ( !idxs ) {
            return;
        }
        
        var added = [],
            sel = me.selectedIndices,
            allIdx = me.allIdx,
            noneIdx = me.noneIdx,
            inc = me.parent && me.parent.include;

        
        if(me.multiSelect && (noneIdx > -1) && ($ARR.indexOf(idxs, noneIdx) > -1)) {
            return added;
        }
        
        
        var i, len,
            items = me.items,
            idf = me.itemIdField,
            selectedItems = me.selectedItems,
            item;
        
        if (me.multiSelect && (allIdx > -1) && ($ARR.indexOf(idxs, me.allIdx) > -1)) {
            for (i = 0, len=items.length; i < len; i++) {
                if (!sel[i]){
                    added.push(i);
                    sel[i] = true;
                    me.selectedIndex = i;
                    me.selectedItem = items[i];
                }
            }
        } else {
            for (i=0, len=idxs.length; i<len; i++) {
                var idx = idxs[i];
                if (!sel[idx]){
                    sel[idx] = true;
                    added.push(idx);
                    me.selectedIndex = idx;
                    item = me.selectedItem = items[idx];
                    if ( selectedItems ) {
                        selectedItems[item[idf]] = item;
                    }
                }
            }
        }
        return added;
    }
        
     
    function _rmvAll( me) {
        var rmv = [],
            sel = me.selectedIndices,
            selectedItems = me.selectedItems;
        for (var i in sel) {
            delete sel[i];
            rmv.push(parseInt(i, 10));    
        }
        me.selectedIndex = -1;
        me.selectedItem = null;
        if ( selectedItems ) {
            me.selectedItems = {};
        }
        return rmv;
    }
    
     
    function _rmv( me,  idxs) {
        
        if ( !idxs ) {
            return;
        }
        
        var removed = [],
            sel = me.selectedIndices,
            arrIdx = $ARR.indexOf,
            allIdx = me.allIdx,
            noneIdx = me.noneIdx,
            idf = me.itemIdField,
            selectedItems = me.selectedItems;
                
        
        if (me.multiSelect && (((allIdx > -1) && (arrIdx(idxs, allIdx) > -1)) || ((noneIdx > -1) && (arrIdx(idxs, noneIdx) > -1)))) {
            return _rmvAll(me);
        }
        
        
        
        if (idxs.length > 0 && sel[allIdx]) {
            if (arrIdx(idxs, allIdx) < 0) {
                idxs.push(allIdx);
            }
        }
        for (var i=0, len=idxs.length; i<len; i++) {
            var idx = idxs[i];
            if (sel[idx]){
                delete sel[idx];
                removed.push(idx);
                if ( selectedItems ) {
                    delete selectedItems[me.items[idx][idf]];
                }
                if (me.selectedIndex == idx) {
                    me.selectedIndex = -1;
                    me.selectedItem = null;
                }
            }
        }
        return removed;
    }
    
    
    function _raise( me,  added,  removed,  idxs) {
        if (me.raiseEvent) {
        	
        	
        	me.raiseEvent({
        		name: 'select',
        		idxs: idxs || []
        	});
        	
            if ((added && added.length) || (removed && removed.length)) {
                try {
                    me.raiseEvent({
                        name: 'selectionChange',
                        added: added,
                        removed: removed
                    });
                } catch (ex) {
                    
                    _rmv(me, added);
                    _add(me, removed);
                    
                    throw ex;
                }
        	}
        }
    }
    
    function indexOf(me, item) {
        if ( item == null ) {
            return -1;
        }
        var isObject = typeof(item) == 'object',
            idf = me.itemIdField;
        if (isObject && idf != null) {
            return $ARR.find(me.items, idf, item[idf]);
        } else  {
            return $ARR.indexOf(me.items, item);
        }
    } 
    
        
    mstrmojo._ListSelections = {

            multiSelect: false,
            
            allIdx : -1,
            
            items: null,
            
            selectedIndices: null,
            
            
            selectedIndex: -1,

            
            selectedIndices_bindEvents: "selectionChange",
            selectedIndex_bindEvents: "selectionChange",
            
            
            selectedItem: null,
            
            selectedItem_bindEvts: "selectionChange",
            

            
            allowUnlistedValues: true,
            
            
            selectedItems: null,

            
            supportsIncFetch: false,
            
            
            init: function( props) {
                this._super(props);
                
                
                if ( this.supportsIncFetch && this.itemIdField ) {
                    this.selectedItems = {};
                }
                if ( ! this.items ) {
                    this.items = [];
                }
                if (!this.selectedIndices) {
                    this.selectedIndices = {};
                    if (this.selectedIndex>-1) {
                        this._set_selectedIndex("selectedIndex", this.selectedIndex, true);
                    } else if (this.selectedItem) {
                        this._set_selectedItem("selectedItem", this.selectedItem, true);
                    }
                }
            },
            
            
            addItems: function addItems(newItems) {
                if ( ! newItems  ) {
                    return;
                }
                if (newItems.constructor != Array) {
                    newItems = [newItems];
                }
                var items = this.items,
                    start = this.items.length,
                    selectedItems = this.selectedItems,
                    newSelected = [], 
                    end; 
                
                items = this.items = items.concat(newItems); 
                end = items.length;

                
                
                if ( selectedItems ) {
                    var selectedIndices = this.selectedIndices,
                        idf = this.itemIdField,
                        i, item;
                    for ( i = start; i < items.length; i++ ) {
                        item = items[i];
                        if ( selectedItems[item[idf]] ) {
                            newSelected.push(i);
                        } 
                    }
                }
                
                if (newSelected && newSelected.length) { 
                    _add(this, newSelected); 
                }
                
                if ( end > start) {
                    this.itemsContainerNode.innerHTML += this._buildItemsMarkup(start, end - 1).join('');
                }
            },
            
            
            addSelectedItems: function addSelectedItems(newSelections) {
                this.selectItems(newSelections, false);
            },
            
            setSelectedItems: function setSelectedItems(newSelections) {
                this.selectItems(newSelections, true);
            },
            
            
            selectItems: function selectItems(newSelections, clearPrevSelections) {
                if ( ! newSelections ) {
                    return;
                }
                if (newSelections.constructor != Array) {
                    newSelections = [newSelections];
                }

                var me = this;
                
                
                if ( clearPrevSelections && me.selectedItems ) {
                    me.selectedItems = {};
                }
                
                var selectedItems = me.selectedItems,
                    idf = me.itemIdField,
                    item, idx, i,
                    addedItems = [], 
                    addedIdx = me.items.length, 
                    newSelectedIndices = [], 
                    allowUnlistedValues = me.allowUnlistedValues;
                
                for ( i = 0; i < newSelections.length; i++ ) {
                    item = newSelections[i];
                    idx = indexOf(this, item);
                    
                    
                    if (idx === -1 ) {
                        
                        if ( selectedItems === null ) {
                            
                            if ( allowUnlistedValues) {
                                
                                addedItems.push(v);
                                idx = addedIdx++;
                            }
                        } else {
                            
                            
                            selectedItems[item[idf]] = item;
                        }
                    } 
                    
                    
                    if ( idx !== -1) {
                        newSelectedIndices.push(idx);
                    }
                }
                
                
                if ( addedItems.length > 0 ) {
                    me.addItems(addedItems);
                }
                
                
                if ( newSelectedIndices.length > 0 ) {
                    if ( clearPrevSelections ) {
                        me.select(newSelectedIndices);
                    } else {
                        me.addSelect(newSelectedIndices);
                    }
                }
            },

            unselectItems: function selectItems(items) {
                if ( ! items ) {
                    return;
                }
                if (items.constructor != Array) {
                    items = [items];
                }

                var me = this,
                    selectedItems = me.selectedItems,
                    unselectedIndices = [],
                    idf = me.itemIdField,
                    item, idx, i;
                if ( selectedItems === null ) {
                    return;
                }
                for ( i = 0; i < items.length; i++ ) {
                    item = items[i];
                    
                    
                    if ( selectedItems ) {
                        delete selectedItems[item[idf]];
                    }

                    idx = indexOf(this, item);
                    
                    if ( idx !== -1) {
                        unselectedIndices.push(idx);
                    }
                }
                
                if ( unselectedIndices.length > 0 ) {
                    me.removeSelect(unselectedIndices);
                }
            },
            
            
            getSelectedItems: function getSelectedItems() {
                
                
                if ( this.selectedItems != null ) {
                    return $HASH.valarray(this.selectedItems);
                } else {
                    return $ARR.get(this.items, $HASH.keyarray(this.selectedIndices, true));
                }
            },
            
            
            singleSelect: function(idx, suppressEvt){
                if (idx !== -1) {
                    this.select([idx], suppressEvt);
                }
            },
            
            
            singleSelectByField: function singleSelectByField(value, fieldName, suppressEvt) {
                this.singleSelect($ARR.find(this.items, fieldName, value), suppressEvt);
            },
            
            
            toggleSelect: function( idx) {
                var add, rmv;
                if (this.selectedIndices[idx]) { 
                    rmv = _rmv(this, [idx]);
                } else {
                    add = _add(this, [idx]);
                }
                _raise(this, add, rmv, [idx]);
            },
            
            rangeSelect: function(idx) {
                 
            },
            
            select: function (idxs,  bSuppressEvt){
                if (idxs == null) return;
                if (idxs.constructor != Array) {
                    idxs = [idxs];
                }

                var rmv = _rmvAll(this),
                    add = _add(this, idxs),
                    i = rmv.length - 1;

                
                if (this.selectionPolicy !== 'reselect') {
                    
                    for (; i >= 0 ; i--) {
                        
                        var ind = $ARR.indexOf(add, rmv[i]);
                        if (ind > -1){ 
                            
                            rmv.splice(i, 1);
                            add.splice(ind, 1);
                        }
                    }
                }
                
                
                if (!bSuppressEvt) {
                    
                    _raise(this, add, rmv, idxs);
                }
            },
            
            clearSelect: function( bSuppressEvt){
                var ret = _rmvAll(this);
                if (bSuppressEvt !== true) {
                    _raise(this, null, ret, []);
                }
            }, 
            
            addSelect: function( idxs,  bSuppressEvt) {
                if (idxs == null) {
                    return;
                }
                if (idxs.constructor != Array) {
                    idxs = [idxs];
                }
                var ret = _add(this, idxs);
                
                var rmv = null,
                    noneIdx = this.noneIdx;
                
                if(this.multiSelect && (noneIdx > -1 && $ARR.indexOf(idxs, noneIdx) > -1)) {
                    rmv = _rmv(this,idxs);
                }
                
                if (bSuppressEvt !== true) {
                    _raise(this, ret, rmv, idxs);
                }
            },
            
            removeSelect: function( idxs) {
                if (idxs == null) {
                    return;
                }
                if (idxs.constructor != Array) {
                    idxs = [idxs];
                }
                 _raise(this, null, _rmv(this, idxs), idxs);
            },
            
            
            _set_selectedIndices: function(n, v,  bSuppressEvt) {
                var me = this, 
                    sel = me.selectedIndices;
                
                
                if ( me.selectedItems ) {
                    me.selectedItems = {};
                }
                var sel = me.selectedIndices;
                if (sel == v) {
                    return false;
                }

                if (!sel) {
                    sel = {};
                    me.selectedIndices = sel;
                }
                
                if (!v) {
                    v = {};
                }
                
                
                var sidx = me.selectedIndex,
                    rmv = [],
                    idx;
                for (idx in sel) {
                    if (!v[idx]) {
                        idx = parseInt(idx,10);
                        delete sel[idx];
                        rmv.push(idx);
                        if (sidx == idx) {
                            me.selectedIndex = -1;
                            me.selectedItem = null;
                        }
                    }
                }
                
                var add = [],
                    itms = me.items,
                    idf = me.itemIdField,
                    item;
                for (idx in v) {
                    if (!sel[idx]) {
                        idx = parseInt(idx,10);
                        sel[idx] = true;
                        add.push(idx);
                        me.selectedIndex = idx;
                        item = me.selectedItem = itms[idx];
                        if ( me.selectedItems ) {
                            me.selectedItems[item[idf]] = item;
                        }
                    }
                }
                
                if (bSuppressEvt !== true) {
                	var idxs = [];
                	for (idx in v) {
                		if (sel[idx]) {
                			idx = parseInt(idx, 10);
                			idxs.push(idx);
                		}
                	}
                    _raise(me, add, rmv, idxs);
                }

                return (add.length || rmv.length);    
            },
            
            
            _set_selectedIndex: function(n, v,  bSuppressEvt){
                var idxs = {};
                if (v >-1) {
                    idxs[v] = true;
                }
                return this._set_selectedIndices("selectedIndices", idxs, bSuppressEvt);
            },
            
            
            _set_selectedItem: function(n, v,  bSuppressEvt){
                
                
                var idx = indexOf(this, v);
                if ((idx === -1) && (v != null) && this.allowUnlistedValues && this.items) {
                    
                    
                    
                    this.set('items', this.items.concat(v));
                    idx = this.items.length - 1;
                }
                return this._set_selectedIndex("selectedIndex", idx, bSuppressEvt);
            }
            
        };
})();

(function(){

	mstrmojo.requiresCls("mstrmojo.Widget", "mstrmojo._ListSelections");
	
	
	mstrmojo.ListBase = mstrmojo.declare(
		
		mstrmojo.Widget,
		
		
		[mstrmojo._ListSelections],
		
        
		{
			scriptClass: "mstrmojo.ListBase",
			
		
            selectionPolicy: null,
            
			
			itemRenderer: null,
			
            
            icnCssText: '',
            
            
            icnCss: '',
            
            markupString: '<div id="{@id}" class="mstrmojo-ListBase {@cssClass}" style="{@cssText}" mstrAttach:click,mouseover>' + 
                              '<div class="{@icnCss}" style="{@icnCssText}">{@itemsHtml}</div>' + 
                          '</div>',
			
			markupSlots: {
                itemsContainerNode: function() { return this.domNode.firstChild; },
                scrollboxNode: function() { return this.domNode; }
			},
			
			markupMethods: {
                onvisibleChange: function() { this.domNode.style.display = this.visible ? this.cssDisplay : 'none'; },
                onheightChange: function() { if (this.height) this.domNode.style.height = this.height; },
                onwidthChange: function() { if (this.width) this.domNode.style.width = this.width; }
			},
									
			
			buildRendering: function bldRnd() {
				
				this.itemsHtml = '';
				var len = this.items && this.items.length;
				if (len) {
					this.itemsHtml = this._buildItemsMarkup(
										0, 
										len-1, 
										this._markupPrefix && this._markupPrefix(),
										this._markupSuffix && this._markupSuffix(),
										this._itemPrefix && this._itemPrefix(),
										this._itemSuffix && this._itemSuffix()).join('');
				}
				
				
				
				
				this._super();	
				
				delete this.itemsHtml;
				
				this.addSlots({itemsNode: this.itemsContainerNode.firstChild});
			},
			
			_markupPrefix: null,
			_markupSuffix: null,
			_itemPrefix: null,
			_itemSuffix: null,
						
			
			_buildItemsMarkup: function( start,  end,  markupPrefix,  markupSuffix,  itemPrefix,  itemSuffix) {
				
				var markup = [],
					count = 0;
				markup[count++] = markupPrefix || '';

				
				var ir = this.itemRenderer,
					fn = ir && ir.render;
				if (fn && typeof(fn) == "function") {
					
					var PRE = itemPrefix || '',
						POST = itemSuffix || '',
						its = this.items,
						len = (its && its.length) || 0,
						me = this;
					for (var i=start, stop=Math.min(end+1, len); i<stop; i++) {
						markup[count++] = PRE;
						markup[count++] = fn(its[i], i, me);
						markup[count++] = POST;
					}
				}
								
				markup[count++] = markupSuffix || '';
				return markup;
			},
			
            			
            onselectionChange: function onselChg(evt) {
                if (!evt) {
                    return;
                }
                
                var ir = this.itemRenderer;
                if (!ir) {
                    return;
                }
                
                var unsel = ir.unselect,
                    its = this.items || [],
                    rem = evt.removed,
                    ix, el;
                
                if (unsel && rem) {
	                
	                for (var j=0, jLen=rem.length; j<jLen; j++) {
	                    ix = rem[j];
	                    el = this._getItemNode(ix);
	                    if (el) {
		                    unsel(el, its[ix], ix, this);
	                    }
	                }
				}
                
                var sel = ir.select,
                    added = evt.added;

                if (sel && added) {
                    
                    for (var i=0, len=added.length; i<len; i++) {
                        ix = added[i];
                        el = this._getItemNode(ix);
                        if (el) {
                            sel(el, its[ix], ix, this); 
                        }
                    }             
                }
                
                
                if (this.onchange) {
                	this.onchange();
                }
            },
            
            
            onselect: function onsel(evt) {
            	if (this.makeSelection && evt.idxs && evt.idxs.length) {
            		var selItem = this._getItemNode(evt.idxs[0]);
            		this.makeSelection({
            			selIdx: evt.idxs[0],
            			selItem: selItem
            		});
            	}
            },
            
            
            autoHide: false,
            
            
            init: function init( props) {
            	this._super(props);
				if (this.autoHide) {
					this.visible = !!(this.items && this.items.length);
				}
            }, 
            
            _getItemNode: function(idx) {
                var itemsNode = this.itemsContainerNode;
                return (itemsNode && itemsNode.childNodes[idx]) || null;
            }, 
            
            
			_set_items: function stitems(n, v) {
				if (this.autoHide) {
					this.set('visible', !!(v && v.length));
				}
				var was = this.items;
				this.items = v;
				if (was != v) {
					var hr = this.hasRendered;
					if (hr) {
						this.unrender();
					}
					
					
					
					
					this.clearSelect();

                    if (hr) {
                        this.render();
                    }
					return true;
				} else {
					return false;
				}
				return was != v;
			}
		}
	);
})();			
(function(){

    mstrmojo.requiresCls("mstrmojo.ListBase");

    
    mstrmojo.SelectBox = mstrmojo.declare(
        
        mstrmojo.ListBase,
        
        
        null,
        
         
        {
            scriptClass: "mstrmojo.SelectBox",
            
            size: 10,
            
            cssDisplay: 'inline',
            
            markupString: '<select id="{@id}" class="mstrmojo-SelectBox {@cssClass}" style="{@cssText}" size="{@size}" {@multipleHtml} ' +
                                     'mstrAttach:keyup,change >' + 
                                     '{@itemsHtml}' + 
                                 '</select>',
            
            markupSlots: {
                itemsContainerNode: function(){return this.domNode; },
                scrollboxNode: function(){return this.domNode; }
            },
            
            
            markupMethods: {
                onvisibleChange: function(){ this.domNode.style.display = this.visible ? this.cssDisplay : 'none'; },
                onenabledChange: function(){ this.domNode.disabled = !this.enabled;}
            },

            
            itemCssClass: "mstrmojo-selectbox-item",

            
            itemDisplayField: 'n',

            
            itemIdField: 'v',
            
            
            showItemTooltip: false,
                        
            
            itemRenderer: {
                render: function( item,  idx,  widget) {
                    var itemNm = mstrmojo.string.htmlAngles((widget.getItemName) ? widget.getItemName(item, idx) : (widget.itemDisplayField && item[widget.itemDisplayField]));
                    
                    return '<option class="' + widget.itemCssClass + '" ' +
                                'value="' + ((widget.getItemValue) ? widget.getItemValue(item, idx) : (widget.itemIdField && item[widget.itemIdField])) + '" ' + 
                                ((widget.selectedIndices[idx]) ? 'selected="true" ' : '') + ((widget.showItemTooltip)? 'title="' + mstrmojo.string.encodeXMLAttribute(itemNm)+ '"' : '') + '>' +
                                    itemNm + 
                           '</option>';
                },
                select: function( el,  item,  idx,  widget) {
                    el.selected = true;
                },
                unselect: function( el,  item,  idx,  widget) {
                    el.selected = false;
                }
            },
            
            
            buildRendering: function bldRnd(){
                this.multipleHtml = this.multiSelect ? ' multiple="true" ' : '';
                this._super();
                delete this.multipleHtml;
            },
            
            _getItemNode: function(idx) {
                
                var s = this.scrollboxNode;
                return s && s.options[idx];
            },

            
            prechange: function prechg(evt) {
                
                
                
                if (this._syncDom) {
                    return;
                }
                
                this._syncDom = true;

                var el = this.scrollboxNode;
                
                
                if (this.multiSelect) {
                    
                    var os = el.options,
                        idxs = [];
                    for (var i=0, len=os.length; i<len; i++) {
                        if (os[i].selected) {
                            idxs.push(i);
                        }
                    }
                    this.select(idxs);
                } else {
                    
                    this.singleSelect(el.selectedIndex);
                }
                
                delete this._syncDom;
            },
            
            
            prekeyup: function(evt) {
                var el = this.scrollboxNode,
                isChanged = false; 

                if (this.multiSelect) {
                    
                    var os = el.options;
                    for (var i=0, len=os.length; i<len; i++) {
                        if (os[i].selected !== !!this.selectedIndices[i]) {
                            isChanged = true;
                            break;
                        }
                    }

                } else {
                   if (el.selectedIndex !== this.selectedIndex) {
                       isChanged = true;
                   }
                }
                if (isChanged) { 
                    var e = evt;
                    e.name = "change";
                    this.raiseEvent(evt);
                }
            },
            
            
            onselectionChange: function onselchg(evt){
                if (!this._syncDom) {
                    this._super(evt);
                }
            }
            
        }
    );
    
})();            
(function(){

    mstrmojo.requiresCls("mstrmojo.hash");
    
    
    mstrmojo._HasPopup =
    
    {
        
        
        openPopup: function opP( ref,  config) {
            
            
            var isProp = !!ref && (typeof(ref) === "string") && !ref.match(/\./) && !!this[ref],
                
                p = mstrmojo.registry.ref(isProp ? this[ref] : ref, true);

            
            if (p && p.open) {
                
                
                
                if (isProp) {
                    this[ref] = p;
                }
                
                this.disposables.push(p);
                
                var s = p.slot && this[p.slot];
                if (s) {
                    if (p.parent !== this) {
                        
                        if (this.addChildren) {
                            
                            
                            this.addChildren(p);
                        } else {
                            
                            
                            
                            
                            
                            var skipCheck = false,
                                el = p.domNode || p.placeholder;
                            if (el && typeof(el) === 'string') {
                                el = document.getElementById(el);
                            }
                            if (!el) {
                                skipCheck = true;
                                el = document.createElement('span');
                                p.placeholder = el;                                
                            }
                            if (skipCheck || (el.parentNode !== s)) {
                                s.appendChild(el);
                            }
                        }
                    }
                }
                p.open(this, config);
                this._lastOpened = p;
            }
        },
        
        
        closePopup: function clP() {
            var p = this._lastOpened;
            if (p && p.visible && p.close) {
                p.close();
                delete this._lastOpened;
            }
        }
    };

})();
(function(){

        
    mstrmojo._IsPopup = {
    
        
        visible: false,
        
        
        opener: null,
        
        
        onOpen: null,

        
        onClose: null,
        
        
        open: function open( opener,  config) {
            
            
            if (this.updatePopupConfig) {
                this.updatePopupConfig(config, opener);
            } else     if (config) {
                for (var k in config) {
                    this.set(k, config[k]);
                }
            }
            
            
            this.set('opener', opener);
            if (!this.hasRendered) {
                this.render();
            }
            
            
            if (this.nudge) {
                this.domNode.style.top = '-10000px';
            }
            
            
            this.set('visible', true);
            
            
            if (this.nudge) {
                this.nudge();
            }
            
            
            if (this.onOpen) {
                this.onOpen();
            }
        },
        
        
        close: function cls(config) {
            
            if (this.onClose) {
                this.onClose(config);
            }

            this.set('visible', false);
            this.set('opener', null);
        }
    };
    
})();
(function () {

    mstrmojo.requiresCls("mstrmojo.dom");

    var $D = mstrmojo.dom;
    
    
    var EVENT_TO_CLOSE = 'mousedown';

    function _attachHotSlot(me) {
        
        var el = me[me.hotSlot || "domNode"];
        if (el) {
            
            if (!me._closeCallback) {
                var id = me.id,
                    fnCallback = function (mthName) {
                        return function (e) {
                            var p = mstrmojo.all[id];
                            if (p && !p.ignoreHover) {
                                p['auto' + mthName](e, self);
                            }
                        };
                    };

                
                
                me._uncloseCallback = fnCallback('Unclose');
                me._closeCallback = fnCallback('Close');
            }
            
            $D.attachEvent(el, "mouseover", me._uncloseCallback);
            $D.attachEvent(el, "mouseout", me._closeCallback);
        }
    }

    function _detachHotSlot(me) {
        if (me._closeCallback) {
            var el = me[me.hotSlot || "domNode"];
            if (el) {
                $D.detachEvent(el, "mouseover", me._uncloseCallback);
                $D.detachEvent(el, "mouseout", me._closeCallback);
            }
        }
    }

    function _toggleLock(me, lock) {
        var w = me;
        while (w) {
            
            if (w.open || w.openPopup) {
                
                if (w.set) {
                    w.set("ignoreHover", lock);
                } else {
                    w.ignoreHover = lock;
                }
            }
            
            w = w.opener || w.parent;
        }
    }

    function clearLockHoverCallback() {
        var fn = this._lockHoverCallback;
        if (fn) {
            $D.detachEvent(document.body, EVENT_TO_CLOSE, fn, true);
            delete this._lockHoverCallback; 
        }

    }

    
    mstrmojo._CanAutoClose = {

        
        autoCloses: false,

        
        autoCloseDelay: 100,

        
        locksHover: false,

        
        hotSlot: null,

        
        closeOnClick: false,

        
        curtainNode: null,

        
        postBuildRendering: function postBuildRendering() {
            this._super();

            if (this.autoCloses) {
                _attachHotSlot(this);
            }

            this.oncloseOnClickChange();

        },

        
        onautoClosesChange: function onautoClosesChange() {
            var fn = (this.autoCloses) ? _attachHotSlot : _detachHotSlot;
            fn(this);
        },

        oncloseOnClickChange: function oncloseOnClickChange() {
            if (!this.curtainNode) {
                return;
            }

            var me = this,
                mthName = 'click',
                isTouchApp = (mstrApp && mstrApp.isTouchApp && mstrApp.isTouchApp());

            if (isTouchApp) {
                mthName = 'touchstart';
            }

            $D.attachEvent(me.curtainNode, mthName, function () {
                me.close();
                if (isTouchApp) {
                    mstrmojo.touchManager.notify([]);
                }
            });
        },

        
        autoUnclose: function autUncls() {
            var t = this._autoCloseTimer;
            if (t) {
                self.clearTimeout(t);
                delete this._autoCloseTimer;
            }
        },

        
        autoClose: function autCls() {
            if (this.ignoreHover) {
                return;
            }

            
            if (this._autoCloseTimer) {
                self.clearTimeout(this._autoCloseTimer);
            }

            if (this.opener) {
                if (this.autoCloseDelay) {
                    
                    var xid = this.opener.id;
                    this._autoCloseTimer = self.setTimeout(function () {
                        mstrmojo.all[xid].closePopup();
                    }, this.autoCloseDelay);
                } else {
                    
                    this.opener.closePopup();
                }
            }
        },

        
        destroy: function destroy(ignoreDom) {
            clearLockHoverCallback.call(this);

            this._super(ignoreDom);
        },


        
        lockHover: function lockHover() {
            _toggleLock(this, true);

            if (!this._lockHoverCallback) {

                var id = this.id,
                    fn = this._lockHoverCallback = function (evt) {
                       mstrmojo.all[id]._unlockHoverCheck(evt, self);
                    };

                
                
                

                
                

                
                
                
                
                
                
                if (($D.isIE7 || $D.isIE8 ) && window.event && (window.event.type == EVENT_TO_CLOSE) && this.opener) {
                    
                    this.opener._ignoreMousedown = true;
                }
                    
                
                $D.attachEvent(document.body, EVENT_TO_CLOSE, fn, true);
            }
        },

        
        unlockHover: function unlockHover() {
            _toggleLock(this, false);

            clearLockHoverCallback.call(this);
        },

        
        _unlockHoverCheck: function _unlockHoverCheck(e, hWin) {
            
            
            var opener = this.opener;
            if ( opener && opener._ignoreMousedown) {
                delete opener._ignoreMousedown;
                return;
            }

            if (!$D.contains(this.domNode, $D.eventTarget(hWin, e), true, document.body)) {
                this.close();
            }
        },

        
        open: function open(opener, config) {
            
            if (this.autoCloses) {
                this.autoUnclose();
            }

            this._super(opener, config);

            
            if (this.locksHover) {
                this.lockHover();
            }
        },

        
        close: function close(cfg) {
            
            if (this.locksHover) {
                this.unlockHover();
            }
            this._super(cfg);
        }
    };

}());
(function () {

    mstrmojo.requiresCls("mstrmojo.Container",
                         "mstrmojo._IsPopup",
                         "mstrmojo._CanAutoClose");

    
    mstrmojo.Popup = mstrmojo.declare(
        
        mstrmojo.Container,
        
        [mstrmojo._IsPopup, mstrmojo._CanAutoClose],
        
        {
            scriptClass: "mstrmojo.Popup",

            shadowNodeCssClass: "mstrmojo-popup-shadow",

            contentNodeCssClass: "mstrmojo-popup-content",

            cssDisplay : "block",

            markupString: '<div id="{@id}" class="mstrmojo-Popup {@cssClass}" style="{@cssText}" '
                + '><div class="mstrmojo-Popup-shadow {@shadowNodeCssClass}"></div><div class="mstrmojo-Popup-content {@contentNodeCssClass}"></div>',

            markupSlots: {
                containerNode: function () { return this.domNode.lastChild; },
                shadowNode: function () { return this.domNode.firstChild; }
            },

            markupMethods: {
                onvisibleChange: function () { this.domNode.style.display = (this.visible) ? this.cssDisplay : 'none'; },
                onleftChange: function () { this.domNode.style.left = (this.left != null) ? this.left : ''; },
                ontopChange: function () { this.domNode.style.top = (this.top != null) ? this.top : ''; }
            },
            
            
            buildRendering: function buildRendering() {
                
                var ph = this.placeholder;

                
                if (this._super()) {
                    
                    if (!this.parent && !ph) {
                        var node = this.placeNode || document.body;

                        
                        node.appendChild(this.domNode);
                    }
                    return true;
                }

                return false;
            }
        }
    );
}());
(function() {
    mstrmojo.requiresCls("mstrmojo.dom", "mstrmojo.Container", "mstrmojo._IsPopup", "mstrmojo.boxmodel", "mstrmojo.css");

    var _B = mstrmojo.boxmodel,
    _D = mstrmojo.dom,
    _CURSOR_HEGIHT = 20;
    
    function attScrll(o, me) {
        var p = o && o.parent;
        while (p){
            if (p.connectScrollbox){
                p.connectScrollbox(me);
            }
            p = p.parent;
        }
    }
    
    function detScrll(o, me) {
        var p = o && o.parent;
        while (p){
            if (p.disconnectScrollbox){
                p.disconnectScrollbox(me);
            }
            p = p.parent;
        }
    }
    
    var _position = function(me){
        
        if (me.visible) {
            
            
            var ref = me.refNode,
                
                
                
                offset = ref ? _B.offset(ref, document.body) : {
                                                                left: _D.getHorizontalScroll(),
                                                                top: _D.getVerticalScroll()
                                                            },
            s = me.domNode.style, 
            c = me.containerNode,
            l = me.left,
            t = me.top,
            p = me.posType,
            T = mstrmojo.tooltip,
            p_r = (p === T.POS_TOPRIGHT) || (p === T.POS_BOTTOMRIGHT), 
            p_b = (p === T.POS_BOTTOMLEFT) || (p === T.POS_BOTTOMRIGHT) || (p === T.POS_BOTTOMCENTER), 
            offLeft = offset.left,
            offTop = offset.top,
            containerOffWidth = c.offsetWidth;
                                                            
            if (l !== null) {
                
                s.left = Math.max(parseInt(l, 10) + offLeft - (p_r ? (containerOffWidth):
                                                                     ((p===T.POS_BOTTOMCENTER) ? (containerOffWidth / 2) : 0))
                                   , 0) + 'px';                
            }
            if (t !== null){
                
                s.top = Math.max(parseInt(t, 10) + offTop - ((p_b)? (c.offsetHeight):0), 0) + 'px';
            }
        }
    };

    var _repaint = function(me) {
        me.containerNode.className = ('mstrmojo-Tooltip-content ' + me.contentNodeCssClass);
        me.containerNode.style.cssText = me.contentNodeCssText;
        me.containerNode.innerHTML = me.content;
        if (!me.content) {
            me.set('_tempVis', false);
        } else {
            me.set('_tempVis', true);
        }
        _position(me);
        if (me.optimizePos) {
        	
        	me.optimizePos();
        }
    };

    
    function _dlyPaint(me) {
        if (!me._dp){
            me._dp = window.setTimeout(function() {
                me._dp = null;
                _repaint(me);
            }, 50);
        }
    }
    
    var _update = function(me, w, e, win) {
        
        var r = w && (w.richTooltip || w.tooltip),
            mp = e ? _D.getMousePosition(e, win || self) : null,
            isStr = r && (typeof(r) === 'string'),
            l = isStr ? null : (r && r.left || 0),
            t = isStr? null: (r && r.top || 0);
        me.set('contentNodeCssClass', isStr ? '' : (r && r.contentNodeCssClass || ''));
        me.set('contentNodeCssText', isStr ? '' : (r && r.contentNodeCssText || ''));
        me.set('content', (isStr) ? r : (r && r.content || ''));
        me.set('refNode', isStr ? null : r && r.refNode || null);
        me.set('posType', isStr ? 1: r && r.posType || 1);
        me.set('left', (isStr || l === undefined || l === null) ? (mp && mp.x || me.left) : l);
        me.set('top', (isStr || r === undefined || r === null) ? (mp && (mp.y + _CURSOR_HEGIHT) || me.top): t);        
    };
    
    mstrmojo.Tooltip = mstrmojo.declare(
            mstrmojo.Container,
            [mstrmojo._IsPopup],
            {
                scriptClass: 'mstrmojo.Tooltip',
                
                content: null,
                
                top: null,
                
                left: null,
                
                refNode: null,
                
                posType: 1, 
                
                markupString: '<div id="{@id}" class="mstrmojo-Tooltip {@cssClass}" style="{@cssText}">' +
                                '<div class="mstrmojo-Tooltip-shadow {@shadowNodeCssClass}"></div>' + 
                                '<div class="mstrmojo-Tooltip-content {@contentNodeCssClass}" style="{@contentNodeCssText}"></div>' +
                              '</div>',
                
                markupSlots: {
                    containerNode: function(){ return this.domNode.lastChild; },
                    shadowNode: function() { return this.domNode.firstChild; }
                },
                
                markupMethods: {
                    onvisibleChange: function(){ 
                        if (this.visible){
                            
                            var s = this.domNode.style;
                            s.visibility = 'hidden';
                            s.display = 'block';
                            
                            _position(this);
                            s.visibility = this.content? 'visible' : 'hidden';
                        } else {
                            this.domNode.style.display = 'none'; 
                        }
                    },
                    on_tempVisChange: function() {
                        this.domNode.style.visibility = this._tempVis ? 'visible' : 'hidden'; 
                    },
                    onleftChange: function(){ _dlyPaint(this); },
                    ontopChange: function(){ _dlyPaint(this); },
                    onrefNodeChange: function() {_dlyPaint(this); },
                    onposTypeChange: function() {_dlyPaint(this); },
                    oncontentNodeCssClassChange: function (){_dlyPaint(this);},
                    oncontentNodeCssTextChange: function() {_dlyPaint(this);},
                    oncontentChange: function() {_dlyPaint(this);}
                },
                
                preBuildRendering: function() {
                    
                    if (!this.slot && !this.placeholder) {
                        this.placeholder = document.body.appendChild(document.createElement('div'));
                    }
                    if (this._super) {
                        this._super();
                    }
                },
                _on_tooltip_change: function(evt){
                    _update(this, evt && evt.src);
                },
                
                _set_opener: function(n, v) {
                    var ov = this.opener;
                    
                    
                    
                    
                    if ((v !== ov)){
                        if (v) {
                            attScrll(v, this);
                        }
                        if (ov) {
                            detScrll(ov, this);
                        }                        
                        if (ov && ov.detachEventListener) {
                            ov.detachEventListener(this._richSubs);
                            ov.detachEventListener(this._ttpSubs);
                        }
                        if (v && v.attachEventListener) {
                            this._richSubs = v.attachEventListener('richTooltipChange', this.id, '_on_tooltip_change');
                            this._ttpSubs = v.attachEventListener('tooltipChange', this.id, '_on_tooltip_change');
                        }
                        this.opener = v;
                        return true;
                    }
                    return false;
                },
                
                updatePopupConfig: function(config, opener){
                    _update(this, opener, config && config.e, config && config.win);
                },
                
                onscroll: function() {
                    
                    if (this.visible && this.nudge) {
                        this.nudge();
                    }
                }
            }
    );

    
    var ttpInst = null;
    mstrmojo.tooltip = {
            
            POS_TOPLEFT: 1,
            POS_BOTTOMLEFT: 2,
            POS_TOPRIGHT: 3,
            POS_BOTTOMRIGHT: 4,
            POS_BOTTOMCENTER: 5,
            
            open: function(opener, e, win, config) {
                
                
                if (!ttpInst || !mstrmojo.all[ttpInst.id]) {
                    ttpInst = new mstrmojo.Tooltip();
                }
                
                if (!config) {
                    config = {};
                }
                config.e = e;
                config.win = win;
               ttpInst.open(opener, config);
            },
            
            close: function() {
                if (ttpInst) {
                    ttpInst.close();
                }
            }
    };
})();
(function() {

    mstrmojo.requiresCls("mstrmojo.Widget", "mstrmojo.hash", "mstrmojo.css", "mstrmojo.string");
    
    function _json(css, config){
        return mstrmojo.hash.copy(config, {
            
            
            label: '',
            
            
            
            tabIndex: '',
            
            
            cssDisplay: 'inline',
            
            
            name: null,
            
            markupString: '<span id="{@id}" class="' + css + ' {@cssClass}" style="{@cssText}" title="{@tooltip}">' +
                            '<input id="{@id}_input"  type="{@type}" name="{@name}" value="{@value}" tabIndex="{@tabIndex}" mstrAttach:click />' + 
                            '<label for="{@id}_input">{@label}</label>' +
                          '</span>',
            markupSlots: {
                inputNode: function(){ return this.domNode.firstChild; },
                labelNode: function(){ return this.domNode.childNodes[1]; }
            },
            
            markupMethods: {
                onvisibleChange: function(){ this.domNode.style.display = (this.visible) ? this.cssDisplay : 'none'; },
                onenabledChange: function(){ 
                    this.inputNode.disabled = !this.enabled;
                    mstrmojo.css[this.enabled? 'removeClass' :  'addClass'](this.domNode, 'disabled');
                },
                onlabelChange: function(){ 
                    this.labelNode.innerHTML = mstrmojo.string.encodeHtmlString(this.label);
                },
                oncheckedChange:  function() { this.inputNode.checked = this.checked; } 
            },
            
            
            checked: false,
            
            preclick: function(){
                this.set("checked", this.inputNode.checked);
            },
            
            isChecked: function() {
                return this.inputNode.checked;
            }
        });
    }
    

    
    mstrmojo.CheckBox = mstrmojo.declare(
        
        mstrmojo.Widget,
        
        
        null,
        
        
        _json('mstrmojo-CheckBox', {
                                    scriptClass: 'mstrmojo.CheckBox',
                                    type: 'checkbox'
                                
                                })
    );
    
    
    mstrmojo.ImageCheckBox = mstrmojo.declare(
        
        mstrmojo.Widget,
        
        
        null,
        
        
        _json('mstrmojo-CheckBox mstrmojo-ImageCheckBox', {
                                    scriptClass: 'mstrmojo.CheckBox',
                                    type: 'image',
                                    cssDisplay: 'block',
                                    preclick: function(){
                                        this.set("checked", !this.checked);
                                    },
                                    postCreate: function() {
                                        
                                        this.markupMethods = mstrmojo.hash.copy(this.markupMethods);
                                        this.markupMethods.oncheckedChange = function() {
                                            mstrmojo.css.toggleClass(this.inputNode, ['checked'], this.checked);
                                        };
                                    },
                                    postBuildRendering: function() {
                                        this.inputNode.src = this.src || '../images/1ptrans.gif';
                                        if (this._super) {
                                            return this._super();
                                        }  
                                        return true;
                                    }
                                })
    );
    
    
    
    mstrmojo.RadioButton = mstrmojo.declare(
            
            mstrmojo.Widget,
            
            
            null,
            
            
            _json('mstrmojo-RadioButton', {
                                        scriptClass: 'mstrmojo.RadioButton',
                                        type: 'radio',
                                        postBuildRendering: function(){
							            	
							                
							            	if (mstrmojo.dom.isIE){ 
							                    this.inputNode.checked = this.checked;
							                }
							            }
                                    })
    );
        
})();
(function(){

	mstrmojo.requiresCls("mstrmojo.dom");

	
	function validateListener(l) {
		return (l && l.id);
	}
	
    
    mstrmojo._HasScrollbox = 
        
        {
            
            _mixinName: "mstrmojo._HasScrollbox",
            
            
			
			scrollListeners: null,   
			
			
			scrollListenerCount: 0,
			
			
			connectScrollbox: function cnnScll( listener) {
				if (!validateListener(listener)) {
					return;
				}
				
				
				
				var hash = this.scrollListeners,
				    lid = listener.id;
				if (!hash) {
				    hash = {};
				    this.scrollListeners = hash;
				}
				if (!hash[lid]) {
    				hash[lid] = listener;
	       			this.scrollListenerCount++;
    				
    				if (this.scrollListenerCount == 1) {
    					this._attachScrollDom();
    				}
				}
			},

			disconnectScrollbox: function discnnScll( listener) {
				if (!validateListener(listener)) {
					return;
				}
				
				
				var hash = this.scrollListeners,
				    lid = listener.id;
                if (hash != null && lid in hash) {
				    delete this.scrollListeners[lid];
    				this.scrollListenerCount--;
    				
    				if (!this.scrollListenerCount) {
    				    this._detachScrollDom();
    				}
                }
			},
            
			
			
			notifyScrollListeners: function ntfSclls(evt) {
                
                
			    var p = evt || this.getScrollPos(),
			        top = p.y,
			        left = p.x;
			    
			    this.scrollboxTop = top;
                this.scrollboxLeft = left;
				this.scrollboxRight = left + this.scrollboxWidth;
				this.scrollboxBottom = top + this.scrollboxHeight;
				
				
				var ls = this.scrollListeners;
				for (var id in ls) {
					ls[id].onscroll(this);
				}
			},
			
			getScrollPos: function getScrollPos() {
			    var node = this.scrollboxNode; 
			    return {
			        x: node.scrollLeft,
                    y:  node.scrollTop
			    };
			},
			
			scrollTo: function scrollTo(pos) {
			    var node = this.scrollboxNode;
			    if (node && pos) {
			        node.scrollLeft = pos.x;
			        node.scrollTop = pos.y;
			    }
			},
						
			scrollInterval: 50,

			_attachScrollDom: function attSbxDom() {
				
				var sbn = this.scrollboxNode;
				if (sbn) {
                    
				    var useTouch = this.usesTouches;
				    if (!useTouch) {
	                    
	                    if (!this.scrollCallback) {
	                        var id = this.id;
	                        this.scrollCallback = function(){
	                            mstrmojo.all[id].notifyScrollListeners();
	                        };
	                    }

	                    
	                    mstrmojo.dom.attachBufferedEvent(sbn, "scroll", this.scrollCallback, this.scrollInterval);
					}
					    
					
					
					
					
					
					if (this.scrollboxTop === null) {
						this.scrollboxTop = (useTouch) ? 0 : sbn.scrollTop;
					}
					if (this.scrollboxLeft === null) {
						this.scrollboxLeft = (useTouch) ? 0 : sbn.scrollLeft;
					}
					
					var fnD = function (d) {
						var css = d.toLowerCase();
						
						
						var x = sbn.style[css];
						return (!isNaN(x) && x.charAt(x.length - 1) !== '%') ? parseInt(x, 10) : sbn['client' + d]; 
					};
					
					if (this.scrollboxHeight === null) {
						this.scrollboxHeight = fnD('Height');
					}
					if (this.scrollboxWidth === null) {
						this.scrollboxWidth = fnD('Width');
					}
					
					this.scrollboxBottom = this.scrollboxTop + this.scrollboxHeight;
					this.scrollboxRight = this.scrollboxLeft + this.scrollboxWidth;
					
					this._attachedScrollbox = sbn;
				}
			},
			
            _detachScrollDom: function dtchSbxDm() {
                var as = this._attachedScrollbox;
                if (as && this.scrollCallback) {
                    mstrmojo.dom.detachBufferedEvent(
                        as,
                        "scroll",
                        this.scrollCallback,
                        this.scrollInterval);
                }
                delete this._attachedScrollbox;
            },

            
			scrollboxTop: null,
			scrollboxLeft: null,
			scrollboxHeight: null,
			scrollboxBottom: null,

			
			buildRendering: function bldRndr() {
				
                
				this._detachScrollDom();
				
				
				this._super();
				
				
				if (this.scrollListenerCount) {
					this._attachScrollDom();
				}
			}		
			
			
	};
	
})();
(function(){

	
	mstrmojo.DivItemRenderer = {
		render: function( item,  idx,  widget) {
			var displayName = (widget.getItemName ?
								widget.getItemName(item, idx) :
								(widget.itemDisplayField && item[widget.itemDisplayField]) );
			return '<div mstridx="' + idx + '" class="' 
						+ widget.itemCssClass 
						+ (widget.selectedIndices[idx] ? ' ' + widget.itemSelectedCssClass : '')
						+ ' lb'
						+ displayName
						+ '" style="' + widget.itemCssText + '">' 
							+ displayName
						 + '</div>';
		},
		select: function( el,  item,  idx,  widget) {
			el.className += ' selected';
		},
		unselect: function( el,  item,  idx,  widget) {
			el.className = el.className.replace(/selected/g, '');
		}, 
		rowHeight: 21
	};	
	
	
	mstrmojo._RendersItemDivs = {
		
		tableCssClass: "mstrmojo-ListBox-table",
		tableCssText: "",
		rowCssClass: "",
		rowCssText: "",
		cellCssClass: "mstrmojo-ListBox-cell",
		cellCssText: "",

		
		itemCssClass: "mstrmojo-ListBox-item",
		itemSelectedCssClass: "selected",
		
		
		itemDisplayField: 'n',

								
		itemRenderer: mstrmojo.DivItemRenderer,
        _findMatch: function( hWin,  e) {
            
            return mstrmojo.dom.findAncestorByAttr(
                        mstrmojo.dom.eventTarget(hWin, e),
                        'mstridx',
                        true,
                        this.itemsNode);
        },
		
		preclick: function preclk(evt) {
			
			var hWin = evt.hWin,
                e = evt.e,
                match = this._findMatch(hWin, e);
			if (match) {
				
				
				var el = match.node,
					idx = parseInt(match.value),
					d = mstrmojo.dom,
					ctrl = d.ctrlKey(hWin, e),
					shift = d.shiftKey(hWin, e);
				if (ctrl || shift) {
					d.clearBrowserHighlights(hWin);
				}

				if (this.multiSelect && (this.selectionPolicy == "toggle" || ctrl)) {
					this.toggleSelect(idx);
				} else if (this.multiSelect && shift) {
					this.singleSelect(idx);	
				} else {
					this.singleSelect(idx);
				}
			}
		}
	};
	
	mstrmojo.requiresCls("mstrmojo.ListBase", "mstrmojo._RendersItemDivs");
	
	mstrmojo.ListBoxBase = mstrmojo.declare(
		
		mstrmojo.ListBase,
		
		
		[mstrmojo._RendersItemDivs],
		
        
		{
			scriptClass: "mstrmojo.ListBoxBase",
			
			cssClass: "mstrmojo-ListBox",
			itemCssClass: "mstrmojo-ListBox-item",
			
			_markupPrefix: function() {
				var ir = this.itemRenderer;
				return (ir && ir.markupPrefix) ||
						(	'<table class="' 
							+ this.tableCssClass 
							+ '" style="' + this.tableCssText 
							+ '" cellspacing="0" cellpadding="0"><tbody>');
			},
			_markupSuffix: function() {
				var ir = this.itemRenderer;
				return (ir && ir.markupSuffix) || '</tbody></table>';
			},
			_itemPrefix: function() {
				var ir = this.itemRenderer;
				return (ir && ir.itemPrefix) ||
						('<tr class="' + this.rowCssClass 
							+ '" style="' + this.rowCssText 
							+ '"><td class="' + this.cellCssClass 
							+ '" style="' + this.cellCssText + '">');
			},
			_itemSuffix: function() {
				var ir = this.itemRenderer;
				return (ir && ir.itemSuffix) || '</td></tr>';
			},
            _getItemNode: function(idx) {
                
                var t = this.itemsNode,
                	rs = t && t.rows,
                	r = rs && rs[idx];
            	return r && r.cells[0].firstChild;
            }
		}
	);

 




















































})();			
(function(){

	mstrmojo.requiresCls("mstrmojo.ListBoxBase", "mstrmojo._HasScrollbox");
	
	mstrmojo.ListBox = mstrmojo.declare(
		
		mstrmojo.ListBoxBase,
		
		
		[mstrmojo._HasScrollbox],
		
        
		{
			scriptClass: "mstrmojo.ListBox",

			
			renderAllItems: false,
			
            
            renderPause:10,

			
			numPagesRendered: 0,

			
			pageStatus: null,			

			
			_rc: null,
			_totalPages: null,
			_rh: null,
			_rhMin: 8,
			_rowsPerPage: null,
			_defaultRowsPerPage: 100,
			_minRowsPerPage: 100,
			_pageHeight: null,
			
			
			buildRendering: function bldRnd() {
				
				if (this.renderAllItems === true) {
					this._super();
					return true;
				}
				
				
				this._initPageSettings();
				
				
				
				var tmp = this.items;
				this.items = this._rc ?
								this.items.slice(0, Math.min(this._rowsPerPage, this._rc)) : 
								[];

				
				this._super();
				
				
				this.items = tmp;

				
				this.postRenderPage(0, true);

				
				if (this._rc > this._rowsPerPage) {
					
					
					this.itemsContainerNode.style[mstrmojo.css.MINHEIGHT] = (this._rh * this._rc) + 'px';
					
					if (!this.connectedScrollbox) {
						this.connectScrollbox(this);
						this.connectedScrollbox = true;
					}
				} else {
					
					this.postRenderingCleanup();
				}
				
			},

			
			_initPageSettings: function initPgSet() {
				
				var its = this.items;
				this._rc = (its && its.length) || 0;
				
				
				var ir = this.itemRenderer;
				this._rh =  (ir && ir.rowHeight) || this._rhMin || 3;
				
				var rpp = this._defaultRowsPerPage;
                
                if (!isNaN(this.scrollboxHeight)) {
                    
                    rpp = Math.ceil(this.scrollboxHeight/this._rh);
                    
                    rpp = Math.max(rpp, this._minRowsPerPage);
                }
            	this._rowsPerPage = rpp;
				this._totalPages = Math.ceil(this._rc/this._rowsPerPage);	
				this._pageHeight = this._rh * this._rowsPerPage;
				this._pageStatus = new Array(this._totalPages);
				this._numPagesRendered = 0;
			},

            
            onscroll: function onscroll() {
                
                if (!this._renderingRows) {
                    this._startPageRenderThread();
                }
            },

            
            _startPageRenderThread: function startRndrThd() {
            
                this.renderingRows = true;
                var me = this;
                this._renderTimer = self.setInterval(
                                        function(){
                                            
                                            
                                            var pages = me.getPagesToRender();
                                            
                                            if(pages.length > 0) {
                                            	
                                                me.renderPages(pages);
                                            } else {
                                                
                                                me.renderingRows = false;
                                                self.clearInterval(me._renderTimer);
                                                delete me._renderTimer;
                                                
	                                            if(me.isRenderingComplete()) {
													me.postRenderingCleanup();
												}
                                                me = null;
                                            } 
                                        },
                                        this.renderPause
                                    );
            },

            
            getPagesToRender: function getPagesToRender() {
                var pages = [],
	                pageSize  = this._pageHeight,
	                tBodies = null,
	                stats = this._pageStatus,
	                me = this;
	                
                
                function pageHeight(idx) {
                	
                	var stat = stats[idx];
                	if (stat && stat.filled) {
                		
                		if (!stat.height) {
                			if (!tBodies) tBodies = me.itemsNode.tBodies;
                			stat.height = tBodies[idx].offsetHeight;
            			}
                		return stat.height;
                	} else {
                		
                		return pageSize;
                	}
                }

                
                
                var y = 0,
                	topPageIdx = null,
                	bottomPageIdx = null,
                	scrollTop = this.scrollboxTop;
                for (var i=0, len=this._totalPages; i<len; i++) {
                	y += pageHeight(i);
                	if (y >= scrollTop) {
                		topPageIdx = i;
                		break;
                	}
                }
                
                if (topPageIdx == null) {
					
                	topPageIdx = bottomPageIdx = len-1;
                } else {
	            	
	            	var scrollBottom = this.scrollboxBottom;
	            	for (var j=topPageIdx+1; j<len; j++) {
	            		if (y >= scrollBottom) {
	            			bottomPageIdx = j-1;
	            			break;
	            		}
	            		y += pageHeight(j);
	            	}
            	}
            	
            	if (bottomPageIdx == null) {
            		bottomPageIdx = len-1;
            	}
				
				
				
				for(var n=this._numPagesRendered;n<topPageIdx;++n) {
					pages.push({idx: n, fill: false});
				}                	
				
				
				
				for (var m=topPageIdx;m<=bottomPageIdx;++m) {
					var stat = stats[m];
					if (!stat || !stat.filled) {
						pages.push({idx: m, fill: true});
					}
				}

                return pages;
            },            

            
            renderPages: function renderPages( pages) {
                for(var i = 0, len = pages.length; i < len; ++i) {
                    this.renderPage(pages[i].idx, pages[i].fill);
                }
            },

            
            renderPage: function renderPage( idx,  bFillCells) {
            	
            	var arrStatus = this._pageStatus,
            		alreadyRendered = (this._numPagesRendered >= idx+1);
        		if (alreadyRendered) {
        			
        			
        			if (!bFillCells || (arrStatus[idx] && arrStatus[idx].filled)) return;
    			}

                
                var rpp = this._rowsPerPage,
					start = idx * rpp,
                	end = Math.min(start + rpp, this._rc) - 1; 
                
                
                
                var tempTableCont = this.tempTableCont;
                if (!tempTableCont) {
                	tempTableCont = this.tempTableCont = this.domNode.ownerDocument.createElement('div');
            	}
                var tInnerHTML = bFillCells ?
                					
									
									
                					this._buildItemsMarkup(
										start, 
										end, 
										'<table><tbody idx="' + idx + '">',
										'</tbody></table>',
										this._itemPrefix && this._itemPrefix(),
										this._itemSuffix && this._itemSuffix()).join('') 
									:
									
                					'<table><tbody idx="' + idx + '"><tr><td style="height:' + this._pageHeight + 'px">&nbsp;</td></tr></tbody></table>';
                tempTableCont.innerHTML = tInnerHTML; 
                
                
                var tbody = tempTableCont.firstChild.tBodies[0],
                	tn = this.itemsNode;
                
                
                
                if (!alreadyRendered) {
	                tn.appendChild(tbody);
                } else {
                	
                	tn.replaceChild(tbody, tn.tBodies[idx]);
                }
                                
                
                this.postRenderPage(idx, bFillCells);
            },

			postRenderPage: function pstRndPg( idx,  bFillCells) {
                
                if (idx+1 > this._numPagesRendered) this._numPagesRendered = idx+1;
                
                var arr = this._pageStatus,
                	status = arr[idx];
                if (!status) {
                	
                	status = arr[idx] = {};
                }
                if (bFillCells) {
                	
                	status.filled = true;
                }

	            
	            
	            
                if (idx >0 && idx == this._totalPages-1) {
					this.itemsContainerNode.style[mstrmojo.css.MINHEIGHT] = '';
				}
			},

	        
            isRenderingComplete: function isRdrComplete() {
                
                if (this._numPagesRendered == this._totalPages) {
                	
                	
                	for (var arr=this._pageStatus, i = this._totalPages-1; i >-1; i--) {
                		if (!arr[i] || !arr[i].filled) return false;
                	}
                	return true;
                }
                return false;
            },

            
            postRenderingCleanup: function pstRndClnup() {
            	
                if (this.connectedScrollbox) {
                	this.disconnectScrollbox(this);
                	this.connectedScrollbox = false;
            	}
            },
            
            unrender: function(ignoreDom){
            	this.postRenderingCleanup();
            	this._super(ignoreDom);
            },
            
            refresh: function refresh() {
            	if (!this.hasRendered) return;

            	var d = this.domNode,
            		p = d && d.parentNode;
            	
            	
            	if (!this.parent && p) {
            		var elTemp = d.ownerDocument.createElement('span');
            		p.insertBefore(elTemp, d);
            	}

            	this.unrender();
            	
            	
            	
            	if (!this.parent && p) {
            		this.domNode = elTemp;
            	}

            	this.render();

                           
            	
            	if (this.defn && this.defn.set) {
            		this.defn.set('readyState', mstrmojo.EnumReadystate.IDLE);
            	}
            }


		}
	);
})();			
(function(){

	mstrmojo.requiresCls("mstrmojo.ListBase", "mstrmojo._ListSelections");
	
	mstrmojo.ListBoxHoriz = mstrmojo.declare(
		
		mstrmojo.ListBoxBase,
		
		
		[mstrmojo._ListSelections],
		
        
		{
			scriptClass: "mstrmojo.ListBoxHoriz",

			
			cssClass: "mstrmojo-ListBoxHoriz",
			tableCssClass: "mstrmojo-ListBox-table",
			tableCssText: "",
			rowCssClass: "",
			rowCssText: "",
			cellCssClass: "",
			cellCssText: "",
			cellSpacing: 0,
			cellPadding: 0,
			
			_markupPrefix: function() {
				var ir = this.itemRenderer;
				return (ir && ir.markupPrefix) ||
						('<table class="' 
							+ this.tableCssClass 
							+ '" style="' + this.tableCssText 
							+ '" cellspacing="' + this.cellSpacing + '" cellpadding="' + this.cellPadding + '"><tbody>'
							+ '<tr class="' + this.rowCssClass 
							+ '" style="' + this.rowCssText 
							+ '">');
			},
			_markupSuffix: function() {
				var ir = this.itemRenderer;
				return (ir && ir.markupSuffix) || '</tr></tbody></table>';
			},
			_itemPrefix: function() {
				var ir = this.itemRenderer;
				return (ir && ir.itemPrefix) ||
						('<td class="' 
								+ this.cellCssClass 
								+ '" style="' + this.cellCssText + '">');
			},
			_itemSuffix: function() {
				var ir = this.itemRenderer;
				return (ir && ir.itemSuffix) || '</td>';
			},
            _getItemNode: function(idx) {
                if (idx < 0) return null;
                
                
                var t = this.itemsNode,
                    r = t && t.rows[0];
                return r && r.cells[idx].firstChild;
            }
		}
	);
	
})();			
(function(){
	
	mstrmojo.requiresCls("mstrmojo.ListBox",
						 "mstrmojo.ListBoxHoriz");

	
	var inputListItemRenderer = {
		
		render: function(item, idx, widget) {
			var id = (widget.htmlName + idx),
				chk = widget.selectedIndices[idx] ? 'checked ' : '',
				selected = chk ? ' selected' : '',
				nAll = item.v != "u;" ? " nAll" : "";
			
			return '<div class="' + widget.itemCssClass + selected + nAll + '">' + 
						'<input type="' + widget.inputType + '"' + 
							' name="' + widget.htmlName + '"' +
							' id="' + id + '"' + 
							' value="' + idx + '" ' + chk + '/>' + 
						'<label for="' + id + '" title="' + (item[widget.itemTitleField] || '')  + '" style="' + widget.labelCssText + '">' + 
							item[widget.itemDisplayField || 'n'] +
							 
						'</label>' + 
					'</div>';
		},

        select: function(el,  item,  idx,  widget) {
        	var elI = el && el.firstChild;
        	if (elI && !elI.checked) {
        		elI.checked = true;
        	}
        	mstrmojo.css.toggleClass(el, 'selected', elI.checked);
		},
        
        unselect: function(el,  item,  idx,  widget) {
        	var elI = el && el.firstChild;
        	if (elI && elI.checked) {
        		elI.checked = false;
        	}
        	mstrmojo.css.toggleClass(el, 'selected', elI.checked);
        },
		
		rowHeight: 23
	};

	
	mstrmojo._RendersInputItems = {
		
		inputType: null,
		
		
		htmlName: null,
		
								
		itemRenderer: inputListItemRenderer,
		
		
		init: function( props) {
			this._super(props);

			if (!this.htmlName) {
				this.htmlName = this.id;
			}
		},
			
		
		preclick: function(evt){
			
			var hWin = evt.hWin,
                e = evt.e,
                el = mstrmojo.dom.eventTarget(hWin, e);
			
			
			if (el && el.nodeName.match(/input/i)) {
				
				var idx = parseInt(el.value, 10);
				
				
				if (this.inputType && this.inputType.match(/radio/i)) {
					
					this.singleSelect(idx);
				} else {
					
					var m = (el.checked) ? 'add' : 'remove';
					this[m + 'Select'](idx);
				}
			}
		}
	};
	
	
	mstrmojo._InputList = mstrmojo.declare(
		
		mstrmojo.ListBox,
		
		
		[ mstrmojo._RendersInputItems ],
		
		
		{
			scriptClass: "mstrmojo._InputList"
		}
	);
			
	
	mstrmojo._InputListHoriz = mstrmojo.declare(
		
		mstrmojo.ListBoxHoriz,
		
		
		[ mstrmojo._RendersInputItems ],
		
		
		 {
			scriptClass: "mstrmojo._InputListHoriz"
		 }
	 );

})();
(function(){

	mstrmojo.requiresCls("mstrmojo._InputList", "mstrmojo._InputListHoriz", "mstrmojo.hash");


			
	mstrmojo.CheckList = mstrmojo.declare(
		
		mstrmojo._InputList,
		
		null,
		
		{
			scriptClass: "mstrmojo.CheckList",
			inputType: "checkbox",
			cssClass: "mstrmojo-CheckList",
            itemCssClass: "mstrmojo-CheckList-item"
		}
	);	

	mstrmojo.requiresCls("mstrmojo._InputListHoriz");
			
	mstrmojo.CheckListHoriz = mstrmojo.declare(
		
		mstrmojo._InputListHoriz,
		
		null,
		
		{
			scriptClass: "mstrmojo.CheckListHoriz",
			inputType: "checkbox",
			cssClass: "mstrmojo-CheckListHoriz",
            itemCssClass: "mstrmojo-CheckListHoriz-item"
		}
	);	
})();
(function(){

    mstrmojo.requiresCls("mstrmojo.Widget");
    
    mstrmojo.Label = mstrmojo.declare(
        
        mstrmojo.Widget,
        
        null,
        
        {
            scriptClass: "mstrmojo.Label",
            
            
            text: null,

            markupString: '<div id="{@id}" class="mstrmojo-Label {@cssClass}" style="{@cssText}" mstrAttach:click>' + 
                          '</div>',
            
                        
            cssDisplay: 'block',
                          
            markupMethods: {
                ontextChange: function(){ this.domNode.innerHTML = (this.text != null) ? this.text : ''; },
                oncssTextChange: function() { this.domNode.style.cssText = (this.cssText != null) ? this.cssText : ''; },
                onvisibleChange: function(){ this.domNode.style.display = this.visible ? this.cssDisplay : 'none'; }
            },
            
            

            
            autoHide: false,            
            
            
            _set_text: function sttxt(n, v) {
                if (this.autoHide) {
                    this.set('visible', (v!=null) && (v!=="")); 
                }
                var was = this.text;
                this.text = v;
                return was != v;
            }
        }
    );
    
})();
(function () {

    mstrmojo.requiresCls("mstrmojo.Widget", "mstrmojo.css");

    var _C = mstrmojo.css;

    
    function _hideEmpty(me) {
        var el = me.inputNode;

        var v = (me.value != null) ? String(me.value) : '';

        if (v !== el.value) {
            el.value = v;
        }
        if (el.mstrmojoEmpty) {
            _C.removeClass(el, [me.emptyClass]);
            el.mstrmojoEmpty = null;
        }
    }

    
    function _showEmpty(me) {
        var el = me.inputNode;
        el.value = me.emptyText || '';
        _C.addClass(el, [me.emptyClass]);
        el.mstrmojoEmpty = true;
    }

    
    function _dom2value(me) {
        var inputNode =  me.inputNode;
        if(inputNode) {
            me.readingDom = true; 
            me.set("value",  inputNode.value);
            me.readingDom = false;
        }
    }

    var _KEYCODENAME = {
        9: 'Tab',
        13: 'Enter',
        27: 'Esc',
        38: 'ArrowUp',
        40: 'ArrowDown'
    };

    
    mstrmojo.TextBox = mstrmojo.declare(
        
        mstrmojo.Container,

        
        null,

        
        {
            scriptClass: 'mstrmojo.TextBox',

            
            value: '',

            
            type: 'text',

            
            hint: '',

            
            readOnly: false,

            
            size: '',

            
            maxLength: '',

            cssDisplay: 'inline',

            
            tabIndex: '',

            
            autoComplete: true,
            autoCorrect: true,
            autoCapitalize: true,
            
            placeholderText: '',

            markupString: '<input id="{@id}" placeholder="{@placeholderText}" class="mstrmojo-TextBox {@cssClass}"  style="{@cssText}" ' +
                                 'title="{@tooltip}" type="{@type}" ' +
                                 'value="" size="{@size}" maxlength="{@maxLength}" index="{@tabIndex}"' +
                                 'min="{@min}" max="{@max}" placeholder="{@hint}"' +
                                 ' mstrAttach:focus,keyup,blur,paste,cut,input,click ' +
                              '/>',

            markupSlots: {
                inputNode: function () { return this.domNode; }
            },

            markupMethods: {
                onvisibleChange: function () { this.domNode.style.display = this.visible ? this.cssDisplay : 'none'; },
                oncssClassChange: function () { this.inputNode.className = "mstrmojo-TextBox " + (this.cssClass || ''); },
                onhintChange: function () { this.inputNode.setAttribute('placeholder', this.hint); },
                onenabledChange: function () {
                    this.inputNode.disabled = !this.enabled;
                    mstrmojo.css.toggleClass(this.inputNode, 'disabled', !this.enabled);
                },
                onvalueChange: function () {
                    
                    var v = this.value,
                        em = (v === null) || (v === "");

                    
                    if (em) {
                        
                        
                        if (!this.hasFocus) {
                            _showEmpty(this);
                        } else {
                            this.inputNode.value = "";
                        }
                    } else {
                        _hideEmpty(this);
                    }
                },
                ontooltipChange: function () {
                    this.domNode.title = this.tooltip;
                },
                onreadOnlyChange: function () { this.inputNode.readOnly = this.readOnly; }
            },

            
            emptyText: '',

            
            emptyClass: 'mstrmojo-empty',

            postBuildRendering: function postBuildRendering() {
                this._super();

                
                var e = this.inputNode;
                e.setAttribute("autocomplete", this.autoComplete ? "on" : "off");
                e.setAttribute("autocorrect", this.autoCorrect ? "on" : "off");
                e.setAttribute("autocapitalize", this.autoCapitalize ? "on" : "off");
            },

            focus: function focus() {
                this.inputNode.focus();
            },

            
            prefocus: function prefocus() {
                this.hasFocus = true;
                
                _hideEmpty(this);
            },

            
            preblur: function preblur() {
                window.setTimeout(function () {
                    
                }, 200);
                this.hasFocus = false;
                _dom2value(this);
                var v = this.value;
                if ((v === null || v === "") && this.emptyText) {
                    
                    _showEmpty(this);
                }
            },

            
            prekeyup: function pku(evt) {
                
                var hWin = evt.hWin,
                    e = evt.e || hWin.event;

                _dom2value(this); 
                var n = _KEYCODENAME[e.keyCode];
                if (this['on' + n]) {
                    this['on' + n](evt);
                }
            },
            
            
            preinput: function pku(evt) {
                
                var hWin = evt.hWin,
                    e = evt.e || hWin.event;

                _dom2value(this); 
            },
            

            
            prepaste: function prepaste() {
                this.delaySetValue(this);
            },

            
            precut: function precut() {
                this.delaySetValue(this);
            },

            
            delaySetValue: function delaySetValue(tgt) {
                window.setTimeout(function () {
                    _dom2value(tgt);
                }, 100);
            },

            
            setInvalidState: function setInvalidState(msg) {
                
                mstrmojo.css.addClass(this.inputNode, ['err']);

                
                if (msg) {
                    
                    this.domNode.setAttribute('title', msg);
                }
            },

            
            cleanUp: function cleanUp() {
                
                this.inputNode.value = '';

                
                mstrmojo.css.removeClass(this.domNode, ['err']);

                
                this.domNode.setAttribute('title', this.tooltip);
            }
        }
    );

}());
 (function () {

    mstrmojo.requiresCls("mstrmojo.Container",
                         "mstrmojo.func",
                         "mstrmojo.array",
                         "mstrmojo.Button",
                         "mstrmojo.HBox",
                         "mstrmojo.dom",
                         "mstrmojo.Box");

    var $FNC = mstrmojo.func.composite,
        $D = mstrmojo.dom;


    
    mstrmojo.Dialog = mstrmojo.declare(

        mstrmojo.Container,

        null,

        
        {
            scriptClass: "mstrmojo.Dialog",

            
            title: '',

            
            buttons: null,

            
            alignment: 'center',

            
            btnAlignment: 'right',

            
            zIndex: 10,

            
            modal: true,

            markupString: '<div id="{@id}" class="mstrmojo-Dialog {@cssClass}" tabindex="0" mstrAttach:click>' +
                              '<div class="win mstrmojo-Editor" style="{@cssText}">' +
                                  '<div class="mstrmojo-Editor-titlebar"><div class="mstrmojo-Editor-title">{@title}</div></div>' +
                                  '<div class="mstrmojo-Editor-content"></div>' +
                                  '<div class="mstrmojo-Editor-buttons"></div>' +
                              '</div>' +
                              '<div class="mstrmojo-Editor-curtain"></div>' +
                              '<div class="mstrmojo-Editor-tip"></div>' +
                          '</div>',

            markupSlots: {
                editorNode: function () { return this.domNode.firstChild; },
                curtainNode: function () { return this.domNode.childNodes[1]; },
                titleNode: function () { return this.domNode.firstChild.firstChild; },
                containerNode: function () { return this.domNode.firstChild.childNodes[1]; },
                buttonNode: function () { return this.domNode.firstChild.lastChild; },
                tipNode: function () { return this.domNode.lastChild; }
            },

            markupMethods: {
                onzIndexChange: function () {
                    this.editorNode.style.zIndex = this.zIndex;
                    this.curtainNode.style.zIndex = this.zIndex - 1;
                },
                onwidthChange: function () {
                    this.editorNode.style.width = this.width || 'auto';
                },
                onvisibleChange: function (init) {
                    if (init) {
                        return;
                    }

                    var v = this.visible,
                        d = v ? 'block' : 'none';

                    this.editorNode.style.display = d;

                    if (this.modal) {
                        this.curtainNode.style.display = d;
                    }
                },
                onleftChange: function () { this.editorNode.style.left = this.left || ''; },
                ontopChange: function () { this.editorNode.style.top = this.top || ''; },
                ontitleChange: function () { this.titleNode.firstChild.innerHTML = this.title || ''; }
            },

            preBuildRendering: function preBuildRendering() {
                var b;

                
                var buttons = this.buttons;
                if (buttons && !this.btnHbox) {

                    
                    for (b in buttons) {
                        buttons[b].cssClass = 'mstrmojo-Editor-button';
                    }

                    
                    this.addChildren([{
                        scriptClass: 'mstrmojo.HBox',
                        cssText: 'float:' + this.btnAlignment,
                        slot: 'buttonNode',
                        alias: 'btnHbox',
                        children: buttons
                    }, {
                        scriptClass: 'mstrmojo.Label',
                        cssClass: 'mstrmojo-clearMe',
                        slot: 'buttonNode'
                    }]);
                }

                
                if (this.modal) {
                    
                    this.cssClass += ' modal';
                }

                
                return this._super();
            },

            buildRendering: function buildRendering() {
                
                var ph = this.placeholder;
                
                
                if (this._super()) {
                	
                    if (!this.parent && !ph) {
                        
                        document.body.appendChild(this.domNode);
                    }
                    
                    return true;
                }

                return false;
            },

            
            getResizeHandler: function getResizeHandler() {
                var id = this.id;
                return function () {
                    var dialog = mstrmojo.all[id];
                    dialog.resizeDialog();
                    dialog.positionDialog();
                };
            },

            postBuildRendering: function postBuildRendering() {
                this._super();

                
                if (this.modal && this.visible) {
                    
                    this.curtainNode.style.display = 'block';
                }

                
                if (!this._resizeHandler) {
                    
                    var fn  = this._resizeHandler = this.getResizeHandler();

                    
                    $D.attachEvent(window, 'resize', fn);
                }

                
                this.resizeDialog();
                this.positionDialog();

                
                this.domNode.focus();

                return true;
            },

            
            resizeDialog: function resizeDialog() {
                
                if (this.modal) {
                    
                    this.resizeCurtain();
                }
            },

            
            resizeCurtain: function resizeCurtain() {
                var w = this,
                	curtainNode = w.curtainNode,
                    body = document.body,
                    docElement = document.documentElement,
                    cs = curtainNode.style,
                    curtainPosition = w.curtainPosition;

                
                cs.width = Math.max(body.clientWidth, docElement.scrollWidth) + 'px';
                
                if (curtainPosition && curtainPosition.h) {
                	cs.height = curtainPosition.h + 'px';
                } else {
                	cs.height = Math.max(body.clientHeight, docElement.scrollHeight) + 'px';
                }
                
                if (curtainPosition && curtainPosition.y) {
                	cs.top = curtainPosition.y + 'px';
                }
                
                w.raiseEvent({name: 'resizeCurtain'});
            },

            
            positionDialog: function positionDialog() {
                
                if (!this.left || !this.top) {
                    var editor = this.editorNode;

                    
                    $D.center(editor);

                    
                    if (this.alignment === 'top') {
                        
                        editor.style.top = '10px';
                    }
                }
            },

            destroy: function (ignoreDom) {
                
                var fn = this._resizeHandler;
                if (fn) {
                    
                    $D.detachEvent(window, 'resize', fn);
                }

                this._super(ignoreDom);
            }
        }
    );

    
    if (window.mstrConfig && !window.mstrConfig.simpleDialog) {

        
        mstrmojo.confirm = function confirm(msg, buttons, title) {
            var id = 'mojoConfirmx9',
                fnDestroy = function () {
                    mstrmojo.all[id].destroy();
                };

            
            mstrmojo.array.forEach(buttons, function (btn) {
                var fn = btn.onclick;
                btn.onclick = fn ? $FNC([ fnDestroy, fn ]) : fnDestroy;
            });

            
            mstrmojo.insert({
                scriptClass: 'mstrmojo.Dialog',
                id: id,
                title: title || mstrmojo.desc(3610),
                width: '475px',
                buttons: buttons,
                children: [{
                    scriptClass: 'mstrmojo.Label',
                    text: msg
                }]
            }).render();
        };

        
        mstrmojo.alert = function alrt(msg, fn, title) {

            var id = 'mojoAlertx9';

            try {
                
                
                mstrmojo.all[id].destroy();
            } catch (e) { }

            mstrmojo.insert({
                scriptClass: 'mstrmojo.Dialog',
                id: id,
                title: title || mstrmojo.desc(3610),     
                width: '475px',
                buttons: [ mstrmojo.Button.newInteractiveButton(mstrmojo.desc(1442), function () {       
                    mstrmojo.all.mojoAlertx9.destroy();
                    if (fn) {
                        fn();
                    }
                }, '#666666')],
                children: [{
                    scriptClass: 'mstrmojo.Label',
                    text: msg
                }]
            }).render();
        };

        
        mstrmojo.toast = function toast(msg, duration) {

            var id = 'mojoToast9',
                dom,
                time = duration || 3000;
            
            try {
                mstrmojo.all[id].destroy();
            } catch (e) { }

            mstrmojo.insert({
                id: id,
                scriptClass: 'mstrmojo.Label',
                cssClass: 'toastCss',
                text: msg
            }).render();

            dom = mstrmojo.all[id].domNode;

            
            document.body.appendChild(dom);
            $D.bottomCenter(dom);

            window.setTimeout(function () {
                mstrmojo.all[id].destroy();
            }, time);
        };
        
        mstrmojo.mask = {};
        
        mstrmojo.mask.show = function () {
        	mstrmojo.mask.win = mstrmojo.insert({
        		scriptClass: 'mstrmojo.Box',
        		cssClass: 'fullscreen-mask'
             });
        	mstrmojo.mask.win.render();
            document.body.appendChild(mstrmojo.mask.win.domNode);
        };

        mstrmojo.mask.hide = function() {
             mstrmojo.mask.win.destroy();
        };
    }

}());
(function(){

    mstrmojo.requiresCls(
        "mstrmojo.Obj",
        "mstrmojo._LoadsScript",
        "mstrmojo._HasChildren",
        "mstrmojo.Binding",
        "mstrmojo._HasBindings");
    
    
    mstrmojo.Model = mstrmojo.declare(
        
        mstrmojo.Obj,

        
        [mstrmojo._LoadsScript, mstrmojo._HasChildren, mstrmojo._HasBindings],
                
        
        {
            
            scriptClass: "mstrmojo.Model",


            
            init: function init(props) {            
                this._super(props);

                
                if (this.children) {
                    this.initChildren();
                }
                
                
                
                
                if (!this.parent){
                    this.initBindings();
                }
            },
            
            
            destroy: function dst(skipCleanup) {
                if (this.children) {
                    this.destroyChildren(true);
                }
                if (this.bindings) {
                    this.destroyBindings();
                }
                this._super(skipCleanup);
            }
        }
    );
    
})();
(function(){

    mstrmojo.requiresCls("mstrmojo.Obj");
    
    mstrmojo.StepperContentProvider = mstrmojo.declare(
        
        mstrmojo.Obj,
        
        
        null,
        
        {
            scriptClass: "mstrmojo.StepperContentProvider",
            
            
            item: null,
            
            
            renderer: null,
            
            
            min: null,
            
            
            max: null,
            
            
            interval: 1,

            
            minField: "min",
            
            
            maxField: "max",
            
            
            valField: "value",
            
            
            intField: "interval",
            
            
            canLoop: false,
            
            
            next: mstrmojo.emptyFn,
            
            
            prev: mstrmojo.emptyFn,
            
            
            hasPrev: mstrmojo.emptyFn,
            
            
            hasNext: mstrmojo.emptyFn,
            
            
            renderItemAt: mstrmojo.emptyFn
        }
    );
}());           
(function(){

    mstrmojo.requiresCls("mstrmojo.StepperContentProvider");
    
    
    function has(cp, direction) {
        
        var boundary = direction ? cp.max : cp.min,
            altBoundary = direction ? cp.min : cp.max,
            newVal = cp.getVal(direction ? 1 : -1);
        
        return (
                boundary === null ||
                
                (direction ? (newVal <= boundary) : (newVal >= boundary)) ||
                
                (altBoundary !== null && cp.canLoop));
    }
    
    
    function traverse(cp, direction) {
        var min = cp.min,
            max = cp.max,
            multiplier = direction ? 1 : -1,
            newVal = cp.getVal(multiplier),
            loop = cp.canLoop,
            isOutOfBounds = direction ? (max !== null && newVal > max) : (min !== null && (newVal < min));
        
        
        if(isOutOfBounds) {
            
            if (loop) {
                newVal = ((newVal - min) % (max - min + 1)) + min;
                newVal = (newVal >= min) ? newVal : newVal + (max - min + 1); 
            } else {
                return;
            }
        }
        
        
        cp.curVal = newVal;
        
        
        cp.item[cp.valField] = cp.curVal;
        
        
        if (cp.onTraverse){
            cp.onTraverse();
        }
    }
    
    
    mstrmojo.NumStepperContentProvider = mstrmojo.declare(
        
        mstrmojo.StepperContentProvider,
        
        
        null,
        
        
        {
            scriptClass: "mstrmojo.NumStepperContentProvider",
            
            curVal: null,
            
            
            init: function(props){
                
                this._super(props);
                
                
                this.initProps(props);
            },
            
            
            initProps: function initProps() {
                var minVal = this.isInfinite(this.minField)?  null:this.item[this.minField],
                    maxVal = this.isInfinite(this.maxField)?  null:this.item[this.maxField];
                    intVal = this.item[this.intField];
                
                if(minVal !== null && typeof minVal !== undefined) {
                    this.min = minVal;
                }

                if(maxVal !== null && typeof maxVal !== undefined) {
                    this.max = maxVal;
                }
                    
                if(intVal !== null && typeof intVal !== undefined) {
                   this.interval = intVal;
                }
                
                this.curVal = this.item[this.valField];
                if( this.curVal === null || typeof this.curVal === 'undefined') {
                    
                    this.curVal = (this.min !== null) ? this.min : 0;
                }
            },
            
            
            isInfinite: function isInfinite(fieldName){
                return (typeof fieldName === 'undefined' || fieldName === null || this.item[fieldName] === null || typeof this.item[fieldName] === 'undefined');
            },
            
            
            next: function(){
                traverse(this, true);
            },
            
            
            prev: function(){
                traverse(this, false);
            },
            
            
            hasPrev: function(){
                return has(this, false);
            },
            
            
            hasNext: function(){
                return has(this, true);
            },
            
            
            renderItemAt: function(delta){
                
               var val = this.getVal(delta);
               
               
               return (this.renderer)? this.renderer.render(val, this) : val;
            },
            
            
            getVal: function(delta){
                
               delta = (delta)? delta: 0;
               
               
               return this.curVal + this.interval * delta;
            }
        }
    );
}());           
(function(){

    mstrmojo.requiresCls("mstrmojo.NumStepperContentProvider", "mstrmojo.date");
    
    var $D = mstrmojo.date;
    
    mstrmojo.DateStepperContentProvider = mstrmojo.declare(
        
        mstrmojo.StepperContentProvider,
        
        
        null,
        
        
        {
            scriptClass: "mstrmojo.DateStepperContentProvider",
            
            curVal: null,
            
            init: function(props){
                this._super(props);
                
                
                var item = this.item,
                    intVal = item[this.intField],
                    val = item[this.valField],
                    minF = this.minField,
                    maxF = this.maxField,
                    min = item[minF],
                    max = item[maxF];
                
                
                this.min = min && $D.getDateFromDateInfo(min);
                this.max = max && $D.getDateFromDateInfo(max);
                
                
                this.curVal = val ? $D.getDateFromDateInfo(val) : (this.min ? new Date(this.min) : new Date());
                
                
                this.createChildProviders();
            },
            
            
            
            
            
            createChildProviders: function(){
                var me = this;
                
                mstrmojo.array.forEach(['year', 'month', 'day'], function(n){
                    me[n + 'CP'] = new mstrmojo.NumStepperContentProvider({
                                        item: { interval:1 },
                                        canLoop: true,
                                        updateConfig: function(v, max, min){
                                            this.curVal = v;
                                            this.max = max;
                                            this.min = min;
                                        },
                                        onTraverse: function(){
                                            
                                            me.traverse(n, this.curVal);
                                        }
                                    });
                });
                
                this.updateChildProviders();
            },
            
            
            updateChildProviders: function(){
                var max = this.max,
                    min = this.min,
                    year = this.curVal.getFullYear(),
                    month = this.curVal.getMonth(),
                    day = this.curVal.getDate(),
                    
                    atMaxYear = max && (year === max.getFullYear()),
                    atMinYear = min && (year === min.getFullYear()),
                    
                    atMaxMonth = atMaxYear && (month === max.getMonth()),
                    atMinMonth = atMinYear && (month === min.getMonth());
                
                
                this.yearCP.updateConfig(year, max ? max.getFullYear() : null, min ? min.getFullYear() : null);
                
                
                this.monthCP.updateConfig(month + 1, atMaxYear ? max.getMonth() + 1 : 12, atMinYear ? min.getMonth() + 1 : 1);
                
                
                this.dayCP.updateConfig(day, atMaxMonth ? max.getDate() : mstrmojo.date.getDaysOfMonth(year, month + 1), atMinMonth ? min.getDate() : 1);
            },
            
            
            traverse: function(field, value){
            
                var v = this.curVal,
                    y = (field === 'year') ? value : this.curVal.getFullYear(),
                    m = (field === 'month') ? value : this.curVal.getMonth() + 1, 
                    d = (field === 'day') ? value : this.curVal.getDate();
                
                
                d = Math.min(mstrmojo.date.getDaysOfMonth(y, m), d);
                
                
                v.setFullYear(y, m - 1, d);
                
                
                if (this.max){
                    v = Math.min(this.max, v); 
                }
                if (this.min){
                    v = Math.max(this.min, v); 
                }
                
                this.curVal = new Date(v);
                
                this.updateChildProviders(); 
                
                if (this.onTraverse){
                    this.onTraverse();
                }
            }
        }
    );
}());           
(function () {

    mstrmojo.requiresCls(
        "mstrmojo.Widget"
    );
    
    var HOLD_INTERVAL = 50,
        HOLD_THRESHOLD = 500;
    
    
    mstrmojo.Stepper = mstrmojo.declare(
        
        mstrmojo.Widget,
            
        
        null,
            
        {

            scriptClass: "mstrmojo.Stepper",
            
            
            orientation: 'vertical',
            
            
            provider: null,
            
            
            title: '',
            
            markupString:   '<div id="{@id}" class="mstrmojo-Stepper {@orientation} {@cssClass}" mstrAttach:click,mousedown,mouseup,selectstart>' +
                                '<div class="title">{@title}</div>' +
                                '<div class="next">+</div>' +
                                '<div class="text">{@itemHtml}</div>' +
                                '<div class="prev">-</div>' +
                            '</div>',
                            
            markupSlots: {
                titleNode: function() { return this.domNode.firstChild; },
                nextNode: function () { return this.domNode.children[1]; },
                textNode: function () { return this.domNode.children[2]; },
                prevNode: function () { return this.domNode.lastChild; }
            },
            
            
            preBuildRendering: function preBuildRendering() {
                
                this.itemHtml = this.provider.renderItemAt();
                
                
                this._super();
            },
            
            
            processEvent: function processEvent(target) {
                
                if (target === this.textNode || target === this.titleNode) {
                    
                    return;
                }
                
                var provider = this.provider,
                    mthd = ((target === this.nextNode) ? 'Next' : 'Prev');

                
                if (provider['has' + mthd]()) {
                    
                    provider[mthd.toLowerCase()]();
                    
                    
                    this.updateDisplayText();
                }
            },
            
            
            updateDisplayText: function updateDisplayText(){
                this.textNode.innerHTML = this.provider.renderItemAt();
            },
            
            
            startStepperInterval: function startStepperInterval(evt, fn) {
                var me = this;
                
                this._holdTimer = setInterval(function () {
                    
                    me[fn](evt);
                }, HOLD_INTERVAL);
            },
            
            
            stopStepperInterval: function stopStepperInterval() {
                
                if (this._holdTimer) {
                    clearInterval(this._holdTimer);
                    delete this._holdTimer;
                }
            },
            
            
            onclick: function onclick(evt) {
                this.processEvent(evt.e.target);
            },
    
            
            onmousedown: function onmousedown(evt) {
                
                if (!this._holdTimer && !this._startHoldTimer) {
                    var me = this;
                    
                    this._startHoldTimer = setTimeout(function () {
                        
                        delete me._startHoldTimer; 
                        
                        
                        me.startStepperInterval(evt, 'onclick');
                        
                    }, HOLD_THRESHOLD);
                }
            },
            
            
            onmouseup: function onmouseup() {
                
                if (this._startHoldTimer) {
                    clearTimeout(this._startHoldTimer);
                    delete this._startHoldTimer;
                }
                
                
                this.stopStepperInterval(this);
            },
            
            
            onselectstart: function onselectstart() {
                return false;
            }
        }
    );
}());
(function(){

    mstrmojo.requiresCls( "mstrmojo.publisher",
    					"mstrmojo.Widget",
                         "mstrmojo.fx",
                         "mstrmojo.locales",
                         "mstrmojo.expr",
                         "mstrmojo.date",
                         "mstrmojo.css");
    
    var _DT = function(){ return mstrmojo.locales.datetime; },
        $D = mstrmojo.dom,
        $E = mstrmojo.expr,
        DTP = $E.DTP,
        $P = mstrmojo.date,
        _P = mstrmojo.publisher,
        $H = mstrmojo.hash,
        $A = mstrmojo.array,
        $RMV = $A.removeIndices,
        $C = mstrmojo.css;
    
    var _pre_table = '<table border="0" cellpadding="0" cellspacing="0">',
        _post_table = '</table>';
    function _pre_table_with_style(style){
    	return '<table border="0" cellpadding="0" cellspacing="0" style="' + style + '">';
    }
    function _getLeadingBlanks(y,m,fdw){
        var fd = $P.getFirstDateOfMonth(y,m);
        return (fd.getDay() - fdw + 8) % 7;
    }
    
    
    function parseDateAndTimeToJSON(value) {
        
        var dt = $P.parseDateAndOrTime(value),
            d, t, r;
        
        
        if(dt){
            
            r = {};
            d = dt.date;
            t = dt.time;
            if(d) {
                $H.copy(d, r);
            }
            if(t) {
                $H.copy(t, r);
            }
        }
        
        
        return r;
    }
    
    
    
    function isDateInDateTimeRange(day, month, year, min, max) {
        var d = $P.formatDateInfo({day: day, month: month, year: year}, _DT().DATEOUTPUTFORMAT);
        
        return $P.inDateTimeRange(d, min, max) == 0;
    }
    
    
    function updateTraversalIcons(widget, prev, next) {
        var db = widget.decreaseButton,
            ib = widget.increaseButton,
            cssPrefix = 'mstrmojo-Calendar',
            updateCSS = function (node, className, date) {
                
        		var disabled = !isDateInDateTimeRange(date.d, date.m, date.y, widget.min, widget.max);
                node.className = (cssPrefix + className) + (disabled ? ' disabled' : '');
                node.disabled = disabled; 
            };

        
        updateCSS(db, '-decrease', prev);
        updateCSS(ib, '-increase', next);
    }
    
    
    function isDateSelected(selectedDates, day, month, year) {
        var i = 0,
            len = selectedDates.length,
            sd;
    
        for (i = 0; i < len; i++) {
            
            sd = selectedDates[i];
            
            
            if (sd && sd.day === day && sd.month === month && sd.year === year) {
                return i;
            }
        }
        
        return -1;
    }
    
    function isToday(day,month,year){
    	var td = new Date();
    	return (td.getFullYear() == year)
    		&& ((td.getMonth() + 1) == month)
    		&& (td.getDate() == day);
    }
    
    
    function removeSelection(widget, index) {
        var divs = widget.dayView.getElementsByTagName('div'),
            sd = widget.selectedDates,
            date = sd[index],
            by = widget.browseYear,
            bm = widget.browseMonth,
            l = $P.getDaysOfMonth(by, bm), 
            pm = $P.getPreMonth(by,bm),
            pl = $P.getDaysOfMonth(pm.y, pm.m), 
            lb = _getLeadingBlanks(by, bm, widget.firstDayOfWeek),
            inx = ((date.month == bm) ? date.day + lb -1:
                 (date.month > bm ? date.day + lb + l -1 : 
                     lb - pl + date.day -1)),
            d = divs[inx];
        
        
        
        if(d){
           	toggleSelectionStyle(d, widget, false);
        }
        
        
        $RMV(sd, index, 1);
    }
    
    function clearSelection(widget) {
        var sd = widget.selectedDates;
        
        while(sd.length) {
            removeSelection(widget, 0);
        }
    }
    
    function addSelectionByElems(widget, elem) {
        var ymd = getYMDFromElem(widget, elem),
            sds = widget.selectedDates;
        
        sds.push({
            day: ymd.d, 
            month: ymd.m, 
            year: ymd.y
        });
        
        toggleSelectionStyle(elem, widget, true);
    }
    
    function addSelectionByDates(widget, dates) {
        if (!dates || !dates.length) return null;
        var sds = widget.selectedDates;
        for(var i = 0, len = dates.length; i < len; i++) {
            var d = dates[i],
                div = getElemFromDate(widget, d);
            sds.push({
                day: d.d, 
                month: d.m, 
                year: d.y
            });
            
            if (div) {
            	toggleSelectionStyle(div, widget, true);
            }
        }
    }
    
    function getElemFromDate(widget, d) {
        var divs = widget.dayView.getElementsByTagName('div'),
            ldivs = divs.length,
            by = widget.browseYear,
            bm = widget.browseMonth,
            pm = $P.getPreMonth(by,bm),
            pl = $P.getDaysOfMonth(pm.y, pm.m), 
            nm = $P.getNextMonth(by, bm),
            l = $P.getDaysOfMonth(by, bm), 
            lb = _getLeadingBlanks(by, bm, widget.firstDayOfWeek); 
            
        var fdate = lb > 0 ? {y:pm.y , m:pm.m, d:divs[0].innerHTML} : {y:by, m:bm, d:divs[0].innerHTML},
            ldate = (divs.length - l -lb) > 0 ? {y:nm.y, m:nm.m, d:divs[ldivs-1].innerHTML} : {y:by, m:bm, d:divs[ldivs-1].innerHTML},
            diff_fdate = diffDates(fdate, d),
            diff_ldate = diffDates(d, ldate),
            index = null;
        
        
        if (diff_fdate >= 0 && diff_ldate >=0) {
            var ma = 0;
            if (diff_fdate < lb) ma = -1;
            if (diff_ldate < (divs.length - lb -l)) ma = 1;
            index = ((ma == 0) ? d.d + lb - 1 :
                (ma == 1 ? d.d + lb + l - 1 : 
                    lb - pl + d.d -1));
            return divs[index];
        } else {
            return null;
        }
    }
    
    function getShiftSelection(widget, div) {
        var sd = widget.selectedDates,
            length = sd.length;
    
        if (!length) {
            return null;
        }
    
        var ld = sd[length - 1],
            cd = getYMDFromElem(widget, div),
            df = diffDates({y:ld.year, m:ld.month, d:ld.day}, cd),
            selection = [],
            inc = df > 0,
            sz = Math.abs(df);
            
        for(var i= 0;i <= sz; i++){
            var nd = new Date(cd.y, cd.m -1, cd.d);
            nd.setDate(nd.getDate() + (inc?-i:i));
            var y = nd.getFullYear(), m = nd.getMonth() + 1, d = nd.getDate();
            if (widget.isDateDisabled(d, m, y, widget.min, widget.max)) continue;
            selection.push({'y':y,'m':m,'d':d});
        }
        
        return selection;

    }
    
    function diffDates(from, to) {
        var fd = new Date(from.y, from.m - 1, from.d),
            td = new Date(to.y, to.m - 1, to.d);
        
        return (td - fd)/1000/3600/24;
    }
    function getYMDFromElem(widget, elem) {
        var by = widget.browseYear,
            bm = widget.browseMonth,
            d = parseInt(elem.innerHTML,10),
            ma =  parseInt(elem.getAttribute("m"),10)
            ymd = null;
        
        ymd = (ma === 0) ? {y: by, m: bm} : (ma === 1 ? $P.getNextMonth(by,bm) : $P.getPreMonth(by,bm));  
        ymd.d = d;
        return ymd;
    }
    
    
    function getLastSelectedDate(w) {
        var sds = w.selectedDates,
            length = sds.length;
        
        return (length === 0) ? null : sds[length - 1];
    }
    
    function toggleSelectionStyle(elem, widget, select) {
        var c = widget.selectedColor;
        $C.toggleClass(elem,['selected', widget.selectedCssStyle], select);
        elem.parentNode.style.backgroundColor = select?c:'';
        elem.style.backgroundColor = select?c:'';
    }
    
    function selectedStyle(widget){
    	return widget.selectedColor?('style="background-color:'+widget.selectedColor+';"'):'';
    }
    
    function findTarget(t) {
        return (t.tagName.toLowerCase() == 'td') ? t.firstChild : t;
    }
    
    mstrmojo.Calendar = mstrmojo.declare(
        
        mstrmojo.Widget,
        
        null,
        
        
        {
            scriptClass: "mstrmojo.Calendar",
            
            
            cssPrefix: '',
            
            
            browseMonth: null,
            
                        
            browseYear: null,
            
                        
            yearRangStart: null,
            
            
            selectedDates: null,
            
            
            
            selectedColor:'',
            
            isMultiSelect: false,
            
            
            
            hilightToday: false,
            
            
            yearViewSize: 5,
            
            cssTextDay:'',
            cssTextMonth:'',
            cssTextYear:'',
            cssTextWeekDay:'',
            cssTextHeader:'',
            cssTextMonthYearLabel:'',
            
            forceNonEmptySelection: false,
            
            
            showCurMonthDatesOnly:false,
            
            
            currentView: 'day',
            
            
            duration:600,
            
            
            timeDelimiter:':',
            
            
            dtp:DTP.DATE,
            
            
            value: '',
            
            
            firstDayOfWeek: 1, 
            
            
            changeValueOnOK: false,
            
            
            okLabel: mstrmojo.desc(1442,'OK'),
            
            
            monthNames: function(i){return _DT().MONTHNAME_SHORT[i];},
            
            
            dayNames: function(i){return _DT().dayShortNames[i];},
            
            
            min: null,
            
            
            max: null,
            
            
            supportedViews: {
                day: true,
                month: true,
                year: true,
                hour: true,
                minute: true,
                second: true
            },
            
            
            sDirMatrix:{
                day:{'month':'down','year':'down','hour':'up','minute':'up','second':'up'},
                month:{'day':'up','year':'left','hour':'up','minute':'up','second':'up'},
                year:{'day':'up','month':'right','hour':'up','minute':'up','second':'up'},
                hour:{'day':'down','month':'down','year':'down','minute':'left','second':'left'},
                minute:{'day':'down','month':'down','year':'down','hour':'right','second':'left'},  
                second:{'day':'down','month':'down','year':'down','hour':'right','minute':'right'} 
            },
            
            markupString:'<div id="{@id}" class="{@cssPrefix} mstrmojo-Calendar {@cssClass}" style="{@cssText}" mstrAttach:mousedown,mouseup,mouseover,mouseout>' + 
                            '<div class="mstrmojo-Calendar-header" style="{@cssTextHeader}">' +
                                '<div class="mstrmojo-Calendar-decrease"></div>' +
                                '<div class="mstrmojo-Calendar-increase"></div>' +
                                '<div class="mstrmojo-Calendar-title">' +
                                  '<span class="mstrmojo-Calendar-monthLabel" style="{@cssTextMonthYearLabel}">{@browseMonth}</span>' +
                                  '<span class="mstrmojo-Calendar-comma">,</span>' +
                                  '<span class="mstrmojo-Calendar-yearLabel" style="{@cssTextMonthYearLabel}">{@browseYear}</span>' +        
                                '</div>' +                             
                            '</div>' +
                            '<div class="mstrmojo-Calendar-body" style="{@cssTextBody}">' +
                                '<div class="mstrmojo-Calendar-dayView"></div>' +    
                            '</div>' +
                            '<div class="mstrmojo-Calendar-timePart">' +
                                '<span class="mstrmojo-Calendar-hourLabel">00</span>' +
                                '<span class="mstrmojo-Calendar-timeDelimiter">{@timeDelimiter}</span>' +                                
                                '<span class="mstrmojo-Calendar-minuteLabel">00</span>' +    
                                '<span class="mstrmojo-Calendar-timeDelimiter">{@timeDelimiter}</span>' +    
                                '<span class="mstrmojo-Calendar-secondLabel">00</span>' +    
                            '</div>' +
                            '<div class="mstrmojo-Calendar-tools">' +
                                '<div class="mstrmojo-Calendar-ok"> {@okLabel} </div>' + 
                            '</div>' +                            
                         '</div>',
            
            markupMethods: {
                onvisibleChange: function(){this.domNode.style.display = this.visible ? 'block' : 'none';},                
                onbrowseMonthChange:function(){this.monthLabel.innerHTML = this.monthNames(this.browseMonth - 1);},
                onbrowseYearChange:function(){this.yearLabel.innerHTML = this.browseYear;},
                ondtpChange:function(){this.timePart.style.display = (this.dtp === DTP.TIMESTAMP || this.dtp === DTP.TIME) ? "block" : "none";},
                onvalueChange:function(){
                    if(this.lastValue === undefined || this.value !== this.lastValue){
                            this.updateSelectedDate();
                        }
                },
                onchangeValueOnOKChange:function(){this.tools.style.display = (this.changeValueOnOK ? "block" : "none");}
            },
            
            markupSlots: {
                monthLabel: function(){return this.domNode.firstChild.lastChild.firstChild;},
                yearLabel: function(){return this.domNode.firstChild.lastChild.lastChild;},
                decreaseButton:function(){return this.domNode.firstChild.firstChild;},
                increaseButton:function(){return this.domNode.firstChild.childNodes[1];},                
                bodyContainer: function(){return this.domNode.childNodes[1];},
                dayView:function(){return this.domNode.childNodes[1].firstChild;},
                monthView:function(){return this.domNode.childNodes[1].childNodes[1];},
                yearView:function(){return this.domNode.childNodes[1].lastChild;},
                timePart:function(){return this.domNode.childNodes[2];},
                hourLabel:function(){return this.domNode.childNodes[2].firstChild;},
                minuteLabel:function(){return this.domNode.childNodes[2].childNodes[2];},
                secondLabel:function(){return this.domNode.childNodes[2].childNodes[4];},
                tools:function(){return this.domNode.childNodes[3];},
                okButton: function(){return this.domNode.childNodes[3].firstChild;}
            },
            
            init:function init(props){
                if(this._super) {
                    this._super(props);
                }
                if(this.duration<1) {
                    this.duration = 1;  
                }
                
                
                if (!this.selectedDates) {
                    this.selectedDates = [];
                }
                
                this.timeVal = { hour: 0, min: 0, sec: 0 };
            },
            
            
            getSelectedDatesAsString: function getSelectedDatesAsString(format) {
                var result = [];
                
                
                $A.forEach(this.selectedDates, function (sd) {
                    result.push($P.formatDateInfo(sd, format || _DT().DATEOUTPUTFORMAT));
                });
                
                return result;
            },
            
            
            updateSelectedDate: function updateSelectedDate(){
                var v = this.value,
                    tv = this.timeVal,
                    sds = this.selectedDates,
                    r, update = function (me, r) {
                        me.set('browseYear',r.year);
                        me.set('browseMonth',r.month);
                        me.updateTimePart();
                        me.updateView(me.currentView);
                    };
                
                
                if (sds.length === 0) {
                    
                    if(v){
                        
                        r = parseDateAndTimeToJSON(v);
                        
                        if (r && r.hour !== undefined){
                            tv.hour = r.hour;
                            tv.min = r.min;
                            tv.sec = r.sec;
                        }
                    }
                    
                    
                    if(!r){
                        
                        r = $P.getDateJson(new Date());
                    }
                    
                    
                    if (this.isDateDisabled(r.day, r.month, r.year, this.min, this.max)) {
                        
                        if (this.min && $P.compareDate(r, this.min) < 0) {
                            r = parseDateAndTimeToJSON(this.min);
                        } else if (this.max && $P.compareDate(r, this.max) > 0) {
                            r = parseDateAndTimeToJSON(this.max);
                        }
                    }
                    
                    
                    sds.push(r);
                    
                    update(this, r);                 

                } else {
                    
                    r = sds[0];
                    
                    if (this.value != null) {

                        update(this, r);                 
                    }
                }
                
            },
            
            
            updateValue: function updateValue(){
                var sd = getLastSelectedDate(this),
                    v = '';
                
                if (sd) {
                    v = $P.formatDateInfo(sd,_DT().DATEOUTPUTFORMAT);
                    if (this.dtp !== DTP.DATE) {
                        v += ' ' + $P.formatTimeInfo(this.timeVal, _DT().TIMEOUTPUTFORMAT);
                    } 
                }
                
                this.lastValue = v;                
                this.set('value', v);                
                
                if(this.onValueUpdate) {
                    this.onValueUpdate();
                }                
            },   
            
            
            updateTimePart:function updateTimePart(){
                var time = this.timeVal,
                    hh = time.hour || 0,
                    twelve = (hh % 12 === 0) ? 12 : (hh % 12);
                this.hourLabel.innerHTML = hh < 12 ? twelve + _DT().AM_NAME : twelve + _DT().PM_NAME;
                this.minuteLabel.innerHTML = $P.formatInteger(time.min || 0, 2);
                this.secondLabel.innerHTML = $P.formatInteger(time.sec || 0, 2);
            },                  
            
            
            premousedown: function(evt){
                var e = evt.e,
                    t = $D.eventTarget(evt.hWin,e);
                if(t === this.decreaseButton || t === this.increaseButton){
                	if($D.isFF){ 
                		$D.stopPropogation(window,e);
                	}
                    return true;
                }else{
                	
                	return this.processEvent(t, e);
                }
            },
                
            premouseup: function(evt){
            	var e = evt.e;
            	if(e.ctrlKey || e.shiftKey){
            		$D.clearBrowserHighlights();
            	}
            	var t = $D.eventTarget(evt.hWin,e);
                if(t === this.decreaseButton && !t.disabled){
                    this.decrease();
                    return true;
                }
                
                if(t === this.increaseButton && !t.disabled){
                    this.increase();
                    return true;
                }
            	
            },
                
            processEvent: function(t, e) {
                var cv = this.currentView,
                    sds = this.selectedDates,
                    sd = getLastSelectedDate(this),
                    y, m, d, ma, v; 
                
                
                if(t === this.okButton && this.changeValueOnOK){
                    this.updateValue();
                }
                
                if(t === this.monthLabel){
                    if(cv !== 'month') {
                        this.switchViewTo('month');
                    }
                    return true;
                }
                
                if(t === this.yearLabel){
                	if (cv !== 'year') {          
                		this.adjustYearStart();
                		this.switchViewTo('year');
                    	return true;
                	}
                }
                
                if(t === this.hourLabel){                  
                    if(cv !== 'hour') {
                        this.switchViewTo('hour');
                    }
                    return true;
                }                
                
                if(t === this.minuteLabel){                  
                    if(cv !== 'minute') {
                        this.switchViewTo('minute');
                    }
                    return true;
                }
                
                if(t === this.secondLabel){
                    if(cv !== 'second') {
                        this.switchViewTo('second');
                    }
                    return true;
                }    
                
                if($D.contains(this.hourView, t, false,this.domNode)){
                    var ha = t.getAttribute('h');
                    
                    v = parseInt(t.innerHTML, 10);
                    
                    if(!isNaN(ha) && !isNaN(v)){
                        ha = parseInt(ha,10);
                        this.timeVal.hour = v%12 + ha * 12;
                        this.updateTimePart();  
                        this.switchViewTo('day');
                        if(!this.changeValueOnOK){
                            this.updateValue(); 
                        }                       
                    }
                    return true;                     
                }
                
                if($D.contains(this.minuteView, t, false,this.domNode)){
                    v = parseInt(t.innerHTML, 10);
                    if(!isNaN(v)){
                        this.timeVal.min = v;
                        this.updateTimePart();
                        this.switchViewTo('day');
                        if(!this.changeValueOnOK){
                            this.updateValue();        
                        }
                    }
                    return true;                    
                }  
                
                if($D.contains(this.secondView, t, false,this.domNode)){
                    v = parseInt(t.innerHTML, 10);
                    if(!isNaN(v)){
                        this.timeVal.sec = v;
                        this.updateTimePart();
                        this.switchViewTo('day');
                        if(!this.changeValueOnOK){
                            this.updateValue(); 
                        }
                    }
                    return true;                    
                }                  
                
                if($D.contains(this.dayView, t, false,this.domNode)){
                    
                    var by = this.browseYear,
                        bm = this.browseMonth,
                        pnm;
                    
                    t = findTarget(t);
                    d = parseInt(t.innerHTML,10);
                    ma = parseInt(t.getAttribute("m"),10);
                    
                    if(!isNaN(d) && !isNaN(ma)){
                        pnm = (ma === 0) ? {y: by, m: bm} : (ma === 1 ? $P.getNextMonth(by,bm) : $P.getPreMonth(by,bm));  
                        
                        
                        if(this.isDateDisabled(d, pnm.m, pnm.y, this.min, this.max) || e.button==2) {
                            return true;
                        }
                        
                        var selIndex = isDateSelected(sds, d, bm, by),
                        	ms = sds.length > 1,
                        	nonEmpty = this.forceNonEmptySelection,
                        	ims = this.isMultiSelect,
                            ctrl = ims && e.ctrlKey,
                            shift = ims && e.shiftKey,
                            dates = null;
                       
                        if (shift) { 
                            dates = getShiftSelection(this, t);
                            clearSelection(this);
                            addSelectionByDates(this, dates);
                        } else if(ctrl){
                            if(selIndex === -1){
                                addSelectionByElems(this, t);
                            }else{
                            	if(!nonEmpty || ms){
                            		removeSelection(this, selIndex);
                            	}
                            }
                        }else{
                            clearSelection(this);
                            if (ms || selIndex === -1 || nonEmpty) {
                                addSelectionByElems(this, t);
                            }
                        }
                        if (this.onselect || _P.hasSubs(this.id, "select") ) {
                                this.raiseEvent({
                                    name: "select", 
                                    value: this.selectedDates
                                });
                        }
                        
                        if(ma === 1) {
                            this.increase();
                        } else if(ma === -1) {                       
                            this.decrease();
                        }  
                        
                        if(!this.changeValueOnOK){
                            this.updateValue();
                        }
                    }
                    return true;
                }
                
                if($D.contains(this.monthView, t, false,this.domNode)){
                	t = findTarget(t);
                    m = parseInt(t.getAttribute('m'),10);
                    if(!isNaN(m)){
                        this.set("browseMonth", m + 1);
                        this.switchViewTo('day');
                    }
                    return true;
                }

                if($D.contains(this.yearView, t, false,this.domNode)){
                	t = findTarget(t);
                    y = parseInt(t.innerHTML,10);
                    if(!isNaN(y)){
                        this.set("browseYear", y);
                        this.switchViewTo('day');
                    }
                    return true;
                }
                
                return true;
            },             
            
            
            decrease: function(){
                var v = this.currentView,
                    newView = v,
                    y = this.browseYear,
                    m = this.browseMonth,
                    yrs = this.yearRangStart,
                    pre;
                
                switch(v){
                case 'day':
                    pre = $P.getPreMonth(y, m);
                    this.set('browseMonth', pre.m);
                    this.set('browseYear', pre.y);
                    break;
                case 'month':
                    this.set('browseYear', y - 1);
                    break;
                case 'year':
                    this.yearRangStart = yrs - this.yearViewSize * this.yearViewSize;
                    break;
                case 'hour':
                        newView = 'second';
                    break;
                case 'minute':
                        newView = 'hour';
                    break;
                case 'second':
                        newView = 'minute';
                    break;
                }

                
                this.switchViewTo(newView,'right');
            },
            
                        
            increase: function(){
                var v = this.currentView,
                    newView = v,
                y = this.browseYear,
                m = this.browseMonth,
                yrs = this.yearRangStart,
                next;

                switch(v){
                case 'day':
                    next = $P.getNextMonth(y, m);
                    this.set('browseMonth', next.m);
                    this.set('browseYear', next.y);
                    break;
                case 'month':
                    this.set('browseYear', y + 1);
                    break;
                case 'year':
                    this.yearRangStart = yrs + this.yearViewSize * this.yearViewSize;
                    break;
                case 'hour':
                        newView = 'minute'; 
                    break;
                case 'minute':
                        newView = 'second'; 
                    break;
                case 'second':
                        newView = 'hour';
                    break;                    
                }                
                
                
                this.switchViewTo(newView,'left');
            },         
            
            
            updateView: function(v){
                var html = this[v + 'ViewHTML']();
                this[v + 'View'].innerHTML = html;
            },
            adjustYearStart: function(){
            	this.yearRangStart = this.browseYear - 10 - this.browseYear%5;
            },
            

            switchViewTo: function(v,dr){
                var cn = 'mstrmojo-Calendar-' + v + 'View', 
                    div = document.createElement('div'),
                    cv = this[this.currentView + 'View'],
                    hn = v + 'ViewHTML',
                    plb = this[this.currentView + 'Label'],
                    nlb = this[v + 'Label'];
                
                
                if (!this.supportedViews[v]) {
                    return;
                }
                
                if(!dr) {
                    dr = this.sDirMatrix[this.currentView][v];
                }
                
                div.className = cn;
                div.innerHTML = this[hn]();
                
                this.currentView = v;
                
                
                if(plb){
                    mstrmojo.css.removeClass(plb, ['highlight']);
                }
                if(nlb){
                    mstrmojo.css.addClass(nlb, ['highlight']);
                }
                
                this[v + 'View'] = div;
                
                this._slideIntoView(cv,div,dr);
            },  

            
            _slideIntoView: function(c, t, d){
                var p = this.bodyContainer,
                    v = (d === 'left' || d === 'right') ? c.offsetWidth : c.offsetHeight,
                    pn = (d === 'left' || d === 'right') ? 'left' : 'top',
                    pv = (d === 'left' || d === 'up') ? v : -v, 
                    e1 = new mstrmojo.fx.AnimateProp({
                        props: {},
                        duration:this.duration,
                        interval:this.duration/10,
                        target:c,
                        onEnd:function(){
                            p.removeChild(c);
                        }
                    }),      
                    e2 = new mstrmojo.fx.AnimateProp({
                        props: {},
                        duration:this.duration,
                        interval:this.duration/10,                        
                        target:t
                    }); 
                                    
                t.style[pn] = pv + 'px';
    
                p.appendChild(t);
    
                e1.props[pn] = {start:0,stop:-pv, suffix:'px'};
                e2.props[pn] = {start:pv, stop:0, suffix:'px'};
    
                e1.play();
                e2.play();

            },
            
            
            dayViewHTML: function(){
                var y = this.browseYear,
                    m = this.browseMonth,
                    dm = $P.getDaysOfMonth(y,m),
                    pm = $P.getPreMonth(y,m),
                    dpm = $P.getDaysOfMonth(pm.y, pm.m),
                    nm = $P.getNextMonth(y,m),
                    lb = _getLeadingBlanks(y,m,this.firstDayOfWeek),
                    html = [],
                    scStyle = selectedStyle(this),
                    c = 0,
                    sd = this.selectedDates,
                    min = this.min,
                    max = this.max,
                    date, status, i, j,
                    showCurStyle = this.showCurMonthDatesOnly?'style="visibility:hidden;"':'';
                
                
                updateTraversalIcons(this, {d: dpm, m: pm.m, y: pm.y}, {d: 1, m: nm.m, y: nm.y});
                
                html.push(_pre_table_with_style(this.cssTextDay));
                html.push(this._dayViewTHead());
                
                html.push('<tr>');
                for(i=0;i<lb;i++){
                    
                    date = dpm-lb+i+1;
                    
                    
                    status = this.isDateDisabled(date, pm.m, pm.y, min, max) ? 'disabled' : '';
                    
                    html.push('<td '+showCurStyle + '><div class="mstrmojo-Calendar-day-pre ' + status + '" m="-1">');
                    html.push(date);
                    html.push('</div></td>');
                    c++;
                }
                for(i=0;i<dm;i++){
                    
                    date = i+1;
                    
                    
                    status = this.isDateDisabled(date, m, y, min, max) ? ' disabled' : '';
                    var td = isToday(date,m,y),
                    	tdCssClass = td?' today':'',
                    	sel = isDateSelected(sd, date, m, y) !== -1;
                    tdCssClass = (this.hilightToday && td)? ' hilightToday':tdCssClass;
                    html.push('<td '+ (td?('class="'+tdCssClass+'" '):' ')+(sel?scStyle:'') + '><div class="mstrmojo-Calendar-day-cur' + (sel ? (' selected ') : '') + status + '" m="0"'+ (sel?scStyle:'') + '>');
                    html.push(i+1);
                    html.push('</div></td>');
                    if((++c)%7 === 0) {
                        html.push("</tr><tr>");
                    }
                }
                for(j=c;j<42;j++){
                    
                    date = c-dm-lb+1;
                    
                    
                    status = this.isDateDisabled(date, nm.m, nm.y, min, max) ? 'disabled' : '';
                    
                    html.push('<td '+showCurStyle+'><div class="mstrmojo-Calendar-day-next ' + status + '" m="1">');
                    html.push(date);
                    html.push('</div></td>');   
                    if((++c)%7 === 0 && c!==42) {
                        html.push("</tr><tr>");   
                    }
                }
                html.push('</tr>');
                html.push(_post_table);
                return html.join('');
            },
            
                        
            _dayViewTHead: function(){
                var html = [],
                    pre = '<thead><tr class="mstrmojo-Calendar-thead"'+' style="'+ this.cssTextWeekDay+';">',
                    post = '</tr></thead>',
                    fd = this.firstDayOfWeek - 1,
                    dayNames = this.dayNames,
                    i;
                
                html.push(pre);
                for(i = fd; i < fd + 7; i++){
                   html.push('<td>');
                   html.push(dayNames(i%7));
                   html.push('</td>');
                }
                html.push(post);
                return html.join('');
            },
            
                        
            monthViewHTML: function(){
                var html = [],
                    bm = this.browseMonth - 1,
                    by = this.browseYear,
                    i;
                updateTraversalIcons(this, {d: 31, m: 12, y: by - 1}, {d: 1, m: 1, y: by + 1});
                html.push(_pre_table_with_style(this.cssTextMonth));
                html.push('<tr>');
                for(i=0;i<12;i++){
                    html.push('<td '+ ((i === bm)?selectedStyle(this):'') + '><div class="mstrmojo-Calendar-month' + ((i === bm) ? ' selected' : '')+'" m="');
                    html.push(String(i));
                    html.push('">');                        
                    html.push(this.monthNames(i));
                    html.push('</div></td>');
                    if(i%3 === 2) {
                        html.push("</tr><tr>");
                    }
                }
                html.pop();
                html.push("</tr>");
                html.push(_post_table);
                return html.join('');
            },
            
                        
            yearViewHTML: function(){
                var start = this.yearRangStart,
                    html = [],
                    by = this.browseYear,
                    y, i,
                    ysz = this.yearViewSize;
                
                updateTraversalIcons(this, {d: 31, m: 12, y: start - 1}, {d: 1, m: 1, y: start + ysz*ysz});
                
                html.push(_pre_table_with_style(this.cssTextYear));
                html.push('<tr>');
                for(i=0;i<ysz*ysz;i++){
                    y = start + i;
                    html.push('<td '+ ((by===y)?selectedStyle(this):'') +'><div class="mstrmojo-Calendar-year' +  ((by===y) ? ' selected' : '') + '">');
                    html.push(y);
                    html.push('</div></td>');
                    if(i%ysz === (ysz-1)) {
                        html.push("</tr><tr>");     
                    }
                }
                html.pop();
                html.push("</tr>");
                html.push(_post_table);
                return html.join('');
            },
            
                        
            hourViewHTML: function(){
                var html = [],
                    hh = this.timeVal.hour,
                    i;
                html.push(_pre_table);
                html.push('<tr><td colspan="6"><div class="mstrmojo-Calendar-hourTitle">');
                html.push(_DT().AM_NAME);
                html.push('</div></td></tr>');
                for(i=0;i<12;i++){
                    html.push('<td><div class="mstrmojo-Calendar-hour' +  ((i === hh)? ' selected' : '') + '" h="0">');
                    html.push((i === 0) ? 12 : i);
                    html.push('</div></td>');
                    if(i === 5) {
                        html.push("</tr><tr>");
                    }
                }
                html.push('</tr><tr><td colspan="6"><div class="mstrmojo-Calendar-hourTitle">');
                html.push(_DT().PM_NAME);
                html.push('</div></td></tr>');                
                for(i=0;i<12;i++){
                    html.push('<td><div class="mstrmojo-Calendar-hour' + (((12 + i) === hh) ? ' selected' : '') + '" h="1">');
                    html.push((i === 0) ? 12 : i);
                    html.push('</div></td>');
                    if(i === 5) {
                        html.push("</tr><tr>");
                    }
                }
                html.push("</tr>");
                html.push(_post_table);
                return html.join('');
            },
            
                        
            minuteViewHTML: function(){
                return this._minuteSecondViewHTML(this.timeVal.min, "mstrmojo-Calendar-minute");
            },
            
                        
            secondViewHTML: function(){
                return this._minuteSecondViewHTML(this.timeVal.sec, "mstrmojo-Calendar-second");
            },
            
                        
            _minuteSecondViewHTML: function(s,c){
                var html = [],
                    i;
                
                html.push(_pre_table);
                html.push('<tr>');
                for(i=0;i<60;i++){
                    html.push('<td><div class="');
                    html.push(c);
                    html.push((i === s) ? ' selected">' : '">');
                    html.push(i);
                    html.push('</div></td>');
                    if(i%10 === 9) {
                        html.push("</tr><tr>");
                    }
                }
                html.pop();
                html.push("</tr>");
                html.push(_post_table);
                return html.join('');                
            },
            
            isDateDisabled: function(day, month, year){
                 var d = $P.formatDateInfo({day: day, month: month, year: year}, _DT().DATEOUTPUTFORMAT);
                 
                 
                 return !isDateInDateTimeRange(day, month, year, this.min, this.max);
            },
            unrender: function unrender(ignoreDom) {
                
                delete this.lastValue;
                this._super(ignoreDom);
            }
        }
    );
    
}());


(function(){

    mstrmojo.requiresCls("mstrmojo.dom",
        "mstrmojo.Widget",
                         "mstrmojo.tooltip",
                         "mstrmojo.string",
                         "mstrmojo.array");

    
    var mapIdx = 0,
        $ARR = mstrmojo.array,
        $STR = mstrmojo.string;
    
    
    function configureDisplay() {
        var tn = this.textNode,
            img = this.imgNode;
        
        
        if (this.eg != null) {
            
            img.style.display = 'none';
            
            
            tn.innerHTML = this.eg || '';
            
            
            tn.style.display = 'block';
            
        } else {
            
            tn.style.display = 'none';
            
            
            img.style.display = 'block';
            
            
            if (this.tooltip) {
                img.setAttribute("ttl", this.tooltip);
            }
            
            
            var fmts = this.getFormats();
            this.retrieveGraphSrc(fmts.height, fmts.width);
        }
    }
    
    
    var areaShapeMap = {
        6: 'poly',
        7: 'rect',
        100: 'circle'
    };

    
    function generateImageMap() {
        
        var areaData = this.as,
            len = areaData && areaData.length;

        
        if (!len) {
            
            return;
        }

        var widgetId = this.id,
            mapId = widgetId + '_map' + mapIdx++,
            buf = [],                               
            x = -1,                                 
            i;                                      
        
        
        for (i = 0; i < len; i++) {
            
            var area = areaData[i];
            
            
            area.id = widgetId;                                                 
            area.aid = i;                                                       
            area.tooltip = $STR.multiReplace(area.tooltip || '', {              
                '&#13': '<br />',
                '&#32': ' '
            });

            
            if (!isNaN(area.shape)) {
                
                area.shape = this.getAreaShapeName(area.shape);
            }

            
            if (area.tks || area.tks === '' || area.tty === 1) {
                
                area.extra = ' href="#" ';
            }

            
            buf[++x] = $STR.apply(this.areaMarkup, area);
        }

        
        var mapMarkup = '<map id="' + mapId + '" name="' + mapId + '">' + buf.join('') + '</map>';

        
        if (!this.domNode) {
            
            this.att = 'usemap="#' + mapId + '" ';
            this.map = mapMarkup;
        } else {
            
            
            
            var newMap = document.createElement("div");
            newMap.innerHTML = mapMarkup;

            if (this.mapNode) {
                newMap = newMap.firstChild;
                this.mapNode.innerHTML = newMap.innerHTML; 
            } else {
                this.imgNode.setAttribute("usemap", '#' + mapId);
                this.mapNode = this.domNode.appendChild(newMap.firstChild);            
            } 
        }
    }
    
    
    var graphBase = mstrmojo.GraphBase = mstrmojo.declare(
        
        mstrmojo.Widget,
        
        
        null,
        
        
        {
            scriptClass: "mstrmojo.GraphBase",
            
            cssClassPrefix: "mstrmojo-GraphBase",
            
            markupString: '<div id="{@id}" class="{@cssClassPrefix} {@cssClass}" title="{@tooltip}" style="{@domNodeCssText};">' +
                              '<div class="{@cssClassPrefix}-txt"></div>' +
                              '<img {@att}src="../images/1ptrans.gif" class="{@cssClassPrefix} {@cssImageClass}"/>' +
                              '{@map}' +
                          '</div>',
                          
            
            att: '',
            
            
            map: '',
            
            
            cAreaIdx: -1, 
            
            
            useRichTooltip: true,
            
            markupSlots: {
                imgNode: function(){ return this.domNode.childNodes[1]; },
                mapNode: function() {return this.domNode.childNodes.length > 2 ? this.domNode.childNodes[2] : null;},
                textNode: function() { return this.domNode.firstChild; }
            },
        
            markupMethods: {
                onvisibleChange: function(){ this.domNode.style.display = (this.visible) ? 'block' : 'none'; }
            },
            
            preBuildRendering: function preBuildRendering() {
                
                generateImageMap.call(this);

                return this._super();
            },

            postBuildRendering: function postBuildRendering() {
                
                configureDisplay.call(this);
                
                
                return this._super();
            },
            
            setModel: function setModel(model) {
                this.model = model;
            },
            
            
            updatingTooltipHelper: function updatingTooltipHelper(elem, ep, useGivenCoords) {
                var aid = elem && elem.getAttribute('aid'),
                    ttl = elem && elem.getAttribute('ttl'),
                    borderColor = elem.getAttribute('SC'),
                    ttN = {
                            refNode : this.domNode,
                            posType: mstrmojo.tooltip.POS_BOTTOMLEFT,
                            contentNodeCssClass: 'gp-tooltip'
                        },
                    zoom = (this.model.zf || 1) + 'em';
                
                
                if (aid == this.cAreaIdx) {
                    
                    return;
                }
                
                
                this.cAreaIdx = aid;
                
                
                ttN.content = ttl;
                var cssText = 'font-size:' + zoom + ';';

                
                if (borderColor) { 
                    cssText += 'border-color:#' + borderColor;
                }

                ttN.contentNodeCssText = cssText;
                
                
                var c = elem.getAttribute("coords"),
                    x = 99999,
                    y = 99999;
    
                if (!useGivenCoords) { 
                if (c && c.length > 0) {
                    c = c.split(",");
                    
                    var i = 0;
                    while (i + 1 < c.length) {
                        x = Math.min(x, parseInt(c[i++], 10));
                        y = Math.min(y, parseInt(c[i++], 10));
                    }
                }                    
                }

                if (x === 99999) {
                    x = ep.x;
                }
                if (y === 99999) {
                    y = ep.y;
                }
                
                
                ttN.top = y;
                ttN.left = x;
                
                this.richTooltip = null;
                
                this.set('richTooltip', ttN);
            },
            
            
            refresh: function refresh() {
                
                if (!this.hasRendered) {
                    
                    return;
                }

                
                configureDisplay.call(this);

                
                var f = this.getFormats();
                if (f.height && f.width) {
                    
                    this.refreshMap();
                }
            },

            
            refreshMap: function refreshMap() {
                
                generateImageMap.call(this);
            },

            
            getAreaShapeName: function getAreaShapeName(shapeType) {
                return areaShapeMap[parseInt(shapeType, 10)] || 'default';
            }
        }
    );

    var tooltipCls = graphBase.tooltipCLS = "mstrmojo-mobileGraph-Tooltip-content",
        canvasCls = graphBase.canvasCLS = "mobile-graph-highlight-canvas";

    graphBase.hideTooltips = function () {
        
        $ARR.forEach(document.getElementsByClassName(tooltipCls), function (tooltip) {
            tooltip.style.display = 'none';
        });

        
        $ARR.forEach(document.getElementsByClassName(canvasCls), function (canvas) {
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            canvas.width = canvas.width;
        });
    };

}());
(function () {

    mstrmojo.requiresCls("mstrmojo.Container",
                         "mstrmojo.hash",
                         "mstrmojo.array",
                         "mstrmojo.date",
                         "mstrmojo.Stepper",
                         "mstrmojo.android.ui.Button",
                         "mstrmojo.DateStepperContentProvider",
                         "mstrmojo.NumStepperContentProvider");

    var $A = mstrmojo.array,
        $D = mstrmojo.date,
        $H = mstrmojo.hash,
        $BTN = mstrmojo.android.ui.Button.newButton,
        DTP = mstrmojo.expr.DTP,
        DT = {
            interval: 1
        },
        H = {
            min: 1,
            max: 12,
            interval: 1,
            value: 12
        },
        H24 = {
            min: 0,
            max: 23,
            interval: 1,
            value: 0
        },
        M = {
            min: 0,
            max: 59,
            interval: 1
        };

    function createChildren() {
        var dtp = this.dtp,
            sc = this.stepperClass,
            value = this[this.valueField],
            children = [],
            dateText,
            timeText;

        if (this._hasDate) {
            children.push({
                scriptClass: sc,
                slot:  'monthNode',
                alias: 'monthStepper',
                title: mstrmojo.desc(871), 
                provider: this.dateProvider.monthCP
            }, {
                scriptClass: sc,
                slot:  'dayNode',
                alias: 'dayStepper',
                title: mstrmojo.desc(872), 
                provider: this.dateProvider.dayCP
            }, {
                scriptClass: sc,
                slot:  'yearNode',
                alias: 'yearStepper',
                title: mstrmojo.desc(873), 
                provider: this.dateProvider.yearCP
            });
        }

        if (this._hasTime) {
            children.push({
                scriptClass: sc,
                slot:  'hourNode',
                alias: 'hourStepper',
                provider: this.hourProvider
            }, {
                scriptClass: sc,
                slot:  'minNode',
                alias: 'minStepper',
                provider: this.minProvider
            });
        }

        
        if (!this.hideSwitchers) {
            if (dtp !== DTP.TIME) {
                dateText = (value && value.date) ? $D.formatDateInfo(value.date, mstrmojo.locales.datetime.DATEOUTPUTFORMAT) : mstrmojo.desc(2052); 
                children.push($BTN(dateText, function () { this.parent.toDateView(); }, { alias: 'dateToggle', slot: 'switcherNode', cssClass: '', selected: true }));
            }

            if (dtp !== DTP.DATE) {
                timeText = (value && value.time) ? $D.formatTimeInfo(value.time, mstrmojo.locales.datetime.TIMEOUTPUTFORMAT) : mstrmojo.desc(2170); 
                children.push($BTN(timeText, function () { this.parent.toTimeView(); }, { alias: 'timeToggle', slot: 'switcherNode', cssClass: '', selected: dtp == DTP.TIME }));
            }
        }

        if (this._hasDate) {
            this.viewCssClass = 'dateView';
        } else if (this._hasTime) {
            this.viewCssClass = 'timeView';
        }

        this.addChildren(children);
    }

    function createProviders() {
        var propNames = [this.valueField, 'min', 'max'],
            dateItem = $H.copy(DT),
            hourItem = this.is24HourMode ? $H.copy(H24) : $H.copy(H),
            minItem = $H.copy(M),
            value = this[this.valueField],
            timeValue = value && value.time,
            me = this;

        
        $A.forEach(propNames, function (p) {
            dateItem[p] = $H.copy(me[p]);
        });

        if (this._hasDate) {
            this.dateProvider = new mstrmojo.DateStepperContentProvider({
                item: dateItem,
                valField: this.valueField,
                canLoop: true,
                onTraverse: function () {
                    
                    me.updateDate();
                }
            });
        }

        if (this._hasTime) {
            
            if (this.minuteInterval !== undefined) {
                minItem.interval = this.minuteInterval;
            }

            
            delete this.minuteInterval;

            if (timeValue) {
                
                if (!this.is24HourMode) {
                    hourItem.value = timeValue.hour % 12 || 12;
                    
                    this.set('meridiem', (timeValue.hour < 12));
                } else {
                    hourItem.value = timeValue.hour;
                }
                minItem.value = timeValue.min;
            }

            
            this.hourProvider = new mstrmojo.NumStepperContentProvider({
                item: hourItem,
                valField: 'value',
                canLoop: true,
                onTraverse: function () {
                    me.updateTime();
                }
            });

            
            this.minProvider = new mstrmojo.NumStepperContentProvider({
                item: minItem,
                valField: 'value',
                canLoop: true,
                renderer: {
                    render: function (v) {
                        return String(v).length == 1 ? ('0' + v) : v;
                    }
                },
                onTraverse: function () {
                    me.updateTime();
                }
            });
        }
    }

    
    mstrmojo.DateTimePicker = mstrmojo.declare(
        
        mstrmojo.Container,

        
        null,

        {

            scriptClass: "mstrmojo.DateTimePicker",

            
            value: null,

            
            min: null,

            
            max: null,

            
            meridiem: true,

            
            hideSwitchers: false,

            
            minuteInterval: null,

            
            is24HourMode: false,

            
            dtp: mstrmojo.expr.DTP.TIMESTAMP,

            
            viewCssClass: '',

            
            valueField: 'value',

            
            stepperClass: 'mstrmojo.Stepper',

            markupString: "<div id='{@id}' class='mstrmojo-DateTimePicker' style='{@cssText}'>" +
                              "<div class='switcher'></div>" +
                              "<div class='{@viewCssClass}'>" +
                                  "<span class='stepNode month'></span>" +
                                  "<span class='stepNode day'></span>" +
                                  "<span class='stepNode year'></span>" +
                                  "<span class='stepNode hour'></span>" +
                                  "<span class='stepNode min'></span>" +
                                  "<span class='meridiem' mstrAttach:click></div>" +
                              "</div>" +
                          "</div>",

            markupSlots: {
                switcherNode: function () { return this.domNode.firstChild; },
                viewNode: function () { return this.domNode.children[1]; },
                monthNode: function () { return this.domNode.children[1].children[0]; },
                dayNode: function () { return this.domNode.children[1].children[1]; },
                yearNode: function () { return this.domNode.children[1].children[2]; },
                hourNode: function () { return this.domNode.children[1].children[3]; },
                minNode: function () { return this.domNode.children[1].children[4]; },
                meridiemNode: function () { return this.domNode.children[1].children[5]; }
            },

            markupMethods: {
                onmeridiemChange: function () {
                    
                    if (this.is24HourMode) {
                        this.meridiemNode.display = 'none';
                    } else {
                        this.meridiemNode.innerHTML = this.meridiem ? mstrmojo.locales.datetime.AM_NAME : mstrmojo.locales.datetime.PM_NAME;
                    }
                },
                onviewCssClassChange: function () {
                    this.viewNode.className = this.viewCssClass;
                }
            },

            
            init: function init(props) {
                
                this._super(props);

                var dtp = this.dtp;

                this._hasDate = (dtp === DTP.DATE || dtp === DTP.TIMESTAMP);
                this._hasTime = (dtp === DTP.TIME || dtp === DTP.TIMESTAMP);

                
                createProviders.call(this);

                
                createChildren.call(this);
            },

            
            getDateTime: function getDateTime() {
                return {
                    date: this.getDate(),
                    time: this.getTime()
                };
            },

            
            getDate: function getDate() {
                if (this._hasDate) {
                    var dateInfo = this.dateProvider.curVal;

                    return {
                        year: dateInfo.getFullYear(),
                        month: dateInfo.getMonth() + 1,
                        day: dateInfo.getDate()
                    };
                }

                return null;
            },

            
            getTime: function getTime() {
                if (this._hasTime) {
                    return {
                        hour: !this.is24HourMode ? $D.capitalHour(this.hourProvider.curVal, this.meridiem ? ' AM' : ' PM') : this.hourProvider.curVal,
                        min: this.minProvider.curVal
                    };
                }
                return null;
            },

            
            getDateTimeString: function getDateTimeString() {
                var str = '';
                if (this._hasDate) {
                    str += $D.formatDateInfo(this.getDate(), mstrmojo.locales.datetime.DATEOUTPUTFORMAT);
                }
                if (this._hasDate && this._hasTime) {
                    str += ' ';
                }
                if (this._hasTime) {
                    str += $D.formatTimeInfo(this.getTime(), mstrmojo.locales.datetime.TIMEOUTPUTFORMAT);
                }
                return str;
            },

            
            updateDate: function updateDate() {
                if (this.hasRendered) {
                    
                    var me = this;
                    $A.forEach(['year', 'month', 'day'], function (n) {
                        me[n + 'Stepper'].updateDisplayText();
                    });
                }

                if (this.dateToggle) {
                    
                    this.dateToggle.set('text', $D.formatDateInfo(this.getDate(), mstrmojo.locales.datetime.DATEOUTPUTFORMAT));
                }
            },

            
            updateTime: function updateTime() {
                if (this.timeToggle) {
                    
                    this.timeToggle.set('text', $D.formatTimeInfo(this.getTime(), mstrmojo.locales.datetime.TIMEOUTPUTFORMAT));
                }
            },

            
            toDateView: function toDateView() {
                this.set('viewCssClass', 'dateView');
                this.dateToggle.set('selected', true);
                var timeToggle = this.timeToggle;
                if (timeToggle) {
                    timeToggle.set('selected', false);
                }
            },

            
            toTimeView: function toTimeView() {
                this.set('viewCssClass', 'timeView');
                var dateToggle = this.dateToggle;
                if (dateToggle) {
                    dateToggle.set('selected', false);
                }
                this.timeToggle.set('selected', true);
            }
        }
    );
}());

















































function printStackTrace(options) {
    var ex = (options && options.e) ? options.e : null;
    var guess = (options && options.guess) ? options.guess : true;
    
    var p = new printStackTrace.implementation();
    var result = p.run(ex);
    return (guess) ? p.guessFunctions(result) : result;
}

printStackTrace.implementation = function() {};

printStackTrace.implementation.prototype = {
    run: function(ex) {
        
        var mode = this._mode || this.mode();
        if (mode === 'other') {
            return this.other(arguments.callee);
        }
        else {
            ex = ex ||
                (function() {
                    try {
                        (0)();
                    } catch (e) {
                        return e;
                    }
                })();
            return this[mode](ex);
        }
    },
    
    mode: function() {
        try {
            (0)();
        } catch (e) {
            if (e.arguments) {
                return (this._mode = 'chrome');
            } else if (e.stack) {
                return (this._mode = 'firefox');
            } else if (window.opera && !('stacktrace' in e)) { 
                return (this._mode = 'opera');
            }
        }
        return (this._mode = 'other');
    },
    
    chrome: function(e) {
        return e.stack.replace(/^.*?\n/, '').
                replace(/^.*?\n/, '').
                replace(/^.*?\n/, '').
                replace(/^[^\(]+?[\n$]/gm, '').
                replace(/^\s+at\s+/gm, '').
                replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@').
                split("\n");
    },
    
    firefox: function(e) {
        return e.stack.replace(/^.*?\n/, '').
                replace(/(?:\n@:0)?\s+$/m, '').
                replace(/^\(/gm, '{anonymous}(').
                split("\n");
    },
    
    
    opera: function(e) {
        var lines = e.message.split("\n"), ANON = '{anonymous}', 
            lineRE = /Line\s+(\d+).*?script\s+(http\S+)(?:.*?in\s+function\s+(\S+))?/i, i, j, len;
        
        for (i = 4, j = 0, len = lines.length; i < len; i += 2) {
            if (lineRE.test(lines[i])) {
                lines[j++] = (RegExp.$3 ? RegExp.$3 + '()@' + RegExp.$2 + RegExp.$1 : ANON + '()@' + RegExp.$2 + ':' + RegExp.$1) +
                ' -- ' +
                lines[i + 1].replace(/^\s+/, '');
            }
        }
        
        lines.splice(j, lines.length - j);
        return lines;
    },
    
    
    other: function(curr) {
        var ANON = "{anonymous}", fnRE = /function\s*([\w\-$]+)?\s*\(/i, stack = [], j = 0, fn, args;
        
        var maxStackSize = 10;
        while (curr && stack.length < maxStackSize) {
            fn = fnRE.test(curr.toString()) ? RegExp.$1 || ANON : ANON;
            args = Array.prototype.slice.call(curr['arguments']);
            stack[j++] = fn + '(' + printStackTrace.implementation.prototype.stringifyArguments(args) + ')';
            
            
            if (curr === curr.caller && window.opera) {
	            
                break;
            }
            curr = curr.caller;
        }
        return stack;
    },
    
    stringifyArguments: function(args) {
        for (var i = 0; i < args.length; ++i) {
            var argument = args[i];
            if (typeof argument == 'object') {
                args[i] = '#object';
            } else if (typeof argument == 'function') {
                args[i] = '#function';
            } else if (typeof argument == 'string') {
                args[i] = '"' + argument + '"';
            }
        }
        return args.join(',');
    },
    
    sourceCache: {},
    
    ajax: function(url) {
        var req = this.createXMLHTTPObject();
        if (!req) {
            return;
        }
        req.open('GET', url, false);
        req.setRequestHeader("User-Agent", "XMLHTTP/1.0");
        req.send('');
        return req.responseText;
    },
    
    createXMLHTTPObject: function() {
	    
        var xmlhttp, XMLHttpFactories = [
            function() {
                return new XMLHttpRequest();
            }, function() {
                return new ActiveXObject("Msxml2.XMLHTTP");
            }, function() {
                return new ActiveXObject("Msxml3.XMLHTTP");
            }, function() {
                return new ActiveXObject("Microsoft.XMLHTTP");
            }
        ];
        for (var i = 0; i < XMLHttpFactories.length; i++) {
            try {
                xmlhttp = XMLHttpFactories[i]();
                
                this.createXMLHTTPObject = XMLHttpFactories[i];
                return xmlhttp;
            } catch (e) {}
        }
    },
    
    getSource: function(url) {
        if (!(url in this.sourceCache)) {
            this.sourceCache[url] = this.ajax(url).split("\n");
        }
        return this.sourceCache[url];
    },
    
    guessFunctions: function(stack) {
        for (var i = 0; i < stack.length; ++i) {
            var reStack = /{anonymous}\(.*\)@(\w+:\/\/([-\w\.]+)+(:\d+)?[^:]+):(\d+):?(\d+)?/;
            var frame = stack[i], m = reStack.exec(frame);
            if (m) {
                var file = m[1], lineno = m[4]; 
                if (file && lineno) {
                    var functionName = this.guessFunctionName(file, lineno);
                    stack[i] = frame.replace('{anonymous}', functionName);
                }
            }
        }
        return stack;
    },
    
    guessFunctionName: function(url, lineNo) {
        try {
            return this.guessFunctionNameFromLines(lineNo, this.getSource(url));
        } catch (e) {
            return 'getSource failed with url: ' + url + ', exception: ' + e.toString();
        }
    },
    
    guessFunctionNameFromLines: function(lineNo, source) {
        var reFunctionArgNames = /function ([^(]*)\(([^)]*)\)/;
        var reGuessFunction = /['"]?([0-9A-Za-z_]+)['"]?\s*[:=]\s*(function|eval|new Function)/;
        
        
        var line = "", maxLines = 10;
        for (var i = 0; i < maxLines; ++i) {
            line = source[lineNo - i] + line;
            if (line !== undefined) {
                var m = reGuessFunction.exec(line);
                if (m) {
                    return m[1];
                }
                else {
                    m = reFunctionArgNames.exec(line);
                }
                if (m && m[1]) {
                    return m[1];
                }
            }
        }
        return "(?)";
    }
};

(function () {

	mstrmojo.debug = {
        
	    nocache: true,
	    
	    
	    getStackTrace: window.printStackTrace || undefined,
	    
	    
	    debug_xhr: function debug_xhr (xhrStartTime, xhrParams, xhrResponse) {
	        xhrParams = xhrParams || {};
	        xhrResponse = xhrResponse || {};
	        
	        var details = [];
	        
	        
	        if (xhrParams.taskId) {
	            details.push('taskID=' + xhrParams.taskId);
	            switch(xhrParams.taskId) {
	                case 'iPhoneGetReportResults':
	                    details.push('msgId=' + xhrParams.messageID);
	                    break;
	                    
	                case 'reportExecute':
	                    details.push('reportID=' + xhrParams.reportID);
	                    if (xhrResponse.id) {
	                        details.push('msgID=' + xhrResponse.id);
	                    }
	                    break;
	            }
	        }
	
	        
	        mstrmojo.dbg_profile('xhr completed', xhrStartTime, details.join('\t'));
	    },

        
	    	    
	    load_firebug: function( uri ) {
	        if ( typeof Firebug === "undefined" ) {
	            
                if ( (typeof uri === "undefined") || document.getElementById('FirebugLite')) return;
                
                e = document['createElement']('script');
                e.setAttribute('id', 'FirebugLite');
                e.setAttribute('src', uri + 'firebug-lite.js#startOpened');
                e.setAttribute('FirebugLite', '4');
                (document['getElementsByTagName']('head')[0] || document['getElementsByTagName']('body')[0]).appendChild(e);
	        } else {
	            
                Firebug.chrome.toggle(true );
            }
	    } 
	};
	
    mstrmojo.dbg = function dbg(s) {
        if (window.console) { 
            window.console.log(s);
        }
    };
    
    mstrmojo.dbg_profile = function dbg_profile(title, time, msg) {
        mstrmojo.dbg(title + new Array(Math.max(0, 25 - title.length)).join(' ') + 'time=' + (mstrmojo.now() - time) + 'ms\t' + (msg || ''));
    }; 
  
    mstrmojo.dbg_stack = function dbg_stack() { 
        mstrmojo.dbg(mstrmojo.debug.getStackTrace());
    };
  
    mstrmojo.dbg_xhr = function dbg_xhr(st,p,r) {
        mstrmojo.debug.debug_xhr(st,p,r);
    };
})();



(function () {

    mstrmojo.requiresCls("mstrmojo.debug");

    
    
    var MAX_DEPTH = 14;
    var SPACES = "                              ";
    var NL="\n";
    
    
    
    function _isArray( obj ) { return toString.call(obj) === "[object Array]"; }

    
    
    function _ArrayToString(a,depth,params,nl) {
        var d = depth || 1;
        var spc = SPACES.substr(0,d);
        var output = ["undefined"];

        nl = nl || NL;
        if ( a ) {
            output = ["["];
            for( var i=0; i < a.length; i++) {
                if (i != 0) {
                    output.push("," + nl);
                } else {
                    output.push(nl);
                }
                output.push(spc + _objToString(a[i], d+1,params));
            }
            output.push(spc + spc + nl + "]");
        }            
        return output.join('');
    }

    
    
     function _HashToString(h,depth,params,nl) {
         var    d = depth || 1,
                spc = SPACES.substr(0,d),
                i = 0,
                output = ["undefined"],
                ik = params.ignoreKeys;
                
         nl = nl || NL;

         if ( h ) {
             output = ["{"+nl];

             for (var key in h) {                        
                 
                 
                 if ( params.ignoreFuncs && typeof h[key]==="function") {
                     continue;
                     
                 
                 } else if ( ik && ik[key] ) {
                     continue;
                 }

                 if ( i == 0) {
                     output.push(nl);
                 } else {
                     output.push(","+nl);
                 }
                 
                 output.push(spc + "\"" + key + "\"" + ": ");

                
                 if ( key=="window"||key=="document"||key=="mstrmojo"||key=="global") {
                     if ( h[key]=="null") {
                         output.push( "null");
                     } else {
                         output.push("[" + key + "]");
                     }
                 } else if ( /.*Sibling*/.test(key)) {
                     if ( h[key]=="null") {
                         output.push( "null");
                     } else {
                         output.push("[" + typeof h[key] + "]");
                     }
                 } else if ( key=="target") {
                     if ( h[key]=="null") {
                         output.push( "null");
                     } else {
                         output.push("[id="+h[key].id+"]");
                     }
                 } else {
                     output.push(_objToString(h[key],d+1,params));                
                 }                
                 i++;
             }
             output.push(spc + spc + nl + "}");
         }
         return output.join('');
     }

    
    
    function _TouchListToString(touchList,depth,params,nl) {
        var numTouches = touchList.length;
        var d = depth || 1;
        var spc = SPACES.substr(0,d);
        var output = ["["];
        nl = nl || NL;

        for( var k = 0; k < numTouches;k++) {
            if ( k==0)
                output.push(" ");
            else
                output.push(", ");

            output.push(_objToString(touchList[k], d+1, params, " " ));
        } 
        output.push("]");
        return output.join('');
    }    
    
    
    
    function _touchEventToString(evt,depth,params,nl) {
        var d = depth || 1;
        var spc = SPACES.substr(0,d);
        var output = [];
        
        nl = nl || NL;
        output.push(spc + "{" + nl);
        output.push(spc + "changedTouches: ");
        output.push(_TouchListToString(evt.changedTouches,d+1,params) + "," + nl);
        output.push(spc + "touches: ");
        output.push(_TouchListToString(evt.touches,d+1,params) + "," + nl);
        output.push(spc + "targetTouches: ");
        output.push(_TouchListToString(evt.targetTouches,d+1,params) + nl);
        output.push(spc + "}" + nl);
        return output.join('');
    };

    
    
     function _objToString( o, depth, params, nl ) {
        var d = depth || 1;
        var spc = (nl==" ") ? "" : SPACES.substr(0,d);
        var i = 0;
        var output = [];
        nl = nl || NL;

        if ( o === null ) {
            output.push("null");
        } else if ( typeof o === "undefined" ) {
            output.push("undefined");
        } else if ( _isArray(o)) { 
            output.push(_ArrayToString(o,d+1,params));
        } else if ( typeof o === "function" ) {
            output.push("function");
        } else if ( o instanceof HTMLElement ) {
            output.push("[HTMLElement, id="+o.id+"]");
        } else if ( o instanceof TouchEvent ) {
            output.push(_touchEventToString(o,d+1,params));
        } else {
            if ( o==window || o==document ) {
                output.push(o.toString());
            } else if ( typeof o === "object" ) {            
                if (d <= params.maxDepth ) {
                    output.push(_HashToString(o, d+1,params,nl ));
                } else {
                    
                    output.push("["+(typeof o)+"]");
                }
            } else if (typeof o === "string") {
                
                output.push("\"" + o.replace(/"/g,"\\\"" ) + "\"");
            } else {
                output.push(o.toString());
            }
        }                       
        return output.join('');
    };


	mstrmojo.debug.utils = {

        

         objectToString: function objectToString( o, params ) {
             var depth=0;
             return _objToString(o,depth,params);
         },

	    
	    touchEventToString: function touchEventToString(evt) {
	        var depth=0;
	        return _objToString(evt,depth); 
	    }	    
	};
	
	
	 
    mstrmojo.dbg_obj = function dbg_obj(obj,userParams) {
        var params = { 
            ignoreFuncs: false,
            
            
            ignoreKeys: {},
            maxDepth: MAX_DEPTH
        };
        userParams = userParams || {};
        for (var n in userParams) {
            params[n] = userParams[n];
        }
        mstrmojo.dbg(mstrmojo.debug.utils.objectToString(obj, params ));
    };

    mstrmojo.dbg_touchEvent = function dbg_touchEvent(obj) {
        mstrmojo.dbg(mstrmojo.debug.utils.touchEventToString(obj));
    };
    
})();

