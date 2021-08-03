angular.module("travelersGuide", ["ngRoute", "angular-jwt"]).config(config);

function config($routeProvider, $httpProvider, $locationProvider) {
  $httpProvider.interceptors.push("AuthInterceptor");

  $routeProvider
  .when("/", {
    templateUrl: "angularjs-app/welcome/welcome.html",
    access: {
      restricted: false,
    },
  })
    .when("/countries", {
      templateUrl: "angularjs-app/countries-list/countries.html",
      controller: "TravelersGuideController",
      controllerAs: "travelerCtrl",
      access: {
        restricted: false,
      },
    })
    .when("/country/:countryId", {
      templateUrl: "angularjs-app/countryDetails/country.html",
      controller: "CountryDetailsController",
      controllerAs: "countryCtrl",
      access: {
        restricted: false,
      },
    })
    .when("/addCountry", {
      templateUrl: "angularjs-app/add-country/addCountry.html",
      controller: "AddCountryController",
      controllerAs: "addCtrl",
      access: {
        restricted: false,
      },
    })
    .when("/updateCountry/:countryId", {
      templateUrl: "angularjs-app/update-country/updateCountry.html",
      controller: "UpdateCountryController",
      controllerAs: "updateCtrl",
      access: {
        restricted: false,
      },
    })
    .when("/deleteCountry/:countryId", {
      templateUrl: "angularjs-app/delete-country/deleteCountry.html",
      controller: "DeleteCountryController",
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
      templateUrl: "angularjs-app/profile/profile.html",
      access: {
        restricted: true,
      },
    });
}
