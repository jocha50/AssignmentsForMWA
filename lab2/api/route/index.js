const express = require('express');
const gamesController = require('../controllers/gamesController')

const router = express.Router();
console.log("routes");

router.route('/games').get(gamesController.getGames);


module.exports = router;