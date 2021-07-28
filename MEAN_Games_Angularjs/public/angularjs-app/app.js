angular.module('meanGames',['ngRoute']).config(config);
console.log('inside app')
function config($routeProvider){
    $routeProvider.when('/',{
        templateUrl:'angularjs-app/game-list/games.html',
        controller:'GamesController',
        controllerAs:'vm'
    }).when('/game/:gameId',{
        templateUrl:'angularjs-app/game-display/game.html',
        controller:'GameController',
        controllerAs:'vm'
    })
}
