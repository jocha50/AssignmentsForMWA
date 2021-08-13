angular.module('travelersGuide').controller('DeleteCountryController',deleteCountryController);


function deleteCountryController($routeParams,TravelerGuideFactory){

    const vm = this;

    const countryId = $routeParams.countryId;

    TravelerGuideFactory.getOneCountry(countryId).then(function(country){
        console.log(`got country ${country.countryName}`);
        vm.country=country;
        
    })

    vm.deleteOneCountry= function(){
        if(vm.confirmed){
            TravelerGuideFactory.deleteOneCountry(vm.country._id).then(function(response){
                alert(`country Name: ${vm.country.countryName} has been deleted.`);
            })
        }
    }
}