import React, {useState} from 'react'
import { storage } from '../../../firebase'
import { getDownloadURL, getStorage, listAll, ref, uploadBytes } from 'firebase/storage'
import {updateProfile} from 'firebase/auth'
import { useAuth } from '@/context/AuthContext'

const Settings = () => {
    const {currentUser} = useAuth();
    const [imageUpload, setImageUpload] = useState(null)
    const [msg, setMsg] = useState('')
    console.log(currentUser)

    const upload = (e) => {
        e.preventDefault()
        if(imageUpload == null) return;
        const imageRef = ref(storage, `images/${currentUser.uid}`)
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                updateProfile(currentUser, {photoURL: url })
                setMsg("Uploaded Successfully")
        }).catch(error => setMsg('Something went wrong'))
    })
    }

  return (
    
    <div className='flex gap-5 flex-col justify-evenly items-center'>
        <div><h1 className='text-xl sm:text-5xl'>Settings</h1></div>
        <div className='w-full'>
            <form>
                <p>Upload Profile Pic: {msg}</p>
                <input className='w-full max-w-[40ch] hover:opaciy-40 cursor-pointer my-5 border-2 ' onChange={(e) => setImageUpload(e.target.files[0])} type="file" name="filename"/>
                <div><button onClick={upload} type='submit' className='duration-300 hover:text-blue-500 cursor-pointer hover:border-blue-500 bg-white rounded-lg p-1 text-black'>Upload Image</button></div>
            </form>
        </div>
    </div>
  )
}

export default Settings