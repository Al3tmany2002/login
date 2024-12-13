// / select html btn, anchoe for forms
let logBtn = document.querySelector(".logBtn-l");
let regBtn = document.querySelector(".regBtn");

let loginAnchor = document.querySelector(".login-a");
let signAnchor = document.querySelector(".sign-a");

// select signup inputs, btn
let registerName = document.querySelector(".register-name");
let registerEmail = document.querySelector(".register-email");
let registerPass = document.querySelector(".register-pass");

// select login inputs
let loginEmail = document.querySelector(".login-email");
let loginPass = document.querySelector(".login-pass");

// store
let allUsers = [];

// show sign-up form
const showSignup = () => {
  document.querySelector(".login-box").classList.add("d-none");
  document.querySelector(".register-box").classList.remove("d-none");
};
// show login form
const showLogin = () => {
  document.querySelector(".login-box").classList.remove("d-none");
  document.querySelector(".register-box").classList.add("d-none");
};

// active form link to change wich to display
loginAnchor.addEventListener("click", function () {
  showLogin();
});

signAnchor.addEventListener("click", showSignup);

// save and get data from localStorage
function saveUser() {
  localStorage.setItem("allUsers", JSON.stringify(allUsers));
}

function getUser() {
  allUsers = JSON.parse(localStorage.getItem("allUsers"));
}

if (localStorage.getItem("allUsers")) {
  getUser();
}

// registration Action
regBtn.addEventListener("click", function () {
  let person = {
    name: registerName.value,
    email: registerEmail.value,
    pass: registerPass.value,
  };
  // true | false
  if (validateEmail() && validateName() && validatePass()) {
    if (checkEmail(person)) {
      // add new user
      allUsers.push(person);
      //send data to local storage
      saveUser();
      //show login form
      showLogin();
    }
  }
});

// check email for registertaion
function checkEmail(x) {
  for (let i = 0; i < allUsers.length; i++) {
    if (x.email === allUsers[i].email) {
      document.querySelector(".register-email ~ p").innerHTML =
        "this email is already exsist";
      return false;
    }
  }
  return true;
}

// login function
logBtn.addEventListener("click", function () {
  let person = {
    email: loginEmail.value,
    pass: loginPass.value,
  };

  //check if email or password is correct
  var x = checkLogin(person);
  if (x) {
    document.querySelector(".err-login").innerHTML = "logged in successfully";
    document.querySelector(".err-login").classList.remove("d-none");
    setTimeout(() => {
      window.location.href = "home.html";
    }, 2000);
  }
});

// check if mail and password is exsist
function checkLogin(x) {
  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i].email === x.email && allUsers[i].pass === x.pass) {
      document.querySelector(".err-login").classList.add("d-none");
      // set current user
      saveCurrentUser(allUsers[i].name);
      return true;
    } else {
      document.querySelector(".err-login").classList.remove("d-none");
    }
  }

  return false;
}

// save current user
function saveCurrentUser(x) {
  localStorage.setItem("currentUser", x);
}

// ===================================register validiation ===========================
// name
function validateName() {
  let nameRgx = /^[A-Z][a-z]{3,5}$/;
  if (nameRgx.test(registerName.value)) {
    document.querySelector(".register-name ~ p").innerHTML = "";
    return true;
  } else {
    document.querySelector(".register-name ~ p").innerHTML =
      "please start with [A_Z] ";
    return false;
  }
}

// email
function validateEmail() {
  let emailRgx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailRgx.test(registerEmail.value)) {
    document.querySelector(".register-email ~ p").innerHTML = "";
    return true;
  } else {
    document.querySelector(".register-email ~ p").innerHTML =
      "please enter valid email ";
    return false;
  }
}

// password
function validatePass() {
  let passREgx = /^[A-Z][a-z0-9]{3,5}$/;
  if (passREgx.test(registerPass.value)) {
    document.querySelector(".register-pass ~ p").innerHTML = "";
    return true;
  } else {
    document.querySelector(".register-pass ~ p").innerHTML =
      "invalid password , use ";
    return false;
  }
}

registerName.addEventListener("input", validateName);
registerEmail.addEventListener("input", validateEmail);
registerPass.addEventListener("input", validatePass);
