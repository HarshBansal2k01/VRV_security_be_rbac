const apiUrl = "http://localhost:3000/api";

// Register User
async function register() {
  const username = document.getElementById("registerUsername").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const role = document.getElementById("registerRole").value;

  const response = await fetch(`${apiUrl}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password, role }),
  });

  const data = await response.json();
  document.getElementById("registerResponse").innerText =
    data.message || data.error;
}

// Login User
async function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const response = await fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (response.ok) {
    document.getElementById("loginResponse").innerText = "Login Successful!";
    localStorage.setItem("token", data.token);
    document.getElementById("protectedSection").style.display = "block";
  } else {
    document.getElementById("loginResponse").innerText =
      data.message || data.error;
  }
}

// Access Protected Routes
async function accessProtectedRoute(route) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${apiUrl}/protected${route}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (response.ok) {
    renderProtectedPage(route, data);
  } else {
    document.getElementById("protectedResponse").innerText =
      data.message || data.error;
  }
}

function renderProtectedPage(route, data) {
  const protectedSection = document.getElementById("protectedSection");
  protectedSection.innerHTML = ""; // Clear existing content

  const header = document.createElement("h2");
  header.innerText = data.message;

  const content = document.createElement("div");

  if (route === "/admin") {
    const list = document.createElement("ul");
    data.users.forEach((user) => {
      const item = document.createElement("li");
      item.innerText = `${user.username} (${user.role})`;
      list.appendChild(item);
    });
    content.appendChild(list);
  } else if (route === "/moderator") {
    const list = document.createElement("ul");

    // Filter to only show users with role "user"
    const usersOnly = data.users.filter((user) => user.role === "User");
    usersOnly.forEach((user) => {
      const item = document.createElement("li");
      item.innerText = `${user.username} (${user.role})`;
      list.appendChild(item);
    });
    content.appendChild(list);
  } else if (route === "/user") {
    const user = data.user;
    content.innerHTML = `
      <p>Username: ${user.username}</p>
      <p>Email: ${user.email}</p>
      <p>Role: ${user.role}</p>
    `;
  }

  protectedSection.appendChild(header);
  protectedSection.appendChild(content);
}
