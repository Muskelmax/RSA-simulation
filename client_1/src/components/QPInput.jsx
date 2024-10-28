import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { newKeys } from '../redux/slices/client_1_slice.jsx'
import { useState } from 'react'

const QPInput = () => {
  const [q, setQ] = useState(0);
  const [p, setP] = useState(0);
  const dispatch = useDispatch();
  const c1n = useSelector(state => state.client_1.n)
  const c1phiN = useSelector(state => state.client_1.phiN)
  const c1d = useSelector(state => state.client_1.d)
  const c1e = useSelector(state => state.client_1.e)

  const handleQPSubmit = (e) => {
    e.preventDefault();
    dispatch(newKeys([q, p]))
  }
  return (
    <form onSubmit={handleQPSubmit}>
          <p>🔑</p>
          <p>Opret privat og public keys:</p>
          <div className='flex flex-row'>
            <p>q: </p>
            <input type='number' onChange={(e) => {setQ(e.target.value)}} placeholder='primtal 1' className='border-black rounded-sm text-sm h-5 mt-1 w bg-amber-200 mx-2 w-full'></input>
          </div>
          <div className='flex flex-row'>
            <p>p: </p>
            <input type='number' onChange={(e) => {setP(e.target.value)}} placeholder='primtal 2' className='border-black rounded-sm text-sm h-5 mt-1 bg-amber-200 mx-2 w-full'></input>
          </div>
          <input type='submit' className='border-black border-2 bg-amber-500 rounded-sm' value={"Færdig"}></input>
          <div className='flex flex-row'>
            <p>N: </p>
            <p className=''>{c1n}</p>
          </div>
          <div className='flex flex-row'>
            <p>Φ(N): (q-1)*(p-1) = </p>
            <p>{c1phiN}</p>
          </div>
          <div className='flex flex-row'>
            <p>e: </p>
            <p>{c1e}</p>
          </div>
          <p>d*e=1 modΦ(N)</p>
          <div className='flex flex-row'>
            <p>d:</p>
            <p>{c1d}</p>
          </div>

        </form>
  )
}

export default QPInput