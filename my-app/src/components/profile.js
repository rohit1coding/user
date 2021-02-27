import React,{useState} from 'react'
import { Link} from 'react-router-dom'
import Axios from 'axios'
const Profile=()=>{
    var data=JSON.parse(localStorage.getItem('user'))
    var blankImg="https://res.cloudinary.com/rohit1coding/image/upload/v1613576167/blank-profile-picture-973460_640_k0dny4.webp"
    const [image,setImage]=useState(data.pic)
    const postImage=(files)=>{
        const formData=new FormData()
        formData.append("file",files)
        formData.append("upload_preset","project")
        formData.append("cloud_name","rohit1coding")
        Axios.post("https://api.cloudinary.com/v1_1/rohit1coding/image/upload",formData)
            .then(dataP=>{
                console.log(dataP.data.url)
                localStorage.getItem('user',JSON.stringify({pic:dataP.data.url}))
                fetch("/UpdatePic",{
                    method:"put",
                    headers:{
                        "Content-Type":"application/json",
                        "authorization":localStorage.getItem("jwt")
                    },
                    body:JSON.stringify({
                        pic:dataP.data.url,
                        _id:data._id
                    })
                }).then(res=>res.json)
                .then(result=>{console.log(result);setImage(dataP.data.url)})
            })
            .catch(err=>{console.log(err)})
    }
    const deleteProfile=()=>{
        fetch("/deleteProfile",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "authorization":localStorage.getItem("jwt")   
            },
            body:JSON.stringify({
                _id:data._id
            })
        }).then(res=>res.json())
            .then(result=>{console.log(result);setImage(blankImg);})
    }
    return (
        <div>
            <div className="profile">
                <div>
                    <div>
                <img style={{width:"160px",height:"160px",borderRadius:"80px"}} 
                src={image} />
                </div>
                <div>
                  {/* <Link to="/profile"
                    // onClick={()=>{}}
                  ><i className="material-icons small"
                    //    onClick={deleteProfile()}
                        >delete</i> </Link> */}
                  <div className="file-field input-field">
                        <div className="btn">
                            <span>Upload Pic</span>
                            <input type="file" onChange={(e)=>{postImage(e.target.files[0])}} />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" />
                        </div>
                    </div>
                </div>
                </div>
                <div>
                    <h4>{data.name}</h4>
                    <h4>{data.email}</h4>
                    <h4>{data.contact}</h4>
                </div>
            </div>
        </div>
    )
}
export default Profile