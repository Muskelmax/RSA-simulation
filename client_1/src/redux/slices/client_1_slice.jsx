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
      state.d = egcd(state.e, state.phiN)

      const DB_data = {
        client: 1,
        publicN: state.n,
        publicE: state.e
      }

      axios.put('https://rsa-simulation.onrender.com/client/1', DB_data)
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

function egcd(e, phi) {
  let s = 0, old_s = 1;
  let t = 1, old_t = 0;
  let r = phi, old_r = e;
  
  while (r != 0) {
      let q = Math.floor(old_r / r);
      [r, old_r] = [old_r - q * r, r];
      [s, old_s] = [old_s - q * s, s];
      [t, old_t] = [old_t - q * t, t];
  }
  
  // Adjust to positive if needed
  if (old_s < 0) {
      old_s += phi;
  }
  
  // `old_s` is `d`, the modular inverse of `e` mod `phi`
  return old_s;
}