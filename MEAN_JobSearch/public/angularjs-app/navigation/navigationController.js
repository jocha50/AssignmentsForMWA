angular.module('jobSearchApp').directive('jobNavigation',jobNavigation);


function jobNavigation(){
    return{
        restrict:'E',
        templateUrl:'angularjs-app/navigation/navigation.html',
    }
}