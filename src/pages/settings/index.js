import React, {useState} from 'react'
import { storage } from '../../../firebase'
import { getDownloadURL, getStorage, listAll, ref, uploadBytes } from 'firebase/storage'
import {updateProfile} from 'firebase/auth'
import { useAuth } from '@/context/AuthContext'

const Settings = () => {
    const {currentUser} = useAuth();
    const [imageUpload, setImageUpload] = useState(null)

    const upload = (e) => {
        let imgUrl;
        if(imageUpload == null) return;
        const imgPath = ref(storage, "images/")
        const imageRef = ref(storage, `images/pfp`)
        uploadBytes(imageRef, imageUpload).then(() => {
            alert('Image Uploaded')
            listAll(imgPath).then((response) => {
                response.items.forEach((item) => {
                    getDownloadURL(item).then((url) => {
                        imgUrl = [url]
                        updateProfile(currentUser, {photoURL: imgUrl[0] })
                        .then(() => {
                            return;
                        })
                        .catch(error => null) 
                    })
                }
                )
            })
        })
    }
  return (
    
    <div className='flex gap-5 flex-col justify-evenly items-center'>
        <div><h1 className='text-xl sm:text-5xl'>Settings</h1></div>
        <div className='w-full'>
            <form onSubmit={upload}>
                <p>Upload Profile Pic:</p>
                <input id='pfp' className='w-full max-w-[40ch] hover:opaciy-40 cursor-pointer my-5 border-2 ' onChange={(e) => setImageUpload(e.target.files[0])} type="file" name="filename"/>
                <div><button type='submit' className='duration-300 hover:text-blue-500 cursor-pointer hover:border-blue-500 bg-white rounded-lg p-1 text-black'>Upload Image</button></div>
            </form>
        </div>
    </div>
  )
}

export default Settings