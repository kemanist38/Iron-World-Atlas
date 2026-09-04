const CONFIG = {
  API_URL: 'http://localhost:3000/api',
  SOCKET_URL: 'http://localhost:3000',
  
  // Game settings
  GAME: {
    TILE_SIZE: 32,
    MAP_WIDTH: 100,
    MAP_HEIGHT: 100,
    UPDATE_INTERVAL: 100
  },

  // Unit types
  UNITS: {
    INFANTRY: {
      name: 'Piyade',
      cost: 100,
      speed: 2,
      attack: 10,
      defense: 8,
      range: 1
    },
    TANK: {
      name: 'Tank',
      cost: 500,
      speed: 3,
      attack: 25,
      defense: 15,
      range: 2
    },
    AIRCRAFT: {
      name: 'Uçak',
      cost: 800,
      speed: 5,
      attack: 30,
      defense: 5,
      range: 4
    },
    NAVAL: {
      name: 'Gemi',
      cost: 600,
      speed: 2,
      attack: 20,
      defense: 12,
      range: 3
    }
  },

  // Countries
  COUNTRIES: {
    'turkey': { name: 'Türkiye', color: '#C60C30' },
    'germany': { name: 'Almanya', color: '#000000' },
    'france': { name: 'Fransa', color: '#002395' },
    'england': { name: 'İngiltere', color: '#FFFFFF' },
    'usa': { name: 'ABD', color: '#B22234' },
    'russia': { name: 'Rusya', color: '#FFFFFF' },
    'china': { name: 'Çin', color: '#FF0000' },
    'japan': { name: 'Japonya', color: '#BC002D' }
  }
};

// Socket IO connection
let socket = null;

function initSocket() {
  socket = io(CONFIG.SOCKET_URL);
  
  socket.on('connect', () => {
    console.log('Connected to server');
  });

  socket.on('game-state', (data) => {
    console.log('Game state:', data);
  });

  socket.on('unit-moved', (data) => {
    console.log('Unit moved:', data);
    updateGameState(data);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });
}
