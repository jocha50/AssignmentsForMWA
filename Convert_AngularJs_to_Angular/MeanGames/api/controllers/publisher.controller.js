const mongoose = require('mongoose');

const Game = mongoose.model('Game');
module.exports.getPublisher=function(req,res){
    const gameId = req.params.gameId;

    Game.findById(gameId).exec((err,game)=>{
        const response ={
            status: 200,
            message:game.publisher
        }
        if(err){
            response.status = 500;
            response.message=err;
        }
        
        res.status(response.status).json(response.message)
    })
    
  }

 
  const _addPublisher = (req,res,game)=>{
      console.log(req.body);

    //   console.log(game.publisher.location);
    game.publisher.name= req.body.name;
    game.publisher.coordinates = [parseFloat(req.body.lng),parseFloat(req.body.lat)];
    game.save((err,savedGame)=>{
        const response={
            status:201,
            message:savedGame,
        }
        if(err){
            response.status=500;
            response.message=err;
        }
        else{
            response.status = 201 //updated
            response.message = savedGame.publisher
        }

        res.status(response.status).json(response.message);
    })
  }



  module.exports.addPublisher=(req,res)=>{
    const gameId = req.params.gameId;

    Game.findById(gameId).exec((err,game)=>{
        const response = {
            status: 200,
            message: game,
          };
          if(err){
            response.status=500;
            response.message=err;
          }else if(!game){
              response.status =404;
              response.message = `game with ${gameId} not found`;
          }
          if(game){
              console.log("must be here");
              _addPublisher(req,res,game);
          }
          else{
              console.log("must not be here")
              res.status(response.status).json(response.message);
          }

    })
  }