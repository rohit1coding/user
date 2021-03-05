import React,{useState,useContext,useReducer} from 'react'
import { Link,useHistory } from 'react-router-dom'
import M from 'materialize-css'
import { UserContext } from '../App'
const Login = () => {
    const {state,dispatch}=useContext(UserContext)
    const history= useHistory();
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
    const postData=()=>{
        fetch('/Login',{
            method:"post",
            headers:{
                "Content-Type":"application/json"    
            },
            body:JSON.stringify({
                password,
                email
            })
        })
        .then(res=>res.json())
            .then(data=>{
                console.log(data)
                if(data.error)
                    M.toast({html:data.error,classes:"#e53935 red darken-1"})
                else{ 
                    localStorage.setItem("jwt",data.token)
                    localStorage.setItem("user",JSON.stringify(data.user))
                    dispatch({type:"USER",payload:data.user})
                    M.toast({html:"Login Successfully",classes:"#43a047 green darken-1"})
                    history.push("/")
                }
            })
            .catch(err=>{console.log(err);})
    }
    return (
        <div className="myCard">
            <div className="card auth-card">
                <h2 className="fame">InternTest</h2>
                {/* <form> */}
                <input type="text" placeholder="email" 
                        value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="password" placeholder="password"
                        value={password} onChange={(e)=>setPassword(e.target.value)} />
                    <button className="#7e57c2 deep-purple lighten-1 btn" type="submit"
                        onClick={()=>postData()}
                        >Login</button>
                {/* </form> */}
                <h6>Don't have Account? <Link to="/SignUp">SignIn</Link></h6>
            </div>
        </div>
    )
}

export default Login
