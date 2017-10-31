angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('NewsCtrl', function($scope,$http,$ionicLoading,$ionicHistory) {
    $ionicLoading.show();
  $http.get("https://www.app.constructionadvisor.com.au/newsAPI")
    .then(function (response) {
       $ionicLoading.hide();
      $scope.news = response.data.records;
    });

})


.controller('ChatsCtrl', function($scope,$http, Chats,$ionicLoading,$ionicHistory,$timeout) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

    $(".smk_accordion").smk_Accordion();
    $('.smk_accordion').hide();
    $scope.clearHistory = function() {
        $ionicHistory.clearHistory();
    }

      $scope.doRefresh = function() {
    
        console.log('Refreshing!');
        $timeout( function() {
          //simulate async response
          $http.get("https://www.app.constructionadvisor.com.au/newsAPI")
            .then(function (response) {
              $ionicLoading.hide();
              $scope.news = response.data.records;

            });

          //Stop the ion-refresher from spinning
          $scope.$broadcast('scroll.refreshComplete');
        
        }, 300);
          
      };

    $ionicLoading.show();
    $http.get("https://www.app.constructionadvisor.com.au/newsAPI")
    .then(function (response) {
      $ionicLoading.hide();
      $scope.news = response.data.records;
      $scope.ftype = response.data.filtypes;
      $scope.fsector = response.data.filsectors;

    });

  /*$scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };*/
})

.controller('ChatDetailCtrl', function($scope, $stateParams,$http, Chats,$ionicLoading,$ionicHistory) {
  //$scope.chat = Chats.get($stateParams.chatId);
    $(".smk_accordion").smk_Accordion();
    $('.smk_accordion').hide();
    $ionicLoading.show();
      $scope.clearHistory = function() {
        $ionicHistory.clearHistory();
      }
        $http.get("https://www.app.constructionadvisor.com.au/post/"+$stateParams.chatId)
        .then(function (response) {
          $ionicLoading.hide();
          $scope.chat = response.data;

          $scope.ftype = response.data.filtypes;
          $scope.fsector = response.data.filsectors;


        });
     
})

.controller('AccountCtrl', function($scope,$http,$ionicHistory) {
  $scope.clearHistory = function() {
        $ionicHistory.clearHistory();
  }
  $http.get("https://www.app.constructionadvisor.com.au/getcategories")
    .then(function (response) {
      $scope.names = response.data.records;
    });

})


.directive('searchBar', [function () {
  return {
    scope: {
      ngModel: '='
    },
    require: ['^ionNavBar', '?ngModel'],
    restrict: 'E',
    replace: true,
    template: '<ion-nav-buttons side="right">'+
            '<div class="searchBar">'+
              '<div class="searchTxt" ng-show="ngModel.show">'+
                  '<div class="bgdiv"></div>'+
                  '<div class="bgtxt">'+
                    '<input type="text" placeholder="Search..." ng-model="ngModel.txt">'+
                  '</div>'+
                '</div>'+
                '<i class="icon placeholder-icon" ng-click="ngModel.txt=\'\';ngModel.show=!ngModel.show"></i>'+
            '</div>'+
          '</ion-nav-buttons>',
    
    compile: function (element, attrs) {
      var icon=attrs.icon
          || (ionic.Platform.isAndroid() && 'ion-android-search')
          || (ionic.Platform.isIOS()     && 'ion-ios7-search')
          || 'ion-search';
      angular.element(element[0].querySelector('.icon')).addClass(icon);
      
      return function($scope, $element, $attrs, ctrls) {
        var navBarCtrl = ctrls[0];
        $scope.navElement = $attrs.side === 'right' ? navBarCtrl.rightButtonsElement : navBarCtrl.leftButtonsElement;
        
      };
    },
    controller: ['$scope','$ionicNavBarDelegate', function($scope,$ionicNavBarDelegate){
      var title, definedClass;
      $scope.$watch('ngModel.show', function(showing, oldVal, scope) {
        if(showing!==oldVal) {
          if(showing) {
            if(!definedClass) {
              var numicons=$scope.navElement.children().length;
              angular.element($scope.navElement[0].querySelector('.searchBar')).addClass('numicons'+numicons);
            }
            
            title = $ionicNavBarDelegate.title();
            $ionicNavBarDelegate.setTitle('');
          } else {
            $ionicNavBarDelegate.setTitle(title);
          }
        } else if (!title) {
          title = $ionicNavBarDelegate.title();
        }
      });
    }]
  };
}])
