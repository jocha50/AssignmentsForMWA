

angular.module('jobSearchApp').factory('JobFactory',jobFactory);

function jobFactory($http){
    return {
        getAllJobs:getAllJobs,
        getOneJob:getOneJob,
        addOneJob:addOneJob,
        deleteOneJob:deleteOneJob,
        fullUpdateOneJob:fullUpdateOneJob,
        addLocation:addLocation,
        getLocation:getLocation,
        updateLocation:updateLocation,
        deleteLocation:deleteLocation,
    }

    function deleteLocation(jobId){
        return $http.delete(`/api/jobs/${jobId}/location`).then(complete).catch(failed);
    }
    function getLocation(jobId){
        return $http.get(`/api/jobs/${jobId}/location`).then(complete).catch(failed);
    }
    function updateLocation(jobId,updatedLocation){
        return $http.put(`/api/jobs/${jobId}/location`,updatedLocation).then(complete).catch(failed);

    }

    function addLocation(jobId,location){
        return $http.post(`/api/jobs/${jobId}/location`,location).then(complete).catch(failed);
    }
    function fullUpdateOneJob(jobId,updatedJob){
        return $http.put('/api/jobs/'+jobId,updatedJob).then(complete).catch(failed);
    }
    function deleteOneJob(jobId){
        return $http.delete('/api/jobs/'+jobId).then(complete).catch(failed);
    }
    function addOneJob(newJob){
        console.log('new job about to be saved',newJob)
        return $http.post('/api/jobs',newJob).then(complete).catch(failed);
    }
    function getOneJob(jobId){
        return $http.get('/api/jobs/'+jobId).then(complete).catch(failed);
    }
    function getAllJobs(){
        return $http.get('/api/jobs').then(complete).catch(failed);
    }

    function complete(response){
        console.log(response)
        return response.data;
    }
    function failed(error){
        
        console.log('inside error',error)
        return error.status.Text;
    }
}