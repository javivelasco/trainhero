
	// Variables Globales
	var urlsTrenes = new Array(22);
		urlsTrenes["ALARIS"]	     = "http://www.renfe.es/alaris/index_servicios.html";
		urlsTrenes["ALTARIA"]	     = "http://www.renfe.es/altaria/index_servicios.html";
		urlsTrenes["ALVIA"]		     = "http://www.renfe.es/alvia/index_servicios.html";
		urlsTrenes["ARCO"]	         = "http://www.renfe.es/arco/index_servicios.html";
		urlsTrenes["AVANT"]	         = "http://www.renfe.es/avant/index.html";
		urlsTrenes["AVE"]	         = "http://www.renfe.es/ave/index.html";		
		urlsTrenes["DIURNO"]	     = "http://www.renfe.es/diurno/index_servicios.html";
		urlsTrenes["ESTRELLA"]	     = "http://www.renfe.es/estrella/index_servicios.html";
		urlsTrenes["EUROMED"]	     = "http://www.renfe.es/euromed/index_servicios.html";
		urlsTrenes["INTERCITY"]	     = "http://www.renfe.es/intercity/index_servicios.html";
		urlsTrenes["TALGO"]	         = "http://www.renfe.es/talgo/index_servicios.html";
		urlsTrenes["TALGO 200"]	     = "http://www.renfe.es/ave/ficha_talgo200.html";
		urlsTrenes["T200 MALAG"]	 = "http://www.renfe.es/ave/index_talgo200_malaga.html";
		urlsTrenes["TRENHOTEL"]	     = "http://www.renfe.es/trenhotel/index_servicios.html";
		urlsTrenes["R-598"]	         = "http://www.renfe.es/mediadistancia/serie_r598.html";
		urlsTrenes["T.R.D."]	     = "http://www.renfe.es/mediadistancia/serie_594.html";
		urlsTrenes["AVE INCTY LNZA"] = "http://www.renfe.es/avant/index.html";
		urlsTrenes["A.EXPRESS "]	 = "http://www.renfe.es/mediadistancia/index_derecho.html";
		urlsTrenes["AVE TALGO 350 "] = "http://www.renfe.es/ave/index_derecho.html"; 
		urlsTrenes["C.EXPRESS "]	 = "http://www.renfe.es/mediadistancia/index_derecho.html";
		urlsTrenes["R.EXPRESS"]	     = "http://www.renfe.es/mediadistancia/index.html";
		urlsTrenes["REGIONAL"]	     = "http://www.renfe.es/mediadistancia/index.html";	
		
	// REQ0660@ACC.SCCID2N.SDC@12/04/2011@INICIO
	var idDivPrecioMesaIdaOld;
	var idDivPrecioMesaVueltaOld;	
	// REQ0660@ACC.SCCID2N.SDC@12/04/2011@FIN
	
	/**
	 * ocultarMostrarColumnas
	 */
	function ocultarMostrarColumnas(nombreTabla, arrayColumnas, ocultar) {

		var ocultarMostrar;
	  	var tabla;
	  	var fila;
	  	var columna;
	  	var columnas;
	  	var i;
	  	var j;
	    
	  	if (ocultar) {
	  		ocultarMostrar = "none";
	  	} else {
	  		ocultarMostrar = "";
	  	}
	  
	  	tabla = document.getElementById(nombreTabla);
	  
	  	if (tabla != null) {
	  
		  	fila  = tabla.getElementsByTagName('tr');
		  
		  	for(i = 0; i < fila.length; i++) {
			
				if (arrayColumnas != null) {
				
					for(j = 0; j < arrayColumnas.length; j++) {
					
						if (i > 0) {
							columnas = fila[i].getElementsByTagName('td');		
							columna  = columnas[arrayColumnas[j] - 1];
							if ((columna != null)
							    &&(columna.style != null)) {
									columna.style.display = ocultarMostrar ;				
							}
						}
							    
				    }		
				}
		  	}	  
		}
	}
	
	
	
	
	
	/**
	 * ocultarMostrarCabecera
	 */
	function ocultarMostrarCabecera(nombreTabla, vistaDefecto, check, coletilla) {
	
		var tabla;

		tabla = document.getElementById(nombreTabla);
		  
		if (tabla != null) {
	
			if (check.checked) {
			
				document.getElementById("TarifaGeneral" + coletilla).style.display = "";	
				document.getElementById("TarifasPromo"  + coletilla).style.display = ""; 
				document.getElementById("Desde" + coletilla).style.display = "none";
				
			} else {	
				document.getElementById("TarifaGeneral" + coletilla).style.display = "none";	
				document.getElementById("TarifasPromo"  + coletilla).style.display = "none"; 
				document.getElementById("Desde" + coletilla).style.display = ""; 			            	
			}
		}
	}	
	
	//@REQ0003@SCEXUHK@30/12/2011@INICIO
	/**
	 * mostrarOcultarCompleto
	 */	
	function mostrarOcultarCompleto() {
		
		var cambioVista;
				
		cambioVista = document.getElementById('cambioVista');
		check       = document.getElementById('checkTrenesVista');
		cambioVista = document.getElementById('cambioVista').value;
		
		
		capas=document.getElementsByTagName('div');
		if (cambioVista == "0") {
			for (i=0;i<capas.length;i++){
				if(capas[i].id.indexOf('divPrecioMenor') != -1){
					nombreDiv = capas[i].id
					divMostrar = nombreDiv.substring(14,nombreDiv.length);
					divMostrar = "divPrecioLista" + divMostrar;
					document.getElementById(nombreDiv).style.display="none";
					document.getElementById(divMostrar).style.display="";
					document.getElementById('cambioVista').value = "1";
				}
			}
					
		}
		if (cambioVista == "1") {
			for (i=0;i<capas.length;i++){
				if(capas[i].id.indexOf('divPrecioLista') != -1){
					nombreDiv = capas[i].id
					divMostrar = nombreDiv.substring(14,nombreDiv.length);
					divMostrar = "divPrecioMenor" + divMostrar;
					document.getElementById(nombreDiv).style.display="none";
					document.getElementById(divMostrar).style.display="";
					document.getElementById('cambioVista').value = "0";
				}
			}
		}
		
		//SCEXU3T@14/02/2014@FIN
		//cambiarMensajeTarifas();
	}
	//@REQ0003@SCEXUHK@30/12/2011@FIN
	
	
	function cambiarMensajeTarifas() {
		
		
		var msgTarifas = document.getElementById('msgTarifas');
		var cambioVista = document.getElementById('cambioVista').value;
		if (cambioVista != null) {
			if (cambioVista == "1") {
				msgTarifas.innerHTML = (msgTarifas2);
			} else {
				msgTarifas.innerHTML = (msgTarifas1);
			}
		}
		
	}
	
	
	function cambiarColumnas() {
	
		var check;
		var trenesVistaXDefecto;
		var cambioVista;
		var arrayColumnasOcultar;
		var arrayColumnasMostrar;
		var contador;
		var valor;
		var estadoColumna;		
		var comprobar = 0;
				
		check               = document.getElementById('checkTrenesVista');
		trenesVistaXDefecto = document.getElementById('vistaTrenes');
		cambioVista         = document.getElementById('cambioVista');
		
		
		if (check.checked) {
		            			
			//Para conservar el radio button en la lista de trenes.
			//Recogemos el valor checkeado
			/*for(i=0;i<document.formulario.trenIda_radio.length;i++)
			{
        		if(document.formulario.trenIda_radio[i].checked)
        		{ 
        			valor = document.formulario.trenIda_radio[i].value;
        		}
        	}*/
			
			arrayColumnasMostrar = new Array(numColumVistaCompleta);
			for (contador = 0; contador < (numColumVistaCompleta); contador++) {
			
				arrayColumnasMostrar[contador] = numColumnas - numColumVistaCompleta + contador;
			}
			
			arrayColumnasOcultar = new Array(numColumVistaReducida);			
			for (contador = 0; contador < (numColumVistaReducida); contador++) {
			
				arrayColumnasOcultar[contador] = numColumnas + contador;
			}			
			
		} else {
			
			/* Para conservar el radio button en la lista de trenes.
			//Recogemos el valor checkeado
			for(i=0;i<document.formulario.trenIda_radio.length;i++)
			{
        		if(document.formulario.trenIda_radio[i].checked)
        		{ 
        			valor = document.formulario.trenIda_radio[i].value;
        		}
        	}
        	*/
					
			arrayColumnasOcultar = new Array(numColumVistaCompleta);
			for (contador = 0; contador < (numColumVistaCompleta); contador++) {
			
				arrayColumnasOcultar[contador] = numColumnas - numColumVistaCompleta + contador;
			}
			
			arrayColumnasMostrar = new Array(numColumVistaReducida);			
			for (contador = 0; contador < (numColumVistaReducida); contador++) {
			
				arrayColumnasMostrar[contador] = numColumnas + contador;
			}				

		}		
		
		ocultarMostrarCabecera('tablaTrenesIda', trenesVistaXDefecto.value, check, "Ida");
		ocultarMostrarCabecera('tablaTrenesVuelta', trenesVistaXDefecto.value, check, "Vuelta");
		ocultarMostrarColumnas('tablaTrenesIda',    arrayColumnasOcultar, true);
		ocultarMostrarColumnas('tablaTrenesVuelta', arrayColumnasOcultar, true);
		ocultarMostrarColumnas('tablaTrenesIda',    arrayColumnasMostrar, false);
		ocultarMostrarColumnas('tablaTrenesVuelta', arrayColumnasMostrar, false);
		
		/* Para conservar la elección del radio button en la lista de trenes */
		
		//Si no tenemos valor es que no hemos seleccionado ningún radio button
		/*if(valor!=null && valor!='')
		{
			//Guardo el valor pero si lleva | al final lo ignoro.
			if(valor.substring(valor.length-1,valor.length)=='|')
			{
				valor = valor.substring(0,valor.length-1);
			}
				
			//Voy recorriendo los values
			for(i=0;i<document.formulario.trenIda_radio.length;i++)
			{
				//Guardo el value original
				value = document.formulario.trenIda_radio[i].value;
				//Si se ha comprobado pero no ha llegado al break y 
				//el value lleva | al final debemos quitarlo para volver a comprobarlo
				if(comprobar>0 && value.substring(value.length-1,value.length)=='|')
				{
					value = value.substring(0,value.length-1);
				}
	    		if(valor == value)
	    		{
	    			comprobar = comprobar+1;
	    			//Si no esta chequeado lo chequeamos, 
	    			if(!document.formulario.trenIda_radio[i].checked)
	    			{   
	    				document.formulario.trenIda_radio[i].checked = "true";
	    				break;
	    			}
	    			//si esta chequeado lo deschequeamos
	    			//ya que a lo mejor se oculta y luego al dar a continuar no se ve pero
	    			//seguiría chequeado y continuaría el proceso de compra.
	    			else
	    			{
	    				document.formulario.trenIda_radio[i].checked = "false";
	    			}
	    		}
	    	}
	    }*/
		
		
		
				
	}

	function cambiarIdaYVuelta() {
		
		var check;
		var trenesVistaXDefecto;
		var full;
		var fullCambiada;
		var idaVuelta;
		
		var divClassIda;
		var divClassVta;
		var h_ida_width;
		var h_ida_float;	
		var h_ida_marginT;
		var h_ida_marginL;
		var t_ida_width;
		var t_ida_height;		
		var horarios_width;
		var v_abierta_width;
		var v_abierta_left;
		var v_abierta_marginR;
		var h_vta_width;
		var h_vta_marginL;
		var h_vta_marginT;
		var h_vta_float;
		var t_vta_width;
		var t_vta_height;		
				
		check               = document.getElementById('checkTrenesVista');
		trenesVistaXDefecto = document.getElementById('vistaTrenes');
		idaVuelta           = document.getElementById('iv').value;

		if ((trenesVistaXDefecto.value == 'COMPLETA')
		    && (check.checked)) {
			
			full         = '_full';
			fullCambiada = '';
		
		} else if ((trenesVistaXDefecto.value == 'COMPLETA')
		            && (!check.checked)) {
			
			full         = '';
			fullCambiada = '_full';
			
		}  else if ((trenesVistaXDefecto.value == 'REDUCIDA')
		            && (check.checked)) {
		            			
			full         = '';
			fullCambiada = '_full';
			
		} else if ((trenesVistaXDefecto.value == 'REDUCIDA')
		            && (!check.checked)) {
					
			full         = '_full';
			fullCambiada = '';
		}
		
		if (fullCambiada == '_full') {
		
			// Valores para pantalla completa (estilo full)
			h_ida_width = '980px';
			h_ida_float = 'none';	
			h_ida_marginT = '20px';
			h_ida_marginL = '18px';
			
			t_ida_width = '100%';
			t_ida_height = 'auto';		
			t_ida_paddingL = '20px';
			
			horarios_width = '98%';
			
			v_abierta_width = '980px';
			v_abierta_left = '615px';
			v_abierta_marginR = '30px';

			h_vta_width = '980px';
			h_vta_marginL = '0px';
			h_vta_marginT = '20px';
			h_vta_float = 'left';	

			t_vta_width = '99.9%';
			t_vta_height = 'auto';				
			
		} else {
		
			// Valores para doble columna
			h_ida_width = '480px';
			h_ida_float = 'left';	
			h_ida_marginT = '0px';	
			h_ida_marginL = '5px';	
					
			t_ida_width = 'auto';		
			t_ida_height = '20px';	
			t_ida_paddingL = '5px';
			
			horarios_width = '480px';	
			
			v_abierta_width = '350px';
			v_abierta_left = '240px';
			v_abierta_marginR = '0px';	
			
			h_vta_width = '480px';
			h_vta_marginL = '0px';
			h_vta_marginT = '0px';
			h_vta_float = 'right';	
				
			t_vta_width = 'auto';
			t_vta_height = '20px';			
		}
		
		
		divClassIda = 'horarios_ida' + full;
		document.getElementById(divClassIda).style.width = h_ida_width;
		document.getElementById(divClassIda).style.float = h_ida_float;
		document.getElementById(divClassIda).style.marginTop = h_ida_marginT;
		document.getElementById(divClassIda).style.marginLeft = h_ida_marginL;
		document.getElementById(divClassIda).id = 'horarios_ida' + fullCambiada;
		
		divClassIda = 'titulo_ida' + full;
		document.getElementById(divClassIda).style.width = t_ida_width;
		document.getElementById(divClassIda).style.height = t_ida_height;
		document.getElementById(divClassIda).style.paddingLeft = t_ida_paddingL;
		document.getElementById(divClassIda).id = 'titulo_ida' + fullCambiada;
		
		divClassIda = 'horarios' + full;
		document.getElementById(divClassIda).style.width = horarios_width;
		document.getElementById(divClassIda).id = 'horarios' + fullCambiada;
		
		divClassIda = 'vuelta_abierta' + full;
		document.getElementById(divClassIda).style.width = v_abierta_width;
		document.getElementById(divClassIda).style.left = v_abierta_left;
		document.getElementById(divClassIda).style.marginRight = v_abierta_marginR;
		document.getElementById(divClassIda).id = 'vuelta_abierta' + fullCambiada;
				
		if (idaVuelta == ('iv')) {
	
			divClassVta = 'horarios_vuelta' + full;	
			document.getElementById(divClassVta).style.width = h_vta_width;
			document.getElementById(divClassVta).style.paddingLeft = h_vta_marginL;
			document.getElementById(divClassVta).style.marginTop = h_vta_marginT;
			document.getElementById(divClassVta).style.float = h_vta_float;						
			document.getElementById(divClassVta).id = 'horarios_vuelta' + fullCambiada;
			
			divClassVta = 'titulo_vuelta' + full;
			document.getElementById(divClassVta).style.width = t_vta_width;	
			document.getElementById(divClassVta).style.height = t_vta_height;					
			document.getElementById(divClassVta).id = 'titulo_vuelta' + fullCambiada;
			
			divClassVta = 'horarios' + full;
			document.getElementById(divClassVta).style.width = horarios_width;
			document.getElementById(divClassVta).id = 'horarios' + fullCambiada;			

		}
		
	}
	
/*	function muestraPrestacion(tipoTren) {
	
		url = devolverUrl(tipoTren);
		if(url!="") {
			window.open(url, '', 'width=800,height=670,scrollbars=1,resizable=1');	
		}
	}*/
	
	// @ INC000000531462@INDRA.SCEXUF3.SDC@27/09/2012@INICIO
	// INICIO 59977 VOLRF001: Obtener las prestaciones de un tren de la misma tabla que la aplicación HOL.
	// @INC000000533134@INDRA.SCEXUF3.SDC@02/10/2012@INICIO
	// 60145: Modificar la dirección de las prestaciones de la aplicación VOL-P.								
	function muestraPrestacion(urlPrestaciones, origen, destino, fechaViaje, grupo, idiomaAux, tren, tipoTren) {	
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
		
		//@INDRA.SCCID7N.SDC@06/08/2012@INICIO
		//INICIO: Controlar el valor del idioma en la llamada a HOL.
		if(idioma=="")idioma = "s";
		//FIN: Controlar el valor del idioma en la llamada a HOL.
		//@INDRA.SCCID7N.SDC@06/08/2012@FIN	
		
		var url= urlPrestaciones+"?O="+origen+"&D="+destino+"&F="+fechaViaje+"&G="+grupo+"&ID="+idioma+"&T="+tren+"&TT="+tipoTren;
		window.open(url, 'prestaciones', 'width=600,height=500,scrollbars=1,resizable=1');
	}
	
	// FIN 59977 VOLRF001
	// @ INC000000531462@INDRA.SCEXUF3.SDC@27/09/2012@FIN
	// @INC000000533134@INDRA.SCEXUF3.SDC@02/10/2012@FIN
	
	//@INC000000555196@INDRA.SCEXUF2.SDC@18/12/2012@INICIO
	//62827: Se pasa la duración del tren al controller del detalle del recorrido.
	function muestraRecorrido(origen, destino, fechaViaje, tren, grupo, tipoTren, idiomaAux, fechaFDS, duracion) {
	//@INC000000555196@INDRA.SCEXUF2.SDC@18/12/2012@FIN
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
		
		//@INDRA.SCCID7N.SDC@06/08/2012@INICIO
		//INICIO: Controlar el valor del idioma en la llamada a HOL.
		if(idioma=="")idioma = "s";
		//FIN: Controlar el valor del idioma en la llamada a HOL.
		//@INDRA.SCCID7N.SDC@06/08/2012@FIN	
		
		//@INC000000555196@INDRA.SCEXUF2.SDC@18/12/2012@INICIO
		//62827: Se pasa la duración del tren al controller del detalle del recorrido.			
		var url= urlRecorridoTren+"?O="+origen+"&D="+destino+"&F="+fechaViaje+"&T="+tren+"&G="+grupo+"&TT="+tipoTren+"&ID="+idioma+"&FDS="+fechaFDS+"&DT="+duracion;
		//@INC000000555196@INDRA.SCEXUF2.SDC@18/12/2012@FIN
		// @INC000000572109@INDRA.SCEXU0U.SDC@22/01/2013@INICIO 
		// INICIO 64758: Configurar ventana de trenes combinados como modal y solucionar desajuste de texto al redimensionar.
		var propiedades = "dialogHeight: 500px;dialogWidth: 600px;scroll:yes;resizable=yes;"
	//  	window.showModalDialog(url, "recorrido", propiedades);
		nombreVentana = 'recorrido' + tren;
		window.open(url, nombreVentana, 'width=600,height=500,scrollbars=1,resizable=1');
	  	//window.open(url, 'recorrido', 'width=600,height=500,scrollbars=1,resizable=1');
		// @INC000000572109@INDRA.SCEXU0U.SDC@22/01/2013@FIN

	}
	//	@REQ200@SCCID2N.SDC@10/05/2010@INICIO
	function muestraIncidencia(urlIncTren, cdgoTren, descTipoTren, fchaViajeStr,cdgoInc, cdgoObsr, retraso, idiomaAux) {
		var idioma ="";
		if(idiomaAux=="es_ES") idioma="s";
		if(idiomaAux=="ca_ES") idioma="c";
		if(idiomaAux=="eu_ES") idioma="e";
		if(idiomaAux=="ga_ES") idioma="g";
		if(idiomaAux=="va_ES") idioma="v";		
		if(idiomaAux=="en_UK") idioma="i";	
		if(idiomaAux=="fr_FR") idioma="f";
		
		//@INDRA.SCCID7N.SDC@06/08/2012@INICIO
		//INICIO: Controlar el valor del idioma en la llamada a HOL.
		if(idioma=="")idioma = "s";
		//FIN: Controlar el valor del idioma en la llamada a HOL.
		//@INDRA.SCCID7N.SDC@06/08/2012@FIN	
		
		var dFchaViaje = fechaJS2Date(fchaViajeStr, "-");
		var vMonth = 1 + dFchaViaje.getMonth();
		vMonth = (vMonth.toString().length < 2) ? "0" + vMonth : vMonth;
		var vDD = (dFchaViaje.getDate().toString().length < 2) ? "0" + dFchaViaje.getDate() : dFchaViaje.getDate();
		fchaViajeStr = dFchaViaje.getFullYear() + "-" + vMonth + "-" + vDD;
		var diaFormateado = txt_dia[dFchaViaje.getDay()];
		var mesFormateado = txt_mes[dFchaViaje.getMonth()];
		var url = urlIncTren 	+ "?F=" 	+ fchaViajeStr 							
								+ "&T=" 	+ cdgoTren
								+ "&TT=" 	+ descTipoTren 
								+ "&D="		+ diaFormateado
								+ "&M="		+ mesFormateado
								+ "&I="		+ cdgoInc
								+ "&O="		+ cdgoObsr	
								+ "&R="		+ retraso							
								+ "&ID=" 	+ idioma
								+ "&DD=0";								
		var myLeft = (screen.width-613)/2;
		var myTop = (screen.height-360)/2;			 
		window.open(url,"",'left=' + myLeft + ',top='+myTop+',menubar=no,resizable=no,width=760,height=300,status=no,location=no,toolbar=no,scrollbars=no,titlebar=no');
								
	}
	
	/**
	 * Función que extrae una cadena hasta el separador indicado. 
	 *
	 */
	function strpos(str, ch, empezarDesde) {
		if(!empezarDesde)
			empezarDesde = 0;
	
		for (var i = empezarDesde; i < str.length; i++)
			if (str.substring(i, i+1) == ch) 
				return i;
		return -1;
	}
			
	/**
	 * Función que convierte una cadena en formato dd/MM/YY en un objeto Date 
	 *
	 * @param (String)  strFrechaDDMMYY cadena que contiene la fecha (CON FORMATO dd/mm/yyyy) que será convertida.
	 * @return (Date) Objeto Date con la fecha recibida.
	 *
	 */
	function fechaJS2Date(strFechaDDMMYY, separador) {
		var primeraBarra = strpos(strFechaDDMMYY,separador);
		var segundaBarra = strpos(strFechaDDMMYY,separador,primeraBarra+1);
		var dia = strFechaDDMMYY.substr(0,primeraBarra);
		var mes = strFechaDDMMYY.substr(primeraBarra+1,segundaBarra-(primeraBarra+1));
		var ano = strFechaDDMMYY.substr(segundaBarra+1,4);
		return new Date(ano,mes-1,dia);
	}
	//	@REQ200@SCCID2N.SDC@10/05/2010@FIN
	
	//@REQ0396@SCEXUCT.SDC@08/10/2010@INICIO
	/**
	*function mostrarMesas() en mostrar la casilla de verificación "mesa"
	*/
	function mostrarMesas(mostrar, idDivPrecioMesa, ocupacion, tpoViaje) {
		// REQ0660@ACC.SCCID2N.SDC@12/04/2011@INICIO
		var idCheckMesa = 'checkMesa'+ tpoViaje + '0';
		var objetoCheckMesa = document.getElementById(idCheckMesa);
		var divPrecioMesa = document.getElementById(idDivPrecioMesa);
		var divPrecioMesaOld;
		var idDivPrecioMesaOld;
		
		if (divPrecioMesa != null
			&& mostrar
			&& ocupacion == 'ME') {
			divPrecioMesa.style.visibility = "visible";
			divPrecioMesa.style.display = "";
			divPrecioMesa.style.width = "auto";
		}	
			
		if (tpoViaje == 'Ida') {
			idDivPrecioMesaOld = idDivPrecioMesaIdaOld;
		} else if (tpoViaje == 'Vuelta') {
			idDivPrecioMesaOld = idDivPrecioMesaVueltaOld;
		}
		
		divPrecioMesaOld = document.getElementById(idDivPrecioMesaOld);
		if (divPrecioMesaOld != null 
			&& (idDivPrecioMesa != idDivPrecioMesaOld
				|| !mostrar
				|| ocupacion != 'ME')) {
			divPrecioMesaOld.style.visibility = "hidden";
			divPrecioMesaOld.style.display = "none";
		}
		if (objetoCheckMesa != null
			&& mostrar
			&& ocupacion == 'ME') {
			objetoCheckMesa.checked = true;
		} else if (objetoCheckMesa != null) {
			objetoCheckMesa.checked = false;
		}
		if (tpoViaje == 'Ida') {
			idDivPrecioMesaIdaOld = idDivPrecioMesa;
		} else if (tpoViaje == 'Vuelta') {
			idDivPrecioMesaVueltaOld = idDivPrecioMesa;
		}		
		// REQ0660@ACC.SCCID2N.SDC@12/04/2011@FIN		
	}

	//@REQ0396@SCEXUCT.SDC@08/10/2010@FIN
	
	function doListaEspera(datos, tpoUsuario, fecha, numPlazas, origen, destino) {
		if (tpoUsuario == 'P'){
			if (!window.isSubmited) {

				var desOrigen = document.formulario.desOrigen.value;
				var desDestino = document.formulario.desDestino.value;
				var ninos = document.formulario.ninos.value;
				var adultos = document.formulario.adultos.value;
				
				document.location.href = "/vol/listaEspera.do?numPlazas="+numPlazas
											 + "&datos="+datos
											 + "&IdOrigen="+origen
											 + "&desOrigen="+desOrigen
											 + "&IdDestino="+destino
											 + "&desDestino="+desDestino
											 + "&ninos="+ninos
											 + "&adultos="+adultos
											 + "&fechaViaje="+fecha;
											 
				window.isSubmited = true;

			} else {
				mostrarEnProceso(mBalert11);
			}
		} else {
			mostrarError(debeLoguearse);
		}
	}
	
	function muestraTarifasRm(urlTarifasRm, idiomaAux) {
		var idioma ="";
		if(idiomaAux=="es_ES") idioma="s";
		if(idiomaAux=="ca_ES") idioma="c";
		if(idiomaAux=="eu_ES") idioma="e";
		if(idiomaAux=="ga_ES") idioma="g";
		if(idiomaAux=="va_ES") idioma="v";		
		if(idiomaAux=="en_UK") idioma="i";	
		if(idiomaAux=="fr_FR") idioma="f";
		
		//@INDRA.SCCID7N.SDC@06/08/2012@INICIO
		//INICIO: Controlar el valor del idioma en la llamada a HOL.
		if(idioma=="")idioma = "s";
		//FIN: Controlar el valor del idioma en la llamada a HOL.
		//@INDRA.SCCID7N.SDC@06/08/2012@FIN	

		var url = urlTarifasRm 	+ "&ID=" 	+ idioma;

		var myLeft = (screen.width-613)/2;
		var myTop = (screen.height-360)/2;			 
		window.open(url,"",'left=' + myLeft + ',top='+myTop+',menubar=no,resizable=no,width=760,height=300,status=no,location=no,toolbar=no,scrollbars=no,titlebar=no');
		
	}
	
	function mostrarClases(filatren, mostrarClases) {
		if (mostrarClases) {
			document.getElementById(filatren + "Comprimido").style.display 		= "none";
			document.getElementById(filatren + "Comprimido").style.visibility 	= "hidden";
			document.getElementById(filatren + "Desplegado").style.display 		= "block";
			document.getElementById(filatren + "Desplegado").style.visibility 	= "visible";		
		} else {
			document.getElementById(filatren + "Comprimido").style.display 		= "block";
			document.getElementById(filatren + "Comprimido").style.visibility 	= "visible";
			document.getElementById(filatren + "Desplegado").style.display 		= "none";		
			document.getElementById(filatren + "Desplegado").style.visibility 	= "hidden";
		}
	}
	
	function mostrarClases2(filatren, mostrarClases, tren) {

		if (mostrarClases) {

			document.getElementById("flechaAbajo" + tren).style.display 		= "none";
			document.getElementById("flechaAbajo" + tren).style.visibility 		= "hidden";			
			document.getElementById("flechaArriba" + tren).style.display 		= "block";			
			document.getElementById("flechaArriba" + tren).style.visibility 		= "visible";				
			document.getElementById(filatren + "Desplegado").style.display 		= "block";
			document.getElementById(filatren + "Desplegado").style.visibility 	= "visible";					
		} else {
			document.getElementById("flechaAbajo" + tren).style.display 		= "block";
			document.getElementById("flechaAbajo" + tren).style.visibility 		= "visible";			
			document.getElementById("flechaArriba" + tren).style.display 		= "none";			
			document.getElementById("flechaArriba" + tren).style.visibility 	= "hidden";	
			document.getElementById(filatren + "Desplegado").style.display 		= "none";		
			document.getElementById(filatren + "Desplegado").style.visibility 	= "hidden";
		}
	}	

	// @65063@IND.SCCID9L@11/02/2013@INICIO
	function muestraPdfLt(urlListadoPdf, origen, destino, fechaViaje, idiomaAux, numPlazas) {	
		var idioma ="";
		if(idiomaAux=="es_ES") idioma="s";
		if(idiomaAux=="ca_ES") idioma="c";
		if(idiomaAux=="eu_ES") idioma="e";
		if(idiomaAux=="ga_ES") idioma="g";
		if(idiomaAux=="va_ES") idioma="v";		
		if(idiomaAux=="en_UK") idioma="i";	
		if(idiomaAux=="fr_FR") idioma="f";		//no hay alemán ni portugués
		
		if(idioma=="")idioma = "s";
		
		var url= urlListadoPdf+"?O="+origen+"&D="+destino+"&F="+fechaViaje+"&ID="+idioma+"&N="+numPlazas;
		window.open(url, 'Trenes', 'width=600,height=500,scrollbars=1,resizable=1');
	}
	// @65063@IND.SCCID9L@11/02/2013@FIN
	
	// @INC000000599414@INDRA.SCEXUF2.SDC@14/03/2013@INICIO
	function muestraTransbordos(origen, destino, fechaViaje, idiomaAux) {
		var idioma ="";
		if(idiomaAux=="es_ES") idioma="s";
		if(idiomaAux=="ca_ES") idioma="c";
		if(idiomaAux=="eu_ES") idioma="e";
		if(idiomaAux=="gl_ES") idioma="g";
		if(idiomaAux=="va_ES") idioma="v";		
		if(idiomaAux=="en_UK") idioma="i";	
		if(idiomaAux=="fr_FR") idioma="f";	
		
		if(idioma=="")idioma = "s";
		
		var primeraBarra = strpos(fechaViaje,"-");
		var segundaBarra = strpos(fechaViaje,"-",primeraBarra+1);
		var dia = fechaViaje.substr(0,primeraBarra);
		var mes = fechaViaje.substr(primeraBarra+1,segundaBarra-(primeraBarra+1));
		var anio = fechaViaje.substr(segundaBarra+1,4);
		var fecha = new Date(anio,mes-1,dia);
		var diaSem = fecha.getDay();
		var app = "VOL"

		var parametros = "?"
			+"O="+origen
			+"&D="+destino
		    +"&AF="+anio
		    +"&MF="+mes
		    +"&DF="+dia
		    +"&SF="+diaSem
		    +"&ID="+idioma
		    +"&AP="+app;
		
		var url= urlTransbordos + parametros;

		var nomVent = "transbordos"
		window.open(url, nomVent, 'width=720,height=650,scrollbars=1,resizable=1');
	}
	// @INC000000599414@INDRA.SCEXUF2.SDC@14/03/2013@FIN