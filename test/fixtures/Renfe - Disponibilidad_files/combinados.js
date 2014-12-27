/******************************************************************************
** Nombre:   	ventanaTrenCombinados
** Finalidad: 	Abre una ventana con la informacion de los trenes de combinados
*******************************************************************************/

function ventanaTrenCombinados(operacion,indTren,tipoRecorrido) {
	var anchoVentana = 800;
	var altoVentana = 250;
	var alto = screen.height;
	var ancho = screen.width;
	var yposi = (alto-altoVentana)/2;
	var xposi = (ancho-anchoVentana)/2;
	
	var url = "infoTrenCombinados.do?operacion="+operacion+"&indice="+indTren+"&tipoRecorrido="+tipoRecorrido;
	var propiedades = 'left='+xposi+'px,top='+yposi+',width='+anchoVentana+'px,height='+altoVentana+'px';
	window.open(url, 'ventanaInfoTrenCombinados', propiedades);
};

function ventanaTrenCombinadosByCdgoTren (operacion,cdgoTren, idOrigen, idDestino, cFecha, tipoTren, idiomaAux, grupo) {

	
	var anchoVentana = 800;
	var altoVentana = screen.height - 100;
	var alto = screen.height;
	var ancho = screen.width;
	var yposi = (alto-altoVentana)/2;
	var xposi = (ancho-anchoVentana)/2;
	var fechaDS = cFecha;
	
	Fecha_arr = cFecha.split('-');

	if(Fecha_arr[0].length != 4)
	{
		fechaDS = cFecha.substring(6,10) +"-"+ cFecha.substring(3,5) +"-"+ cFecha.substring(0,2);
		
	}
	
	var idioma ="";
	if(idiomaAux=="es_ES") idioma="s";
	if(idiomaAux=="ca_ES") idioma="c";
	if(idiomaAux=="eu_ES") idioma="e";
	// @INC000000599414@INDRA.SCEXUF2.SDC@14/03/2013@INICIO
	if(idiomaAux=="gl_ES") idioma="g";
	// @INC000000599414@INDRA.SCEXUF2.SDC@14/03/2013@FIN
	if(idiomaAux=="va_ES") idioma="v";		
	if(idiomaAux=="en_UK") idioma="i";	
	if(idiomaAux=="fr_FR") idioma="f";		//no hay alemán ni portugués	
		
	//@INDRA.SCFID89.SDC@03/08/2012@INICIO
	//INICIO: Controlar el valor del idioma en la llamada a HOL.
	if(idioma=="")idioma = "s";
	//FIN: Controlar el valor del idioma en la llamada a HOL.
	//@INDRA.SCFID89.SDC@03/08/2012@FIN
		
	var url= urlRecorridoCombinados+"?O="+idOrigen+"&D="+idDestino+"&F="+fechaDS+"&T="+cdgoTren+"&G="+grupo+"&TT="+tipoTren+"&ID="+idioma+"&FDS="+fechaDS;
	//document.formulario.operation.value = "BusquedaTrayecto";
	//document.formulario.action= "/vol/recorrido.do"+ "?tren="+ codTren+ "&grupoTren="+ grupoTren+ "&fecha="+ fecha;
	//document.formulario.method="post";

	// @INC000000572109@INDRA.SCEXU0U.SDC@18/01/2013@INICIO 
	// INICIO 64758: Configurar ventana de trenes combinados como modal y solucionar desajuste de texto al redimensionar.
	var propiedades = "dialogLeft: "+xposi+";dialogTop: "+yposi+";dialogHeight: "+altoVentana+"px;dialogWidth: "+anchoVentana+"px;scroll:yes;resizable=yes;"
  	// @INC000000748943@INDRA.SCEXUF1@04/02/2014@INICIO 
	// INICIO 83643: Error en impresión de recorrido de tren.
  	//window.showModalDialog(url, "ventanaInfoTrenCombinados", propiedades);
	var propiedades = 'left='+xposi+'px,top='+yposi+',resizable=1,modal=yes,width='+anchoVentana+'px,height='+altoVentana+'px';
	window.open(url, 'ventanaInfoTrenCombinados', propiedades);
	// @INC000000748943@INDRA.SCEXUF1@04/02/2014@FIN
	// @INC000000572109@INDRA.SCEXU0U.SDC@18/01/2013@FIN
};