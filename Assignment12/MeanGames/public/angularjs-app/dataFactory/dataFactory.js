angular.module('meanGames').factory('GamesFactory',gamesFacotry);
console.log('inside datafactory')
function gamesFacotry($http){
console.log("datafactory methods")
    return {
        getAllGames:getAllGames,
        getSomeGames:getSomeGames,
        getOneGame:getOneGame,
        addOneGame:addOneGame,
        editOneGame:editOneGame,
        deleteOneGame:deleteOneGame,
    }

    function getSomeGames(offset){
        return $http.get('/api/games?offset='+offset).then(complete).catch(failed)
    }
    function getOneGame(gameId){
        console.log("single game")
        return $http.get('/api/games/'+gameId).then(complete).catch(failed);
    }
    function getAllGames (){
        console.log('games');
        return $http.get('/api/games').then(complete).catch(failed);
    }

    function addOneGame(newGame){
        console.log('add a game')
        return $http.post('/api/games',newGame).then(complete).catch(failed);
    }

    function editOneGame(editedGame,gameId){
        console.log('edit game factory');
        return $http.put('/api/games/'+gameId,editedGame).then(complete).catch(failed);
    }

    function deleteOneGame(gameId){
        console.log(`game with ID ${gameId} is about to be deleted`);
        return $http.delete('/api/games/'+gameId).then(complete).catch(failed);
    }
    function complete(response){
        return response.data;
    }

    function failed(error){
        return error.status.text;
    }

    

}