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
		    template: '<h3>hello world!</h3>'
		};

	var aboutState = {
			name: 'about',
			url: '/about',
			component: 'about'
		};

	var people = {
			name: 'people',
		  	url: '/people',
			template: '<h3>People</h3>'		  
		};

	$stateProvider.state(helloState);
	$stateProvider.state(aboutState);
	$stateProvider.state(people);

}])

.component('about', {
	template:  '<h3>Its the UI-Router<br>Hello Solar System app!</h3>'
})

// .component('people', {
// 	template:  '<h3>People of the Solar System!</h3>',

//     controller: function() {
// 	    this.greeting = 'People';
	  
// 	    this.toggleGreeting = function() {
// 	    	this.greeting = (this.greeting == 'hello') ? 'whats up' : 'hello';
// 	    }
// 	}
// })

.service('PeopleSerivce', function ($http, $q) {
	var BASE_URL = "http://localhost:3000/db";

	this.getAllPeople = function () {
		$http.get(BASE_URL)
			.then(this.successCallback);
	}

	this.successCallback = function (response) {
		return response;
	}
})
