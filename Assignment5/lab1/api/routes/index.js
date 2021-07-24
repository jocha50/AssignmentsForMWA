const express = require("express");
const router = express.Router();
const controllerGames = require("../controllers/games.controller");

router
  .route("/games")
  .get(controllerGames.getAllGames) // get all games
  .post(controllerGames.addOneGame); // post one game

router
  .route("/games/:gameId")
  .get(controllerGames.getOneGame)   // get one game
  .put(controllerGames.fullUpdateOneGame) // completely update one game
  .delete(controllerGames.deleteOneGame) // delete one game
  .patch(controllerGames.partialUpdateOneGame); // partially update one game

module.exports = router;
