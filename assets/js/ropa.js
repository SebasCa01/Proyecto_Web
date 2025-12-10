const contenedor = document.getElementById("container-productos");
const filtro = document.getElementById("filtro-categoria");

const rutasJSON = {
    nino: "assets/json/ropaNino.json",
    mujer: "assets/json/ropaMujer.json",
    hombre: "assets/json/ropaHombre.json"
};

function cargarProductos(categoria) {
    const ruta = rutasJSON[categoria];

    fetch(ruta)
        .then(res => res.json())
        .then(data => {
            contenedor.innerHTML = "";

            const clave = Object.keys(data)[0];
            const productos = data[clave];

            productos.forEach(producto => {
                const div = document.createElement("div");
                div.className = "producto-card";
                div.innerHTML = `
                    <div class="shadow">
                        <div class="tarjeta">
                            <img src="${producto.imagen}" alt="${producto.descripcion}">
                        </div>
                        <div class="precio">
                            <a class="nombre" href="#">${producto.descripcion}</a>
                            <span class="valor" data-precio="${producto.precio}">₡${producto.precio}</span>
                        </div>
                        <div class="detalles">
                            <small class="addtocart">
                                <a href="#" 
                                   class="btn-add" 
                                   data-id="${producto.id}" 
                                   data-nombre="${producto.descripcion}" 
                                   data-precio="${producto.precio}" 
                                   data-imagen="${producto.imagen}">
                                   Add to cart
                                </a>
                            </small>
                        </div>
                    </div>
                `;
                contenedor.appendChild(div);

                // Botón añadir al carrito
                div.querySelector(".btn-add").addEventListener("click", () => {
                    const item = {
                        id: producto.id,
                        nombre: producto.descripcion,
                        precio: producto.precio,
                        imagen: producto.imagen,
                        cantidad: 1
                    };

                    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

                    const index = carrito.findIndex(p => p.id === item.id);
                    if (index !== -1) {
                        carrito[index].cantidad += 1;
                    } else {
                        carrito.push(item);
                    }

                    localStorage.setItem("carrito", JSON.stringify(carrito));
                    alert(`${item.nombre} agregado al carrito`);
                });

            });
        })
        .catch(error => console.error("Error cargando productos:", error));
}

// Filtrado
filtro.addEventListener("change", () => {
    cargarProductos(filtro.value);
});

// Cargar productos por defecto
cargarProductos("nino");
