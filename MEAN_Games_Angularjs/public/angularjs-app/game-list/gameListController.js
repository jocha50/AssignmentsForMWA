angular.module('meanGames').controller('GamesController',gamesController);


function gamesController(GamesFactory){
    const vm = this;
    vm.title='Mean Games'


    GamesFactory.getAllGames().then(function (response){
        vm.games = response;
    })

  
}