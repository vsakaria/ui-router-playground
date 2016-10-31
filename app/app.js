'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'myApp.version',
  'ui.router'
])

.config([ '$stateProvider', '$locationProvider', function( $stateProvider, $locationProvider) {

     $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

  	var states = [
  		{
		    name: 'hello',
		    url: '/hello',
		    component: 'hello'
		},

	 	{
			name: 'about',
			url: '/about',
			component: 'about'
		},

		{
			name: 'people',
		  	url: '/people',
			component: 'people',
			resolve: {
		        people: function(PeopleService) {
		        	return PeopleService.getAllPeople();
		    	}
		    }
		},

		{
			name: 'people.person',
			url: '/{personId}',
			component: 'person',
			resolve: {
				person: function(PeopleService, $transition$) {
					  return PeopleService.getPerson($transition$.params().personId);
					}
				}
		}
	];

	states.forEach(function (state) {
		$stateProvider.state(state);	
	})

}])

.component('hello', {
	template:  '<h3>Hello</h3>'
})

.component('about', {
	template:  '<h3>Its the UI-Router<br>Hello Solar System app!</h3>'
})

.component('people', {
	template: `
				<h3>Some people:</h3>
		  		
				<div class="people">
			  		<ul>
			      		<li ng-repeat="person in $ctrl.people">

			        		<a ui-sref="people.person({ personId: person.id })">
			          			{{person.name}}
			          			{{person.id}}
			        		</a>
			      		
			      		</li>
			    	</ul>
			    </div>

			    <ui-view></ui-view>
		    `,	

	bindings: { people: '<' }
})

.component('person', {
	template:  `<h3>
					Person:
					{{$ctrl.person.name}}
					{{$ctrl.person.skill}}
				</h3>`,

	bindings: { person: '<' }
})

.service('PeopleService', function ($http, $q) {
	var BASE_URL = "http://localhost:3000";

	this.getAllPeople = function () {
		return $http.get(BASE_URL + "/db")
			.then(this.successCallback);
	}

    this.getPerson = function(id) {

		return $http.get(BASE_URL + "/" + id)
			.then(this.successCallback);
    }

    this.successCallback = function (response) {
		return response.data;
	}
})