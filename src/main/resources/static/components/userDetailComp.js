angular.module('app')
.component('userDetail', {
  bindings: { user: '<' },
  template: `
    <h3>User {{ $ctrl.user.id }}</h3>
    
    <h2>{{ $ctrl.user.name }} {{ !$ctrl.user.active ? "(Deactivated)" : "" }}</h2>
    
    <table>
      <tr><td>Address</td><td>{{ $ctrl.user.address }}</td></tr>
      <tr><td>Phone</td><td>{{ $ctrl.user.phone }}</td></tr>
      <tr><td>Email</td><td>{{ $ctrl.user.email }}</td></tr>
      <tr><td>Company</td><td>{{ $ctrl.user.company }}</td></tr>
      <tr><td>Age</td><td>{{ $ctrl.user.age }}</td></tr>
    </table>
`,
})