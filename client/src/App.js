import './App.css';
import React,{useEffect,createContext,useReducer, useContext} from "react"
import Navbar from './components/navbar';
import{BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Profile from './components/profile';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import { initialState, UserReducer } from './Reducer/UserReducer';

export const UserContext=createContext()

const Routing=()=>{
  const history=useHistory()
  const{state,dispatch}= useContext(UserContext)
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"))
    if(user){
      history.push('/')
      dispatch({type:"USER",payload:user})
    }
    else
      history.push('/Login')
  },[])
  return(
    <Switch>
        <Route exact path="/"><Home/></Route>
        <Route path="/profile"><Profile /></Route>
        <Route path="/Login"><Login/></Route>
        <Route path="/SignUp"><SignUp /></Route>
    </Switch>
  )
}
function App() {
  const [state,dispatch]=useReducer(UserReducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <Navbar/>
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
