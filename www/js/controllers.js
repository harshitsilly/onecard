/* global $rootScope */

angular.module('controllers', [])
    .controller('SignInCtrl', [
        '$scope', '$rootScope', '$firebaseAuth', '$window',
        
        function($scope, $rootScope, $firebaseAuth, $window,$ionicUser, $ionicPush,$state, $q, UserService, $ionicLoading, $localStorage) {
            // check session
            $rootScope.checkSession();
            $scope.create = function() {
    $window.location.href = ('#/signup')
};
   

            $scope.user = {
                email: "",
                password: ""
            };
            $scope.validateUser = function() {
                $rootScope.show('Please wait.. Authenticating');
                var email = this.user.email;
                var password = this.user.password;
                if (!email || !password) {
                    $rootScope.notify("Please enter valid credentials");
                    return false;
                }
                
                

                $rootScope.auth.$login('password', {
                    email: email,
                    password: password
                }).then(function(user) {
                    $rootScope.hide();
                    $rootScope.userEmail = user.email;
                    $window.location.href = ('#/menu/overview');
                }, function(error) {
                    $rootScope.hide();
                    if (error.code == 'INVALID_EMAIL') {
                        $rootScope.notify('Invalid Email Address');
                    } else if (error.code == 'INVALID_PASSWORD') {
                        $rootScope.notify('Invalid Password');
                    } else if (error.code == 'INVALID_USER') {
                        $rootScope.notify('Invalid User');
                    } else {
                        $rootScope.notify('Oops something went wrong. Please try again later');
                    }
                });
            };
            
  //          var fbLoginSuccess = function(response) {
  //   if (!response.authResponse){
  //     fbLoginError("Cannot find the authResponse");
  //     return;
  //   }

  //   var authResponse = response.authResponse;

  //   getFacebookProfileInfo(authResponse)
  //   .then(function(profileInfo) {
  //     //for the purpose of this example I will store user data on local storage
  //     UserService.setUser({
  //       authResponse: authResponse,
	// 			userID: profileInfo.id,
	// 			name: profileInfo.name,
	// 			email: profileInfo.email,
  //       picture : "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
  //     });

  //     $ionicLoading.hide();
  //     $state.go('menu.overview');

  //   }, function(fail){
  //     //fail get profile info
  //     console.log('profile info fail', fail);
  //   });
  // };


  // //This is the fail callback from the login method
  // var fbLoginError = function(error){
  //   console.log('fbLoginError', error);
  //   $ionicLoading.hide();
  // };

  // //this method is to get the user profile info from the facebook api
  // var getFacebookProfileInfo = function (authResponse) {
  //   var info = $q.defer();

  //   facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
  //     function (response) {
	// 			console.log(response);
  //       info.resolve(response);
  //     },
  //     function (response) {
	// 			console.log(response);
  //       info.reject(response);
  //     }
  //   );
  //   return info.promise;
  // };

  // //This method is executed when the user press the "Login with facebook" button
  // $scope.facebookSignIn = function() {

  //   facebookConnectPlugin.getLoginStatus(function(success){
  //    if(success.status === 'connected'){
  //       // the user is logged in and has authenticated your app, and response.authResponse supplies
  //       // the user's ID, a valid access token, a signed request, and the time the access token
  //       // and signed request each expire
  //       console.log('getLoginStatus', success.status);

	// 			//check if we have our user saved
	// 			var user = UserService.getUser('facebook');

	// 			if(!user.userID)
	// 			{
	// 				getFacebookProfileInfo(success.authResponse)
	// 				.then(function(profileInfo) {

	// 					//for the purpose of this example I will store user data on local storage
	// 					UserService.setUser({
	// 						authResponse: success.authResponse,
	// 						userID: profileInfo.id,
	// 						name: profileInfo.name,
	// 						email: profileInfo.email,
	// 						picture : "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
	// 					});

	// 					$state.go('menu.oveerview');

	// 				}, function(fail){
	// 					//fail get profile info
	// 					console.log('profile info fail', fail);
	// 				});
	// 			}else{
	// 				$state.go('menu.overview');
	// 			}

  //    } else {
  //       //if (success.status === 'not_authorized') the user is logged in to Facebook, but has not authenticated your app
  //       //else The person is not logged into Facebook, so we're not sure if they are logged into this app or not.
  //       console.log('getLoginStatus', success.status);

	// 		  $ionicLoading.show({
  //         template: 'Logging in...'
  //       });

  //       //ask the permissions you need. You can learn more about FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
  //       facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
  //     }
  //   });
  
          
  //  };
     
        }])

.controller('SignUpCtrl', [
    '$scope', '$rootScope', '$firebaseAuth', '$window',
    function($scope, $rootScope, $firebaseAuth, $window, UserService, $ionicActionSheet, $state, $ionicLoading) {

        $scope.user = {
            email: "",
            password: ""
        };
        $scope.createUser = function() {
            var email = this.user.email;
            var password = this.user.password;
            if (!email || !password) {
                $rootScope.notify("Please enter valid credentials");
                return false;
            }
            $rootScope.show('Please wait.. Registering');
            var item7 = "";
            var item8 = "";

            $rootScope.auth.$createUser(email, password, function(error, user) {
                if (!error) {
                    $rootScope.hide();
                    $rootScope.userEmail = user.email;
                    $window.location.href = ('#/menu/overview');
                     var itemRef3 = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
        itemRef3.update({
            item7 : item7,
            item8 : item8
        }, function(error) {
            if (error) {
                $rootScope.hide();
                $rootScope.notify('Oops! something went wrong. Try again later');
            } else {
                $rootScope.hide();
                $rootScope.notify('Successfully updated');
            }
        });
                    
                } else {
                    $rootScope.hide();
                    if (error.code == 'INVALID_EMAIL') {
                        $rootScope.notify('Invalid Email Address');
                    } else if (error.code == 'EMAIL_TAKEN') {
                        $rootScope.notify('Email Address already taken');
                    } else {
                        $rootScope.notify('Oops something went wrong. Please try again later');
                    }
                }
            });
        }
        
        
        // facebook
        // $scope.user = UserService.getUser();

	// $scope.showLogOutMenu = function() {
	// 	var hideSheet = $ionicActionSheet.show({
	// 		destructiveText: 'Logout',
	// 		titleText: 'Are you sure you want to logout? This app is awsome so I recommend you to stay.',
	// 		cancelText: 'Cancel',
	// 		cancel: function() {},
	// 		buttonClicked: function(index) {
	// 			return true;
	// 		},
	// 		destructiveButtonClicked: function(){
	// 			$ionicLoading.show({
	// 			  template: 'Logging out...'
	// 			});

    //     // Facebook logout
    //     facebookConnectPlugin.logout(function(){
    //       $ionicLoading.hide();
    //       $state.go('welcome');
    //     },
    //     function(fail){
    //       $ionicLoading.hide();
    //     });
	// 		}
	// 	});
	// };
    }
])

.controller('myListCtrl', function($rootScope, $scope, $window, $ionicModal, $firebase) {
    $rootScope.show("Please wait... Processing");
    $scope.list = [];
    var bucketListRef = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
    bucketListRef.on('value', function(snapshot) {
        var data = snapshot.val();
        $scope.list = [];
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                if (data[key].isCompleted == false) {
                    data[key].key = key;
                    $scope.list.push(data[key]);
                }
            }
        }

        if ($scope.list.length == 0) {
            $scope.noData = true;
        } else {
            $scope.noData = false;
        }
        $rootScope.hide();
    });


    $ionicModal.fromTemplateUrl('templates/newItem.html', function(modal) {
        $scope.newTemplate = modal;
    });

    $scope.newTask = function() {
        $scope.newTemplate.show();
    };

 $scope.markCompleted = function(key) {
        $rootScope.show("Please wait... Updating List");
        var itemRef = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail) + '/' + key);
        itemRef.update({
            isCompleted: true
        }, function(error) {
            if (error) {
                $rootScope.hide();
                $rootScope.notify('Oops! something went wrong. Try again later');
            } else {
                $rootScope.hide();
                $rootScope.notify('Successfully updated');
            }
        });
    };
   
    $scope.deleteItem = function(key) {
        $rootScope.show("Please wait... Deleting from List");
        var itemRef = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
        bucketListRef.child(key).remove(function(error) {
            if (error) {
                $rootScope.hide();
                $rootScope.notify('Oops! something went wrong. Try again later');
            } else {
                $rootScope.hide();
                $rootScope.notify('Successfully deleted');
            }
        });
    };
})



.controller('mapCtrl', function($scope, $ionicPopup,$ionicPlatform, $rootScope,$ionicLoading,$cordovaGeolocation) {
 $ionicPlatform.ready(function(){
  $rootScope.positions = [{
    lat: 43.07493,
    lng: -89.381388
  }];

  $scope.$on('mapInitialized', function(event, map) {
    $scope.map = map;
  });

  $scope.centerOnMe= function(){
  $rootScope.positions = [];
    
    
    $ionicLoading.show({
      template: 'Loading...'
    });

 
   
   
   
        
        
      var onSuccess=  function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      $rootScope.positions.push({lat: pos.lat(),lng: pos.lng()});
      console.log(pos);
      $scope.map.setCenter(pos);
      
      
    
       
     
      };    
      
     var onError =  function onError(error) {
    $ionicPopup.alert({
     title: 'Turn on your gps',
     template: 'Could not locate your device'
   });
}
    navigator.geolocation.getCurrentPosition(onSuccess, onError,{maximumAge:6000,timeout:2000,enableHighAccuracy:true});
      
     
      $ionicLoading.hide();
      
     
  };
  });
})

.controller('newCtrl', function($rootScope, $scope, $window, $firebase) {
    $scope.currentDate = new Date();
$scope.minDate = new Date(2016, 6, 1);
$scope.maxDate = new Date(2035, 6, 31);

$scope.datePickerCallback = function (val) {
    if (!val) { 
        console.log('Date not selected');
    } else {
        console.log('Selected date is : ', val);
    }
};
    $scope.data = {
        item: ""
    };
    $scope.close = function() {
        $scope.modal.hide();
    };

    $scope.createNew = function() {
        
        var item1 = this.data.item1;
         var item2 = this.data.item2; 
         var item3= this.data.item3;
          var item4 = this.data.item4;
          var item5 =  $rootScope.positions[0].lat;
          var item6 =  $rootScope.positions[0].lng;
          var item7= "hello" ;
          var item8 = "hi";
          var item20 = this.data.item20;
        if (!item1&&!item2&&!item3&&!item4) return;
        $scope.modal.hide();
        $rootScope.show();

        $rootScope.show("Please wait... Creating new");

        var form = {
            item1: item1,
            item2: item2,
             item3: item3,
              item4: item4,
               item5: item5,
               item6: item6,
               item20: item20,
               
              
              
            isCompleted: false,
            created: Date.now(),
            updated: Date.now()
        };

        var bucketListRef = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
        $firebase(bucketListRef).$add(form);
        $rootScope.hide();

    };
})


.controller('overviewCtrl', 
        function($scope,$rootScope,$ionicPlatform, $firebase,$ionicPopup, $stateParams, $localStorage, $log, $state, $ionicModal,$cordovaNgCardIO) {
         
     //password
    //      var bucketListRef4 = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
    // bucketListRef4.on('value', function(snapshot) {
       
    //     var data = snapshot.val();
    //      console.log(data);
       
    //     $rootScope.item11= data.item7 ;

    //     });

  //      var pin = '1234';
    
  // $scope.data = {};
  
  //        $ionicPopup.show({
  //    title: 'Enter PIN',
    
  //    template: '<input type="password" ng-model="data.pin">',
   
    
  //   scope: $scope,
  //   buttons: [
  //     { text: 'Cancel', 
  //      onTap: function(e) {
  //           navigator.app.exitApp()
  //          ionic.Platform.exitApp();
        
          
  //       }},
  //     {
  //       text: '<b>Enter</b>',
  //       type: 'button-dark',
  //       onTap: function(e) {
  //         if ($scope.data.pin ===  pin) {
  //           //don't allow the user to close unless he enters wifi password
            
  //         } else {
  //             e.preventDefault();
  //             $ionicPopup.show({
  //    title: 'Invalid Pin',
  //   scope: $scope,
  //   buttons: [
  //     { text: 'Try again', 
  //     type: 'button-dark'
  //      }
     
  //   ]
     
     
    
     
  //  });
            
  //         }
  //       }
  //     }
  //   ]
     
     
    
     
  //  });
        

 $scope.currentSolde = 50;
 $scope.ajoutCompte = function() {
        $cordovaNgCardIO.scanCard();
        
    }
    
//     $scope.array = function() {
//       var result = ";12345432345345645=893380-90" ;
//        console.log(result);
//      var i = result;
//      for (var index = 0; index < i.length; index++) {
//        var element = i[index];
//        console.log(i[index]);
//        if (element== '=') {
//          var j = index ;
//          console.log(j);
//         var  line = "";
//          for (var index1 = 1; index1 < j; index1++) {
//            line += i[index1];
           
//          }
//          $rootScope.card = line;
//          console.log("Card Number" , line);
         
//        }
//         if (element== '=') {
//          var j = index ;
//          console.log(j);
//         var  line1 = "";
//          for (var index1 = j + 1; index1 < j + 3; index1++) {
//            line1 += i[index1];
           
//          }
//          $rootScope.year = line1;
//          console.log("Year" , line1);
        
//        }
//         if (element== '=') {
//          var j = index ;
//          console.log(j);
//         var  line2 = "";
//          for (var index1 = j + 3; index1 < j + 5; index1++) {
//            line2 += i[index1];
           
//          }
//          $rootScope.month = line2;
//          console.log("Month" , line2);
        
//        }
//          $rootScope.hide();
       
    

   
      
   
       
//      }
     
//        $ionicPopup.show({
//      title: 'Card Details',
    
//      template: 'Crad Number {{card}} </br> Valid Thru {{month}}/{{year}} </br> Holder Name ',
   
    
//     scope: $scope,
//     buttons: [
//       { text: 'Cancel',
//      onTap: function() { 
  

   
  
 
//       }
//         },
//       {
//         text: '<b>Save</b>',
//         type: 'button-positive',
//         onTap: function() {
//            $rootScope.show("Please wait... Saving");
          
          
//                       var form = {
//             item31: line,
//             item32: line1,
//              item33: line2,
              
               
              
              
         
//             created: Date.now(),
//             updated: Date.now()
//         };

//         var bucketListRef = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
//         $firebase(bucketListRef).$add(form);
//         $rootScope.hide();
          
           
          
//         }
//       }
//     ]
     
     
    
     
//    });
   
     
      
    

     
     
     
// }
 
  
          $ionicPlatform.ready(function() {
            
            setInterval(function(){ 
    //code goes here that will be run every 5 seconds. 
       window.plugins.headsetdetection.detect(function(detected) {
              if (detected==false) {
                $rootScope.image1 = "false";
              $scope.$apply();
            }
            else{
               $rootScope.image1 = "true";
               $scope.$apply();
            }
             console.log(detected)});   
}, 1000);
          
        
              
            
            
           
            
 $scope.start = function() {
   


    
    
        console.log("Card reader started!");
       CardRaderPlugin.start(  function(result){
     console.log("success");
      $rootScope.show("Please wait... Processing");
   
    console.log(result);
     var i = result;
     $rootScope.card = result;
     for (var index = 0; index < i.length; index++) {
       var element = i[index];
       console.log(i[index]);
       if (element== '=') {
         var j = index ;
         console.log(j);
        var  line = "";
         for (var index1 = 1; index1 < j; index1++) {
           line += i[index1];
           
         }
         $rootScope.card = line;
         console.log("Card Number" , line);
         
       }
        if (element== '=') {
         var j = index ;
         console.log(j);
        var  line1 = "";
         for (var index1 = j + 1; index1 < j + 3; index1++) {
           line1 += i[index1];
           
         }
         $rootScope.year = line1;
         console.log("Year" , line1);
        
       }
        if (element== '=') {
         var j = index ;
         console.log(j);
        var  line2 = "";
         for (var index1 = j + 3; index1 < j + 5; index1++) {
           line2 += i[index1];
           
         }
         $rootScope.month = line2;
         console.log("Month" , line2);
         break;
       }
       
     
        $rootScope.hide();
       
     
       
     }
      $ionicPopup.show({
     title: 'Card Details',
    
     template: 'Crad Number {{card}} </br> Valid Thru {{month}}/{{year}} </br> Holder Name ',
   
    
    scope: $scope,
    buttons: [
      { text: 'Cancel',
      onTap: function() {
          
         
          
        }
        },
      {
        text: '<b>Save</b>',
        type: 'button-positive',
        onTap: function() {
           $rootScope.show("Please wait... Saving");
          
           var form = {
            item1: line,
            item3: line1,
             item4: line2,
              item5 : $rootScope.positions[0].lat,
               item6 : $rootScope.positions[0].lng,
               item56 : i,
             
               
              
              
         
            created: Date.now(),
            updated: Date.now()
        };

        var bucketListRef = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
        $firebase(bucketListRef).$add(form);
        $rootScope.hide();
          
           
          
        }
      }
    ]
     
     
    
     
   });
     
     
    
}, function() {
            console.log('Please try again. failure ');
    });
      
    
      
        // If OS is Android  
  
      //  console.log("Card number:" + response[0].card_number);

      //       if(typeof response[0].expiry_month != 'undefined' && response[0].expiry_month!=null){
      //           console.log("Expiry month:" + response[0].expiry_month);
      //       }

      //       if(typeof response[0].expiry_year != 'undefined' && response[0].expiry_year!=null){
      //            console.log("Expiry month:" + response[0].expiry_year);
      //       }
    }

    //If OS is iOS
    // function cardReadSuccess(response){
    //       console.log("Card number:" + response['card_number']);

    //         if(typeof response[0].expiry_month != 'undefined' && response[0].expiry_month!=null){
    //             console.log("Expiry month:" + response['expiry_month']);
    //         }

    //         if(typeof response[0].expiry_year != 'undefined' && response[0].expiry_year!=null){
    //              console.log("Expiry month:" + response['expiry_year']);
    //         }
    // }

    
 
 $scope.stop = function() {
   
     
      console.log("Trying to stop CardReader!");
    CardRaderPlugin.stop(function(){
            console.log("Card reader stopped!");
      }, function(){
            console.log("Card reader stop failed!");
      });

    }


    
  

})
           
 
 

})
.controller('MyCtrl', function($scope, $ionicGesture, $window, $interval) {
  $scope.lastEventCalled = 'Try to Drag the content up, down, left or rigth';
  var element = angular.element(document.querySelector('#eventPlaceholder'));
  var events = [{
    event: 'dragup',
    text: 'You dragged me UP!'
  },{
    event: 'dragdown',
    text: 'You dragged me Down!'
  },{
    event: 'dragleft',
    text: 'You dragged me Left!'
  },{
    event: 'dragright',
    text: 'You dragged me Right!'
  }];
  
  angular.forEach(events, function(obj){
    $ionicGesture.on(obj.event, function (event) {
      $scope.$apply(function () {
        $scope.lastEventCalled = obj.text;
      });
    }, element);
  });
})

.controller('transactionCtrl', function($scope) {
    
          $scope.close = function() {
        $scope.modal.hide();
    };

})

.controller('accountCtrl', function($scope,$rootScope, $window, $state, $firebase,$ionicGesture, $interval,$ionicModal,$filter) { 
 
  $rootScope.search = function(){
   $rootScope.Card = this.g;
   
    console.log( $rootScope.Card);
    // $state.go('menu.account', null, {reload: true});
    
    
  }
  
  
  
  var m = {
   item20 : "Credit",
  item21 : "Debit",
   item22 :"Wallet"
};
 $scope.list1 = m;
   $scope.numLimit = 10;
    $scope.colors = ['#F44336','#9C27B0', '#673AB7','#3F51B5','#0097A7','#00796B','#689F38','#4CAF50','#FF5722','#FD4037','#455A64']
     $scope.swiper = {};
 
    $scope.onReadySwiper = function (swiper) {
 
        swiper.on('slideChangeStart', function () {
            console.log('slide start');
        });
         
        swiper.on('onSlideChangeEnd', function () {
            console.log('slide end');
        });     
    };
  
   $rootScope.show("Please wait... Processing");
    $scope.list = [];

    var bucketListRef = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
    bucketListRef.on('value', function(snapshot) {
        $scope.list = [];
        var data = snapshot.val();
  

        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                
        
                
                if (data[key].item5== $rootScope.positions[0].lat ) {
                    data[key].key = key;
                    
                    $scope.list.push(data[key]);
                   
                }
            }
        }
        if ($scope.list.length == 0) {
            $scope.noData = true;
        } else {
            $scope.noData = false;
        }

        $rootScope.hide();
    });

    $scope.deleteItem = function(key) {
        $rootScope.show("Please wait... Deleting from List");
        var itemRef = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
        bucketListRef.child(key).remove(function(error) {
            if (error) {
                $rootScope.hide();
                $rootScope.notify('Oops! something went wrong. Try again later');
            } else {
                $rootScope.hide();
                $rootScope.notify('Successfully deleted');
            }
        });
    };
    
    
    
   
          $ionicModal.fromTemplateUrl('templates/transaction.html', function(modal) {
        $scope.newTemplate = modal;
    });
         
          $scope.transaction = function() {
           $scope.newTemplate.show();
         };
         
         
         
          $scope.favourite = function(key) { 
            console.log(localStorage.star);
           if (localStorage.star == "true") {
             localStorage.star = "false";
             console.log("star");
           } else {
             localStorage.star = "true";
             console.log("star1");
           } 
            
            this.mySwitch =  localStorage.star;
            console.log( this.mySwitch);
        
          }
          
         this.mySwitch =  localStorage.star;
         
          console.log( this.mySwitch);
          
  // function showBanner(index) {
	// 			var oldElm = document.querySelector('.slider ion-slide.slider-slide.current');
	// 			var q = '.slider ion-slide.slider-slide[data-index="' + index + '"]';
	// 			var elm = document.querySelector(q);

  //       console.log("Show banner " + index);
        
	// 			// Remove class "current"
	// 			if (null !== oldElm) {
	// 				oldElm.classList.remove("current");
	// 			}

	// 			// Add class "current" to current slide
	// 			if (null !== elm) {
	// 				elm.classList.add("current");
	// 			}
	// 		}
  
  

	// 		$scope.activeSlide = 0;

	// 		setTimeout(function() {
	// 			showBanner($scope.activeSlide);
	// 		}, 100);

	// 		$scope.slideChanged = showBanner;
            
            
             $scope.lastEventCalled = "true";
  var element = angular.element(document.querySelector('#eventPlaceholder'));
  var events = [{
    event: 'dragup',
    text: 'true'
  },{
    event: 'dragdown',
    text: 'You dragged me Down!'
  },{
    event: 'dragleft',
    text: 'You dragged me Left!'
  },{
    event: 'dragright',
    text: 'You dragged me Right!'
  }];
  
  angular.forEach(events, function(obj){
    $ionicGesture.on(obj.event, function (event) {
      $scope.$apply(function () {
        $scope.lastEventCalled = obj.text;
      });
    }, element);
    
  });
  
   $scope.noData3 = function() {
         

        if ($scope.lastEventCalled=="true") {
            $scope.noData3 = true;
             console.log("yes");
        } else {
            $scope.noData3 = false;
            console.log("no");
        }
       return $scope.noData3;
    };

       $scope.noData3();
    
       
      
      
 
})

.controller('AppCtrl', function($scope,$location, $window) {
	$scope.sidemenu = function(link){
		$location.path(link);
	}
   
    
})


.controller('testCtrl', function($scope,$rootScope, $cordovaCamera, $ionicPlatform, $firebase) {
 
 
  $ionicPlatform.ready(function() {
      var bucketListRef7 = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
    bucketListRef7.on('value', function(snapshot) {
        $scope.list = [];
        var data = snapshot.val();
        console.log(data);
         console.log($rootScope.image);
         
           $rootScope.image = data.item17;
        });
    $scope.takePhoto = function () {
                  var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };
   
                    $cordovaCamera.getPicture(options).then(function (imageData) {
                        $scope.imgURI = "data:image/jpeg;base64," + imageData;
                    }, function (err) {
                        // An error occured. Show a message to the user
                    });
                }
                
                $scope.choosePhoto = function () {
                  var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };
   
                    $cordovaCamera.getPicture(options).then(function (imageData) {
                        $rootScope.imgURI = "data:image/jpeg;base64," + imageData;
                    }, function (err) {
                        // An error occured. Show a message to the user
                    });
                    
                    var item17 =  $rootScope.imgURI;
                    
                    
                      var itemRef4 = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
        itemRef4.update({
            item17 :  item17
            
        }, function(error) {
            if (error) {
                $rootScope.hide();
                $rootScope.notify('Oops! something went wrong. Try again later');
            } else {
                $rootScope.hide();
                $rootScope.notify('Successfully updated');
            }
                }); 
                 }
                 
               
  });
 
 
  

  var bucketListRef6 = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
    bucketListRef6.on('value', function(snapshot) {
        $scope.list = [];
        var data = snapshot.val();
        console.log(data);
         console.log($rootScope.image);
          $rootScope.name = data.item14;
          $rootScope.Phonenumber = data.item15;
          $rootScope.Email = data.item16;
           
        });
      
       
                
        
    
     $scope.edit = function(){var item14 =  this.name ;
    var item15 = this.Phonenumber;
    var item16 = this.Email;
    
       $rootScope.show("Please wait... Updating List");
        var itemRef4 = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
        itemRef4.update({
            item14 : item14,
             item15 : item15, 
             item16 : item16
        }, function(error) {
            if (error) {
                $rootScope.hide();
                $rootScope.notify('Oops! something went wrong. Try again later');
            } else {
                $rootScope.hide();
                $rootScope.notify('Successfully updated');
            }
        });
    }

})
.controller('IntroCtrl', function($scope, $rootScope) {
  $scope.slides = {
    currentSlide: 0
  };
  $scope.title = '<i class="icon ion-android-home"></i>';

  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
    if (index == 2)
      $rootScope.$storage.seenIntro = true;
  };
})

.controller('patternCtrl', function($scope, LoginService, $ionicPopup, $state) {
    // 1
    $scope.log_pattern = LoginService.getLoginPattern();

    // 2
    var lock = new PatternLock("#lockPattern", {
        // 3
        onDraw:function(pattern){
            // 4
            if ($scope.log_pattern) {
                
                
          LoginService.checkLoginPattern(pattern).success(function(data) {
                    lock.reset();
                     
                    
                    
                }).error(function(data) {
                    lock.error();
                   
                $rootScope.show("Invalid Pattern");
           
                    
                });
                       
                
            } else {
                // 6
                LoginService.setLoginPattern(pattern);
                lock.reset();
                $scope.$apply(function() {
                    $scope.log_pattern = LoginService.getLoginPattern();    
                });
               $rootScope.show("Succesfully Created");
                $state.go('menu.settings');
            }
           
        }
    });
    
    
       var lock1 = new PatternLock("#lockPattern1", {  
        // 3
        onDraw:function(pattern){
            // 4
            if (LoginService.checkLoginPattern(pattern)) {
                 LoginService.setLoginPattern(pattern);
                lock1.reset();
                $scope.$apply(function() {
                    $scope.log_pattern = LoginService.getLoginPattern();    
                });
                 $state.go('menu.settings');
            }
        }
    });
    
    
     

    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $state.go('tab.dash');
        }).error(function(data) {
          $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }
})







.controller('alwaysCtrl',  function($scope, $rootScope, $ionicUser, $ionicPush) { 
    $scope.identifyUser = function() {
	var user = $ionicUser.get();
	if(!user.user_id) {
		// Set your user_id here, or generate a random one.
		user.user_id = $ionicUser.generateGUID();
	};
 
	// Metadata
	
 
	// Identify your user with the Ionic User Service
	$ionicUser.identify(user).then(function(){
		$scope.identified = true;
		console.log('Identified user ' + user.name + '\n ID ' + user.user_id);
	});
};

$scope.pushRegister = function() {
 console.log('Ionic Push: Registering user');
 
 // Register with the Ionic Push service.  All parameters are optional.
 $ionicPush.register({
   canShowAlert: true, //Can pushes show an alert on your screen?
   canSetBadge: true, //Can pushes update app icon badges?
   canPlaySound: true, //Can notifications play a sound?
   canRunActionsOnWake: true, //Can run actions outside the app,
   onNotification: function(notification) {
     // Handle new push notifications here
     return true;
   }
 });
};
        

})
.controller('MainCtrl', function($scope) {
    $scope.confirmed = '1';
 
  $scope.selectChange = function() {
    switch($scope.confirmed) {
      case '1': $scope.selected = '1';break;
  
      case '2': $scope.selected = '2';break;
    }
  }
  $scope.selectChange();
  
})

.controller('newPassCtrl',  function($rootScope, $scope, $window, $ionicModal, $firebase) {
    
    
     $scope.data = {
        item7: ""
    };
     $scope.noData = function() {
         var bucketListRef2 = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
    bucketListRef2.on('value', function(snapshot) {
       
        var data = snapshot.val();
         console.log(data);
       
        $rootScope.item11= data.item7 ;

        if (!data.item7=="") {
            $scope.noData3 = true;
             console.log("yes");
        } else {
            $scope.noData3 = false;
            console.log("no");
        }
       
    });
return !$scope.noData3;
       
    };

    $scope.close = function() {
        $scope.modal.hide();
    };
     $scope.createNew = function(key) {
          var item7 = this.data.item7;
          var item9 = this.data.item9;
          console.log(item7);
          console.log(item9);
          console.log($rootScope.item11);
          
          if(!item9=="" && $rootScope.item11=== item7)
          { 
               item7 = item9;}
               
               else{
                    $scope.modal.hide();
                  $rootScope.notify('Invalid Pin. Try it again.');
                  
                  
                  return ;
                   
                   
               }
         $scope.modal.hide();
        $rootScope.show("Please wait... Updating List");
        var itemRef2 = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
        itemRef2.update({
            item7 : item7
        }, function(error) {
            if (error) {
                $rootScope.hide();
                $rootScope.notify('Oops! something went wrong. Try again later');
            } else {
                $rootScope.hide();
                $rootScope.notify('Successfully updated');
            }
        });
    };
    
    
    
    
})

.controller('newPass1Ctrl', function($rootScope, $scope, $window, $ionicModal, $firebase) {
    
    
     $scope.data = {
        item: ""
    };
     $scope.noData1 = function() {
         var bucketListRef3 = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
    bucketListRef3.on('value', function(snapshot) {
       
        var data = snapshot.val();
         console.log(data);
       
        $rootScope.item12= data.item8 ;

        if (!data.item8=="") {
            $scope.noData2 = true;
             console.log("yes");
        } else {
            $scope.noData2 = false;
            console.log("no");
        }
       
    });
    console.log(!$scope.noData2);
return !$scope.noData2;

       
    };

    $scope.close = function() {
        $scope.modal.hide();
    };
     $scope.createNew1 = function(key) {
          var item8 = this.data.item8;
          var item10 = this.data.item10;
          
          if(!item10=="" && $rootScope.item12== item8)
          { 
               item8 = item10;
            }
               else{
                    $scope.modal.hide();
                  $rootScope.notify('Invalid Password. Try it again.');
                  
                  
                  return ;
                   
                   
               }
         
         $scope.modal.hide();
        $rootScope.show("Please wait... Updating List");
        var itemRef3 = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
        itemRef3.update({
            item8 : item8
        }, function(error) {
            if (error) {
                $rootScope.hide();
                $rootScope.notify('Oops! something went wrong. Try again later');
            } else {
                $rootScope.hide();
                $rootScope.notify('Successfully updated');
            }
        });
    };
    
    
})   
.controller('settingsCtrl', function($scope,$window, $ionicPopup, $rootScope,$ionicLoading,$ionicModal, $cordovaGeolocation) {
    
  
     $scope.searchText="0";
    
      
   $scope.check = function (searchText) {
    console.log(searchText);
    if(searchText=="1")
   {$window.location.href = ('#/pattern');
    }
     if(searchText=="2")
   
  { $ionicModal.fromTemplateUrl('templates/newPass.html', function(modal) {
        $scope.newTemplate = modal;
    });
$scope.newTemplate.show();
       
   }
}

  
    
  $scope.ni_toggle = $window.localStorage.getItem('ni_toggle') === 'false';
    $scope.updateLocalStorage = function() {
        $window.localStorage.setItem('ni_toggle', $scope.ni_toggle);
        console.log($scope.ni_toggle);
        if($scope.ni_toggle==false){
              
   
     
       $rootScope.positions = [{
    lat: 43.07493,
    lng: -89.381388
  }];

  $scope.$on('mapInitialized', function(event, map) {
    $scope.map = map;
  });

  
  $rootScope.positions = [];
    
    
    $ionicLoading.show({
      template: 'Loading...'
    });

     var onSuccess=  function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      $rootScope.positions.push({lat: pos.lat(),lng: pos.lng()});
      console.log(pos);
      $scope.map.setCenter(pos);
      
      
    
       
     
      };    
      
     var onError =  function onError(error) {
    $ionicPopup.alert({
     title: 'Turn on your gps',
     template: 'Could not locate your device'
   });
}
    navigator.geolocation.getCurrentPosition(onSuccess, onError,{maximumAge:6000,timeout:2000,enableHighAccuracy:true});

      $ionicLoading.hide();
    
        }
        else
        {
             $rootScope.positions = [{
    lat: 43.07493,
    lng: -89.381388
  }];
            
            
            
        }
        
        };
        
     if($scope.ni_toggle==true){
              
   
     
       $rootScope.positions = [{
    lat: 43.07493,
    lng: -89.381388
  }];

  $scope.$on('mapInitialized', function(event, map) {
    $scope.map = map;
  });

  
  $rootScope.positions = [];
    
    
    $ionicLoading.show({
      template: 'Loading...'
    });

    var onSuccess=  function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      $rootScope.positions.push({lat: pos.lat(),lng: pos.lng()});
      console.log(pos);
      $scope.map.setCenter(pos);
      
      
    
       
     
      };    
      
     var onError =  function onError(error) {
    $ionicPopup.alert({
     title: 'Turn on your gps',
     template: 'Could not locate your device'
   });
}
    navigator.geolocation.getCurrentPosition(onSuccess, onError,{maximumAge:6000,timeout:2000,enableHighAccuracy:true});

      $ionicLoading.hide();
    
        }
        else
        {
             $rootScope.positions = [{
    lat: 43.07493,
    lng: -89.381388
  }];
            
            
            
        }
        
       
    
    
    
    

}) 


.controller('feedbackCtrl', function($scope) {
     $scope.numberSelection = 5;
    //  $scope.slider = 10* $scope.numberSelection;
     

})

.controller('scanCtrl', function($scope) {
    
    //  $scope.slider = 10* $scope.numberSelection;
      $scope.modalClasses = ['slide-in-up', 'slide-in-down', 'fade-in-scale', 'fade-in-right', 'fade-in-left', 'newspaper', 'jelly', 'road-runner', 'splat', 'spin', 'swoosh', 'fold-unfold'];


})

.controller('notificationCtrl', function($scope, $cordovaLocalNotification, $ionicPlatform) {
  
    $ionicPlatform.ready(function () {
         
        $scope.scheduleSingleNotification = function () {
          $cordovaLocalNotification.schedule({
            id: 1,
            title: 'Warning',
            text: 'Youre so sexy!',
            data: {
              customProperty: 'custom value'
            }
          }).then(function (result) {
            console.log('Notification 1 triggered');
          });
        };
         
        $scope.scheduleDelayedNotification = function () {
          var now = new Date().getTime();
          var _10SecondsFromNow = new Date(now + 10 * 1000);
 
          $cordovaLocalNotification.schedule({
            id: 2,
            title: 'Warning',
            text: 'Im so late',
            at: _10SecondsFromNow
          }).then(function (result) {
            console.log('Notification 2 triggered');
          });
        };
 
        $scope.scheduleEveryMinuteNotification = function () {
          $cordovaLocalNotification.schedule({
            id: 3,
            title: 'Warning',
            text: 'Dont fall asleep',
            every: 'minute'
          }).then(function (result) {
            console.log('Notification 3 triggered');
          });
        };      
         
        $scope.updateSingleNotification = function () {
          $cordovaLocalNotification.update({
            id: 2,
            title: 'Warning Update',
            text: 'This is updated text!'
          }).then(function (result) {
            console.log('Notification 1 Updated');
          });
        };  
 
        $scope.cancelSingleNotification = function () {
          $cordovaLocalNotification.cancel(3).then(function (result) {
            console.log('Notification 3 Canceled');
          });
        };      
         
    });
})

 .controller('bluetoothCtrl',function ($ionicPopup,$ionicModal,$rootScope,$ionicPlatform,$scope,$timeout) {
  
     $ionicPlatform.ready(function() {
  $scope.checkBT = (function () {
    ble.isEnabled(
         function() {
             $ionicPopup.alert({
     title: 'Your sync starts.',
     template: ' When sync done notification will appear.'
   });
         
      },
      function() {
           $ionicPopup.show({
     title: 'Turn on bluetooth',
    
     template: 'Bluetooth is not enabled. Click on settings to turn on and to start sync.',
   
    
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Settings</b>',
        type: 'button-positive',
        onTap: function() {
        ble.showBluetoothSettings();
          
        }
      }
    ]
     
     
    
     
   });
       
      }
        
        
        );
        
        
  });
  
  
  
//  $ionicPopup.alert({
//      title: '<b>Scan Devices</b>',
    
    
//      template:   '<b class="scan">Select The OneCard</b> </br>'+'<button  class=" button-block item item-divider" ng-mousedown="goMyLocation()">Current Location</button>'+
// '<button class="  button-block item item-divider" ng-mousedown="goMyLocation()">Current Location</button>'+
// '<button class=" button-block item item-divider" ng-mousedown="goMyLocation()">Current Location</button>'

   
    
    
   
     
//    });
    



  
  
  $scope.connectBT= (function () {
ble.startScan([], function(device) {
    console.log(JSON.stringify(device));
    console.log(device);
    $scope.scandevices = device.name;
     $ionicPopup.show({
     title: 'Scan Devices',
    
     template: 'Select The OneCard </br> ' +'<button ng-repeat="class in scandevices" class="button-clear item  button-full button-dark" ng-click="connectBT1()">{{ class }}</button>',
   
    
    scope: $scope,
    buttons: [
      { text:  $scope.scandevices,
      type: 'button-positive',
      onTap: function() {
           
         console.log("hello");
         $scope.connectBT1();
         $scope.connectBT2();
          
        }
        }]
    
     
   });
    
}, function() {
  console.log("Error");
});

setTimeout(ble.stopScan,
    5000,
    function() { console.log("Scan complete"); },
    function() { console.log("stopScan failed"); }
);


  

  });
  
 
     
    

 
     
  
  
   $scope.connectBT1= (function () {
  ble.connect('D0:39:72:B7:80:4C', function() {
  console.log("Connected");
  
}, function() {
  console.log("Error in connecting");
  
});


  
   });
   
 
   $(function() {
  $scope.box = $('.box');
  var button = $('.box button');
  button.on('click', function(){
    $scope.box.toggleClass('active');
    if( $scope.box.hasClass('active'))
      console.log("yup");
    else
     ble.disconnect('D0:39:72:B7:80:4C', function() {
  console.log("Disconnected");
  
}, function() {
  console.log("Cannot disconnect");
  
});
 
   
  });
});
  
 
   
    $scope.connectBT2= (function () {
  
$scope.list = [];

    var bucketListRef = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
    bucketListRef.on('value', function(snapshot) {
        $scope.list = [];
        var data = snapshot.val();
  

        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                
        
                
                if (data[key].item5== $rootScope.positions[0].lat ) {
                    data[key].key = key;
                    $scope.list.push(data[key]);
                }
            }
        }
        if ($scope.list.length == 0) {
            $scope.noData = true;
        } else {
            $scope.noData = false;
        }

        $rootScope.hide();
    });

    console.log($scope.list);
     console.log($scope.list[0]);
     for (var x = 0; x < $scope.list.length; x++) {
    
       var y = 0;
       
     var s = [];
     s[y] =  $scope.list[x];
    
   console.log(s[y].item56);
    var someString = s[y].item56;
	var j;
  var i = 0;
 var data = new Uint8Array(someString.length);
   for(j = 0; j < someString.length; j++) {
	
   data[i] = someString.charCodeAt(j);

   i++
	}
  ble.write('D0:39:72:B7:80:4C', "FFF0", "FFF2", data.buffer,  function() {
  console.log("Success data");
  
}, function() {
  console.log("Error data");
  
}); 
setTimeout(function(){
  //your code to be executed after 1 seconds
}, 500); 
  y++
  console.log(data);
  }

ble.disconnect('D0:39:72:B7:80:4C', function() {
  console.log("Disconnected");
  
}, function() {
  console.log("Cannot disconnect");
  
});
 setTimeout(function(){
  //your code to be executed after 1 seconds
}, 2000); 

 $scope.box.toggleClass('active');
$ionicPopup.alert({
    
     template: 'Sync done. Your OneCard is ready'
   });
 
   var d = new Date()
console.log(d.toLocaleString());
var f = d.toString();
console.log(d.toString());
console.log(d);
$scope.e = "";
$scope.g = "";
for (var index = 0; index <10; index++) {
   $scope.e += f.charAt(index);
  
  
}
for (var index = 16; index <21; index++) {
  $scope.g += f.charAt(index);
  
  }
console.log($scope.e);
console.log($scope.g);
localStorage.e = $scope.e;

localStorage.g = $scope.g;
 $scope.m = localStorage.e ;
 $scope.n = localStorage.g ;


 });
 $scope.m = localStorage.e ;
 $scope.n = localStorage.g ;
 
 
  $scope.connectBT3= (function () {
  
ble.read('D0:39:72:B7:80:4C', "FFF0", "FFF1", function(response) {
  console.log("Success read data");
  console.log(response);
  
  
  
}, function() {
  console.log("Error read data");
  
});

 });
});
 })


.controller('completedCtrl', function($rootScope, $scope, $window, $firebase) {
    $rootScope.show("Please wait... Processing");
    $scope.list = [];

    var bucketListRef = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
    bucketListRef.on('value', function(snapshot) {
        $scope.list = [];
        var data = snapshot.val();
  

        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                
        
                
                if (data[key].item5== $rootScope.positions[0].lat ) {
                    data[key].key = key;
                    $scope.list.push(data[key]);
                }
            }
        }
        
       
        if ($scope.list.length == 0) {
            $scope.noData = true;
        } else {
            $scope.noData = false;
        }

        $rootScope.hide();
    });

 
    $scope.deleteItem = function(key) {
        $rootScope.show("Please wait... Deleting from List");
        var itemRef = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
        bucketListRef.child(key).remove(function(error) {
            if (error) {
                $rootScope.hide();
                $rootScope.notify('Oops! something went wrong. Try again later');
            } else {
                $rootScope.hide();
                $rootScope.notify('Successfully deleted');
            }
        });
    };
});






function escapeEmailAddress(email) {
    if (!email) return false
    // Replace '.' (not allowed in a Firebase key) with ','
    email = email.toLowerCase();
    email = email.replace(/\./g, ',');
    return email.trim();
}
