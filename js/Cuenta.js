import { Movimiento } from "./Movimiento.js";
import { TipoMovimiento } from "./TipoMovimiento.js";

export class Cuenta {
    #numero;
    #saldo;
    #saldoInicial;
    #movimientos = [];

    constructor(numero, saldo) {
        this.#numero = numero;
        this.#saldo = saldo;
        this.#saldoInicial = saldo;
    }

    get numero() {
        return this.#numero;
    }

    get saldo() {
        return this.#saldo;
    }

    get saldoInicial() {
        return this.#saldoInicial;
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

    toJSON() {
        // Cuidado: la llave debe ir en la misma línea que el return
        return {
            numero: this.#numero,
            saldo: this.#saldo,
            saldoInicial: this.saldoInicial,
            movimientos: this.#movimientos.map(m => m.toJSON())
        };
    }

    static fromJSON(obj) {
        const cuenta = new Cuenta(obj.numero, obj.saldo);
        cuenta.#saldoInicial = obj.saldoInicial;
        cuenta.#movimientos = obj.movimientos.map(m => Movimiento.fromJSON(m));
        return cuenta;
    }

}