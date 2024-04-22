document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Objeto con los datos del usuario a enviar en formato JSON
        const userData = {
            codigo: username,
            clave: password
        };

        // Configurar la solicitud POST
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        };

        // Realizar la solicitud POST al servicio de login
        fetch('https://api-parcial.crangarita.repl.co/login', requestOptions)
            .then(response => response.json())
            .then(data => {
                // Guardar el objeto de usuario en el localStorage
                localStorage.setItem('usuario', JSON.stringify(data));

                // Redireccionar a la página principal (por ejemplo, main.html)
                window.location.href = 'main.html';
            })
            .catch(error => {
                console.error('Error al iniciar sesión:', error);
                // Mostrar un mensaje de error al usuario
                alert('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
            });
    });
});
