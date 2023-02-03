import { useState } from "react"
import axios from "axios"

const Login = () =>{
    const [error,setError] = useState(false)
    const [loading,setloading] = useState(false)
    const [userName,setuserName] = useState('')
    const [password,setpassword] = useState('')
    const [user,setUser] = useState({})
    const handleClick = async(e) =>{
        e.preventDefault()
        setloading(true)
        try{
             const {data} = await axios.get("https://jsonplaceholder.typicode.com/users/1")
            // const response = await fetch("https://jsonplaceholder.typicode.com/users/1",{method:"GET"});
            // const data = await response.json();
            // return data;
            setUser(data)
        }catch{
            setError(true)
        }
        setloading(false)
    }
    return(
        <div>
            <span>{user.name}</span>
            <form>
                <input type="text" placeholder="username" value={userName} onChange={(e) =>{setuserName(e.target.value)}} />
                <input type="password" placeholder="password" value={password}  onChange={(e) =>{setpassword(e.target.value)}} />
                <button disabled={!userName || !password} onClick={handleClick} >{loading ? "please wait" : "Login"}</button>
                <span data-testid="error" style={{visibility: error ? "visible" : "hidden"}}>something went wrong</span>
            </form>
        </div>
    )
}

export default Login