import React from 'react'

export const ProfileHeader = ({ profile }) => {
  return (
    <div className='bg-white'>
      <img
        src={profile.coverPhoto}
        alt="Cover"
        className='w-full h-72 object-cover'
      />

      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-4">
          <img
            src={profile.profilePicture}
            alt={profile.name}
            className='w-40 h-40 rounded-full border-4 border-white -mt-16 object-cover'
          />

          <div className='flex-1'>
            <h1 className='text-3xl font-bold'>{profile.name}</h1>
            <p className='text-gray-500'>
              {profile.friendsCount} Friends
            </p>
          </div>

          <div className='flex gap-3'>
            <button className='bg-blue-600 text-white px-4 py-2 rounded-lg'>
              Add Friend
            </button>
            <button className='bg-gray-200 px-4 py-2 rounded-lg'>Message</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
