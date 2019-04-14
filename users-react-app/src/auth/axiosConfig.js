import React from 'react'
import axios from 'axios';
import { apiUrl } from './globalVariables.js'

axios.defaults.baseURL = `${apiUrl}/api`;

axios.interceptors.request.use(
  function(request) {
    request.headers.authorization = localStorage.getItem('token')
    return request;
  },
  function(error) {
    return Promise.reject(error);
  }
)


// export function Authenticate(Component, Second) {
//     return class extends React.Component {
    
//     render() {
//       if (localStorage.getItem('token')) return <Component {...this.props} />;
//       return <h2>Please Log in First</h2>
//     }
//   }}



  // export const axiosConfig = {
//     headers: {Authorization: localStorage.getItem('token')}
// }




// export const Authenticate = App => Login =>
//   class extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         loggedIn: false
//       };
//     }
//     componentDidMount() {
//       if (!localStorage.getItem('token')) {
//         this.setState({ loggedIn: false });
//       } else {
//         this.setState({ loggedIn: true });
//       }
//     }


//     render() {
//       if (this.state.loggedIn) return <App />;
//       return <Login />;
//     }
//   };