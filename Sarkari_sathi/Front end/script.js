const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const toSignup = document.getElementById('to-signup');
const toLogin = document.getElementById('to-login');

// Toggle between Login and Signup
toSignup.onclick = (e) => {
    e.preventDefault();
    loginForm.classList.add('hidden');
    signupForm.classList.remove('hidden');
};

toLogin.onclick = (e) => {
    e.preventDefault();
    signupForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
};

// Handle Signup Logic (Saving to browser)
document.getElementById('signup-action').onsubmit = (e) => {
    e.preventDefault();
    const user = document.getElementById('reg-user').value;
    const pass = document.getElementById('reg-pass').value;

    localStorage.setItem('storedUser', user);
    localStorage.setItem('storedPass', pass);

    alert("Account created successfully! Now please log in.");
    signupForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
};

// Handle Login Logic
document.getElementById('login-action').onsubmit = (e) => {
    e.preventDefault();
    const user = document.getElementById('login-user').value;
    const pass = document.getElementById('login-pass').value;

    const savedUser = localStorage.getItem('storedUser');
    const savedPass = localStorage.getItem('storedPass');

    if (user === savedUser && pass === savedPass) {
        alert("Login Successful! Redirecting to dashboard...");
        window.location.href = "dashboard.html"; // You need to create this page!
    } else {
        alert("Invalid credentials or account not found. Please try again or create an account.");
    }
};
