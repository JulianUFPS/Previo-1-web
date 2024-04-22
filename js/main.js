document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("addCardForm");
    const tableBody = document.querySelector("#cardTable tbody");
    const cardButtons = document.querySelectorAll(".card-container button");

    // Lee el archivo JSON y guarda los datos en el localStorage
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('cardData', JSON.stringify(data.data));
            populateTable(data.data); // Llama a la función para poblar la tabla
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));

    // Evento de clic en los botones de la clase "card-container"
    cardButtons.forEach(button => {
        button.addEventListener("click", function () {
            const cardNumber = this.getAttribute('data-numero');
            const jsonData = JSON.parse(localStorage.getItem('cardData'));
            if (jsonData && jsonData[cardNumber - 1]) {
                jsonData[cardNumber - 1].cantidad++;
                localStorage.setItem('cardData', JSON.stringify(jsonData));
                // Vuelve a poblar la tabla con los datos actualizados y ordenados
                populateTable(jsonData.sort((a, b) => b.cantidad - a.cantidad));
            }
        });
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita que el formulario se envíe normalmente

        // Captura los valores del formulario
        const cardNumber = document.getElementById("cardNumber").value;
        const cardName = document.getElementById("cardName").value;

        // Verifica si el elemento ya existe en el JSON
        const jsonData = JSON.parse(localStorage.getItem('cardData'));
        const existingCard = jsonData.find(card => card.numero === cardNumber && card.carta === cardName);

        if (existingCard) {
            // Si el elemento ya existe, aumenta la cantidad en 1
            existingCard.cantidad++;
            localStorage.setItem('cardData', JSON.stringify(jsonData));
        } else {
            // Si el elemento no existe, muestra una alerta
            alert('Eso ni existe');
        }

        // Vuelve a poblar la tabla con los datos actualizados y ordenados
        populateTable(jsonData.sort((a, b) => b.cantidad - a.cantidad));

        // Resetea el formulario
        form.reset();
    });

    // Función para poblar la tabla con los datos del localStorage
    function populateTable(data) {
        // Limpia la tabla antes de volver a poblarla
        tableBody.innerHTML = '';

        // Ordena los datos en función de la cantidad (de mayor a menor)
        data.sort((a, b) => b.cantidad - a.cantidad);

        // Puebla la tabla con los datos ordenados
        data.forEach(item => {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${item.numero}</td>
                <td>${item.carta}</td>
                <td>${item.cantidad}</td>
            `;
            tableBody.appendChild(newRow);
        });
    }
});
