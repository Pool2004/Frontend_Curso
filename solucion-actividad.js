// ====================================
// SOLUCIONES PROPUESTAS - GUÍA DOCENTE
// ====================================

// PARTE 1: Variables y Tipos de Datos
let miNombre = "Carlos"; // Ejemplo
let miEdad = 20; // Ejemplo
let misCalificaciones = [4.2, 3.8, 4.5, 3.9, 4.1]; // Ejemplo
let soyPremiado = true; // Ejemplo

console.log("=== PARTE 1: Variables ===");
console.log(miNombre, miEdad, misCalificaciones, soyPremiado);


// ====================================
// PARTE 2: Operadores y Cálculos
// ====================================

// Función 1: Calcular promedio
function calcularPromedio(calificaciones) {
    let suma = 0;

    // Opción 1: Con bucle for
    for (let i = 0; i < calificaciones.length; i++) {
        suma = suma + calificaciones[i];
    }

    /* Opción 2: Con reduce (más avanzado)
    let suma = calificaciones.reduce((acc, cal) => acc + cal, 0);
    */

    return suma / calificaciones.length;
}

// Función 2: Verificar si aprobó
function aprobo(promedio) {
    if (promedio >= 3.0) {
        return true;
    } else {
        return false;
    }

    // Forma más corta:
    // return promedio >= 3.0;
}

// Función 3: Años para graduarse
function anosParaGraduarse(edadActual) {
    let anoActual = 2026; // Año actual
    let anosCarrera = 4;
    let anoGraduacion = anoActual + anosCarrera;

    return "Te graduarás en " + anoGraduacion;
}

console.log("\n=== PARTE 2: Cálculos ===");
let miPromedio = calcularPromedio(misCalificaciones);
console.log("Mi promedio:", miPromedio);
console.log("¿Aprobé?:", aprobo(miPromedio));
console.log(anosParaGraduarse(miEdad));


// ====================================
// PARTE 3: Condicionales
// ====================================

function evaluarDesempeño(promedio) {
    if (promedio > 4.5) {
        console.log("¡Excelente desempeño!");
    } else if (promedio > 4.0) {
        console.log("Muy buen trabajo");
    } else if (promedio >= 3.0) {
        console.log("Aprobado");
    } else {
        console.log("Requiere mejora");
    }
}

console.log("\n=== PARTE 3: Evaluación de Desempeño ===");
evaluarDesempeño(miPromedio);


// ====================================
// PARTE 4: Bucles FOR
// ====================================

function mostrarCalificaciones(calificaciones) {
    console.log("\nMis calificaciones por corte:");

    for (let i = 0; i < calificaciones.length; i++) {
        // i + 1 porque los cortes empiezan en 1, no en 0
        let numeroCorte = i + 1;
        console.log("Corte " + numeroCorte + ": " + calificaciones[i]);
    }
}

console.log("\n=== PARTE 4: Bucle FOR ===");
mostrarCalificaciones(misCalificaciones);


// ====================================
// DESAFÍO EXTRA: Array de objetos y bucles
// ====================================

let estudiantes = [
    { nombre: "Juan", calificaciones: [4.2, 4.5, 4.8, 4.0, 4.3] },
    { nombre: "María", calificaciones: [3.5, 3.8, 3.9, 3.6, 3.7] },
    { nombre: "Pedro", calificaciones: [4.7, 4.9, 4.8, 5.0, 4.6] }
];

function procesarEstudiantes(listaEstudiantes) {
    console.log("\n=== DESAFÍO: Estudiantes Destacados ===");

    let i = 0;
    while (i < listaEstudiantes.length) {
        let estudiante = listaEstudiantes[i];
        let promedio = calcularPromedio(estudiante.calificaciones);

        if (promedio > 4.0) {
            console.log(estudiante.nombre + " - Promedio: " + promedio.toFixed(2));
        }

        i = i + 1;
    }
}

procesarEstudiantes(estudiantes);


// ====================================
// EXTRA: Funciones auxiliares útiles
// ====================================

function contar_estudiantes_aprobados(estudiantes) {
    let contador = 0;

    for (let i = 0; i < estudiantes.length; i++) {
        let promedio = calcularPromedio(estudiantes[i].calificaciones);
        if (promedio >= 3.0) {
            contador = contador + 1;
        }
    }

    return contador;
}

function promedio_grupo(estudiantes) {
    let sumaPromedios = 0;

    for (let i = 0; i < estudiantes.length; i++) {
        sumaPromedios = sumaPromedios + calcularPromedio(estudiantes[i].calificaciones);
    }

    return sumaPromedios / estudiantes.length;
}

console.log("\n=== ESTADÍSTICAS GENERALES ===");
console.log("Estudiantes aprobados: " + contar_estudiantes_aprobados(estudiantes));
console.log("Promedio del grupo: " + promedio_grupo(estudiantes).toFixed(2));

console.log("\n✅ ¡ACTIVIDAD COMPLETADA EXITOSAMENTE!");





import { suma, estado } from './util.js'

console.log(suma(20))

console.log(estado());
