const express = require("express");
const router = express.Router();
const controllerGames = require("../controllers/games.controller");
const controllerPublisher = require("../controllers/publisher.controller");
const reviewsController = require('../controllers/reviews.controller');

const userController = require('../controllers/users.controller');
router
  .route("/games")
  .get(controllerGames.getAllGames) // get all games
  .post(userController.authenticate,controllerGames.addOneGame); // post one game

router
  .route("/games/:gameId")
  .get(controllerGames.getOneGame)   // get one game
  .put(controllerGames.fullUpdateOneGame) // completely update one game
  .delete(controllerGames.deleteOneGame) // delete one game
  .patch(controllerGames.partialUpdateOneGame); // partially update one game

router
  .route("/games/:gameId/publisher")
  .get(controllerPublisher.getPublisher)
  .post(controllerPublisher.addPublisher);

  router.route("/games/:gameId/reviews")
  .get(reviewsController.getAllReviews)
  .post(reviewsController.addReview);


  router.route('/users/register').post(userController.registerUser);
  router.route('/users/login').post(userController.logIn);

module.exports = router;
