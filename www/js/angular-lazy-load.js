(function(window, angular, undefined) {
	'use strict';

	angular.module('angularLazyLoad', [])

		.directive('usLazyLoadRepeatable', ['$rootScope', '$window', '$timeout', function($rootScope, $window, $timeout){
			var lazyLoad = {};

			lazyLoad.itemCount = 15;
			lazyLoad.factor = 2;

			return {
				scope: {
					lazyList: '=',
					lazyItemCount: '='
				},
				link: function(scope, element, attr) {

					lazyLoad.itemCount = (scope.lazyItemCount == null || scope.lazyItemCount == undefined) ? lazyLoad.itemCount : scope.lazyItemCount;

					lazyLoad.handler = function() {

						if (scope.lazyList == null || scope.lazyList == undefined)
							return;

						var elementBottom, remaining, shouldExtend, windowBottom;

						windowBottom = $window.innerHeight + $window.scrollY;
						elementBottom = element[0].offsetTop + element[0].clientHeight;
						remaining = elementBottom - windowBottom;
						shouldExtend = remaining <= $window.innerHeight * 0;

						if (shouldExtend) {
							$timeout(function(){
								$rootScope.cuttedList = scope.lazyList.slice(0, lazyLoad.itemCount * lazyLoad.factor);

								if (scope.lazyList.length <= lazyLoad.itemCount * lazyLoad.factor) {

									angular.element($window).off('scroll', lazyLoad.handler);
								}

								lazyLoad.factor += 1;
							});
						}
					};

					scope.$on('$destroy', function() {

						scope.lazyList = undefined;
						return angular.element($window).off('scroll', lazyLoad.handler);
					});
					
					angular.element($window).bind('scroll', lazyLoad.handler);

					if (scope.lazyList != null && scope.lazyList != undefined)
						$rootScope.cuttedList = scope.lazyList.slice(0, lazyLoad.itemCount);
				},
				controller: function($scope) {
					$scope.$watch('lazyList', function(newV, oldV){
						$timeout(function(){
							if (newV != null && newV != undefined) {
								
								$rootScope.cuttedList = undefined;
								angular.element($window).off('scroll', lazyLoad.handler);
								angular.element($window).bind('scroll', lazyLoad.handler);
								$rootScope.cuttedList = newV.slice(0, lazyLoad.itemCount);
								lazyLoad.factor = 2;
							}
						});
					});
				}
			};
		}]);
	
})(window, window.angular);
