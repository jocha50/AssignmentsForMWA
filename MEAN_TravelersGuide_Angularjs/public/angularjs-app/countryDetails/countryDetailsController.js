angular.module('travelersGuide').controller('CountryDetailsController',countryDetailsController);

function countryDetailsController($routeParams,TravelerGuideFactory){


    const vm = this;


    const countryId= $routeParams.countryId;


    TravelerGuideFactory.getOneCountry(countryId).then(function (country){

        console.log('country',country)
        vm.country=country;
    })

}