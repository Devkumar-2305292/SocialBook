import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { IoShareOutline } from "react-icons/io5";
import { useState } from "react";
import axios from "axios";

const PostCard = ({ post }) => {

  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes.length);
  const [error, setError] = useState(null);

  const toggleLike = async () => {
    
    try{
      const res = await axios.post(`http://localhost:8000/api/v1/auth/like/${post._id}`,
        {},
        {
          withCredentials: true,
        }
      );

      setLiked(res.data.liked);
      setLikesCount(res.data.likes);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-5">
      <div className="bg-white rounded-xl shadow-md p-4">

        {/* Header */}
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/150"
            alt="profile"
            className="w-12 h-12 rounded-full object-cover"
          />

          <div>
            <h2 className="font-semibold text-gray-800">
              {post.author?.firstname} {post.author?.lastname}
            </h2>

            <p className="text-xs text-gray-500">
              2 hours ago
            </p>
          </div>
        </div>

        {/* Caption */}
        <p className="mt-4 text-gray-800 text-[15px] leading-6">
          {post.caption}
        </p>

        {/* Image */}
        {post.image && (
          <img
            src={post.image}
            alt="post"
            className="w-full rounded-lg mt-3"
          />
        )}

        <hr className="my-4" />

        {/* Buttons */}
        <div className="flex justify-between">

          <button onClick={toggleLike} className="flex items-center justify-center gap-2 w-full py-2 rounded-lg hover:bg-gray-100 transition">
            <AiOutlineLike className="text-2xl text-gray-600" />
            <span className="text-gray-600 font-medium">Like {likesCount > 0 && `(${likesCount})`}</span>
          </button>

          <button className="flex items-center justify-center gap-2 w-full py-2 rounded-lg hover:bg-gray-100 transition">
            <FaRegComment className="text-xl text-gray-600" />
            <span className="text-gray-600 font-medium">Comment</span>
          </button>

          <button className="flex items-center justify-center gap-2 w-full py-2 rounded-lg hover:bg-gray-100 transition">
            <IoShareOutline className="text-2xl text-gray-600" />
            <span className="text-gray-600 font-medium">Share</span>
          </button>

        </div>
      </div>
    </div>
  );
};

export default PostCard;