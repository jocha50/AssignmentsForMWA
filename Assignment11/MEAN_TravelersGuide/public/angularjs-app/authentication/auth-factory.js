angular.module('travelersGuide').factory('AuthFactory',authFactory);


function authFactory(){
    let auth = {
        isLoggedIn:false,
    }
    return{
        auth:auth,
    }
    
}