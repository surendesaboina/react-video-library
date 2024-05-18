import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link,useNavigate } from "react-router-dom";

export  function RegisterLink(){
    return(
        <Link to='/register-user' className="btn btn-warning">Register</Link>
    )
}

export function PasswordComponent({handleSubmit, handleChange}){
    return(
        <form onSubmit={handleSubmit} className="input-group">
        <div className="input-group">
            <input type="password" name="Password" onChange={handleChange} placeholder="Your password" className="form-control" /> 
            <button type="submit" className="btn btn-warning">Continue</button>
        </div>
        </form>
    )
}

export function VideoLibraryHome()
{

    const [view, setView] = useState('');
    let navigate = useNavigate();
    const [cookies, setCookies, removeCookie] = useCookies('user-id');

    const formik = useFormik({
       initialValues: {UserId:'', UserName:'', Password:'', Email:'', Mobile:''},
       onSubmit: (user)=>{
        //   axios.get(`http://127.0.0.1:3030/get-users`)
        axios.get(`https://react-video-library-server-56f4m4zov-surendesaboinas-projects.vercel.app/get-users`)
          .then(response=>{
              var data = response.data.find(client=> client.Email===user.Email);
              if(data){
                  setView(<PasswordComponent handleSubmit={formik.handleSubmit} handleChange={formik.handleChange}/>);
                  document.getElementById('getStarted').style.display = 'none';
                  if(data.Password===user.Password){
                    setCookies('user-id', user.UserId);
                    navigate('/user-dashboard');
                } else if(user.Password!=='') {
                    navigate('/user-error1');
                } 
              } else {
                  setView(<RegisterLink />);
              }
          })
       }
    })

    return(
        <div style={{height:'100vh'}} className="d-flex justify-content-center align-items-center">
             <main className='text-center'>
               <h1>Watch Technology Videos</h1>
               <p>Any where any time</p>
               <div className="input-group">
                   <form onSubmit={formik.handleSubmit} className="input-group">
                     <input type="email" onChange={formik.handleChange} name="Email" className="form-control" placeholder="Your email address" />
                    <button type="submit" id="getStarted" className="btn btn-danger">Get Started <span className="bi bi-chevron-right"></span> </button>
                   </form>
                   <div className="my-3">
                        {view}
                    </div>
               </div>
              
             </main>
        </div>
    )
}