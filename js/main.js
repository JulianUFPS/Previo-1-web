document.addEventListener('DOMContentLoaded', function() {
    // Obtener el objeto de usuario del localStorage
    const userData = JSON.parse(localStorage.getItem('usuario'));

    if (userData) {
        // Crear un elemento de párrafo para mostrar el código y el nombre del estudiante
        const studentInfo = document.getElementById('studentInfo');
        studentInfo.innerHTML = `<p>Código: ${userData.codigo}, Nombre: ${userData.nombre}</p>`;

        // Obtener las notas del estudiante desde el servidor
        const notasURL = `https://24a0dac0-2579-4138-985c-bec2df4bdfcc-00-3unzo70c406dl.riker.replit.dev/students/${userData.codigo}/notas`;
        console.log('notasURL:', notasURL); 
        fetch(notasURL)
            .then(response => response.json())
            .then(data => {
                const tablaNotas = document.getElementById('tablaNotas');
                const promedioPonderadoDiv = document.getElementById('promedioPonderado'); // Seleccionar el elemento donde mostrar el promedio ponderado
                // Verificar si la propiedad "notas" existe en el objeto "data"
                if (data && data.notas && Array.isArray(data.notas)) {
                    let sumaProductos = 0;
                    let sumaCreditos = 0;
                    // Iterar sobre el array de notas
                    data.notas.forEach(asignatura => {
                        const fila = document.createElement('tr');
                        fila.innerHTML = `
                            <td>${asignatura.asignatura}</td>
                            <td>${asignatura.creditos}</td>
                            <td>${asignatura.n1}</td>
                            <td>${asignatura.n2}</td>
                            <td>${asignatura.n3}</td>
                            <td>${asignatura.ex}</td>
                            <td>${calcularDEF(parseFloat(asignatura.n1), parseFloat(asignatura.n2), parseFloat(asignatura.n3), parseFloat(asignatura.ex))}</td>
                        `;
                        tablaNotas.querySelector('tbody').appendChild(fila);
                        sumaProductos += calcularDEF(parseFloat(asignatura.n1), parseFloat(asignatura.n2), parseFloat(asignatura.n3), parseFloat(asignatura.ex)) * parseFloat(asignatura.creditos);
                        sumaCreditos += parseFloat(asignatura.creditos);
                    });
                    const promedioPonderado = sumaProductos / sumaCreditos;
                    // Mostrar el promedio ponderado en el elemento HTML
                    promedioPonderadoDiv.innerHTML = `<p>Promedio Ponderado: ${promedioPonderado.toFixed(2)}</p>`;
                } else {
                    console.error('Error: La respuesta del servidor no contiene los datos esperados.');
                    alert('Error al obtener las notas. Por favor, inténtalo de nuevo.');
                }
            })
            .catch(error => {
                console.error('Error al obtener las notas:', error);
                // Mostrar un mensaje de error al usuario
                alert('Error al obtener las notas. Por favor, inténtalo de nuevo.');
            });
    } else {
        // Si no hay datos de usuario en el localStorage, redirigir al usuario a la página de inicio de sesión
        window.location.href = 'login.html';
    }
});

// Función para calcular la nota definitiva
function calcularDEF(n1, n2, n3, ex) {
    return (((n1 + n2 + n3) / 3) * 0.7) + (ex * 0.3);
}
