import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const client_1_slice = createSlice({
  name: 'client 1 slice',
  initialState: {
    q: 0,
    p: 0,
    n: 0,
    phiN: 0,
    e: 65537 ,
    d: 0,
    message: "",
    nmessage: 89,
    emessage: 0,
    c2n: 0,
    c2e: 0,
    messages: []
  },
  reducers: {
    newKeys: (state, action) => {
      state.q = action.payload[0]; // Update q
      state.p = action.payload[1]; // Update p
      state.n = action.payload[0] * action.payload[1]; // Update N
      state.phiN = (action.payload[0]-1)*(action.payload[1]-1)
      state.d = find_d(state.e, state.phiN)

      const DB_data = {
        client: 1,
        publicN: state.n,
        publicE: state.e
      }

      axios.put('http://localhost:5050/client/1', DB_data)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log("could not update public information")
        })
    },
    newEMessage: (state, action) => {
      state.emessage = action.payload

    },
    newPublic: (state, action) => {
      state.c2n = action.payload[0];
      state.c2e = action.payload[1];
    },
    c2NewMessage: (state, action) =>{

    },
    loadMessages: (state, action) => {
      state.messages.push(action.payload)
    },
    resetMessages: (state, action) => {
      state.messages = []
    }
  }
})

export const { newKeys, newEMessage, newPublic, loadMessages, resetMessages } = client_1_slice.actions;
export default client_1_slice.reducer;


function find_d(e, phiN){
  for (let d = 3; d < phiN; d++) {
    if ((d*e) % phiN == 1) {
      return d
    }
  }
  return "error! Please choose different prime numbers"
}
