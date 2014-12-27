/************************************************************
 ** Nombre:    	detectBrowser
 ** Finalidad: 	Determina el navegador en el que se esta ejecutando la aplicación.
 ***********************************************************/
var browser;
function detectBrowser() {
	if (navigator.userAgent.toUpperCase().indexOf("MSIE")!=-1
	//@PRO1P00093220@ACC.SCEXUK2.SDC@31/07/2014@INICIO 
		|| navigator.userAgent.toUpperCase().indexOf("TRIDENT")!=-1)browser = 0;
	//@PRO1P00093220@ACC.SCEXUK2.SDC@31/07/2014@FIN
	else if (navigator.userAgent.toUpperCase().indexOf("FIREFOX")!=-1)browser = 1;
	else if (navigator.userAgent.toUpperCase().indexOf("NETSCAPE")!=-1)browser = 2;
	else if (navigator.userAgent.toUpperCase().indexOf("OPERA")!=-1)browser = 3;
	else if (navigator.userAgent.toUpperCase().indexOf("SAFARI")!=-1)browser = 4;
	return browser;
}

function doListaMisViajes(){
	var browser = detectBrowser();
	if (browser == 0){
	    window.open("/vol/misViajes.do?indexP=S","popupMisViajes",'left=10, top=10, width=1024,height=750,toolbar=no,location=no,menubar=no,scrollbars=auto,copyhistory=no,resizable=yes');          

	} else if (browser == 1 || browser == 4) {
		var myLeft = (screen.width-613)/2;
		var myTop = (screen.height-360)/2;							 
		window.open("/vol/misViajes.do?indexP=S","popupMisViajes",'left='+myLeft+',top='+myTop+',menubar=no,width=1024,height=500,status=no,location=no,scrollbars=no,titlebar=no');
	}
}
