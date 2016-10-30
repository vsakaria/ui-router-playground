'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'myApp.version',
  'ui.router'
])

.config([ '$stateProvider', function( $stateProvider) {

  	var helloState = {
		    name: 'hello',
		    url: '/hello',
		    component: 'hello'
		};

	var aboutState = {
			name: 'about',
			url: '/about',
			component: 'about'
		};

	var peopleState = {
			name: 'people',
		  	url: '/people',
			component: 'people',
			resolve: {
		        people: function(PeopleService) {
		        	return PeopleService.getAllPeople();
		    	}
		    }
		};

	$stateProvider.state(helloState);
	$stateProvider.state(aboutState);
	$stateProvider.state(peopleState);

}])

.component('hello', {
	template:  '<h3>Hello</h3>'
})

.component('about', {
	template:  '<h3>Its the UI-Router<br>Hello Solar System app!</h3>'
})

.component('people', {
	template: '<h3>Some people:</h3>' +
			    '<ul>' +
			    '  <li ng-repeat="person in $ctrl.people">' +
			    '    <a ui-sref="person({ personId: person.id })">' +
			    '      {{person.name}}' +
			    '    </a>' +
			    '  </li>' +
			    '</ul>',	

	bindings: { people: '<' },
})

.service('PeopleService', function ($http, $q) {
	var BASE_URL = "http://localhost:3000/db";

	this.getAllPeople = function () {
		return $http.get(BASE_URL)
			.then(this.successCallback);
	}

	this.successCallback = function (response) {
		return response.data;
	}
})