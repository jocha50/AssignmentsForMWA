const mongoose =require('mongoose');

const Game = mongoose.model('Game');



module.exports.getAllReviews = (req,res)=>{
    const gameId = req.params.gameId;

    Game.findById(gameId).exec((err,game)=>{
        const response ={
            status: 200,
            message:game.reviews
        }
        if(err){
            response.status = 500;
            response.message=err;
        }
        
        res.status(response.status).json(response.message)
    })
}


const _addReview = (req,res,game)=>{
    console.log(req.body);

  const newReview={
      name:req.body.name,
      review:req.body.review,
      date:Date.now(),
  }


  game.reviews.push(newReview); // add the new review to the array of reviews

 
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
          response.message = savedGame.reviews
      }

      res.status(response.status).json(response.message);
  })
}



module.exports.addReview=(req,res)=>{
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
            _addReview(req,res,game);
        }
        else{
            res.status(response.status).json(response.message);
        }

  })
}