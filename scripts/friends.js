var friends = angular.module('friends', []);
friends.controller('manage', function($scope, $element, $compile,$http) {
  $scope.myFriends=[];
	$scope.searchFriends=[];
  $scope.friendsLike= "";


	$http.post('/friends', {})
	.success(function(response){
		if(response === 'ERROR'){
			window.location.pathname = '/';
		}
		else{
      console.log(response.friends);
			$scope.myFriends = response;
		}
	});

  $scope.added = function(friendId){
    console.log(friendId);
    console.log(  $scope.myFriends);
    var added = false;
    $scope.myFriends.forEach(function(friend){
        if(friend._id == friendId)
          added = true;
    });
    return added;
  }

  $scope.addFriend = function(friendId){
    $http.post('/addFriend',{_id: friendId})
    .success(function(response){
        console.log(response);
        window.location.pathname = '/friends.html';
    });
  }

  $scope.removeFriend = function(friendId){
    $http.post('/removeFriend',{_id: friendId})
    .success(function(response){
        console.log(response);
        window.location.pathname = '/friends.html';
    });
  }


    $scope.search = function(friendsLike){
      if(friendsLike === ""){
        $scope.searchFriends = [];
      }
      else{
        var friend = {email: friendsLike};//{email: new RegExp('^'+friendsLike+'$', "i")};
        $http.post('/searchFriends',friend)
        .success(function(response){
            console.log(response);
			      $scope.searchFriends = response;
        });
      }
    }

    $scope.publish = function(surveyId){
        console.log(surveyId);
        var survey = {_id: surveyId, status: 'psh'};
        $http.post('/modify', survey)
        .success(function(response){
            console.log(response);
            window.location.pathname = '/dashboard.html';
        });
    }

    $scope.delete = function(surveyId){
        console.log(surveyId);
        var selected = {_id: surveyId, type: 'remove'};
        $http.post('/select',selected)
        .success(function(response){
            console.log(response);
            $("#confirmDelete").attr("hidden", false);
        });
    }


});

friends.controller('main', function($scope, $element, $compile,$http) {
	$scope.logout = function(){
		$http.post('/logOut',JSON.parse('{}'))
		.success(function(response){
			window.location.pathname = '/';
		});
	}

    $scope.addSurvey = function(){
        window.location.pathname = '/edit.html';
	}

  $scope.confirmDelete = function(){
      $http.post('/remove',JSON.parse("{}"))
      .success(function(response){
          console.log(response);
          window.location.pathname = '/dashboard.html';
      });
  }

  $scope.cancelConfirmation = function(){
    $("#confirmDelete").attr("hidden", true);
  }


});
