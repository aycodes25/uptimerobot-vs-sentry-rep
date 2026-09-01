const API_URL = "/users";
const userForm = document.getElementById("user-form");
const userTableBody = document.getElementById("user-table-body");
const formStatus = document.getElementById("form-status");
const statusPanel = document.getElementById("status-panel");
const userCountEl = document.getElementById("user-count");
const resetFormBtn = document.getElementById("reset-form");
let editingId = null;

const bookData = [
    {
        title: "Atomic Habits",
        author: "James Clear",
        price: "$18",
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80"
    },
    {
        title: "Think Again",
        author: "Adam Grant",
        price: "$22",
        image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=900&q=80"
    },
    {
        title: "Dune",
        author: "Frank Herbert",
        price: "$17",
        image: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&w=900&q=80"
    },
    {
        title: "The Psychology of Money",
        author: "Morgan Housel",
        price: "$20",
        image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=900&q=80"
    }
];

function renderBooks() {
    const cards = document.getElementById("book-cards");
    if (!cards) return;

    cards.innerHTML = bookData
        .map(
            (book) => `
        <article class="book-card">
          <img class="book-image" src="${book.image}" alt="${book.title}" />
          <h3>${book.title}</h3>
          <div class="meta">${book.author}</div>
          <div class="price">${book.price}</div>
        </article>
      `
        )
        .join("");
}

function showStatus(element, message, type) {
    element.textContent = message;
    element.className = `status show ${type}`;
}

async function fetchUsers() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const users = data.users || [];
        userTableBody.innerHTML = "";

        if (!users.length) {
            userTableBody.innerHTML = '<tr><td colspan="4">No customers yet. Add the first one above.</td></tr>';
            userCountEl.textContent = "0";
            return;
        }

        userCountEl.textContent = String(users.length);

        users.forEach((user) => {
            const row = document.createElement("tr");
            row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>
          <div class="actions">
            <button class="mini-btn edit" data-action="edit" data-id="${user.id}">Edit</button>
            <button class="mini-btn delete" data-action="delete" data-id="${user.id}">Delete</button>
          </div>
        </td>
      `;
            userTableBody.appendChild(row);
        });
    } catch (error) {
        console.error(error);
    }
}

async function createUser(name, email) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to create customer");
    return data;
}

async function updateUser(id, name, email) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to update customer");
    return data;
}

async function deleteUser(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to delete customer");
    return data;
}

userForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    try {
        if (!name || !email) throw new Error("Name and email are required");

        if (editingId) {
            await updateUser(editingId, name, email);
            showStatus(formStatus, "Customer updated successfully.", "success");
        } else {
            await createUser(name, email);
            showStatus(formStatus, "Customer created successfully.", "success");
        }

        userForm.reset();
        editingId = null;
        document.querySelector("#user-form button[type='submit']").textContent = "Save customer";
        await fetchUsers();
    } catch (error) {
        showStatus(formStatus, error.message, "error");
    }
});

resetFormBtn.addEventListener("click", () => {
    userForm.reset();
    editingId = null;
    document.querySelector("#user-form button[type='submit']").textContent = "Save customer";
    showStatus(formStatus, "Form cleared.", "success");
});

userTableBody.addEventListener("click", async (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    const action = target.dataset.action;
    const id = Number(target.dataset.id);
    if (!action || !id) return;

    if (action === "edit") {
        const response = await fetch(`${API_URL}/${id}`);
        const userData = await response.json();

        if (!response.ok) {
            showStatus(formStatus, userData.message || "Unable to load customer.", "error");
            return;
        }

        document.getElementById("name").value = userData.name;
        document.getElementById("email").value = userData.email;
        editingId = id;
        document.querySelector("#user-form button[type='submit']").textContent = "Update customer";
        showStatus(formStatus, `Editing customer #${id}.`, "success");
    }

    if (action === "delete") {
        try {
            await deleteUser(id);
            showStatus(formStatus, "Customer deleted successfully.", "success");
            await fetchUsers();
        } catch (error) {
            showStatus(formStatus, error.message, "error");
        }
    }
});

document.getElementById("check-health").addEventListener("click", async () => {
    try {
        const response = await fetch("/health");
        const data = await response.json();
        showStatus(statusPanel, `Health status: ${data.status} - ${data.message}`, "success");
    } catch (error) {
        showStatus(statusPanel, "Health check failed.", "error");
    }
});

document.getElementById("trigger-error").addEventListener("click", async () => {
    try {
        const response = await fetch("/test-error");
        const data = await response.json();
        const message = data.error || data.message || "Something went wrong";
        const sentryId = data.sentryEventId || "N/A";

        showStatus(statusPanel, `Test error triggered: ${data.message || "Something went wrong"} | Sentry event ID: ${sentryId}`, "error");

        const sentryCard = document.getElementById("sentry-card");
        document.getElementById("sentry-title").textContent = "Unhandled error";
        document.getElementById("sentry-message").textContent = message;
        document.getElementById("sentry-id").textContent = sentryId;
        document.querySelector("#sentry-card .code-header").textContent = "src/server.ts: 33";
        document.getElementById("sentry-code").textContent = 'throw new Error("This is a controlled test error for Sentry");';
        sentryCard.hidden = false;
    } catch (error) {
        showStatus(statusPanel, "Test error endpoint responded as expected.", "success");
    }
});

renderBooks();
fetchUsers();
