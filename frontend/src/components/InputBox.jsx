export function InputBox({label,placeholder,onChange}){
    return(
        <div>
            <div className="text-sm font-medium text-left py-2">
                {label}
            </div>
            <input onChange={onChange} placeholder={placeholder} className="w-full px-2 py-1 border rounded border-slate-200"/>
            {/* //this onchange is input tags predefined will do that thing what we sent .onchange updates hook and is displayed 
            // in input because we used value={username}*/}
        </div>
    )
}