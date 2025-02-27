// Datos simulados de usuarios (esto vendría del backend en un sistema real)
const users = [
    { id: 1, username: "John Doe", email: "johndoe1@daikin.com", name: "John Doe", profile: "Administrador", date: "11/02/2025" },
    { id: 2, username: "John Marston", email: "johnmarston@daikin.com", name: "John Marston", profile: "Analista", date: "12/02/2025" },
    { id: 3, username: "Sierra117", email: "john117@daikin.com", name: "John", profile: "Administrador", date: "12/02/2025" },
    { id: 4, username: "John Wick", email: "johnwick@daikin.com", name: "John Wick", profile: "Atención al Cliente", date: "13/02/2025" },
    { id: 5, username: "John Stuart", email: "johnstuart@daikin.com", name: "John Stuart", profile: "Cliente colaborador", date: "13/02/2025" },
    { id: 6, username: "John Glitch", email: "johnglitch@gmail.com", name: "John Glitch", profile: "Cliente externo", date: "15/02/2025" }
];

// Elementos del DOM
const searchInput = document.getElementById("searchInput");
const tableBody = document.querySelector("#userTable tbody");
const prevPageBtn = document.getElementById("prevPage");
const nextPageBtn = document.getElementById("nextPage");
const pageInfo = document.getElementById("pageInfo");
const backButton = document.getElementById("backButton");

const rowsPerPage = 3;
let currentPage = 1;
let filteredUsers = [...users];

// Carga la tabla
function loadTable(data) {
    tableBody.innerHTML = "";
    data.forEach(user => {
        const row = `<tr>
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.name}</td>
            <td>${user.profile}</td>
            <td>${user.date}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// Filtra la búsqueda
searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();
    filteredUsers = users.filter(user => Object.values(user).some(value => value.toString().toLowerCase().includes(searchTerm)));
    currentPage = 1;
    displayPage(currentPage);
});

// Paginación
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
