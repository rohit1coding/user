import React,{useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import { UserContext } from '../App'
const Navbar=()=>{
  const {state,dispatch}=useContext(UserContext)
  const history=useHistory()
  const renderList=()=>{
    if(state){
      return [
        <li key="home"><Link to="/">Home</Link></li>,
        <li key="profile"><Link to="/profile">Profile</Link></li>,
        <li key="about"><Link to="/">About Us</Link></li>,
        <li key="Logout"><button className="btn #c62828 red darken-3" 
          onClick={()=>{
            localStorage.clear();
            dispatch({type:"CLEAR"})
            history.push("/Login")
            window.location.reload()
          }}
          >Logout</button></li>
      ]
    }
    else{
      return[
      <li key="login"><Link to="/Login">Login</Link></li>,
      <li key="SignUp"><Link to="/SignUp">SignUp</Link></li>
      ]
    }
  }
    return(    
      <nav>
        <div className="nav-wrapper #673ab7 deep-purple">
          <Link to={state?"/":"/SignUp"} className="brand-logo left">InternTest</Link>
          <ul id="nav-mobile" className="right">
            {renderList()}
          </ul>
        </div>
      </nav>
    )
}
export default Navbar;