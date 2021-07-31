angular.module('jobSearchApp').controller('UpdateLocationController',updateLocationController);


function updateLocationController($routeParams,JobFactory){

    const vm = this;
    vm.jobId= $routeParams.jobId;

    JobFactory.getLocation(vm.jobId).then(function(location){
        console.log(location)
        vm.locationToBeUpdated = {
            lng:location.coordinates[0],
            lat:location.coordinates[1],
        };
        console.log(vm.locationToBeUpdated,'location to beupdated')
    })

    vm.updateLocation= function(){

        if (vm.updateLocationForm.$valid) {
            JobFactory.updateLocation(vm.jobId,vm.locationToBeUpdated).then(function (response) {
            
              vm.locationUpdated=true;
      
            }).catch(error=>{
                vm.error = error;
            });
          } else {
              console.log('form invalid')
             vm.submitError=true;
          }
          }

}