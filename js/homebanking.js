'use strict'
console.log("Estoy en un archivo separado!");


//Declaración de variables
var nombreUsuario;
var saldoCuenta;
var limiteExtraccion;
var montoTransaccion;
var esMultiploDeCien;

var servicioAgua = 0; // 0-Pendiente, 1-Pagado;
var servicioInternet = 0; // 0-Pendiente, 1-Pagado;
var servicioLuz = 0; // 0-Pendiente, 1-Pagado;
var servicioTelefono = 0; // 0-Pendiente, 1-Pagado;

var cuentaAmiga1 = 1234567;
var cuentaAmiga2 = 7654321;


//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function () {
	if (!nombreUsuario) {
		nombreUsuario = "Agustin";
		// nombreUsuario = prompt("Escriba su nombre:");
	}
	cargarNombreEnPantalla();
	if (!saldoCuenta) {
		// montoDeposito = prompt("Cuanta plata teness en la billetera?: ");
		// saldoCuenta = parseInt(montoDeposito, 10);
		saldoCuenta = 25000;
		actualizarSaldoEnPantalla();
	}
	if (!limiteExtraccion) {
		// limiteExtraccion = prompt("Cual será el limite de extracción?: ");
		// limiteExtraccion = parseInt(limiteExtraccion, 10);
		limiteExtraccion = 3000;
		actualizarLimiteEnPantalla();
	}
}

//Funciones que tenes que completar

function cambiarLimiteDeExtraccion() {
	preguntar("limiteExtraccion");
	limiteExtraccion = montoTransaccion;
	actualizarLimiteEnPantalla();
}


function extraerDinero() {
	preguntar("extraccion");
	determinarMonto(montoTransaccion, "extraccion");
	if (!montoTransaccion || montoTransaccion == 0) {
		return;
	} else {
		verificarCondiciones("extraccion");
		actualizarSaldo("extraccion");
		actualizarSaldoEnPantalla();
	}

}


function depositarDinero() {
	preguntar("deposito");
	determinarMonto(montoTransaccion, "deposito");
	if (!montoTransaccion || montoTransaccion == 0) {
		return;
	} else {
		verificarCondiciones("deposito");
		actualizarSaldo("deposito");
		actualizarSaldoEnPantalla();
	}
}


function pagarServicio() {

	preguntar("pagarServicios"); //Preguntar qué servicio voy a pagar 
	determinarMonto(montoTransaccion, "pagarServicios"); // Determina el costo del servicio y marca el servicio como pagado
	verificarCondiciones("transferencia"); // a partir de aqui el pago del servicio se trata como una transferencia por el valor del servicio.
	actualizarSaldo("extraccion");
	actualizarSaldoEnPantalla();
}

function transferirDinero() {
	//preguntar monto
	//verificar saldo
	//preguntar numero de cuenta
	//verificar si es cuenta amiga
	//Actualizar Saldo
	//mostrar saldo
	preguntar("transferencia");
	determinarMonto(montoTransaccion, "extraccion");
	if (!montoTransaccion || montoTransaccion == 0) {
		console.log("pase por aqui");
		return;
	} else {
		verificarCondiciones("transferencia");
		console.log(montoTransaccion);
		preguntar("cuentaAmiga");
		// actualizarSaldo("extraccion");
		// actualizarSaldoEnPantalla();
	}


}

function iniciarSesion() {

}


//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
	document.getElementById("nombre").innerHTML = "Bienvenid@ " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
	document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
	document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}


//Funciones que ejecutan Acciones

function preguntar(accion) {
	//Selecciona el txt a mostrar
	var textoPregunta;
	switch (accion) {
		case "extraccion":
			textoPregunta = "Cuanto dinero necesitas?: ";
			break;
		case "deposito":
			textoPregunta = "Cuanto dinero vas a depositar?: ";
			break;
		case "limiteExtraccion":
			textoPregunta = "Cual será el limite de extracción?:";
			break
		case "pagarServicios":
			textoPregunta = "Que servicio desea pagar: \nA- Agua \nB- Telefono \nC- Luz \nD- Internet \n";
			break;
		case "transferencia":
			textoPregunta = "Cuál es el monto a transferir: ";
			break
			case "cuentaAmiga":
					textoPregunta = "Ingrese n° de cuenta de destino";
					break;
	}

	//Hace la pregunta
	montoTransaccion = prompt(textoPregunta);
	return;
}

function determinarMonto(valorIngresado, accion) {
	//esta función evalua el valor introducido por el usuario, evita errores por valores null o NaN, convierte en numerico y para la opcion de pago de servicios le asigna el valor correspondiente al servicio seleccionado. 

	if (accion == "extraccion" || accion == "deposito") {
		if (isNaN(parseInt(montoTransaccion)) || !montoTransaccion) {
			montoTransaccion = 0;
			return;
		} else {
			montoTransaccion = parseInt(montoTransaccion);
			return
		}
	} else if (accion == "pagarServicios") {
		switch (valorIngresado) {
			case "a":
				if (!servicioAgua) {
					montoTransaccion = 350;
					servicioAgua = 1;
					break;
				} else {
					yaPago("Agua");
					break;
				}
				break
			case "b":
				if (!servicioTelefono) {
					montoTransaccion = 425;
					servicioTelefono = 1;
					break;
				} else {
					yaPago("Telefono");
					break;
				}
				break
			case "c":
				if (!servicioLuz) {
					montoTransaccion = 210;
					servicioLuz = 1;
					break;
				} else {
					yaPago("Luz");
					break;
				}
				break
			case "d":
				if (!servicioInternet) {
					montoTransaccion = 570;
					servicioInternet = 1;
					break;
				} else {
					yaPago("Internet");
					break;
				}
				break
			default:
				console.log("llegue al default con el valor de " + montoTransaccion);
				if (isNaN(parseInt(montoTransaccion)) || !montoTransaccion) {
					console.log(montoTransaccion + " entre en !montoTransaccion");
					montoTransaccion = 0;
					console.log(montoTransaccion + " despues de cero");
					break;
				} else {
					montoTransaccion = parseInt(montoTransaccion);
					break
				}
		}
	}
	return
}

function actualizarSaldo(accion) {
	switch (accion) {
		case "extraccion":
			if (montoTransaccion != 0) {
				alert("Monto a retirar: $" + (montoTransaccion * (-1)) + "; Saldo anterior: $" + saldoCuenta + "; Saldo final: $ " + (saldoCuenta - montoTransaccion))
				saldoCuenta = saldoCuenta - montoTransaccion;
				if (saldoCuenta < limiteExtraccion) {
					limiteExtraccion = saldoCuenta;
					actualizarLimiteEnPantalla();
				}
			}
			return saldoCuenta;
		case "deposito":
			if (montoTransaccion != 0) {
				alert("Monto del deposito: $" + montoTransaccion + "; Saldo anterior: $" + saldoCuenta + "; Saldo final: $ " + (saldoCuenta + montoTransaccion))
				saldoCuenta = saldoCuenta + montoTransaccion;
			}
			return saldoCuenta;
	}
}

function yaPago(nombreServicio) {
	alert("Ud. ya pago el servicio de " + nombreServicio);
	montoTransaccion = 0;
	return;
}

//Funciones que realizan Verificaciones

function checkMultiploDeCien() {
	if (montoTransaccion % 100 == 0) {
		return esMultiploDeCien = true;

	} else {
		return esMultiploDeCien = false;
	}
}

function verificarCondiciones(accion) {

	if (montoTransaccion > saldoCuenta) {
		alert("Solo te queda $" + saldoCuenta + ". Ese es tu limite para extraer.");
		montoTransaccion = 0;
	}
	if (accion == "extraccion") {
		if (montoTransaccion > limiteExtraccion) {
			alert("El monto es superior al permitido!");
			montoTransaccion = 0;
		} else if (!checkMultiploDeCien()) {
			alert("El banco solo entrega billetes de $100.");
			montoTransaccion = 0;
		}
	}

	return;
}