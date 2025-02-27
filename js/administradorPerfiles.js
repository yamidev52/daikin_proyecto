const users = [
    { id: 1, username: "John Doe", profile: "Administrador", date: "11/02/2025" },
    { id: 2, username: "John Marston", profile: "Analista", date: "12/02/2025" },
    { id: 3, username: "Sierra117", profile: "Administrador", date: "12/02/2025" }
];

const searchInput = document.getElementById("searchInput");
const tableBody = document.querySelector("#userTable tbody");
const prevPageBtn = document.getElementById("prevPage");
const nextPageBtn = document.getElementById("nextPage");
const pageInfo = document.getElementById("pageInfo");
const backButton = document.getElementById("backButton");

const rowsPerPage = 3;
let currentPage = 1;
let filteredUsers = [...users];

function loadTable(data) {
    tableBody.innerHTML = "";
    data.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.profile}</td>
            <td>${user.date}</td>
        `;
        row.addEventListener("click", () => {
            window.location.href = `detalle_usuario.html?id=${user.id}`;
        });
        tableBody.appendChild(row);
    });
}

searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();
    filteredUsers = users.filter(user => Object.values(user).some(value => value.toString().toLowerCase().includes(searchTerm)));
    currentPage = 1;
    displayPage(currentPage);
});

function displayPage(page) {
    const start = (page - 1) * rowsPerPage, end = start + rowsPerPage;
    loadTable(filteredUsers.slice(start, end));
    pageInfo.textContent = `Página ${page} de ${Math.ceil(filteredUsers.length / rowsPerPage)}`;
    prevPageBtn.disabled = page === 1;
    nextPageBtn.disabled = page >= Math.ceil(filteredUsers.length / rowsPerPage);
}

prevPageBtn.addEventListener("click", () => displayPage(--currentPage));
nextPageBtn.addEventListener("click", () => displayPage(++currentPage));
backButton.addEventListener("click", () => window.history.back());

displayPage(currentPage);
