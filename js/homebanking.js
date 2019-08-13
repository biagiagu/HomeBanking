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
	preguntarMonto("limiteExtraccion");
	limiteExtraccion = montoTransaccion;
	actualizarLimiteEnPantalla();
}


function extraerDinero() {
	preguntarMonto("extraccion");
	verificarCondiciones("extraccion");
	actualizarSaldo("extraccion");
	actualizarSaldoEnPantalla();
}


function depositarDinero() {
	preguntarMonto("deposito");
	actualizarSaldo("deposito");
	actualizarSaldoEnPantalla();
}


function pagarServicio() {

	preguntarMonto("pagarServicios"); //Preguntar que servicio voy a pagar y Determina el costo del servicio y marcar el servicio como pagado
	verificarCondiciones("transferencia"); // a partir de aqui el pago del servicio se trata como una transferencia por el monto del servicio.
	actualizarSaldo("extraccion"); //Actualizar Saldo
	actualizarSaldoEnPantalla();
}

function transferirDinero() {

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

function preguntarMonto(accion) {
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
	}
	montoTransaccion = prompt(textoPregunta); //Hago la pregunta
	switch (montoTransaccion) {
		case "a":
			if (!servicioAgua) {
				montoTransaccion = 350;
				servicioAgua = 1;
				return;
			} else {
				yaPago("Agua");
				return;
			}
			case "b":
				if (!servicioTelefono) {
					montoTransaccion = 425;
					servicioTelefono = 1;
					return;
				} else {
					yaPago("Telefono");
					return;
				}

				case "c":
					if (!servicioLuz) {
						montoTransaccion = 210;
						servicioLuz = 1;
						return;
					} else {
						yaPago("Luz");
						return;
					}
					case "d":
						if (!servicioInternet) {
							montoTransaccion = 570;
							servicioInternet = 1;
							return;
						} else {
							yaPago("Internet");
							return;
						}
						default:
							montoTransaccion = parseInt(montoTransaccion);

	}

	return;
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
			alert("Monto del deposito: $" + montoTransaccion + "; Saldo anterior: $" + saldoCuenta + "; Saldo final: $ " + (saldoCuenta + montoTransaccion))
			saldoCuenta = saldoCuenta + montoTransaccion;
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
	console.log("estoy verificando que el monto sea multiplo de 100")
	if (montoTransaccion % 100 == 0) {
		console.log("Si es multiplo de 100");
		return esMultiploDeCien = true;

	} else {
		console.log("No es multiplo de 100");
		return esMultiploDeCien = false;
	}
}

function verificarCondiciones(accion) {
	if (montoTransaccion > saldoCuenta) {
		alert("Solo te queda $" + saldoCuenta + ". Ese es tu limite para extraer.");
		montoTransaccion = 0;
	}
	if (accion == "extraccion") {
		console.log("Estoy verificando para Extracciones");
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