document.addEventListener('DOMContentLoaded', function() {
    // Obtener el objeto de usuario del localStorage
    const userData = JSON.parse(localStorage.getItem('usuario'));

    if (userData) {
        // Crear un elemento de párrafo para mostrar el código y el nombre del estudiante
        const studentInfo = document.getElementById('studentInfo');
        studentInfo.innerHTML = `<p>Código: ${userData.codigo}, Nombre: ${userData.nombre}</p>`;

        // Obtener las notas del estudiante desde el servidor
        const notasURL = `https://24a0dac0-2579-4138-985c-bec2df4bdfcc-00-3unzo70c406dl.riker.replit.dev/students/${userData.codigo}/notas`;
        fetch(notasURL)
            .then(response => response.json())
            .then(data => {
                // Verificar si la respuesta contiene los datos esperados
                if (data && Array.isArray(data) && data.length > 0 && data[0].notas) {
                    // La respuesta contiene las notas, procesarlas
                    const notas = data[0].notas;
                    const tablaNotas = document.getElementById('tablaNotas');
                    const tbody = tablaNotas.querySelector('tbody');

                    notas.forEach(asignatura => {
                        const fila = document.createElement('tr');
                        const { asignatura: nombre, creditos, n1, n2, n3, ex } = asignatura;
                        const def = calcularDEF(parseFloat(n1), parseFloat(n2), parseFloat(n3), parseFloat(ex));
                        fila.innerHTML = `
                            <td>${nombre}</td>
                            <td>${creditos}</td>
                            <td>${n1}</td>
                            <td>${n2}</td>
                            <td>${n3}</td>
                            <td>${ex}</td>
                            <td>${def}</td>
                        `;
                        tbody.appendChild(fila);
                    });
                } else {
                    // La respuesta no contiene los datos esperados
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
