document.addEventListener('DOMContentLoaded', function() {
    // Obtener el objeto de usuario del localStorage
    const userData = JSON.parse(localStorage.getItem('usuario'));

    if (userData) {
        // Crear un elemento de párrafo para mostrar el código y el nombre del estudiante
        const studentInfo = document.getElementById('studentInfo');
        studentInfo.innerHTML = `<p>Código: ${userData.codigo}, Nombre: ${userData.nombre}</p>`;
    } else {
        // Si no hay datos de usuario en el localStorage, redirigir al usuario a la página de inicio de sesión
        window.location.href = 'login.html';
    }
});
