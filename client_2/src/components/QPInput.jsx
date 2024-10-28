import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { newKeys } from '../redux/slices/client_2_slice.jsx'
import { useState } from 'react'

const QPInput = () => {
  const [q, setQ] = useState(0);
  const [p, setP] = useState(0);
  const dispatch = useDispatch();
  const c2n = useSelector(state => state.client_2.n)
  const c2phiN = useSelector(state => state.client_2.phiN)
  const c2d = useSelector(state => state.client_2.d)
  const c2e = useSelector(state => state.client_2.e)

  const handleQPSubmit = (e) => {
    e.preventDefault();
    dispatch(newKeys([q, p]))
  }
  return (
    <form onSubmit={handleQPSubmit}>
          <div className='flex flex-row'>
          <p>🔑</p>
            <p>q: </p>
            <input type='number' onChange={(e) => {setQ(e.target.value)}} placeholder='primtal 1' className='border-black rounded-sm text-sm h-5 mt-1 w bg-indigo-200 mx-2 w-full'></input>
          </div>
          <div className='flex flex-row'>
            <p>p: </p>
            <input type='number' onChange={(e) => {setP(e.target.value)}} placeholder='primtal 2' className='border-black rounded-sm text-sm h-5 mt-1 bg-indigo-200 mx-2 w-full'></input>
          </div>
          <input type='submit' className='border-black border-2 bg-indigo-500 rounded-sm' value={"Færdig"}></input>
          <div className='flex flex-row'>
            <p>N: </p>
            <p className=''>{c2n}</p>
          </div>
          <div className='flex flex-row'>
            <p>Φ(N): (q-1)*(p-1) = </p>
            <p>{c2phiN}</p>
          </div>
          <div className='flex flex-row'>
            <p>e: </p>
            <p>{c2e}</p>
          </div>
          <p>d*e=1 modΦ(N)</p>
          <div className='flex flex-row'>
            <p>d: </p>
            <p>{c2d}</p>
          </div>

        </form>
  )
}

export default QPInput