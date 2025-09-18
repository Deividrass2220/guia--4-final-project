
const API_URL = 'http://localhost:3000';

// CLIENTES
const clientesContainer = document.getElementById('clientes-container');
const formCliente = document.getElementById('form-cliente');

async function fetchClientes() {
    try {
        const response = await fetch(`${API_URL}/clientes`);
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const clientes = await response.json();
        clientesContainer.innerHTML = '';
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

async function addCliente(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const nuevoCliente = { nombre, email };
    try {
        const response = await fetch(`${API_URL}/clientes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoCliente)
        });
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const result = await response.json();
        alert(result.mensaje);
        formCliente.reset();
        fetchClientes();
    } catch (error) {
        console.error('No se pudo agregar el cliente:', error);
        alert('Error al agregar el cliente.');
    }
}

// PEDIDOS
const pedidosContainer = document.getElementById('pedidos-container');
const formPedido = document.getElementById('form-pedido');

async function fetchPedidos() {
    try {
        const response = await fetch(`${API_URL}/pedidos`);
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const pedidos = await response.json();
        pedidosContainer.innerHTML = '';
        pedidos.forEach(pedido => {
            const card = document.createElement('div');
            card.classList.add('pedido-card');
            card.innerHTML = `
                <h3>Pedido #${pedido.id_pedido}</h3>
                <p><strong>Descripción:</strong> ${pedido.descripcion}</p>
                <p><strong>ID Cliente:</strong> ${pedido.id_cliente}</p>
                <p><strong>Fecha:</strong> ${pedido.fecha}</p>
            `;
            pedidosContainer.appendChild(card);
        });
    } catch (error) {
        console.error('No se pudo obtener la lista de pedidos:', error);
        pedidosContainer.innerHTML = '<p>Error al cargar los pedidos.</p>';
    }
}

async function addPedido(event) {
    event.preventDefault();
    const descripcion = document.getElementById('descripcion-pedido').value;
    const id_cliente = document.getElementById('id-cliente-pedido').value;
    const fecha = document.getElementById('fecha-pedido').value;
    const nuevoPedido = { descripcion, id_cliente, fecha };
    try {
        const response = await fetch(`${API_URL}/pedidos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoPedido)
        });
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const result = await response.json();
        alert(result.mensaje);
        formPedido.reset();
        fetchPedidos();
    } catch (error) {
        console.error('No se pudo agregar el pedido:', error);
        alert('Error al agregar el pedido.');
    }
}

// ESTADOS DE ENVÍO
const estadosContainer = document.getElementById('estados-container');
const formEstado = document.getElementById('form-estado');

async function fetchEstados() {
    try {
        const response = await fetch(`${API_URL}/estados`);
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const estados = await response.json();
        estadosContainer.innerHTML = '';
        estados.forEach(estado => {
            const card = document.createElement('div');
            card.classList.add('estado-card');
            card.innerHTML = `
                <h3>${estado.estado}</h3>
                <p><strong>ID:</strong> ${estado.id_estado}</p>
            `;
            estadosContainer.appendChild(card);
        });
    } catch (error) {
        console.error('No se pudo obtener los estados:', error);
        estadosContainer.innerHTML = '<p>Error al cargar los estados.</p>';
    }
}

async function addEstado(event) {
    event.preventDefault();
    const estado = document.getElementById('estado-envio').value;
    const nuevoEstado = { estado };
    try {
        const response = await fetch(`${API_URL}/estados`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoEstado)
        });
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const result = await response.json();
        alert(result.mensaje);
        formEstado.reset();
        fetchEstados();
    } catch (error) {
        console.error('No se pudo agregar el estado:', error);
        alert('Error al agregar el estado.');
    }
}

// TRANSPORTISTAS
const transportistasContainer = document.getElementById('transportistas-container');
const formTransportista = document.getElementById('form-transportista');

async function fetchTransportistas() {
    try {
        const response = await fetch(`${API_URL}/transportistas`);
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const transportistas = await response.json();
        transportistasContainer.innerHTML = '';
        transportistas.forEach(transportista => {
            const card = document.createElement('div');
            card.classList.add('transportista-card');
            card.innerHTML = `
                <h3>${transportista.nombre}</h3>
                <p><strong>ID:</strong> ${transportista.id_transportista}</p>
                <p><strong>Teléfono:</strong> ${transportista.telefono || ''}</p>
            `;
            transportistasContainer.appendChild(card);
        });
    } catch (error) {
        console.error('No se pudo obtener los transportistas:', error);
        transportistasContainer.innerHTML = '<p>Error al cargar los transportistas.</p>';
    }
}

async function addTransportista(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre-transportista').value;
    const telefono = document.getElementById('telefono-transportista').value;
    const nuevoTransportista = { nombre, telefono };
    try {
        const response = await fetch(`${API_URL}/transportistas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoTransportista)
        });
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const result = await response.json();
        alert(result.mensaje);
        formTransportista.reset();
        fetchTransportistas();
    } catch (error) {
        console.error('No se pudo agregar el transportista:', error);
        alert('Error al agregar el transportista.');
    }
}

// RUTAS
const rutasContainer = document.getElementById('rutas-container');
const formRuta = document.getElementById('form-ruta');

async function fetchRutas() {
    try {
        const response = await fetch(`${API_URL}/rutas`);
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const rutas = await response.json();
        rutasContainer.innerHTML = '';
        rutas.forEach(ruta => {
            const card = document.createElement('div');
            card.classList.add('ruta-card');
            card.innerHTML = `
                <h3>Ruta #${ruta.id_ruta}</h3>
                <p><strong>Origen:</strong> ${ruta.origen}</p>
                <p><strong>Destino:</strong> ${ruta.destino}</p>
                <p><strong>Distancia:</strong> ${ruta.distancia_km} km</p>
            `;
            rutasContainer.appendChild(card);
        });
    } catch (error) {
        console.error('No se pudo obtener las rutas:', error);
        rutasContainer.innerHTML = '<p>Error al cargar las rutas.</p>';
    }
}

async function addRuta(event) {
    event.preventDefault();
    const origen = document.getElementById('origen-ruta').value;
    const destino = document.getElementById('destino-ruta').value;
    const distancia_km = document.getElementById('distancia-ruta').value;
    const nuevaRuta = { origen, destino, distancia_km };
    try {
        const response = await fetch(`${API_URL}/rutas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevaRuta)
        });
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const result = await response.json();
        alert(result.mensaje);
        formRuta.reset();
        fetchRutas();
    } catch (error) {
        console.error('No se pudo agregar la ruta:', error);
        alert('Error al agregar la ruta.');
    }
}

// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', () => {
    fetchClientes();
    fetchPedidos();
    fetchEstados();
    fetchTransportistas();
    fetchRutas();
});

formCliente.addEventListener('submit', addCliente);
formPedido.addEventListener('submit', addPedido);
formEstado.addEventListener('submit', addEstado);
formTransportista.addEventListener('submit', addTransportista);
formRuta.addEventListener('submit', addRuta);