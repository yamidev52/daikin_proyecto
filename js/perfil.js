// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    const fileInput = document.getElementById("file-input");
    const profilePic = document.getElementById("profile-pic");

    fileInput.addEventListener("change", function(event) {
        const file = event.target.files[0]; // Obtiene el archivo seleccionado
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profilePic.src = e.target.result; // Cambia la imagen de perfil
            };
            reader.readAsDataURL(file);
        }
    });
});
