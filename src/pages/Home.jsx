import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import CreatePost from '@/components/CreatePost';
import axios from "axios";
import PostCard from '@/components/PostCard';


const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect ( () => {
    const fetchPosts = async () => {
      try{
        const res = await axios.get("http://localhost:8000/api/v1/auth/all");
        
        console.log(res.data.posts);
        setPosts(res.data.posts);
      } catch(error){
        console.log(error);
      }
    };

    fetchPosts();
  }, []);



  return (
    <div>
      <Navbar/>
      <SidebarProvider>
      <AppSidebar />

      <main className="flex-1 p-4">
        <SidebarTrigger />
        <CreatePost/>

        {
          posts.map((post) => (
            <PostCard key={post._id} post={post}/>
          ))
        }

      </main>
    </SidebarProvider>
    </div>

    
  )
}

export default Home
