import React from 'react'
import { Link, withRouter } from 'react-router-dom'

class NavBar extends React.Component {
    logout = () => {
        localStorage.removeItem('token');
        this.props.history.push('/');
      }



    render(){
        return (
            <div className='nav'>
                <Link to='/userslist'><button>Home</button></Link>
                &nbsp;  &nbsp;
                {localStorage.getItem('token') ? <button onClick={this.logout}>Log Out</button> : <Link to='/'><button>Log In/Sign Up</button></Link>}
            </div>
        )
      }
    
}

export default withRouter(NavBar)