const carritoContenedor = document.getElementById("carrito-contenedor");
const totalSpan = document.getElementById("total");
const vaciarBtn = document.getElementById("vaciar-carrito");

// Cargar carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function mostrarCarrito() {
    if (!carritoContenedor) return; // Evitar errores si no existe en la página

    carritoContenedor.innerHTML = "";
    let total = 0;

    carrito.forEach(producto => {
        total += parseFloat(producto.precio) * producto.cantidad;
        const div = document.createElement("div");
        div.className = "col-md-4";
        div.innerHTML = `
            <div class="card shadow-sm">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">₡${parseFloat(producto.precio).toFixed(2)} x ${producto.cantidad}</p>
                    <button class="btn btn-sm btn-danger btn-remove" data-id="${producto.id}">Eliminar</button>
                </div>
            </div>
        `;
        carritoContenedor.appendChild(div);
    });

    if (totalSpan) totalSpan.textContent = `₡${total.toFixed(2)}`;

    // Eliminar producto
    document.querySelectorAll(".btn-remove").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            carrito = carrito.filter(p => p.id != id);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            mostrarCarrito();
        });
    });
}

// Vaciar carrito
if (vaciarBtn) {
    vaciarBtn.addEventListener("click", () => {
        carrito = [];
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
    });
}

// Mostrar carrito al iniciar
mostrarCarrito();
