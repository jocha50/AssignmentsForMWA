const gamesData= require('../data/games.json');

module.exports.getGames= (req,res)=>{
    console.log("getGames");

    let count =gamesData.length; //all of the games in the json file.
    let offset = 0;

    if(req.query && req.query.count){
        count= parseInt(req.query.count);
       
    }

    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset);
    }

const games = gamesData.slice(offset,offset+count);

    res.status(200).send(games);
}