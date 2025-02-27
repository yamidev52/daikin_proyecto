function updatePermissions() {
    let selectedProfile = document.getElementById("profile").value;
    let checkboxes = document.querySelectorAll(".perm");
    
    checkboxes.forEach(checkbox => {
        let allowedProfiles = checkbox.dataset.profile.split(",");
        checkbox.checked = allowedProfiles.includes(selectedProfile);
    });
}
