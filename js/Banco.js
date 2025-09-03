import { Cliente } from "./Cliente.js";

export class Banco {
    #clientes = [];

    get clientes() {
        return this.#clientes;
    }

    #generarNumeroCuenta() {
        // Podríamos haber usado crypto.randomUUID() u otro método 
        // más "decente"
        return this.#clientes.length + 1;
    }

    altaCliente(nombre, saldoInicial) {
        const nuevoCliente = new Cliente(nombre, this.#generarNumeroCuenta(), saldoInicial); 
        this.#clientes.push(nuevoCliente);
        return nuevoCliente;
    }

    bajaCliente(idCliente){
        // findIndex devuelve la posición / índice del valor buscado o -1 si no lo
        // encuentra
        const posicion = this.#clientes.findIndex(c => c.id === idCliente);
        // Eliminamos el elemento de la posición indicada del array
        // 1 para que solo elimine 1
        this.#clientes.splice(posicion, 1);
    }

    obtenerUltimoCliente() {
        return this.clientes.at(-1); // Añadido en ES 2022 (con -1 coge el último)
    }

    obtenerCliente(id) {
        const cliente = this.#clientes.filter(c => c.id === id);
        // filter siempre devuelve un array, aunque no haya elementos o solo uno
        if(cliente.length == 0) {
            return null;
        } else {
            // Solo debería haber un cliente con ese id
            return cliente[0];
        }

        // return cliente.length == 0 ? null : cliente[0];
    }

    toJSON() {
        return {
            clientes: this.#clientes.map( c => c.toJSON())
        }
    }

    static fromJSON(obj) {
        const banco = new Banco();
        banco.#clientes = obj.clientes.map(c => Cliente.fromJSON(c));
        return banco;
    }
}