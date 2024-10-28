import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'

const Dekrypterer = () => {
  const c1d = useSelector(state => state.client_1.d)
  const c1eM = useSelector(state => state.client_1.emessage)
  const c1n = useSelector(state => state.client_1.n)

  const [Ic2eM, setIc2eM] = useState(0);
  const [Ic2M, setIc2M] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    let decN = Number(modExp(BigInt(Ic2eM), BigInt(c1d), BigInt(c1n)))
    setIc2M(String.fromCharCode(decN))
    console.log(decN)
  }
  const modExp = function (a, b, n) {
    a = a % n;
    var result = 1n;
    var x = a;
    while (b > 0) {
        var leastSignificantBit = b % 2n;
        b = b / 2n;
        if (leastSignificantBit == 1n) {
            result = result * x;
            result = result % n;
        }
        x = x * x;
        x = x % n;
    }
    return result;
  };
  return (
    <form onSubmit={handleSubmit}>
      <p>🔒+🔑➡️🔓</p>
      <h1>Decrypt Message:</h1>
      <div className='flex flex-row'>
        <p>Message:</p>
        <input className='border-black rounded-sm text-sm h-5 mt-1 bg-amber-200 w-full mx-2' type='number' onChange={(e) => setIc2eM(e.target.value)}></input>
      </div>
      <div>
        <input type='submit' className='border-black border-2 bg-amber-500 rounded-sm' value={"Færdig"}></input>
      </div>
      <p>Message^d mod(N)</p>
      <div className='flex flex-row'>
        <p>Output: </p>
        <p>{Ic2M}</p>
      </div>
    </form>
  )
}

export default Dekrypterer