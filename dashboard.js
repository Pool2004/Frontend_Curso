// Inicialización y gestión de datos de estudiantes
let estudiantes = [];

// Estudiantes semilla por defecto para poblar la vista al cargar (basado en la actividad)
const estudiantesSemilla = [
    { id: 1, nombre: "Juan Pérez", edad: 20, calificaciones: [4.2, 4.5, 4.8, 4.0, 4.3] },
    { id: 2, nombre: "María Gómez", edad: 22, calificaciones: [3.5, 3.8, 3.9, 3.6, 3.7] },
    { id: 3, nombre: "Pedro Rodríguez", edad: 21, calificaciones: [4.7, 4.9, 4.8, 5.0, 4.6] },
    { id: 4, nombre: "Laura Beltrán", edad: 19, calificaciones: [2.5, 3.0, 2.8, 3.2, 2.0] }
];

// Al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    inicializarDatos();
    configurarEventos();
    actualizarVista();
    mostrarBienvenida();
});

// Inicializar localStorage
function inicializarDatos() {
    const datosLocales = localStorage.getItem("estudiantes_pos");
    if (datosLocales) {
        estudiantes = JSON.parse(datosLocales);
    } else {
        estudiantes = [...estudiantesSemilla];
        guardarDatos();
    }
}

// Guardar en localStorage
function guardarDatos() {
    localStorage.setItem("estudiantes_pos", JSON.stringify(estudiantes));
}

// Configurar los manejadores de eventos
function configurarEventos() {
    // Formulario de agregar estudiante
    const form = document.getElementById("estudianteForm");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (validarFormulario()) {
            agregarEstudiante();
        }
    });

    // Inputs de la calculadora en vivo
    const inputsNota = document.querySelectorAll(".nota-input");
    inputsNota.forEach(input => {
        input.addEventListener("input", calcularPromedioEnVivo);
    });

    // Selector de tema (Oscuro / Claro)
    const themeToggleBtn = document.getElementById("themeToggle");
    if (themeToggleBtn) {
        // Cargar tema guardado
        const savedTheme = localStorage.getItem("theme") || "dark";
        document.documentElement.setAttribute("data-bs-theme", savedTheme);
        actualizarIconoTema(savedTheme);

        themeToggleBtn.addEventListener("click", () => {
            const currentTheme = document.documentElement.getAttribute("data-bs-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            document.documentElement.setAttribute("data-bs-theme", newTheme);
            localStorage.setItem("theme", newTheme);
            actualizarIconoTema(newTheme);

            // Alerta visual discreta con SweetAlert2
            Swal.fire({
                title: `Tema ${newTheme === 'dark' ? 'Oscuro' : 'Claro'} activado`,
                icon: 'success',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true
            });
        });
    }
}

// Actualizar el icono del tema
function actualizarIconoTema(theme) {
    const icon = document.querySelector("#themeToggle i");
    if (icon) {
        if (theme === "dark") {
            icon.className = "bi bi-sun-fill text-warning";
        } else {
            icon.className = "bi bi-moon-stars-fill text-primary";
        }
    }
}

// Mostrar modal de bienvenida SweetAlert2
function mostrarBienvenida() {
    const yaBienvenido = sessionStorage.getItem("bienvenido");
    if (!yaBienvenido) {
        Swal.fire({
            title: '¡Bienvenido al Dashboard Académico!',
            html: `
                <p>Una aplicación moderna y responsiva integrada con:</p>
                <div class="d-flex justify-content-around my-3">
                    <span class="badge bg-indigo-soft p-2"><i class="bi bi-bootstrap-fill"></i> Bootstrap 5</span>
                    <span class="badge bg-success-soft p-2"><i class="bi bi-bell-fill"></i> SweetAlert2</span>
                    <span class="badge bg-warning-soft p-2"><i class="bi bi-stars"></i> Icons CDN</span>
                </div>
                <p class="text-muted small">Registra estudiantes, calcula promedios y visualiza métricas académicas de inmediato.</p>
            `,
            icon: 'info',
            confirmButtonText: 'Comenzar a Explorar',
            confirmButtonColor: '#6366f1'
        });
        sessionStorage.setItem("bienvenido", "true");
    }
}

// Calcular promedio en vivo para la calculadora interactiva
function calcularPromedioEnVivo() {
    const inputsNota = document.querySelectorAll(".nota-input");
    let suma = 0;
    let validCount = 0;

    inputsNota.forEach(input => {
        const val = parseFloat(input.value);
        if (!isNaN(val) && val >= 1.0 && val <= 5.0) {
            suma += val;
            validCount++;
        }
    });

    const liveResult = document.getElementById("liveResultAverage");
    const liveStatus = document.getElementById("liveResultStatus");

    if (validCount === 5) {
        const promedio = parseFloat((suma / 5).toFixed(2));
        liveResult.textContent = promedio;
        
        if (promedio >= 3.0) {
            liveStatus.innerHTML = `<span class="badge badge-status badge-status-approved"><i class="bi bi-check-circle-fill"></i> Aprobado</span>`;
            liveResult.className = "fs-1 fw-bold text-success animate__animated animate__pulse";
        } else {
            liveStatus.innerHTML = `<span class="badge badge-status badge-status-failed"><i class="bi bi-x-circle-fill"></i> Requiere Mejora</span>`;
            liveResult.className = "fs-1 fw-bold text-danger animate__animated animate__pulse";
        }
    } else {
        liveResult.textContent = "-.-";
        liveResult.className = "fs-1 fw-bold text-secondary";
        liveStatus.innerHTML = `<span class="text-secondary small"><i class="bi bi-info-circle"></i> Ingrese las 5 notas</span>`;
    }
}

// Validar formulario
function validarFormulario() {
    const form = document.getElementById("estudianteForm");
    let esValido = form.checkValidity();
    
    // Validar calificaciones adicionales de manera explícita (1.0 a 5.0)
    const inputsNota = document.querySelectorAll(".nota-input");
    inputsNota.forEach(input => {
        const val = parseFloat(input.value);
        if (isNaN(val) || val < 1.0 || val > 5.0) {
            input.classList.add("is-invalid");
            esValido = false;
        } else {
            input.classList.remove("is-invalid");
            input.classList.add("is-valid");
        }
    });

    form.classList.add("was-validated");
    return esValido;
}

// Agregar estudiante
function agregarEstudiante() {
    const nombreInput = document.getElementById("nombreEstudiante");
    const edadInput = document.getElementById("edadEstudiante");
    const inputsNota = document.querySelectorAll(".nota-input");

    const calificaciones = Array.from(inputsNota).map(input => parseFloat(input.value));
    
    const nuevoEstudiante = {
        id: Date.now(),
        nombre: nombreInput.value.trim(),
        edad: parseInt(edadInput.value),
        calificaciones: calificaciones
    };

    estudiantes.push(nuevoEstudiante);
    guardarDatos();
    actualizarVista();

    // Limpiar formulario
    const form = document.getElementById("estudianteForm");
    form.reset();
    form.classList.remove("was-validated");
    
    // Resetear calificaciones en vivo
    document.getElementById("liveResultAverage").textContent = "-.-";
    document.getElementById("liveResultStatus").innerHTML = `<span class="text-secondary small"><i class="bi bi-info-circle"></i> Ingrese las 5 notas</span>`;

    // Quitar clases is-valid e is-invalid de las notas
    inputsNota.forEach(input => {
        input.classList.remove("is-valid", "is-invalid");
    });

    // Calcular promedio del estudiante guardado para SweetAlert
    const prom = (calificaciones.reduce((a, b) => a + b, 0) / 5).toFixed(2);

    Swal.fire({
        title: '¡Estudiante Registrado!',
        text: `${nuevoEstudiante.nombre} ha sido agregado con un promedio de ${prom}.`,
        icon: 'success',
        timer: 3000,
        timerProgressBar: true,
        confirmButtonColor: '#6366f1'
    });
}

// Calcular promedio individual de un estudiante
function calcularPromedioEstudiante(calificaciones) {
    const suma = calificaciones.reduce((acc, val) => acc + val, 0);
    return parseFloat((suma / calificaciones.length).toFixed(2));
}

// Eliminar estudiante
function borrarEstudiante(id, nombre) {
    Swal.fire({
        title: '¿Está seguro de eliminar?',
        text: `Esta acción removerá permanentemente a ${nombre} del registro.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#f43f5e',
        cancelButtonColor: '#64748b',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            estudiantes = estudiantes.filter(est => est.id !== id);
            guardarDatos();
            actualizarVista();

            Swal.fire({
                title: '¡Eliminado!',
                text: `${nombre} ha sido removido del sistema con éxito.`,
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });
        }
    });
}

// Ver detalles de notas de estudiante
function verDetalleEstudiante(id) {
    const est = estudiantes.find(e => e.id === id);
    if (!est) return;

    const promedio = calcularPromedioEstudiante(est.calificaciones);
    let estado = promedio >= 3.0 ? "Aprobado" : "Requiere Mejora";
    let colorEstado = promedio >= 3.0 ? "text-success" : "text-danger";

    let notasListHTML = est.calificaciones.map((nota, index) => `
        <div class="d-flex justify-content-between align-items-center py-2 border-bottom">
            <span class="text-secondary"><i class="bi bi-journal-bookmark-fill me-2"></i> Corte ${index + 1}</span>
            <span class="fw-bold fs-6">${nota.toFixed(1)}</span>
        </div>
    `).join('');

    Swal.fire({
        title: est.nombre,
        html: `
            <div class="text-start mt-3">
                <div class="text-center mb-4">
                    <span class="student-avatar mx-auto mb-2" style="width: 60px; height: 60px; font-size: 1.5rem;">
                        ${est.nombre.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2)}
                    </span>
                    <span class="text-muted d-block">${est.edad} años</span>
                </div>
                
                <h6 class="fw-bold mb-3"><i class="bi bi-bar-chart-line-fill me-1"></i> Calificaciones individuales</h6>
                ${notasListHTML}
                
                <div class="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                    <span class="fw-bold">Promedio Final</span>
                    <span class="fs-4 fw-black ${colorEstado}">${promedio}</span>
                </div>
                <div class="d-flex justify-content-between align-items-center mt-2">
                    <span class="text-secondary">Estatus Académico</span>
                    <span class="fw-bold ${colorEstado}">${estado}</span>
                </div>
            </div>
        `,
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#6366f1'
    });
}

// Actualizar toda la interfaz de usuario
function actualizarVista() {
    actualizarMetricas();
    actualizarTabla();
}

// Calcular y renderizar métricas del panel superior
function actualizarMetricas() {
    const totalEstudiantesEl = document.getElementById("totalEstudiantes");
    const promedioGeneralEl = document.getElementById("promedioGeneral");
    const tasaAprobacionEl = document.getElementById("tasaAprobacion");
    const progresoAprobacionEl = document.getElementById("progresoAprobacion");
    const mejorEstudianteEl = document.getElementById("mejorEstudiante");

    const total = estudiantes.length;
    totalEstudiantesEl.textContent = total;

    if (total === 0) {
        promedioGeneralEl.textContent = "0.0";
        tasaAprobacionEl.textContent = "0%";
        progresoAprobacionEl.style.width = "0%";
        mejorEstudianteEl.innerHTML = `<span class="text-muted small">No hay datos</span>`;
        return;
    }

    // Promedio General
    let sumaPromedios = 0;
    let aprobadosCount = 0;
    let topEstudiante = null;
    let mejorPromedio = -1;

    estudiantes.forEach(est => {
        const prom = calcularPromedioEstudiante(est.calificaciones);
        sumaPromedios += prom;
        
        if (prom >= 3.0) {
            aprobadosCount++;
        }

        if (prom > mejorPromedio) {
            mejorPromedio = prom;
            topEstudiante = est;
        }
    });

    const promedioGeneral = (sumaPromedios / total).toFixed(2);
    promedioGeneralEl.textContent = promedioGeneral;

    // Tasa de aprobación
    const tasa = Math.round((aprobadosCount / total) * 100);
    tasaAprobacionEl.textContent = `${tasa}%`;
    progresoAprobacionEl.style.width = `${tasa}%`;

    // Modificar color de la barra según porcentaje
    if (tasa >= 70) {
        progresoAprobacionEl.className = "progress-bar bg-success";
    } else if (tasa >= 50) {
        progresoAprobacionEl.className = "progress-bar bg-warning";
    } else {
        progresoAprobacionEl.className = "progress-bar bg-danger";
    }

    // Mejor estudiante
    if (topEstudiante) {
        mejorEstudianteEl.innerHTML = `
            <div class="d-flex align-items-center">
                <span class="text-success fw-bold me-2"><i class="bi bi-trophy-fill"></i> ${mejorPromedio.toFixed(2)}</span>
                <span class="text-truncate text-secondary" style="max-width: 130px;">${topEstudiante.nombre}</span>
            </div>
        `;
    }
}

// Renderizar filas de la tabla
function actualizarTabla() {
    const tbody = document.querySelector("#tablaEstudiantes tbody");
    tbody.innerHTML = "";

    if (estudiantes.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center py-5 text-secondary">
                    <i class="bi bi-inbox-fill fs-1 d-block mb-3"></i>
                    No hay estudiantes registrados. Usa el formulario de la izquierda para agregar uno nuevo.
                </td>
            </tr>
        `;
        return;
    }

    estudiantes.forEach(est => {
        const promedio = calcularPromedioEstudiante(est.calificaciones);
        const iniciales = est.nombre.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2);
        
        const tr = document.createElement("tr");

        const isApproved = promedio >= 3.0;
        const statusBadge = isApproved 
            ? `<span class="badge badge-status badge-status-approved"><i class="bi bi-check-circle-fill"></i> Aprobado</span>`
            : `<span class="badge badge-status badge-status-failed"><i class="bi bi-x-circle-fill"></i> Reprobado</span>`;

        tr.innerHTML = `
            <td>
                <div class="d-flex align-items-center gap-3">
                    <div class="student-avatar">${iniciales}</div>
                    <div>
                        <div class="fw-bold">${est.nombre}</div>
                        <div class="text-muted small">${est.edad} años</div>
                    </div>
                </div>
            </td>
            <td class="text-center font-monospace">${est.calificaciones[0].toFixed(1)}</td>
            <td class="text-center font-monospace">${est.calificaciones[1].toFixed(1)}</td>
            <td class="text-center font-monospace">${est.calificaciones[2].toFixed(1)}</td>
            <td class="text-center font-monospace d-none d-md-table-cell">${est.calificaciones[3].toFixed(1)}</td>
            <td class="text-center font-monospace d-none d-md-table-cell">${est.calificaciones[4].toFixed(1)}</td>
            <td class="text-center">
                <span class="fw-bold fs-6 ${isApproved ? 'text-success' : 'text-danger'}">${promedio.toFixed(2)}</span>
            </td>
            <td>${statusBadge}</td>
            <td>
                <div class="d-flex gap-2 justify-content-end">
                    <button class="btn btn-sm btn-outline-info" onclick="verDetalleEstudiante(${est.id})" title="Ver detalles y desglose">
                        <i class="bi bi-eye-fill"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="borrarEstudiante(${est.id}, '${est.nombre}')" title="Eliminar registro">
                        <i class="bi bi-trash3-fill"></i>
                    </button>
                </div>
            </td>
        `;

        tbody.appendChild(tr);
    });
}
