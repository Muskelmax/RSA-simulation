import React from 'react'
import { newEMessage, newPublic } from '../redux/slices/client_2_slice.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import axios from 'axios'

//tager den anden brugers N og evt. e som input og krypterer input beskeden
const Krypterer = () => {
  const dispatch = useDispatch();
  //input besked
  const [message, setMessage] = useState("")
  //Importer client 1 public key
  const c1e = useSelector(state => state.client_2.c1e)
  const c1n = useSelector(state => state.client_2.c1n)
  //opdater client 1 n og e
  const [Ic1n, setIc1n] = useState();
  const [Ic1e, setIc1e] = useState();
  const c2numM = useSelector(state => state.client_2.nmessage)
  const c2eM = useSelector(state => state.client_2.emessage)

  const handleMSubmmit = (e) => {
    dispatch(newPublic([Ic1n, Ic1e]))
    e.preventDefault();
    // console.log(message)
    console.log(message)
    const nmessage = message.charCodeAt(0)
    const emessage = Number((BigInt(nmessage)**BigInt(Ic1e))%BigInt(Ic1n))
    dispatch(newEMessage(emessage))
    const newMessage = {
      client: 2,
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
      <h1>Encrypt Message:</h1>
      <div className='flex flex-row'>
        <p>N:</p>
        <input className='border-black rounded-sm text-sm h-5 mt-1 bg-indigo-200 w-full mx-2' type='number' placeholder='Client 1 N' onChange={(e) => setIc1n(e.target.value)}></input>
      </div>
      <div className='flex flex-row'>
        <p>e:</p>
        <input className='border-black rounded-sm text-sm h-5 mt-1 bg-indigo-200 w-full mx-2' type='number' placeholder='Client 1 e' onChange={(e) => setIc1e(e.target.value)} value={Ic1e}></input>
      </div>
      <div className='flex flex-row'>
        <p>Message:</p>
        <input onChange={(e) => setMessage(e.target.value)} placeholder='besked på 1 bogstav' className='border-black rounded-sm text-sm h-5 mt-1 bg-indigo-200 mx-2 w-full'></input>
      </div>
      <input type='submit' className='border-black border-2 bg-indigo-500 rounded-sm' value={"Færdig"}></input>
      <p>Message^e mod(N)</p>
      <div className='flex flex-row'>
        <p>Encrypted message: {c2eM}</p>
      </div>
    </form>
  )
}

export default Krypterer