angular.module('travelersGuide').directive('travelersNavigation',travelersNavigation);


function travelersNavigation(){

    return{
        restrict:'E',
        templateUrl:'angularjs-app/navigation-directive/navigation.html',
        
    }
}
