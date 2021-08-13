const { ObjectId } = require("mongodb");

const mongoose = require("mongoose");

const Game = mongoose.model("Game");

//************************************************************************************************************************* */
//search games
//************************************************************************************************************************* */

function __searchResultError(res, err) {
  res.status(500).json(err);
}
function __searchResult(res, games) {
  const response = {
    status: 200,
    message: games,
  };
  if (!games) {
    response.status = 404;
    response.message = "no games found";
  }
  res.status(response.status).json(response.message);
}

const runGeoQuery = (req, res) => {
  const lat = parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lng);
  let minDistance = parseFloat(req.query.minDistance);
  let maxDistance = parseFloat(req.query.maxDistance);

  if (!minDistance) {
    //minimum distance to start with
    minDistance = 0;
  }

  if (!maxDistance) {
    //maximum distance to cover
    maxDistance = 1000;
  }

  console.log("Geo search lng,lat", lng, lat);

  const query = {
    "publisher.location": {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [lng, lat],
        },
        $maxDistance: maxDistance,
        $minDistance: minDistance,
      },
    },
  };

  Game.find(query)
    .exec()
    .then(__searchResult.bind(null, res))
    .catch(__searchResultError.bind(null, res));
};
//************************************************************************************************************************* */
//get all games
//************************************************************************************************************************* */

function __getAllGames(res, games) {
  const response = {
    status: 200,
    message: games,
  };
  if (!games) {
    response.status = 404;
    response.message =
      "please make sure you are accessing the database you want. we can't find anything";
  }
  res.status(response.status).json(response.message);
}

function __getAllGamesError(res, err) {
  res.status(500).message(err);
}

module.exports.getAllGames = (req, res) => {
  if (req.query && req.query.lat && req.query.lng) {
    runGeoQuery(req, res);
    return;
  }
  if (req.query && req.query.lat && req.query.lng) {
    runGeoQuery(req, res);
    return;
  }
  let count = parseInt(process.env.COUNT);
  let offset = parseInt(process.env.OFFSET);

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
    // console.log(count);
    if (count >= 7) {
      //making sure the user sees no more than 7 games
      count = 7;
    }
  }
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }

  if (isNaN(count) || isNaN(offset)) {
    res.status(400).json({ message: "count and offset must be numbers" }); // status code 400 -> user error
  }

  Game.find()
    .skip(offset)
    .limit(count)
    .exec()
    .then(__getAllGames.bind(null, res))
    .catch(__getAllGamesError.bind(null, res));

  
};

//************************************************************************************************************************* */
//get one game
//************************************************************************************************************************* */

function __getOneGame(res, game) {
  const response = {
    status: 200,
    message: game,
  };
  if (!game) {
    response.status = 404;
    response.message = "game with given ID not found";
  }
  res.status(response.status).json(response.message);
}
function __getOneGameError(res, err) {
  res.status(500).json(err);
}

module.exports.getOneGame = (req, res) => {
  const gameId = req.params.gameId; //get gameID from params
  Game.findById(gameId)
    .exec()
    .then(__getOneGame.bind(null, res))
    .catch(__getOneGameError.bind(null, res));
};

//************************************************************************************************************************* */
//add one game
//************************************************************************************************************************* */

function __addOneGame(res, createdGame) {
  res.status(201).json(createdGame);
}
function __addOneGameError(res, err) {
  res.status(500).json(err);
}

module.exports.addOneGame = (req, res) => {
  console.log("Add one Game", req.body);

  const newGame = {
    title: req.body.title,
    year: parseInt(req.body.year, 10),
    rate: parseInt(req.body.rate, 10),
    price: parseFloat(req.body.price),
    minPlayers: parseInt(req.body.minPlayers, 10),
    maxPlayers: parseInt(req.body.maxPlayers, 10),
    minAge: parseInt(req.body.minAge, 10),
    designers: [req.body.designers],
    publisher: {
      name: req.body.name,
      country: req.body.country,
      coordinates: [],
      // location:{

      //   coordinates:[]
      // }
    },
  };
  Game.create(newGame)
    .then(__addOneGame.bind(null, res))
    .catch(__addOneGameError.bind(null, res));
};

//************************************************************************************************************************* */
//full update one game
//************************************************************************************************************************* */
function __saveGame(res, updatedGame) {
  console.log("saved!!!!");
  res.status(204).json(updatedGame);
}
function __saveGameError(res, err) {
  console.log("saving error");
  res.status(500).json(err);
}
function __fullUpdateOneGameError(res,err){
  res.status(500).json(err);
}

function __fullUpdateOneGame(req, res, game) {
  console.log('the game',game)
  const response = {
    status: 204,
    message: game,
  };
  if (!game) {
    response.status = 404;
    response.message = "game with given ID not found";
  }

  if (response.status !== 204) {
    res.status(response.status).json(response.message);
  } else {
    console.log(game.title, "about to update");
    console.log(req.body.title);
    game.title = req.body.title;
    game.year = parseInt(req.body.year, 10);
    game.rate = parseInt(req.body.rate, 10);
    game.price = parseFloat(req.body.price);
    game.minPlayers = parseInt(req.body.minPlayers, 10);
    game.maxPlayers = parseInt(req.body.maxPlayers, 10);
    game.minAge = parseInt(req.body.minAge, 10);

    game
      .save()
      .then(__saveGame.bind(null, res))
      .catch(__saveGameError.bind(null, res));
  }
}

module.exports.fullUpdateOneGame = (req, res) => {
  const gameId = req.params.gameId; //get gameID from params
  console.log(gameId, "inside full update");

    Game.findById(gameId)
    .select("-reviews -pubishers")
    .exec()
    .then(__fullUpdateOneGame.bind(null,req,res))
    .catch(__fullUpdateOneGameError.bind(null,res));      
 
};

//************************************************************************************************************************* */
//delete a game
//************************************************************************************************************************* */

function __deleteGame(res, game) {
  const response = {
    status: 204,
    message: game,
  };
  if (!country) {
    response.status = 404;
    response.message = `we don't have a game by that ID number`;
  }
  res.status(response.status).json(response.message);
}

function __deleteGameError(res, err) {
  res.status(500).json(err);
}

module.exports.deleteOneGame = (req, res) => {
  const gameId = req.params.gameId; //get gameID from params
  Game.findByIdAndDelete(gameId)
    .exec()
    .then(__deleteGame.bind(null, res))
    .catch(__deleteGameError.bind(null, res));
};



//************************************************************************************************************************* */
//partial update one game
//************************************************************************************************************************* */

function __partialUpdateOneGameError(res,err){
  res.status(500).json(err);
}
function __partialUpdateOneGame (req,res,game){
  const response = {
    status: 204,
    message: game,
  };
 if (!game) {
    // res.status(404).json({message:"game with given ID not found"});
    response.status = 404;
    response.message = "game with given ID not found";
  }


  if (response.status !== 204) {
    res.status(response.status).json(response.message);
  } else {
    console.log(game.title, "about to  partial update");

    if (req.body.title) {
      game.title = req.body.title;
    }
    if (req.body.year) {
      game.year = parseInt(req.body.year, 10);
    }
    if (req.body.rate) {
      game.rate = parseInt(req.body.rate, 10);
    }
    if (req.body.price) {
      game.price = parseFloat(req.body.price);
    }
    if (req.body.minPlayers) {
      game.minPlayers = parseInt(req.body.minPlayers, 10);
    }
    if (req.body.maxPlayers) {
      game.maxPlayers = parseInt(req.body.maxPlayers, 10);
    }
    if (req.body.minAge) {
      game.minAge = parseInt(req.body.minAge, 10);
    }
    if (req.body.country) {
      game.publisher.country = req.body.country;
    }

    game.save().then(__saveGame.bind(null,res)).catch(__saveGameError.bind(null,res));
  }
}
module.exports.partialUpdateOneGame = (req, res) => {
  const gameId = req.params.gameId; //get gameID from params
  console.log(gameId, "inside partial update");
 Game.findById(gameId)
    .select("-reviews -pubishers")
    .exec()
    .then(__partialUpdateOneGame.bind(null,req,res))
    .catch(__partialUpdateOneGameError.bind(null,res));


};
