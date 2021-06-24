"use babel";
let app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $urlServiceProvider) {
  $urlServiceProvider.rules.otherwise({ state: 'userlist' });
  
  $stateProvider.state('userlist', {
    url: '/users',
    component: 'users',
    resolve: {
      users: function(UserService) {
        return UserService.list();
      }
    }
  });
    
  $stateProvider.state('userlist.detail', {
    url: '/:userId',
    component: 'userDetail',
    resolve: {
      user: function($transition$, users) {
        return users.find(user => user.id == $transition$.params().userId);
      }
    }
  });

});

app.service('UserService', function($http) { 
  return {
    list: function() {
      return $http.get('./users.json', { cache: true }).then(resp => resp.data)
    }
  };
});

// preload resources in case plunker times out
app.run(function($http, $templateRequest) {
  $http.get('users.json', { cache: true });
})