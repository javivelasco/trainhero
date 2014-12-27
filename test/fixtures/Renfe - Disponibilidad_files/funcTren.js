/* ***************************************************************************
* funcTren
* 
* Contiene las funciones necesarias para la validación de menores de 4 años 
* ****************************************************************************
* Fecha			Responsable       			Descripción
* --------     	------------      		  	-----------------
* 22/01/2014	ACC.SCEXE12.SDC				RF50105 - Niño Gratis Fase II
* ****************************************************************************
*/

var resetNinoIda = false;
var resetNinoVuelta = false;
var errorTipoPetNSIda = false;
var errorTipoPetNSVuelta = false;
var tipoFuncNino = 'NM4';
var tipoFuncNS   = 'NS';
var tipoFuncPeticion = tipoFuncNino;
var msgErrorFuncTren = '';

/**
 * Función que valida si se puede seleccionar el tren elegido
 * 
 * @param datosTren
 * @param tipoFunc
 * @param activoTipoViajero
 * @param datosTrenExtra
 */
function validaFuncTren(datosTren, activoTipoViajero, literalRecorrido, datosTrenExtra){
	

	if (activoTipoViajero != undefined && activoTipoViajero) {
		var valores = separar(datosTren.value, '|');
		var valoresExtra = separar(datosTrenExtra, '|');
		if (((document.getElementById("ninosMenores" + literalRecorrido) != null 
			&& document.getElementById("ninosMenores" + literalRecorrido).value != 0))
			|| ((document.getElementById("numNinos" + literalRecorrido) != null 
				&& document.getElementById("numNinos" + literalRecorrido).value != 0))
			|| (tipoFuncPeticion == tipoFuncNS)) {
			if (literalRecorrido == "Ida") {
				resetNinoIda = false;
				errorTipoPetNSIda = false;
			} else {
				resetNinoVuelta = false;
				errorTipoPetNSVuelta = false;
			}
			
			var objetoEntrada        		= new Object();
			var valores=separar(datosTren.value, '|');
			var codOrigen   = document.getElementById("IdOrigen");
			var actFigueras = document.getElementById("activoFigueras");
			if (actFigueras != null && actFigueras != undefined && actFigueras.value == "SI" &&
				codOrigen != null && codOrigen != undefined && codOrigen.value == "79333") {
				objetoEntrada.origen		= codOrigen.value;
			} else {
				objetoEntrada.origen		= valoresExtra[2];
			}
			var codDestino = document.getElementById("IdDestino");
			if (actFigueras != null && actFigueras != undefined && actFigueras.value == "SI" &&
				codDestino != null && codDestino != undefined && codDestino.value == "79333") {
				objetoEntrada.destino		= codDestino.value;
			} else {
				objetoEntrada.destino		= valoresExtra[3];
			}
			objetoEntrada.operador   		= valoresExtra[0];
			objetoEntrada.producto   		= valoresExtra[1];
			objetoEntrada.tren       		= valores[1];
			objetoEntrada.clase      		= valores[0];
			objetoEntrada.tarifasSel 		= new Array();
			objetoEntrada.tarifasSel[0] 	= valores[15];
			objetoEntrada.tipoFuncionalidad = tipoFuncPeticion;
			funcTrenSvcAjax.validarServicioTrenAjax(objetoEntrada, { 	
											callback: function(data) {
												if (!data) {
													if (tipoFunc == tipoFuncNino) {	
														// Reseteo las plazas de niño
														if (literalRecorrido == "Ida") {
															resetNinoIda = true;
														} else {
															resetNinoVuelta = true;
														}
													}
													if (tipoFuncPeticion == tipoFuncNS) {
														// Reseteo las plazas de niño
														if (literalRecorrido == "Ida") {
															errorTipoPetNSIda = true;
														} else {
															errorTipoPetNSVuelta = true;
														}
													}												
													
												} 
											}, errorHandler: function(errorString, exception) {
												msgErrorFuncTren = tildes_unicode(errorString);
												mostrarError(msgErrorFuncTren);
												if (tipoFuncPeticion == tipoFuncNino) {
													// Reseteo las plazas de niño
													if (literalRecorrido == "Ida") {
														resetNinoIda = true;
													} else {
														resetNinoVuelta = true;
													}
												}			
												if (tipoFuncPeticion == tipoFuncNS) {
													// Reseteo las plazas de niño
													if (literalRecorrido == "Ida") {
														errorTipoPetNSIda = true;
													} else {
														errorTipoPetNSVuelta = true;
													}
												}												
											}
										});
		}
	}
}

/*
 * Reseteo las plazas de niño < de 4 años
 */
function reseteoNino(literalRecorrido) {	
	if (document.getElementById("ninosMenores") != null) {
		document.getElementById("ninosMenores").value = "0";
	}
	if (document.getElementById("ninosMenoresIda") != null) {
		document.getElementById("ninosMenoresIda").value = "0";	
	}
	if (document.getElementById("ninosMenoresVuelta") != null) {
		document.getElementById("ninosMenoresVuelta").value = "0";
	}
	if (document.getElementById("numNinos") != null) {
		document.getElementById("numNinos").value = "0";
	}
	if (document.getElementById("numNinosIda") != null) {
		document.getElementById("numNinosIda").value = "0";	
	}
	if (document.getElementById("numNinosVuelta") != null) {
		document.getElementById("numNinosVuelta").value = "0";
	}
}

function tildes_unicode(str) {
	str = str.replace('á', '\u00e1');
	str = str.replace('é', '\u00e9');
	str = str.replace('í', '\u00ed');
	str = str.replace('ó', '\u00f3');
	str = str.replace('ú', '\u00fa');

	str = str.replace('Á', '\u00c1');
	str = str.replace('É', '\u00c9');
	str = str.replace('Í', '\u00cd');
	str = str.replace('Ó', '\u00d3');
	str = str.replace('Ú', '\u00da');

	str = str.replace('ñ', '\u00f1');
	str = str.replace('Ñ', '\u00d1');
	return str;
}

/* R5120025@ACC.SCEXU8Q.SDC@07/08/2014@INICIO */
function validaFuncTrenVxy(datosTren, tipo, indiceTray, indiceTramo, activo) {

	if (activo
			&& document.getElementById("ninosMenores") != null 
			&& document.getElementById("ninosMenores").value != 0) {
		var valores=separar(datosTren.value, '|');
		var objetoEntrada        		= new Object();

		// Le restamos 1 para que funcione bien en la parte Java
		objetoEntrada.indTray      		= indiceTray - 1;
		objetoEntrada.indTramo      	= indiceTramo - 1;
		objetoEntrada.clase      		= valores[0];
		objetoEntrada.tipoFuncionalidad = "NM4";
		if (tipo == 'ida') {
			objetoEntrada.ida = true;
		} else {
			objetoEntrada.ida = false;
		}
		
		funcTrenSvcAjax.validarServicioTrenVxyAjax(objetoEntrada, {
				callback: function(data) {

				}, errorHandler: function(errorString, exception) {
					msgErrorFuncTren = tildes_unicode(errorString);
					alert(msgErrorFuncTren);
				}
		});
	}
}
/* R5120025@ACC.SCEXU8Q.SDC@07/08/2014@FIN */
