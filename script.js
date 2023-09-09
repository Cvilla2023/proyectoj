const usuarios = [
    { usuario: 'admin', contraseña: '123456' },
    { usuario: 'empleado1', contraseña: 'abcdef' },
    { usuario: 'empleado2', contraseña: 'qwerty' }
];

const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');
let loginIntentos = 3;
let registrosProductos = [];
let registrosClientes = [];
let registrosProveedores = [];

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const usuario = document.getElementById('username').value;
    const contraseña = document.getElementById('password').value;

    const usuarioEncontrado = usuarios.find(u => u.usuario === usuario && u.contraseña === contraseña);

    if (usuarioEncontrado) {
        mostrarPanelControl();
    } else {
        loginIntentos--;
        errorMessage.textContent = `Usuario o contraseña incorrectos. Intentos restantes: ${loginIntentos}`;
        
        if (loginIntentos === 0) {
            loginForm.style.display = 'none';
            errorMessage.textContent = 'Has excedido el número máximo de intentos. Por favor, contacta al administrador.';
        }
    }
});

function mostrarPanelControl() {
    const container = document.querySelector('.container');
    container.innerHTML = `
        <h2>Bienvenido </h2>
        <h5>Selecciona una opcion</h5>
        <button id="agregarProducto">Agregar Producto</button>
        <button id="agregarCliente">Agregar Cliente</button>
        <button id="agregarProveedor">Agregar Proveedor</button>
        <button id="calcularIngresos">Calcular Ingresos</button>
    `;

    const agregarProducto = document.getElementById('agregarProducto');
    const agregarCliente = document.getElementById('agregarCliente');
    const agregarProveedor = document.getElementById('agregarProveedor');
    const calcularIngresos = document.getElementById('calcularIngresos');

    agregarProducto.addEventListener('click', function() {
        agregarRegistro('productos');
    });

    agregarCliente.addEventListener('click', function() {
        agregarRegistro('clientes');
    });

    agregarProveedor.addEventListener('click', function() {
        agregarRegistro('proveedores');
    });

    calcularIngresos.addEventListener('click', function() {
        calcularIngresosDiarios();
    });
}

function agregarRegistro(tipo) {
    const nombre = prompt('Ingrese el nombre:');
    if (!nombre) return;

    if (tipo === 'productos') {
        const descripcion = prompt('Ingrese la descripción:');
        const cantidad = parseInt(prompt('Ingrese la cantidad:'));
        const valorUnitario = parseFloat(prompt('Ingrese el valor unitario:'));

        registrosProductos.push({ nombre, descripcion, cantidad, valorUnitario });
    } else if (tipo === 'clientes') {
        const telefono = prompt('Ingrese el teléfono:');
        const direccion = prompt('Ingrese la dirección:');
        const correo = prompt('Ingrese el correo:');

        registrosClientes.push({ nombre, telefono, direccion, correo });
    } else if (tipo === 'proveedores') {
        const nit = prompt('Ingrese el NIT:');
        const direccion = prompt('Ingrese la dirección:');
        const telefono = prompt('Ingrese el teléfono:');

        registrosProveedores.push({ nombre, nit, direccion, telefono });
    }
}

function calcularIngresosDiarios() {
    const totalProductos = registrosProductos.reduce((total, producto) => total + producto.cantidad * producto.valorUnitario, 0);
    const totalClientes = registrosClientes.length;
    const totalProveedores = registrosProveedores.length;

    const promedioRegistros = (registrosProductos.length + registrosClientes.length + registrosProveedores.length) / 3;

    let opcionMaxIngresos = 'Productos';
    let ingresosMaximos = totalProductos;

    if (totalClientes > ingresosMaximos) {
        opcionMaxIngresos = 'Clientes';
        ingresosMaximos = totalClientes;
    }

    if (totalProveedores > ingresosMaximos) {
        opcionMaxIngresos = 'Proveedores';
        ingresosMaximos = totalProveedores;
    }

    let opcionMinIngresos = 'Productos';
    let ingresosMinimos = totalProductos;

    if (totalClientes < ingresosMinimos) {
        opcionMinIngresos = 'Clientes';
        ingresosMinimos = totalClientes;
    }

    if (totalProveedores < ingresosMinimos) {
        opcionMinIngresos = 'Proveedores';
        ingresosMinimos = totalProveedores;
    }

    alert(`Ingresos diarios:\n\nProductos: $${totalProductos}\nClientes: ${totalClientes}\nProveedores: ${totalProveedores}\n\nPromedio de registros: ${promedioRegistros}\n\nOpción con más ingresos: ${opcionMaxIngresos}\nOpción con menos ingresos: ${opcionMinIngresos}`);
}