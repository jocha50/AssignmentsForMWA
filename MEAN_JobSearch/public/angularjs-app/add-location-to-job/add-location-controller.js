angular.module('jobSearchApp').controller('AddLocationController',addLocationController);

function addLocationController($routeParams,JobFactory){

    const vm = this;
    const jobId = $routeParams.jobId;

    vm.location ={}   //to be populated by the location form

    JobFactory.getOneJob(jobId).then(function(job){
        vm.currentJob = job;
    }).catch(error=>{
        vm.error = error;
    })
    vm.addLocation= function(){

        if (vm.addLocationForm.$valid) {

            JobFactory.addLocation(vm.currentJob._id, vm.location).then(function (response) {
            
              vm.locationAdded=true;
      
            }).catch(error=>{
                vm.error = error;
            });
          } else {
              console.log('form invalid')
             vm.submitError=true;
          }
          }
    }