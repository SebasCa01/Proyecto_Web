const botonMusica = document.getElementById("btn-musica");
const audio = document.getElementById("audio-musica");

let reproduciendo = false;

botonMusica.addEventListener("click", () => {
    if (!reproduciendo) {
        audio.play();
        reproduciendo = true;
        botonMusica.textContent = "⏸️"; 
    } else {
        audio.pause();
        reproduciendo = false;
        botonMusica.textContent = "🎵";
    }
});
