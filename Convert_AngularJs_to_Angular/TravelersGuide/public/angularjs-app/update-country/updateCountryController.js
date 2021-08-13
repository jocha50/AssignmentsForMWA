angular.module('travelersGuide').controller('UpdateCountryController',updateCountryController);
console.log('update controller');
function updateCountryController($routeParams,TravelerGuideFactory){

    const vm = this;

    const countryId = $routeParams.countryId;

    console.log('routeParams',countryId)

    TravelerGuideFactory.getOneCountry(countryId).then(function (country){
        console.log(`got country ${country.countryName}`);
        vm.country=country;
        vm.country.lng = country.coordinates[0];
        vm.country.lat = country.coordinates[1];

    })

    vm.updateCountry=function(){

         if(vm.updateCountryForm.$valid){
            TravelerGuideFactory.updateOneCountry(vm.country,vm.country._id).then(function(response){
                alert('Country updated!');
            })
         }
         else{
             vm.submitError = true;
         }
    }
}