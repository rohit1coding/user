import React,{useState,useEffect} from 'react'
import { Link,useHistory } from 'react-router-dom'
import Axios from 'axios'
import M from 'materialize-css'
const SignUp = () => {
    const blankImg="https://res.cloudinary.com/rohit1coding/image/upload/v1613576167/blank-profile-picture-973460_640_k0dny4.webp"
    const history= useHistory();
    const [name,setName]=useState("")
    const [image,setImage]=useState("")
    const [contact,setContact]=useState("")
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
    var [url,setUrl]=useState(blankImg)
    useEffect(()=>{
        if(url)
            uploadField()
    },[url])
    const postImage=()=>{
        const formData=new FormData()
        formData.append("file",image)
        formData.append("upload_preset","project")
        formData.append("cloud_name","rohit1coding")
        Axios.post("https://api.cloudinary.com/v1_1/rohit1coding/image/upload",formData)
            .then(data=>{
                console.log(data.data.url)
                setUrl(data.data.url);
                // uploadField()
            })
            .catch(err=>{console.log(err)})
    }
    
    const uploadField=()=>{
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
        {
            M.toast({html: "Invalid Email", classes:"#c62828 red darken-3"})
              return
        }
        if(password.length<5)
        {
            M.toast({html: "Password should be at least 6 characters!", classes:"#c62828 red darken-3"})
              return
        }
        fetch("/SignUp",{
            method:"post",
            headers:{
                "Content-Type":"application/json"    
            },
            body:JSON.stringify({
                name,
                password,
                email,
                pic:url,
                contact
            })
        })
        .then(res=>res.json())
            .then(data=>{
                if(data.error)
                    M.toast({html:data.error,classes:"#e53935 red darken-1"})
                else{ 
                    M.toast({html:data.message,classes:"#43a047 green darken-1"})
                    history.push("/Login")
                }
            })
            .catch(err=>{console.log(err);})
    }
    const postData=()=>{
        if(image)
            postImage();
        else
        uploadField();
    }
    return (
        <div className="myCard">
            <div className="card auth-card">
                <h2 className="fame">InternTest</h2>
                    <input type="text" placeholder="* Full Name" 
                        value={name} onChange={(e)=>setName(e.target.value)} /> 
                    <input type="text" placeholder="* email" 
                        value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="number" placeholder="Mob Number"
                        value={contact} onChange={(e)=>setContact(e.target.value)} />
                    <input type="password" placeholder="* password"
                        value={password} onChange={(e)=>setPassword(e.target.value)} />
                    <div className="file-field input-field">
                        <div className="btn">
                            <span>Upload Pic</span>
                            <input type="file" onChange={(e)=>{setImage(e.target.files[0])}} />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" />
                        </div>
                    </div>
                    <button className="#7e57c2 deep-purple lighten-1 btn" type="submit"
                        onClick={()=>{postData()}}
                        >SignUp</button>
                <h6>Already have an Account? <Link to="/Login">Login</Link></h6>
            </div>
        </div>
    )
}

export default SignUp
