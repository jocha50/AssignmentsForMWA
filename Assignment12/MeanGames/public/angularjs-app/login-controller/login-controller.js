angular.module('meanGames').controller('LoginController',loginController);

function loginController($location,$window,AuthFactory,UserFactory,jwtHelper){
    const vm=this;
    vm.isLoggedIn=function(){
      
     return AuthFactory.isLoggedIn
    }

    vm.logIn=function(){

        if(vm.userName && vm.password){
            let user={
                userName: vm.userName,
                password:vm.password,
            }

            UserFactory.logIn(user).then(function(response){
                console.log('response: ',response)
                if(!response){
                    vm.error='wrong username or password'
                }
                else{
                    $window.sessionStorage.token = response.token;
                    AuthFactory.isLoggedIn= true; // the user is logged in
                    let decodedToken = jwtHelper.decodeToken(response.token);
                    vm.loggedInUser = decodedToken.userName;
                    $location.path('/'); // take the user to the main page
                }
            }).catch(function(err){
                console.log('error: ',err)
            })
        }

    }
    vm.logOut=function(){
        AuthFactory.isLoggedIn = false;
        delete $window.sessionStorage.token;
        $location.path('/');
    }
    vm.isActiveTab = function(url){
        let currentPath = $location.path().split('/')[1];
        return (url === currentPath ? 'active':'');
    }
}