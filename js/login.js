document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        
        const userData = {
            codigo: username,
            clave: password
        };

        
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        };

        
        fetch('https://24a0dac0-2579-4138-985c-bec2df4bdfcc-00-3unzo70c406dl.riker.replit.dev/login', requestOptions)
            .then(response => {
                if (!response.ok) {
                    
                    throw new Error('Credenciales incorrectas');
                }
                return response.json();
            })
            .then(data => {
                
                localStorage.setItem('usuario', JSON.stringify(data));
                window.location.href = 'main.html';
            })
            .catch(error => {
                console.error('Error al iniciar sesión:', error);
                alert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
            });
    });
});
