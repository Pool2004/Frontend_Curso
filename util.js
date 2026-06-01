document.addEventListener("DOMContentLoaded", function () {



    const miBoton = document.getElementById('miBoton');


    miBoton.addEventListener("auxclick", function (evento) {
        console.log(evento);
    });





    console.log("El DOM cargado completamente");

    let numero = 5;
    var decimal = 45.5;
    const pi = 3.1416;

    let texto = "Hola, soy un texto";
    let booleano = true;

    let arreglo = [];
    let objeto = {
        nombre: "Juan",
        edad: 30,
        profesion: "Desarrollador"
    };

    // Esto es un comentario de una sola línea

    /*
    Esto es un comentario de varias líneas
    que puede abarcar varias líneas de texto
    ghfgh
    gfhfg
    hfhg
    fgh
    fgh
    */

    function nombreFuncion(parametro1, parametro2) {

        // Código a ejecutar

        return // Valor a devolver

    }

    function saludar(nombre = "Mundo") { // Parámetro con valor por defecto

        // let nombre = "Mundo";

        console.log("Hola, " + nombre + "!");
    }

    saludar();

    let numero1 = 10;
    let numero2 = 20;

    console.log(numero1 + numero2); // Suma
    console.log(numero1 - numero2); // Resta
    console.log(numero1 * numero2); // Multiplicación
    console.log(numero1 / numero2); // División
    console.log(numero1 % numero2); // Módulo
    console.log(numero1 ** 2); // Potencia


    console.log(numero1 < numero2); // 10 < 20 -> true
    console.log(numero1 > numero2); // 10 > 20 -> false
    console.log(numero1 <= numero2); // 10 <= 20 -> true
    console.log(numero1 >= numero2); // 10 >= 20 -> false
    console.log(numero1 == numero2); // 10 == 20 -> false
    console.log(numero1 === numero2); // 10 === 20 -> false
    console.log(numero1 != numero2); // 10 != 20 -> true
    console.log(numero1 !== numero2); // 10 !== 20 -> true

    let edad = 25;

    console.log(edad > 18 && edad < 50); // true
    console.log(edad < 18 || edad > 50); // false
    console.log(!edad > 18); // false

    let campos = "";
    let numero3 = 15;

    if (numero3 < 10 && numero3 < 20) {
        console.log("Verdadero");
    } else {
        console.log("Falso");
    }


    // While -> Mientras una condición sea verdadera, se ejecutará el bloque de código

    let contador = 0;

    while (contador < 5) {
        console.log("Frontend");
        contador = contador + 1;
    }

    // FOR -> Para iterar un bloque de código un número específico de veces

    for (let i = 0; i < 5; i++) {
        console.log("Desarrollo Web");
    }

    let multiplicador = 9;

    for (let i = 0; i < 11; i++) {
        console.log(multiplicador + " x " + i + " = " + (multiplicador * i));
    }

    // Concatenación de cadenas

    let nombre = "Juan";
    let apellido = "Pérez";

    console.log(nombre + " " + apellido); // Forma 1: Con el +

    console.log(nombre, apellido); // Forma 2: Con comas

    console.log(`${nombre} ${apellido}`) // Forma 3: Con template literals (backticks)





})



function suma(numero1 = 0, numero2 = 0) {
    return numero1 + numero2;
}

function estado(calificacion = 1.0) {

    return calificacion >= 3.0 ? "Aprobado" : "Reprobado";

}

export { suma, estado }


