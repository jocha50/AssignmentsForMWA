angular.module('meanGames').controller('GameController',gameController);
console.log('inside display')

function _getStarArays(stars){
    return new Array(stars)
}
function gameController($routeParams,GamesFactory){
    console.log("we here!!!!")
    const vm = this;
    const gameId = $routeParams.gameId;
    console.log('gameId',gameId)
    GamesFactory.getOneGame(gameId).then(function(game){
        vm.game=game;
        vm.rating = _getStarArays(game.rate);

        console.log('game',game)
       

    })
 
}




// function gameController($routeParams,GamesFactory){

//     const vm = this;
//     vm.title='Mean Games'

//     const gameId = $routeParams.gameId;
//     console.log('gameID',gameId)


//     GamesFactory.getOneGame(gameId).then(function (response){
//         vm.game = response;
//     })

  
// }