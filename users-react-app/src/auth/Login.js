import React from 'react'
import axios from 'axios' 
import { apiUrl } from './globalVariables.js'
import { Link } from 'react-router-dom'

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: ''
        }
    }

    changeInput = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    submit = e => {
        e.preventDefault()

        axios
        .post(`${apiUrl}/users/login`, this.state)
        .then(response => {
            localStorage.setItem('token', response.data.token)
            this.props.history.push('/userslist')
        })
    }



    render(){
        return(
            <div className='forms'>
                <form onSubmit={this.submit}>
                    <input 
                      placeholder='User Name'
                      value={this.state.username}
                      name='username'
                      id='username'
                      onChange={this.changeInput}
                    />
                    <input 
                      placeholder='Password'
                      value={this.state.password}
                      name='password'
                      id='password'
                      onChange={this.changeInput}
                    />
                    <div className='buttons'>
                        <button>Submit</button>
                            &nbsp;  &nbsp;
                        <Link to='/users'><button>Sign Up</button></Link>
                    </div>
                 </form>
            </div>
        )
    }
}


export default Login