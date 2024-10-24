import {configureStore} from '@reduxjs/toolkit'
import client_2_reducer from './slices/client_2_slice.jsx'


const store =configureStore({
  reducer: {
    client_2 : client_2_reducer

  }
})

export default store;