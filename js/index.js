import { Banco } from "./Banco.js";

const banco = new Banco();
/*banco.altaCliente("Pepe", 1000);
banco.altaCliente("eva", 2000);
banco.clientes[0].cuenta.ingresar(100);
banco.clientes[1].cuenta.retirar(10);
console.log(banco);*/

document.getElementById("altaCliente")
    .addEventListener("click", 
        () => document.getElementById("dialogoCliente").showModal());

//altaCliente.addEventListener("click", () => dialogoCliente.showModal());

document.getElementById("guardar").addEventListener("click", guardarCliente);


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
    
}
