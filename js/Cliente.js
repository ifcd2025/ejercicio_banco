import { Cuenta } from "./Cuenta.js";

export class Cliente {
    #id;
    #nombre;
    #cuenta;
    #foto;

    constructor(nombre, numeroCuenta, saldoInicial) {
        this.#nombre = nombre;
        // Generamos un id único aleatorio
        this.#id = crypto.randomUUID(); // Desde ES 2021
        this.#cuenta = new Cuenta(numeroCuenta, saldoInicial);
        const numero = Math.floor(Math.random() * 29 + 1);
        this.#foto = `fotos/persona${numero}.png`;
    }

    get id() {
        return this.#id;
    }

    get nombre() {
        return this.#nombre;
    }

    get foto() {
        return this.#foto;
    }

    get cuenta() {
        return this.#cuenta;
    }
    
    toJSON() {
        return {
            id: this.#id,
            nombre: this.#nombre,
            foto: this.#foto,
            cuenta: this.#cuenta.toJSON()
        }
    }

    static fromJSON(obj) {
        // Al crear un cliente, creaba un id aleatorio y una foto aleatoria
        // con lo que luego tenemos que asignarle la que tenía.
        // Además hay que crear un objeto Cuenta con la cuenta.
        // Por eso pasamos cualquier número de cuenta y saldo inicial
        const cliente = new Cliente(obj.nombre, 0, 0);
        cliente.#foto = obj.foto;
        cliente.#cuenta = Cuenta.fromJSON(obj.cuenta);
        cliente.#id = obj.id;
        return cliente;
    }
}