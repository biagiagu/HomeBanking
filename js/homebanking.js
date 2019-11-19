console.log("Estoy en un archivo separado!");
//Declaración de variables
var nombreUsuario;
var saldoCuenta;
var limiteExtraccion;
var montoTransaccion;
var esMultiploDeCien;
const cuentaAmiga1 = 1234567;
const cuentaAmiga2 = 7654321;
var cuentaDestino;
const pinAgus = 1234;
const pinVero = 4321;
var preguntaPin;

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
  iniciarSesion();
  cargarNombreEnPantalla();
  actualizarSaldoEnPantalla();
  actualizarLimiteEnPantalla();
};

//Funciones que tenes que completar

function cambiarLimiteDeExtraccion() {
  preguntar("limiteExtraccion");
  determinarMonto("limiteExtraccion");
  if (!montoTransaccion || montoTransaccion == 0) {
    return;
  } else {
    limiteExtraccion = montoTransaccion;
    actualizarLimiteEnPantalla();
  }
}

function extraerDinero() {
  preguntar("extraccion");
  determinarMonto("extraccion");
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
  determinarMonto("deposito");
  if (!montoTransaccion || montoTransaccion == 0) {
    return;
  } else {
    actualizarSaldo("deposito");
    actualizarSaldoEnPantalla();
  }
}

function pagarServicio() {
  preguntar("pagarServicios"); //Preguntar qué servicio voy a pagar
  determinarMonto("pagarServicios"); // Determina el costo del servicio y marca el Ss como pagado
  if (!montoTransaccion || montoTransaccion == 0) {
    return;
  } else {
    verificarCondiciones("transferencia"); // a partir de aqui el pago del servicio se trata como una transferencia por el valor del servicio.
    actualizarSaldo("extraccion");
    actualizarSaldoEnPantalla();
  }
}

function transferirDinero() {
  preguntar("transferencia");
  determinarMonto("extraccion");
  if (!montoTransaccion || montoTransaccion == 0) {
    return;
  } else {
    verificarCondiciones("transferencia");
    if (montoTransaccion != 0) {
      preguntar("cuentaDestino");
      if (cuentaDestino == cuentaAmiga1 || cuentaDestino == cuentaAmiga2) {
        actualizarSaldo("transferencia");
        actualizarSaldoEnPantalla();
      } else if (!cuentaDestino) {
        return;
      } else {
        alert(
          "La cuenta " +
            cuentaDestino +
            " no es una cuenta Amiga.\nPor favor hable con su banco."
        );
      }
    }
  }
}

function iniciarSesion() {
  preguntar("pin");
  if (preguntaPin == pinAgus) {
    nombreUsuario = "Agustin";
    saldoCuenta = 25000;
    limiteExtraccion = 3000;
  } else if (preguntaPin == pinVero) {
    nombreUsuario = "Veronica";
    saldoCuenta = 2500000;
    limiteExtraccion = 10000;
  } else {
    alert(
      "Codigo incorrecto.\nTu dinero ha sido retenido por cuestiones de seguridad"
    );
    nombreUsuario = "Desconocido";
    saldoCuenta = 0;
    limiteExtraccion = " Vos no podes sacar nada";
    return;
  }
  alert(
    "Bienvenid@ " +
      nombreUsuario +
      "\nTu saldo inicial es de $" +
      saldoCuenta +
      "\nYa puedes comenzar a operar."
  );
  return;
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
  document.getElementById("nombre").innerHTML = "Bienvenid@ " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
  document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
  document.getElementById("limite-extraccion").innerHTML =
    "Tu límite de extracción es: $" + limiteExtraccion;
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
      textoPregunta = "Cual será el nuevo limite de extracción?:";
      break;
    case "pagarServicios":
      textoPregunta =
        "Que servicio desea pagar: \nA- Agua ($350)\nB- Telefono ($425) \nC- Luz ($210)\nD- Internet ($570)\n";
      break;
    case "transferencia":
      textoPregunta = "Cuál es el monto a transferir: ";
      break;
    case "cuentaDestino":
      textoPregunta = "Ingrese n° de cuenta de destino";
      cuentaDestino = prompt(textoPregunta);
      return;
      break;
    case "pin":
      textoPregunta = "Ingrese su PIN: ";
      preguntaPin = prompt(textoPregunta);
      return;
  }

  //Hace la pregunta
  montoTransaccion = prompt(textoPregunta);
  return;
}

function determinarMonto(accion) {
  //esta función evalua el valor introducido por el usuario, evita errores por valores null o NaN, convierte en numerico y para la opcion de pago de servicios le asigna el valor correspondiente al servicio seleccionado.
  if (
    accion == "extraccion" ||
    accion == "deposito" ||
    accion == "limiteExtraccion"
  ) {
    if (
      isNaN(parseInt(montoTransaccion)) ||
      !montoTransaccion ||
      parseInt(montoTransaccion) < 0
    ) {
      alertaEroor();
      return;
    } else {
      montoTransaccion = parseInt(montoTransaccion);
      return;
    }
  } else if (accion == "pagarServicios") {
    montoTransaccion =
      montoTransaccion == "a"
        ? 350
        : montoTransaccion == "b"
        ? 425
        : montoTransaccion == "c"
        ? 210
        : montoTransaccion == "d"
        ? 570
        : alertaEroor();
  }
  return;
}

function actualizarSaldo(accion) {
  switch (accion) {
    case "extraccion":
      if (montoTransaccion != 0) {
        alert(
          "Monto a retirar: $" +
            montoTransaccion * -1 +
            "\nSaldo anterior: $" +
            saldoCuenta +
            "\nSaldo final: $ " +
            (saldoCuenta - montoTransaccion)
        );
        saldoCuenta = saldoCuenta - montoTransaccion;
        if (saldoCuenta < limiteExtraccion) {
          limiteExtraccion = saldoCuenta;
          actualizarLimiteEnPantalla();
        }
      }
      return saldoCuenta;
    case "deposito":
      if (montoTransaccion != 0) {
        alert(
          "Monto del deposito: $" +
            montoTransaccion +
            "\nSaldo anterior: $" +
            saldoCuenta +
            "\n Saldo final: $ " +
            (saldoCuenta + montoTransaccion)
        );
        saldoCuenta = saldoCuenta + montoTransaccion;
      }
      return saldoCuenta;
    case "transferencia":
      if (montoTransaccion != 0) {
        alert(
          "Se ha transferido: $" +
            montoTransaccion +
            "\n Cuenta destino: " +
            cuentaDestino +
            "\n Saldo final: $ " +
            (saldoCuenta - montoTransaccion)
        );
        saldoCuenta = saldoCuenta - montoTransaccion;
        if (saldoCuenta < limiteExtraccion) {
          limiteExtraccion = saldoCuenta;
          actualizarLimiteEnPantalla();
        }
      }
  }
}

function alertaEroor() {
  alert(
    "Has introducido un valor no permitido o no has introducido nada.\n\nDisculpa las molestias.\n\nAhora volves al menu."
  );
  montoTransaccion = 0;
  console.log(montoTransaccion);
  return;
}

//Funciones que realizan Verificaciones

function checkMultiploDeCien() {
  if (montoTransaccion % 100 == 0) {
    return (esMultiploDeCien = true);
  } else {
    return (esMultiploDeCien = false);
  }
}

function verificarCondiciones(accion) {
  if (montoTransaccion > saldoCuenta) {
    alert(
      "Solo te queda $" +
        saldoCuenta +
        ". Ese es tu limite para extraer o transferir."
    );
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
