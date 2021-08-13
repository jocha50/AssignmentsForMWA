

angular.module('travelersGuide').factory('UserFactory',userFactory);

function userFactory($http){
    return{
        registerUser:registerUser,
        logIn:logIn,
    }


    function registerUser(newUser){
        return $http.post('/api/users/register',newUser).then(complete).catch(failed);
    }

    function logIn(user){
        return $http.post('/api/users/login',user).then(complete).catch(failed);
    }

    function complete(response){
        return response.data;
    }

    function failed(error){
        return error.status.text;
    }
}