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

    // Este método será llamado cuando queramos convertir algo
    // a un objeto JSON, debiendo devolver un objeto con los datos deseados.
    // Si nuestros atributos fuesen públicos y los quisiésemos guardar todos
    // no habría que hacer este método, pero al ser privados hay que hacerlo
    toJSON() {
        return {
                tipo: this.#tipo,
                importe: this.#importe
        }
    }

    // Para poder convertir un objeto de JS en un objeto de clase, debemos
    // implementar este método, que recibe el objeto a convertir
    // El método es static pues hay que crear el objeto deseado
    static fromJSON(obj) {
        // .tipo y .importe son los nombres que dimos en el método toJSON
        return new Movimiento(obj.tipo, obj.importe);
    }
}