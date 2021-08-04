angular.module('meanGames').directive('gameRating',gameRating);


function gameRating(){

    return {
        restrict:'E',
        templateUrl:'./angularjs-app/gameRatingDirective/rating.html',
        bindToController:true,
        controller:'GameController',
        controllerAs:'vm'
    
    }
}