angular.module('starter.controllers', ['ngCordova','ui.bootstrap'])

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
   // Load the modal from the given template URL



  ionic.Platform.ready(function (device) {
    console.log('I am working');
    window.localStorage.removeItem('NewsTitle');
    window.localStorage.removeItem('NewsImage');
    window.localStorage.removeItem('postID');
    window.localStorage.removeItem("SendNotification");
    FCMPlugin.getToken(function(token){
        console.log(token);
        $scope.devicetoken = token;
        $http.get('https://www.app.constructionadvisor.com.au/saveuid/?UUID='+token).success(function(res) {
        $scope.response = res;
      //  console.log(res);
        if (res.status == 'false') {
           //// alert(res.message);
          } else {
            window.localStorage.setItem("UUID",$scope.devicetoken);
            //alert(res.message);
          }
        }).error(function() {
              // alert("Please check your internet connection or data source..");
        });

        
    });
   
   if(window.localStorage.getItem("UUID") !== null){
      $http.get("https://www.app.constructionadvisor.com.au/getnotifystatus?uuid="+ window.localStorage.getItem("UUID"))
          .then(function (response) {
            window.localStorage.setItem("SendNotification",response.data.SendNotification);
         //  console.log(response);
           console.log(response.data.SendNotification);
           // $scope.notifyMe.SendNotification = response.status;
      });
    }
  
  });
  //window.localStorage.clear('NewsTitle');

  /*$scope.uuid = $cordovaDevice.getUUID();
  console.log($scope.uuid);*/
  if(window.localStorage.getItem("UUID") === null){
      $scope.data = {};
     // $scope.data.UUID = $scope.device.token;
      //$scope.data.SendNotification = 'Yes';
      
      $http.get('https://www.app.constructionadvisor.com.au/saveuid/?UUID='+$scope.devicetoken).success(function(res) {
        $scope.response = res;
      //  console.log(res);
        if (res.status == 'false') {
          //alert(res.message);
        } else {
          window.localStorage.setItem("UUID",$scope.devicetoken);
          //alert(res.message);
        }
      }).error(function() {
            // alert("Please check your internet connection or data source..");
      });
      console.log("UUID - "+$scope.devicetoken);
    }
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
  
  $ionicLoading.show();    
  $http.get("https://www.app.constructionadvisor.com.au/newsAPI")
    .then(function (response) {
       $ionicLoading.hide();
        window.localStorage.clear();
      $scope.news = response.data.records;
    });

})

.controller('ContributeCtrl', function($scope,$http,$ionicLoading,$ionicHistory, $cordovaDevice) {

  //alert('hi');

    var attachmentfile1 = [];
    var filelength;

     $scope.fileinit = function(ele) {
        $scope.attachmentCount = {};
        $scope.attachment = {};
        $scope.imgSrc = "";

        window.localStorage.clear();

    };



    $scope.updateattachment = function(file_browse) {

        var fileDisplayArea = document.getElementById('fileDisplayArea');
        // console.log(fileDisplayArea)
        if (file_browse == 'file_browse1') {
            var newfile = document.getElementById("file_browse1").files;
        }            
        var imageType = /image.*/;

         function readAndPreview(file) {

          // Make sure `file.name` matches our extensions criteria
          if ( /\.(jpe?g|png|gif)$/i.test(file.name) ) {
            var reader = new FileReader();

             reader.onloadend = function(evt) {
              var image = new Image();
              image.height = 100;
              image.title = file.name;
              image.class = 'avatar img-circle img-thumbnail';
              image.src = this.result;
              //attachmentfile1.push(this.result); 
              attachmentfile1[0] = this.result;
               $("#filename").val(file.name);
              // $scope.product.imagename = file.name;
              // $scope.info.ProfilePic = file.name;
              
              /*if(filelength==index){
                callback(attachmentfile1);
              }*/
              imagepreview.appendChild( image );
            };

            reader.readAsDataURL(file);
          }

        }

        if (newfile) {
          filelength = newfile.length;
          /*var index=0;
          for (var i = 0; i < newfile.length; i++) {
              readAndPreview(newfile[i],function(){
                console.log("done");
              });
              if(i==(newfile.length-1))
                console.log(attachmentfile1);

          };*/

          [].forEach.call(newfile,readAndPreview);
          setTimeout(function() { 
            //console.log(attachmentfile1);
            //$scope.attachment.images = attachmentfile1;
            $("#image").val(attachmentfile1);
            //$scope.userdetails.profile_image = attachmentfile1[0];
            //$scope.attachmentCount.imagecount = attachmentfile1.length;
            //$scope.parameters.attachment = "testes testett";//{images:attachmentfile1};
            //$scope.parameters.attachment = JSON.stringify(images); 
            //$scope.addProduct($scope.parameters);
            //console.log(attachmentfile1); 
          }, 100);
          
        }
        
    }



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
    ionic.Platform.ready(function (device) {
    console.log('I am working');
    window.localStorage.removeItem('NewsTitle');
    window.localStorage.removeItem('NewsImage');
    window.localStorage.removeItem('postID');
    window.localStorage.removeItem("SendNotification");
    FCMPlugin.getToken(function(token){
        console.log(token);
        $scope.devicetoken = token;
        $http.get('https://www.app.constructionadvisor.com.au/saveuid/?UUID='+token).success(function(res) {
        $scope.response = res;
      //  console.log(res);
        if (res.status == 'false') {
           //// alert(res.message);
          } else {
            window.localStorage.setItem("UUID",$scope.devicetoken);
            //alert(res.message);
          }
        }).error(function() {
              // alert("Please check your internet connection or data source..");
        });

        
    });
   
   if(window.localStorage.getItem("UUID") !== null){
      $http.get("https://www.app.constructionadvisor.com.au/getnotifystatus?uuid="+ window.localStorage.getItem("UUID"))
          .then(function (response) {
            window.localStorage.setItem("SendNotification",response.data.SendNotification);
         //  console.log(response);
           console.log(response.data.SendNotification);
           // $scope.notifyMe.SendNotification = response.status;
      });
    }
  
  });

     $ionicLoading.show();
     $scope.noMoreItemsAvailable = true;
    window.localStorage.removeItem('NewsTitle');
    $(".smk_accordion").smk_Accordion();
    $('.smk_accordion').hide();
    $scope.clearHistory = function() {
        $ionicHistory.clearHistory();
    }

    $(".searchform").show();
      $("#newsresults").hide();
        

      $scope.doRefresh = function() {
    
        console.log('Refreshing!');
        
        $timeout( function() {
          //simulate async response
          $http.get("https://www.app.constructionadvisor.com.au/newsAPI")
            .then(function (response) {
              $ionicLoading.hide();
              $scope.NewsTitle = "";
              $scope.news = response.data.records;
              $scope.myInterval = 1000;
              $scope.slides = response.data.featured;
              $scope.offset = 0 ;
              $scope.noMoreItemsAvailable = false;

     
            });

          //Stop the ion-refresher from spinning
          $scope.$broadcast('scroll.refreshComplete');
        
        }, 300);
          
      };

      $scope.loadMore = function() {

        $scope.noMoreItemsAvailable = true;
        $scope.offset =  $scope.offset+5;
        //alert( $scope.offset);
        $http.get("https://www.app.constructionadvisor.com.au/fetchnews/"+$scope.offset)
            .then(function (response) {

                  //console.log(response.data.records.length);
                  if (response.data.records.length == 0)
                  {

                  }
                  else
                  {
                      $scope.noMoreItemsAvailable = false;
                     for(var i=0; i<response.data.records.length; i++) {
                      $scope.news.push(response.data.records[i]);
                     } 
                   
                  }
                 
     
            });
       
       
        $scope.$broadcast('scroll.infiniteScrollComplete');
      };
    
    //$ionicLoading.show();
    
    $http.get("https://www.app.constructionadvisor.com.au/newsAPI")
    .then(function (response) {
      $ionicLoading.hide();
      $scope.news = response.data.records;
      $scope.myInterval = 1000;
      $scope.slides = response.data.featured;
      $scope.offset = 0 ;
      $scope.noMoreItemsAvailable = false;
      if($scope.slides.length>0)
      {

        $.each($scope.slides,function (index, value) { 

                var content = '<div class="swiper-slide"><a href="#/tab/chats/'+value.postID+'"><img src="'+value.thumbnail+'" alt="" title=""><div class="carousel-caption banner-text"><em class="color-white">FEATURED</em><h4 class="color-white">'+value.postTitle+'</h4><span class="color-white">by Construction Advisor</span></div></a></div>';
                $('.swiper-wrapper').append(content);

        });

        
        var swiper = new Swiper('.swiper-container', {
                spaceBetween: 30,
                centeredSlides: true,
                loop: true,
                autoplay: {
                  delay: 3000,
                  disableOnInteraction: false,
                },
                pagination: {
                  el: '.swiper-pagination',
                  clickable: true,
                },
                navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                },
              });
      }


   
      

    });

     $scope.OtherShare=function(){

      window.plugins.socialsharing.share('Construction Advisor', null, null, 'https://play.google.com/store/apps/details?id=com.constructionadvisor.ask');


   // alert('hi');
    // if(window.localStorage.getItem('NewsTitle') === null){
      //window.plugins.socialsharing.share('Construction Advisor', null, null, 'https://play.google.com/store/apps/details?id=com.constructionadvisor.ask');
    // }else{
    //   window.plugins.socialsharing.share(window.localStorage.getItem('NewsTitle'), null /* img */, "https://www.constructionadvisor.com.au/article/"+window.localStorage.getItem('NewsTitle').replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-').toLowerCase()+'/'+window.localStorage.getItem('postID') /* url */, null, function(errormsg){alert("'You need to install selected application to share this news'")});  
    // }
  }

      

   

  /*$scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };*/
})

.controller('SearchCtrl', function($scope, $stateParams,$http, Chats,$ionicLoading,$ionicHistory, $cordovaDevice) {
  //$scope.chat = Chats.get($stateParams.chatId);

    $ionicLoading.show();
      $scope.clearHistory = function() {
        $ionicHistory.clearHistory();
      }

      $http.get("https://www.app.constructionadvisor.com.au/getfilters")
    .then(function (response) {
      $ionicLoading.hide();
      $scope.ftype = response.data.filtypes;
      $scope.fsector = response.data.filsectors;

    });

    $('#srchlink').hide();

     $scope.search_news = function() {

     
      $(".searchform").show();
      $("#btnsearch").show();

      $("#newsresults").hide();

      URL = 'https://www.app.constructionadvisor.com.au/search_news'
               // alert(URL);
                 $.ajax({
                 type: "POST",
                 url: URL,
                 data: $("#searchform").serialize(),
                 dataType :'json',
                 success: function(data)
                 {  
                    window.localStorage.removeItem('NewsTitle');
                     window.localStorage.removeItem('NewsImage');
                     window.localStorage.removeItem('postID');
                     window.localStorage.clear();
                     //$scope.searchresults = {};
                     $(".searchform").hide();
                     $("#btnsearch").hide();
                     //$scope.searchresults = data.records;
                     $("#newsresults").html('');
                     $("#newsresults").show();
                     $('#srchlink').show();

                     $.each(data.records,function (index, value) { 

                     // var content = ' <div class="col-sm-12 col-xs-12"><a href="#/tab/chats/'+value.postID+'"><div class="news-block"><div class="block-left"><div class="block-img"><img src="'+value.postImage+'" alt="" title=""></div></div><div class="block-right"><div class="block-text"><p>'+value.categoryTitle+'</p><h4>'+value.postTitle+'</h4><div class="news-time"><span>'+value.datePosted+'</span></div></div></div><div class="clearfix"></div></div></a></div>';
                     var content = '<div class="news-block-wrap"><ion-item><ion-thumbnail item-start><div class="news-img"><img src="'+value.thumbnail+'"/></div></ion-thumbnail><div class="news-block-tab"><p>'+value.categoryTitle+'</p><h2><a href="#/tab/chats/'+value.postID+'">'+value.postTitle+'</a></h2><span ion-button clear item-end>'+value.datePosted+'</span></div></ion-item><div class="clearfix"></div></div>';
                    // console.log(content);
                    $("#newsresults").append(content);
                   
                 });
    
                  
                 },
                });
    
        
          
      };

    
  
     
})


.controller('ChatDetailCtrl', function($scope, $stateParams,$http, Chats,$ionicLoading,$ionicHistory, $cordovaDevice) {
  //$scope.chat = Chats.get($stateParams.chatId);
    $(".smk_accordion").smk_Accordion();
    $('.smk_accordion').hide();
    $ionicLoading.show();
      $scope.clearHistory = function() {
        $ionicHistory.clearHistory();
      }

       $scope.OtherShare=function(){

   // alert('hi');
    if(window.localStorage.getItem('NewsTitle') === null){
      window.plugins.socialsharing.share('Construction Advisor', null, null, 'https://play.google.com/store/apps/details?id=com.constructionadvisor.ask');
    }else{
      //window.plugins.socialsharing.share(window.localStorage.getItem('NewsTitle'), null /* img */, "https://www.constructionadvisor.com.au/article/"+window.localStorage.getItem('NewsTitle').replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-').toLowerCase()+'/'+window.localStorage.getItem('postID') /* url */, null, function(errormsg){alert("'You need to install selected application to share this news'")});  

      window.plugins.socialsharing.share(window.localStorage.getItem('NewsTitle'), null /* img */, "https://www.constructionadvisor.com.au/article/"+window.localStorage.getItem('NewsTitle').replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-').toLowerCase()+'/'+window.localStorage.getItem('postID') /* url */, null, function(errormsg){});  
    }
  }
      $scope.NewsTitle = "";
        $http.get("https://www.app.constructionadvisor.com.au/post/"+$stateParams.chatId)
        .then(function (response) {
          $ionicLoading.hide();
          $scope.chat = response.data;
         // $scope.NewsTitle = response.data.postTitle;
          window.localStorage.setItem('NewsTitle',response.data.postTitle);
          window.localStorage.setItem('NewsImage',response.data.thumbnail);
          window.localStorage.setItem('postID',response.data.postID);

          $scope.ftype = response.data.filtypes;
          $scope.fsector = response.data.filsectors;

        });
     
})

.controller('shareCtrl',['$scope',function($scope, $cordovaDevice) {
  //alert(window.localStorage.getItem('NewsTitle'));
  $scope.clearHistory = function() {
        $ionicHistory.clearHistory();
      }



   $scope.whatsappShare=function(){
    /*if(window.localStorage.getItem('NewsTitle')!=""){
      window.plugins.socialsharing.shareViaWhatsApp(window.localStorage.getItem('NewsTitle'), null, "https://www.app.constructionadvisor.com.au/details/post/"+window.localStorage.getItem('NewsTitle').replace(/\s+/g, '-').toLowerCase(), null, function(errormsg){alert("You need to install WhatsApp application to share this news")}); window.localStorage.getItem('postID')  
    }*/
    if(window.localStorage.getItem('NewsTitle') === null){
      //alert("without news");
      window.plugins.socialsharing.shareViaWhatsApp('Construction Advisor', null /* img */, "https://play.google.com/store/apps/details?id=com.constructionadvisor.ask" /* url */, null, function(errormsg){alert("You need to install WhatsApp application to share this news")});  
    }else{
      window.plugins.socialsharing.shareViaWhatsApp(window.localStorage.getItem('NewsTitle'),  null /* img */, "https://www.constructionadvisor.com.au/article/"+window.localStorage.getItem('NewsTitle').replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-').toLowerCase()+'/'+window.localStorage.getItem('postID'), null, function(errormsg){alert("You need to install WhatsApp application to share this news")});  
    }
  }
  
  $scope.twitterShare=function(){
    if(window.localStorage.getItem('NewsTitle') === null){
      window.plugins.socialsharing.shareViaTwitter('Construction Advisor', null /* img */, 'https://play.google.com/store/apps/details?id=com.constructionadvisor.ask', null, function(errormsg){alert("'You need to install Twitter application to share this news'")});
    }else{
      window.plugins.socialsharing.shareViaTwitter(window.localStorage.getItem('NewsTitle'), null /* img */, "https://www.constructionadvisor.com.au/article/"+window.localStorage.getItem('NewsTitle').replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-').toLowerCase()+'/'+window.localStorage.getItem('postID') /* url */, null, function(errormsg){alert("'You need to install twitter application to share this news'")});  
    }
  }
  $scope.facebookShare=function(){
    if(window.localStorage.getItem('NewsTitle') === null){
      window.plugins.socialsharing.shareViaFacebook('Construction Advisor', null /* img */, 'https://play.google.com/store/apps/details?id=com.constructionadvisor.ask', null, function(errormsg){alert("'You need to install facebook application to share this news'")});
    }else{
      window.plugins.socialsharing.shareViaFacebook(window.localStorage.getItem('NewsTitle'), null /* img */, "https://www.constructionadvisor.com.au/article/"+window.localStorage.getItem('NewsTitle').replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-').toLowerCase()+'/'+window.localStorage.getItem('postID') /* url */, null, function(errormsg){alert("'You need to install facebook application to share this news'")});  
    }
  }
   $scope.OtherShare=function(){

    //alert('hi');
    if(window.localStorage.getItem('NewsTitle') === null){
      window.plugins.socialsharing.share('Construction Advisor', null, null, 'https://play.google.com/store/apps/details?id=com.constructionadvisor.ask');
    }else{
      window.plugins.socialsharing.share(window.localStorage.getItem('NewsTitle'), null , "https://www.constructionadvisor.com.au/article/"+window.localStorage.getItem('NewsTitle').replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-').toLowerCase()+'/'+window.localStorage.getItem('postID') /* url */, null, function(errormsg){alert("'You need to install selected application to share this news'")});  
    }
  }
}])

.controller('tabCtrl', function($scope,$cordovaDevice) {
 //alert('hi');
 $scope.OtherShare=function(){

    //alert('hi');
    if(window.localStorage.getItem('NewsTitle') === null){
      window.plugins.socialsharing.share('Construction Advisor', null, null, 'https://play.google.com/store/apps/details?id=com.constructionadvisor.ask');
    }else{
     // alert("https://www.constructionadvisor.com.au/article/"+window.localStorage.getItem('NewsTitle').replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-').toLowerCase()+'/'+window.localStorage.getItem('postID'));
      window.plugins.socialsharing.share(window.localStorage.getItem('NewsTitle'), null , null ,  "https://www.constructionadvisor.com.au/article/"+window.localStorage.getItem('NewsTitle').replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-').toLowerCase()+'/'+window.localStorage.getItem('postID') /* url */, null, function(errormsg){});  
    }
  }

    $scope.clearLocalStoreage = function(){
     // alert("clear storeage");
        window.localStorage.removeItem('NewsTitle');
       window.localStorage.removeItem('NewsImage');
       window.localStorage.removeItem('postID');
       //window.localStorage.clear();
    }
})

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
  
   $scope.myGoBack = function() {
    $ionicHistory.goBack();
  };

  $scope.notifyMe = {};
   window.localStorage.removeItem('NewsTitle');
   $scope.notifyMe.UUID =  window.localStorage.getItem("UUID");
   if(window.localStorage.getItem("SendNotification")===null || window.localStorage.getItem("SendNotification")==='No'){
      $scope.notifyMe.SendNotification = false;
    }else{
      $scope.notifyMe.SendNotification = true;
    }
  /* $http.get("https://www.app.constructionadvisor.com.au/getnotifystatus?uuid="+$scope.notifyMe.UUID)
      .then(function (response) {

          alert(response.status);
       // $scope.notifyMe.SendNotification = window.localStorage.setItem("SendNotification");
      });*/
   // $scope.notifyMe = {
   //  "SendNotification": true,
   //  };
   $scope.notify = function(){

        //alert(window.localStorage.getItem('UUID'));

      //alert($scope.notifyMe.notifyMe);
        if(window.localStorage.getItem('UUID') !== null){
        //alert("in if");
        $scope.notifyMe.UUID =  window.localStorage.getItem("UUID");
        $scope.notifyMe.SendNotification = $scope.notifyMe.SendNotification;
        $http.get("https://www.app.constructionadvisor.com.au/setnotifystatus/?UUID="+$scope.notifyMe.UUID+"&SendNotification="+$scope.notifyMe.SendNotification)
        .then(function (response){
         //$scope.names = response.data.records;
        });
      }
     //alert('UUID:'+$scope.notifyMe.UUID+'-SendNotification:'+$scope.notifyMe.SendNotification);
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
