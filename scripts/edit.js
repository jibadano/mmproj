var edit = angular.module('edit', []);

edit.controller('survey', function($scope, $element, $compile,$http) {
    $scope.questionsAdded = 1;

    $scope.add = function(){
        var templates = $('#questionTemplates');
        var questionTemplate = templates.find('#question').clone();
        var questionName = $scope.questionsAdded
        questionTemplate[0].id='question' + $scope.questionsAdded++;
        questionTemplate[0].children[1].innerHTML = questionName;
        console.log(questionTemplate[0]);
        $('#questions').append(questionTemplate[0]);
        $('#addQuestion').attr('href','#' + questionTemplate[0].id);
        $compile(questionTemplate[0])($scope);
    }


    $scope.save = function(){
        var survey = {};
        survey.name = $scope.name;
        survey.desc = $scope.desc;

        survey.questions = [];
        var questions = $('#questions')[0].children;
        for(var q=0; q<questions.length; q++){
            var questionScope = angular.element(questions[q]).scope();
            survey.questions[q] = {};
            survey.questions[q].name = questionScope.name;
            survey.questions[q].desc = questionScope.desc;
			var fields = $("#" + questions[q].id).find('#fields')[0].children;

			survey.questions[q].fields = [];
			for(var f=0; f<fields.length; f++){
                 console.log(fields[f]);
				var fieldScope = angular.element(fields[f]).scope();
				survey.questions[q].fields[f] = {};
				survey.questions[q].fields[f].name = fieldScope.name;
				survey.questions[q].fields[f].type = fields[f].getAttribute('type');;
				survey.questions[q].fields[f].answer = fieldScope.value;
			}
        }

        console.log(survey);
        $http.put('/add',JSON.stringify(survey)).success(function(response){
          window.location.pathname = '/dashboard.html';

        });
    }

});


edit.controller('question', function($scope, $element, $compile) {
    $scope.fieldsAdded = 0;

    $scope.fieldTypes = [{id:'nul', name:'Choose option'},
                         {id:'boo', name:'Combo box'},
                         {id:'str', name:'Text field'},
                         {id:'dat', name:'Date field'},
                         {id:'lst', name:'Select field'}];
    $scope.fieldTypes.selected = $scope.fieldTypes[0];

    $scope.add = function(){
        console.log($element);
        var templates = $('#editComponents');
        var fieldTemplate = templates.find('#field').clone();
        fieldTemplate[0].id='field' + $scope.fieldsAdded++;
        var questionId = $element[0].id;
        $('#' + questionId).find('#fields').append(fieldTemplate[0]);
        $compile(fieldTemplate[0])($scope);
    }

    $scope.remove = function(){
        console.log($element);
        $element.remove();
    }

    $scope.change = function(){
        $scope.fieldsAdded++;
        var fieldType = $scope.fieldTypes.selected.id;
        var question = $('#' + $element[0].id);
        var templates = $('#fieldTemplates');


        if(fieldType === 'boo'){
            var fieldEdit = templates.find('#checkboxTemplate').clone();
            fieldEdit[0].id= 'field' + $scope.fieldsAdded;
            question.find('#fields').append(fieldEdit[0]);
        }
        else if(fieldType === 'str'){
            var fieldEdit = templates.find('#textTemplate').clone();
            fieldEdit[0].id= 'field' + $scope.fieldsAdded;
            question.find('#fields').append(fieldEdit[0]);
        }
        else if(fieldType === 'dat'){
            var fieldEdit = templates.find('#dateTemplate').clone();
           fieldEdit[0].id= 'field' + $scope.fieldsAdded;
            question.find('#fields').append(fieldEdit[0]);
        }
        else if(fieldType === 'lst'){
            var fieldEdit = templates.find('#selectTemplate').clone();
            fieldEdit[0].id= 'field' + $scope.fieldsAdded;
            question.find('#fields').append(fieldEdit[0]);
        }

        $scope.fieldTypes.selected = $scope.fieldTypes[0];

		$compile(fieldEdit[0])($scope);
    }
});

edit.controller('field', function($scope, $element,$compile) {

});
