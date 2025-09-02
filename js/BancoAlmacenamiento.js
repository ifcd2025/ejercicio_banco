import { Banco } from "./Banco.js";

export class BancoAlmacenamiento {
    // con static podemos usar el método sin tener que hacer
    // un new BancoAlmacenamiento. Se llama método de clase
    static guardar(banco) {
        // stringify crea una cadena JSON con los objetos indicados
        localStorage.setItem("banco", JSON.stringify(banco));
    }

    static cargar() {
        const datos = localStorage.getItem("banco");
        // Si no hay datos devuelve null
        if(datos == null) {
            return new Banco();
        } else {
            // parse coge un string JSON y lo convierte en objetos JS
            const objetos = JSON.parse(datos);
            // Debemos convertir esos objetos en objetos de nuestras clases:
            // Banco, Cliente, ...
            return Banco.fromJSON(objetos);
        }
    }
}