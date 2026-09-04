function showScreen(screenId) {
  const screens = document.querySelectorAll('.screen');
  screens.forEach(screen => screen.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
}

function goToMainMenu() {
  showScreen('menu-screen');
}

function goToCreateGame() {
  showScreen('create-game-screen');
}

function goToGameList() {
  showScreen('game-list-screen');
  loadGames();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Check if user is already logged in
  const token = localStorage.getItem('token');
  if (token) {
    showScreen('menu-screen');
    currentUser = { id: 'temp' }; // Load from token
  } else {
    showScreen('login-screen');
  }
});