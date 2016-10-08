var dashboard = angular.module('dashboard', []);
dashboard.controller('categories', function($scope, $element, $compile,$http) {
    $scope.surveys={};
	$scope.userSurveys={};
  $scope.friendsSurveys={};


/*On load*/

	$http.get('/dashboard',JSON.parse('{}'))
	.success(function(response){
		console.log("res " + response);
		if(response === 'ERROR'){
			window.location.pathname = '/';
		}
		else{
			$scope.surveys = response.popularSurveys;
			$scope.userSurveys = response.mySurveys;
      $scope.friendsSurveys = response.friendsSurveys;
		}
	});


    $scope.edit = function(surveyId){
        console.log(surveyId);
        var selected = {_id: surveyId, type: 'edit'};
        $http.post('/select',selected)
        .success(function(response){
            console.log(response);
			      window.location.pathname = '/survey.html';
        });
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
            $("#confirmDelete").css("animation","shadein 0.2s");
        });
    }


});

dashboard.controller('main', function($scope, $element, $compile,$http) {

  $scope.toggleSearch = function(table){


    if(!$('#' + table + 'Search').attr('hidden')){
      $('#' + table + 'Search').attr('hidden', true);
      $('#' + table + 'Title').attr('hidden', false);
      $('#' + table + ' #searchButton')[0].innerText='Cancel';
    }
    else{
      $('#' + table + 'Search').attr('hidden', false);
      $('#' + table + 'Title').attr('hidden', true);
      $('#' + table + ' #searchButton')[0].innerText='Search';
    }
	}

	$scope.logout = function(){
		$http.post('/logOut',JSON.parse('{}'))
		.success(function(response){
			window.location.pathname = '/';
		});
	}

    $scope.addSurvey = function(){
        window.location.pathname = '/edit.html';
	}

  $scope.manageFriends = function(){
      window.location.pathname = '/friends.html';
}

  $scope.confirmDelete = function(){
      $http.post('/remove',JSON.parse("{}"))
      .success(function(response){
          console.log(response);
          window.location.pathname = '/dashboard.html';
      });
  }

  $scope.cancelConfirmation = function(){
    $("#confirmDelete").css("animation","shadeout 0.2s");
    window.setTimeout(function(){
      $("#confirmDelete").attr("hidden", true);
    },200);

  }


});
