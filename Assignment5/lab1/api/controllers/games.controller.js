const { ObjectId } = require("mongodb");

const mongoose = require("mongoose");

const Game = mongoose.model("Game");



const runGeoQuery = (req,res)=>{
  const lat =parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lng);

  console.log('Geo search lng,lat',lng,lat);


  const query={
    'publisher.location':{
      $near:{
        $geometry:{
          type:'Point',
          coordinates:[lng,lat]
        },
        $maxDistance:1000,
        $minDistance:0
      }
    }
  }
  Game.find(query).exec(function(err,games){
    const response = {
      status: 200,
      message: games,
    };
    if(err){
      response.status=500;
      response.message=err;
    }
    // console.log('Found game', games);
    res.status(response.status).json(response.message);

  })
}

module.exports.getAllGames = (req, res) => {

  if(req.query && req.query.lat && req.query.lng){
    runGeoQuery(req,res);
    return;
  }

  let count = 5;
  let offset = 0;

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
    .exec((err, games) => {
      const response = {
        status: 200,
        message: games,
      };

      if (err) {
        response.status = 500; // status code 500 -> system error
        response.message = err;
      }
      res.status(response.status).json(response.message);
    });
};

module.exports.getOneGame = (req, res) => {
  const gameId = req.params.gameId; //get gameID from params

  Game.findById(gameId).exec((err, game) => {
    const response = {
      status: 200,
      message: game,
    };
    if (err) {
      console.log("get one game error");

      response.status = 500;
      response.message = err;
      // res.status(500).json(err);
    } else if (!game) {
      // res.status(404).json({message:"game with given ID not found"});
      response.status = 404;
      response.message = "game with given ID not found";
    }
    // else
    //  { res.status(200).json(game);}

    res.status(response.status).json(response.message);
  });
};

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
    desingers: [],
    publisher: {},
  };

  Game.create(newGame, (err, createResponse) => {
    const response = {
      status: 201,
      message: createResponse,
    };
    if (err) {
      response.status = 500;
      response.message = err;
    }

    // console.log(response.message)
    res.status(response.status).json(response.message);
  });
};

module.exports.fullUpdateOneGame = (req, res) => {
  const gameId = req.params.gameId; //get gameID from params
  console.log(gameId, "inside full update");
  Game.findById(gameId)
    .select("-reviews -pubishers")
    .exec((err, game) => {
      const response = {
        status: 204,
        message: game,
      };
      if (err) {
        console.log("get one game error");

        response.status = 500;
        response.message = err;
        // res.status(500).json(err);
      } else if (!game) {
        // res.status(404).json({message:"game with given ID not found"});
        response.status = 404;
        response.message = "game with given ID not found";
      }
      // else
      //  { res.status(200).json(game);}

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

        game.save((err, updatedGame) => {
          if (err) {
            response.status = 500;
            response.message = err;
          }
          res.status(response.status).json(response.game);
        });
      }
    });
};

module.exports.deleteOneGame = (req, res) => {
  const gameId = req.params.gameId; //get gameID from params

  Game.findByIdAndDelete(gameId).exec((err, game) => {
    const response = {
      status: 204,
      message: game,
    };
    if (err) {
      response.status = 500;
      response.message = err;
      // res.status(500).json(err);
    } else if (!game) {
      // res.status(404).json({message:"game with given ID not found"});
      response.status = 404;
      response.message = "game with given ID not found";
    }
    // else
    //  { res.status(200).json(game);}

    res.status(response.status).json();
  });
};

module.exports.partialUpdateOneGame = (req, res) => {
  const gameId = req.params.gameId; //get gameID from params
  console.log(gameId, "inside partial update");
  Game.findById(gameId)
    .select("-reviews -pubishers")
    .exec((err, game) => {
      const response = {
        status: 204,
        message: game,
      };
      if (err) {
        console.log("get one game error");

        response.status = 500;
        response.message = err;
        // res.status(500).json(err);
      } else if (!game) {
        // res.status(404).json({message:"game with given ID not found"});
        response.status = 404;
        response.message = "game with given ID not found";
      }
      // else
      //  { res.status(200).json(game);}

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

        game.save((err, updatedGame) => {
          // console.log(updatedGame,"check");
          if (err) {
            response.status = 500;
            response.message = err;
          }
          res.status(response.status).json(response.game);
        });
      }
    });
};
