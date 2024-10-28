import React from 'react'
import { useSelector } from 'react-redux'

const c2Information = () => {
  const c2n = useSelector(state => state.client_1.c2n)
  const c2e = useSelector(state => state.client_1.c2e)
  return (
    <div className='bg-amber-400 rounded-md inline-flex flex-row '>
      <div className='bg-amber-600 m-4 p-2 rounded-sm'>
        <p>🔓</p>
        <p>Public Keys:</p>
        <div className='flex flex-row'>
          <p>N:</p>
          <p>{c2n}</p>
        </div>
        <div className='flex flex-row'>
          <p>e:</p>
          <p>{c2e}</p>
        </div>
      </div>

    </div>
  )
}

export default c2Information