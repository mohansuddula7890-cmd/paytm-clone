import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import axios from "axios";
//  import { Error } from "mongoose";
//import { useNavigate } from "react-router-dom";

export const Users=()=>{
    const[filter,setFilter]=useState("");
    const [loading,setLoading]=useState(false);
    const[users,setUsers]=useState([]);
    const[error,setError]=useState("");
    const navigate=useNavigate();
    useEffect(()=>{
        const fetchUsers=async ()=>{
            setLoading(true);
            setError("");
            try{
                const token=localStorage.getItem("token");
                if(!token){
                    throw new Error("Not authenticated");

                }
                const response=await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/getallusers?filter=${filter}`,{
                    //${filter} insert variable value into string,only works inside ` ` not ""
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                setUsers(response.data.users||[])
            }catch(err){
                if(err.response){
                    setError(err.response?.data?.message||"failed to get users")
                }
            }
            finally{
                setLoading(false);
            }
        }
        const timer=setTimeout(()=>{
            fetchUsers();
        },300);
        return ()=>clearTimeout(timer);

    },[filter,navigate])
    return(
        <div>
            <div className="font-bold mt-6 text-lg">Users</div>
            <input onChange={(e)=>{setFilter(e.target.value)}} type="text" placeholder="Search Users..." disabled={loading}/>
            {error&&(<div>{error}</div>)}
            {loading?(<div>Loading..</div>):(<div className="p-1">{users.map(user=>(<User key={user._id} user={user} navigate={navigate}/>))}</div>)}

        </div>
    )
}
function User({user,navigate}){
    const handleSendMoney=()=>{
        navigate(`/send?id=${user._id}&name=${user.firstname}`)
    }
    const avatarIntial=user.username&&user.username.length>0?user.username[0].toUpperCase():"U";
    return(
        <div className="border p-3 w-150">
            <div className="flex">
            <div className="flex flex-col justify-center border bg-blue-200 rounded-full w-6 h-6 mt-2.5">{avatarIntial}</div>
            <div className="ml-3">
                <div className="text-left">{user.firstname} {user.lastname}</div>
                <div className="text-left">{user.username}</div>

            </div>
                
            </div >
            <div className="m-3 ml-9 mr-10">
                  <Button label={"Send Money "} onClick={handleSendMoney}/>
            </div>

        </div>
    )

}
// const User=()=>{

// }
