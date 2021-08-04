angular.module('meanGames').directive('gamesNavigation',gamesNavigation);


function gamesNavigation(){

    return{
        restrict:'E',
        templateUrl:'angularjs-app/navigation-directive/navigation.html',
        
    }
}
