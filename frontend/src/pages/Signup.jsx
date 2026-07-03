//backend work only pending
import {BottomWarning} from "../components/BottomWarning"
import {Button} from "../components/Button"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Heading}from "../components/Heading"
import {InputBox}from "../components/InputBox"
import {SubHeading}from "../components/SubHeading"
import axios from "axios"


export const Signup=()=>{//for export default function Signup ()  {} imported without using{}
    const [firstname,setFirstName]=useState("");
    const [lastname,setLastName]=useState("");
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const[error,setError]=useState("");
    const[loading,setLoading]=useState(false);
    
    const navigate=useNavigate();
    const handleSignup=async()=>{
        setError("");
        if(!firstname||!lastname||!username||!password){
            setError("all fields are required");
            return;
        }
        // mail validation
        // if(!username.includes("@")||!username.includes(".")){
        //     setError("Please enter a valid email");
        //     return;
        // }
        setLoading(true);
        try{console.log("Signup clicked");
            const response=await axios.post("http://localhost:3000/api/v1/user/signup",{username,password,firstname,lastname});//,{headers:{"Content-Type":"application/json"}}
            
            localStorage.setItem("token",response.data.token);
            localStorage.setItem("firstName",firstname)
            navigate("/dashboard");

        }catch(err){
            if (err.response) {
                 setError(err.response?.data?.message||"Signup failed" );
            } else if (err.request) {
                   setError("Network error. Please try again.");
            } else {
                    setError(err.message);
                   }
     
        }finally {
      setLoading(false);
    }

    }
    return(
        <div>
            <div className="bg-slate-300 h-screen flex justify-center">
                <div className="flex flex-col justify-center">
                    <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                        
                        <Heading label={"Sign up"}/>
                        <SubHeading label={"Enter your information to create your account"}/>
                        {error&&<div>{error}</div>}
                        <InputBox onChange={ (e)=>{//e= event(user interaction)
                            setFirstName(e.target.value);
                            
                        }} placeholder="John" label={"First Name"} value={firstname}/>
                        <InputBox onChange={ (e)=>{
                            setLastName(e.target.value);
                        }} placeholder="Doe" label={"Last Name"} value={lastname}/>
                        <InputBox onChange={ (e)=>{
                            setUsername(e.target.value);
                        }} placeholder="john@gmail.com" label={"Email"} value={username}/>
                        <InputBox onChange={ (e)=>{
                            setPassword(e.target.value);
                        }} placeholder="123456" label={"Password"} value={password}/>
                        <div className="pt-4">
                            <Button onClick={handleSignup} label={loading?"Creating account ..":"Sign up"} disabled={loading}/>

                        </div>
                        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}/>
                    </div>
                </div> 
            </div>

            
        </div>
    )

};
//module.exports={} used in nodejs