angular.module('travelersGuide').controller('TravelersGuideController',travelersGuideController);


function travelersGuideController(TravelerGuideFactory){
    const vm = this;

  TravelerGuideFactory.getAllCountries().then(function (response){
      vm.countries = response;
  })
}