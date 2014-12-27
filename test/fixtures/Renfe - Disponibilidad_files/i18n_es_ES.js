// ***************************************************************************************
// ResourceBundle


// ***************************************************************************************
/* ****************************************************************************
* BusquedaAbonoSvcImpl
* ****************************************************************************
* Fecha        Responsable       			Descripción
* --------     ------------      		  -----------------
* 19/02/2009 	SCCID2O.SDC				REQ077: Incorporacion de seguridad en la impresion del Abono Tarjeta Plus
* 05/10/2010	INDRA.SCEXU0V.SDC		INC000000143654(RNF10-00005800): Permite seleccionar a la vez opciones incompatibles
* 22/11/2010	ACC.SCEXUBI.SDC   		REQ0610: Código de barras 2D para los móviles
* 11/01/2011	ACC.SCEXUBI.SDC	  		REQ0620: Mejora Paper to Mobile Codebar 2D
* 29/08/2011	INDRA.SCEXU0U.SDC 		INC000000255116 39468 VOLRF001: Se añade mensaje de error para 
*											Documento Acreditativo de la Tarjeta de Puntos
* 09/02/2012	ACC.SCEXUCS.SDC   		REQ0700: Emisión Factura Billete VOLA
* 17/02/2012	ACC.SCCID1D.SDC			REQ0682: Spain Rail Pass
* 05/03/2013	ACC.SCEXU8O.SDC			RF50010: Informacion on-line de Puntualidad de Trenes
* 14/03/2013	INDRA.SCEXUF2.SDC		INC000000599414(68714): Se crea la variable 'urlTransbordos'
* 20/05/2013	INDRA.SCEXUF3.SDC		INC000000600168 (68691-68694 RQM007): Error javascript en alta y modificación
* 28/08/2013    ACC.SCEXU8S.SDC			RF50046: Equipaje especial
* 29/10/2013	ACC.SCEXU8S.SDC 		RF50090: CRM Grupos
* 06/11/2013	INDRA.SCCID7N.SDC		INC000000697601(78718): Analisis Trazas VOL
* 12/12/2013	INDRA.SCEXUF3.SDC		INC000000721852 (PPM81035): EVOLUTIVO-RQM0159-Cálculo dinámico Precios InterRail
* 16/01/2014	ACC.SCEXE12.SDC			RF50105 - Niño Gratis Fase II
* 18/03/2014	ACC.SCEXU8S.SDC			RF50105 - Mejoras: Cambio al validar tipo de viajeros
* 08/04/2014	INDRA.SCEXUF3.SDC		INC000000754871 (84072): RQM0180-Fuera venta de billetes internacionales RMF
* 03/06/2014	ACC.SCEXE55.SDC			RF50153: Tarjeta MultiAve Fase I
* 01/09/2014	ACC.SCEXE42.SDC			R5120037: Coche silencioso: Fase III
* ****************************************************************************
*/
var errorGeneral = 'Error al realizar operación.';

//epoch_classes.js
var txto1 = "La fecha seleccionada no puede ser menor al día actual.";
var txto2 = "La fecha seleccionada no es valida, no están disponibles los trenes en el sistema. Solo se venden trenes a 62 días.";
var txto12 = "La fecha seleccionada no es valida. Debe de estar comprendida entre los 90 días siguiente de la ida.";
var txto3 = 'Ir al mes siguiente';
var txto4 = 'Ir al mes anterior';  
var txto5 = 'Cerrar';
var txto6 = 'Cerrar el calendario'; 
var txto7 = 'Para fechas posteriores todavía no están disponibles los trenes en el sistema';
var txto11 = 'No es posible la venta para fechas anteriores al día de hoy o a la fecha de ida.';

//scvbical.js
var txto8 = 'Falta parámetro de nombre de formulario';
var txto9 = 'Falta parámetro de nombre de campo';
var txto10 = 'Falta parámetro de formato de fecha'; 

//menuBusqueda.js
var mBalert0 = 'Seleccione una fecha';
var mBalert1 = 'Seleccione una estación de origen';
var mBalert2 = 'Seleccione una estación de destino';
var mBalert3 = 'Seleccione una fecha de ida';
var mBalert4 = 'Seleccione un viajero';
var mBalert5 = 'Seleccione un número de viajeros menor, el máximo número de viajeros permitido es 9';
var mBalert6 = 'Seleccione una fecha de regreso';
var mBalert7 = 'Las fechas son incorrectas';
var mBalert8 = 'Introduzca el usuario';
var mBalert9 = 'Introduzca el password';
var mBalert10 = 'Fecha de salida incorrecta';
var mBalert11 = 'Operación en proceso';
var mBalert12 = 'EL BILLETE DE  IDA ESTA CONSUMIDO, SOLO ES POSIBLE CAMBIAR EL BILLETE DE VUELTA';
var mBalert13 = 'La fecha del viaje de ida es mayor que la fecha del viaje de vuelta';
var mbalert14 = 'Fecha de inicio de validez del pase no válida. El plazo de venta anticipada es de '
var mbalert15 = ' días si elige el envío Urgente o de ';
var mbalert16 = ' días si elige el envío Ordinario.';
var mbalert17 = 'Hora de ida no válida (Formato: HH:mm)';
var mbalert18 = 'Hora de vuelta no válida (Formato: HH:mm)';
var mbalert19 = 'Introduzca la hora de ida';
var mbalert20 = 'Introduzca la hora de vuelta';

//@RF50012@ACC.SCEXU6Z.SDC@05/04/2013@INICIO
var mBalert21 = 'Las estaciones de origen y destino deben estar ubicadas en España';
//@RF50012@ACC.SCEXU6Z.SDC@05/04/2013@FIN

//@RF50068@ACC.SCEXU6Z.SDC@04/09/2013@INICIO
var mBalert22 = 'Debe registrarse para acceder a Abonos';
//@RF50068@ACC.SCEXU6Z.SDC@04/09/2013@FIN

//@INC000000697601@INDRA.SCCID7N.SDC@06/11/2013@INICIO
//INICIO 78718: Analisis trazas de VOL
var mBalert24 = 'Seleccione una estación de origen válida';
var mBalert25 = 'Seleccione una estación de destino válida';
//@INC000000697601@INDRA.SCCID7N.SDC@06/11/2013@FIN

//@RF50090@ACC.SCEXU8S.SDC@17/10/2013@INICIO
var mBalert45 = 'Para realizar esta operaci&oacuten tiene que dirigirse a una Agencia o Taquilla de Renfe. Tambi&eacuten puede realizar la petici&oacuten a trav&eacutes de grupos@renfe.es';

var mBalert46 = 'Para acceder a este enlace, el usuario debe registrarse';

//@RF50090@ACC.SCEXU8S.SDC@17/10/2013@FIN

//@RF50105@ACC.SCEXU6Z.SDC@29/01/2014@INICIO
//@RF50105-MEJORAS@ACC.SCEXU8S.SDC@18/03/2014@INICIO
var mBalert48 = 'El número de niños menores de 4 años no puede ser superior al resto de viajeros. Si desea viajar con más niños menores de 4 años, debe seleccionar la opción niño y dispondrá de un descuento del 40%.';
//@RF50105-MEJORAS@ACC.SCEXU8S.SDC@18/03/2014@FIN
var mBalert49 = 'El número total de viajeros de la operación de cambio supera los 9 viajeros, para continuar revise el número de viajeros adicionales.';
//@RF50105@ACC.SCEXU6Z.SDC@29/01/2014@FIN
//@RF50153@ACC.SCEXE55.SDC@03/06/2014@INICIO
var mBalert50 = 'Tarjeta MultiAVE sin saldo';
var mBalert51 = 'Tarjeta MultiAVE caducada';
var mBalert52 = 'Introduzca una tarjeta';
var mBalert53 = 'El origen o destino no cumplen las condiciones de la Tarjeta MultiAVE';
var mBalert54 = 'Debe hacer clic en el botón “Calcular Descuento en Billetes” antes de continuar.';
//@ACC.SCEXE1E.SDC@11/07/2014@INICIO
var mBalert55 = 'Por favor, corrija los campos erróneos';
//@ACC.SCEXE1E.SDC@11/07/2014@FIN
var mBalert56 = 'Inserte un apellido válido';
//@RF50153@ACC.SCEXE55.SDC@03/06/2014@FIN
// RNF10-00005800 RQ VOLRF001, VOLRF002,VOLRF003: Control marca viaja silla ruedas incompatible con selección asiento en pago, pago cierre, pago billete
//hjpmr.js
var vPlazaH1 = 'No es posible seleccionar un asiento cuando ha solicitado viajar en silla de ruedas';
// FIN RNF10-00005800 RQ VOLRF001, VOLRF002,VOLRF003

//Validación de tarjetas de crédito
var tarjetaCalert1 = 'Debe indicar un número de tarjeta.';
var tarjetaCalert2 = 'No puede escribir letras en el número de tarjeta.';
var tarjetaCalert3 = 'Falta el Mes de Caducidad.';
var tarjetaCalert4 = 'Falta el año de Caducidad.';
var tarjetaCalert5 = 'La fecha caducidad es menor que la actual.';
var tarjetaCalert6 = 'El número de la tarjeta de crédito no es válido.';
var tarjetaCalert7 = 'Ya se está Procesando su Petición';

// usuarioForm.jsp
var usuarioForm1 = 'Las contraseñas no coinciden';
var usuarioForm2 = 'Debe aceptar las condiciones legales';
var usuarioForm3 = 'El correo no es correcto, sólo se permiten letras (a-z), números (0-9) puntos (.) y guión bajo (_)';
var usuarioForm4 = 'Fecha no válida (Formato: dd/mm/aaaa)';
var usuarioForm5 = 'El nombre de usuario es demasiado corto';
var usuarioForm6 = 'El formato del nombre de usuario no es correcto, sólo se permiten letras (a-zA-Z) y números';
var usuarioForm7 = 'El nombre de usuario no está disponible';
var usuarioForm8 = 'Por favor, introduzca un nombre de usuario';
var usuarioForm9 = 'Por favor, introduzca un correo electrónico';
var usuarioForm10 = 'El teléfono no es válido';
var usuarioForm11 = 'El código postal no es válido';
var usuarioForm12 = 'La contraseña no es correcta, sólo se permiten letras (a-z), números (0-9) puntos (.), guión (-) y guión bajo (_)';
var usuarioForm13 = 'Debe rellenar los datos de ferroviario correctamente';
var usuarioForm14 = 'Este campo es obligatorio';
var usuarioForm15 = 'El nombre de usuario no puede ser igual a la contraseña';
// @INC000000600168@INDRA.SCEXUF3.SDC@20/05/2013@INICIO 
// INICIO 68691-68694: Error javascript en alta y modificación
var usuarioForm16 = 'Formato de documento no válido';
// @INC000000600168@INDRA.SCEXUF3.SDC@20/05/2013@FIN

var usuarioForm17 = 'Ya existe un usuario registrado con el mismo correo electrónico';

//@RF50067@ACC.SCEXU6Z.SDC@05/07/2013@INICIO
var usuarioForm18 = 'El formato es incorrecto';
var usuarioForm19 = 'Revise la fecha de nacimiento. No puede realizar una compra si es menor de 14 años';
var usuarioForm20 = 'Por favor, rellene los campos de datos generales.';
var usuarioForm21 = 'Por favor, rellene los campos de datos personales.';
var usuarioForm22 = 'Por favor, rellene los campos de contacto.';
var usuarioForm23 = 'Por favor, rellene los campos de registro.';
var usuarioForm24 = 'Por favor, rellene los campos de datos fiscales.';
var usuarioForm25 = 'Por favor, seleccione primero el tipo de persona fisica o juridica.';

var usuarioForm26 = 'Por favor, indique si desea completar los datos personales y de contacto,con los asociados a su tarjeta TEMPO RENFE.';
var usuarioForm27 = 'Los datos personales y de contacto han sido completados con exito.';
var usuarioForm28 = 'La operación ha sido cancelada.<br/>No se permite el registro con el número de documento introducido<br/>mientras no se identifique como cliente TEMPO Renfe.';


//listaTarjetas.jsp (Consulta)
var listaTarjetas1 = 'Seleccione una tarjeta';
var listaTarjetas2 = '¿Seguro que desea eliminar esta tarjeta?';
//tarjetasForm.jsp (Formulario)
var tarjetasForm1 = 'La fecha es incorrecta';
var tarjetasForm2 = 'No se permiten caracteres extraños en el nombre de usuario';
var tarjetasForm3 = 'Formato de tarjeta inválido';
var tarjetasForm4 = 'La fecha es incorrecta';
var tarjetasForm5 = 'Ingrese el número de tarjeta';
// @INC000000255116@INDRA.SCEXU0U.SDC@29/08/2011@INICIO
// 39468 RQ VOLRF001: Incluir modificación de tarjetas de puntos en "Mis Tarjetas"
var tarjetasForm6 = 'El formato del documento acreditativo del usuario está vacío o no es correcto, sólo se permiten letras (a-zA-Z) y números';
// FIN 39468 RQ VOLRF001
// @INC000000255116@INDRA.SCEXU0U.SDC@29/08/2011@FIN

// @INC000000255116@INDRA.SCEXU0U.SDC@02/02/2012@INICIO
// 39468 RQ VOLRF001 NO CONFORMIDAD: No permite el alta de Tarjeta Visa Renfe
var tarjetasForm7 = 'El formato de la Tarjeta de Puntos no es válido, únicamente se permiten números de 8 dígitos en caso de Tarjetas TEMPO ó números de 16 dígitos en caso de Tarjetas Renfe Visa';
var tarjetasForm8 = 'El número de la Tarjeta Renfe Visa no es válido';
var tarjetasForm9 = 'El número de la Tarjeta de Crédito no es válido';
var tarjetasForm10 = 'El formato de la Tarjeta de Crédito no es válido, únicamente se permiten números de 13 o más dígitos';
// FIN 39468 RQ VOLRF001 NO CORFORMIDAD
// @INC000000255116@INDRA.SCEXU0U.SDC@02/02/2012@FIN
// @RQC0012@ACC.SCEXUET.SDC@30/11/2012@INICIO
var tarjetasForm11 = 'Ingrese el código de transacción';
var tarjetasForm12 = 'Ingrese el código de transacción de seguridad';
var tarjetasForm13 = 'El código de transacción y el codigo de transacción de seguridad deben ser iguales';
// @RQC0012@ACC.SCEXUET.SDC@30/11/2012@FIN


//cambiaPassA.jsp 
var cambiaPassA1 = 'Introduzca contraseña';
var cambiaPassA2 = 'Introduzca nueva contraseña';
var cambiaPassA3 = 'Introduzca confirmación de nueva contraseña';
var cambiaPassA4 = 'Confirmación incorrecta';
var cambiaPassA5 = 'La contraseña actual y la nueva no pueden ser iguales';
var cambiaPassA6 = 'La contraseña no es correcta, introduzca al menos 6 caracteres \n sólo se permiten letras (a-z), números (0-9) puntos (.), guión (-) y guión bajo (_)';
var cambiaPassA7 = 'La contraseña nueva no puede ser igual a otras anteriores';

//mailPassA.jsp
var mailPassA1 = 'Introduzca respuesta';
 
//listaCamas.jsp
var plazasDeMas="Ha seleccionado plazas de más";
var plazasDeMenos="Ha seleccionado plazas de menos";
var demasiadosNinos="Ha seleccionado demasiados ni&ntilde;os";
var masNinosQueOriginal="Ha seleccionado más plazas para ni&ntilde;os que originalemte";
var noSelec="No selecciono ningun departamento.";	
var noNinos="El número de ni&ntilde;os no puede ser superior a la ocupación familiar.";
var noBicis="No se puede realizar una compra de bicicleta con una plaza niño compartiendo. Comprueba la selección";
var menNinos="Debe selecionar mismo numero de niños en la ida y en la vuelta";
var distintaModalidad="No se puede realizar una reserva de grupos con distintas modalidades de ocupación en la misma petición.";		

//include_datos_usuario.jsp
var pagoDatosUsu1 = "Debe aceptar las condiciones legales";
var pagoDatosUsu2 = "Debe rellenar los datos de la/s persona/s con movilidad reducida";

var pagoDocusTarifas = "Por favor, revise los documentos de las tarifas";
var pagoTarjetasFideliz = "Por favor, las tarjetas de fidelizacion deben ser distintas para cada plaza";

var pagoDatosUsuError = "Por favor, revise los campos en rojo";

//masDatosCambio.jsp
var mdCalert1 = 'El origen no puede estar vacío';
var mdCalert2 = 'El destino no puede estar vacío';
var mdCalert3 = 'La fecha de viaje no puede estar vacía';
var mdCalert4 = 'El e-mail no puede estar vacío';
var mdCalert5 = 'El e-mail introducido no es correcto';

var mdCalert8 = 'Debe introducir un localizador';

var mdCalert10 = 'El valor introducido no es un número';
var mdCalert11 = 'La tarjeta debe tener 16 digitos';
var mdCalert12 = 'El mes introducido es incorrecto';
var mdCalert13 = 'El año debe tener un valor numérico';
var mdCalert14 = 'Rellene el Titular de la Tarjeta';
var mdCalert15 = 'El Nº de Tarjeta VISA Renfe esta vacío';
var mdCalert16 = 'Rellene el documento VISA Renfe';
var mdCalert17 = 'El Nº de Tarjeta VISA Renfe es incorrecto';
var mdCalert18 = 'El Nº de Tarjeta AVE esta vacío';
var mdCalert19 = 'Rellene el documento Tarjeta AVE';
var mdCalert20 = 'El Nº de Tarjeta AVE es incorrecto';
// @INC000000187680@IND.SCCID9L@07/02/2011@INICIO
var mdCalert15_1 = 'El Nº de Tarjeta VISA Renfe TEMPO esta vacío';
var mdCalert16_1 = 'Rellene el documento VISA Renfe TEMPO';
var mdCalert17_1 = 'El Nº de Tarjeta VISA Renfe TEMPO es incorrecto';
var mdCalert18_1 = 'El Nº de Tarjeta TEMPO esta vacío';
var mdCalert19_1 = 'Rellene el documento Tarjeta TEMPO';
var mdCalert20_1 = 'El Nº de Tarjeta TEMPO es incorrecto';
// @INC000000187680@IND.SCCID9L@07/02/2011@FIN
var mdCalert24 = 'Debe rellenar los siguientes campos: \n';
var mdCalert25 = 'Debe recalcular los precios.';
var mdCalert26 = 'Debe aceptar las condiciones de transporte'; 

var mdCalert66 = 'Va a cambiar un billete con la ida gastada, recuerde: \n Solo se le permite modificar la fecha de la vuelta \n el resto de los datos deben ser invariantes, tren, clase, etc';


//inicioAnulacion.jsp
var iAalert1 = 'El localizador de compra debe tener 6 u 8 caracteres';
var iAalert2 = 'El número de billete debe tener 13 caracteres';
var iAalert3 = 'El número de billete debe tener 13 o 17 caracteres';

//masDatosAnulacion.jsp
var mdAalert1 = 'El origen no puede estar vacío';
var mdAalert2 = 'El destino no puede estar vacío';
var mdAalert3 = 'La fecha de viaje no puede estar vacía';
var mdAalert4 = 'Si realizo su compra mediante venta internet el e-mail es obligatorio.\nSi realizo su compra mediante venta telefónica el campo tarjeta es obligatorio.';
var mdAalert5 = 'El e-mail introducido no es correcto';

//listaBilletesAnulacion
var lbAalert1 = 'Se ha de seleccionar al menos un billete';
var lbAalert2 = 'Al seleccionar la vuelta de este viaje para anular, el billete ya no podrá ser cerrado. Para dejar la vuelta abierta, debe realizar una operación de cambio';

//listaTarjetasCompra
var listaTarjCompra = 'No se ha seleccionado una tarjeta';

//ferroviarios
var ferro1 = 'Carnet incorrecto';
var ferro2 = 'El NIF de ferroviario es incorrecto o no esta informado';
var ferro3 = 'Los datos de ferroviario no son válidos';
var ferro4 = 'El formato de la fecha de nacimiento de ferroviario debe ser DD/MM/AAAA';
var ferro5 = 'El Carnet de ferroviario es incorrecto o no esta informado';

//Colectivo

var colectivo1 = 'El formato de la fecha de nacimiento de periodista debe ser DD/MM/AAAA';
var colectivo2 = 'El número de registro de periodista es incorrecto o no esta informado';
var colectivo3 = 'Los datos de periodista no son válidos';

//consultaPuntos
var consultaPuntosAlert1 = 'Selecione el tipo de puntos';
var consultaPuntosAlert2 = 'Introduzca el número de tarjeta';
var consultaPuntosAlert3 = 'El número de tarjeta no es válido';

//referenciaMobipay.jsp
var referenciaMobipay1 = 'ERROR - SE HA SUPERADO EL TIEMPO MÁXIMO DE ESPERA PARA LA OPERACIÓN.<br>PROCESO DE COMPRA INTERRUMPIDO. DEBE COMENZAR DE NUEVO.';
var referenciaMobipay2 = 'ERROR - OPERACIÓN CANCELADA.<br>PROCESO DE COMPRA INTERRUMPIDO. DEBE COMENZAR DE NUEVO.';
var referenciaMobipay3 = 'ERROR - OPERACIÓN CANCELADA.<br>PROCESO DE COMPRA INTERRUMPIDO. DEBE COMENZAR DE NUEVO.';

// listaTrenes.jsp
var listaTrenes1 = 'Debe seleccionar un tren de ida';
var listaTrenes2 = 'Debe seleccionar un tren';
var listaTrenes3 = 'Debe seleccionar un tren de vuelta';
var listaTrenes4 = 'La hora de salida del tren de vuelta no puede ser anterior a la hora de llegada del tren de ida';
var listaTrenes5 = 'Operación en proceso';
var listaTrenes6 = 'La fecha de vuelta no puede ser anterior a la de ida';
var listaTrenes7 = 'La fecha de ida no puede ser anterior a hoy';
var listaTrenes8 = 'Los trenes deben seleccionarse con ';
var listaTrenes9 = ' día de antelación';
var listaTrenes10 = ' días de antelación';

//pago.jsp
var pago1 = 'Introduzca una tarjeta válida';
var pago2 = 'Tarjeta no válida';
var pago3 = 'Fecha de la tarjeta no válida';
var pago4 = 'Introduzca el titular de la tarjeta';
var pago5 = 'Debe rellenar los siguientes campos: \n';
var pago6 = ' - Correo Electrónico\n';
var pago7 = ' - Nombre\n';
var pago8 = ' - Primer apellido\n';
var pago9 = 'Debe recalcular los precios.';
var pago10 = 'Debe aceptar las condiciones de transporte';
var pago11 = 'Importe Total del Viaje de Ida';
var pago12 = 'Importe Total del Viaje de Vuelta';
var pago13 = 'No se permiten caracteres extraños en el titular de la tarjeta';
var pago14 = 'Debe introducir el código de control de su tarjeta (CVV2, CVC2, CID,...)';
var pago15 = 'Introduzca una tarjeta válida y un documento acreditativo válido';
var pago16 = 'Debe seleccionar una tarifa de Ida diferente';
var pago17 = 'Para introducir su CVV o CID2 con el teclado, introduzca las letras asociadas que aparecerán en el gráfico.\n Si desea utilizar el ratón, seleccione con el puntero las celdas que contienen los dígitos.';
var pago18 = 'Deberá ser portador de un documento acreditativo en vigor que justifique el derecho al descuento.';
var pago19 = 'El documento de familia numerosa no puede estar vacio';
var pago20 = 'Por favor revise el campo documento acreditativo';
var pago21 = 'Indique su número de tarjeta de fidelización para obtener los puntos por sus viajes,<br/>independientemente de que utilice la tarjeta Renfe Visa como forma pago.<br/>Si no conoce su número contacte con el 902 42 00 24.<br/>A partir del 1 de enero de 2015 dejará de ser aplicable la bonificación<br/>del 2% en puntos por todas las compras realizadas con la tarjeta Renfe Visa.';
var pago22 = 'Indique su número de tarjeta de fidelización para obtener los puntos por sus viajes.<br/>Si no dispone de ella y desea solicitarla contacte con el 902 42 00 24 o en www.renfe.com.<br/>A partir del 1 de enero de 2015 dejará de ser aplicable la bonificación<br/>del 2% en puntos por todas las compras realizadas con la tarjeta Renfe Visa,<br/>así como la bonificación del 10% por viajes realizados en trenes de Larga Distancia.';
var pantarjetaParticular1 = '45435786';
var pantarjetaParticular2 = '45435787';
var pantarjetaEmpresa = '45435788';

//cierre.jsp
var cierre1 = 'No ha seleccionado fecha de vuelta';
var cierre2 = 'La fecha de vuelta debe ser igual o mayor a la fecha de hoy y a ';
var cierre3 = 'La fecha de vuelta debe ser igual o mayor a ';
var cierre4 = 'Busque un billete para continuar';
var cierre5 = 'Busque un billete para continuar';
var cierre6 = 'Operación en proceso';
var cierre7 = 'Falta introducir un código de billete (13 números)';
var cierre8 = '¿Desea quitar el billete?';
var cierre9 = 'Falta introducir un localizador de compra (6 u 8 caracteres)';
var cierre10 = "La fecha seleccionada no es valida, no están disponibles los trenes en el sistema. Solo se venden trenes a 62 días.";
//@R2.PRDDB00002607 @SCCID11.SDC@04/07/2008@INICIO
var cierre11 = 'No se puede cerrar despues de 60 dias';
//@R2.PRDDB00002607 @SCCID11.SDC@04/07/2008@FIN
var cierre12 = "El número de plazas seleccionadas para una de las tarifas no es correcto.";
//trenesVueltaCierre.jsp
var trenesVueltaCierre1 = 'Debe seleccionar un tren de vuelta';

//listaCompras.jsp
var listaCompras = "No ha seleccionado un registro";

//viajesForm.jsp
var viajesForm1 = "Debe escribir un código de compra";
var viajesForm2 = "Debe selecccionar un origen";
var viajesForm3 = "Debe selecccionar un destino";
var viajesForm4 = "Debe selecccionar una fecha de viaje";
var viajesForm5 = "Por favor, introduzca un correo electrónico válido";

//weather.jsp
var txt_weather=['Tormentas fuertes', 'Tormentas fuertes / Viento',  'Tormentas / Viento', 'Chubascos', 'Algunos chubascos',
				 'Tormentas', 'Lluvia débil', 'Lluvia', 'Chubascos de nieve', 'Chubascos de nieve matinales', 'Chubascos de nieve por la tarde',
				 'Algunos chubascos de nieve', 'Nieve y viento', 'Neblina', 'Nieblas por la mañana / Sol por la tarde', 'Soleado / Viento',
				 'Nuboso', 'Nubosidad abundante', 'Parcialmente Nuboso', 'Nubes por la mañana / Sol por la tarde', 'Despejado', 'Soleado',
				 'Despejado', 'Soleado', 'Despejado', 'Tormentas aisladas', 'Tormentas dispersas', 'Tormentas matinales',
				 'Tormentas matinales / Viento', 'Tormentas por la tarde / Viento', 'Tormentas por la tarde', 'Chubascos matinales',
				 'Chubascos por la tarde', 'Chubascos matinales / Viento', 'Chubascos por la tarde / Viento', 'Chubascos /Viento', 'Chubascos de nieve dispersos', 'Por la mañana niebla, sol por la tarde',
				 'Por la tarde lluvia débil', 'Por la mañana lluvia débil'];
var txt_dia=['Domingo', 'Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
var txt_mes=['Enero', 'Febrero','Marzo','Abril','Mayo','Junio','Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];			 

//listPuestos.jsp (Consulta)
var listaPuestos1 = '¿Seguro que desea eliminar esta tarjeta?';

//abonoIndex
var abonoIndex_seleccionTrayecto = "Debe seleccionar un trayecto";

//abonoCompra
var abonoCompra_seleccionClase = "Debe seleccionar una clase";

//menuBusqueda.jsp
var enlaceInfoYCondiciones = "https://ssl.renfe.com/comprabilletes/informacion_condiciones.html";

//anonoFormalizacion.jsp
var abonoFormalizacion1 = 'Operación en proceso.';
var abonoFormalizacion2 = 'Seleccione un tren para continuar.';
var abonoFormalizacion3 = 'Introduzca un localizador ó el código del abono para continuar.';
var abonoFormalizacion4 = 'Seleccione una fecha de viaje para continuar.';
var abonoFormalizacion5 = 'Seleccione el trayecto para continuar.';
var abonoFormalizacion6 = 'La fecha seleccionada esta vacia o tiene un formato no valido';
var abonoFormalizacion7 = 'El teléfono de contacto está vacio';

var stre = new Array("Muy debil", "Muy debil", "Debil", "Moderada", "Moderada",  "Fuerte", "Fuerte", "Fuerte", "Muy fuerte", "Muy fuerte", "Muy fuerte");

//mobipay
var errorMP1 = 'ERROR DE SISTEMA. DEBE VOLVER A COMENZAR.'
var errorMP2 = 'HA SUPERADO EL TIEMPO DE ESPERA DE LA REFERENCIA. DEBE VOLVER A COMENZAR.'
var errorMP3 = 'OPERACIÓN CANCELADA POR MOBIPAY. DEBE VOLVER A COMENZAR.'
var errorMP4 = 'OPERACIÓN CANCELADA. DEBE VOLVER A COMENZAR.'
var errorMP5 = 'LA REFERENCIA HA CADUCADO.'

/** REQ058.INICIO@SCCID2P.SDC@17/06/2008 */
//Selección de billetes cambio
var error1 = 'No se puede cambiar conjuntamente billetes de trenes regionales con billetes de trenes de larga distancia/AVE';
var error2 = 'No se puede cambiar conjuntamente billetes de trenes regionales que tengan la ida gastada con el resto de billetes';

/** REQ058.FIN@SCCID2P.SDC@17/06/2008 */

/** REQ058.INICIO@SCCI4F.SDC@23/06/2008 */
//Pago del cambio
var errorBillAntDuplicado = 'No es posible asignar varios billetes de vuelta al mismo billete de ida';
/** REQ058.FIN@SCCID4F.SDC@23/06/2008 */

/** REQ062.INICIO@SCCID6G.SDC@05/11/2008 */
//Alerts para abonos

var abonos_busqueda_obligatorio  = 'No se ha informado ningun campo de busqueda';
var abonos_busqueda_email		 = 'No se ha introducido mail';
var abonos_busqueda_campos		 = 'Se han informado varios campos. Informar unicamente un campo';
var abonosPrecioEnProceo         = 'Recuperacion de precios en proceso';
var abonos_busqueda_dniCifBus    = 'Debe introducir el DNI y el número de abono o su localizador de compra';

/** REQ062.FIN@SCCID6G.SDC@05/11/2008 */

/* MIG009.INICIO@SCCID4F.SDC@06/03/2009 */
var mBooking1      = 'La Vista/Operacion seleccionada no existe';
var mBooking2      = 'Debe rellenar todos los datos obligatorios para hacer la petición';
var mBooking3      = 'Operación en proceso.';
var bookingFechas1 = 'Debe seleccionar primero una fecha de Salida';
/* MIG009.FIN@SCCID4F.SDC@06/03/2009 */

/* MIG009.INICIO@SCCID4F.SDC@06/03/2009 */
var mOperReservas1 = 'La Vista/Operacion seleccionada no existe';
var mOperReservas2 = 'Operación en proceso.';
var mOperReservas3 = 'Debe seleccionar al menos una plaza de la lista';
var mOperReservas4 = 'Debe introducir el localizador de la reserva';
var mOperReservas5 = 'Debe introducir el localizador para el origen';
var mOperReservas6 = 'Debe introducir el localizador para el destino';
var mOperReservas7 = 'Debe seleccionar el mismo número de plazas de ida y de vuelta';
/* MIG009.FIN@SCCID4F.SDC@06/03/2009 */

//@REQ011.EMPRESAS.STEP1@SCCID4F.SDC@04/11/2009@INICIO
var mEmpresas1 = 'Revise las Tarifas disponibles, pueden existir tarifas promocionales para la Empresa seleccionada';
var mEmpresas2 = 'Debe seleccionar al menos un registro para continuar';
var mEmpresas3 = 'No se han encontrado registros';
var mEmpresas4 = 'Error al buscar empresas';
var mEmpresas5 = 'Cargando…';
var colDescEmpresa = "Empresa";
var colCdgoEmpresa = "Código";
//@REQ011.EMPRESAS.STEP1@SCCID4F.SDC@04/11/2009@FIN

//@REQ169 --> Remaquetación
//Tarjeta Dorada
var tarjetaDorada1 = 'El Nombre del comprador para la tarjeta dorada es obligatorio';
var tarjetaDorada2 = 'El Dni/Pasaporte para la tarjeta dorada es obligatorio';
var tarjetaDorada3 = 'Se ha de pulsar el botón recalcular precios';
var tarjetaDorada4 = 'El Número de la tarjeta dorada es obligatorio';
var tarjetaDorada5 = 'La fecha de alta es obligatoria';
var tarjetaDorada6 = 'La fecha de caducidad es obligatoria';
var tarjetaDorada7 = 'El Numero de Tarjeta no debe estar vacio';
var tarjetaDorada8 = 'El Titular de la Tarjeta no debe estar vacio';
var tarjetaDorada9 = 'El mes de caducidad no debe estar vacio';
var tarjetaDorada10 = 'El año de caducidad no debe estar vacio';
var tarjetaDorada11 = '¿Desea anular la tarjeta Seleccionada?';
var tarjetaDorada12 = 'Debe aceptar las condiciones de Venta';
var tarjetaDorada13 = 'Por favor, introduzca un número de tarjeta válido';
var tarjetaDorada14 = 'Tarjeta Dorada no encontrada. ¿Desea bloquearla de todas formas?';
var tarjetaDorada15 = 'El Tratamiento no debe estar vacío';

//Operaciones Especiales
var operacionesEspeciales1 = 'El <Importe Desde> no es válido.';
var operacionesEspeciales2 = 'El <Importe Hasta> no es válido.';
var operacionesEspeciales3 = 'Código de Operación no ingresado.';
var operacionesEspeciales4 = 'Código de Autorización no ingresado.';
//@INC000000754871@INDRA.SCEXUF3.SDC@08/04/2014@INICIO 
//@84072: RQM0180-Fuera venta de billetes internacionales RMF
var operacionesEspeciales5 = 'Código de Operación / Billete erróneo. Debe de tener 12 o 13 dígitos.';
//@INC000000754871@INDRA.SCEXUF3.SDC@08/04/2014@INICIO 
//@84072: RQM0180-Fuera venta de billetes internacionales RMF
var operacionesEspeciales6 = 'Matrícula no ingresada.';
var operacionesEspeciales7 = 'Código de tren erróneo. Debe de tener 5 dígitos.';
var operacionesEspeciales8 = 'Fecha de viaje Errónea. Debe de tener formato dd-mm-yyyy';
var operacionesEspeciales9 = 'Fecha de viaje inválida. Debe de tener formato dd-mm-yyyy';
var operacionesEspeciales10 = 'Fecha Desde Errónea. Debe de tener formato dd-mm-yyyy';
var operacionesEspeciales11 = 'Fecha Desde inválida. Debe de tener formato dd-mm-yyyy';
var operacionesEspeciales12 = 'Fecha Hasta Errónea. Debe de tener formato dd-mm-yyyy';
var operacionesEspeciales13 = 'Fecha Hasta inválida. Debe de tener formato dd-mm-yyyy';
var operacionesEspeciales14 = 'No es aceptable ingresar una Fecha Hasta sin una Fecha Desde';
var operacionesEspeciales15 = 'La Fecha Desde es superior a la Fecha Hasta';
var operacionesEspeciales16 = 'El rango válido del <importe Desde> es:\n[0 .. 9999999,99]';
var operacionesEspeciales17 = 'El rango válido del <importe Hasta> es:\n[0 .. 9999999,99]';
var operacionesEspeciales18 = 'El <importe Desde> tiene que ser MENOR O IGUAL que <importe Hasta>.';
var operacionesEspeciales19 = 'El rango válido del <importe Desde> es:\n[0 .. 9999999,99]';
var operacionesEspeciales20 = 'Si el <importe Desde> está vacío,\nno se permite rellenar <importe Hasta>.';
var operacionesEspeciales21 = 'Formato de la fecha del viaje incorrecto.';
//@INC000000747897@INDRA.SCEXUF3.SDC@08/04/2014@INICIO
//INICIO 83507: RQM0175 Autorizaciones fra_vta Tarjeta Dorada
var operacionesEspeciales22 = 'Tarjeta Dorada. Debe tener 9 dígitos.';
//@INC000000747897@INDRA.SCEXUF3.SDC@08/04/2014@FIN

//Tarifa Última Hora
var tarifaUltimaHora1 = ' seleccionando un trayecto.';
var tarifaUltimaHora2 = 'Debe seleccionar primero una fecha de Salida.';

//Tarjeta Plus
var tarjetaPlus1 = 'Se tiene que informar el campo de código de billete';
var tarjetaPlus2 = 'Se debe informar la fecha de compra y el dni';
var tarjetaPlus3 = 'Se debe informar el DNI';
var tarjetaPlus4 = 'Datos del Abono comprado para proceder a la anulación';
var tarjetaPlus5 = 'Datos del Abono comprado para proceder a la formalización';
var tarjetaPlus6 = 'Datos del Abono comprado para proceder a la impresión';
var tarjetaPlus7 = 'Datos del Abono comprado para proceder a consultar';
var tarjetaPlus8 = 'Fecha de Venta';
var tarjetaPlus9 = 'Tramo';
var tarjetaPlus10 = 'Número de Viajes';
var tarjetaPlus11 = 'No se podr&aacute;n anular Abonos si se ha formalizado al menos uno de los viajes.';
var tarjetaPlus12 = 'Para anular un Abono, con viajes formalizados pero no realizados, deber&aacute; anular dichos viajes previamente.'
var tarjetaPlus13 = 'Volver';
var tarjetaPlus14 = 'Continuar';
var tarjetaPlus15 = 'Cancelar asistencia';
var tarjetaPlus16 = 'Solicitar asistencia';
var tarjetaPlus17 = 'No se puede deseleccionar la fecha formalizada.';
var tarjetaPlus18 = 'La selección es mayor que los billetes disponibles';
var tarjetaPlus19 = 'El abono no puede ser impreso en un canal de compra diferente al que se utilizó para su adquisición';
var tarjetaPlus20 =	'Nueva Búsqueda';

//Trenes Turisticos
var trenesTuristicos1 = 'Al menos debe seleccionar un viajero.'
var trenesTuristicos2 = 'El número máximo de viajeros es 9.'

//Cierre
var cierreBilletes1 = 'Debe rellenar el CVV/CID de la tarjeta.';
var cierreBilletes2 = 'El CVV/CID es un campo numérico.';
var cierreBilletes3 = 'La longitud del CVV es de 3 dígitos, 4 en el caso de tarjetas AMEX.';
var cierreBilletes4 = 'Tarjeta Club AVE ';
// @INC000000187680@IND.SCCID9L@07/02/2011@INICIO
var cierreBilletes4_1 = 'Tarjeta TEMPO ';
// @INC000000187680@IND.SCCID9L@07/02/2011@FIN
var cierreBilletes5 = ' errónea';
var cierreBilletes6 = 'El número de viajeros es menos del premitido para un grupo';
var cierreBilletes7 = 'El número de viajeros es mayor del permitido para un grupo';
var cierreBilletes8 = 'El número de viajeros de vuelta no puede ser mayor que el de ida';




//vtiDatosPase
var pulsadoBotonAlert = 'Operación en proceso';
var mbalert04 = 'Debe seleccionar una fecha de inicio de Pase';
var mbalert05 = 'Debe rellenar todos los datos del viajero';
var mbalert06 = 'Debe rellenar todos los datos de entrega';
var mbalert07 = 'Fecha Errónea. Debe tener el siguiente formato: 01/01/2001';
var mbalert08 = 'Teléfono no válido';
var mbalert09 = 'Email no válido';
var mbalert10 = 'NIF erróneo. Debe tener el siguiente formato: 12345678X con la letra obligatoria';
var mbalert11 = 'DNI erróneo. Debe tener el siguiente formato: 12345678X con la letra opcional';
var mbalert12 = 'Tarjeta de Residencia (NIE) Errónea';
var mbalert13 = 'Pasaporte erróneo';

var mbalert25 = 'El valor introducido no es un número';
var mbalert26 = 'La tarjeta de crédito debe tener al menos 14 dígitos';
var mbalert27 = 'El mes introducido es incorrecto';
var mbalert28 = 'El año debe tener un valor numérico';
var mbalert29 = 'El año debe tener 2 digitos';
var mbalert30 = 'La fecha introducida no es correcta';
var mbalert32 = 'El Nº de Tarjeta VISA Renfe esta vacío';
var mbalert33 = 'Rellene el documento VISA Renfe';
var mbalert34 = 'El Nº de Tarjeta VISA Renfe es incorrecto';
var mbalert35 = 'El Nº de Tarjeta AVE esta vacío';
var mbalert36 = 'Rellene el documento Tarjeta AVE';
var mbalert37 = 'El Nº de Tarjeta AVE es incorrecto';
// @INC000000187680@IND.SCCID9L@07/02/2011@INICIO
var mbalert32_1 = 'El Nº de Tarjeta VISA Renfe TEMPO esta vacío';
var mbalert33_1 = 'Rellene el documento VISA Renfe TEMPO';
var mbalert34_1 = 'El Nº de Tarjeta VISA Renfe TEMPO es incorrecto';
var mbalert35_1 = 'El Nº de Tarjeta TEMPO esta vacío';
var mbalert36_1 = 'Rellene el documento Tarjeta TEMPO';
var mbalert37_1 = 'El Nº de Tarjeta TEMPO es incorrecto';
// @INC000000187680@IND.SCCID9L@07/02/2011@FIN
var mbalert40 = 'El Nº de CVV esta vacío';
var mbalert41 = 'El CVV debe ser numérico';
var mbalert42 = 'El CVV debe tener al menos 3 dígitos';
var mbalert43 = 'El N&uacute;mero de Documento 6191 es Incorrecto';
var mbalert44 = 'La tarjeta de crédito debe tener al menos 14 dígitos';


//@INC000000721852@INDRA.SCEXUF3.SDC@12/12/2013@INICIO
//INICIO 81035 EVOLUTIVO-RQM0159-Cálculo dinámico Precios InterRail
var mbalert47 = 'Debe seleccionar un pais para el Pase';
//@INC000000721852@INDRA.SCEXUF3.SDC@12/12/2013@FIN

var pase05    = 'Introduzca los datos de los Viajeros';
var pase06    = 'Fecha inicio del Pase:';
var pase07    = 'Datos Viajeros';
var pase08    = 'Precio';
var pase09    = 'Pasajero';
var pase10    = 'Nombre / Apellidos:';
var pase11    = 'Fecha de nacimiento (dd/mm/aaaa)';
var pase12    = 'Seleccione tipo de documento';
var pase13    = 'Pais de Residencia:';
var pase14    = 'Seleccione pais de resisencia';
var pase15    = 'Nacionalidad:';
var pase16    = 'Seleccione nacionalidad';
var pase17    = 'Tarifa:';
var pase18    = 'Total:';
var pase19    = 'Forma de entrega';
var pase20    = 'Datos de entrega';
var pase21    = 'Nombre / Apellidos:';
var pase22    = 'Direccion:';
var pase23    = 'Código postal:';
var pase24    = 'Ciudad';
var pase25    = 'Pais:';
var pase26    = 'Telefono:';
var pase27    = 'Email:';
var pase28    = 'Forma de pago';
var pase29    = 'Seleccione forma de pago:';
var pase30    = 'Número de Tarjeta :';
var pase31    = 'Fecha de Caducidad :';
var pase32    = 'CVV / CID:';
var pase33    = 'El pago se procedera a realizar en metálico';
var pase34    = 'Tarjeta CLUB AVE';
var pase35    = 'Nº de tarjeta CLUB AVE';
// @INC000000187680@IND.SCCID9L@07/02/2011@INICIO
var pase34_1    = 'Tarjeta TEMPO';
var pase35_1    = 'Nº de tarjeta TEMPO';
// @INC000000187680@IND.SCCID9L@07/02/2011@FIN
var pase36    = 'Documento acreditativo';
var pase37    = 'Tarjeta VISA Renfe';
var pase38    = 'Nº de tarjeta VISA Renfe';
// @INC000000187680@IND.SCCID9L@07/02/2011@INICIO
var pase37_1    = 'Tarjeta VISA Renfe TEMPO';
var pase38_1    = 'Nº de tarjeta VISA Renfe TEMPO';
// @INC000000187680@IND.SCCID9L@07/02/2011@FIN
var pase39    = 'Documento acreditativo';
var pase40    = 'Titular de la Tarjeta :';
var pase41    = 'Número de Documento';
var pase42    = 'El pase no puede ser para el mismo pais de residencia';
var pase43    = 'Seleccione una forma de entrega';
var pase44    = 'La fecha de nacimiento no cumple la restricción de edad del pase seleccionado';
var pase45    = 'Compruebe que los datos son correctos';

//vtiAnulaPase
var alert1 = 'El localizador de compra debe tener 6/8 caracteres';
var alert2 = 'El número de billete debe tener 13 caracteres';

var urlRecorridoTren = 'http://horarios.renfe.com/HIRRenfeWeb/recorrido.do';
var urlRecorridoCombinados = 'http://horarios.renfe.com/HIRRenfeWeb/combinados.do';
var urlPrestacionesTren = 'http://horarios.renfe.com/HIRRenfeWeb/prestaciones.do';
// @INC000000599414@INDRA.SCEXUF2.SDC@14/03/2013@INICIO
var urlTransbordos = 'http://horarios.renfe.com/HIRRenfeWeb/transbordos.do';
//var urlTransbordos = 'http://localhost:9080/HIRRenfeWeb/transbordos.do';
// @INC000000599414@INDRA.SCEXUF2.SDC@14/03/2013@FIN

var tarjetasUsuRegis = 'Para utilizar esta opción debe estar registrado como cliente';
var errorFechaSalidaPrimero = 'Debe seleccionar primero una fecha de Salida.';

var puntos1='Debe introducir un documento';
var puntos2='Debe introducir una tarjeta válida';
var puntos3='Debe introducir una tarjeta válida, con carácteres numéricos';
var puntos4='Debe introducir una tarjeta válida, de ';
var puntos5=' dígitos.';

var rcdPasillo = "Pasillo";
var rcdCamaAlta = "Cama alta";
var rcdCamaBaja = "Cama baja";
var rcdCamaMedia = "Cama media";
var rcdLitAlta = "Litera alta";
var rcdLitBaja = "Litera baja";
var rcdLitMedia = "Litera media";
var rcdVentanilla = "Ventanilla";
var rcdVentanillaAislada = "Ventanilla aislada";
var rcdCentro = "Centro";
var rcdDesconocido = "Desconocido";
var rcdCoche = "Coche";
var rcdLibres = "Libres";
var rcdOcupdas = "Ocupadas";
var rcdBusiness = "Sala Business";

var literalBilleteTxto = "Billete";

//REQ0161 Envio SMS Código de barras
var errorEnvioSms = "No se ha podido realizar el envío del SMS, si lo desea, puede proceder a imprimir su billete";
var errorNumDif = "Debe introducir números de telefono diferentes para cada envío"
var errorValidaTlf = "Introduzca todos los números de móvil con el formato correcto";

//@RF50038@ACC.SCEXUET.SDC@09/05/2013@INICIO
var errorEnvioPassbook = "No se ha podido generar el Passbook, si lo desea, puede proceder a imprimir su billete";
var envioPassbookCorrecto = "E-mail(s) enviado(s) con éxito";
//@RF50038@ACC.SCEXUET.SDC@09/05/2013@FIN

//@RF50065@ACC.SCEXUET.SDC@10/07/2013@INICIO
var errorMailNoValido = "El formato de E-mail no es el correcto. Por favor introduzca una dirección de correo electrónico válida";
//@RF50065@ACC.SCEXUET.SDC@10/07/2013@FIN

// REQ0397 Lista de Espera
var debeLoguearse = 'Debe estar registrado para utilizar la lista de espera';


// REQ0620 Mejora Paper to Mobile Codebar 2D
var reenvioTelefonoDif = "El mensaje se debe enviar al mismo teléfono introducido en la compra del billete";
var reenvioErrorEnvio = "No se ha podido enviar el SMS";
var reenvioMaxSuperado = "Se ha superado el número máximo de reenvíos para este billete";
var reenvioFormatoTlfno = "Introduzca un teléfono móvil con el formato correcto";

//REQ0653 Implementación venta internacional en particulares
var errorVtiInicio = "Para utilizar esta opción debe estar registrado como cliente";

//REQ0393 Validación billetes en estado distinto.
<!-- //@REQ0673@ACC.SCCID5F.SDC@29/12/2011@INICIO -->
var mBilletesDistintos = "No se pueden anular billetes con distinto estado o distinta modalidad de pago. Debe realizar la anulacion por separado.";
<!-- //@REQ0673@ACC.SCCID5F.SDC@29/12/2011@FIN -->


//VXY INTERNACIONAL

//origenes y destinos
var alert1VXY = "Los campos de origen y destino son iguales";
var alert2VXY = "Los campos de fecha y hora de origen no pueden ser iguales a los de llegada";
var alert3VXY = "Si los campos de fecha son iguales, la hora de regreso no puede ser menor a la hora de salida";
var alert4VXY = "La fecha de salida tiene que tener el formato dd/mm/aaaa";
var alert5VXY = "La fecha de llegada tiene que tener el formato dd/mm/aaaa";
var alert6VXY = "La fecha de salida no puede ser anteriror a la fecha actual";
var alert7VXY = "No se han rellenado los datos necesarios para la búsqueda";
var alert8VXY = "Para continuar, elija una fecha de salida por favor";
var alert9VXY = "Para continuar, elija una fecha de regreso por favor";
var alert10VXY = "Fechas no válidas: la fecha de regreso no puede ser anterior a la fecha de salida";	
var alert11VXY = "Rellene la fecha de regreso o seleccione solo viaje de ida"


//vxytrenes
var alert12VXY = "Se tendran que seleccionar dentro de los trayectos los diferentes tramos";
var alert13VXY = "Se tendran que seleccionar un trayecto de ida y otro de vuelta";

var alert17VXY = "El tren de vuelta sale antes de que llegue el tren de ida";
var alert18VXY = "No se pueden combinar en la misma venta tarifas de camas con recorrido multitramo";
var alert19VXY = "Se tendra que seleccionar un trayecto de ida";
var alert20VXY = "El applet que accede al diario de operaciones no se ha cargado.";
var alert21VXY = "Rellene los campos de nombre y teléfono para solicitar la plaza H";
var msgEnviando= "Enviando datos..."
var alert22VXY = "El campo debe de estar relleno para poder realizar la consulta ";
var alert23VXY = "Código de administración/red no válida";
var alert24VXY = "La suma de plazas por tarifa no puede ser superior al número total de viajeros.";


//vxytarifas
var alert26VXY = "El documento de familia numerosa no puede estar vacio"
var alert28VXY = "Combinación de tarifas no permitida"
var alert29VXY = "El numero de pasajeros del viaje no coincide con el numero de pasajeros seleccionados en la lista de preferencias."
var alert30VXY = "No está permitido seleccionar acompañante de PMR en el viajero 1, por favor si selecciona plaza H seleccione en el viajero 2 la tarifa de acompañante."
var alert31VXY = "No está permitido que se repitan el nombre y apellido de los viajeros, por favor introduzca un nombre y apellido diferente para cada viajero."
var alert32VXY = "No están permitidos carácteres extraños en los datos de los viajeros ."

//vxyreserva
var alert25VXY = "Debe introducir el nombre y apellidos del viajero "
var alert27VXY = "Para los trayectos internacionales de esta compra se obtendrá un justificante de compra, NO VÁLIDO PARA VIAJAR. Deberá imprimir los billetes en los puntos autorizados por Renfe antes de iniciar su viaje.<br />¿Desea continuar con esta operación?"

//@REQ0700@ACC.SCEXUCS.SDC@09/02/2012
var solicitarFacturaVacio = 'Por favor, cumplimente el NIF/CIF'
//@ES09P00013224@ACC.SCEXUCS.SDC@24/02/2012
var solicitarFacturaNoCoincide = 'No se puede solicitar factura con un NIF/CIF diferente de la venta'

var alert99VXY = "Debe seleccionar las estaciones en el desplegable";

//@REQ0682@ACC.SCCID1D.SDC@17/02/2012@INICIO
var avisoCalcularPrecio = "Debe calcular el precio para continuar"
///@REQ0682@ACC.SCCID1D.SDC@17/02/2012@FIN
// @RF40045@ACC.SCCID2N.SDC@25/09/2012@INICIO
var alertRecalculoTarifas = 'Revise las Tarifas disponibles, pueden existir nuevas tarifas. ';
// @RF40045@ACC.SCCID2N.SDC@25/09/2012@FIN
//RF50010@ACC.SCEXU8O.SDC@05/03/2013@INICIO
var puntualidadtrenes_busqueda_obligatorio  	 = 'Para poder realizar la búsqueda debe introducir o una estación o un tren o un número de billete que circule el día actual.';
var puntualidadtrenes_busqueda_campos_estaciones = 'Para continuar con la búsqueda, introduzca el origen y el destino.';
var puntualidadtrenes_busqueda_en_proceso 		 = 'Realizando Búsqueda';
var puntualidadtrenes_busqueda_nueva			 = 'Nueva Búsqueda';
var puntualidadtrenes_busqueda_campo_estacion 	 = 'El valor del campo estación no es válido.';
var puntualidadtrenes_busqueda_campo_tren 	 	 = 'El valor del campo tren no es válido.';
var puntualidadtrenes_busqueda_campo_billete 	 = 'El valor del campo billete no es válido.';
var mTablaTrenes1 = 'No hay ningún tren en circulación que cumpla con los criterios de búsqueda introducidos.';
var mTablaTrenes2 = 'Error al buscar trenes';
var mTablaTrenes3 = 'Cargando…';
var colHoraProgramada 	= 'Hora programada'
var colEstacion 		= 'Estación'
var colRetraso 			= 'Retraso'
var colHoraPrevista 	= 'Hora prevista'
var colTren 			= 'Tren'
var colEstOrigen 		= 'Estación origen'
var colEstDestino	 	= 'Estación destino'
//RF50010@ACC.SCEXU8O.SDC@05/03/2013@FIN
//RF50012@ACC.SCEXU6Z.SDC@16/04/2013@INICIO
var calendarioprecios_fecha_anterior = "Fechas no válidas: la fecha de regreso no puede ser anterior a la fecha de salida";
var calendarioprecios_ida_ant = "La fecha de ida no puede ser anterior a hoy.";
var calendarioprecios_vuelta_ant = "La fecha de vuelta no puede ser anterior a hoy.";
var calendarioprecios_fecha_sig = "No existen más días de venta.";
var calendarioprecios_ida = "(Ida) ";
var calendarioprecios_vuelta = "(Vuelta) ";
//RF50012@ACC.SCEXU6Z.SDC@16/04/2013@INICIO

//RF50009@ACC.SCEXU6Z.SDC@26/04/2013@INICIO
var alertaVtm1	 	= 'El día no puede ser anterior a hoy o a la fecha del trayecto anterior.'
var alertaVtm2	 	= 'Seleccione un tren para el trayecto actual.'
var alertaVtm3	 	= 'El día no puede ser posterior a la fecha del trayecto siguiente.'
//RF50009@ACC.SCEXU6Z.SDC@26/04/2013@FIN

//RF50030@ACC.SCEXU6Z.SDC@10/06/04/2013@INICIO
var alertaTarjetaNoDatos = 'Se deben rellenar los campos obligatorios para poder continuar';
var errorTarjetaNombre = 'El nombre tiene formato incorrecto';
var errorTarjetaApellido1 = 'El primer apellido tiene formato incorrecto';
var errorTarjetaApellido2 = 'El segundo apellido tiene formato incorrecto';
var errorTarjetaPoblacion = 'La población tiene formato incorrecto';
var errorTarjetaDireccion = 'La dirección tiene formato incorrecto';
var errorTarjetaNumero = 'El número de la dirección tiene formato incorrecto';
var errorTarjetaDocumento = 'El número del documento tiene formato incorrecto';
var errorTarjetaPrefijo = 'El prefijo no es válido';
var errorTarjetaTlfFijo = 'El teléfono fijo tiene formato incorrecto';
var errorTarjetaDatosIniciales = 'Revise los datos generales';
//RF50030@ACC.SCEXU6Z.SDC@10/06/2013@FIN

//RF50086@ACC.SCEXU8S.SDC@28/08/2013@INICIO
var labelPorDefectoTipoDeEquipaje = 'Seleccione el tipo de Equipaje'
var valorPrecioDefinido = '0.00'
var errorEquipajesNoSeleccionado = 'Para poder continuar con la compra debe indicar el tipo de equipaje especial con el que viaja.';
//RF50086@ACC.SCEXU8S.SDC@28/08/2013@FIN

//RF50088@ACC.SCCIDAO.SDC@23/09/2013@INICIO
var errorBicicletas = 'Debe seleccionar el mismo número de bicicletas para ambos trayectos';
var errorBicisSueltas = 'No se permite dejar plazas de bicicletas vendidas sin viajeros asociados.'
//RF50088@ACC.SCCIDAO.SDC@23/09/2013@FIN

//@RF50105@ACC.SCEXE12.SDC@16/01/2014@INICIO
var errorAdulNinoMen = 'El número de niños menores de 4 años no puede ser superior al resto de viajeros. Si desea viajar con más niños menores de 4 años, debe seleccionar la opción niño y dispondrá de un descuento del 40%.';
var errorMenores4SinBilleteImpreso = 'Los niños menores de 4 años en este origen destino viajarán sin billete impreso, estas plazas no se tendrán en cuenta en esta venta';
//@RF50105@ACC.SCEXE12.SDC@16/01/2014@FIN

// @83318@IND.SCCID9L@28/01/2014@INICIO
var idCompraIncorrecto = 'Se ha detectado otro proceso de compra, para evitar problemas vuelva a iniciar el proceso de compra'
// @83318@IND.SCCID9L@28/01/2014@FIN

//@ACC@SCEXU3T@26/02/2014
var validacionDatosComprador1='Revise los datos del comprador marcados en color rojo, no están informados o no son correctos';
//@ACC@SCEXU3T@26/02/2014

//@ACC@SCEXU6W@06/03/2014@INI
var dtAlert1 = 'Revise los datos del viajero, no están informados o no son correctos.';
//@ACC@SCEXU6W@06/03/2014@FIN
//RF50101@ACC.SCEXU8S.SDC@31/01/2014@INICIO
var dtAlert2 = 'Para poder continuar es necesario que indique el email o teléfono de cada uno de los viajeros.';
//RF50101@ACC.SCEXU8S.SDC@31/01/2014@FIN

var errorFormaPago = 'Debe seleccionar un modo de pago para continuar';

//RF50152@ACC.SCEXU6Z.SDC@27/05/2014@INICIO
var silencioIncompatibleAnimal = 'En el coche en silencio no se podrá viajar con mascotas, por favor, revise su petición.';
var silencioSeleccionObligada = 'La petición realizada implica viajar en coche de tipo en silencio. Deberá cumplir las condiciones de viaje específicas. Para más información: www.renfe.com';
//RF50152@ACC.SCEXU6Z.SDC@27/05/2014@FIN

//R5120037@ACC.SCEXE42.SDC@23/09/2014@INICIO
var silencioIncompatibleAbonoMultifecha = 'La característica seleccionada (Silencio) sólo está disponible para la formalización de una fecha de viaje';
var silencioPlazaHIncompMultifecha = 'La selección de viaje en silla de ruedas implica viajar en coche en silencio. Para continuar, realice su formalización en fechas individuales.';
//R5120037@ACC.SCEXE42.SDC@23/09/2014@FIN


var errorServicios1 = 'Debe rellenar todos los campos obligatorios';
var errorServicios2 = 'El formulario contiene los siguientes errores: <br/>';
var errorServicios3 = 'El DNI de recogida tiene formato incorrecto <br/>';
var errorServicios4 = 'El DNI de entrega tiene formato incorrecto <br/>';
var errorServicios5 = 'El email de recogida tiene formato incorrecto <br/>';
var errorServicios6 = 'El email de entrega tiene formato incorrecto <br/>';
var errorServicios7 = 'El telefono móvil de recogida tiene formato incorrecto <br/>';
var errorServicios8 = 'El telefono móvil de entrega tiene formato incorrecto <br/>';
var errorServicios9 = 'El nombre de recogida tiene formato incorrecto <br/>';
var errorServicios10 = 'El nombre de entrega tiene formato incorrecto <br/>';
var errorServicios11 = 'El primer apellido de recogida tiene formato incorrecto <br/>';
var errorServicios12 = 'El segundo apellido de recogida tiene formato incorrecto <br/>';
var errorServicios13 = 'El primer apellido de entrega tiene formato incorrecto <br/>';
var errorServicios14 = 'El segundo apellido de entrega tiene formato incorrecto <br/>';
var errorServicios15 = 'La población de recogida tiene formato incorrecto <br/>';
var errorServicios16 = 'La población de entrega tiene formato incorrecto <br/>';
var errorServicios17 = 'El código postal de recogida es incorrecto <br/>';
var errorServicios18 = 'El código postal de recogida no pertenece a la provincia seleccionada <br/>';
var errorServicios19 = 'El código postal de entrega es incorrecto <br/>';
var errorServicios20 = 'El código postal de entrega no pertenece a la provincia seleccionada <br/>';
var errorServicios21 = 'El número de la dirección de recogida tiene formato incorrecto <br/>';
var errorServicios22 = 'El número de la dirección de entrega tiene formato incorrecto <br/>';
var errorServicios23 = 'La dirección de recogida tiene formato incorrecto <br/>';
var errorServicios24 = 'La dirección de entrega tiene formato incorrecto <br/>';
var errorServicios25 = 'No se han encontrado oficinas';
var errorServicios26 = 'Solo se puede contratar 3 bultos totales por billete';
var errorServicios27 = 'Debe seleccionar al menos un equipaje para poder continuar';
var errorServicios28 = 'Debe recalcular el precio';
var errorServicios29 = 'Se han producido errores en la validación del pedido';
var errorServicios30 = 'En proceso';
var errorServicios31 = 'Seleccione una oficina de recogida o cambie a un domicilio';
var errorServicios32 = 'Seleccione una oficina de entrega o cambie a un domicilio';

var errorServicios33 = 'El DNI de remitente tiene formato incorrecto <br/>';
var errorServicios34 = 'El email de remitente tiene formato incorrecto <br/>';
var errorServicios35 = 'El telefono móvil de remitente tiene formato incorrecto <br/>';
var errorServicios36 = 'El nombre de remitente tiene formato incorrecto <br/>';
var errorServicios37 = 'El primer apellido de remitente tiene formato incorrecto <br/>';
var errorServicios38 = 'El segundo apellido de remitente tiene formato incorrecto <br/>';
var errorServicios39 = 'La población de remitente tiene formato incorrecto <br/>';
var errorServicios40 = 'El código postal de remitente es incorrecto <br/>';
var errorServicios41 = 'El código postal de remitente no pertenece a la provincia seleccionada <br/>';
var errorServicios42 = 'El número de la dirección de remitente tiene formato incorrecto <br/>';
var errorServicios43 = 'La dirección de remitente tiene formato incorrecto <br/>';
var errorServicios44 = 'Debe indicar la información de dirección del remitente';
var errorServicios45 = 'Debe indicar la información de contacto del remitente';

var oficinasTelefono = 'teléfono';
var oficinasHorario = 'Horario';
var oficinasLaborables = 'Laborables';
var oficinasSabados = 'sábados';
var oficinasFestivos = 'festivos';
var oficinasBuscando = 'Buscando oficinas...';
var modificadaLocalidadEntrega = 'Se ha modificado la localidad de entrega. Debe recalcular los precios y revisar las fechas de recogida y entrega';
var modificadaLocalidadRecogida = 'Se ha modificado la localidad de recogida. Debe recalcular los precios y revisar las fechas de recogida y entrega';

var errorFidelizacion1= 'Debe introducir la tarjeta de fidelización';

var selecFechaViaje='Seleccione la fecha de viaje';
var selecFechaIda='Seleccione una fecha de ida';
var selecFechaVuelta='Seleccione una fecha de vuelta';
var selecFechaNacimiento='Seleccione su fecha de nacimiento';
var selecFechaDesde='Seleccione desde qué fecha';
var selecFechaHasta='Seleccione hasta qué fecha';
var selecFechaSalida='Seleccione la fecha de salida';
var selecFechaInicio='Seleccione la fecha de inicio';
