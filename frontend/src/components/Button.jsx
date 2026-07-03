export function Button({label,onClick}){
    return(
        <div>
            <button onClick={onClick} type="button" class="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none">
                {label}
                </button>
        </div>
    )
}