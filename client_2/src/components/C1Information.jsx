import React from 'react'
import { useSelector } from 'react-redux'

const C1Information = () => {
  const c1n = useSelector(state => state.client_2.c1n)
  const c1e = useSelector(state => state.client_2.c1e)
  return (
    <div className='bg-indigo-400 rounded-md inline-flex flex-row '>
      <div className='bg-indigo-600 m-4 p-2 rounded-sm'>
        <p>Public Keys:</p>
        <div className='flex flex-row'>
          <p>N:</p>
          <p>{c1n}</p>
        </div>
        <div className='flex flex-row'>
          <p>e:</p>
          <p>{c1e}</p>
        </div>
      </div>

    </div>
  )
}

export default C1Information