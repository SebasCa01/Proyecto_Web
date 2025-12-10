let map, userMarker, destMarker;
let userLocation = null;
let directionsService, directionsRenderer;

/*Direccion de la tienda*/
const BUSINESS_LOCATION = {
    lat: 10.08175,
    lng: -84.25135
};

function waitForMapsInit() {
    if (window.google && google.maps) {
        initMap();
        startGeolocation();
    } else {
        setTimeout(waitForMapsInit, 200);
    }
}
waitForMapsInit();

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: BUSINESS_LOCATION,
        zoom: 14,
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
        suppressMarkers: true
    });

    // marcador tienda
    destMarker = new google.maps.Marker({
        position: BUSINESS_LOCATION,
        map,
        title: "Nuestra sucursal"
    });
}

function startGeolocation() {
    const statusEl = document.getElementById("status");

    if (!navigator.geolocation) {
        statusEl.textContent = "Tu navegador no permite ubicación.";
        return;
    }

    statusEl.textContent = "Obteniendo tu ubicación...";

    navigator.geolocation.getCurrentPosition(
        pos => {
            userLocation = {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            };

            statusEl.textContent = "Ubicación detectada.";

            showUserOnMap();
            calculateRoute();
        },
        err => {
            statusEl.textContent = "No se pudo obtener la ubicación.";
        },
        { enableHighAccuracy: true }
    );
}

function showUserOnMap() {
    map.setCenter(userLocation);
    map.setZoom(14);

    if (userMarker) userMarker.setMap(null);

    userMarker = new google.maps.Marker({
        position: userLocation,
        map,
        title: "Tu ubicación",
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "blue",
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: "white"
        }
    });
}

function calculateRoute() {
    directionsService.route(
        {
            origin: userLocation,
            destination: BUSINESS_LOCATION,
            travelMode: google.maps.TravelMode.DRIVING
        },
        (result, status) => {
            if (status === "OK") {
                directionsRenderer.setDirections(result);

                const leg = result.routes[0].legs[0];
                document.getElementById("status").textContent =
                    `Distancia: ${leg.distance.text} | Tiempo: ${leg.duration.text}`;
            }
        }
    );
}
