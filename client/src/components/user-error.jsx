import { Link } from "react-router-dom";


export function UserError(){
    return(
        <div  style={{minHeight:'76vh'}}>
            <h2>Invalid Credentials</h2>
            <Link to="/user-login">Try Again</Link>
        </div>
    )
}