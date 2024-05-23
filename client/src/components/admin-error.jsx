import { Link } from "react-router-dom";


export function AdminError()
{
    return(
        <div className="text-center"  style={{minHeight:'76vh'}}>
            <h2 className="text-danger">Invalid Credentials</h2>
            <Link to="/admin-login">Try Again</Link>
        </div>
    )
}