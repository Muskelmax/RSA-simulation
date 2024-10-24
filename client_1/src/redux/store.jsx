import {configureStore} from '@reduxjs/toolkit'
import client_1_reducer from './slices/client_1_slice.jsx'


const store =configureStore({
  reducer: {
    client_1 : client_1_reducer

  }
})

export default store;