const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const User = require('../models/User');

// Create new game
router.post('/create', async (req, res) => {
  try {
    const { name, mapSize, gameMode, userId } = req.body;

    const game = new Game({
      name,
      mapSize,
      gameMode,
      owner: userId,
      players: [{
        userId,
        countryId: 'country_1',
        color: '#FF0000',
        status: 'active'
      }]
    });

    await game.save();

    res.status(201).json({
      message: 'Game created successfully',
      game
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all games
router.get('/list', async (req, res) => {
  try {
    const games = await Game.find({ status: 'waiting' }).limit(20);
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get game by ID
router.get('/:gameId', async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameId);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Join game
router.post('/:gameId/join', async (req, res) => {
  try {
    const { userId, countryId } = req.body;
    const game = await Game.findById(req.params.gameId);

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    game.players.push({
      userId,
      countryId,
      color: generateRandomColor(),
      status: 'active'
    });

    if (game.players.length >= 4) {
      game.status = 'active';
    }

    await game.save();
    res.json({ message: 'Joined game successfully', game });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

function generateRandomColor() {
  const colors = ['#FF0000', '#0000FF', '#00FF00', '#FFFF00', '#FF00FF', '#00FFFF'];
  return colors[Math.floor(Math.random() * colors.length)];
}

module.exports = router;
