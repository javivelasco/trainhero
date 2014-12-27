/*
 * Copyright 2005 Joe Walker
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 
 


















if (typeof dwr == 'undefined') dwr = {};

(function() {
if (!dwr.engine) dwr.engine = {};






dwr.engine.setErrorHandler = function(handler) {
dwr.engine._errorHandler = handler;
};






dwr.engine.setWarningHandler = function(handler) {
dwr.engine._warningHandler = handler;
};









dwr.engine.setTextHtmlHandler = function(handler) {
dwr.engine._textHtmlHandler = handler;
};









dwr.engine.setTextOrRedirectHandler = function(handler) {
dwr.engine._textOrRedirectHandler = handler;
};

dwr.engine.setPollStatusHandler = function(handler) {
dwr.engine._pollStatusHandler = handler;
};






dwr.engine.setTimeout = function(timeout) {
dwr.engine._timeout = timeout;
};






dwr.engine.setPreHook = function(handler) {
dwr.engine._preHook = handler;
};






dwr.engine.setPostHook = function(handler) {
dwr.engine._postHook = handler;
};






dwr.engine.setHeaders = function(headers) {
dwr.engine._headers = headers;
};






dwr.engine.setAttributes = function(attributes) {
dwr.engine._attributes = attributes;
};






dwr.engine.setOrdered = function(ordered) {
dwr.engine._ordered = ordered;
};








dwr.engine.setAsync = function(async) {
dwr.engine._async = async;
};






dwr.engine.setActiveReverseAjax = function(activeReverseAjax) {
if (activeReverseAjax) {

if (dwr.engine._activeReverseAjax) return;

if (!dwr.engine._retryIntervals || dwr.engine._retryIntervals.length === 0) { dwr.engine._retryIntervals = dwr.engine._defaultRetryIntervals; }
dwr.engine._activeReverseAjax = true;
dwr.engine._poll();
}
else {

if (dwr.engine._activeReverseAjax && dwr.engine._pollBatch) {
dwr.engine.transport.abort(dwr.engine._pollBatch);
}
dwr.engine._activeReverseAjax = false;
}



};






dwr.engine.setNotifyServerOnPageUnload = function(notify, asyncUnload) {
dwr.engine._asyncUnload = (asyncUnload !== undefined) ? asyncUnload : false;
dwr.engine._isNotifyServerOnPageUnload = notify;
};






dwr.engine.setNotifyServerOnPageLoad = function(notify) {
dwr.engine._isNotifyServerOnPageLoad = notify;
if (notify) {
eval("dwr.engine._execute(dwr.engine._pathToDwrServlet, '__System', 'pageLoaded', [ function() { dwr.engine._ordered = false; }]);");
}
};





dwr.engine.setMaxRetries = function(maxRetries) {
dwr.engine._maxRetries = maxRetries;
};





dwr.engine.setRetryIntervals = function(intervalsArray) {
dwr.engine._retryIntervals = intervalsArray;
};







dwr.engine.defaultErrorHandler = function(message, ex) {
dwr.engine._debug("Error: " + ex.name + ", " + ex.message, true);

if (message.indexOf("0x80040111") != -1) return;
if (message === null || message === "") message = "A server error has occurred.";
if ("false" == "true") alert(message);
};







dwr.engine.defaultWarningHandler = function(message, ex) {
dwr.engine._debug(message);
};







dwr.engine.defaultPollStatusHandler = function(newStatus, ex) {
if (newStatus === false && dwr.engine._errorHandler) dwr.engine._errorHandler(ex.message, ex);
};





dwr.engine.beginBatch = function() {
if (dwr.engine._batch) {
dwr.engine._handleError(null, { name:"dwr.engine.batchBegun", message:"Batch already begun" });
return;
}
dwr.engine._batch = dwr.engine.batch.create();
};






dwr.engine.endBatch = function(options) {
var batch = dwr.engine._batch;
if (batch == null) {
dwr.engine._handleError(null, { name:"dwr.engine.batchNotBegun", message:"No batch in progress" });
return;
}
dwr.engine._batch = null;
if (batch.map.callCount === 0) {
return;
}


if (options) {
dwr.engine.batch.merge(batch, options);
}



if (batch.async && (dwr.engine._ordered || dwr.engine._internalOrdered) && dwr.engine._batchesLength !== 0) {
dwr.engine._batchQueue[dwr.engine._batchQueue.length] = batch;
}
else {
return dwr.engine.transport.send(batch);
}
};






dwr.engine.openInDownload = function(data) {
var div = document.createElement("div");
document.body.appendChild(div);
div.innerHTML = "<iframe width='0' height='0' scrolling='no' frameborder='0' src='" + data + "'></iframe>";
};















dwr.version = {



major:parseInt("3", 10),




minor:parseInt("0", 10),




revision:parseInt("0", 10),




build:parseInt("-1", 10),





title:"RC3-dev",




label:"3.0.0-RC3-dev"
};






dwr.engine._allowGetForSafariButMakeForgeryEasier = "false";


dwr.engine._scriptTagProtection = "throw 'allowScriptTagRemoting is false.';";






if (typeof pathToDwrServlet != "undefined") {
dwr.engine._pathToDwrServlet = pathToDwrServlet;
}
else {
dwr.engine._pathToDwrServlet = "/vol/dwr";
}


dwr.engine._contextPath = "/vol";


dwr.engine._pollWithXhr = "false";

dwr.engine._pollOnline = true;


dwr.engine._ModePlainCall = "/call/plaincall/";
dwr.engine._ModePlainPoll = "/call/plainpoll/";
dwr.engine._ModeHtmlCall = "/call/htmlcall/";
dwr.engine._ModeHtmlPoll = "/call/htmlpoll/";


dwr.engine._async = Boolean("true");


dwr.engine._pageId = null;


dwr.engine._dwrSessionId = null;


dwr.engine._scriptSessionId = "";


dwr.engine._preHook = null;


dwr.engine._postHook = null;


dwr.engine._batches = {};


dwr.engine._batchesLength = 0;


dwr.engine._batchQueue = [];


dwr.engine._ordered = false;


dwr.engine._internalOrdered = false;


dwr.engine._batch = null;


dwr.engine._timeout = 0;


dwr.engine._activeReverseAjax = false;


dwr.engine._pollBatch = null;


dwr.engine._pollCometInterval = 200;


dwr.engine.SSL_SECURE_URL = "about:blank";


dwr.engine._retries = 1;
dwr.engine._maxRetries = -1;


dwr.engine._retryIntervals = [];





dwr.engine._defaultRetryIntervals = [ 1, 3, 3 ];

dwr.engine._textHtmlHandler = null;

dwr.engine._textOrRedirectHandler = null;


dwr.engine._headers = null;


if (typeof attributes != "undefined") {
dwr.engine._attributes = attributes;
}
else {
dwr.engine._attributes = null;
}


dwr.engine._nextBatchId = 0;


dwr.engine._instanceId = -1;


dwr.engine._propnames = [ "async", "timeout", "errorHandler", "warningHandler", "textHtmlHandler", "textOrRedirectHandler" ];


dwr.engine._partialResponseNo = 0;
dwr.engine._partialResponseYes = 1;
dwr.engine._partialResponseFlush = 2;


dwr.engine._isNotifyServerOnPageUnload = false;


dwr.engine._isNotifyServerOnPageLoad = false;


dwr.engine._asyncUnload = false;





dwr.engine._mappedClasses = {};


dwr.engine._errorHandler = dwr.engine.defaultErrorHandler;


dwr.engine._warningHandler = dwr.engine.defaultWarningHandler;

dwr.engine._pollStatusHandler = dwr.engine.defaultPollStatusHandler;


dwr.engine._postSeperator = "\n";
dwr.engine._defaultInterceptor = function(data) { return data; };
dwr.engine._urlRewriteHandler = dwr.engine._defaultInterceptor;
dwr.engine._contentRewriteHandler = dwr.engine._defaultInterceptor;
dwr.engine._replyRewriteHandler = dwr.engine._defaultInterceptor;


dwr.engine._excludeObjectAttributes = {
"$dwrClassName": true,
"$dwrByRef": true,
"$_dwrConversionRef": true
};


dwr.engine._beforeUnloading = false;



dwr.engine._beforeUnloader = function() {
dwr.engine._beforeUnloading = true;



setTimeout(function() {



setTimeout(function() {
dwr.engine._beforeUnloading = false;
}, 1000);
}, 1);
};


dwr.engine._unloading = false;


dwr.engine._unloader = function() {
dwr.engine._unloading = true;


dwr.engine._batchQueue.length = 0;


var batch;
for (var batchId in dwr.engine._batches) {
batch = dwr.engine._batches[batchId];

if (batch && batch.map) {
if (batch.req) {
batch.req.abort();
}
}
}


if (dwr.engine._isNotifyServerOnPageUnload) {
dwr.engine._debug("calling unloader for: " + dwr.engine._scriptSessionId);
batch = {
map:{
callCount:1,
'c0-scriptName':'__System',
'c0-methodName':'pageUnloaded',
'c0-id':0
},
paramCount:0, isPoll:false, async:dwr.engine._asyncUnload,
headers:{}, preHooks:[], postHooks:[],
timeout:dwr.engine._timeout,
errorHandler:null, warningHandler:null, textHtmlHandler:null, textOrRedirectHandler:null,
path:dwr.engine._pathToDwrServlet,
handlers:[{ exceptionHandler:null, callback:null }]
};
dwr.engine.transport.send(batch);
dwr.engine._isNotifyServerOnPageUnload = false;
}
};

function ignoreIfUnloading(batch, f) {

if (dwr.engine._unloading) return;

if (dwr.engine._beforeUnloading && (batch == null || batch.async)) {
setTimeout(function() {
ignoreIfUnloading(batch, f);
}, 100);
}

else {
return f();
}
}

dwr.engine._initializer = {




setCurrentBrowser: function() {
var userAgent = navigator.userAgent;
var versionString = navigator.appVersion;
var version = parseFloat(versionString);
dwr.engine.isOpera = (userAgent.indexOf("Opera") >= 0) ? version : 0;
dwr.engine.isKhtml = (versionString.indexOf("Konqueror") >= 0) || (versionString.indexOf("Safari") >= 0) ? version : 0;
dwr.engine.isSafari = (versionString.indexOf("Safari") >= 0) ? version : 0;
dwr.engine.isJaxerServer = (window.Jaxer && Jaxer.isOnServer);

var geckoPos = userAgent.indexOf("Gecko");
dwr.engine.isMozilla = ((geckoPos >= 0) && (!dwr.engine.isKhtml)) ? version : 0;
dwr.engine.isFF = 0;
dwr.engine.isIE = 0;

try {
if (dwr.engine.isMozilla) {
dwr.engine.isFF = parseFloat(userAgent.split("Firefox/")[1].split(" ")[0]);
}
if ((document.all) && (!dwr.engine.isOpera)) {
dwr.engine.isIE = parseFloat(versionString.split("MSIE ")[1].split(";")[0]);
}
}
catch(ex) { }
},




preInit: function() {

dwr.engine._pageId = dwr.engine.util.tokenify(new Date().getTime()) + "-" + dwr.engine.util.tokenify(Math.random() * 1E16);


dwr.engine.transport.updateDwrSessionFromCookie();


if (!dwr.engine.isJaxerServer) {
dwr.engine.util.addEventListener(window, 'beforeunload', dwr.engine._beforeUnloader);
dwr.engine.util.addEventListener(window, 'unload', dwr.engine._unloader);
}


var g = dwr.engine._global;
if (!g.dwr) {
g.dwr = {};
}
if (!g.dwr._) {
g.dwr._ = [];
}
dwr.engine._instanceId = g.dwr._.length;
g.dwr._[dwr.engine._instanceId] = {
handleCallback: dwr.engine.remote.handleCallback,
handleException: dwr.engine.remote.handleException,
handleNewWindowName: dwr.engine.remote.handleNewWindowName,
handleBatchException: dwr.engine.remote.handleBatchException,
handleFunctionCall: dwr.engine.remote.handleFunctionCall,
handleObjectCall: dwr.engine.remote.handleObjectCall,
handleSetCall: dwr.engine.remote.handleSetCall,
handleFunctionClose: dwr.engine.remote.handleFunctionClose,
handleObjectCall: dwr.engine.remote.handleObjectCall,
handleForeign: dwr.engine.remote.handleForeign,
pollCometDisabled: dwr.engine.remote.pollCometDisabled,
newObject: dwr.engine.remote.newObject,
toDomElement: dwr.engine.serialize.toDomElement,
toDomDocument: dwr.engine.serialize.toDomDocument,
beginIFrameResponse: dwr.engine.transport.iframe.remote.beginIFrameResponse,
endIFrameResponse: dwr.engine.transport.iframe.remote.endIFrameResponse,
_eval: dwr.engine._eval
};
},

init: function() {
dwr.engine._initializer.setCurrentBrowser();
dwr.engine._initializer.preInit();

if (dwr.engine._isNotifyServerOnPageLoad) {
eval("dwr.engine._execute(dwr.engine._pathToDwrServlet, '__System', 'pageLoaded', [ function() { dwr.engine._ordered = false; }]);");
}
},

initForPushState: function() {
dwr.engine._dwrSessionId = null;
dwr.engine._initializer.init();
}
};











dwr.engine._execute = function(path, scriptName, methodName, args) {
var singleShot = false;
if (dwr.engine._batch == null) {
dwr.engine.beginBatch();
singleShot = true;
}

var batch = dwr.engine._batch;

if (batch.path == null) {
batch.path = path;
}
else {
if (batch.path != path) {
dwr.engine._handleError(batch, { name:"dwr.engine.multipleServlets", message:"Can't batch requests to multiple DWR Servlets." });
return;
}
}

dwr.engine.batch.addCall(batch, scriptName, methodName, args);


batch.map.callCount++;
if (singleShot) {
return dwr.engine.endBatch();
}
};





dwr.engine._poll = function() {
if (!dwr.engine._activeReverseAjax) {
return;
}
dwr.engine._pollBatch = dwr.engine.batch.createPoll();
dwr.engine.transport.send(dwr.engine._pollBatch);
};


dwr.engine._eval = function(script) {
if (script == null) {
return null;
}
if (script === "") {
dwr.engine._debug("Warning: blank script", true);
return null;
}

return eval(script);
};


dwr.engine._callPostHooks = function(batch) {
if (batch.postHooks) {
for (var i = 0; i < batch.postHooks.length; i++) {
batch.postHooks[i]();
}
batch.postHooks = null;
}
};







dwr.engine._isHeartbeatBatch = function(batch) {
return (batch.map && batch.map['c0-methodName'] === 'checkHeartbeat' && batch.map['c0-scriptName'] === '__System');
};







dwr.engine._handleError = function(batch, ex) {
if (dwr.engine._isHeartbeatBatch(batch)) {
return;
}
var errorHandlers = [];
if (batch && batch.isPoll) {
dwr.engine._handlePollRetry(batch, ex);
} else {

if (batch) {
for (var i = 0; i < batch.map.callCount; i++) {
var handlers = batch.handlers[i];
if (!handlers.completed) {
if (typeof handlers.errorHandler == "function") errorHandlers.push(handlers.errorHandler);
handlers.completed = true;
}
}
}

ignoreIfUnloading(batch, function() {
if (ex.name === "dwr.engine.emptyReply" && ex.hasOwnProperty("responseText") && dwr.engine._textHtmlOrRedirectHandlerExists(batch)) {
dwr.engine._handleTextHtmlResponse(batch, ex);
return;
}
dwr.engine._prepareException(ex);
var errorHandler;
while(errorHandlers.length > 0) {
errorHandler = errorHandlers.shift();
errorHandler(ex.message, ex);
}
if (batch && typeof batch.errorHandler == "function") batch.errorHandler(ex.message, ex);
else if (dwr.engine._errorHandler) dwr.engine._errorHandler(ex.message, ex);
if (batch) { dwr.engine.batch.remove(batch); };
});
}
};

dwr.engine._textHtmlOrRedirectHandlerExists = function(batch) {
return (batch && batch.textHtmlHandler) || (batch && batch.textOrRedirectHandler) || dwr.engine._textHtmlHandler || dwr.engine._textOrRedirectHandler;
};

dwr.engine._handleTextHtmlResponse = function(batch, textHtmlObj) {
if (batch && typeof batch.textHtmlHandler === "function") batch.textHtmlHandler(textHtmlObj);
else if (dwr.engine._textHtmlHandler) dwr.engine._textHtmlHandler(textHtmlObj);
else dwr.engine._handleTextOrRedirectResponse(batch, textHtmlObj);
if (batch) dwr.engine.batch.remove(batch);
};

dwr.engine._handleTextOrRedirectResponse = function(batch, textHtmlObj) {
if (batch && typeof batch.textOrRedirectHandler == "function") batch.textOrRedirectHandler(textHtmlObj);
else if (dwr.engine._textOrRedirectHandler) dwr.engine._textOrRedirectHandler(textHtmlObj);
if (batch) dwr.engine.batch.remove(batch);
};







dwr.engine._handlePollRetry = function(batch, ex) {
var retryInterval = dwr.engine._getRetryInterval();

if (dwr.engine._retries === dwr.engine._retryIntervals.length - 1) {
dwr.engine._debug("poll retry - going offline: " + retryInterval/1000 + " seconds");
dwr.engine._handlePollStatusChange(false, ex, batch);

var heartbeatInterval = setInterval(function() {
if (dwr.engine._maxRetries === -1 || dwr.engine._retries < dwr.engine._maxRetries) {
dwr.engine._execute(dwr.engine._pathToDwrServlet, '__System', 'checkHeartbeat', [ function() {

clearInterval(heartbeatInterval);
dwr.engine._poll();
}]);
dwr.engine._retries++;
dwr.engine._debug("DWR Offline - poll retry - interval: " + retryInterval/1000 + " seconds");
} else {

clearInterval(heartbeatInterval);
dwr.engine._debug("max retries reached, stop polling for server status.");
dwr.engine._handlePollStatusChange(false, ex, batch);
}
}, retryInterval);
} else {
dwr.engine._retries++;
dwr.engine.batch.remove(batch);
dwr.engine._debug("DWR Online - poll retry - interval: " + retryInterval/1000 + " seconds");
setTimeout(dwr.engine._poll, retryInterval);
}
};

dwr.engine._getRetryInterval = function() {
var retryInterval;
if (dwr.engine._retries < dwr.engine._retryIntervals.length) {
retryInterval = dwr.engine._retryIntervals[dwr.engine._retries] * 1000;
} else {

retryInterval = dwr.engine._retryIntervals[dwr.engine._retryIntervals.length - 1] * 1000;
}
return retryInterval;
};







dwr.engine._handlePollStatusChange = function(newStatus, ex, batch) {
if (batch.isPoll || dwr.engine._isHeartbeatBatch(batch)) {
var changed = dwr.engine._pollOnline !== newStatus;
var maxRetriesReached = dwr.engine._maxRetries === dwr.engine._retries;
dwr.engine._pollOnline = newStatus;
if ((changed || maxRetriesReached) && typeof dwr.engine._pollStatusHandler === "function") dwr.engine._pollStatusHandler(newStatus, ex, maxRetriesReached);
if (newStatus) {
dwr.engine._retries = 1;
}
}
};







dwr.engine._handleWarning = function(batch, ex) {
if (dwr.engine._isHeartbeatBatch(batch)) {
return;
}
ignoreIfUnloading(batch, function() {

dwr.engine._prepareException(ex);
if (batch && typeof batch.warningHandler == "function") batch.warningHandler(ex.message, ex);
else if (dwr.engine._warningHandler) dwr.engine._warningHandler(ex.message, ex);
if (batch) dwr.engine.batch.remove(batch);
});
};






dwr.engine._prepareException = function(ex) {
if (typeof ex == "string") ex = { name:"unknown", message:ex };
if (ex.message == null) ex.message = "";
if (ex.name == null) ex.name = "unknown";
};





dwr.engine._delegate = (function() {
function F(){}
return (function(obj){
F.prototype = obj;
return new F();
});
})();





dwr.engine._createFromMap = function(map) {
var obj = new this();
for(prop in map) if (map.hasOwnProperty(prop)) obj[prop] = map[prop];
return obj;
};




dwr.engine._global = (function(){return this;}).call(null);







dwr.engine._getObject = function(prop) {
var parts = prop.split(".");
var value;
var scope = dwr.engine._global;
while(parts.length > 0) {
var currprop = parts.shift();
value = scope[currprop];
if (parts.length > 0 && value == null) return undefined;
scope = value;
}
return value;
};






dwr.engine._setObject = function(prop, obj) {
var parts = prop.split(".");
var level;
var scope = dwr.engine._global;
while(parts.length > 0) {
var currprop = parts.shift();
if (parts.length === 0) {
scope[currprop] = obj;
}
else {
level = scope[currprop];
if (level == null) {
scope[currprop] = level = {};
}
scope = level;
}
}
};







dwr.engine._debug = function(message, stacktrace) {
var written = false;
try {
if (window.console) {
if (stacktrace && window.console.trace) window.console.trace();
window.console.log(message);
written = true;
}
else if (window.opera && window.opera.postError) {
window.opera.postError(message);
written = true;
}
else if (window.Jaxer && Jaxer.isOnServer) {
Jaxer.Log.info(message);
written = true;
}
}
catch (ex) {   }

if (!written) {
var debug = document.getElementById("dwr-debug");
if (debug) {
var contents = message + "<br/>" + debug.innerHTML;
if (contents.length > 2048) contents = contents.substring(0, 2048);
debug.innerHTML = contents;
}
}
};




dwr.engine.remote = {







handleCallback:function(batchId, callId, reply) {
var batch = dwr.engine._batches[batchId];
if (batch == null) {
dwr.engine._debug("Warning: batch == null in remoteHandleCallback for batchId=" + batchId, true);
return;
}


batch.reply = reply;



try {
var handlers = batch.handlers[callId];
if (!handlers) {
dwr.engine._debug("Warning: Missing handlers. callId=" + callId, true);
}
else {
batch.handlers[callId].completed = true;
if (typeof handlers.callback == "function") {
handlers.callback.apply(handlers.callbackScope, [ reply, handlers.callbackArg ]);
}
}
}
catch (ex) {
dwr.engine._handleError(batch, ex);
}
},






handleFunctionCall:function(id, args) {
var func = dwr.engine.serialize.remoteFunctions[id];
func.apply(window, args);
},






handleObjectCall:function(id, methodName, args) {
var obj = dwr.engine.serialize.remoteFunctions[id];
obj[methodName].apply(obj, args);
},






handleSetCall:function(id, propertyName, data) {
var obj = dwr.engine.serialize.remoteFunctions[id];
obj[propertyName] = data;
},





handleFunctionClose:function(id) {
delete dwr.engine.serialize.remoteFunctions[id];
},








handleException:function(batchId, callId, ex) {
var batch = dwr.engine._batches[batchId];
if (batch == null) {
dwr.engine._debug("Warning: null batch in remoteHandleException", true);
return;
}

var handlers = batch.handlers[callId];
batch.handlers[callId].completed = true;
if (handlers == null) {
dwr.engine._debug("Warning: null handlers in remoteHandleException", true);
return;
}

if (ex.message === undefined) {
ex.message = "";
}

if (typeof handlers.exceptionHandler == "function") {
handlers.exceptionHandler.call(handlers.exceptionScope, ex.message, ex, handlers.exceptionArg);
}
else if (typeof batch.errorHandler == "function") {
batch.errorHandler(ex.message, ex);
}
},







handleBatchException:function(ex, batchId) {
var searchBatch = (dwr.engine._receivedBatch == null && batchId != null);
if (searchBatch) {
dwr.engine._receivedBatch = dwr.engine._batches[batchId];
}
if (ex.message === undefined) ex.message = "";
dwr.engine._handleError(dwr.engine._receivedBatch, ex);
if (searchBatch) {
dwr.engine._receivedBatch = null;
dwr.engine.batch.remove(dwr.engine._batches[batchId]);
}
},




handleNewWindowName:function(windowName) {
dwr.engine._debug("Setting new window name: " + windowName);
if (window.name != null && window.name !== "") {
dwr.engine._debug("- Warning: This will override existing name of: " + window.name);
}
window.name = windowName;
},






handleForeign:function(windowName, script) {
var foreign = window.open(null, windowName);
if (foreign != null) {
if (foreign.dwr != null) {
foreign.dwr.engine._eval(script);
}
else {
dwr.engine._debug("Found window, but DWR did not exist in it");
}
}
else {
dwr.engine._debug("Could not find window");
}
},







pollCometDisabled:function(ex, batchId){
dwr.engine.setActiveReverseAjax(false);
var searchBatch = (dwr.engine._receivedBatch == null && batchId != null);
if (searchBatch) {
dwr.engine._receivedBatch = dwr.engine._batches[batchId];
}
if (ex.message === undefined) {
ex.message = "";
}
dwr.engine._handleError(dwr.engine._receivedBatch, ex);
if (searchBatch) {
dwr.engine._receivedBatch = null;
dwr.engine.batch.remove(dwr.engine._batches[batchId]);
}
},







newObject:function(dwrClassName, memberMap){
var classfunc = dwr.engine._mappedClasses[dwrClassName];
if (classfunc && classfunc.createFromMap) {
return classfunc.createFromMap(memberMap);
}
else {
memberMap.$dwrClassName = dwrClassName;
return memberMap;
}
}
};




dwr.engine.serialize = {



domDocument:[
"Msxml2.DOMDocument.6.0",
"Msxml2.DOMDocument.5.0",
"Msxml2.DOMDocument.4.0",
"Msxml2.DOMDocument.3.0",
"MSXML2.DOMDocument",
"MSXML.DOMDocument",
"Microsoft.XMLDOM"
],




remoteFunctions:{},




funcId:0,





toDomElement:function(xml) {
return dwr.engine.serialize.toDomDocument(xml).documentElement;
},





toDomDocument:function(xml) {
var dom;
if (window.DOMParser) {
var parser = new DOMParser();
dom = parser.parseFromString(xml, "text/xml");
if (!dom.documentElement || dom.documentElement.tagName == "parsererror") {
var message = dom.documentElement.firstChild.data;
message += "\n" + dom.documentElement.firstChild.nextSibling.firstChild.data;
throw message;
}
return dom;
}
else if (window.ActiveXObject) {
dom = dwr.engine.util.newActiveXObject(dwr.engine.serialize.domDocument);
dom.loadXML(xml);
return dom;
}
else {
var div = document.createElement("div");
div.innerHTML = xml;
return div;
}
},










convert:function(batch, directrefmap, otherrefmap, data, name, depth) {
if (data == null) {
batch.map[name] = "null:null";
return;
}

switch (typeof data) {
case "boolean":
batch.map[name] = "boolean:" + data;
break;
case "number":
batch.map[name] = "number:" + data;
break;
case "string":
batch.map[name] = "string:" + encodeURIComponent(data);
break;
case "object":
var ref = dwr.engine.serialize.lookup(directrefmap, otherrefmap, data, name);
var objstr = Object.prototype.toString.call(data);
if (data.$dwrByRef) batch.map[name] = dwr.engine.serialize.convertByReference(batch, directrefmap, otherrefmap, data, name, depth + 1);
else if (ref != null) batch.map[name] = ref;
else if (objstr == "[object String]") batch.map[name] = "string:" + encodeURIComponent(data);
else if (objstr == "[object Boolean]") batch.map[name] = "boolean:" + data;
else if (objstr == "[object Number]") batch.map[name] = "number:" + data;
else if (objstr == "[object Date]") batch.map[name] = "date:" + data.getTime();
else if (objstr == "[object Array]") batch.map[name] = dwr.engine.serialize.convertArray(batch, directrefmap, otherrefmap, data, name, depth + 1);
else if (data && data.tagName && data.tagName.toLowerCase() == "input" && data.type && data.type.toLowerCase() == "file") {
batch.fileUpload = true;
batch.map[name] = data;
}
else {


if (data.nodeName && data.nodeType) {
batch.map[name] = dwr.engine.serialize.convertXml(batch, directrefmap, otherrefmap, data, name, depth + 1);
}
else {
batch.map[name] = dwr.engine.serialize.convertObject(batch, directrefmap, otherrefmap, data, name, depth + 1);
}
}
break;
case "function":

if (depth === 0) {
batch.map[name] = dwr.engine.serialize.convertByReference(batch, directrefmap, otherrefmap, data, name, depth + 1);
}
break;
default:
dwr.engine._handleWarning(null, { name:"dwr.engine.unexpectedType", message:"Unexpected type: " + typeof data + ", attempting default converter." });
batch.map[name] = "default:" + data;
break;
}
},






convertByReference:function(batch, directrefmap, otherrefmap, data, name, depth) {
var funcId = "f" + dwr.engine.serialize.funcId;
dwr.engine.serialize.remoteFunctions[funcId] = data;
dwr.engine.serialize.funcId++;
return "byref:" + funcId;
},






convertArray:function(batch, directrefmap, otherrefmap, data, name, depth) {
var childName, i;
if (dwr.engine.isIE <= 7) {

var buf = ["array:["];
for (i = 0; i < data.length; i++) {
if (i !== 0) buf.push(",");
batch.paramCount++;
childName = "c" + dwr.engine._batch.map.callCount + "-e" + batch.paramCount;
dwr.engine.serialize.convert(batch, directrefmap, otherrefmap, data[i], childName, depth + 1);
buf.push("reference:");
buf.push(childName);
}
buf.push("]");
reply = buf.join("");
}
else {

var reply = "array:[";
for (i = 0; i < data.length; i++) {
if (i !== 0) reply += ",";
batch.paramCount++;
childName = "c" + dwr.engine._batch.map.callCount + "-e" + batch.paramCount;
dwr.engine.serialize.convert(batch, directrefmap, otherrefmap, data[i], childName, depth + 1);
reply += "reference:";
reply += childName;
}
reply += "]";
}

return reply;
},






convertObject:function(batch, directrefmap, otherrefmap, data, name, depth) {

var reply = "Object_" + dwr.engine.serialize.getObjectClassName(data).replace(/:/g, "?") + ":{";
var elementset = (data.constructor && data.constructor.$dwrClassMembers ? data.constructor.$dwrClassMembers : data);
var element;
for (element in elementset) {
if (typeof data[element] != "function" && !dwr.engine._excludeObjectAttributes[element]) {
batch.paramCount++;
var childName = "c" + dwr.engine._batch.map.callCount + "-e" + batch.paramCount;
dwr.engine.serialize.convert(batch, directrefmap, otherrefmap, data[element], childName, depth + 1);
reply += encodeURIComponent(element) + ":reference:" + childName + ", ";
}
}

if (reply.substring(reply.length - 2) == ", ") {
reply = reply.substring(0, reply.length - 2);
}
reply += "}";

return reply;
},






convertXml:function(batch, directrefmap, otherrefmap, data, name, depth) {
var output;
if (window.XMLSerializer) output = new XMLSerializer().serializeToString(data);
else if (data.toXml) output = data.toXml;
else output = data.innerHTML;

return "xml:" + encodeURIComponent(output);
},






lookup:function(directrefmap, otherrefmap, data, name) {

var ref;
if ("$_dwrConversionRef" in data) {
ref = data.$_dwrConversionRef;
if (ref && directrefmap[ref] != data) ref = null;
}
if (ref == null) {
for(r in otherrefmap) {
if (otherrefmap[r] == data) {
ref = r;
break;
}
}
}
if (ref != null) return "reference:" + ref;

try {
data.$_dwrConversionRef = name;
directrefmap[name] = data;
}
catch(err) {
otherrefmap[name] = data;
}
return null;
},





cleanup:function(directrefmap) {
for(var refName in directrefmap) {
var data = directrefmap[refName];
try {
delete data.$_dwrConversionRef;
}
catch(err) {
data.$_dwrConversionRef = undefined;
}
}
},









getObjectClassName:function(obj) {

if (obj.$dwrClassName)
return obj.$dwrClassName;
else if (obj.constructor && obj.constructor.$dwrClassName)
return obj.constructor.$dwrClassName;
else
return "Object";
}
};




dwr.engine.transport = {





send:function(batch) {
dwr.engine.transport.updateDwrSessionFromCookie();
if (!dwr.engine._dwrSessionId) {
dwr.engine._internalOrdered = true;
var idbatch = {
map:{
callCount:1,
'c0-scriptName':'__System',
'c0-methodName':'generateId',
'c0-id':0
},
paramCount:0, isPoll:false, async:batch.async,
headers:{}, preHooks:[],
postHooks:[function() {
dwr.engine._internalOrdered = false;
}],
timeout:dwr.engine._timeout,
errorHandler:batch.errorHandler, warningHandler:batch.warningHandler, textHtmlHandler:batch.textHtmlHandler, textOrRedirectHandler:batch.textOrRedirectHandler,
path:batch.path,
handlers:[{
exceptionHandler:null,
callback:function(id) {
dwr.engine.transport.updateDwrSessionFromCookie();
if (!dwr.engine._dwrSessionId) {
dwr.engine.transport.setDwrSession(id);
}
dwr.engine.transport.send2(batch);
}
}]
};
return dwr.engine.transport.send2(idbatch);
}
else {
return dwr.engine.transport.send2(batch);
}
},






send2:function(batch) {
dwr.engine.batch.prepareToSend(batch);


var isCrossDomain = false;
if (batch.path == null) {
batch.path = dwr.engine._pathToDwrServlet;
}
if (batch.path.indexOf("http://") === 0 || batch.path.indexOf("https://") === 0) {
var dwrShortPath = batch.path.split("/", 3).join("/");
var hrefShortPath = window.location.href.split("/", 3).join("/");
isCrossDomain = (dwrShortPath != hrefShortPath);
}

if (batch.fileUpload) {
if (isCrossDomain) {
throw new Error("Cross domain file uploads are not possible with this release of DWR");
}
batch.transport = dwr.engine.transport.iframe;
}
else if (isCrossDomain && !dwr.engine.isJaxerServer) {
batch.transport = dwr.engine.transport.scriptTag;
}



else {
batch.transport = dwr.engine.transport.xhr;
}

return batch.transport.send(batch);
},




complete:function(batch) {
dwr.engine.batch.validate(batch);
dwr.engine.transport.remove(batch);
},






abort:function(batch) {
var transport = batch.transport;
dwr.engine.transport.remove(batch);
if (transport.abort) {
transport.abort(batch);
}
dwr.engine._handleError(batch, { name:"dwr.engine.timeout", message:"Timeout" });
},





remove:function(batch) {
if (batch.transport) {
dwr.engine._callPostHooks(batch);
batch.transport.remove(batch);
batch.transport = null;
}
dwr.engine.batch.remove(batch);
},

setDwrSession:function(dwrsess) {
dwr.engine._dwrSessionId = dwrsess;
document.cookie = "DWRSESSIONID=" + dwrsess + "; path=" + (dwr.engine._contextPath !== "" ? dwr.engine._contextPath : "/");
dwr.engine._scriptSessionId = dwrsess + "/" + dwr.engine._pageId;
},

updateDwrSessionFromCookie:function() {
if (!dwr.engine._dwrSessionId) {
var match = document.cookie.match(/(?:^|; )DWRSESSIONID=([^;]+)/);
if (match) {
dwr.engine.transport.setDwrSession(match[1]);
}
}
},




xhr:{



httpMethod:"POST",






XMLHTTP:["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.5.0", "Msxml2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"],





send:function(batch) {
if (batch.isPoll) {
batch.map.partialResponse = dwr.engine._partialResponseYes;
}


if (batch.isPoll && dwr.engine._pollWithXhr == "true") {
batch.map.partialResponse = dwr.engine._partialResponseNo;
}
if (batch.isPoll && dwr.engine.isIE) {
batch.map.partialResponse = dwr.engine._partialResponseNo;
}

if (window.XMLHttpRequest) {
batch.req = new XMLHttpRequest();
}
else if (window.ActiveXObject) {
batch.req = dwr.engine.util.newActiveXObject(dwr.engine.transport.xhr.XMLHTTP);
}


if (batch.async === true) {
batch.req.onreadystatechange = function() {
if (typeof dwr != 'undefined') {
dwr.engine.transport.xhr.stateChange(batch);
}
};
}

httpMethod = dwr.engine.transport.xhr.httpMethod;


var indexSafari = navigator.userAgent.indexOf("Safari/");
if (indexSafari >= 0) {
var version = navigator.userAgent.substring(indexSafari + 7);
if (parseInt(version, 10) < 400) {
if (dwr.engine._allowGetForSafariButMakeForgeryEasier == "true") {
httpMethod = "GET";
}
else {
dwr.engine._handleWarning(batch, {
name: "dwr.engine.oldSafari",
message: "Safari GET support disabled. See getahead.org/dwr/server/servlet and allowGetForSafariButMakeForgeryEasier."
});
}
}
}

batch.mode = batch.isPoll ? dwr.engine._ModePlainPoll : dwr.engine._ModePlainCall;
var request = dwr.engine.batch.constructRequest(batch, httpMethod);

try {
batch.req.open(httpMethod, request.url, batch.async);
try {
for (var prop in batch.headers) {
var value = batch.headers[prop];
if (typeof value == "string") {
batch.req.setRequestHeader(prop, value);
}
}
if (!batch.headers["Content-Type"]) {
batch.req.setRequestHeader("Content-Type", "text/plain");
}
}
catch (ex) {
dwr.engine._handleWarning(batch, ex);
}

batch.req.send(request.body);
if (batch.async === false) {
dwr.engine.transport.xhr.stateChange(batch);
}
}
catch (ex2) {
dwr.engine._handleError(batch, ex2);
}

if (batch.isPoll && batch.map.partialResponse == dwr.engine._partialResponseYes) {
dwr.engine.transport.xhr.checkCometPoll();
}


return batch.reply;
},






stateChange:function(batch) {
var toEval;

if (batch.completed) {
dwr.engine._debug("Error: _stateChange() with batch.completed");
return;
}


var req = batch.req;
var status = 0;
try {
if (req.readyState >= 2) {
status = req.status;
}
}
catch(ignore) {}



if (status === 0 && req.readyState < 4) {
return;
}





if (status === 200) {
dwr.engine._handlePollStatusChange(true, null, batch);
}


if (req.readyState != 4) {
return;
}

if (dwr.engine._unloading && !dwr.engine.isJaxerServer) {
dwr.engine._debug("Ignoring reply from server as page is unloading.");
return;
}

try {
var reply = req.responseText;
reply = dwr.engine._replyRewriteHandler(reply);
var contentType = dwr.engine.util.getContentType(req, dwr.engine.isJaxerServer);
if (status === 200) {
if (reply == null || reply === "") {
dwr.engine._handleError(batch, { name:"dwr.engine.missingData", message:"No data received from server" });
}
if (!contentType.match(/^text\/plain/) && !contentType.match(/^text\/javascript/) && !contentType.match(/^text\/html/)) {
dwr.engine._handleWarning(batch, { name:"dwr.engine.invalidMimeType", message:"Invalid content type: '" + contentType + "'" });
} else if (contentType.match(/^text\/plain/) || contentType.match(/^text\/javascript/)) {

if (batch.isPoll && batch.map.partialResponse == dwr.engine._partialResponseYes) {
dwr.engine.transport.xhr.processCometResponse(reply, batch);
} else {
if (reply.search("//#DWR") === -1) {
dwr.engine._handleWarning(batch, { name:"dwr.engine.invalidReply", message:"Invalid reply from server" });
} else {
toEval = reply;
}
}
}
} else if (status >= 400) {
var statusText = "statusText could not be read.";
try {
statusText = req.statusText;
} catch (ex) {

}
dwr.engine._handleError(batch, { name:"dwr.engine.http." + status, message:statusText });
}
} catch (ex2) {
dwr.engine._handleWarning(batch, ex2);
}


dwr.engine._receivedBatch = batch;
if (toEval != null) toEval = toEval.replace(dwr.engine._scriptTagProtection, "");
dwr.engine._eval(toEval);
dwr.engine._receivedBatch = null;
dwr.engine.transport.complete(batch);
},





checkCometPoll:function() {
var req = dwr.engine._pollBatch && dwr.engine._pollBatch.req;
if (req) {
var text = req.responseText;
if (text != null) {
dwr.engine.transport.xhr.processCometResponse(text, dwr.engine._pollBatch);
}
}

if (dwr.engine._pollBatch) {
setTimeout(dwr.engine.transport.xhr.checkCometPoll, dwr.engine._pollCometInterval);
}
},








processCometResponse:function(response, batch) {
if (batch.charsProcessed == response.length) return;
if (response.length === 0) {
batch.charsProcessed = 0;
return;
}

var firstStartTag = response.indexOf("//#DWR-START#", batch.charsProcessed);
if (firstStartTag == -1) {

return;
}




var lastEndTag = response.lastIndexOf("//#DWR-END#");
if (lastEndTag == -1) {

return;
}


if (response.charCodeAt(lastEndTag + 11) == 13 && response.charCodeAt(lastEndTag + 12) == 10) {
batch.charsProcessed = lastEndTag + 13;
}
else {
batch.charsProcessed = lastEndTag + 11;
}

var exec = response.substring(firstStartTag + 13, lastEndTag);

try {
dwr.engine._receivedBatch = batch;
dwr.engine._eval(exec);
dwr.engine._receivedBatch = null;
}
catch (ex) {


if (dwr != null) {
dwr.engine._handleError(batch, ex);
}
}
},




abort:function(batch) {
if (batch.req) {
batch.req.abort();
}
},





remove:function(batch) {

if (batch.req) {
delete batch.req;
}
}
},




iframe:{



httpMethod:"POST",





send:function(batch) {
if (document.body == null) {
setTimeout(function(){dwr.engine.transport.iframe.send(batch);}, 100);
return;
}
batch.httpMethod = dwr.engine.transport.iframe.httpMethod;
if (batch.fileUpload) {
batch.httpMethod = "POST";
batch.encType = "multipart/form-data";
}
var idname = dwr.engine.transport.iframe.getId(batch);
batch.div1 = document.createElement("div");
document.body.appendChild(batch.div1);
batch.div1.innerHTML = "<iframe src='" + dwr.engine.SSL_SECURE_URL + "' frameborder='0' style='width:0px;height:0px;border:0;display:none;' id='" + idname + "' name='" + idname + "'></iframe>";
batch.iframe = batch.div1.firstChild;
batch.document = document;
batch.iframe.batch = batch;

if ('readyState' in batch.iframe) {
var readyStateCompleteCount = 0;
dwr.engine.util.addEventListener(batch.iframe, "readystatechange", function(ev) {


if (batch.iframe.readyState === "complete") {
readyStateCompleteCount = readyStateCompleteCount + 1;
if (readyStateCompleteCount > 1) {
dwr.engine.transport.iframe.checkForAndCompleteNonDWRResponse(batch);
}
}
});
} else {
dwr.engine.util.addEventListener(batch.iframe, "load", function(ev) {
dwr.engine.transport.iframe.checkForAndCompleteNonDWRResponse(batch);
});
}
dwr.engine.transport.iframe.beginLoader(batch, idname);
},

checkForAndCompleteNonDWRResponse:function(batch) {
if (typeof dwr != "undefined" && batch && batch.iframe) {

var contentDocument = dwr.engine.util.getContentDocument(batch);
var htmlResponse = contentDocument.documentElement ? contentDocument.documentElement.outerHTML : null;

if (htmlResponse && htmlResponse.search("//#DWR") === -1) {
dwr.engine.transport.complete(batch.iframe.batch);
}
}
},






getId:function(batch) {
return batch.isPoll ? "dwr-if-poll-" + batch.map.batchId : "dwr-if-" + batch.map.batchId;
},






beginLoader:function(batch, idname) {
var contentDocument = dwr.engine.util.getContentDocument(batch);
if (contentDocument.body === null) {
setTimeout(function(){dwr.engine.transport.iframe.beginLoader(batch, idname);}, 100);
return;
}
if (batch.isPoll) {
batch.map.partialResponse = dwr.engine._partialResponseYes;
}
batch.mode = batch.isPoll ? dwr.engine._ModeHtmlPoll : dwr.engine._ModeHtmlCall;
var request = dwr.engine.batch.constructRequest(batch, batch.httpMethod);
if (batch.httpMethod === "GET") {
batch.iframe.setAttribute("src", request.url);
}
else {

// See http://soakedandsoaped.com/articles/read/firefox-3-native-ajax-file-upload

batch.div2 = document.createElement("div");
document.body.appendChild(batch.div2);
batch.div2.innerHTML = "<form" + (batch.encType ? " encType='" + batch.encType + "' encoding='" + batch.encType + "'" : "") + "></form>";
batch.form = batch.div2.firstChild;
batch.form.setAttribute("action", request.url);
batch.form.setAttribute("target", idname);
batch.form.setAttribute("style", "display:none");
batch.form.setAttribute("method", batch.httpMethod);
for (var prop in batch.map) {
var value = batch.map[prop];
if (typeof value != "function") {
if (value && value.tagName && value.tagName.toLowerCase() == "input" && value.type && value.type.toLowerCase() == "file") {


var clone = value.cloneNode(true);
value.removeAttribute("id", prop);
value.setAttribute("name", prop);
value.style.display = "none";
value.parentNode.insertBefore(clone, value);
value.parentNode.removeChild(value);
batch.form.appendChild(value);
} else {
var formInput = batch.document.createElement("input");
formInput.setAttribute("type", "hidden");
formInput.setAttribute("name", prop);
formInput.setAttribute("value", value);
batch.form.appendChild(formInput);
}
}
}
batch.form.submit();
}
},




remote:{






beginIFrameResponse:function(iframe, batchId) {
if (iframe != null) dwr.engine._receivedBatch = iframe.batch;
},






endIFrameResponse:function(batchId) {
dwr.engine._receivedBatch = dwr.engine._batches[batchId];
dwr.engine.transport.complete(dwr.engine._receivedBatch);
dwr.engine._receivedBatch = null;
}
},

remove:function(batch) {


setTimeout(function(){
if (batch.iframe && batch.iframe.parentNode) {
batch.iframe.parentNode.removeChild(batch.iframe);
batch.iframe = null;
}
if (batch.div1 && batch.div1.parentNode) {
batch.div1.parentNode.removeChild(batch.div1);
batch.div1 = null;
}
if (batch.form && batch.form.parentNode) {
batch.form.parentNode.removeChild(batch.form);
batch.form = null;
}
if (batch.div2 && batch.div2.parentNode) {
batch.div2.parentNode.removeChild(batch.div2);
batch.div2 = null;
}
}, 100);
}




















































},




scriptTag:{




send:function(batch) {
if (batch.isPoll) {
batch.map.partialResponse = dwr.engine._partialResponseNo;
}
batch.mode = batch.isPoll ? dwr.engine._ModePlainPoll : dwr.engine._ModePlainCall;
var request = dwr.engine.batch.constructRequest(batch, "GET");

batch.script = document.createElement("script");
batch.script.id = "dwr-st-" + batch.map.batchId;
batch.script.src = request.url;
batch.script.type = "text/javascript";
batch.script.async = true;
dwr.engine.util.addEventListener(batch.script, "load", function(ev) {
if (typeof dwr != "undefined") dwr.engine.transport.scriptTag.complete(batch);
});
dwr.engine.util.addEventListener(batch.script, "error", function(ev) {
if (typeof dwr != "undefined") dwr.engine.transport.scriptTag.complete(batch);
});
dwr.engine.util.addEventListener(batch.script, "readystatechange", function(ev) {
if (typeof dwr != "undefined") {
if (batch.script.readyState == "complete" || batch.script.readyState == "loaded") {
dwr.engine.transport.scriptTag.complete(batch);
}
}
});
document.getElementsByTagName("head")[0].appendChild(batch.script);
},




complete:function(batch) {
dwr.engine.transport.complete(batch);
},




remove:function(batch) {

if (!batch.script) return;


batch.script.parentNode.removeChild(batch.script);
batch.script = null;
}
},




htmlfile:{




send:function(batch) {
var idname = dwr.engine.transport.iframe.getId(batch);
batch.htmlfile = new window.ActiveXObject("htmlfile");
batch.htmlfile.open();
batch.htmlfile.write("<" + "html>");
batch.htmlfile.write("<div><iframe className='wibble' src='javascript:void(0)' id='" + idname + "' name='" + idname + "' onload='dwr.engine.transport.iframe.loadingComplete(" + batch.map.batchId + ");'></iframe></div>");
batch.htmlfile.write("</" + "html>");
batch.htmlfile.close();
batch.htmlfile.parentWindow.dwr = dwr;
batch.document = batch.htmlfile;

dwr.engine.transport.iframe.beginLoader(batch, idname);
}
}
};





dwr.engine.batch = {




create:function() {
var batch = {
async:dwr.engine._async,
charsProcessed:0,
handlers:[],
isPoll:false,
map:{ callCount:0, windowName:window.name },
paramCount:0,
preHooks:[],
postHooks:[],
timeout:dwr.engine._timeout,
errorHandler:dwr.engine._errorHandler,
warningHandler:dwr.engine._warningHandler,
textHtmlHandler:dwr.engine._textHtmlHandler,
textOrRedirectHandler:dwr.engine._textOrRedirectHandler
};

if (dwr.engine._preHook) {
batch.preHooks.push(dwr.engine._preHook);
}
if (dwr.engine._postHook) {
batch.postHooks.push(dwr.engine._postHook);
}

dwr.engine.batch.populateHeadersAndAttributes(batch);
return batch;
},






createPoll:function() {
var batch = {
async:true,
charsProcessed:0,
handlers:[{
callback:function(pause) {
dwr.engine._pollBatch = null;
setTimeout(dwr.engine._poll, pause);
}
}],
isPoll:true,
map:{ windowName:window.name, callCount:1 },
paramCount:0,
path:dwr.engine._pathToDwrServlet,
preHooks:[],
postHooks:[],
timeout:0,
windowName:window.name
};
dwr.engine.batch.populateHeadersAndAttributes(batch);
return batch;
},






populateHeadersAndAttributes:function(batch) {
var propname, data;
batch.headers = {};
if (dwr.engine._headers) {
for (propname in dwr.engine._headers) {
data = dwr.engine._headers[propname];
if (typeof data != "function") batch.headers[propname] = data;
}
}
batch.attributes = {};
if (dwr.engine._attributes) {
for (propname in dwr.engine._attributes) {
data = dwr.engine._attributes[propname];
if (typeof data != "function") batch.attributes[propname] = data;
}
}
},





addCall:function(batch, scriptName, methodName, args) {


var callData, stopAt;
var lastArg = args[args.length - 1];
if (lastArg == null || typeof lastArg == "function") {
callData = { callback:lastArg };
stopAt = args.length - 1;
}
else if (dwr.engine.util.isCallOptionArgument(lastArg)) {
callData = lastArg;
stopAt = args.length - 1;
}
else {
callData = {};
stopAt = args.length;
}


dwr.engine.batch.merge(batch, callData);
batch.handlers[batch.map.callCount] = {
exceptionHandler:callData.exceptionHandler,
exceptionArg:callData.exceptionArg || callData.arg || null,
exceptionScope:callData.exceptionScope || callData.scope || window,
callback:callData.callbackHandler || callData.callback,
callbackArg:callData.callbackArg || callData.arg || null,
callbackScope:callData.callbackScope || callData.scope || window
};


var prefix = "c" + batch.map.callCount + "-";
batch.map[prefix + "scriptName"] = scriptName;
batch.map[prefix + "methodName"] = methodName;
batch.map[prefix + "id"] = batch.map.callCount;
var directrefmap = {}, otherrefmap = {};
for (var i = 0; i < stopAt; i++) {
dwr.engine.serialize.convert(batch, directrefmap, otherrefmap, args[i], prefix + "param" + i, 0);
}
dwr.engine.serialize.cleanup(directrefmap);
},







merge:function(batch, overrides) {
var propname, data;
for (var i = 0; i < dwr.engine._propnames.length; i++) {
propname = dwr.engine._propnames[i];
if (overrides[propname] != null) batch[propname] = overrides[propname];
}
if (overrides.preHook != null) batch.preHooks.unshift(overrides.preHook);
if (overrides.postHook != null) batch.postHooks.push(overrides.postHook);
if (overrides.headers) {
for (propname in overrides.headers) {
data = overrides.headers[propname];
if (typeof data != "function") batch.headers[propname] = data;
}
}
var attrs = null;
if (overrides.attributes) attrs = overrides.attributes;
if (attrs) {
for (propname in attrs) {
data = attrs[propname];
if (typeof data != "function") batch.attributes[propname] = data;
}
}
},






prepareToSend:function(batch) {
batch.map.batchId = dwr.engine._nextBatchId;
dwr.engine._nextBatchId++;
dwr.engine._batches[batch.map.batchId] = batch;
dwr.engine._batchesLength++;
batch.completed = false;
batch.map.instanceId = dwr.engine._instanceId;


batch.map.page = encodeURIComponent(window.location.pathname + window.location.search);
batch.map.scriptSessionId = dwr.engine._scriptSessionId;
batch.map.windowName = window.name;

for (var i = 0; i < batch.preHooks.length; i++) {
batch.preHooks[i]();
}
batch.preHooks = null;

if (batch.timeout && batch.timeout !== 0) {
batch.timeoutId = setTimeout(function() { dwr.engine.transport.abort(batch); }, batch.timeout);
}
},







constructRequest:function(batch, httpMethod) {

var urlBuffer = [];
urlBuffer.push(batch.path);
urlBuffer.push(batch.mode);
if (batch.isPoll) {
urlBuffer.push("ReverseAjax.dwr");
}
else if (batch.map.callCount == 1) {
urlBuffer.push(batch.map["c0-scriptName"]);
urlBuffer.push(".");
urlBuffer.push(batch.map["c0-methodName"]);
urlBuffer.push(".dwr");
}
else {
urlBuffer.push("Multiple.");
urlBuffer.push(batch.map.callCount);
urlBuffer.push(".dwr");
}

var sessionMatchExpr = new RegExp(
"^" +
"[^;\\?#]+" +
"(;[^\\?#]+)");
var sessionMatch = location.href.match(sessionMatchExpr);
if (sessionMatch != null) {
urlBuffer.push(sessionMatch[1]);
}


if (batch.attributes) {
for (var attrname in batch.attributes) {
var data = batch.attributes[attrname];
if (typeof data != "function") batch.map["a-" + attrname] = "" + data;
}
}

var request = {};
var prop;
if (httpMethod == "GET") {


batch.map.callCount = "" + batch.map.callCount;
urlBuffer.push("?");
for (prop in batch.map) {
if (typeof batch.map[prop] != "function") {
urlBuffer.push(encodeURIComponent(prop));
urlBuffer.push("=");
urlBuffer.push(encodeURIComponent(batch.map[prop]));
urlBuffer.push("&");
}
}
urlBuffer.pop();
request.body = null;
}
else {

request.body = "";
if (dwr.engine.isIE <= 7) {

var buf = [];
for (prop in batch.map) {
if (typeof batch.map[prop] != "function") {
buf.push(prop + "=" + batch.map[prop] + dwr.engine._postSeperator);
}
}
request.body = buf.join("");
}
else {

for (prop in batch.map) {
if (typeof batch.map[prop] != "function") {
request.body += prop + "=" + batch.map[prop] + dwr.engine._postSeperator;
}
}
}
request.body = dwr.engine._contentRewriteHandler(request.body);
}
request.url = dwr.engine._urlRewriteHandler(urlBuffer.join(""));
return request;
},







validate:function(batch) {
if (!batch.completed) {
var repliesReceived = 0;
for (var i = 0; i < batch.map.callCount; i++) {
if (batch.handlers[i].completed === true) {
repliesReceived++;
}
}
if (repliesReceived === 0) {
dwr.engine._handleError(batch, dwr.engine.batch.buildEmptyReplyException(batch));
} else if (repliesReceived < batch.map.callCount) {
dwr.engine._handleError(batch, { name:"dwr.engine.incompleteReply", message:"Incomplete reply from server" });
}
}
},

buildEmptyReplyException:function(batch) {
var req, responseText, contentType, status = 0;
if (batch.req) {
req = batch.req;
try {
if (req.readyState >= 2) {
status = req.status;
}
}
catch(ignore) {}
responseText = req.responseText;
contentType = dwr.engine.util.getContentType(req, dwr.engine.isJaxerServer);
}
if (batch.iframe) {

var contentDocument = dwr.engine.util.getContentDocument(batch);
responseText = contentDocument.documentElement ? contentDocument.documentElement.outerHTML : "";
contentType = contentDocument.contentType || "text/html";
}
return { name:"dwr.engine.emptyReply", message:"Empty reply from the server", status:status, htmlResponseText:responseText, contentType:contentType };
},






remove:function(batch) {
if (!batch) {
dwr.engine._debug("Warning: null batch in dwr.engine.batch.remove()", true);
return;
}

if (batch.completed) {
return;
}
batch.completed = true;


dwr.engine.transport.remove(batch);


if (batch.timeoutId != null) {
clearTimeout(batch.timeoutId);
delete batch.timeoutId;
}


if (batch.map && (batch.map.batchId || batch.map.batchId === 0)) {
delete dwr.engine._batches[batch.map.batchId];
dwr.engine._batchesLength--;
}




if (dwr.engine._batchQueue.length !== 0) {
var sendbatch = dwr.engine._batchQueue.shift();
dwr.engine.transport.send(sendbatch);
}
}
};





dwr.engine.util = {




newActiveXObject:function(axarray) {
var returnValue;
for (var i = 0; i < axarray.length; i++) {
try {
returnValue = new ActiveXObject(axarray[i]);
break;
}
catch (ex) {   }
}
return returnValue;
},

getContentType:function(req, isJaxerServer) {
var contentType = req.getResponseHeader("Content-Type");
if (isJaxerServer) {

contentType = "text/javascript";
}
return contentType;
},

getContentDocument:function(batch) {
return batch.iframe.contentDocument || batch.iframe.contentWindow.document;
},




tokenify: function(number) {
var tokenbuf = [];
var charmap = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ*$";
var remainder = number;
while (remainder > 0)
{
tokenbuf.push(charmap.charAt(remainder & 0x3F));
remainder = Math.floor(remainder / 64);
}
return tokenbuf.join("");
},

addEventListener: function(elem, name, func) {
if (elem.addEventListener)
elem.addEventListener(name, func, false);
else
elem.attachEvent("on" + name, func);
},

isCallOptionArgument: function(lastArg) {
return (typeof lastArg === "object" && (typeof lastArg.callback === "function" ||
typeof lastArg.exceptionHandler === "function" || typeof lastArg.callbackHandler === "function" ||
typeof lastArg.errorHandler === "function" || typeof lastArg.warningHandler === "function" || lastArg.hasOwnProperty("async")));
}

};


dwr.engine._initializer.init();




dwr.hub = {





publish:function(topicName, data) {
dwr.engine._execute(dwr.engine._pathToDwrServlet, '__System', 'publish', topicName, data, {});
},









subscribe:function(topicName, callback, scope, subscriberData) {
var subscription = "" + dwr.hub._subscriptionId;
dwr.hub._subscriptionId++;
dwr.hub._subscriptions[subscription] = {
callback:callback,
scope:scope,
subscriberData:subscriberData
};
dwr.engine._execute(dwr.engine._pathToDwrServlet, '__System', 'subscribe', topicName, subscription, {});
return subscription;
},







_remotePublish:function(subscriptionId, publishData) {
var subscriptionData = dwr.hub._subscriptions[subscriptionId];
if (!subscriptionData) return;
subscriptionData.callback.call(subscriptionData.scope, publishData, subscriptionData.subscriberData);
},




_subscriptionId:0,




_subscriptions:{}
};





dwr.data = {





StoreChangeListener:{





itemRemoved:function(source, itemId) { },






itemAdded:function(source, item) { },








itemChanged:function(source, item, changedAttributes) { }
},








Cache:function(storeId, listener) {
this.storeId = storeId;
this.listener = listener;
}
};












dwr.data.Cache.prototype.viewRegion = function(region, callbackObj) {
if (!region) region = { };
if (!region.start) region.start = 0;
if (!region.count) region.count = -1;
if (!region.sort) region.sort = [];
else {
for (var index = 0; index < region.sort.length; index++) {
if (typeof region.sort[index].descending == "undefined") {
region.sort[index].descending = false;
}
}
}
if (!region.query) region.query = {};

return dwr.engine._execute(dwr.engine._pathToDwrServlet, '__Data', 'viewRegion', [ this.storeId, region, this.listener, callbackObj ]);
};






dwr.data.Cache.prototype.viewItem = function(itemId, callbackObj) {
return dwr.engine._execute(dwr.engine._pathToDwrServlet, '__Data', 'viewItem', [ this.storeId, itemId, this.listener, callbackObj ]);
};





dwr.data.Cache.prototype.unsubscribe = function(callbackObj) {
if (this.listener) {
return dwr.engine._execute(dwr.engine._pathToDwrServlet, '__Data', 'unsubscribe', [ this.storeId, this.listener, callbackObj ]);
}
};






dwr.data.Cache.prototype.update = function(items, callbackObj) {
return dwr.engine._execute(dwr.engine._pathToDwrServlet, '__Data', 'update', [ this.storeId, items, callbackObj ]);
};

})();

