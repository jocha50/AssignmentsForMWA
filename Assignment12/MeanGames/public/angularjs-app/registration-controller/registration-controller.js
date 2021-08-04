angular.module('meanGames').controller('RegistrationController',registrationController);
console.log('inside registration controller')
function registrationController(UserFactory){

    const vm =this;
    vm.user={};

    vm.confirmPassword
    vm.registerUser=function(){

        console.log(vm.confirmPassword,'confirmed password');
        if(vm.confirmPassword !== vm.user.password){
           vm.error=`password must match`;
        }else{
            UserFactory.registerUser(vm.user).then(function(registeredUser){
                console.log(registeredUser)
                if(!registeredUser){
                    vm.error='sorry user name is already taken'
                }else{
                vm.error=''
                vm.registered=`user  has been registered`;
                console.log('user has been registered');}
             })
        }

    }


}