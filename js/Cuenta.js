import { Movimiento } from "./Movimiento.js";
import { TipoMovimiento } from "./TipoMovimiento.js";

export class Cuenta {
    #numero;
    #saldo;
    #movimientos = [];

    constructor(numero, saldo) {
        this.#numero = numero;
        this.#saldo = saldo;
    }

    get numero() {
        return this.#numero;
    }

    get saldo() {
        return this.#saldo;
    }

    get movimientos() {
        return this.#movimientos;
    }

    ingresar(importe) {
        if(importe <= 0) {
            // Lanzamos una excepción, lo que termina la ejecución del método
            throw new RangeError("El importe debe ser mayor que cero");
        }
        this.#saldo += importe;
        // Con new creamos un objeto de la clase indicada, con lo que se ejecuta
        // su constructor y devuelve el objeto creado
        this.#movimientos.push(new Movimiento(TipoMovimiento.Ingreso, importe));
    }

    retirar(importe) {
        if(this.#saldo - importe < 0) {
            throw new RangeError("No hay saldo suficiente");
        }
        this.#saldo -= importe;
        this.#movimientos.push(new Movimiento(TipoMovimiento.Retirada, importe));
    }


}