import React from 'react'
import { newEMessage, newPublic } from '../redux/slices/client_1_slice.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import axios from 'axios'

//tager den anden brugers N og evt. e som input og krypterer input beskeden
const Krypterer = () => {
  const dispatch = useDispatch();
  //input besked
  const [message, setMessage] = useState("")
  //Importer client 2 public key
  const c2e = useSelector(state => state.client_1.c2e)
  const c2n = useSelector(state => state.client_1.c2n)
  //opdater client 2 n og e
  const [Ic2n, setIc2n] = useState(0);
  const [Ic2e, setIc2e] = useState(c2e);
  const c1numM = useSelector(state => state.client_1.nmessage)
  const c1eM = useSelector(state => state.client_1.emessage)

  const handleMSubmmit = (e) => {
    dispatch(newPublic([Ic2n, Ic2e]))
    e.preventDefault();
    // console.log(message)
    // dispatch(newMessage(message))
    const nmessage = message.charCodeAt(0)
    const emessage = Number((BigInt(nmessage)**BigInt(Ic2e))%BigInt(Ic2n))
    dispatch(newEMessage(emessage))
    const newMessage = {
      client: 1,
      message: emessage
    }
    axios
      .post('http://localhost:5050/message', newMessage)
      .then(() => {
        console.log("New message send")
        
      })
      .catch((error) => {
        console.log(error)
      })


  }
  return (
    <form onSubmit={handleMSubmmit}>
      <p>🔓➡️🔒</p>
      <h1>Encrypt Message:</h1>
      <div className='flex flex-row'>
        <p>N:</p>
        <input className='border-black rounded-sm text-sm h-5 mt-1 bg-amber-200 w-full mx-2' placeholder='Client 2 N' type='number' onChange={(e) => setIc2n(e.target.value)}></input>
      </div>
      <div className='flex flex-row'>
        <p>e:</p>
        <input className='border-black rounded-sm text-sm h-5 mt-1 bg-amber-200 w-full mx-2' placeholder='Client 2 e' type='number' onChange={(e) => setIc2e(e.target.value)}></input>
      </div>
      <div className='flex flex-row'>
        <p>Message:</p>
        <input onChange={(e) => setMessage(e.target.value)} placeholder='besked på 1 bogstav' className='border-black rounded-sm text-sm h-5 mt-1 bg-amber-200 mx-2 w-full'></input>
      </div>
      <input type='submit' className='border-black border-2 bg-amber-500 rounded-sm' value={"Færdig"}></input>
      <p>Message^e mod(N)</p>
      <div className='flex flex-row'>
        <p>Encrypted message: {c1eM}</p>
      </div>
    </form>
  )
}

export default Krypterer