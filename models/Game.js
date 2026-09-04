const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  players: [{
    userId: mongoose.Schema.Types.ObjectId,
    countryId: String,
    color: String,
    status: String // 'active', 'defeated', 'surrendered'
  }],
  mapSize: {
    type: String,
    default: 'medium' // small, medium, large
  },
  gameMode: {
    type: String,
    default: 'conquest' // conquest, custom, survival
  },
  status: {
    type: String,
    default: 'waiting' // waiting, active, finished
  },
  units: [{
    id: String,
    type: String, // infantry, tank, aircraft, naval
    playerId: mongoose.Schema.Types.ObjectId,
    position: { x: Number, y: Number },
    health: Number,
    morale: Number
  }],
  cities: [{
    id: String,
    countryId: String,
    position: { x: Number, y: Number },
    name: String,
    income: Number,
    population: Number
  }],
  turn: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Game', gameSchema);
