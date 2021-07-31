angular.module('jobSearchApp').controller('AddJobController',addJobController);

function addJobController(JobFactory){

    const vm = this;
    
    vm.newJob={} //to be populated from the form later on

   
    console.log(vm.addJobForm);
    vm.addOneJob=function(){

        
        if (vm.addJobForm.$valid) {
      console.log("new job", vm.newJob);
      JobFactory.addOneJob(vm.newJob).then(function (response) {
      
        vm.jobAdded=true;

      }).catch(error=>{
          vm.error = error;
      });
    } else {
        console.log('form invalid')
       vm.submitError=true;
    }
    }
  }
