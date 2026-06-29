import React from 'react'

export const FriendsCard = ({ friends = [] }) => {
  return (
    <div className='bg-white p-4 rounded-lg shadow'>
      <h2 className='font-bold mb-3'>Friends</h2>

      <div className='space-y-2'>
        {friends.slice(0, 6).map((friend, index) => (
          <div key={index} className='flex items-center gap-3'>
            <img
              src={friend.avatar || 'https://ui-avatars.com/api/?name=' + friend.name}
              alt={friend.name}
              className='w-10 h-10 rounded-full object-cover'
            />
            <p className='font-medium'>{friend.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FriendsCard;