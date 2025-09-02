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
}