angular.module('meanGames').factory('AuthFactory',authFactory);


function authFactory(){
    let auth = {
        isLoggedIn:false,
    }
    return{
        auth:auth,
    }
    
}