angular.module('starter.controllers', ['ngCordova'])

.controller('DashCtrl', function($scope,$cordovaToast,$cordovaDialogs,$http, $cordovaDevice) {
 /* ionic.Platform.ready(function(){
    console.log( window.device.uuid );
  });*/
  /*var device = $cordovaDevice.getDevice();
  $scope.manufacturer = device.manufacturer;
  $scope.model = device.model;
  $scope.platform = device.platform;
  $scope.uuid = device.uuid;
  console.log("platform : "+$scope.platform);
  console.log("model : "+$scope.model);
  console.log("manufacturer : "+$scope.manufacturer);
  */
  /*$scope.uuid = $cordovaDevice.getUUID();
  console.log("uuid : "+$scope.uuid);*/

  ionic.Platform.ready(function (device) {
    console.log('I am working');
    FCMPlugin.getToken(function(token){
        console.log(token);
        $http.get('https://www.app.constructionadvisor.com.au/saveuid/?UUID='+token).success(function(res) {
        $scope.response = res;
      //  console.log(res);
        if (res.status == 'false') {
           //// alert(res.message);
          } else {
            window.localStorage.setItem("UUID",$scope.uuid);
            //alert(res.message);
          }
        }).error(function() {
              // alert("Please check your internet connection or data source..");
        });
    });
   /* FCMPlugin.onTokenRefresh(function(token){
        alert( token );
    });*/
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
  /*    let push = Push.init({
        android: {
          senderID: "1034993386249",
          topics: ["appAndroid"],
          clearNotifications: "true"
        },
        ios: {
          senderID: "1034993386249",
          alert: "true",
          badge: false,
          sound: "true",
          topics: ["appIos"]
        },
        windows: {}
      });*/

      push.on('registration', (data) => {
        //TODO - send device token to server
      });

      push.on('notification', (data) => {

       // alert(JSON.stringify(data));

        if (data.additionalData.foreground) {

          let confirmAlert = this.alertCtrl.create({
            title: 'Nuova notifica',
            message: data.message,
            buttons: [{
              text: 'Ignora',
              role: 'cancel'
            }, {
              text: 'Visualizza',
              handler: () => {
                alert("redirect app aperta");
              }
            }]
          });
          confirmAlert.present();
        } else {
         if (data.additionalData.coldstart)
         {
          alert("Push notification clicked app closed");
         }
         else
         {
          alert("Push notification clicked app background");
          }
        }
      });
      push.on('error', (e) => {
        console.log(e.message);
      });
      /*var push = PushNotification.init({ "android": {"senderID": "1034993386249"}});
       push.on('registration', function(data) {
        //alert(data.registrationId);
       });

       push.on('notification', function(data) {
        //alert(data.title+" Message: " +data.message);
       });

       push.on('error', function(e) {
        alert(e);
       });*/
    /*FCMPlugin.onNotification(function(data){
        if(data.wasTapped){
          //Notification was received on device tray and tapped by the user.
          alert( JSON.stringify(data) );
        }else{
          //Notification was received in foreground. Maybe the user needs to be notified.
          alert( JSON.stringify(data) );
        }
    });*/
  });
  //window.localStorage.clear('NewsTitle');
  window.localStorage.removeItem('NewsTitle');
  /*$scope.uuid = $cordovaDevice.getUUID();
  console.log($scope.uuid);*/
  /*if(window.localStorage.getItem("UUID") === null){
      $scope.data = {};
      $scope.data.UUID = $scope.uuid;
      $scope.data.SendNotification = 'Yes';
      
      $http.get('https://www.app.constructionadvisor.com.au/saveuid/?UUID='+$scope.uuid).success(function(res) {
        $scope.response = res;
      //  console.log(res);
        if (res.status == 'false') {
          alert(res.message);
        } else {
          window.localStorage.setItem("UUID",$scope.uuid);
          alert(res.message);
        }
      }).error(function() {
            // alert("Please check your internet connection or data source..");
      });
      console.log("UUID - "+$scope.uuid);
    }*/
  //console.log(credential);
  /*window.FirebasePlugin.verifyPhoneNumber(number, timeOutDuration, function(credential) {
          console.log(credential);

          // ask user to input verificationCode:
          var code = inputField.value.toString();

          var verificationId = credential.verificationId;
          
          var signInCredential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);
          firebase.auth().signInWithCredential(signInCredential);
      }, function(error) {
          console.error(error);
      });*/

})

.controller('NewsCtrl', function($scope,$http,$ionicLoading,$ionicHistory, $cordovaDevice) {
  //window.localStorage.clear('NewsTitle');
  window.localStorage.removeItem('NewsTitle');
  $ionicLoading.show();    
  $http.get("https://www.app.constructionadvisor.com.au/newsAPI")
    .then(function (response) {
       $ionicLoading.hide();
      $scope.news = response.data.records;
    });

})
.controller('ChatsCtrl', function($scope,$http, Chats,$ionicLoading,$ionicHistory,$timeout, $cordovaDevice) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
   // window.localStorage.clear('NewsTitle');
    window.localStorage.removeItem('NewsTitle');
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
              $scope.NewsTitle = "";
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

.controller('ChatDetailCtrl', function($scope, $stateParams,$http, Chats,$ionicLoading,$ionicHistory, $cordovaDevice) {
  //$scope.chat = Chats.get($stateParams.chatId);
    $(".smk_accordion").smk_Accordion();
    $('.smk_accordion').hide();
    $ionicLoading.show();
      $scope.clearHistory = function() {
        $ionicHistory.clearHistory();
      }
      $scope.NewsTitle = "";
        $http.get("https://www.app.constructionadvisor.com.au/post/"+$stateParams.chatId)
        .then(function (response) {
          $ionicLoading.hide();
          $scope.chat = response.data;
         // $scope.NewsTitle = response.data.postTitle;
          window.localStorage.setItem('NewsTitle',response.data.postTitle);
          $scope.ftype = response.data.filtypes;
          $scope.fsector = response.data.filsectors;

        });
     
})

.controller('shareCtrl',['$scope',function($scope, $cordovaDevice) {
  //alert(window.localStorage.getItem('NewsTitle'));
   $scope.whatsappShare=function(){
    /*if(window.localStorage.getItem('NewsTitle')!=""){
      window.plugins.socialsharing.shareViaWhatsApp(window.localStorage.getItem('NewsTitle'), null, "https://www.app.constructionadvisor.com.au/details/post/"+window.localStorage.getItem('NewsTitle').replace(/\s+/g, '-').toLowerCase(), null, function(errormsg){alert("You need to install WhatsApp application to share this news")});  
    }*/
    if(window.localStorage.getItem('NewsTitle') === null){
      //alert("without news");
      window.plugins.socialsharing.shareViaWhatsApp('Construction Advisor', null /* img */, "https://play.google.com/store/apps/details?id=com.constructionadvisor.ask" /* url */, null, function(errormsg){alert("You need to install WhatsApp application to share this news")});  
    }else{
      window.plugins.socialsharing.shareViaWhatsApp(window.localStorage.getItem('NewsTitle'), null, "https://www.app.constructionadvisor.com.au/details/post/"+window.localStorage.getItem('NewsTitle').replace(/\s+/g, '-').toLowerCase(), null, function(errormsg){alert("You need to install WhatsApp application to share this news")});  
    }
    
  }
  
  $scope.twitterShare=function(){
    if(window.localStorage.getItem('NewsTitle') === null){
            window.plugins.socialsharing.shareViaTwitter('Construction Advisor', null /* img */, 'https://play.google.com/store/apps/details?id=com.constructionadvisor.ask', null, function(errormsg){alert("'You need to install Twitter application to share this news'")});

    }else{
            window.plugins.socialsharing.shareViaTwitter(window.localStorage.getItem('NewsTitle'), null /* img */, "https://www.app.constructionadvisor.com.au/details/post/"+window.localStorage.getItem('NewsTitle').replace(/\s+/g, '-').toLowerCase() /* url */, null, function(errormsg){alert("'You need to install WhatsApp application to share this news'")});  

    }
  }
   $scope.OtherShare=function(){
    if(window.localStorage.getItem('NewsTitle') === null){
           window.plugins.socialsharing.share('Construction Advisor', null, null, 'https://play.google.com/store/apps/details?id=com.constructionadvisor.ask');

    }else{
           window.plugins.socialsharing.share(window.localStorage.getItem('NewsTitle'), null /* img */, "https://www.app.constructionadvisor.com.au/details/post/"+window.localStorage.getItem('NewsTitle').replace(/\s+/g, '-').toLowerCase() /* url */, null, function(errormsg){alert("'You need to install WhatsApp application to share this news'")});  

    }
  }
}])
.controller('AccountCtrl', function($scope,$http,$ionicHistory) {
  $scope.clearHistory = function() {
        $ionicHistory.clearHistory();
  }
   window.localStorage.removeItem('NewsTitle');
  $http.get("https://www.app.constructionadvisor.com.au/getcategories")
    .then(function (response) {
      $scope.names = response.data.records;
    });

})

.controller('NotificationCtrl', function($scope,$http,$ionicHistory) {
  $scope.clearHistory = function() {
        $ionicHistory.clearHistory();
  }
   window.localStorage.removeItem('NewsTitle');
   $scope.notify = function() {
          console.log(this.val());
    };
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
