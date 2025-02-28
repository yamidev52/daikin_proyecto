document.addEventListener("DOMContentLoaded", function () {
    const saveButton = document.getElementById("savePermissions");

    saveButton.addEventListener("click", function () {
        const profileName = document.getElementById("profileName").value;
        const checkboxes = document.querySelectorAll(".perm");
        let selectedPermissions = [];

        // Recolectar permisos seleccionados
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedPermissions.push(checkbox.value);
            }
        });

        // Datos a enviar al backend
        const data = {
            profile: profileName,
            permissions: selectedPermissions
        };

        // Enviar datos a Django con fetch()
        fetch("/api/update-profile/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCSRFToken() // Necesario para Django
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            alert("Permisos actualizados correctamente");
        })
        .catch(error => {
            console.error("Error al actualizar permisos:", error);
        });
    });

    // Función para obtener el token CSRF de Django
    function getCSRFToken() {
        return document.cookie.split("; ")
            .find(row => row.startsWith("csrftoken="))
            ?.split("=")[1];
    }
});
