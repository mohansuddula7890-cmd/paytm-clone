import { useState } from "react";
import  axios  from "axios";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom"
export const SendMoney=()=>{
    const[amount,setAmount]=useState("");
    const[success,setSuccess]=useState("");
    const[error,setError]=useState("");
    const[loading,setLoading]=useState("");

    const [searchParams]=useSearchParams();
    const navigate=useNavigate();
    const id=searchParams.get("id");
    const name=searchParams.get("name");//searchParams used to get search/Query parameters
    function isAmountValid(){
        const num=Number(amount);
        return Number.isInteger(num)&&num>0;
    }
    const handleTransfer=async ()=>{
        if(!isAmountValid()){
            setError("Please enter alid Whole number amount greater than 0");
            return;
        }
        setLoading(true)
        setError("");
        setSuccess("");
        try{
            const response=await axios.post("http://localhost:3000/api/v1/account/transfer",
                {
                    userId:id,
                    balance:Number(amount)
                },
                {
                    headers:{
                        Authorization:"Bearer "+localStorage.getItem("token")
                    }
                }
            )
            setSuccess("Transfer succesfull!");
            setTimeout(()=>{
                navigate("/dashboard")
            },1200)


        }catch(err){
            //Handle errors:session expired,network error,or backend error.Please login again.
            console.error("Transfer failed:",err);
            if(err.response?.status===401){// ?. is for safely accessing status from server .without it,if status is undefined 
                                            //program crashes
                setError("Session Expired.Please login again.");
                localStorage.removeItem("token");
                navigate("/signin");
            }
            else if(err.message==="Network Error"){
                setError("Network error. Please check your network connection ");
            }else{
                setError(err.response?.data?.message||"Transfer failed.Please try again.")
            }
        }finally{
                setLoading(false);
            }

    }
    return(
         <div className="bg--gray-300 h-screen flex justify-center">{/* */}
           <div className="h-full flex flex-col justify-center">
            <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">

            

           
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
            <div className="p-6">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-green-400  flex items-center justify-center ">
                                    <span aria-label="Recipiant intial" className="text-2xl text-white ">{name?.[0].toUpperCase()||'A'}</span>


                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold">{name||'User'}</h3>

                    </div>

                </div>
            </div>

            
            
            <label htmlFor="amount" className="   text-1xl font-medium leading ">Amount(in Rs)   :    </label>

            <input type="text"  className="border" id="amount" aria-label="Amount to transfer" placeholder="Enter Amount" value={amount} onChange={(e)=>setAmount(e.target.value)} min="1" step="1"/>
            {/* htmlFor and id of input both same ,so that when we click on label input will be activated */}
            {error&&(<div> {error}</div>)}
            {success&&(<div>{success}</div>)}
            <button onClick={handleTransfer} className="bg-green-400 text-white rounded text-2xl font-light hover:bg-black"disabled={loading||!isAmountValid()} aria-label="Intiate money transfer">{loading?"Proccessing...":"Intiate Transfer"}</button>
            
            </div>
            </div>



            
        </div>
    )

}
