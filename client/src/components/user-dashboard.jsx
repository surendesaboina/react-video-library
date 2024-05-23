import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import CommentsModal from './CommentsModal';
import 'bootstrap/dist/css/bootstrap.min.css';

export function UserDashboard() {
    const [videos, setVideos] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [selectedVideoId, setSelectedVideoId] = useState(null);
    const [cookies, setCookies, removeCookie] = useCookies(['user-id']);
    let navigate = useNavigate();
    const [comments, setComments] = useState({});

    function LoadVideos(category = 'ALL') {
        let url = 'http://localhost:3030/get-videos';
        if (category !== 'ALL') {
            url = `http://localhost:3030/get-videos/${category}`;
        }
        axios.get(url)
            .then(response => {
                setVideos(response.data);
                response.data.forEach(video => {
                    axios.get(`http://localhost:3030/get-comments/${video.VideoId}`)
                        .then(commentResponse => {
                            setComments(prevComments => ({
                                ...prevComments,
                                [video.VideoId]: commentResponse.data.length
                            }));
                        });
                });
            });
    }
    
    useEffect(() => {
        LoadVideos();
    }, []);

    function handleSignoutClick() {
        removeCookie('user-id');
        navigate('/user-login');
    }

    function handleLikeClick(videoId, liked) {
        const userId = cookies['user-id'];
        axios.put(`http://localhost:3030/update-like/${videoId}/${liked}/${userId}`)
            .then(response => {
                setVideos(prevVideos =>
                    prevVideos.map(video =>
                        video.VideoId === videoId ? { ...video, Likes: response.data.Likes, liked: !video.liked } : video
                    )
                );
            });
    }

    function handleDislikeClick(videoId, disliked) {
        const userId = cookies['user-id'];
        axios.put(`http://localhost:3030/update-dislike/${videoId}/${disliked}/${userId}`)
            .then(response => {
                setVideos(prevVideos =>
                    prevVideos.map(video =>
                        video.VideoId === videoId ? { ...video, Dislikes: response.data.Dislikes, disliked: !video.disliked } : video
                    )
                );
            });
    }

    function handleCommentsClick(videoId) {
        setSelectedVideoId(videoId);
        setModalShow(true);
    }

    function updateCommentsCount(videoId, count) {
        setComments(prevComments => ({
            ...prevComments,
            [videoId]: count
        }));
    }
    
    function handleCategory(event) {
        LoadVideos(event.target.value);
    }

    return (
        <div  style={{minHeight:'76vh'}}>
            <h3>{cookies['user-id']} Dashboard - <button onClick={handleSignoutClick} className="btn btn-danger">Signout</button></h3>
            <div className="my-3">
                <select onChange={handleCategory}>
                    <option value="ALL">ALL</option>
                    <option value="React JS">React JS</option>
                    <option value="Python">Python</option>
                    <option value="Java">Java</option>
                    <option value="HTML">HTML</option>
                    <option value="SQL">SQL</option>
                    <option value="MongoDB">MongoDB</option>
                </select>
            </div>
            <main className="d-flex flex-wrap">
                {
                    videos.map(video => (
                        <div key={video.VideoId} className="card m-2 p-2 bg-black text-white" style={{ width: '250px' }}>
                            <div className="card-header" style={{ height: '200px' }}>
                                <iframe src={`https://www.youtube.com/embed/${video.Url}`} title={video.Title} width="100%" height="200"></iframe>
                            </div>
                            <div className="card-body">
                                {video.Title}
                            </div>
                            <div className="card-footer text-danger bg-light">
                                <button onClick={() => handleLikeClick(video.VideoId, !video.liked)} className="bi bi-hand-thumbs-up btn"> {video.Likes}</button>
                                <button onClick={() => handleDislikeClick(video.VideoId, !video.disliked)} className="bi bi-hand-thumbs-down btn"> {video.Dislikes}</button>
                                <button className="bi bi-chat-right-dots btn" onClick={() => handleCommentsClick(video.VideoId)}> {comments[video.VideoId] || 0}</button>
                            </div>
                        </div>
                    ))
                }
            </main>
            <CommentsModal
                show={modalShow}
                handleClose={() => setModalShow(false)}
                videoId={selectedVideoId}
                userId={cookies['user-id']}
                updateCommentsCount={updateCommentsCount} 
            />
        </div>
    );
}
