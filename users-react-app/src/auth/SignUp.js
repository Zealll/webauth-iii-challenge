import React from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios';

import { apiUrl } from './globalVariables'




class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
    }

    submit = e => {
        e.preventDefault()

        Axios
        .post(`${apiUrl}/users/register`, this.state)
        .then(response => {
            Axios
            .post(`${apiUrl}/users/login`, this.state)
            .then(response => {
                localStorage.setItem('token', response.data.token)
                this.props.history.push('/userslist')
            })
            .catch(error => console.log(error))
        })
    }

    changeInput = e => {
        this.setState({[e.target.name]: e.target.value})
    }







    render() {
        return(
            <div className='forms'>
                <form onSubmit={this.submit}>
                <div>Type Your Credentials</div>
                    <input 
                      placeholder='User Name'
                      name='username'
                      id='username'
                      onChange={this.changeInput}
                      value={this.state.username}
                    />
                    <input 
                      placeholder='Password'
                      name='password'
                      id='password'
                      onChange={this.changeInput}
                      value={this.state.password}
                    />
                    <button>Submit</button>
                    <Link to='/'><button>back to Log In</button></Link>
                </form>
            </div>
        )
    }
}

export default SignUp