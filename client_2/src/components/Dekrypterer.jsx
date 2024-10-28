import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'

const Dekrypterer = () => {
  const c2d = useSelector(state => state.client_2.d)
  const c2eM = useSelector(state => state.client_2.emessage)
  const c2n = useSelector(state => state.client_2.n)

  const [Ic1eM, setIc1eM] = useState(0);
  const [Ic1M, setIc1M] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    // let decN = Number((BigInt(Ic1eM)**BigInt(c2d))%BigInt(c2n))
    let decN = Number(modExp(BigInt(Ic1eM), BigInt(c2d), BigInt(c2n)))
    setIc1M(String.fromCharCode(decN))
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
        <input className='border-black rounded-sm text-sm h-5 mt-1 bg-indigo-200 w-full mx-2' type='number' onChange={(e) => setIc1eM(e.target.value)}></input>
      </div>
      <div>
        <input type='submit' className='border-black border-2 bg-indigo-500 rounded-sm' value={"Færdig"}></input>
      </div>
      <p>Message^d mod(N)</p>
      <div className='flex flex-row'>
        <p>Output: </p>
        <p>{Ic1M}</p>
      </div>
    </form>
  )
}

export default Dekrypterer