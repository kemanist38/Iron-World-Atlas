let currentGame = null;
let gameState = {
  units: [],
  cities: [],
  selectedUnit: null,
  turn: 0,
  myGold: 1000
};

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Create Game
document.getElementById('create-game-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const [name, mapSize, gameMode] = e.target.children;

  try {
    const response = await fetch(`${CONFIG.API_URL}/game/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        name: name.value,
        mapSize: mapSize.value,
        gameMode: gameMode.value,
        userId: currentUser.id
      })
    });

    const data = await response.json();

    if (response.ok) {
      currentGame = data.game;
      showScreen('game-screen');
      initGame();
      alert('Oyun oluşturuldu!');
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Create game error:', error);
    alert('Oyun oluşturulamadı');
  }
});

async function loadGames() {
  try {
    const response = await fetch(`${CONFIG.API_URL}/game/list`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    const games = await response.json();
    const gamesList = document.getElementById('games-list');
    gamesList.innerHTML = '';

    games.forEach(game => {
      const gameItem = document.createElement('div');
      gameItem.className = 'game-item';
      gameItem.innerHTML = `
        <h4>${game.name}</h4>
        <p>Oyuncu: ${game.players.length}/4</p>
        <p>Mod: ${game.gameMode}</p>
        <p>Harita: ${game.mapSize}</p>
      `;
      gameItem.onclick = () => joinGame(game._id);
      gamesList.appendChild(gameItem);
    });
  } catch (error) {
    console.error('Load games error:', error);
  }
}

async function joinGame(gameId) {
  try {
    const response = await fetch(`${CONFIG.API_URL}/game/${gameId}/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        userId: currentUser.id,
        countryId: currentUser.country
      })
    });

    const data = await response.json();

    if (response.ok) {
      currentGame = data.game;
      showScreen('game-screen');
      initGame();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Join game error:', error);
  }
}

function initGame() {
  generateMap();
  initializeUnits();
  initializeCities();
  startGameLoop();
  renderGame();
}

function generateMap() {
  // Map generation logic here
  console.log('Map generated');
}

function initializeUnits() {
  // Create starting units
  gameState.units = [
    { id: 1, type: 'INFANTRY', x: 10, y: 10, health: 100, morale: 100 },
    { id: 2, type: 'TANK', x: 15, y: 10, health: 150, morale: 100 }
  ];
}

function initializeCities() {
  // Create starting cities
  gameState.cities = [
    { id: 1, name: 'Başkent', x: 50, y: 50, income: 50, population: 1000 },
    { id: 2, name: 'Port Şehri', x: 60, y: 60, income: 40, population: 800 }
  ];
}

function startGameLoop() {
  setInterval(() => {
    renderGame();
  }, CONFIG.GAME.UPDATE_INTERVAL);
}

function renderGame() {
  // Clear canvas
  ctx.fillStyle = 'rgba(10, 14, 39, 0.8)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw grid
  drawGrid();

  // Draw cities
  drawCities();

  // Draw units
  drawUnits();

  // Update HUD
  updateHUD();
}

function drawGrid() {
  ctx.strokeStyle = 'rgba(255, 215, 0, 0.1)';
  ctx.lineWidth = 1;

  const tileSize = CONFIG.GAME.TILE_SIZE;

  for (let i = 0; i < canvas.width; i += tileSize) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
  }

  for (let i = 0; i < canvas.height; i += tileSize) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
    ctx.stroke();
  }
}

function drawCities() {
  gameState.cities.forEach(city => {
    const x = city.x * CONFIG.GAME.TILE_SIZE;
    const y = city.y * CONFIG.GAME.TILE_SIZE;

    // Draw city circle
    ctx.fillStyle = '#ffd700';
    ctx.beginPath();
    ctx.arc(x + CONFIG.GAME.TILE_SIZE / 2, y + CONFIG.GAME.TILE_SIZE / 2, 15, 0, Math.PI * 2);
    ctx.fill();

    // Draw city name
    ctx.fillStyle = '#000';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(city.name, x + CONFIG.GAME.TILE_SIZE / 2, y + CONFIG.GAME.TILE_SIZE / 2 + 3);
  });
}

function drawUnits() {
  gameState.units.forEach(unit => {
    const x = unit.x * CONFIG.GAME.TILE_SIZE;
    const y = unit.y * CONFIG.GAME.TILE_SIZE;

    // Draw unit square
    const unitConfig = CONFIG.UNITS[unit.type];
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(x + 2, y + 2, CONFIG.GAME.TILE_SIZE - 4, CONFIG.GAME.TILE_SIZE - 4);

    // Draw unit type
    ctx.fillStyle = '#000';
    ctx.font = '8px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(unitConfig.name, x + CONFIG.GAME.TILE_SIZE / 2, y + CONFIG.GAME.TILE_SIZE / 2);
  });
}

function updateHUD() {
  document.getElementById('current-turn').textContent = gameState.turn;
  document.getElementById('city-count').textContent = gameState.cities.length;
  document.getElementById('unit-count').textContent = gameState.units.length;
  document.getElementById('gold-amount').textContent = gameState.myGold;
  document.getElementById('game-title').textContent = currentGame.name;
}

function updateGameState(data) {
  // Update game state from server
  if (data.units) gameState.units = data.units;
  if (data.cities) gameState.cities = data.cities;
  if (data.turn) gameState.turn = data.turn;
  renderGame();
}

function recruitUnit() {
  alert('Birim Çağırma özelliği geliştirme aşamasında...');
}

function buildCity() {
  alert('Şehir Kurma özelliği geliştirme aşamasında...');
}

function endTurn() {
  gameState.turn++;
  socket.emit('end-turn', { gameId: currentGame._id, turn: gameState.turn });
  alert('Tur bitti!');
}

// Canvas click handler
canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((e.clientX - rect.left) / CONFIG.GAME.TILE_SIZE);
  const y = Math.floor((e.clientY - rect.top) / CONFIG.GAME.TILE_SIZE);

  console.log(`Clicked at: ${x}, ${y}`);

  // Check if clicked on a unit
  const unit = gameState.units.find(u => u.x === x && u.y === y);
  if (unit) {
    gameState.selectedUnit = unit;
    console.log('Unit selected:', unit);
  }
});
