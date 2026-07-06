import {
  Route,Routes
}from "react-router-dom";

import { useEffect,useState } from "react";
import axios from "axios";
import {Signup} from "./pages/Signup"
 import {Signin} from "./pages/Signin"
  import { Dashboard } from "./pages/Dashboard";
import {SendMoney} from "./pages/SendMoney"
function App() {
  const[msg,setMessage]=useState("");
  // localStorage.setItem("test", "Hello Mohan");
  //           const value = localStorage.getItem("test");
  useEffect(()=>{
        // localStorage.setItem("test", "Hello Mohan");
        //     const value = localStorage.getItem("test");
    const getMesg=async(req,re)=>{
      try{
        const res=await axios.get('http://localhost:3000/')
        setMessage(res.data.msg)
      }catch(e){
        console.log(e);
      }

    }
    getMesg()
  },[])
  

  return (
  <div className="text-center">
    
     
        {/* <BrowserRouter> this is done in main.jsx file*/}
        <Routes>
          <Route path="/" element={  <h1>PAYMENT APP 
            <h1>{msg} </h1>

          </h1>}/>
          
          <Route path="/signup" element={<Signup/>}/>
          <Route path ="/signin" element={<Signin/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/send" element={<SendMoney/>}/> 
         

        </Routes>

        

         {/* </BrowserRouter>   */}

   </div>
  )
}

export default App
