import { useNavigate } from "react-router-dom";
export const Appbar=({username})=>{//{username="User"} default prop is prop not sent
    const rawName=(username&&username.length>0)?username:localStorage.getItem("firstName"||"User");
    const titleCase=(s)=>{
        if(!s){
            return s;
        }
            return s.split(" ").filter(Boolean).map((w)=>w.charAt(0).toUpperCase()+w.slice(1)).join("")//.join(" ")is useless here
                                                                                                            //  bcz it is to make all elements in array to string with seperator
        
    }
    const displayName=titleCase(rawName);
    const avatarIntial=displayName.charAt(0).toUpperCase();
    const navigate=useNavigate()
    const handleLogout=()=>{
                if(!window.confirm("Are you sure you want to LOGOUT your account?This action cant be undone.")) return;

        localStorage.removeItem("token");
        localStorage.removeItem("firstName");
        navigate("/signin");
    }
    const handleDeleteAccount=async()=>{

        if(!window.confirm("Are you sure you want to delete your account?This action cant be undone.")) return;
      try{
        const token=localStorage.getItem("token");
        if(!token) throw new Error("Not Authenticated")
            const response=await fetch("http://localhost:3000/api/v1/user/me",{
        method:"DELETE",
        headers:{
            "Authorization":`Bearer ${token}`
          }
        
         })
           if(!response.ok){//response.ok===200 status code
             const data=await response.json();
             throw new Error(data.message||"Failed to delete account")
            
            }
         localStorage.removeItem("token");
         localStorage.removeItem("firstName");
         alert("Account deleted successfully.")
         navigate("/signin");



            //Call backend to delete account (assumes DELETE /api/v1/user/me exists)
}catch(err){
    alert(err.message||"Failed to delete account")

}
 }

    
    return(
        <div className="">
            <div className=" text-white bg-black font-bold  h-15 text-4xl min-w-screen ">
              PayTM App
            </div>
            <div className="text-2xl m-2">
                Hello,<span >{displayName}</span>
            </div>
            <div>
                
            </div>
            <div>
                <button className="w-40 m-2 border" onClick={handleLogout}>Logout</button>{/*1px=0.25 rem */}
            </div>
            <div className="m-2">
             <button className="w-40 m-0 border  "onClick={handleDeleteAccount} >Delete Account</button> 
            </div>
             
        </div>
    )

}