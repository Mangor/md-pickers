/* global moment, angular */

var module = angular.module("mdPickers", [
  "mdpTemplates",
  "ngMaterial",
  "ngAnimate",
  "ngAria"
]);

module.config(["$mdIconProvider", "$mdThemingProvider", "mdpIconsRegistry", function($mdIconProvider, $mdThemingProvider, mdpIconsRegistry) {
  angular.forEach(mdpIconsRegistry, function(icon, index) {
    $mdIconProvider.icon(icon.id, icon.url);
  });
  $mdThemingProvider.theme('default')
    .primaryPalette('light-blue')
    .accentPalette('light-blue');

  $mdThemingProvider.theme('blue')
    .primaryPalette('light-blue')
    .accentPalette('light-blue');

  $mdThemingProvider.theme('orange')
    .primaryPalette('orange')
    .accentPalette('orange');

  $mdThemingProvider.theme('purple')
    .primaryPalette('deep-purple')
    .accentPalette('deep-purple');
}]);

module.run(["$templateCache", "mdpIconsRegistry", function($templateCache, mdpIconsRegistry) {
  angular.forEach(mdpIconsRegistry, function(icon, index) {
    $templateCache.put(icon.url, icon.svg);
  });
}]);
