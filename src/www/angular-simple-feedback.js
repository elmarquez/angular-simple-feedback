/* jshint unused:false */
'use strict';

function FeedbackController ($scope, $http, $location) {
    $scope.STATES = {READY:0,FORM:1,BUTTON:2,SENT:4,SUCCESS:5,ERROR:6};
    $scope.data = {};
    $scope.recaptcha = null;
    $scope.state = $scope.STATES.READY;

    $scope.hideForm = function () {
        $scope.state = $scope.STATES.BUTTON;
    };
    $scope.setupRecaptcha = function () {
        window.onRecaptchaCallback = function () {
            $scope.recaptcha = grecaptcha.render('g-recaptcha', {sitekey: $scope.ctrl.recaptcha});
        };
    };
    $scope.showForm = function () {
        $scope.state = $scope.STATES.FORM;
    };
    $scope.submit = function () {
        // TODO validate the form
        var method = $scope.ctrl.method || 'post';
        var recaptcha = $scope.ctrl.recaptcha || null;
        var url = $scope.ctrl.url || '/feedback';
        $scope.data.referrer = $location.absUrl();
        $scope.state = $scope.STATES.SENT;
        $http
            .post(url, $scope.data)
            .then(function () {
                if ($scope.recaptcha) {
                    var response = grecaptcha.getResponse($scope.recaptcha);
                    if (!response) {
                        console.info('failed');
                    }
                }
                $scope.state = $scope.STATES.SUCCESS;
                setTimeout(function () {
                    $scope.data = {};
                    $scope.state = $scope.STATES.BUTTON;
                    $scope.$apply();
                }, 3000);
            })
            .catch(function (err) {
                console.error(err);
                $scope.state = $scope.STATES.ERROR;
                setTimeout(function () {
                    $scope.state = $scope.STATES.BUTTON;
                    $scope.$apply();
                }, 3000);
            });
    };
}

angular
    .module('simple-feedback', [])
    .controller('FeedbackController',['$scope', '$http', '$location', FeedbackController])
    .directive('feedbackWidget', [function () {
        return {
            bindToController: true,
            controller: 'FeedbackController',
            controllerAs: 'ctrl',
            link: function(scope, el, attrs, c) {
                if (attrs.recaptcha) {
                    scope.setupRecaptcha();
                }
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
