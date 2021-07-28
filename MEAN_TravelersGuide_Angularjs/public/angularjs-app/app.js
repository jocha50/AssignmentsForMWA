angular.module('travelersGuide',['ngRoute']).config(config);


function config($routeProvider){
 
    $routeProvider.when('/',{
        templateUrl:'angularjs-app/countries-list/countries.html',
        controller:'TravelersGuideController',
        controllerAs:'travelerCtrl'
    }).when('/country/:countryId',{
        templateUrl:'angularjs-app/countryDetails/country.html',
        controller:'CountryDetailsController',
        controllerAs:'countryCtrl'
    })

}