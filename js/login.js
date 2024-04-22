document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Validar usuario y contraseña
        if (username === 'admin' && password === '1234') {
            // Usuario y contraseña correctos, redireccionar a main.html
            window.location.href = 'main.html';
        } else {
            // Usuario y/o contraseña incorrectos, mostrar mensaje de error
            alert('Usuario y/o contraseña incorrectos. Por favor, inténtalo de nuevo.');
        }
    });
});