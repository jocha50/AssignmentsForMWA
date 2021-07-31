angular.module('jobSearchApp').controller('JobsController',jobsController);

function jobsController(JobFactory){
    const vm = this;
    JobFactory.getAllJobs().then(function(response){
       vm.jobs = response;
    }).catch(error=>{
        vm.error=error;
    })
}