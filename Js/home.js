if (localStorage.getItem("currentUser")) {
  document.querySelector(".userName").innerHTML =
    localStorage.getItem("currentUser");
} else {
  setTimeout(() => {
    window.location.href = "index.html";
  }, 1000);
}

// select logout
let logoutBtn = document.querySelector(".logout");
// logout function
function logout() {
  localStorage.removeItem("currentUser");
}

logoutBtn.addEventListener("click", logout);
