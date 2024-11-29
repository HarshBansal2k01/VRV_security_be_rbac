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
  document.getElementById("protectedResponse").innerText =
    data.message || data.error;
}
