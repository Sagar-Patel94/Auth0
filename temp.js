// import { AuthenticationClient, ManagementClient } from "auth0";

// let auth0 = new AuthenticationClient({
//   domain: '{YOUR_ACCOUNT}.auth0.com',
//   clientId: '{OPTIONAL_CLIENT_ID}',
// })

// let management = new ManagementClient({
//   token: '',
//   domain: 'dev-gb6hg7rbmkr7mow8.us.auth0.com',
// })

// management.createUser({
//   "connection": "username-password",
//   "email": event.data.MyUser.node.email,
//   "username": event.data.MyUser.node.firstname,
//   "password": "secret",
//   "email_verified": false,
//   "verify_email": false
//   })
//   .then(function (users) {
//     console.log(users);
//   })
//   .catch(function (err) {
//    console.log(err);
//   }); 


// module.exports = function (event) {
//     console.log('Received event')
    
//     var ManagementClient = require('auth0').ManagementClient;
    
//     var management = new ManagementClient({
//     domain: 'MYDOMAIN.auth0.com',
//     clientId: 'SECRET',
//     clientSecret: 'SECRET',
//     scope: "create:users" });
    
//     management.createUser({
//     "connection": "username-password",
//     "email": event.data.MyUser.node.email,
//     "username": event.data.MyUser.node.firstname,
//     "password": "secret",
//     "email_verified": false,
//     "verify_email": false
//     })
//     .then(function (users) {
//       console.log(users);
//     })
//     .catch(function (err) {
//      console.log(err);
//     }); 
//   }