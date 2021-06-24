angular.module('app')
.component('users', {
	
  bindings: { users: '<' },
  
  controller: function() {
    this.clickHandler = function() {
      alert('something');
    }
  },
  
  template: 
	`
	<h1>Users</h1>
    <button ng-click="$ctrl.clickHandler()">Do something</button>
    <ul>
      <li ng-repeat="user in $ctrl.users" ui-sref-active="userselected">
        <a ui-sref="userlist.detail({ userId: user.id })" 
            ng-disabled="!user.active"
            ng-class="{ deactivated: !user.active }">
          {{ user.name }}
        </a>
        
        <button ng-click="user.active = !user.active">
          {{ user.active ? "Deactivate" : "Activate" }}
        </button>
      </li>
    </ul>
    <div ui-view></div>`,
})