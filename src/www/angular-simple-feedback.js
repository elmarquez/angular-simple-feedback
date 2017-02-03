/* jshint unused:false */
'use strict';

function FeedbackController ($scope, $http, $element) {
    $scope.STATES = {READY:0,FORM:1,BUTTON:2};
    $scope.captcha = null;
    $scope.data = {};
    $scope.state = $scope.STATES.READY;

    $scope.hide = function () {
        $scope.state = $scope.STATES.BUTTON;
        console.info('state', $scope.state);
    };
    $scope.setupRecaptcha = function () {
        window.onRecaptchaCallback = function () {
            $scope.captcha = grecaptcha.render('g-recaptcha', {sitekey: $scope.ctrl.recaptcha});
        };
    };
    $scope.show = function () {
        $scope.state = $scope.STATES.FORM;
        console.info('state', $scope.state);
    };
    $scope.submit = function () {
        var method = $scope.ctrl.method || 'post';
        var recaptcha = $scope.ctrl.recaptcha || null;
        var url = $scope.ctrl.url || '/feedback';
        $http.post($scope.ctrl.url, $scope.data)
            .then(function () {
                // success
                var response = grecaptcha.getResponse($scope.captcha);
                if (!response) {
                    console.info('failed');
                }
            })
            .catch(function () {
                // error
            })
            .finally(function () {
                // reset
                $scope.data = {};
                $scope.state = $scope.STATES.SUCCESS;
            });
    };
}

angular
    .module('simple-feedback', [])
    .controller('FeedbackController',['$scope','$http','$element', FeedbackController])
    .directive('feedbackWidget', [function () {
        return {
            bindToController: true,
            controller: 'FeedbackController',
            controllerAs: 'ctrl',
            link: function(scope, el, attrs, c) {
                if (attrs.recaptcha !== null) {
                    scope.setupRecaptcha();
                }
                console.info('state', scope.state);
            },
            restrict: 'A',
            scope: {
                method: '=method',
                recaptcha: '=recaptcha',
                url: '=url'
            },
            template: '<div class="transcluded" ng-transclude></div>',
            transclude: true
        };
    }]);
