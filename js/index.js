import { BancoAlmacenamiento } from "./bancoAlmacenamiento.js";
import { TipoMovimiento } from "./TipoMovimiento.js";

//const banco = new Banco();
/*banco.altaCliente("Pepe", 1000);
banco.altaCliente("eva", 2000);
banco.clientes[0].cuenta.ingresar(100);
banco.clientes[1].cuenta.retirar(10);
console.log(banco);*/
const banco = BancoAlmacenamiento.cargar();
let chart = null;
mostrarClientes();

document.getElementById("altaCliente")
    .addEventListener("click", mostrarDialogoCliente);

//altaCliente.addEventListener("click", mostrarDialogoCliente);

document.getElementById("guardar").addEventListener("click", guardarCliente);
document.getElementById("cancelar").addEventListener("click", () => 
    document.getElementById("dialogoCliente").close());
document.getElementById("dialogoCliente")
    .addEventListener("keypress", comprobarEnter);
document.getElementById("aceptarMensaje").addEventListener("click", () => 
    document.getElementById("dialogoMensajes").close());
document.getElementById("ingresar").addEventListener("click", ingresarRetirar);
document.getElementById("retirar").addEventListener("click", ingresarRetirar);
document.getElementById("guardarMovimiento")
    .addEventListener("click", aceptarMovimiento);
document.getElementById("cancelarMovimiento")
    .addEventListener("click", 
        () => document.getElementById("dialogoMovimiento").close()
);

document.getElementById("verGrafica").addEventListener("click", verGrafica);

document.getElementById("bajaCliente").addEventListener("click", eliminarCliente);

document.getElementById("cerrar").addEventListener("click",() => {
    document.getElementById("dialogoGrafico").close();
});

function verGrafica() {
    const seleccionado = document.querySelector(".clienteSeleccionado");
    if(seleccionado == null) {
        const dialogo = document.getElementById("dialogoMensajes");
        dialogo.querySelector(".mensaje").textContent = "Debes seleccionar el cliente";
        dialogo.showModal();
        return;
    }
    mostrarGrafico();
}

function mostrarGrafico() {
    const saldos = [];
    const etiquetas = [];
    const clienteSeleccionado = document.querySelector(".clienteSeleccionado");
    const cliente = banco.obtenerCliente(clienteSeleccionado.dataset.idCliente);

    let saldo = cliente.cuenta.saldoInicial;
    for(const m of cliente.cuenta.movimientos) {
        if(m.tipo === TipoMovimiento.Ingreso) {
            saldo += m.importe;
            saldos.push(saldo);
            etiquetas.push(TipoMovimiento.Ingreso);
        } else {
            saldo -= m.importe;
            saldos.push(saldo);
            etiquetas.push(TipoMovimiento.Retirada);
        }
    }

  const ctx = document.getElementById('grafico');

  if(chart != null) {
    // Para volver a mostrar el gráfico, hay que destruirlo primero
    chart.destroy();
  }
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: etiquetas,
      datasets: [{
        label: 'Historial',
        data: saldos,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  }) ;
  document.getElementById("dialogoGrafico").showModal();
}

function mostrarClientes() {
    const clientes = document.getElementById("clientes");
    for(const cliente of banco.clientes) {
        mostrarCliente(cliente);
    }
}

function eliminarCliente() {
    const seleccionado = document.querySelector(".clienteSeleccionado");
    if(seleccionado == null) {
        const dialogo = document.getElementById("dialogoMensajes");
        dialogo.querySelector(".mensaje").textContent = "Debes seleccionar el cliente";
        dialogo.showModal();
        return;
    }
    // Muestra un dialogo con un botón Si y otro No. Si pulsa Si, devuelve true,
    // Si pulsa no, devuelve false
    const resultado = window.confirm("¿Deseas eliminarlo?");
    if(resultado == true) {
        banco.bajaCliente(seleccionado.dataset.idCliente);
        seleccionado.remove();
        BancoAlmacenamiento.guardar(banco);
    }
}

function aceptarMovimiento() {
    const importe = document.getElementById("importe");
    if(importe.checkValidity() == false) {
        document.getElementById("erroresMovimiento")
            .textContent = "Falta el importe o es menor que 1";
        return;
    }
    const idCliente = document.querySelector(".clienteSeleccionado").dataset.idCliente;
    const cliente = banco.obtenerCliente(idCliente);
    // Usamos try catch pues en el método ingresar hacemos un throw si el 
    // importe no es válido
    try {
        if(document.getElementById("dialogoMovimiento").dataset.operacion == 
            TipoMovimiento.Ingreso) {
                cliente.cuenta.ingresar(parseInt(importe.value));
        } else {
            cliente.cuenta.retirar(parseInt(importe.value));
        }
        BancoAlmacenamiento.guardar(banco);
        document.querySelector(".clienteSeleccionado .saldo").textContent
             = cliente.cuenta.saldo;
        mostrarMovimiento(document.querySelector(".clienteSeleccionado"),
            importe.value, document.getElementById("dialogoMovimiento").dataset.operacion);
        document.getElementById("dialogoMovimiento").close();
    } catch(error) {
        document.getElementById("erroresMovimiento")
            .textContent = error;
    }
}

function mostrarMovimiento(elementoCliente, importe, operacion) {
    const li = `<li class="d-flex justify-content-between px-1"><span class="tipo">${operacion}</span><span class="importe">${importe}</span></li>`;
    elementoCliente.querySelector(".movimientos").innerHTML += li;
}

function ingresarRetirar(evt) {
    const seleccionado = document.querySelector(".clienteSeleccionado");
    if(seleccionado == null) {
        const dialogo = document.getElementById("dialogoMensajes");
        dialogo.querySelector(".mensaje").textContent = "Debes seleccionar el cliente";
        dialogo.showModal();
        return;
    }
    if(evt.currentTarget.id == "ingresar") {
        document.getElementById("dialogoMovimiento").dataset.operacion = TipoMovimiento.Ingreso;
    } else {
        document.getElementById("dialogoMovimiento").dataset.operacion = TipoMovimiento.Retirada;
    }
    document.getElementById("importe").value = "";
    document.getElementById("erroresMovimiento").textContent = "";
    document.getElementById("dialogoMovimiento").showModal();
}


function comprobarEnter(evt) {
    if(evt.key == "Enter") {
        guardarCliente();
    }
}

function mostrarDialogoCliente() {
    const dialogo = document.getElementById("dialogoCliente");
    document.getElementById("nombre").value = "";
    document.getElementById("saldo").value = "";
    dialogo.showModal();
}

function guardarCliente() {
    const nombre = document.getElementById("nombre");
    const saldo = document.getElementById("saldo");
    const mensajes = [];
    if(nombre.checkValidity() == false) {
        mensajes.push("Falta el nombre o no tiene 2 caracteres como mínimo");
    }
    if(saldo.checkValidity() == false) {
        mensajes.push("Falta el saldo o es menor que 1");
    }
    if(mensajes.length > 0) {
        const errores = document.getElementById("errores");
        // map recorre cada elemento del array y lo devuelve convertido en otra cosa
        // Con join convertimos el array en una sola cadena, separando los elementos
        // por el separador que indiquemos
        errores.innerHTML = mensajes.map( m => `<p>${m}</p>`).join("");
        return;
    }
    const cliente = banco.altaCliente(nombre.value, parseInt(saldo.value));
    BancoAlmacenamiento.guardar(banco);
    mostrarCliente(cliente);
    document.getElementById("dialogoCliente").close();
}

function mostrarCliente(cliente) {
    // Con true clona los hijos
    const clon = document.getElementById("clon").cloneNode(true);
    clon.removeAttribute("id");
    document.getElementById("clientes").appendChild(clon);
    clon.classList.remove("d-none");
    clon.querySelector(".nombre").textContent = cliente.nombre;
    clon.querySelector(".saldo").textContent = cliente.cuenta.saldo;
    // Quitamos los li de prueba que tenemos en el original
    clon.querySelector(".movimientos").textContent = "";
    clon.querySelector("img").src = cliente.foto;
    // Para poder realizar luego ingresos, retiradas, ... necesitamos saber
    // que cliente hay en este elemento
    clon.dataset.idCliente = cliente.id;
    // El método cloneNode no clona eventos, con lo que no valdría con solo
    // hacerlo en el cliente original
    clon.addEventListener("click", seleccionarCliente);
    for(const m of cliente.cuenta.movimientos) {
        mostrarMovimiento(clon, m.importe, m.tipo);
    }
}

function seleccionarCliente(evt) {
    const seleccionadoActual = document.querySelector(".clienteSeleccionado");
    // Si había alguno seleccionado que no sea sobre el que se ha hecho click,
    // lo deseleccionamos
    if(seleccionadoActual != evt.currentTarget && seleccionadoActual != null) {
        seleccionadoActual.classList.remove("clienteSeleccionado");
    }
    // toogle la pone si no la tiene o la quita si la tiene
    // Usamos currentTarget pues devuelve siempre el elemento que se
    // suscribió al evento
    evt.currentTarget.classList.toggle("clienteSeleccionado");
}


