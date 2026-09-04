let currentUser = null;

// Login Form Handler
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const [email, password] = e.target.children;

  try {
    const response = await fetch(`${CONFIG.API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      currentUser = data.user;
      showScreen('menu-screen');
      updatePlayerInfo();
      initSocket();
      socket.emit('join-game', { userId: currentUser.id });
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('Giriş yapılamadı');
  }
});

// Register Form Handler
document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const inputs = e.target.children;
  const [username, email, password, country] = inputs;

  try {
    const response = await fetch(`${CONFIG.API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username.value,
        email: email.value,
        password: password.value,
        country: country.value
      })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      currentUser = data.user;
      showScreen('menu-screen');
      updatePlayerInfo();
      initSocket();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Register error:', error);
    alert('Kayıt yapılamadı');
  }
});

function switchTab(tab) {
  const forms = document.querySelectorAll('.form');
  const buttons = document.querySelectorAll('.tab-button');

  forms.forEach(f => f.classList.remove('active'));
  buttons.forEach(b => b.classList.remove('active'));

  if (tab === 'login') {
    document.getElementById('login-form').classList.add('active');
    buttons[0].classList.add('active');
  } else {
    document.getElementById('register-form').classList.add('active');
    buttons[1].classList.add('active');
  }
}

function updatePlayerInfo() {
  document.getElementById('player-name').textContent = `Oyuncu: ${currentUser.username}`;
  document.getElementById('player-country').textContent = `Ülke: ${CONFIG.COUNTRIES[currentUser.country]?.name || currentUser.country}`;
}

function logout() {
  localStorage.removeItem('token');
  currentUser = null;
  if (socket) socket.disconnect();
  showScreen('login-screen');
  document.getElementById('login-form').reset();
  document.getElementById('register-form').reset();
}
