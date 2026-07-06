import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import{Appbar}from "../components/Appbar"
import{Balance} from "../components/Balance"
import{Users}from "../components/Users"
import  axios  from "axios"
export const Dashboard=()=>{
    const[username,setUserName]=useState("");
    const[loading,setLoading]=useState(false);
    const[error,setError]=useState("");
      const [balance,setBalance]=useState("000");
    const navigate=useNavigate();
    useEffect(()=>{
         const fetchData=async ()=>{
            setLoading(true);
             setError("");
             try{
                 const token=localStorage.getItem("token");
                 console.log(token);
                 if(!token) throw new Error("Not authenticated");
                 const balanceResponse=await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/account/balance`,
                {
                    headers:{Authorization:`Bearer ${token}`}

                }
                 )
                 setBalance(balanceResponse.data.balance);
                 const firstName=localStorage.getItem("firstName");
                 setUserName(firstName||"User");

            }catch(err){
                if(err.response){//server errors like 400,401,500
                setError(err.response?.data?.message||"Dashboard failed");
                localStorage.removeItem("token");
                    localStorage.removeItem("firstName");
                    alert("Session expired or account deleted.Please sign in again.");
                    navigate("/signin");
            }
                else{
                    setError(err.data.message||"Failed to load dashboard")
                }
            }finally{
                 setLoading(false);
          }
        }
        fetchData();

      },[navigate])
    if(loading){
        return(<div>Loading dashboard...</div>)
    }
    if(error){
        return(<div>{error}</div>)
    }
    return(
         <div className="bg-slate-300 h-screen  flex justify-center">{/* */}
            <div className="rounded-lg bg-white w-full text-center">{/* */}
            <Appbar username={username}/> 
            <div className="m-8">
                <Balance value={balance}/>
                <div className="flex justify-center">

                    <Users/>
                </div>
            </div>
            </div>
            
        </div>
    )

}