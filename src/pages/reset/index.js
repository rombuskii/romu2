import React, {useState} from 'react'
import {sendPasswordResetEmail} from 'firebase/auth'
import { auth } from '../../../firebase'

const Reset = () => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const submitHandler = async() => {
        if(!email) {
            setError("Please enter email")
            return;
        }
            sendPasswordResetEmail(auth, email).then(() => setSuccess("You will receive a password reset email promptly"))
            .catch(error => setError("Something went wrong"))
        }

  return (
  <div className='flex-1 gap-2 sm:gap-4 text-xs sm:text-sm flex flex-col justify-center items-center'>
    <h1 className='font-extrabold select-none text-2xl sm:text-4xl uppercase'>RESET PASSWORD</h1>
    {error && <div className='w-full max-w-[40ch] border-solid border text-center border-rose-300 text-rose-300 py-2'>{error}</div>}
    {success && <div className='w-full max-w-[40ch] border-solid border text-center border-green-300 text-green-300 py-2'>{success}</div>}
    <input type="text" onChange={(e) => {setError(null); setEmail(e.target.value)}} value={email} placeholder='Account Email' className='duration-300 border-b-2 border-solid border-white focus:border-cyan-300 outline-none text-slate-900 p-1 w-full max-w-[40ch]'/>
    <button onClick={submitHandler} className='w-full max-w-[40ch] border border-white border-solid uppercase py-2 duration-300 hover:bg-white hover:text-slate-900'>SUBMIT</button>
  </div>
  )
}

export default Reset