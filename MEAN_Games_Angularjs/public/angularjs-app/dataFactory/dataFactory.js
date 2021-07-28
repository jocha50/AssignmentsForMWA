angular.module('meanGames').factory('GamesFactory',gamesFacotry);
console.log('inside datafactory')
function gamesFacotry($http){
console.log("datafactory methods")
    return {
        getAllGames:getAllGames,
        getOneGame:getOneGame,
    }

    function getOneGame(gameId){
        console.log("single game")
        return $http.get('/api/games/'+gameId).then(complete).catch(failed);
    }
    function getAllGames (){
        console.log('games');
        return $http.get('/api/games').then(complete).catch(failed);
    }

    function complete(response){
        return response.data;
    }

    function failed(error){
        return error.status.text;
    }

    

}