angular
  .module("travelersGuide")
  .controller("AddCountryController", addCountryController);

function addCountryController(TravelerGuideFactory) {
  const vm = this;

  vm.newCountry = {};

  vm.addCountry = function () {
    console.log(vm.addCountryForm);
    if (vm.addCountryForm.$valid) {
      console.log("new country", vm.newCountry);
      TravelerGuideFactory.addOneCountry(vm.newCountry).then(function (response) {
      
        vm.countryAdded=true;

      });
    } else {
        console.log('form invalid')
       vm.submitError=true;
    }
  };
}
