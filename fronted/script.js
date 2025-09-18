// La URL base de tu API de backend
const API_URL = 'http://localhost:3000';

// Seleccionamos los elementos del DOM que vamos a usar
const clientesContainer = document.getElementById('clientes-container');
const formCliente = document.getElementById('form-cliente');

// --- FUNCIÓN PARA OBTENER Y MOSTRAR CLIENTES ---
async function fetchClientes() {
    try {
        // Hacemos una petición GET a la ruta /clientes de nuestra API
        const response = await fetch(`${API_URL}/clientes`);

        // Verificamos si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        // Convertimos la respuesta en un objeto JSON
        const clientes = await response.json();

        // Limpiamos el contenedor para evitar duplicados
        clientesContainer.innerHTML = '';

        // Iteramos sobre cada cliente y creamos una "tarjeta" en el HTML
        clientes.forEach(cliente => {
            const card = document.createElement('div');
            card.classList.add('cliente-card');
            card.innerHTML = `
                <h3>${cliente.nombre}</h3>
                <p><strong>ID:</strong> ${cliente.id_cliente}</p>
                <p><strong>Email:</strong> ${cliente.email}</p>
            `;
            clientesContainer.appendChild(card);
        });

    } catch (error) {
        console.error('No se pudo obtener la lista de clientes:', error);
        clientesContainer.innerHTML = '<p>Error al cargar los clientes.</p>';
    }
}


// --- FUNCIÓN PARA AGREGAR UN NUEVO CLIENTE ---
async function addCliente(event) {
    // Prevenimos que el formulario se envíe de la forma tradicional (recargando la página)
    event.preventDefault();

    // Obtenemos los valores de los campos del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;

    const nuevoCliente = {
        nombre: nombre,
        email: email
        // Puedes agregar más campos si tu tabla de clientes los tiene
    };

    try {
        // Hacemos una petición POST a la ruta /clientes
        const response = await fetch(`${API_URL}/clientes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoCliente) // Convertimos el objeto a JSON
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        // Si la petición fue exitosa, recargamos la lista de clientes
        const result = await response.json();
        alert(result.mensaje); // Muestra el mensaje del backend
        formCliente.reset(); // Limpiamos el formulario
        fetchClientes(); // Vuelve a cargar la lista de clientes

    } catch (error) {
        console.error('No se pudo agregar el cliente:', error);
        alert('Error al agregar el cliente.');
    }
}


// --- EVENT LISTENERS ---
// Cuando la página carga, obtenemos los clientes
document.addEventListener('DOMContentLoaded', fetchClientes);

// Cuando se envía el formulario, llamamos a la función para agregar un cliente
formCliente.addEventListener('submit', addCliente);