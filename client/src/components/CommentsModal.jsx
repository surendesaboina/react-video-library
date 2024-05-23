import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

function CommentsModal({ show, handleClose, videoId, userId, updateCommentsCount }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        if (videoId) {
            axios.get(`http://localhost:3030/get-comments/${videoId}`)
                .then(response => {
                    setComments(response.data);
                });
        }
    }, [videoId]);

    function handleCommentSubmit() {
        const newCommentId = new Date().getTime();

        axios.post('http://localhost:3030/add-comment', {
            CommentId: newCommentId,
            VideoId: videoId,
            CommentText: newComment,
            UserId: userId
        }).then(() => {
            updateCommentsCount(videoId, comments.length + 1);
            setComments(prevComments => [...prevComments, { CommentId: newCommentId, CommentText: newComment, UserId: userId }]);
            setNewComment("");
        });
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Comments</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {comments.map(comment => (
                    <div key={comment.CommentId} className="bg-light text-dark p-2 m-2">
                        {comment.CommentText}
                    </div>
                ))}
                <input
                    type="text"
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    placeholder="Add a comment"
                    className="form-control mt-2"
                />
                <Button onClick={handleCommentSubmit} className="mt-2">Submit</Button>
            </Modal.Body>
        </Modal>
    );
}

export default CommentsModal;
