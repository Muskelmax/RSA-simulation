import React from 'react'
import Relationship from './components/Relationship.jsx'
import QPInput from './components/QPInput.jsx'
import Krypterer from './components/krypterer.jsx'
import Dekrypterer from './components/Dekrypterer.jsx'
import C1Information from './components/C1Information.jsx'
import Chat from './components/Chat.jsx'
import VideoEmbed from './components/Video_Embed.jsx'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadMessages, resetMessages, newPublic } from './redux/slices/client_2_slice.jsx'

//Samling af komponenter
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get('https://rsa-simulation.onrender.com/message')
        .then((response) => {
          // console.log(response.data.data[0].message)
          dispatch(resetMessages())
          response.data.data.map((message) => {
            dispatch(loadMessages([message.client, message.message]))
          })
        })
        .catch((error => {
          console.log(error)
        }))
      axios
        .get('https://rsa-simulation.onrender.com/client/1')
        .then((response) => {
          dispatch(newPublic([response.data.Keys[0].publicN, response.data.Keys[0].publicE]))
        })
    }
    fetchData();

      const interval = setInterval(fetchData, 1000);

      return () => clearInterval(interval)
  }, []);
  return (
    <div>
      <VideoEmbed/>
      <div>
        <Relationship/>
        <div className='flex flex-row justify-end'>
        <div className='mr-auto'>
            <C1Information/>
          </div>
          <div className='mr-5'>
            <Chat />
          </div>
          <div className='bg-amber-400 rounded-md inline-flex flex-row '>
            <div className='bg-amber-600 m-4 p-2 rounded-sm'>
              <QPInput/>
            </div>
            <div className='flex flex-col my-4 mr-4'>
              <div className='bg-amber-600 mb-4 p-2'>
                <Krypterer/>
              </div>
              <div className='bg-amber-600 p-2'>
                <Dekrypterer/>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
    
  )
}

export default App