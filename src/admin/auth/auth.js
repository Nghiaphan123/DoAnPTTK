// Toggle between login and register
function toggleForm(form) {
  const loginContainer = document.getElementById('login-container');
  const registerContainer = document.getElementById('register-container');

  if (form === 'register') {
    loginContainer.classList.add('hidden');
    registerContainer.classList.remove('hidden');
  } else {
    registerContainer.classList.add('hidden');
    loginContainer.classList.remove('hidden');
  }
}

// Registration
const registerForm = document.getElementById('register-form');
registerForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = registerForm.querySelector('input[type="text"]').value.trim();
  const email = registerForm.querySelector('input[type="email"]').value.trim();
  const password = registerForm.querySelectorAll('input[type="password"]')[0].value;
  const confirmPassword = registerForm.querySelectorAll('input[type="password"]')[1].value;

  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  const user = { name, email, password };
  localStorage.setItem(`user_${email}`, JSON.stringify(user));
  alert('Registration successful! You can now log in.');
  toggleForm('login');
});

// Login
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = loginForm.querySelector('input[type="email"]').value.trim();
  const password = loginForm.querySelector('input[type="password"]').value;

  const storedUser = localStorage.getItem(`user_${email}`);
  if (!storedUser) {
    alert('User not found. Please register first.');
    return;
  }

  const user = JSON.parse(storedUser);
  if (user.password !== password) {
    alert('Incorrect password.');
    return;
  }

  localStorage.setItem('loggedInUser', JSON.stringify(user));
  alert('Login successful!');
  window.location.href = '../dashboard/dashboard.html'; // redirect target
});