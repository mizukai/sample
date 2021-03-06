angular.module('audioVizApp')
  .directive('folder', function () {
    var linker = function(scope, element, attrs) {
      scope.title = attrs.title;
      scope.open = _.has(attrs, "open");
    };

    return {
      template: '<div class="folder button">' +
                  '<div class="bg">' +
                    '<ul>' +
                      '<li class="title" ng-class="{open:open}" ng-click="open=!open">{{title}}</li>' +
                      '<li class="content" ng-transclude ng-show="open" ng-animate="\'collapse\'"></li>' +
                    '</ul>' +
                  '</div></div>',
      restrict: 'E',
      transclude: true,
      scope: { open: "=?" },
      replace: true,
      link: linker
    };
  });