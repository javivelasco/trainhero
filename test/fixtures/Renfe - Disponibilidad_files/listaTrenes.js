// ***************************************************************************************
// ***************************************************************************************
// ***************************************************************************************
// Fichero:
// 	listaTrenes.js
// Descripción:
// 	Conjunto de funciones de la página listaTrenes.jsp
// ***************************************************************************************
// ***************************************************************************************
// ***************************************************************************************

var numColumVistaCompleta;		
var numColumVistaReducida;
var numColumnas;
var numCdgosPromos = 1;
var isVueltaAbierta = false;
	
function inicializar(fechaIda, fechaVuelta)
{
	window.isSubmited = false;
	// inicializarRadio(document.formulario.trenIda_radio);
	// inicializarRadio(	document.formulario.trenVuelta_radio);
	MM_preloadImages('/vol/img/boton_continuar1.gif');
	
	try
	{
		parent.menuFrame.document.getElementById('salida').innerHTML='&nbsp;&nbsp;'+fechaIda;	
		parent.menuFrame.document.getElementById('regreso').innerHTML='&nbsp;&nbsp;'+fechaVuelta;
	}
	catch (e){}
	
	
}

function paginaAnteriorIda(operacion) {
	
	var accion;
	
	switch (operacion) {
		case 'Lista':
		  accion = "/vol/buscarTren.do";
		  break;
		case 'Cierre':
		  accion = "/vol/cierre.do";
		  break;
		case 'Cambio':
		  accion = "/vol/buscarTrenesConBilletes.do";
		  break;
		default:
		  
	}
	
	document.formulario.operation.value="trenesAntesIda";
	document.formulario.action= accion;
	document.formulario.method="post";
	document.formulario.target="_self";
	esperandoOperacion();document.formulario.submit();
}


function paginaSiguienteIda(operacion) {

	var accion;
	
	switch (operacion) {
		case 'Lista':
		  accion = "/vol/buscarTren.do";
		  break;
		case 'Cierre':
		  accion = "/vol/cierre.do";
		  break;
		case 'Cambio':
		  accion = "/vol/buscarTrenesConBilletes.do";
		  break;
		default:
		  
	}
	document.formulario.operation.value="trenesDespuesIda";
	document.formulario.action= accion;
	document.formulario.method="post";
	document.formulario.target="_self";
	esperandoOperacion();document.formulario.submit();
}

function paginaAnteriorVuelta(operacion) {

	var accion;
	
	switch (operacion) {
		case 'Lista':
		  accion = "/vol/buscarTren.do";
		  break;
		case 'Cierre':
		  accion = "/vol/cierre.do";
		  break;
		case 'Cambio':
		  accion = "/vol/buscarTrenesConBilletes.do";
		  break;
		default:
		  
	}

	document.formulario.operation.value="trenesAntesVuelta";
	document.formulario.action= accion;
	document.formulario.method="post";
	document.formulario.target="_self";
	esperandoOperacion();document.formulario.submit();
}

function paginaSiguienteVuelta(operacion) {

	var accion;
	
	switch (operacion) {
		case 'Lista':
		  accion = "/vol/buscarTren.do";
		  break;
		case 'Cierre':
		  accion = "/vol/cierre.do";
		  break;
		case 'Cambio':
		  accion = "/vol/buscarTrenesConBilletes.do";
		  break;
		default:
		  
	}

	document.formulario.operation.value="trenesDespuesVuelta";
	document.formulario.action= accion;
	document.formulario.method="post";
	document.formulario.target="_self";
	esperandoOperacion();document.formulario.submit();
}

function devolverUrl(tipoTren)
{
if(tipoTren!=null)
	var url ="";
	tipoTren=trim(tipoTren);
	if(!yaEntro){
		yaEntro=true;
	}
	

	
	
	if(urlsTrenes[tipoTren] != null)
	{
		url = urlsTrenes[tipoTren];
	}
	else
	{
		url = "";
	}
	return url;
}


function inicializarRadio(radio)
{
	if(radio!=null) 
	{
		var nTamanioRadio=radio.length;
		//En el caso de que radio.length==null, el objeto tiene sólo un elemento y no se trata como array
		if (nTamanioRadio==null)
				radio.checked=true;
		else
			radio[0].checked=true;
	}
}


function literalPrecioBillete(numAdultos, plazas, admiteClase, precio, numNinos, precioNinos)
{
	var literalResultado="&nbsp;";

	if( (plazas>0 || plazas==-1) && admiteClase==true ){
			if(numAdultos>1)
				literalResultado = numAdultos +" * "+precio+"<br>";
			else if(numAdultos==1)
				literalResultado = precio+"<br>";
	}
	
 	if( (plazas>0 || plazas==-1 )&& admiteClase==true ){
 		if(numNinos>1)
			literalResultado += numNinos +" * "+precioNinos; 		
		else if(numNinos==1)
			literalResultado += precioNinos+""; 		
 	}
	document.writeln(literalResultado);
	return	
}


function diaAntesIda()
{
  document.formulario.operation.value="DiaAntesIda";
  document.formulario.action= "/vol/buscarTren.do";
  document.formulario.method="post";
  document.formulario.target="_self";
  esperandoOperacion();document.formulario.submit();
}
			
function diaDespuesIda()
{
  document.formulario.operation.value="DiaDespuesIda";
  document.formulario.action= "/vol/buscarTren.do";
  document.formulario.method="post";
  document.formulario.target="_self";
  esperandoOperacion();document.formulario.submit();
}

function datosTrenIda(indiceTren) {

	trenIda = obtenerValorRadio(document.formulario.trenIda_radio);
	if(trenIda!=-1)
	{
		doMuestraTren(trenIda);
	}
	else
	{
		mostrarError(listaTrenes1);
	}
}

function datosTrayectoIda()
{
	trenIda = obtenerValorRadio(document.formulario.trenIda_radio);
	datosTrayecto(trenIda);
}

function datosTrayecto(trenAux)
{
  // El value del radioButton que indica el tren/clase seleccionados esta formado por una cadena tipo:
  // clase|codTren|grupoTren|fecha, se separan los valores y se asignan a campos hidden antes de llamar al servlet.

	if(trenAux==-1)
	{
		mostrarError(listaTrenes2);
   return
	}

	valores=separar(trenAux, '|');
	var clase=valores[0];
	var codTren=valores[1];
	var grupoTren=valores[2];
	var fecha=valores[3];
	
	document.formulario.tren.value=codTren;
	document.formulario.grupoTren.value=grupoTren;
	document.formulario.fechaTren.value=fecha;
	document.formulario.operation.value="BusquedaTrayecto";
  	document.formulario.action= "/vol/recorrido.do";
  	document.formulario.method="post";
  	window.open("", 'recorrido', 'width=600,height=500,scrollbars=1,resizable=1');
  	document.formulario.target="recorrido";
  	esperandoOperacion();document.formulario.submit();

}

function otrasClasesIda()
{
	mostrarError("otrasClasesIda");
}

function diaAntesVuelta(fecha)
{

  document.formulario.operation.value="DiaAntesVuelta";
  document.formulario.action= "/vol/buscarTren.do";
  document.formulario.method="post";
  document.formulario.target="_self";
  esperandoOperacion();document.formulario.submit();

}
			
function diaDespuesVuelta(fecha)
{
  document.formulario.operation.value="DiaDespuesVuelta";
  document.formulario.action= "/vol/buscarTren.do";
  document.formulario.method="post";
  document.formulario.target="_self";
  esperandoOperacion();document.formulario.submit();

}


function doMuestraTren(datosTren){

	valores=separar(datosTren, '|');
	var clase=valores[0];
	var codTren=valores[1];
	var grupoTren=valores[2];
	var fecha=valores[3];	
	var tipoTren = valores[4];
	url = devolverUrl(tipoTren);
	if(url!=""){
		window.open(url, '', 'width=800,height=670,scrollbars=1,resizable=1');	
	}
}




function datosTrenVuelta()
{
	trenVuelta = obtenerValorRadio(document.formulario.trenVuelta_radio);
	if(trenVuelta!=-1)
	{
		doMuestraTren(trenVuelta);
	}
	else
	{
		mostrarError(listaTrenes3);
	}
}

function datosTrayectoVuelta()
{
	trenVuelta = obtenerValorRadio(document.formulario.trenVuelta_radio);
	datosTrayecto(trenVuelta);

}


function otrasClasesVuelta()
{
	mostrarError("otrasClasesVuelta");
}

function getCellByRowCol(table,rowNum, colNum) {

	if (isNaN(rowNum)){
		return -1;
	}else{
		rowNum=(rowNum*2);
		var tableElem = document.getElementById(table);
		var rowElem = tableElem.rows[rowNum];
		var tdValue = rowElem.cells[colNum].innerHTML;
		return tdValue;
	}
}


function continuar(){
	if(!window.isSubmited){	
		trenIda = obtenerValorRadio(document.formulario.trenIda_radio);
	
		var horaIdaSalida;
		var horaIdaLlegada;
		var horaVueltaLlegada;
	
		
		if(trenIda==-1)
		{
			mostrarError(listaTrenes1);
			return;
		} 
	
		//@RF50105@ACC.SCEXE12.SDC@22/01/2014@INICIO
		if (resetNinoIda || resetNinoVuelta) {
			reseteoNino('Ida');	
			reseteoNino('Vuelta');
		}
		//@RF50105@ACC.SCEXE12.SDC@22/01/2014@FIN
		
		if(document.formulario.FechaVueltaSel.value!="" && document.formulario.FechaVueltaSel.value!='null')
		{
			if(document.formulario.vueltaAbierta == null){			
				isVueltaAbierta = false;
			}else{
				if(document.formulario.vueltaAbierta.checked == false){
					isVueltaAbierta = false;
				}else{
					isVueltaAbierta = true;
				}
			}
			
			trenVuelta = obtenerValorRadio(document.formulario.trenVuelta_radio);
			if(trenVuelta==-1 && isVueltaAbierta == false)
			{
				mostrarError(listaTrenes3);
				return;
			}
			
			valoresVuelta=separar(trenVuelta, '|');
			var claseVuelta=valoresVuelta[0];
			var codTrenVuelta=valoresVuelta[1];
			var grupoTrenVuelta=valoresVuelta[2];
			var fechaVuelta=valoresVuelta[3];	
			var tipoTrenVuelta = valoresVuelta[4];
			var indiceVuelta = valoresVuelta[5];
			var kmsVuelta = valoresVuelta[6];
			horaVueltaLlegada = new Number(valoresVuelta[7]);
			var tarifaVuelta = "";
			var claseRMVuelta = "";	
			if (valoresVuelta.length > 9){
				tarifaVuelta = valoresVuelta[9];
			}
			if (valoresVuelta.length > 10){
				claseRMVuelta = valoresVuelta[10];
			}
			document.formulario.indiceTrenVuelta.value=indiceVuelta;
			document.formulario.claseTrenVuelta.value=claseVuelta;
			document.formulario.kmsTrenVuelta.value=kmsVuelta;
			document.formulario.tipoTrenVuelta.value=tipoTrenVuelta;
			document.formulario.codTrenVuelta.value=codTrenVuelta;
			document.formulario.tarifaVuelta.value=tarifaVuelta;
			document.formulario.claseRMVuelta.value=claseRMVuelta;
		}

		valoresIda=separar(trenIda, '|');
		var claseIda=valoresIda[0];
		var codTrenIda=valoresIda[1];
		var grupoTrenIda=valoresIda[2];
		var fechaIda=valoresIda[3];	
		var tipoTrenIda = valoresIda[4];
		var indiceIda = valoresIda[5];
		var kmsIda = valoresIda[6];
		horaIdaSalida = new Number(valoresIda[7]);
		horaIdaLlegada = new Number(valoresIda[8]);
		var tarifaIda = "";
		var claseRMIda = "";

		if (valoresIda.length > 9){
			tarifaIda = valoresIda[9];
		}
		if (valoresIda.length > 10){
			claseRMIda = valoresIda[10];
		}
		
		if(document.formulario.vueltaAbierta == null){			
				isVueltaAbierta = false;
		}else{
			if(document.formulario.vueltaAbierta.checked == false){
				isVueltaAbierta = false;
			}else{
				isVueltaAbierta = true;
			}
		}
		
		if(horaVueltaLlegada!= null 
			&& (document.formulario.FechaVueltaSel.value!="" 
				&& document.formulario.FechaVueltaSel.value!='null' 
				&& isVueltaAbierta == false)
			&& (((document.formulario.FechaIdaSel.value==document.formulario.FechaVueltaSel.value) && (horaIdaLlegada>horaVueltaLlegada)) 
				|| ((document.formulario.FechaIdaSel.value==document.formulario.FechaVueltaSel.value) && (horaIdaLlegada>horaVueltaLlegada) && (horaIdaSalida - horaIdaLlegada < 0)))
				){
				mostrarError(listaTrenes4);
        // @RF50137@ACC.SCCID2N.SDC@12/02/2014@INICIO	
		} else if (errorTipoPetNSIda || errorTipoPetNSVuelta) {
			mostrarError(msgErrorFuncTren);
		// @RF50137@ACC.SCCID2N.SDC@12/02/2014@FIN				
		}else{
			document.formulario.indiceTrenIda.value=indiceIda;
			document.formulario.claseTrenIda.value=claseIda;
			document.formulario.kmsTrenIda.value=kmsIda;
			document.formulario.tipoTrenIda.value=tipoTrenIda;
			document.formulario.codTrenIda.value=codTrenIda;
			document.formulario.tarifaIda.value=tarifaIda;
			document.formulario.claseRMIda.value=claseRMIda;
			document.formulario.operation.value="reservar";
			document.formulario.action= "/vol/reservar.do";
	
			
			document.formulario.method="post";
			document.formulario.target="_self";
		    window.isSubmited = true;		
			esperandoOperacion();document.formulario.submit();
		}
		
	} else {
		mostrarError(listaTrenes5);		
	}
	 
}

function cambioDiaPasandoFecha (fechaIda, fechaVta) {


	document.getElementById('operation').value = "cambioDiaPasandoFecha";
	
	if (document.getElementById('tipoUsuario') != null &&
			document.getElementById('tipoUsuario').value == 'A')
	{
		document.formulario.action = "/vol/buscarTrenA.do";
	}
	else
	{
		document.formulario.action = "/vol/buscarTren.do";
	}
		
	document.formulario.method="post";
	document.formulario.target="_self";
	document.getElementById('FechaIdaSel').value = fechaIda;
	document.getElementById('FechaVueltaSel').value = fechaVta;
	esperandoOperacion();document.formulario.submit();
}

function doDias(dia, tren){ 

	if (!window.isSubmited) {	
		if((dia==1 && tren=='Ida') 
		   && (fechaIda==fechaVuelta)) {
		
				mostrarError(listaTrenes6);
				return;
				
		} else if((dia==-1 && tren=='Ida') 
		           && (fechaIda < hoy)) {
		           
				mostrarError(listaTrenes7);
				return;
				
		} else if((dia==-1&&tren=='Vuelta' ) && (fechaVuelta==fechaIda)) {
				mostrarError(listaTrenes6);
				return;
		}


		if(tren=='Ida')
		{
			if( dia==-1)
			{
				// Si estan rellenos las fechas de ida y vuelta llamamos al metodo que las pasa directamente (dynaCache)
				if (document.getElementById('FechaIdaAnt') != null  && document.getElementById('FechaIdaAnt').value != '')
				{
					cambioDiaPasandoFecha (document.getElementById('FechaIdaAnt').value, document.getElementById('FechaVueltaCambioDia').value);
				}
				else
				{
					diaAntesIda();
				}
			}else{
				// Si estan rellenos las fechas de ida y vuelta llamamos al metodo que las pasa directamente (dynaCache)
				if (document.getElementById('FechaIdaSig') != null  && document.getElementById('FechaIdaSig').value != '')
				{
					cambioDiaPasandoFecha (document.getElementById('FechaIdaSig').value, document.getElementById('FechaVueltaCambioDia').value);
				}
				else
				{
					diaDespuesIda();
				}				
			}	
		}		
		else if(tren=='Vuelta')
		{
			if(dia==-1)
			{
				// Si estan rellenos las fechas de ida y vuelta llamamos al metodo que las pasa directamente (dynaCache)
				if (document.getElementById('FechaVueltaAnt') != null  && document.getElementById('FechaVueltaAnt').value != '')
				{
					cambioDiaPasandoFecha (document.getElementById('FechaIdaCambioDia').value, document.getElementById('FechaVueltaAnt').value);
				}
				else
				{
					diaAntesVuelta();
				}			
			}else{
				// Si estan rellenos las fechas de ida y vuelta llamamos al metodo que las pasa directamente (dynaCache)
				if (document.getElementById('FechaVueltaSig') != null  && document.getElementById('FechaVueltaSig').value != '')
				{
					cambioDiaPasandoFecha (document.getElementById('FechaIdaCambioDia').value, document.getElementById('FechaVueltaSig').value);
				}
				else
				{
					diaDespuesVuelta();
				}				
			}	
		}
		return;	
	} else {
		mostrarError(listaTrenes5);		
	}		
}

	 function doBlink() {
		var blink = document.all.tags("BLINK")
		for (var i=0; i<blink.length; i++)
			blink[i].style.visibility = blink[i].style.visibility == "" ? "hidden" : "" 
	}
		
	function startBlink() {
		if (document.all)
			setInterval("doBlink()",500)
	}
	
	//REQ070@sccid1K.SDC@27/02/2008 - FIN
	
	function MM_swapImgRestore() { //v3.0
	  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
	}
	
	function MM_preloadImages() { //v3.0
	  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
	    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
	    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
	}
	
	function MM_findObj(n, d) { //v4.01
	  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
	    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
	  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
	  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
	  if(!x && d.getElementById) x=d.getElementById(n); return x;
	}
	 
	function MM_swapImage() { //v3.0
	  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
	   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
	}
	
	function dameTarifa(){
		for (var i = 0; i < 50; i++)
	    {	
	    	if ((document.getElementById('estrella_'+i) != null)||(document.getElementById('web_'+i) != null)){
	    	
	    		if(document.forms[0].vueltaAbierta == null){			
					isVueltaAbierta = false;
				}else{
					if(document.forms[0].vueltaAbierta.checked == false){
						isVueltaAbierta = false;
					}else{
						isVueltaAbierta = true;
					}
				}
	    	
				if (isVueltaAbierta){
					document.getElementById('estrella_'+i).style.display="none";
					document.getElementById('web_'+i).style.display="none";
				}	
				else{
					document.getElementById('estrella_'+i).style.display="";
					document.getElementById('web_'+i).style.display="";
				}
			}	
	    } 		 	 
	} 
	
	function submitEnter(evento)
	{ 
	     var enter=false;   
		 
		 
		 //cambiamos el enter por otra tecla para que el istener del nivel superior no lo interprete
	     if (evento.keyCode==13 || evento.which==13)
	     { 
	         enter = true;          
	     }      
		 
	     if (enter) 
	     {  	
	     	 evento.which=12;
	         evento.keyCode=12;
	         evento.charCode=12;     
	     	 evento.cancelBubble = true;
	         evento.returnValue = false;         
		     continuar();     
	     }
	     return false;
	     
	}
	
	
	function onLoad() {

		/**
		** Rellena la identificación de ususario
		**/	
		sesionManager.getIdentificacionUsuario(fillIdentificacion);	
		
		var fechaIda;
		var fechaVuelta;
		
		fechaIda    = document.getElementById('fechaIda').value;
		fechaVuelta = document.getElementById('fechaVuelta').value;
		inicializar(fechaIda, fechaVuelta);
		
	
		
		window.isSubmited = false;
		
		if (errorFlujoNegocio != null && errorFlujoNegocio != "") {
			mostrarError(errorFlujoNegocio);
		}		

	}
	

	
		function fillIdentificacion(data) {
			DWRUtil.setValue('txto_Nombre', data);
		}
	
		function traza ()
		{
			trazasManager.grabarTraza("VENTA", "listaTrenes", "listaTrenes.jsp", "", "Click todas las tarifas. Nuevo estado: " + document.getElementById("checkTrenesVista").checked, 5);
		}	