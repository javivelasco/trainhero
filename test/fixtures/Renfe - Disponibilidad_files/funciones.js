// ***************************************************************************************
// ***************************************************************************************
// ***************************************************************************************
// Fichero:
// 	IIAGFunciones.js
// Descripción:
// 	Conjunto de funciones genéricas tales como son el 
//	chequeo de los datos de un formulario (menos fechas) o la inserción de elementos
//	genéricos en las distintas páginas, tales como son el botón de volver o la imagen
//	del calendario
// ***************************************************************************************
// ***************************************************************************************
// ***************************************************************************************

//  validaciones  en  JavaScript
var referenciaEstilo;
var capaVisible;
var navegador;
if (navigator.appName == "Netscape") {
  referenciaEstilo = ""; 
  capaVisible="show";
  navegador = "Netscape"; }
else {
  referenciaEstilo = "style.";
  capaVisible="visible";
  navegador = "Explorer"; }

	var ultimoRadioSeleccionado = {};


function nada() {}


function campofoco(elemento)
{
		
	//funcion que pone el foco en el elemento recibido como parámetro
	if(elemento.type == "text") {
		elemento.focus();
		elemento.select();
	}
	else if(  (elemento.type == "select-one") 
		   || (elemento.type == "checkbox") 
		   || (elemento.type == "button"))
	{
		elemento.focus();		
	}
	
}//fin function foco

function obtenerDecimales(valor)
{
	var pospunto = 0;
	if(valor.indexOf(".")!= -1){
	pospunto=valor.indexOf(".");//retorna el índice donde se encuentra ése carácter, sino lo encuentra devuelve -1
	var valorentero=valor.substring(0,pospunto);
	var valordecimal=valor.substr(pospunto+1,2);
	nuevovalor=valorentero+"."+valordecimal;
	return nuevovalor;
	}
	else
	return valor;
}

function referenciaCapa(nombreCapa) {
  if (navegador=="Netscape")
    return "document.layers['"+nombreCapa+"'].";
  else
    return "document.all['"+nombreCapa+"'].";
}

function referenciaPixels(pixels) {
  if (navegador=="Netscape")
    return parseInt(pixels);
  else
    return "'"+pixels+"px'";
}

function separar(valor,separador) //equivale al tokenizer de java
{
      vuelve = Array();
      if (valor.length >0) 
      {
      	  
      	indice = 0;
      	palabra = '';
      	for(var i=0; i< valor.length; i++) 
      	 {
      	    car = valor.charAt(i);
      	    if( car == separador) 
      	     {
      	       vuelve[indice] = palabra;
      	       indice ++;
      	       palabra = '';
      	       
      	     }
      	     else
      	     {
      	     	palabra = palabra + car;
   	     }
      	 }
      	 if(palabra.length > 0)
      	    vuelve[indice] = palabra;
      }
        
    return(vuelve);
   } 
   

function foco(elemento)
{
	//funcion que pone el foco en el elemento recibido como parámetro
	if(elemento.type == "text") {
		elemento.focus();
		elemento.select();
	}
	else if(  (elemento.type == "select-one") 
		   || (elemento.type == "checkbox") 
		   || (elemento.type == "button"))
	{
		elemento.focus();		
	}
	
}//fin function foco



function simulaGet(formulario) {
	
	tamanio = formulario.length;
	get = "?";
	var anyadirAGet=true;
	for(i = 0; i < tamanio; i++) {
		anyadirAGet=true;
		elemento 	= formulario.elements[i];
		nombre 		= elemento.name;
		valor 		= "";
		if(elemento.type == "select-one"){
			
			valor = elemento.options[elemento.selectedIndex].value;
			
		}
		else if(elemento.type == "text" || elemento.type == "hidden") {
			valor = elemento.value;	
		}
		else if(elemento.type == "checkbox")
		{
			if(elemento.checked)
				valor = elemento.value;
			else anyadirAGet=false;
		}
		else if ( elemento.type == "textarea"){
			valor = elemento.value; 	
		}
		//AH: Falta contemplar los radio-button	
		if(anyadirAGet)
			get += nombre + "=" + escape(valor) + "&";
	}
	return get;
		
}

function cambiarEstilo(src_checked,original) {
	if (src_checked.checked) {
		src_checked.parentElement.parentElement.className = 'diaFiesta';			
	}
	else {
		src_checked.parentElement.parentElement.className = original;
	}		
}		

function limpiarChecks(check)
{
	
	
	if(check!=null){
		if(ultimoRadioSeleccionado[check.name]!= null)
		{
			   dL(ultimoRadioSeleccionado[check.name]);
			   ultimoRadioSeleccionado[check.name]=check;
		}
		else
		{
			ultimoRadioSeleccionado[check.name] = check;
			
		}
	}
}
	

function cambioSeleccionRadio(check) {
	limpiarChecks(check);
	if (check.checked)
		hL(check);
}
	
	
function hL(E){
	while (E.tagName!="TR")
	{
			E=E.parentNode;
	}
	E.className="tren_seleccionado";
}

function dL(E){
	while (E.tagName!="TR")
	{
			E=E.parentNode;
	}
	E.className="tren_no_seleccionado";
}	
	

// ---------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------
// Función:
// 	dibujarManita(texto)
// Descripción:
// 	Dibuja una indicación a realizar en la pantalla con la imagen de la manita
// Parámetros:
//	texto: texto a mostrar
// Devuelve:
//	Nada
function dibujarManita(texto) {	
	var rc = '';
	rc += '<TABLE cellSpacing="0" cellPadding="0" align="left" border="0" width="100%">'+
				'<TR>'+
					'<TD width="20" size="8">'+
						'<IMG height="17" src="mult/TLRFManita.gif" width="14">'+
					'</TD>'+
			        '<TD width="5">&nbsp;</TD>'+
				    '<TD><FONT size="2"><B>'+texto+'</B></FONT></TD>'+
		   		'</TR>'+
			'</TABLE>';
	document.writeln(rc);
	return;
}

// ---------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------
// Función:
// 	botonFecha(campo)
// Descripción:
// 	Introduce el botón genérico que muestra la imagen del calendario que al pulsarse abre
//	la ventana del calendario
// Parámetros:
//	campo: literal con el nombre del campo (sin document.formulario. delante, sólo el nombre)
//	       en el que se almacenará la fecha seleccionada en la ventana correspondiente
// Devuelve:
//	Nada
function botonFecha(campo,posicion) {	
	// el campo indica donde actualizar la fecha seleccionada, es un string con el name del text a actualizar
document.write("<a href='#' onClick='irFecha(\""+campo+"\")'><img src='../mult/TLRFCalendario.gif' width='20' height='20' border='0' alt='Ver calendario' align='absmiddle'></a>");
//document.write("<a href='javascript:void(0)' onclick='Calendario("+campo+",window.event.x,window.event.y,\""+posicion+"\");'><img src='mult/TLRFCalendario.gif' border=0 alt='Mostrar Calendario'></a>");
//document.write("<a href='javascript:void(0)' onclick='Calendario("+campo+",0,0,\""+posicion+"\");'><img src='mult/TLRFCalendario.gif' border=0 alt='Mostrar Calendario'></a>");
	return;
}  	     		 

// ---------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------
// Función:
// 	irFecha(campo)
// Descripción:
// 	Abre en una ventana el calendario de selección de fecha
// Parámetros:
//	campo: literal con el nombre del campo (sin document.formulario. delante, sólo el nombre)
//	       en el que se almacenará la fecha seleccionada en la ventana correspondiente
// Devuelve:
//	Nada
// Observaciones:
//	El uso de esta función esta INCLUIDO en la función botonFecha()
var validar = false;
//validar sirve para validar el campo o no, cuando recibe el foco,
function irFecha(campo) {
	// el campo indica donde actualizar la fecha seleccionada, es un string con el name del text a actualizar	
	// primero validamos que el valor del campo fecha este o bien
	// vacio o bien sea una fecha válida
	
	var aCampos=new Array(); 
	aCampos[0]=new Array("",campo,"o","t","d");
	if(checkForm(aCampos,document.forms[0],true)) {

    	window.dateField=eval('document.forms[0].'+campo);
    	ejeX = (screen.width - 250)/2;
        	ejeY =  (screen.height - 250)/2;
    	Calendar=window.open('../TLRFCalendario_frames.html','cal','width=250,height=250,left='+ejeX+',top='+ejeY+',alwaysRaised=yes,resizable=no,scrollbars=no,toolbar=no,titlebar=no');
    	validar = true;
    }
	return;
}

// ---------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------
// Función:
// 	validarFechaFocus(campo, funcion)
// Descripción:
// 	El uso de esta función debe ser  INCLUIDO en el evento onFocus del campo que recibe 
//	la fecha del calendario a través de irFecha(campo). (ej. OnFocus="validarFechaFocus(this,'validaFecha');")
//	para que se valide la fecha que se recibe de la ventana calendario
// Parámetros:
//		campo: Objeto que tiene que recibir la función "funcion".
// 		funcion: Literal con el nombre de la función que se tiene que invocar.

// Devuelve:
//	Nada
function validarFechaFocus(campo, funcion){
	if(validar){
		eval(funcion+"(campo)");
		validar = false;
	}
}
// ---------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------
// Función:
// 	sololectura(name)
// Descripción:
// 	Hace que un objeto de un formulario sea de solo lectura, ya que al recibir el foco
//	este se perdera automaticamente
// Parámetros:
//	name: nombre del campo. Habitualmente será this
// Devuelve:
//	nada
// Observaciones:
//	La manera habitual de utilizar esta funcionalidad es: <input .... onFocus="sololectura(this)" ...>
function sololectura(name)
{
        name.blur()
}


// ---------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------
// Función:
// 	cabeceraJsp()
// Descripción:
// 	Muestra el titulo en la cabecera de las páginas
// Parámetros:
//	titulo a mostrar. Este parámetro puede ser único, y si la funcion (por compatibilidad
//	con versiones anteriores) recibe más de un parámetro, el título será el segundo de
//	estos
// Devuelve:
//	Nada
function cabeceraJsp(){
	// Primer argumento ------- Fichero de Ayuda
	// Segundo argumento ------ Título a mostrar
	// Tercero y sucesivos ---- Ruta a mostrar		
	var titulo;
	if (arguments.length==1)
		titulo = arguments[0]
	else
		titulo = arguments[1]
		
	tituloTotal    = "<tr><td width='100%' align='center' height='30' cellpadding='2'><font class='TituloPagAzulClaro'>" + titulo + "</font></td></tr>";
	
	document.write(tituloTotal);
	
}

// ---------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------
// Función:
// 	cabecera2Jsp()
// Descripción:
// 	DEPRECATED
// Parámetros:
//	DEPRECATED
// Devuelve:
//	DEPRECATED
function cabecera2Jsp(){
	// Primer argumento ------- Fichero de Ayuda sin la extensión (que debe ser siempre del tipo *.htm)
	// Segundo argumento ------ Título a mostrar
	// Tercero y sucesivos ---- Ruta a mostrar
	
	var titulo;
	if (arguments.length==1)
		titulo = arguments[0]
	else
		titulo = arguments[1]
	
	tituloTotal    = "<tr><td width='100%' align='center' height='30'><font class='TituloPagAzulClaro'>" + titulo + "</font></td></tr>";
	document.write(titulo);	
}

// ---------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------
// Función:
// 	botonVolver(URLStr)
// Descripción:
// 	Inserta la imagen de Volver con el enlace que indiquemos
// Parámetros:
//	URLStr: cadena con la url a la que redirigir en caso de pulsar en la imagen
// Devuelve:
//	Nada
// Observaciones:
//	En caso de tener que ejecutar una funcion javascript cuando se pulse el botón, las
//	cadenas de texto que lleve en su caso la función irían encerradas en comillas simples,
//	por ejemplo, botonVolver("javascript:guardar('ahora')").
// 	Se ha añadido el parámetro opcion para la llamada a esta función desde la opción de calendarios
function botonVolver(URLStr,opcion) {
	// función que inserta el botón de volver que apunta a la URL que le indiquemos
	if (opcion==null)
	{
		document.write('<p class="sinFondo" style="text-align: right"><a class="sinFondo" href="'+URLStr+'"><img class="sinFondo" alt="Volver" src="mult/TLRFVolver.gif" border="0"></a></p>');
	}
	else if (opcion=="calendarios")
	{
		document.write('<p class="sinFondo" style="text-align: right"><a class="sinFondo" href="'+URLStr+'"><img class="sinFondo" alt="Volver" src="mult/TLRFVolver.gif" border="0"></a></p>');		
	}	
}

// ---------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------
// Función:
// 	textoTamMax(txtArea,max)
// Descripción:
// 	Limita el texto que se puede introducir en un campo de texto de un formulario
// Parámetros:
//	txtArea: objeto que representa el control del formulario a limitar
//	max: numero máximo de caracteres permitidos
// Devuelve:
//	Nada
// Observaciones:
//	Este método debe ser invocado desde el evento onKeyDown del objeto
function textoTamMax(txtArea,max)
{
   if (txtArea.value.length >= max) {
      txtArea.value = txtArea.value.substring(0,max-1);
		alert('No puede escribir más de ' + max + ' caracteres en el campo actual');
      return;
   }
}


// ---------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------
// Función:
// 	obligatorio()
// Descripción:
// 	Inserta el * de obligatorio en el campo que le indiquemos
// Parámetros:
//	
// Devuelve:
//	Nada
function obligatorio() {
	document.writeln('<img src="mult/TLRFEstrella.gif">');
}

// ---------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------
// Función:
// 	botonMas(texto)
// Descripción:
// 	Muestra una imagen con un + y como texto alternativo el texto que le indiquemos
// Parámetros:
//	texto: texto a mostrar
// Devuelve:
//	nada
function botonMas(texto) {
	document.write('<img src="mult/TLRFMas.gif" width="11" height="11" alt="'+texto+'" border="0">');
}
function botonMasAzul(texto) {
	document.write('<img src="mult/TLRFMasAzul.gif" width="11" height="11" alt="'+texto+'" border="0">');
}

function flechaArriba(texto){
	document.write('<img src="mult/TLRFFlechaArriba.gif" width="11" height="11" alt="'+texto+'" border="0">');
}

function flechaAbajo(texto){
	document.write('<img src="mult/TLRFFlechaAbajo.gif" width="11" height="11" alt="'+texto+'" border="0">');
	
}
// ---------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------
// Función:
// abrirVentana(url, nombreVentana, ancho, alto, centrado)
// 	Abre un popUp
// Parámetros:
//	url - destino a abrir.
//	nombreVentana - nombre de la nueva ventana.
//	ancho - ancho de la nueva ventana.
//	alto - alto de la nueva ventana.
//	centrado - es un boolean que indica si la nueva ventana va a estar centrada en el monitor.
//	redim - boolean que indica si la nueva ventana es o no redimensionable.
// Devuelve:
//	el objeto ventana que hemos abierto.
function abrirVentana(url, nombreVentana, ancho, alto, centrado,redim,miScroll,mostrarMenu)
{
    // alert("abrirVentana: " + ancho + "  ---- " + alto);
	var ejeX= 0;
	var ejeY=0;
	if (centrado)
	{
		ejeX = (screen.width - ancho)/2;
	    ejeY =  (screen.height - alto)/2;
    }

        var decoradores="";
    	if (redim)
    	{
    		decoradores+=",resizable";
    	}
    	if (miScroll)
    	{
    	    if(decoradores!="")
    	        decoradores+=",";
    		decoradores+="scrollbars";
    	}
    	if (mostrarMenu) {
    	    if(decoradores!="")
    	        decoradores+=",";
    	    decoradores+="menubar";
    	}

        ventanaModal=open(url,nombreVentana,'width='+ancho+'px,height='+alto+'px,left='+ejeX+';top='+ejeY+""+decoradores);
	
	return ventanaModal;

}

//Devuelve true si la cadena está vacía (aunque disponga de espacios en blanco)
function cadenaVacia(cadena)
{
	var cadAux=cadena;
	cadAux = cadAux.replace(/ /g, "");//La g indica q se recorra hasta el fin de la cadena y no reemplace solo el primero
	if(cadAux.length<=0)
		return true
	else return false;

} 	

//Devuelve el tamaño real de una cadena (quitando los espacios en blanco)
function tamanyoCadena(cadena)
{
	var cadAux=cadena;
	cadAux = cadAux.replace(/ /g, "");//La g indica q se recorra hasta el fin de la cadena y no reemplace solo el primero
	return cadAux.length;
}

//ventana modal 1
var miVentana = null;
function devolverFoco(){
		if	(miVentana!=null && miVentana.window && !miVentana.closed)
		{
			miVentana.focus();
			//alert('miVentana: '+miVentana);
			//alert('miVentana.window: '+miVentana.window);
			//alert('miVentana.closed: '+miVentana.closed);
		}else{
			//alert('miVentana2: '+miVentana);
			//alert('miVentana.window2: '+miVentana.window);
			//alert('miVentana.closed2: '+miVentana.closed);
			miVentana=null;
		}
}
//fin de ventana modal 1
// ---------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------
// Función:
// limpiarFormulario(objForm)
// 	Limpia y deselecciona todos los elementos de un formulario.
// Parámetros:
//	objForm - Formulario a limpiar.
// Devuelve:
//	nada.
function limpiarFormulario(objForm)
	{
		i=0;
	    while (i<objForm.elements.length)
	    {
	    	//alert(objForm.elements[i].type);
	         if (objForm.elements[i].type=="text") 
	         	objForm.elements[i].value = "";
	         else if (objForm.elements[i].type=="textarea")
	         	objForm.elements[i].value = "";
	         else if (objForm.elements[i].type=="select-one")
	         	objForm.elements[i].selectedIndex = 0;
	         else if (objForm.elements[i].type=="radio")
	         	objForm.elements[i].checked = false;
	         else if (objForm.elements[i].type=="checkbox")
	         	objForm.elements[i].checked = false;
	        i+=1; 
	    }
	    
	}
// Función:
// camposRequeridos(objForm)
// 	Construye una cadena con los campos obligatorios que no se han rellenado
// Parámetros:
//	Array con el nombre de todos los campos requeridos
// Devuelve:
//	Cadena con los campos requeridos	
function camposRequeridos(campos)
{
	if (campos.length>1)
		mensajec=" Faltan por rellenar los siguientes campos:<br>";
	else
		mensajec=" Falta por rellenar el siguiente campo:<br>";		
	for (i=0;i<campos.length;i++)
	{
		mensajec+="<b>"+campos[i]+"</b><br>";	
	}
	return mensajec;
}	 	
// Función:
// anyadirCampo(arrayCampos,campo)
// 	Añade al array un elemento
// Parámetros:
//	Array de campos y el nombre del campo que se desea insertar
// Devuelve:
//	Array construido	
function anyadirCampo(arrayCampos,campo)
{
	if (arrayCampos==null)
	{
		arrayCampos=new Array();
	}	
	arrayCampos.push(campo);
	return arrayCampos;
}	 		

//Función que devuelve el valor de un objeto radio q se le pasa como parámetro.
// En el caso de que no haya ningún elemento seleccionado devuelve -1

function obtenerValorRadio(radio)
{
	if (radio==null) return -1;
	var nTamanioRadio=radio.length;
	//En el caso de que radio.length==null, el objeto tiene sólo un elemento y no se trata como array
	if (radio.length==null)
		if(radio.checked)
			return radio.value;
		else return -1;
	else
	{
			var checq=false;
			var cont=0;
			
			while((cont<radio.length)&&(!checq))
			{
				checq=radio[cont].checked;
				cont++;
				
			}
			if (checq)
				return radio[cont-1].value;
			else return -1;
	}
	
}//obtenerValorRadio(radio)

function algunoMarcado(radio) {	
	if(typeof(radio)!=typeof(vacio)){
		if(typeof(radio.length) != typeof(vacio)){
			for(indcComb=0;indcComb<radio.length;indcComb++){
				if(radio[indcComb].checked){
					return(true)
				}
			}
		return(false);
		}else{
			if(radio.checked){
				return (true);
			}else{
				return (false);
			}
		}

 	}else{
   		return true;
	}
}	

//Función que reemplaza en la cadena introducida (cadena), cadena1 por cadena2
function reemplazarCadena(cadena,cadena1,cadena2)
{
	var cadAux=cadena;
	cadAux = cadAux.replace(new RegExp(cadena1,"g") , cadena2);//La g indica q se recorra hasta el fin de la cadena y no reemplace solo el primero
	return cadAux;
	
}

/**
* Función que validará si el valor que se encuentra en el objeto pasado como parámetro se encuentra entre valor1 y valor2
* siendo valor1 el valor más pequeño de ellos. Es decir, se comparará valor1<=valor objeto<=valor2. En caso de que
* la validación sea correcta devuelve true. En caso contrario, además de devolver false, dará el mensaje de error correspondiente
* Si el valor del objeto pasado es una cadena vacia, devolverá true.
* y situará el foco en el objeto.
* @param valor1 Valor inicial
* @param valor1 Valor final
* @param objeto Podrá ser una caja, un como, etc... De momento sólo se implementa para una caja. Para los demás devolverá siempre false  (hasta que se implementen)
* @return true Si la validación es correcta o si el objeto es nulo, o si el valor de este es una cadena vacia. False si la validacion no es correcta (con el mensaje de error correspondiente y el foco)
*/
function validarValorEntre(valor1,valor2, objeto)
{
	var valorInicial=parseFloat(valor1);
	var valorFinal=parseFloat(valor2);
	var valorValido=false;
	if(objeto!=null)
	{
		if(objeto.type=="text")
		{
			if(!cadenaVacia(objeto.value))
			{
				var valorComparar=parseFloat(objeto.value);
				if(valorComparar>=valorInicial && valorComparar<=valorFinal)
					valorValido=true;
				else
				{
					valorValido=false;
					alert("El valor de este campo no puede ser inferior a "+valor1+" ni superior a "+valor2);
					objeto.focus();
					objeto.select();
					
				}
			}
			else valorValido=true;
		}
	}else valorValido=true;
	
	return valorValido;	
}

function muestraCapaDisplay(capa) {
	eval(capa + ".style").display = "block";
}

function ocultaCapaDisplay(capa) {
	eval(capa + ".style").display = "none";
}

function reemplazarValor(cadena, textoAntiguo, textoNuevo){
	
	var cadenaAux='';
	
	while(cadena.indexOf(textoAntiguo)!=-1){
	
		cadenaAux+=cadena.substr(0,cadena.indexOf(textoAntiguo))+textoNuevo;
		cadena=cadena.substr(cadena.indexOf(textoAntiguo)+1);
	}
	return cadenaAux;
}

function reemplazarCadena(cadena, textoAntiguo, textoNuevo){
	
	var cadenaAux='';
	
	var lista = cadena.split(textoAntiguo);
	
	for(var i=0; i<lista.length; i++){
		cadenaAux+=lista[i];
		if(i<lista.length-1){
			cadena+=textoNuevo;
		}
	}
	return cadenaAux;
}






// --------------------------------
// Comprueba si cadena es un número
// --------------------------------
function esNumero(cadena)
{
    // Si lo que recibe no es una cadena devuelve falso.
    if (typeof(cadena) != "string")
    {
		return false;
    } 
    
    if(cadena == "")     
    {
		return false;
    }

    var  numeros = "0123456789"

    for(var i=0; i<cadena.length; i++)
    {
    	if(numeros.indexOf(cadena.charAt(i)) == -1)
    	{
		return false;
	}	
    }

    return true;
}

// ---------------------------------------
// Rellena un campo con ceros a la derecha
// ---------------------------------------
function cerosDerecha(cadena,numeroCeros)
{
	var resultado="";
	var ceros="";
	
	for(var i=0;i<numeroCeros;i++)
	{
		ceros+="0";
	}
	
	resultado=cadena+ceros.substring(0,(numeroCeros-cadena.length));
	
	return resultado;
}
//---------------------------------------
// Sirve para cambiar automaticamente de una caja de texto rellena a otra
//
// texto  --> texto de la primera caja para ver si se completado el numero de caracteres obligatorio
// objeto --> la siguiente caja de texto a la que debe cambiar
// maxcaracteres --> numero de caracteres necesarios para que se realizar el cambio 
// sirve para netscape y explorer
//----------------------------------------
function Cambia(texto,objeto,maxcaracteres){
     pasar = 1;
     //chequea el explorador
     ie = (document.all)? true:false;
     
     if (ie){
          //controla las teclas tabulador, mayusculas y flechas
          if ((window.event.keyCode == 9) ||  (window.event.keyCode == 16) || (window.event.keyCode == 39) || (window.event.keyCode == 37)) {
               pasar = 0;
          }
     }
     if (texto.length > maxcaracteres){
          if (pasar == 1){
               objeto.focus();
               objeto.select();
          }
     }  
}
// ----------------------------------------------
// Función que comprueba si el rango de fechas es 
// correcto sin pasar todo el formulario. 
// Será llamada desde un .js
// ----------------------------------------------

function rangoFechas(diaDesde,mesDesde,anioDesde,diaHasta,mesHasta,anioHasta)
{
	var desde  = anioDesde + mesDesde + diaDesde;
		
	var hasta  = anioHasta + mesHasta + diaHasta;

	var bResultado=true;

	if (parseFloat(desde) > parseFloat(hasta))
	{
		
		bResultado = false;
		
	}
	
	return bResultado;
}

// ------------------------------------------------------
// Devuelve la cadena sin blancos a derecha y a izquierda
// ------------------------------------------------------

function trim(cadena)
{
	var cadenaSinBlancos = "";
	
	if (typeof(cadena) != "string" || cadena == "")
	{
		cadenaSinBlancos = "";
	}
	else
	{
		while (cadena.charAt(0) == " ")
		{
			cadena = cadena.slice(1);
		}
				
		while (cadena.charAt(cadena.length-1) == " ")
		{
			cadena = cadena.slice(0,cadena.length-1);	
		}
			
		cadenaSinBlancos = cadena;
	}
	return cadenaSinBlancos;
}

// Para rellenar selects con números, especialmente los días de un mes - @2000 Jordi Raya
// Los números < 9 aparecen con un 0 en la presentación para que tengan 2 cifras pero el VALUE será sólo el número
function ompleNombres(seleccionat,inicial,darrer){
if (inicial == null) inicial = 1
if (darrer == null) darrer = 31
for (n = inicial; n <= darrer; n ++){
	document.write("<option value='"+n+"'")
	if (n == seleccionat) {document.write(" selected")}
	document.write(">")
	if (n <= 9) {document.write("0")}
	document.write(n)
	}
}

// Para rellenar selects con los meses de un año - @2000 Jordi Raya
// En la presentación aparecen ENE, FEB, etc. pero el VALUE será 1-12
function ompleMesos(seleccionat,caracters,presentacio){
if (caracters == null) caracters = 10
mes = new Array("X","Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Setiembre","Octubre","Noviembre","Diciembre")
for (n = 1; n <= 12; n ++){
	document.write("<option value='"+n+"'")
	if (n == seleccionat) document.write(" selected")
	if (presentacio == 'maj') {meslletra = mes[n].toUpperCase(); mes[n] = meslletra}
	if (presentacio == 'min') {meslletra = mes[n].toLowerCase(); mes[n] = meslletra}
	document.write(">"+mes[n].substr(0,caracters))
	}
}


// Ventana de confirmación de copia de perfil.
// Cambiar el window.location.href por document.nombre_del_frame.submit()
function confirmperf(url){
	if (window.confirm("Son correctos los datos introducidos?")) window.location.href = url
}

// Ventana de confirmación de bloqueo de usuario.
// Cambiar el window.location.href por document.nombre_del_frame.submit()
function confirmbloq(url){
	if (window.confirm("Está realmente seguro de bloquear al usuario IDUsuario")) window.location.href = url
}

// Ventana de confirmación de desbloqueo de usuario.
// Cambiar el window.location.href por document.nombre_del_frame.submit()
function confirmdesbloq(url){
	if (window.confirm("Está realmente seguro de desbloquear al usuario IDUsuario")) window.location.href = url
}

// Ventana de confirmación de baja de servicio.
// Cambiar el window.location.href por document.nombre_del_frame.submit()
function confirmbaser(url){
	if (window.confirm("Está realmente seguro de de dar de baja el servicio\nMvtos. Ctas. Pers. Tiempo Real?")) window.location.href = url
}

// Ventana de confirmación de baja de asunto.
// Cambiar el window.location.href por document.nombre_del_frame.submit()
function confirmbaasun(url){
	if (window.confirm("Está realmente seguro de dar de baja el asunto\n0182 3999 34 0100004441 € ?")) window.location.href = url
}

// Ventana de confirmación de entrada de datos.
function confirmacio(url){
	if (window.confirm("¿Son correctos los datos introducidos?")) window.location.href = url
}

// Ventana de confirmación de baja.
function confirmbaix(url){
	if (window.confirm("Está realmente seguro de dar de baja al usuario MASTER?")) window.location.href = url
}

// Ventana de confirmación de eliminación de ficheros.
function confelim(url){
	if (window.confirm("Está realmente seguro de eliminar el fichero NCASA531.NOM?")) window.location.href = url
}

//Función que incluirá la fecha del sistema en formato dd-nommes-aaaa by Jaume Font
function calendarMonth()
{
	var monthNames = new Array("ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic");
	var dt = new Date();
	var y  = dt.getYear();
	if (y < 1000) y +=1900;
	document.write(dt.getDate() + "-" + monthNames[dt.getMonth()] + "-" + y);
}

//Función que incluirá la fecha de ayer en formato dd-nommes-aaaa by Jaume Font
function fechaAyer()
{
	var monthNames = new Array("ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic");
	var dt = new Date();
	var m  = dt.getDate()-1;
	var y  = dt.getYear();
	if (y < 1000) y +=1900;
	document.write(m + "-" + monthNames[dt.getMonth()] + "-" + y);
}

//Función que incluirá la fecha del sistema en formato de texte by Jaume Font
function fullCalendar()
{
	var dayNames = new Array("Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado");
	var monthNames = new Array("de Enero","de Febrero","de Marzo","de Abril","de Mayo","de Junio","de Julio","de Agosto","de Septiembre","de Octubre","de Noviembre","de Diciembre");
	var dt = new Date();
	var y  = dt.getYear();
	if (y < 1000) y +=1900;
	document.write(dayNames[dt.getDay()] + ", " + dt.getDate() + " " + monthNames[dt.getMonth()] + " de " + y);
}

//Función que incluirá la hora del sistema, i se actualiza al refrescar la pagina by Jaume Font
function hours()
{	
	var h = new Date();
	var horas = h.getHours().toString();
	if (horas.length == 1) horas = "0" + horas;
	var mins = h.getMinutes().toString();
	if (mins.length == 1) mins = "0" + mins;
	document.write(horas + ":" + mins);
}

//***************************************
//	CODIGO DE CODIFICACION, NO DE MAQUETA
//***************************************

// Función que obitiene los options seleccionados en un select Múltiple. También obliga a seleccionar
// uno de los options.
function validar(select,hidden,obligatorio,msg)
{
	var salida = "";
	var result = false;
	for (var i = 0; i < select.options.length; i++) 
	{
		if (select.options[i].selected) 
		{
		    var text = select.options[i].text;
			var value = select.options[i].value;
			salida = salida + value + "#";
			result = true;
		}
		hidden.value = salida;
	 }
	 
	 if ((obligatorio) && (result))
	 {
		return true;
	 }
	 else 
	 {
		if ((obligatorio) && (!result))
		{
			alert(msg)
		}
		else
		{
			if ((!obligatorio) && (!result))
			{
				for (var i = 0; i < select.options.length; i++) 
				{
					var valor = select.options[i].value;
					salida = salida + valor + "#";
					result = true;
				}
				hidden.value = salida;
			}
			else
			{			
					return true;
			}
		}
	 }
	 return result;
}

// Función que determina si el campo de texto pasado por parámetro se ha rellenado o no en cuyo caso
// se muestra una ventana "alert" y se le asigna el foco.
function isObligatorio(campo,msg)
{
	var result = false;
	if ((campo.value == "") || (campo.value == " "))
	{
		alert("El campo " + msg + " no debe estar vacío");
		campo.focus();
	}
	else
		result = true;
	return result;
}

// Función que determina si el campo pasado por parámetro es numérico o no y es de n dígitos en cuyo caso se muestra una 
// ventana "alert" y se le asigina el foco.
function isNumericRange(campo,digitos,msg)
{
	var result = false;
	if (isNumerico(campo,msg))
	{
		if ((campo.value).length != digitos)
		{
			alert("El campo " + msg + " debe ser de " + digitos + " dígitos");
			campo.focus();
			result = false;
		}
		else 
		{
			result = true;
		}
	}
	else
	{
		result = false;
	}
	return result;
}
function isNumerico(campo,msg)
{
	var result = false;
	var value = campo.value;
	var tam = value.length;

	if (tam == 0)
		result = true;
	else
	{
		for ( var i=0; i < tam; i++) 
		{
			var ch = value.substring(i,i+1);
			if ((ch < "0") || ("9" < ch))
			{
				result = false;
				break;
			}
			else result = true;
		}
	}
	if (result == false)
	{
		campo.value="";
		alert("El campo " + msg + " debe ser numérico");
		campo.focus();
	}
	return result;
}

// Función que determina si el formato de fecha es correcto 
// return:true es correcto, false es incorrecto.
function esBisiesto(anyo)
{
	return (((anyo % 4 == 0) && (anyo % 100 != 0)) || (anyo % 400 == 0));
}

function esDiaMesAnoCorrectos(dia, mes, anyo)
{
	if  ((mes > 12) || (mes < 1) || (anyo < 1900) || (dia < 1) || (dia > 31))
	{
		return false;	
	}
	else
	{
		if ((mes == 4) || (mes == 6) || (mes == 9) || (mes == 11))
		{
			return (dia < 31);
		}
		else
		{
			if (mes == 2)
			{
				if (esBisiesto(anyo))
				{
					return (dia < 30);
				}
				else
				{
					return (dia < 29);
				}
			}
			else
			{
				return (dia < 32);
			}
		}
	}
	return true;
}

function validarFormatoFecha(dia, mes, anyo)
{
	var formatoCorrecto = (anyo.value.length < 5) && (mes.value.length < 3) &&  (dia.value.length <3);
	if (dia.value.length==2 && dia.value.charAt(0)=='0') 
	{
	dia.value = dia.value.charAt(1)
	}
	if (mes.value.length==2 && mes.value.charAt(0)=='0')
	{
	mes.value = mes.value.charAt(1)
	}
	return esNumero(dia.value) && esNumero(mes.value) && esNumero(anyo.value) && formatoCorrecto && esDiaMesAnoCorrectos(parseInt(dia.value), parseInt(mes.value), parseInt(anyo.value));
}

// Vacios: 0.
// Llenos: 1.
// Incompletos: 2.
function getEstadoFecha(dia, mes, anyo)
{
	if ((dia.value == "") && (mes.value == "") && (anyo.value == ""))
	{
		return 0;
	}
	if ((dia.value != "") && (mes.value != "") && (anyo.value != ""))
	{
		return 1;
	}
	return 2;
}

//función que comprueba que la fecha 'desde' es menor o igual que la fecha 'hasta'.
function comparaFechas (desde_dia, desde_mes, desde_ano, hasta_dia, hasta_mes, hasta_ano)
{
	if (desde_dia.length==2 && desde_dia.charAt(0)=='0') 
	{
	desde_dia.value = desde_dia.charAt(1)
	}
	if (desde_mes.length==2 && desde_mes.charAt(0)=='0') 
	{
	desde_mes.value = desde_mes.charAt(1)
	}
	if (hasta_dia.length==2 && hasta_dia.charAt(0)=='0') 
	{
	hasta_dia.value = hasta_dia.charAt(1)
	}
	if (hasta_mes.length==2 && hasta_mes.charAt(0)=='0') 
	{
	hasta_mes.value = hasta_mes.charAt(1)
	}

	if ((parseInt(desde_ano)>parseInt(hasta_ano)))
	{
		return false;				
	}
	else
	{
	    	if ((parseInt(desde_ano)==parseInt(hasta_ano)) && (parseInt(desde_mes)>parseInt(hasta_mes)))
		{
			return false;				
		}
		else	
		{
		    	if ((parseInt(desde_ano)==parseInt(hasta_ano)) && (parseInt(desde_mes)==parseInt(hasta_mes)) && (parseInt(desde_dia)>parseInt(hasta_dia)))
			{
				return false;				
			}
		}
	}
	return true;
}


//Función que comprueba que si el intervalo de fechas es correcto
//Se muestra una ventana "alert" y se le asigna el foco.

function validarIntervaloFechas(diaDesde, mesDesde, anoDesde, diaHasta, mesHasta, anoHasta)
{

//Añadido para validar que sean numeros*******************************
	if ((isNumerico(diaDesde,"Dia Desde"))&&(isNumerico(mesDesde,"Mes Desde"))&&(isNumerico(anoDesde,"Año Desde"))&&(isNumerico(diaHasta,"Dia Hasta"))&&(isNumerico(mesHasta,"Mes Hasta"))&&(isNumerico(anoHasta,"Año Hasta")))
	{
//********************************************************************		
		var estadoFechaDesde = getEstadoFecha(diaDesde, mesDesde, anoDesde);
		var estadoFechaHasta = getEstadoFecha(diaHasta, mesHasta, anoHasta);
		switch(estadoFechaDesde)
		{
			 case 0: // Fecha Desde Vacia.
				 switch(estadoFechaHasta)
				 {
					case 0: // Fecha Hasta Vacia.
						break;
					default: // Fecha Hasta Llena o Incompleta.
						alert("Si <fecha Desde> está vacía,\nno se permite rellenar <fecha Hasta>.");
						diaHasta.value = "";
						mesHasta.value = "";
						anoHasta.value = "";
						diaDesde.focus();
						return false;
				 }
				 break;
			 case 1: // Fecha Desde Llena.
				if (!validarFormatoFecha(diaDesde, mesDesde, anoDesde))
				{
					alert("El formato válido de <fecha Desde> es:\nDia:\t1 a 31\nMes:\t1 a 12\nAño:\t1900 a XXXX");
					diaDesde.value = "";
					mesDesde.value = "";
					anoDesde.value = "";
					diaDesde.focus();
					return false;				
				}
				 switch(estadoFechaHasta)
				 {
					case 0: // Fecha Hasta Vacia.
						break;
					case 1: // Fecha Hasta Llena.
						if (!validarFormatoFecha(diaHasta, mesHasta, anoHasta))
						{
							alert("El formato válido de <fecha Hasta> es:\nDia:\t1 a 31\nMes:\t1 a 12\nAño:\t1900 a XXXX");
							diaHasta.value = "";
							mesHasta.value = "";
							anoHasta.value = "";
							diaHasta.focus();
							return false;
						}
						if (!comparaFechas(diaDesde, mesDesde, anoDesde,diaHasta, mesHasta, anoHasta))
						{
							alert("La <fecha Desde> tiene que ser MENOR O IGUAL que la <fecha Hasta>.");
							diaDesde.focus();
							return false;
						}
						break;
					case 2: // Fecha Hasta Incompleta.
						alert("La <fecha Hasta> está incompleta.");
						diaHasta.focus();
						return false;
				 }
				 break;
			 case 2: // Fecha Desde Incompleta.
				 alert("La <fecha Desde> está incompleta.");
				 diaDesde.focus();
				 return false;
		}
		return true;
//Añadido para validar que sean numeros*******************************
	}
	return false;
//********************************************************************		

}


// Comprueba si el importe tiene un formato de entrada valido.
// Devuelve un boolean con indicando de si el formato es correcto.
function esImporteValido(campo)
{
	var valor = campo.value, esNumero = true, numComas = 0, numDecimales = 0, numEnteros = 0, comaValida = true;
	for (var x=0; (x < valor.length) && esNumero; x++)
	{
		switch(valor.charAt(x))
		{
			case ',':	numComas++;
					(x != 0) ? esNumero = (numComas < 2) : esNumero = false;
					break;
			default:	esNumero =  (valor.charAt(x) >= '0') && (valor.charAt(x) <= '9');
					(numComas == 0) ? numEnteros++ : numDecimales++;
					break;
		}
	}
	if (numComas > 0) comaValida = (numDecimales > 0);
	return (esNumero) && (numEnteros < 10) && (numDecimales < 3) && comaValida;
}

// Convierte el importe a un formato en coma flotante valido.
// Devuelve la cadena formateada correcta.
function parseFloatImporte(importe)
{
	var valor = importe.value;
	return parseFloat(valor.replace(",", "."));
}

//Función que comprueba que si el intervalo de  importes es correcto
//Se muestra una ventana "alert" y se le asigna el foco.
function validarIntervaloImportes(importeDesde, importeHasta)
{
	if (importeDesde.value != "")
	{
		if (importeHasta.value != "")
		{
			var importeDesdeFormateado = 0;
			var importeHastaFormateado = 0;
			if (esImporteValido(importeDesde))
			{
				importeDesdeFormateado = parseFloatImporte(importeDesde);
			}
			else
			{
				alert("El rango válido del <importe Desde> es:\n[0 .. 9999999,99]");
				importeDesde.value = "";
				importeDesde.focus();
				return false;
			}
			if (esImporteValido(importeHasta))
			{
				importeHastaFormateado = parseFloatImporte(importeHasta);
			}
			else
			{
				alert("El rango válido del <importe Hasta> es:\n[0 .. 9999999,99]");
				importeHasta.value = "";
				importeHasta.focus();
				return false;		
			}
			if (importeDesdeFormateado > importeHastaFormateado)
			{
				alert("El <importe Desde> tiene que ser MENOR O IGUAL que <importe Hasta>.");
				importeDesde.focus();
				return false;
			}		
		}
		else
		{
			if (!esImporteValido(importeDesde))
			{
				alert("El rango válido del <importe Desde> es:\n[0 .. 9999999,99]");
				importeDesde.value = "";
				importeDesde.focus();
				return false;
			}			
		}
	}
	else
	{
		if (importeHasta.value != "")
		{
			alert("Si el <importe Desde> está vacío,\nno se permite rellenar <importe Hasta>.");
			importeHasta.value = "";
			importeDesde.focus();
			return false;
		}
	}
	return true;
}

//REALIZA EL CAMBIO DEL IMPORTE A LA MONEDA INDICADA
	function cambiarmoneda(importe, moneda) 
	{

	 var eur= 166.386;
	 var importeCalculado;
	 if (moneda.value=="ESP"){
		importeCalculado = parseFloat(importe) * eur;
	 } else {
	     importeCalculado = parseFloat(importe) / eur;
	 }
	 return importeCalculado;
   }


// Comprueba que no se ha seleccionado el string inicial (seleccion de cuenta) del combo.7/31/00.
function isSelected(campo, mensajeCampo)
{
	if (campo.selectedIndex == 0)
	{
		alert("El campo " + mensajeCampo + " no ha sido seleccionado.");
		return false;
	}
	return true;
}

// ----------------------------------------------
// Función que comprueba en un texarea que no se
// puedan meter más de un número determinado de líneas,
// y con un número máximo de caracteres por línea.
// ----------------------------------------------
	function comprueba(form,cadena, numeroFilas, longFilas) 
	{
		
		var cEscape = "\r\n";
		var bResultado = true;
		var bSeguir = true;
		var lineas = 0;
		
		while (bSeguir)
		{
			lineas++;
			
			var posicionEscape = cadena.indexOf(cEscape);
			
			if ((posicionEscape <= longFilas) && posicionEscape != -1)
			{
				cadena = cadena.substring(posicionEscape + 2);
			}
			else
			{
				if (cadena.length > longFilas)
				{
					cadena = cadena.substring(longFilas);
				}
				else
				{
					bSeguir = false;
				}
			}
		}
	        
		if (lineas > numeroFilas)
	    {
			alert("$$Ha sobrepasado el número máximo de lineas$$ (6)")
			
			bResultado = false;			
	    }
    
    	if(bResultado)
    	{
    		form.submit();
    	}
    	else
    	{
    		form.observacion.focus();
    	}
}


	function disableKey(event) {
      if (!event)
      		event = window.event;
      if (!event) 
      		return;
  
      var enter=false;
      var f5=false;
	  
	  var browser = detectBrowser();

  	  if(event.keyCode==13)
  	  {
  	  	 enter=true;  	  	 
  	  }
  	  else
  	  {
  	  	  if(event.which==13)
  	  	  {
  	  	  	   enter=true;  	  	  	   
  	  	  }
  	  }
	  // Si el navegador es safari o chrome,
	  // la letra T tiene el keycode 116
  	  if(event && (event.keyCode == 116 && browser != 4)){
     	f5= true;  
      } 
    if(event && event.keyCode == 505){  
     	f5=true;     
    }
    
      // keyCode for F% on Opera is 57349 ?!
    
      if (enter || f5 ) {
       	  if(f5) 
       	  	window.status = "El uso de F5 no está permitido.";
	      else if(enter) 
	      	window.status = "El uso de Enter no está permitido.";
	      window.setTimeout("window.status='';", 2000);
	  
	      // Standard DOM (Mozilla):
	      if (event.preventDefault) event.preventDefault();
	  
	      //IE (exclude Opera with !event.preventDefault):
	      if (document.all && event && !event.preventDefault) {
	         event.cancelBubble = true;
	         event.returnValue = false;
	         event.keyCode = 0;
	      }
	  
	      return false;
      }
    }
  
    function setEventListener(eventListener) {
      if (document.addEventListener)
			document.addEventListener('keydown', eventListener, true);
      else if (document.attachEvent)
      		document.attachEvent('onkeydown', eventListener);
      else 
      		document.onkeydown = eventListener;
    }

//REQ058@SCCID2P.SDC@22/05/2008 - INICIO
//Reorganización de la lógica JavaScript para el nuevo flujo comercial del cambio
/**************************************************************
** Nombre:   	marcarBilletesAgrupado
** Finalidad: 	Cambia el checked de los checkbox de los 
**				billetes emparejados con el objeto pasado por parametro
****************************************************************/
function marcarBilletesAgrupado(objeto){

	//Recupero todos los checkbox de billetes
	var chkBilletes = obtenerCheckBilletes();
    var cdgoBillete = objeto.value;
    var emIda = -1;
    var emVuelta = -1;
  
  	//Busco en que posiciones de los array se encuentran los emparejamientos
  	for(var i=0; emIda <0 && i < emparejadosIda.length; i++){
  		if (emparejadosIda[i].indexOf(cdgoBillete) != -1){
  			emIda=i;
  	  	}
  	}
  	for(var i = 0; emVuelta < 0 && i < emparejadosVuelta.length; i++) {
  		if (emparejadosVuelta[i].indexOf(cdgoBillete) != -1) {
  	  		emVuelta = i;
  	  	}
  	}
  	
	if (objeto.checked && (emIda >= 0 || emVuelta >= 0)) {
		for (i = 0; i < chkBilletes.length; i++) { 
	    	if (chkBilletes[i].type == "checkbox" && 
	      		(((emVuelta >= 0) && emparejadosVuelta[emVuelta].indexOf(chkBilletes[i].value) != -1) 
	      			|| ((emIda >= 0) && emparejadosIda[emIda].indexOf(chkBilletes[i].value) != -1))) {
				chkBilletes[i].checked = objeto.checked;
		    }
	    }
	}
}

/**************************************************************
** Nombre:   	obtenerCheckBilletes
** Finalidad: 	Devuelve todos los checkbox de la ventana
**   			que representan a los billetes.
****************************************************************/
function obtenerCheckBilletes(){
	
	//Array de billetes
	var checkBilletes = new Array();
	//Definicion de la busqueda
	var filtros = crearFiltro();
	//Array de atributos por el que se debe filtrar
	var atributos = new Array();
	//Objeto atributo
	var atributo = crearAtributo();
	
	//Indicamos los valores de la definicion de busqueda 
	//para que recupere los valores comunes
	filtros.tagName  = 'input';
	filtros.form = 'search';
	filtros.name = 'lista';
	atributo.nombre = 'type';
	atributo.valor = 'checkbox';
	atributos[0] = atributo;
	filtros.atributos = atributos;
	
	//Se obtiene los checks
	checkBilletes = obtenerTagsPorFiltro(filtros);
	
	//Se devuelven los checks
	return checkBilletes;
}

/**************************************************************
** Nombre:   	filtro
** Finalidad: 	Genera un objeto filtro vacio
****************************************************************/
function crearFiltro(){
	//Objeto de filtro
	var filtro = new Object();
	
	//Se inicializan las variables del filtro
	//Frame donde se busca
	filtro.frame = null;
	//Document donde se busca
	filtro.documento = null;
	//Formulario donde se busca
	filtro.form = null;
	//Tipo de tag que se busca
	filtro.tagName = null;
	//Nombre de elemento que se busca
	filtro.name = null;
	//Atributos por los que se busca
	filtro.atributos = null;
	
	//Se devuelve el filtro generado
	return filtro;
}

/**************************************************************
** Nombre:   	atributo
** Finalidad: 	Genera un objeto atributo vacio
****************************************************************/
function crearAtributo() {
	//Objeto de atributo
	var atributo = new Object();
	
	//Se inicializan las variables del atributo
	//Nombre del atributo
	atributo.nombre = null;
	//Valor del atributo
	atributo.valor = null;
	//Si se informa a true no validará el valor del atributo
	//solo comprobará si existe
	atributo.existe = false;
	//
	atributo.distinto = false;
	
	//Se devuelve el atributo generado
	return atributo;
}

/**************************************************************
** Nombre:   	obtenerTagsPorFiltro
** Finalidad: 	Devuelve todos los tags en forma de array, 
**			    teniendo en cuenta una serie de filtros.
****************************************************************/
function obtenerTagsPorFiltro(objFiltro) {
	//Document en el que buscar
	var documento = null;
	//Elementos Tag que se buscan por el nombre
	var tags = new Array();	
	//Se obtiene el document con el objeto
	documento = obtenerDocument(objFiltro);

	//Comprobamos si los elementos se buscan por TagName o name
	if (objFiltro.tagName != null) {
		//Objeto que realiza la busqueda
		var objBuscar = null;
		//Se comprueba si se desea buscar en un formulario
		//concreto o en todo el documento
		if (objFiltro.form != null) {
			//Se recupera el formulario
			objBuscar = documento.forms[objFiltro.form];
		} else {
			//Se asigna el document como punto de inicio
			objBuscar = documento;
		}
		//Se obtienen los tags
		tags = objBuscar.getElementsByTagName(objFiltro.tagName);
		//Si ademas queremos buscar por el filtro de name
		if (objFiltro.name != null) {
			//Se filtran los nombres
			tags = filtrarPorNombre(tags, objFiltro.name);
		}
	//En caso de que no se desee filtrar por tags
	//Pero si por nombre de elementos
	} else if (objFiltro.name != null) {
		//Si se debe filtrar por formulario
		if (objFiltro.form != null) {
			//Se obtienen todos los tags del formulario
			var form = documento.forms[objFiltro.form];
			//Se obtienen los tags del formulario
			tags = form.childNodes();
			//Se filtra por nombre
			tags = filtrarPorNombre(objFiltro.name);
        } else {
        	//Se obtienen los tags por el nombre
        	tags = documento.getElementsByName(objFiltro.tagName);
        }
    //En caso de que no se desee filtrar en absoluto
	} else {
		//Se recuperan los hijos del documento
		tags = documento.childNodes();
	}
	//Si una vez obtenidos los elementos se desea filtrar por un 
	//determinado atributo
	if (objFiltro.atributos != null) {
		//Si queremos filtrar por algún atributo concreto de los elementos
		tags = filtrarPorAtributos(tags, objFiltro.atributos);
	}
	
	//Se devuelven los elementos filtrados
	return tags;
}

/**************************************************************
** Nombre:   	obtenerDocument
** Finalidad: 	Devuelve un objeto HtmlDocument a partir del filtro
****************************************************************/
function obtenerDocument(objFiltro) {
	//Frame en el que buscar
	var frame = null;
	//Document a obtener
	var documento = null;
	
	//Obtenemos los filtros para buscar del document
	frame = objFiltro.frame;
	documento = objFiltro.documento;
	//Si el documento definido en el filtro no está informado
	if (documento == null) {
		//Si el frame está informado recuperamos el document del frame
		if (frame != null) {
			//Se obtiene el documento del frame
			documento = window.frames[frame].document;
		} else {
			//Se obtiene el documento actual
			documento = document;
		}
	}
	
	//Se devuelve el document obtenido
	return documento;
}

/**************************************************************
** Nombre:   	filtrarPorNombre
** Finalidad: 	Devuelve un array de Tags, filtrados por el
				atributo name
****************************************************************/
function filtrarPorNombre(tags, nombreTag) {
	//Resultado de filtrar
	var result = new Array();
	//Contador auxiliar para el nuevo array
	var cont = 0;
	
	//Se recorren los tags encontrados
	for (var i = 0; i < tags.length; i++) {
		//Se comporueba que el nombre coincida
		if (tags[i].name == nombreTag) {
			result[cont] = tags[i];
			cont++;
		}
	}
	
	//Se devuelve el array de tags obtenidos
	return result;
}

/**************************************************************
** Nombre:   	filtrarPorAtributo
** Finalidad: 	Devuelve un array de Tags, filtrados por el
				atributo name
****************************************************************/
function filtrarPorAtributos(tags, atributos) {
	//Resultado de filtrar
	var result = new Array();
	//Contador auxiliar para el nuevo array
	var cont = 0;
	//Indicador de si se debe añadir el tag o no
	var tagValido = true;
	
	var traza = '';
	
	//Se recorren los tags encontrados
	for (var i = 0; i < tags.length; i++) {
		//Se inicializa el valor del indicador de tags validos
		tagValido = true;
		//Se itera sobre los atributos que se desea iterar 
		for (j = 0; (j < atributos.length && tagValido); j++) { 
			//Por cada atributo que se desea validar
			var atributo = atributos[j];
			//Valor del atributo obtenido
			var valAtributo = tags[i].getAttribute(atributo.nombre);
			var valValor = atributo.valor;
			//Se comprueba si el atributo existe
			if (valAtributo != undefined) {
				//Se comprueba si deseamos validar que el atributo exista
				//o deseamos que además valide si el valor es correcto
				if (!atributo.existe) {
					if (atributo.distinto) {
						//Si algún atributo del tag no cumple la condición, ya no es valido
						traza += '\nComprobación 1=' + (valAtributo == valValor);
						if (valAtributo == valValor) {
							//El tag no es valido
							tagValido = false;
						}
					} else {
						//Si algún atributo del tag no cumple la condición, ya no es valido
						traza += '\nComprobación 2=' + (valAtributo != valValor);
						if (valAtributo != valValor) {
							//El tag no es valido
							tagValido = false;
						}
					}
				}
			} else {
				//En otro caso el tag no es valido
				tagValido = false;
			}
		}
		
		//Se comporueba que el tag sea válido
		if (tagValido) {
			result[cont] = tags[i];
			cont++;
		}
	}
	
	//Se devuelve el document obtenido
	return result;
}

	
//REQ058@SCCID2P.SDC@22/05/2008 - FIN

//REQ062@sccid5a.SDC@14/11/2008 - INICIO
	/**	
	 * Nombre:      soloNumeros
	 *
	 * Descripcion: Funcion que limita los caracteres posibles en una caja de texto a numéricos.
	 *              Se añade al evento onkeypress.
	 *             
	 * Parametros de entrada:  
	 *     myfield     Campo de texto al que se aplica la funcion
	 *
	 *     e           Eventos del campo de texto
	 *
	 *     dec         Valor booleano que indica si permite o no valores decimales.
	 *
	 *
	 *
	 * Parametros de salida:
	 *
	 *    true  Si el caracter pulsado es un número
	 *
	 *    false Si el caracter pulsado no es numérico
	 *
	 */
	function soloNumeros(myfield, e, dec) {
	
	      var key;
	      var keychar;
	
	      if (window.event) {
	
	            key = window.event.keyCode;
	
	      } else    {
	
	            if (e) {
	
	                  key = e.which;
	
	            } else {
	
	                  return true;
	            }
	      }
	
	      keychar = String.fromCharCode(key); 
	
	      // control keys
	      if ( (key==null) 
	           || (key==0) 
	           || (key==8) 
	           || (key==9) 
	           || (key==13) 
	           || (key==27) 
	         ) {
	
	            return true;
	
	      } else {
	
	            // numbers
	
	            if ((("0123456789").indexOf(keychar) > -1)) {
	
	                  return true;
	            } else {
	
	                  // decimal point jump
	                  if (dec && (keychar == ".")) {
	
	                        myfield.form.elements[dec].focus();
	                        return false;
	                  } else {
	                  
	                        return false;
	                  }
	            }
	      }
	}
//REQ062@sccid5a.SDC@14/11/2008 - INICIO
// @FAMILIANUMEROSA.INICIO@SCCID9Y.SDC@23/01/2009
// ----------------------------------------------
// Función que habilita los campos radio, select y de texto
// ----------------------------------------------
function habilitarCampoFormulario(formulario){
	var elementos=eval('document.forms["'+formulario+'"].elements');
	for(var i=0;i<elementos.length;i++){
		if (elementos[i].type == 'radio' ||
			elementos[i].type == 'select-one' ||
			elementos[i].type == 'text'	
		    ){
			elementos[i].disabled=false;
		}
	}
} 

// ----------------------------------------------
// Función que deshabilita los campos radio, select y de texto
// ----------------------------------------------
function deshabilitarCampoFormulario(formulario){
	var elementos=eval('document.forms["'+formulario+'"].elements');
	for(var i=0;i<elementos.length;i++){
		if (elementos[i].type == 'radio' ||
			elementos[i].type == 'select-one' ||
			elementos[i].type == 'text'	
		    ){
			elementos[i].disabled=true;
		}
	}
}
// @FAMILIANUMEROSA.FIN@SCCID9Y.SDC@23/01/2009
    