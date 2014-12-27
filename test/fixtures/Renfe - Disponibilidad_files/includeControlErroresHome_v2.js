// error.js

var errorFlujoNegocio		= "";
//@RF50105@ACC.SCEXE12.SDC@04/02/2014@INICIO
var submitirTrasValidacion = false; //Permite mostrar mensaje de aviso y continuar con el flujo de pantalla
//@RF50105@ACC.SCEXE12.SDC@04/02/2014@FIN

/**
 * mostrarError
 */
function mostrarError(errorMostrar) {
	var altura =  document.body.scrollHeight + 'px';
	document.getElementById('preerror').style.height = altura;
	document.getElementById('texto_error').innerHTML = "<br />" + errorMostrar + "<br /><br />";
	document.getElementById('preerror').style.display = "block";
	document.getElementById('error').style.display = "block";
	document.getElementById('errorHomeModal').style.display = "block";
	document.getElementById('preerror').focus();
	window.scrollTo(0,0);
}
	
/**
 * ocultarError
 */
function ocultarError() {
	document.getElementById('preerror').style.display = "none";
	document.getElementById('error').style.display = "none";
	document.getElementById('texto_error').innerHTML = "";
	window.isSubmited = false;
	
	if(document.getElementById('hacerSubmit')!=null && document.getElementById('mostrarYContinuar')!=null ) {
		var bHacerSubmit;
		var sHacerSubmit = document.getElementById('hacerSubmit').value;
		var mostrarYContinuar = document.getElementById('mostrarYContinuar').value;
		
		if (sHacerSubmit == "true") {
			bHacerSubmit = true;
		} else {
			bHacerSubmit = false;
		}
		
		if (mostrarYContinuar == "true") {
			document.getElementById('mostrarYContinuar').value = "false";
			continuarRecargaDatos(bHacerSubmit);
		}
		// FIN 53221 VOLRF001
		// @INC000000353149@INDRA.SCCID7N.SDC@17/05/2012@FIN
		//@RF50105@ACC.SCEXE12.SDC@04/02/2014@INICIO
		if (submitirTrasValidacion) {
			document.search.submit();
			var mostrarLoading = document.getElementById("MOSTRAR_CARGANDO_DISPO")
			if (mostrarLoading != null){
				if("SI"==mostrarLoading.value || "S"==mostrarLoading.value){
					cargando();
				}
			}			
	
		}
	
	}
	
	submitirTrasValidacion = false;
	//@RF50105@ACC.SCEXE12.SDC@04/02/2014@FIN

}

function capaBloqueo() {
	var altura =  document.body.scrollHeight + 'px';
	if (document.getElementById('capaBloqueo_spinner.gif') != null) {	
		document.getElementById('capaBloqueo_spinner.gif').src='/vol/img/rcd/spinner.gif';
		document.getElementById('capaBloqueo_spinner.gif').alt='spinner.gif';
	}
	document.getElementById('capaBloqueo').style.height = altura;
	document.getElementById('capaBloqueo').style.display = "block";
	document.getElementById('capaBloqueo').focus();

}

/**
 * ocultarCapaBloqueo()
 */
function ocultarCapaBloqueo() {

	if (document.getElementById('capaBloqueo_spinner.gif') != null) {
		document.getElementById('capaBloqueo_spinner.gif').src="/vol/img/blank.gif";
		document.getElementById('capaBloqueo_spinner.gif').alt='';
	}
	if (document.getElementById('capaBloqueo') != null) {

		document.getElementById('capaBloqueo').style.display = "none";
		window.isSubmited = false;
		
	}
		
}

// @INC000000353149@INDRA.SCCID7N.SDC@17/05/2012@INICIO
// INICIO 53221 VOLRF001: Finalizar la compra cuando se utiliza Tarjeta Dorada con Acompañante
function mostrarError2(errorMostrar, hacerSubmit) {
	document.getElementById('mostrarYContinuar').value = "true";
	document.getElementById('hacerSubmit').value = hacerSubmit;
	mostrarError(errorMostrar);
}
// FIN 53221 VOLRF001
// @INC000000353149@INDRA.SCCID7N.SDC@17/05/2012@FIN

function preLoadImage() {

		newImage1 = new Image(); 
		newImage1.src = "img/rcd/spinner.gif";
}
