angular.module("meanGames", ["ngRoute","angular-jwt"]).config(config).run(run);
console.log("inside app");
function config($routeProvider, $httpProvider, $locationProvider) {
  $httpProvider.interceptors.push("AuthInterceptor");

  $routeProvider
    .when("/", {
      templateUrl: "angularjs-app/welcome/welcome.html",
      access: {
        restricted: false,
      },
    })
    .when("/games", {
      templateUrl: "angularjs-app/game-list/games.html",
      controller: "GamesController",
      controllerAs: "vm",
      access: {
        restricted: false,
      },
    })
    .when("/game/:gameId", {
      templateUrl: "angularjs-app/game-display/game.html",
      controller: "GameController",
      controllerAs: "vm",
      access: {
        restricted: false,
      },
    })
    .when("/editGame/:gameId", {
      templateUrl: "angularjs-app/edit-game/gameToBeEdited.html",
      controller: "EditGameController",
      controllerAs: "editCtrl",
      access: {
        restricted: false,
      },
    })
    .when("/deleteGame/:gameId", {
      templateUrl: "angularjs-app/delete-game/gameToBeDeleted.html",
      controller: "DeleteGameController",
      controllerAs: "deleteCtrl",
      access: {
        restricted: false,
      },
    })
    .when("/register", {
      templateUrl: "angularjs-app/registration-controller/register.html",
      controller: "RegistrationController",
      controllerAs: "registerCtrl",
      access: {
        restricted: false,
      },
    })
    .when("/profile", {
      templateUrl: 'angularjs-app/profile/profile.html',
      access: {
        restricted: true,
      },
    });
}

function run($rootScope, $location, $window, AuthFactory) {
  $rootScope.$on(
    "$routeChangeStart",
    function (event, nextRoute, curretnRoute) {
        
      if (
        nextRoute.access !== undefined &&
        nextRoute.access.restricted &&
        !$window.sessionStorage.token &&
        !AuthFactory.isLoggedIn
      ) {
          event.preventDefault(); 
          $location.path('/'); //force it to go to this path
      }
    }
  );
}
