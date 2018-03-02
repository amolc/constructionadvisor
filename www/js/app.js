// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','starter.controllers', 'starter.services','ngCordova'])

.run(function($ionicPlatform,$cordovaStatusbar) { //,$cordovaStatusbar
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();    }
  
   // $cordovaStatusbar.style(1); //Light
  });


  
   //$cordovaStatusBar.style(2); //Black, transulcent
   //$cordovaStatusBar.style(3); //Black, opaque
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
 $ionicConfigProvider.tabs.position('bottom'); // other values: top
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'tabCtrl'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })
   .state('tab.contribute', {
      url: '/contribute',
      views: {
        'tab-contribute': {
          templateUrl: 'templates/tab-contribute.html',
          controller: 'ContributeCtrl'
        }
      }
    })

   .state('tab.success', {
      url: '/success',
      views: {
        'tab-success': {
          templateUrl: 'templates/tab-success.html',
          controller: 'ContributeCtrl'
        }
      }
    })

   .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })

   .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })


    .state('tab.search', {
      url: '/search',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab_search.html',
          controller: 'SearchCtrl'
        }
      }
    })

  .state('tab.news', {
      url: '/news',
      views: {
        'tab-news': {
          templateUrl: 'templates/tab-news.html',
          controller: 'NewsCtrl'
        }
      }
    })
    // .state('tab.search', {
    //   url: '/search',
    //   views: {
    //     'tab-search': {
    //       templateUrl: 'templates/tab_search.html',
    //       //controller: 'NewsCtrl'
    //     }
    //   }
    // })

  //  .state('tab.share', {
  //   url: "/share",
  //   views: {
  //     'tab-share': {
  //       templateUrl: "templates/share.html",
  //       controller: 'shareCtrl'
  //     }
  //   }
  // }) 
  .state('tab.share', {
    url: "/share",
        views: {
      'tab-share': {
        templateUrl: "templates/share.html",
        controller: 'shareCtrl'
      }
    }
  }) 

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
  .state('tab.notifications', {
    url: '/notifications',
    views: {
      'tab-notifications': {
        templateUrl: 'templates/tab_notifications.html',
        controller: 'NotificationCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/chats');
  
});
/*
ionicBootstrap(starter, null, {
    platforms: {
      ios: {
        statusbarPadding: true
      }
    }
  });*/