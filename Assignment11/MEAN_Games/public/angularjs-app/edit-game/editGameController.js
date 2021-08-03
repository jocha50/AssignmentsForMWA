angular.module('meanGames').controller('EditGameController',editGameController);



function editGameController($routeParams,GamesFactory){
    console.log("we here!!!!")
    const vm = this;
    const gameId = $routeParams.gameId;
    console.log('gameId',gameId)
    GamesFactory.getOneGame(gameId).then(function(game){
        vm.game=game;
        
    })

   vm.editOneGame=function(){
    if(vm.editGameForm.$valid){

    console.log('edited game',vm.game);
        
        GamesFactory.editOneGame(vm.game, vm.game._id).then(function(response){
            alert('game edited');
        })

       }
       else{
           
       }
   }
 
}