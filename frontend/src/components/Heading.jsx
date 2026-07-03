export function Heading({label}){//hoisting happens(not arrow funtion type of declaration) 
                                    // (2 ways have same functionality(with and without arrow declaration )
    return <div className="font-bold text-4xl pt-6">
        {label}
    </div>
}