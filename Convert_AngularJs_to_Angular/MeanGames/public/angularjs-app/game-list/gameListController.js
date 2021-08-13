angular.module('meanGames').controller('GamesController',gamesController);


function gamesController(GamesFactory,AuthFactory){
    const vm = this;
    vm.title='Mean Games'

vm.offset=0;
vm.deactivateButton= null;

    vm.isLoggedIn = function(){
        console.log(AuthFactory.isLoggedIn)
        return AuthFactory.isLoggedIn;
    }
    GamesFactory.getAllGames().then(function (response){
        vm.games = response;
    })

    vm.nextPage=function(){
        vm.deactivatePrevious=false;//activate previous button
        vm.offset +=5;
        GamesFactory.getSomeGames(vm.offset).then(function(response){
            vm.games = response;
            if(vm.games.length < 5){
                vm.deactivateNext = true; //deactivate next button
            }
        })
    }
    vm.previousPage=function(){
        vm.deactivateNext = false; //activate next button
        
        if(vm.offset >= 5){
            vm.offset -=5;
        GamesFactory.getSomeGames(vm.offset).then(function(response){
            vm.games = response;
           
        })}else{
            vm.deactivatePrevious=true;
        }
    }
    vm.newGame={}
    vm.addGame=function(){
        
       if(vm.gameForm.$valid){

        console.log('new game',vm.newGame)
        GamesFactory.addOneGame(vm.newGame).then(function(response){
            if(response){
                vm.status='game saved!'
            }
        })

       }
       else{
           
       }
    }
}