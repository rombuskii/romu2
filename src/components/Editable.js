import React, {useState} from 'react'
import { useAuth } from '@/context/AuthContext';
import {doc, getDoc, setDoc, updateDoc, arrayRemove} from 'firebase/firestore'
import { db } from '../../firebase';

const Editable = ({id, user, content, posted}) => {
    const {currentUser} = useAuth();
    const [input, setInput] = useState('');
    const [editMode, setEditMode] = useState(false)
    
    const removeComment = async() => {
        const docRef = doc(db, "comments", id);
        await updateDoc(docRef, {comment: arrayRemove({user, content, posted})});
    }

    const submit = async (e) => {
        e.preventDefault();
        if(!input) {
            setEditMode(false);
            return;
        }
        //Update database and input
        try {
            const docRef = doc(db, "comments", id);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()) {
                let data = docSnap.data()
                let altered = data.comment.map((entry) => {
                    if(entry.content == content) {
                        return {user, content: input, posted}
                    }
                    return entry;
                })
                await setDoc(docRef, {comment: altered})
            } else {
                return;
            }
        } catch(error) {
            return;
        }
        setInput('')
        setEditMode(false)
    }
  return (
    currentUser.email != user ? <div className='w-full py-2'><p className='inline'>{user} : {content} - {posted}</p></div> :
    !editMode && currentUser.email == user ? <div className='py-2 w-full '><p className='inline'>{user} : {content} - {posted}</p><i onClick={() => setEditMode(true)} className="duration-300 px-5 hover:opacity-40 hover:scale-110 cursor-pointer inline fa-solid fa-pen-to-square"></i><i onClick={removeComment} className="duration-300 hover:opacity-40 hover:scale-110 cursor-pointer fa-solid fa-trash"></i></div> :
    editMode && currentUser.email ? <div className='w-full py-2'><form onSubmit={submit} className='inline'><p className='inline'>{user} : </p><input className='text-black inline rounded-lg w-full max-w-[8ch] sm:max-w-[40ch]' value={input} onChange={e => setInput(e.target.value)} type="text"/><i onClick={submit} className="inline mx-1 sm:mx-5 hover:scale-110 hover:opacity-40 cursor-pointer fa-solid fa-check"></i></form></div> : null
    
  )
}

export default Editable