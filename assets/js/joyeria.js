const contenedorJoyeria = document.getElementById("container-productos");

fetch('../assets/json/joyeria.json')
    .then(res => res.json())
    .then(data => {
        contenedorJoyeria.innerHTML = ""; // limpiar antes de agregar

        data.joyeria.forEach(producto => {
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
            contenedorJoyeria.appendChild(div);

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
    .catch(err => console.error("Error cargando productos:", err));
