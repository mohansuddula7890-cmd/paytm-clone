import {BottomWarning} from "../components/BottomWarning"
import {Button} from "../components/Button"
 import { useState } from "react";
import { useNavigate } from "react-router-dom";
 import {Heading}from "../components/Heading"
 import {InputBox}from "../components/InputBox"
 import {SubHeading}from "../components/SubHeading"
 import axios from "axios";

export const Signin=()=>{
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const[error,setError]=useState("");
    const[loading,setLoading]=useState("");
    const navigate=useNavigate();
    const handleSignin=async ()=>{
        setError("");
        if(!username||!password){
            setError("email,password required");
            return;
        }
        setLoading(true);
        try{
            const response=await axios.post("http://localhost:3000/api/v1/user/signin",{username,password})//,{headers:{"Content-Type":"application/json"}}
            console.log(response.data);
            // //if any wrong inputs or server error they go to catch.if all is good below lines will execute
            localStorage.setItem("token",response.data.token);
            // //optionally storing username
            if(response.data.firstname){
                const fn=response.data.firstname;
                const normalized=fn&&fn.length>0?fn.charAt(0).toUpperCase()+fn.slice(1):fn;
                localStorage.setItem("firstName",normalized)
            }
            navigate("/dashboard");

        }catch(err){
            if(err.response){//server errors like 400,401,500
                setError(err.response?.data?.message||"Signin failed");
            }else if(err.request){//no response from server
                setError("Network error.Please try again.")
            }else{// wrong url ,code errors
                setError("An error occured.Please try again later");
            }
        }finally{
            setLoading(false);
        }
    }
    return(
         <div className="bg-slate-300 h-screen flex justify-center">{/* */}
            <div className="rounded-lg bg-white w-80 text-center">{/* */}
                <Heading label={"Sign in"}/>
                 <SubHeading label={"Enter your crendentials to access your account "}/>
                {/* show error (hook) if present */}
                {error&&<div >{error}</div>}
                <InputBox placeholder="harkirat@gmail.com" label={"Enter email"} value={username} onChange={(e)=>{setUsername(e.target.value)}} type="email" />
                <InputBox placeholder="123456" label={"Password"} value={password} onChange={(e)=>{setPassword(e.target.value)} }type ="password"/>
                <div className="pt-4">
                    <Button label={loading ? "Signing in ...":"sign in"} onClick={handleSignin} disabled={loading}/>
                </div>

                <BottomWarning label={"Don't have an account?" } buttonText={"Sign up"} to={"/signup"}/> 
            </div>
            
        </div>
    )

}