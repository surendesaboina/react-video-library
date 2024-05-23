import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


export function DeleteVideo()
{
    let params = useParams([]);
    let navigate = useNavigate();
    const [videos, setVideos] = useState([{VideoId:0, Title:'', Url:'', Description:'', Views:0, Likes:0, Dislikes:0, CategoryId:0}]);

    useEffect(()=>{
        axios.get(`https://react-video-library-server.vercel.app/get-video/${params.id}`)
        .then(response=>{
            setVideos(response.data);
        })
    },[])

    function handleYesClick(){
        axios.delete(`https://react-video-library-server.vercel.app/delete-video/${params.id}`)
        .then(()=>{
            navigate("/admin-dashboard");
        })
    }

    return(
        <div style={{height:"76vh"}}>
            <h3>Delete Video</h3>
            <p>Are you sure? What to Delete?</p>
            <div className="card w-25">
                <div className="card-header">
                    <iframe width="100%" src={`https://www.youtube.com/embed/${videos[0].Url}`} ></iframe>
                </div>
                <div className="card-body">
                    {videos[0].Title}
                </div>
                <div className="card-footer">
                    <button onClick={handleYesClick} className="btn btn-success me-2">Yes</button>
                    <Link className="btn btn-danger" to="/admin-dashboard">No</Link>
                </div>
            </div>
        </div>
    )
}