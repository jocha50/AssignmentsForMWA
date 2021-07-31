angular.module('jobSearchApp',['ngRoute']).config(config);


function config($routeProvider){
$routeProvider.when('/',{
    templateUrl:'angularjs-app/jobs-controller/jobs.html',
    controller:'JobsController',
    controllerAs:'jobsCtrl',
}).when('/jobDetails/:jobId',{
    templateUrl:'angularjs-app/job-details/jobDetails.html',
    controller:'JobDetailController',
    controllerAs:'detailCtrl'
}).when('/addJob',{
    templateUrl:'angularjs-app/add-job/addJob.html',
    controller:'AddJobController',
    controllerAs:'addCtrl'
}).when('/deleteJob/:jobId',{
    templateUrl:'angularjs-app/delete-job/deleteJob.html',
    controller:'JobDeleteController',
    controllerAs:'deleteCtrl'
}).when('/updateJob/:jobId',{
    templateUrl:'angularjs-app/update-job/updateJob.html',
    controller:'JobUpdateController',
    controllerAs:'updateCtrl'
}).when('/addLocation/:jobId',{
    templateUrl:'angularjs-app/add-location-to-job/addLocation.html',
    controller:'AddLocationController',
    controllerAs:'addLocationCtrl'
}).when('/updateLocation/:jobId',{
    templateUrl:'angularjs-app/update-location-of-job/updateLocation.html',
    controller:'UpdateLocationController',
    controllerAs:'updateLocationCtrl'
})
.otherwise({
    redirectTo:'/'
})
}