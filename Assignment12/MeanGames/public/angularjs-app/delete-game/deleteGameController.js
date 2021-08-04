angular.module('meanGames').controller('DeleteGameController',deleteGameController);


function _getStarArays(stars){
    return new Array(stars)
}
function deleteGameController($routeParams,GamesFactory){

    const vm = this;

    const gameId= $routeParams.gameId;

    GamesFactory.getOneGame(gameId).then(function(game){
        vm.game=game;
        vm.rating = _getStarArays(game.rate);

    })


    vm.deleteOneGame = function(){
        console.log('confirmed' ,vm.confirmed);
        if(vm.confirmed){
            GamesFactory.deleteOneGame(gameId).then(function(response){
                alert(`game with game ID ${gameId} has been deleted!`);
            })
        }
    }

     
}