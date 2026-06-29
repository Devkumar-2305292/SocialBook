import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProfileHeader from "../components/ProfileHeader";
import IntroCard from "../components/IntroCard";
import PhotosCard from "../components/PhotosCard";
import FriendsCard from "../components/FriendsCard";
import PostCard from "../components/PostCard";

const Profile = () => {
  const { id } = useParams();
  const { user } = useSelector((store) => store.auth);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (!user) return;

    const profile = {
      _id: id || user._id,
      name: `${user.firstname || ""} ${user.lastname || ""}`.trim(),
      firstname: user.firstname || "User",
      lastname: user.lastname || "",
      email: user.email || "",
      bio: user.bio || "Full Stack Developer",
      location: user.location || "Bhubaneswar",
      education: user.education || "KIIT University",
      coverPhoto:
        user.coverPhoto ||
        "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
      profilePicture:
        user.profilePicture ||
        "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=300&q=80",
      friendsCount: user.friends?.length || 120,
      friends:
        user.friends ||
        [
          { name: "Rahul", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
          { name: "Aman", avatar: "https://randomuser.me/api/portraits/men/33.jpg" },
          { name: "Riya", avatar: "https://randomuser.me/api/portraits/women/32.jpg" },
          { name: "Ankit", avatar: "https://randomuser.me/api/portraits/men/34.jpg" },
        ],
      photos:
        user.photos ||
        [
          "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=300&q=80",
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=300&q=80",
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
          "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=300&q=80",
        ],
      posts:
        user.posts ||
        [
          {
            id: 1,
            author: `${user.firstname || "User"} ${user.lastname || ""}`.trim(),
            time: "2 hours ago",
            content: "Building my Facebook clone with React and Node.js.",
          },
          {
            id: 2,
            author: `${user.firstname || "User"} ${user.lastname || ""}`.trim(),
            time: "Yesterday",
            content: "Enjoying the new profile page updates and making the UI more real.",
          },
        ],
    };

    setProfileData(profile);
  }, [id, user]);

  if (!profileData) {
    return <div className="min-h-screen flex items-center justify-center">Loading profile...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen pt-16">
      <ProfileHeader profile={profileData} />

      <div className="max-w-6xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 px-4 pb-10">
        <div className="space-y-6">
          <IntroCard profile={profileData} />
          <PhotosCard photos={profileData.photos} />
          <FriendsCard friends={profileData.friends} />
        </div>

        <div className="md:col-span-2 space-y-6">
          {profileData.posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
