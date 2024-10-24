import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const client_2_slice = createSlice({
  name: 'client 2 slice',
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
    c1n: 0,
    c1e: 0,
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
        client: 2,
        publicN: state.n,
        publicE: state.e
      }

      axios.put('http://localhost:5050/client/2', DB_data)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log("could not update public information")
        })
    },
    newEMessage: (state, action) => {
      state.emessage = action.payload
      // console.log((BigInt(state.nmessage)**BigInt(state.c1e)))
    },
    newPublic: (state, action) => {
      state.c1n = action.payload[0];
      state.c1e = action.payload[1];
    },
    c1NewMessage: (state, action) =>{

    },
    loadMessages: (state, action) => {
      state.messages.push(action.payload)
    },
    resetMessages: (state, action) => {
      state.messages = []
    }
  }
})

export const { newKeys, newEMessage, newPublic, loadMessages, resetMessages } = client_2_slice.actions;
export default client_2_slice.reducer;

function find_d(e, phiN){
  for (let d = 3; d < phiN; d++) {
    if ((d*e) % phiN == 1) {
      return d
    }
  }
  return "error! Please choose different prime numbers"
}
