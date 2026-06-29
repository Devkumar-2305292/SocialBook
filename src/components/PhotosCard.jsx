import React from 'react'

export const PhotosCard = ({ photos = [] }) => {
  return (
    <div className='bg-white p-4 rounded-lg shadow'>
      <h2 className='font-bold mb-3'>Photos</h2>

      <div className='grid grid-cols-3 gap-2'>
        {photos.slice(0, 6).map((photo, index) => (
          <img
            src={photo}
            alt={`Photo ${index + 1}`}
            key={index}
            className='rounded object-cover w-full h-20'
          />
        ))}
      </div>
    </div>
  )
}

export default PhotosCard;