angular.module('travelersGuide').factory('TravelerGuideFactory',travelerGuideFactory);



function travelerGuideFactory($http){


    return {
        getAllCountries:getAllCountries,
        getOneCountry:getOneCountry,
        addOneCountry:addOneCountry,
        updateOneCountry:updateOneCountry,
        deleteOneCountry:deleteOneCountry,
        getSomeCountries:getSomeCountries,
    }

    function getSomeCountries(offset){
        return $http.get('/api/countries?offset='+offset).then(complete).catch(failed);
    }


    function getAllCountries(){
        return $http.get('/api/countries').then(complete).catch(failed);
    }

    function getOneCountry(countryId){
        return $http.get('/api/countries/'+countryId).then(complete).catch(failed);
    }

    function addOneCountry(newCountry){
        console.log('inside factory, new country about to be added')
        return $http.post('/api/countries',newCountry).then(complete).catch(failed);
    }

    function updateOneCountry(updatedCountry,countryId){
        console.log('country is about to be updated',countryId);
        return $http.put('/api/countries/'+countryId,updatedCountry).then(complete).catch(failed);
    }

    function deleteOneCountry(countryId){
        console.log('country about to be deleted',countryId);
        return $http.delete('/api/countries/'+countryId).then(complete).catch(failed);
    }

    function complete(response){
        return response.data;
    }
    function failed(error){
        return error.status.text;
    }
}