import React from 'react'
import user from '../assets/userIcon.webp'

const Relationship = () => {
  return (
    <div className='flex justify-left flex-row mt-6'>
        <div className='m-auto flex justify-center flex-row'> 
        <div>
            <img src={user} className='w-24 h-24'></img>
            <p className='pl-4'>client 1</p>
          </div>
          <p className='mt-8'>_______________________________________________________________________________________________________________________________________________________________________________________________________</p>
          <div>
            <img src={user} className='w-24 h-24'></img>
            <p className='pl-4'>client 2</p>
          </div>
        </div>
      </div>
  )
}

export default Relationship