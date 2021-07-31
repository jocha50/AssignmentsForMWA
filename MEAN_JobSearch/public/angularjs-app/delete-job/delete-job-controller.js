angular.module('jobSearchApp').controller('JobDeleteController',jobDeleteController);

function jobDeleteController($routeParams,JobFactory){
    const vm = this;

    const jobId= $routeParams.jobId;

   JobFactory.getOneJob(jobId).then(function(job){
       vm.job=job;
   }).catch(error=>{
       vm.error = error;
   })


   vm.deleteOneJob=function(){
       if(vm.confirmed){
           JobFactory.deleteOneJob(vm.job._id).then(function(response){
               console.log('what is this response really?? ',response);
               vm.status=`${vm.job.title} has been deleted`
           }).catch(error=>{
               vm.error=error;
           })
       }
   }
}