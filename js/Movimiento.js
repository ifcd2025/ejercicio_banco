export class Movimiento {
    // Con la # los hacemos privados, con lo que solo se pueden
    // usar en esta clase
    #tipo;
    #importe;

    constructor(tipo, importe) {
        // En JS siempre es obligatorio usar this para acceder
        // a los atributos de la clase
        this.#tipo = tipo;
        this.#importe = importe;
    }

    // Creamos los getters para poder acceder dese fuera al tipo e importe
    get tipo() {
        return this.#tipo;
    }
    get importe() {
        return this.#importe;
    }
}
