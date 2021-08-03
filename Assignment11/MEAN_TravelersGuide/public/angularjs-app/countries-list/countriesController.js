angular.module('travelersGuide').controller('TravelersGuideController',travelersGuideController);


function travelersGuideController(TravelerGuideFactory,AuthFactory){
    const vm = this;

    vm.offset=0;
    TravelerGuideFactory.getAllCountries().then(function (response){
      vm.countries = response;
  })
    vm.isLoggedIn=function(){
      return AuthFactory.isLoggedIn;
    }
    vm.nextPage=function(){
      vm.deactivatePrevious=false;//activate previous button
      vm.offset +=5;
      TravelerGuideFactory.getSomeCountries(vm.offset).then(function(response){
        console.log('response:',response)
          vm.countries = response;
          if(vm.countries.length < 5){
              vm.deactivateNext = true; //deactivate next button
          }
      })
  }
  vm.previousPage=function(){
      vm.deactivateNext = false; //activate next button
      
      if(vm.offset >= 5){
          vm.offset -=5;
          TravelerGuideFactory.getSomeCountries(vm.offset).then(function(response){
          vm.countries = response;
         
      })}else{
          vm.deactivatePrevious=true;
      }
  }

 
}