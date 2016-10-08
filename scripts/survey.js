var answer = angular.module('answer', []);

answer.controller('survey', function($scope, $element, $compile,$http) {

    $http.post('/load',JSON.parse('{}'))
	.success(function(response){
		console.log(response);
        var survey = response;
        $scope.name = survey.name;
        $scope.desc = survey.desc;
        survey.questions.forEach(function(question){
            addQuestion(question);
        });
	});

    $scope.questionsAdded = 0;
    var addQuestion = function(question){
        var templates = $('#questionTemplates');
        var questionTemplate = templates.find('#question').clone();
        var questionName = $scope.questionsAdded++;
        console.log(questionTemplate);
        questionTemplate[0].id='question' + questionName;
        questionTemplate[0].children[1].innerHTML = questionName;
        console.log(questionTemplate[0]);
        $('#questions').append(questionTemplate[0]);

        $compile(questionTemplate[0])($scope);
        var questionScope = angular.element(questionTemplate[0]).scope();
        questionScope.name = question.name;
        questionScope.desc = question.desc;
        questionScope._id = question._id;
        question.fields.forEach(function(field){
            addField(questionTemplate[0],field);
        });


    }

    $scope.fieldsAdded = 0;

    var addField = function(questionTemplate, field){

        var question = $('#' + questionTemplate.id);
        console.log(question);
        var fieldType = field.type ;
        var templates = $('#fieldTemplates');


        if(fieldType === 'boo'){
            var fieldEdit = templates.find('#checkboxTemplate').clone();
            fieldEdit[0].id= 'field' + $scope.fieldsAdded++;
            question.find('#fields').append(fieldEdit[0]);
        }
        else if(fieldType === 'str'){
            var fieldEdit = templates.find('#textTemplate').clone();
            fieldEdit[0].id= 'field' + $scope.fieldsAdded++
            question.find('#fields').append(fieldEdit[0]);
        }
        else if(fieldType === 'dat'){
            var fieldEdit = templates.find('#dateTemplate').clone();
           fieldEdit[0].id= 'field' + $scope.fieldsAdded++;
            question.find('#fields').append(fieldEdit[0]);
        }
        else if(fieldType === 'lst'){
            var fieldEdit = templates.find('#selectTemplate').clone();
            fieldEdit[0].id= 'field' + $scope.fieldsAdded++;
            question.find('#fields').append(fieldEdit[0]);
        }

		$compile(fieldEdit[0])($scope);
        var fieldScope = angular.element(fieldEdit[0]).scope();
        console.log(fieldScope);
        fieldScope.name = field.name;
        fieldScope._id = field._id;
        console.log(Date.parse(field.answer) + "    " + new Date(field.answer));
        fieldScope.value = (field.type === 'dat')? new Date(field.answer): field.answer;

    }

  $scope.answer = function(){
        var survey = {};

        survey.questions = [];
        var questions = $('#questions')[0].children;
        for(var q=0; q<questions.length; q++){
            var questionScope = angular.element(questions[q]).scope();
            survey.questions[q] = {};
            survey.questions[q]._id = questionScope._id;

			var fields = $("#" + questions[q].id).find('#fields')[0].children;

			survey.questions[q].fields = [];
			for(var f=0; f<fields.length; f++){
                 console.log(fields[f]);
				var fieldScope = angular.element(fields[f]).scope();
				survey.questions[q].fields[f] = {};
				survey.questions[q].fields[f].answer = fieldScope.value;
                survey.questions[q].fields[f]._id = fieldScope._id;

			}
        }

        console.log(survey);
        $http.put('/answer',JSON.stringify(survey));
    }


});


answer.controller('question', function($scope, $element, $compile) {
});

answer.controller('field', function($scope, $element,$compile) {

});
