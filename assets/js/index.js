// ======================
// SIGNUP
// ======================
if (document.getElementById("signupForm")) {
  document.getElementById("signupForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let email = document.getElementById("email").value.trim();
    let fullname = document.getElementById("fullname").value.trim();
    let password = document.getElementById("password").value.trim();

    localStorage.setItem("email", email);
    localStorage.setItem("fullname", fullname);
    localStorage.setItem("password", password);

    alert("Signup successful! Please log in.");
    window.location.href = "../login/index.html";
  });
}

// ======================
// LOGIN
// ======================
if (document.getElementById("loginForm")) {
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById("loginPassword").value.trim();
          
    let savedEmail = localStorage.getItem("email");
    let savedPassword = localStorage.getItem("password");

    if (email === savedEmail && password === savedPassword) {
      alert("Login successful!");
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "../dashboard/index.html";
    } else {
      alert("Invalid email or password!");
    }
  });
}

// ======================
// AUTH CHECK
// ======================
if (localStorage.getItem("isLoggedIn") !== "true" && 
    (document.body.classList.contains("dashboard-body") || document.body.classList.contains("profile-body"))) {
  window.location.href = "../login/index.html";
}

// ======================
// DASHBOARD
// ======================
if (document.body.classList.contains("dashboard-body")) {
  // Display user info
  let userName = localStorage.getItem("fullname") || "User";
  document.getElementById("userName").textContent = userName;
  document.getElementById("displayName").textContent = userName;
  document.getElementById("displayCourse").textContent = localStorage.getItem("course") || "-";
  document.getElementById("displayPhone").textContent = localStorage.getItem("phone") || "-";
  document.getElementById("displayStudentId").textContent = localStorage.getItem("studentId") || "-";
  document.getElementById("displayAge").textContent = localStorage.getItem("age") || "-";

  // Logout
  document.getElementById("logoutLink").addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("isLoggedIn");
    alert("You have logged out.");
    window.location.href = "../login/index.html";
  });
}

// ======================
// STUDENT PROFILE
// ======================
if (document.body.classList.contains("profile-body")) {
  document.getElementById("profileName").textContent = localStorage.getItem("fullname") || "-";
  document.getElementById("profileEmail").textContent = localStorage.getItem("email") || "-";
  document.getElementById("profileCourse").textContent = localStorage.getItem("course") || "-";
  document.getElementById("profilePhone").textContent = localStorage.getItem("phone") || "-";
  document.getElementById("profileStudentId").textContent = localStorage.getItem("studentId") || "-";
  document.getElementById("profileAge").textContent = localStorage.getItem("age") || "-";
}

// ======================
// MODAL (Add/Edit Info) FOR DASHBOARD & PROFILE
// ======================
const signupModal = document.getElementById("signupModal");
const openSignupBtn = document.getElementById("openSignupBtn");
const closeSignup = document.getElementById("closeSignup");
const popupSignupForm = document.getElementById("popupSignupForm");

if (openSignupBtn) {
  openSignupBtn.addEventListener("click", () => {
    // Prefill modal with current values
    document.getElementById("course").value = localStorage.getItem("course") || "";
    document.getElementById("phone").value = localStorage.getItem("phone") || "";
    document.getElementById("studentId").value = localStorage.getItem("studentId") || "";
    document.getElementById("age").value = localStorage.getItem("age") || "";
    signupModal.style.display = "flex";
  });
}

if (closeSignup) {
  closeSignup.addEventListener("click", () => {
    signupModal.style.display = "none";
  });
}

window.addEventListener("click", (e) => {
  if (e.target === signupModal) signupModal.style.display = "none";
});

if (popupSignupForm) {
  popupSignupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let course = document.getElementById("course").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let studentId = document.getElementById("studentId").value.trim();
    let age = document.getElementById("age").value.trim();

    localStorage.setItem("course", course);
    localStorage.setItem("phone", phone);
    localStorage.setItem("studentId", studentId);
    localStorage.setItem("age", age);

    alert("✅ Info saved successfully!");

    // Update dashboard fields
    if (document.getElementById("displayCourse")) document.getElementById("displayCourse").textContent = course;
    if (document.getElementById("displayPhone")) document.getElementById("displayPhone").textContent = phone;
    if (document.getElementById("displayStudentId")) document.getElementById("displayStudentId").textContent = studentId;
    if (document.getElementById("displayAge")) document.getElementById("displayAge").textContent = age;

    // Update profile page fields
    if (document.getElementById("profileCourse")) document.getElementById("profileCourse").textContent = course;
    if (document.getElementById("profilePhone")) document.getElementById("profilePhone").textContent = phone;
    if (document.getElementById("profileStudentId")) document.getElementById("profileStudentId").textContent = studentId;
    if (document.getElementById("profileAge")) document.getElementById("profileAge").textContent = age;

    popupSignupForm.reset();
    signupModal.style.display = "none";
  });
}