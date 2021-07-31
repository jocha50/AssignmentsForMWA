angular.module('jobSearchApp').controller('JobDetailController',jobDetailController);

function jobDetailController($routeParams,JobFactory){

    const vm = this;
    const jobId = $routeParams.jobId;

    JobFactory.getOneJob(jobId).then(function(job){
        vm.job = job;
    }).catch(error=>{
        vm.error = error;
    })

}