import React, { useState } from "react";
import axios from "axios";


export const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  
  

  const createPostHandler = async () => {
  try {
    const formData = new FormData();

    formData.append("caption", caption);
    formData.append("image", image);

    

    const res = await axios.post(
      "http://localhost:8000/api/v1/auth/create",
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(res.data);

    setCaption("");
    setImage(null);
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="bg-white rounded-xl shadow-md p-4 max-w-2xl mx-auto mt-5">
      <textarea
        rows={3}
        value={caption}
        placeholder="What's on your mind?"
        className="w-full resize-none border-none outline-none text-lg"
        onChange={(e) => setCaption(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <hr className="my-3" />

      <button
        onClick={createPostHandler}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
      >
        Post
      </button>
    </div>
  );
};

export default CreatePost;
