(function($) {
    'use strict';
    var app = angular.module('app', ['ngRoute']);

    app.config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl : 'app/pages/home.html',
                controller  : 'mainController'
            });

        $locationProvider.html5Mode({
            enabled: true
        })
    });

    app.controller('mainController', function($scope) {
        $scope.message = 'Thats my home page!';
    });

    app.controller('whoNeedsController', function($scope, $http) {
        $scope.list = $http.get('who-needs.json')
                        .success(function($data) {
                            return $data;
                        })
                        .error(function($data) {
                            return null;
                        });
                        
    });

    app.run(['$rootScope', function($rootScope) {
        $rootScope.$on('$includeContentLoaded', function() {
            jQuery('.js-height-window').each(function() {
                jQuery(this).height( $(window).innerHeight() );
            });
        });
    }]);

})(jQuery);
