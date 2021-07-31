angular.module('jobSearchApp').controller('JobUpdateController',jobUpdateController);

function jobUpdateController($routeParams,JobFactory){

    const vm = this;

    const jobId = $routeParams.jobId;
   

    JobFactory.getOneJob(jobId).then(function(job){
        vm.jobToBeUpdated=job;
    }).catch(error=>{
        vm.error = error;
    })


    vm.updateOneJob= function(){

        if (vm.updateJobForm.$valid) {
            console.log("new job", vm.jobToBeUpdated);
            JobFactory.fullUpdateOneJob(vm.jobToBeUpdated._id, vm.jobToBeUpdated).then(function (response) {
            
              vm.jobUpdated=true;
      
            }).catch(error=>{
                vm.error = error;
            });
          } else {
              console.log('form invalid')
             vm.submitError=true;
          }
          }
    }
