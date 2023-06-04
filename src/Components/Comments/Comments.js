import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import Comment from "./Comment";
//
const API = process.env.REACT_APP_API_URL;

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  // const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${API}/communityBoard/${postId}/comments`)
      .then((res) => {
        console.log("DATA:", res.data);
        setComments(res.data);
      })
      .catch((err) => console.warn(err));
  }, []);
  return (
    <div className="comments">
      {comments.map((comment) => {
        return <Comment comment={comment} key={comment.id} />;
      })}
    </div>
  );
}
