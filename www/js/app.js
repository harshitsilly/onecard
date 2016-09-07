angular.module('bucketList', ['ionic','ionic.service.core','ksSwiper','ngCordova.plugins.cardIO','ngMap','ng-mfb','ionic.service.analytics','ngCordova','ionic-datepicker','ionic.service.push','angularReverseGeocode','ngMessages','firebase', 'ngStorage','controllers','services'])



.run( function($ionicPlatform,$rootScope,$ionicAnalytics, $firebaseAuth, $firebase, $window, $ionicLoading,$state,$localStorage) {
  
    

    $ionicPlatform.ready(function() {
      
        $rootScope.checkSession = function() {
            var auth = new FirebaseSimpleLogin(authRef, function(error, user) {
                if (error) {
                    // no action yet.. redirect to default route
                    $rootScope.userEmail = null;
                  
                     $state.go('signin');
                } else if (user) {
                   
                    // user authenticated with Firebase
                    $rootScope.userEmail = user.email;
                   
                     $state.go('menu.overview');
                } else {
                    // user is logged out
                    $rootScope.userEmail = null;
                   
                     $state.go('signin');
                }
            });
        }
      
     $rootScope.$storage = $localStorage.$default({
      seenIntro: false
    });
    console.log($rootScope.$storage.seenIntro);

    if ($rootScope.$storage.seenIntro== false) {
      
     
      $state.go('signin');
    } 
  
  
  
      $ionicAnalytics.register();
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }

  
 
        // $rootScope.userEmail = null;
        $rootScope.baseUrl = 'https://onecard2.firebaseio.com/';
        var authRef = new Firebase($rootScope.baseUrl);
        $rootScope.auth = $firebaseAuth(authRef);
        

        $rootScope.show = function(text) {
            $rootScope.loading = $ionicLoading.show({
                content: text ? text : 'Loading..',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
        };

        $rootScope.hide = function() {
            $ionicLoading.hide();
        };

        $rootScope.notify = function(text) {
            $rootScope.show(text);
            $window.setTimeout(function() {
                $rootScope.hide();
            }, 1999);
        };

        $rootScope.logout = function() {
            $rootScope.auth.$logout();
            $rootScope.checkSession();
             $window.location.href = ('#/signin');
    
        };

      
        
        
//  push  notifcation
        
//         var io = Ionic.io();
//    var push = new Ionic.Push({
//      "onNotification": function(notification) {
//        alert('Received push notification!');
//      },
//      "pluginConfig": {
//        "android": {
//          "iconColor": "#0000FF"
//        }
//      }
//    });
//    var user1 = Ionic.User.current();
//    
//    if (!user1.id) {
//      user1.id = Ionic.User.anonymousId();
//    }
//    
//    // Just add some dummy data..
//    user1.set('name', 'Simon');
//    user1.set('bio', 'This is my little bio');
//    user1.save();
//   
//    var callback = function(data) {
//      push.addTokenToUser(user1);
//      user1.save();
//    };
//    push.register(callback);
//    
        
        
    });
})



  
   

  

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        
        .state('signin', {
            url: '/signin',
            templateUrl: 'templates/auth-signin.html',
                    controller: 'SignInCtrl'
            
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'templates/auth-signup.html',
                    controller: 'SignUpCtrl'
            
            
        })
        
        
        .state('menu', {
      url: '/menu',
      abstract:true,
      templateUrl: 'templates/menu.html'
    })
      
    
    .state('intro', {
    url: '/a',
    templateUrl: "templates/intro.html",
    controller: 'IntroCtrl'
  })
  
  
   .state('menu.test', {
    url: '/test',
     views: {
        'side-menu21': {
          templateUrl: 'templates/test.html',
          controller: 'testCtrl'
        }
      }
  
  })
      
      
      .state('pattern', {
    url: '/pattern',
    templateUrl: "templates/pattern.html",
    controller: 'patternCtrl'
  })
      
        
    .state('menu.overview', {
      url: '/overview',
      views: {
        'side-menu21': {
          templateUrl: 'templates/overview.html',
          controller: 'overviewCtrl'
        }
      }
    })
    
     .state('menu.card', {
      url: '/card',
      views: {
        'side-menu21': {
          templateUrl: 'templates/card.html',
          controller: 'cardCtrl'
        }
      }
    })
    
          
    .state('menu.account', {
      url: '/account',
      views: {
        'side-menu21': {
          templateUrl: 'templates/account.html',
          controller: 'accountCtrl'
        }
      }
    })
        
      
   .state('menu.map', {
      url: '/map',
      views: {
        'side-menu21': {
          templateUrl: 'templates/map.html',
          controller: 'mapCtrl'
        }
      }
    })
      
        
    .state('menu.settings', {
      url: '/settings',
      views: {
        'side-menu21': {
          templateUrl: 'templates/settings.html',
          controller: 'settingsCtrl'
        }
      }
    })
    
    .state('menu.bluetooth', {
      url: '/bluetooth',
      views: {
        'side-menu21': {
          templateUrl: 'templates/bluetooth.html',
          controller: 'bluetoothCtrl'
        }
      }
    })
        
      
    
      
        
    .state('menu.feedback', {
      url: '/feedback',
      views: {
        'side-menu21': {
          templateUrl: 'templates/feedback.html',
          controller: 'feedbackCtrl'
        }
      }
    })
    
         
    .state('menu.notification', {
      url: '/notification',
      views: {
        'side-menu21': {
          templateUrl: 'templates/notification.html',
          controller: 'notificationCtrl'
        }
      }
    })
        
      
        .state('menu.bucket', {
            url: "/bucket",
            abstract: true,
            views: {
        'side-menu21': {
          templateUrl: "templates/bucket.html"
        }
      }
           
        })
        
        
        
        
        .state('menu.bucket.list', {
            url: '/list',
            views: {
                'bucket-list': {
                    templateUrl: 'templates/bucket-list.html',
                    controller: 'myListCtrl'
                }
            }
        })
        .state('menu.bucket.completed', {
            url: '/completed',
            views: {
                'bucket-completed': {
                    templateUrl: 'templates/bucket-completed.html',
                    controller: 'completedCtrl'
                }
            }
        })
        
    $urlRouterProvider.otherwise('/a');
});


