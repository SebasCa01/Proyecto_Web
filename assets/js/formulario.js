const app = Vue.createApp({
    data() {
        return {
            email: "",
            nombre: "",
            nacimiento: "",
            edad: "",
            ingreso: 0,
            genero: "",
            grado: []
        };
    },

    methods: {
        calcularEdad() {
            if (this.nacimiento) {
                const hoy = new Date();
                const fechaNac = new Date(this.nacimiento);
                let edad = hoy.getFullYear() - fechaNac.getFullYear();
                const m = hoy.getMonth() - fechaNac.getMonth();

                if (m < 0 || (m === 0 && hoy.getDate() < fechaNac.getDate())) {
                    edad--;
                }

                this.edad = edad;
            }
        },

        enviarFormulario() {
            console.log("Datos enviados:");
            console.log("Email:", this.email);
            console.log("Nombre:", this.nombre);
            console.log("Nacimiento:", this.nacimiento);
            console.log("Edad:", this.edad);
            console.log("Ingreso:", this.ingreso);
            console.log("Género:", this.genero);
            console.log("Grado académico:", this.grado);

            alert("Formulario enviado (simulado). Revisa la consola.");
        }
    }
});

app.mount("#app");