let monedaActual = "CRC"; // inicializamos en colones

document.addEventListener("DOMContentLoaded", () => {
    const monedaSelect = document.getElementById("monedaSelect");
    const base = "CRC"; // moneda original de los productos

    monedaSelect.addEventListener("change", async () => {
        monedaActual = monedaSelect.value;
        actualizarTodosPrecios(monedaActual);
    });
});

async function actualizarTodosPrecios(target) {
    const spans = document.querySelectorAll(".valor");
    spans.forEach(span => {
        const precioOriginal = parseFloat(span.dataset.precio);
        convertirYActualizar(precioOriginal, "CRC", target, span);
    });
}

async function convertirYActualizar(amount, base, target, spanElement) {
    if(target === "CRC") {
        // Si es colones, no hace fetch, solo actualiza el símbolo
        spanElement.textContent = `₡${amount}`;
        return;
    }

    const url = `https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert?from=${base}&to=${target}&amount=${amount}`;

    const options = {
        method: "GET",
        headers: {
            "x-rapidapi-key": "fba0515385msh194d29f4c41d315p10d717jsn81f16b9953d4",
            "x-rapidapi-host": "currency-conversion-and-exchange-rates.p.rapidapi.com"
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        if(data.result) {
            let simbolo = target === "USD" ? "$" : "€";
            spanElement.textContent = `${simbolo}${data.result.toFixed(2)}`;
        }
    } catch(error) {
        console.error("Error al convertir moneda:", error);
    }
}
