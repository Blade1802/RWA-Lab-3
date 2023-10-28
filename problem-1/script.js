// Add contact button click event
function addContact() {
    const name = document.getElementById("name").value;
    const mobile = document.getElementById("mobile").value;
    const email = document.getElementById("email").value;

    const namePattern = /^[A-Za-z\s]{1,20}$/;
    const mobilePattern = /^[0-9]{10}$/;
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    // Validation logic for name, mobile, and email fields
    if (
        !namePattern.test(name) ||
        !mobilePattern.test(mobile) ||
        !emailPattern.test(email)
    ) {
        document.getElementById("error").style.display = "block";
        return;
    }

    // Create a new row in the table
    const table = document
        .getElementById("contactTable")
        .getElementsByTagName("tbody")[0];
    const newRow = table.insertRow(table.rows.length);

    // Insert data into the new row
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    cell1.innerHTML = name;
    cell2.innerHTML = mobile;
    cell3.innerHTML = email;

    resetFields();
}

function resetFields() {
    // Reset input fields
    document.getElementById("name").value = "";
    document.getElementById("mobile").value = "";
    document.getElementById("email").value = "";

    // Reset error message
    document.getElementById("error").style.display = "none";
}

// Sorting table by name
let ascending = false;
function sortTable(column) {
    const table = document
        .getElementById("contactTable")
        .getElementsByTagName("tbody")[0];
    const rows = table.rows;
    const data = Array.from(rows);

    ascending = !ascending;
    data.sort((a, b) => {
        const aValue = a.cells[column].textContent;
        const bValue = b.cells[column].textContent;
        return ascending
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
    });

    data.forEach((row) => table.appendChild(row));
}

// Search input event
function filterContacts() {
    const searchTerm = document.getElementById("search").value;
    const table = document.getElementById("contactTable");
    const rows = table
        .getElementsByTagName("tbody")[0]
        .getElementsByTagName("tr");
    const data = Array.from(rows);

    const filteredData = data.filter((row) =>
        row.cells[1].textContent.includes(searchTerm)
    );

    if (filteredData.length === 0) {
        document.getElementById("noResult").style.display = "block";
    } else {
        document.getElementById("noResult").style.display = "none";
    }

    data.forEach((row) => (row.style.display = "none"));
    filteredData.forEach((row) => (row.style.display = "table-row"));
}

// Extra on-input validation on the input fields
document.addEventListener("DOMContentLoaded", () => {
    const nameField = document.getElementById("name");
    nameField.addEventListener("input", () => {
        nameField.value = nameField.value.replace(/[^A-Za-z\s]/g, "");
    });

    const mobileField = document.getElementById("mobile");
    mobileField.addEventListener("input", () => {
        mobileField.value = mobileField.value.replace(/[^0-9]/g, "");
    });

    const emailField = document.getElementById("email");
    emailField.addEventListener("input", () => {
        if (emailField.value.length > 40) {
            emailField.value = emailField.value.substring(0, 40);
        }
    });
});
