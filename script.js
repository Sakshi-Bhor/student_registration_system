// Select elements
const form = document.getElementById("studentForm");
const nameInput = document.getElementById("name");
const studentIdInput = document.getElementById("studentId");
const emailInput = document.getElementById("email");
const contactInput = document.getElementById("contact");
const studentList = document.getElementById("studentList");

let students = JSON.parse(localStorage.getItem("students")) || [];

// Function to render students
function renderStudents() {
    studentList.innerHTML = "";
    students.forEach((student, index) => {
        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.studentId}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td class="actions">
                <button class="edit" onclick="editStudent(${index})">Edit</button>
                <button class="delete" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        studentList.appendChild(row);
    });
}

// Add student
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const studentId = studentIdInput.value.trim();
    const email = emailInput.value.trim();
    const contact = contactInput.value.trim();

    // Validation
    if (!/^[A-Za-z ]+$/.test(name)) {
        alert("Name should contain only letters.");
        return;
    }
    if (!/^[0-9]+$/.test(studentId)) {
        alert("Student ID should contain only numbers.");
        return;
    }
    if (!/^[0-9]{10,}$/.test(contact)) {
        alert("Contact number must be at least 10 digits.");
        return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        alert("Invalid email format.");
        return;
    }

    let student = { name, studentId, email, contact };
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
    renderStudents();

    form.reset();
});

// ======= DARK MODE TOGGLE =======
const themeToggle = document.getElementById("themeToggle");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️ Light Mode";
}

// Toggle theme with smooth fade
themeToggle.addEventListener("click", () => {
    document.body.classList.add("fade-theme"); // add temporary fade class

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeToggle.textContent = "☀️ Light Mode";
        localStorage.setItem("theme", "dark");
    } else {
        themeToggle.textContent = "🌙 Dark Mode";
        localStorage.setItem("theme", "light");
    }

    // Remove fade class after animation
    setTimeout(() => {
        document.body.classList.remove("fade-theme");
    }, 400);
});


// Edit student
function editStudent(index) {
    let student = students[index];

    nameInput.value = student.name;
    studentIdInput.value = student.studentId;
    emailInput.value = student.email;
    contactInput.value = student.contact;

    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    renderStudents();
}

// Delete student
function deleteStudent(index) {
    if (confirm("Are you sure you want to delete this record?")) {
        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        renderStudents();
    }
}

// Initial render
renderStudents();
