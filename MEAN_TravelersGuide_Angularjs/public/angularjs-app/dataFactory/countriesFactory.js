angular.module('travelersGuide').factory('TravelerGuideFactory',travelerGuideFactory);



function travelerGuideFactory($http){


    return {
        getAllCountries:getAllCountries,
        getOneCountry:getOneCountry,
    }


    function getAllCountries(){
        return $http.get('/api/countries').then(complete).catch(failed);
    }

    function getOneCountry(countryId){
        return $http.get('/api/countries/'+countryId).then(complete).catch(failed);
    }

    function complete(response){
        return response.data;
    }
    function failed(error){
        return error.status.text;
    }
}