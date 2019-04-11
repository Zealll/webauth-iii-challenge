import React from 'react'
import axios from 'axios'
import { apiUrl } from '../auth/globalVariables'
// import { axiosConfig } from '../auth/axiosConfig.js'
import {Authenticate} from '../auth/axiosConfig'


class Users extends React.Component {
    constructor() {
        super()
        this.state = {
            users: [],
            error: ''
        }
    }

    componentDidMount() {
        axios
        .get(`${apiUrl}/users`)
        .then(response => this.setState({users: response.data}))
        .catch(error => this.setState({error: error}))
    }



    render() {
        return(
            <div className='row'>
                {this.state.users.map(usersList => (
                    <div key={usersList.id} className='card'>
                       
                            {usersList.username}
                        
                        <button>view</button>
                    </div>
                ))}
            </div>
        )
    }
}


// export default Authenticate(Users)
export default Users