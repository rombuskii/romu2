import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { db } from '../../firebase'
import { useAuth } from '@/context/AuthContext'
import {getDoc, setDoc, doc, updateDoc, arrayRemove, arrayUnion} from 'firebase/firestore'

const AnimeTile = ({setFavorites, name, image, id}) => {
    const {currentUser} = useAuth();
    const [liked, setLiked] = useState(false)
    const [likeList, setLikeList] = useState([])

    const getLikes = async() => {
        try {
        const docRef = doc(db, "likes", currentUser.uid);
        let result = await getDoc(docRef);
        if(result.exists()) {
        result = result.data()

        if(result && result.id) {
            setLikeList(result.id)
            if(setFavorites  != null) {
                setFavorites(result.id)
            }
            result.id.map(entry => entry.id).includes(id) ? setLiked(true) : setLiked(false);
        } else {
            return;
        }
    } else {
        return;
    }
} catch(error) {
    return;
}
    }

    useEffect(() => {
        getLikes()
        if(setFavorites != null) {
            setFavorites(likeList)
        }
    }, [id, liked])

    const like = () => {
        setLikeList(prev => {
            if(like) {
                return (
                    prev.filter(obj => obj[id] == id)
                    )
            } else {
                return [
                    ...prev,
                    {id, name, image}
                ]
            }
        })
        setLiked(async (prev) => {
            if(prev) { //unlike
                const docRef = doc(db, "likes", currentUser.uid);
                await updateDoc(docRef, {id: arrayRemove({id, name, image})})
                setLiked(!liked)
            } else { //like
                const docRef = doc(db, "likes", currentUser.uid);
                const docSnap = await getDoc(docRef);
                if(docSnap.exists()) {
                    await updateDoc(docRef, {id: arrayUnion({id, name, image})})
                } else {
                    await setDoc(docRef, {id: arrayUnion({id, name, image})})
                }
                setLiked(!liked)
            }
        })

    }

  return (
    <div className='text-center hover:cursor-pointer p-2'>
        <a href={`/anime/${id}`}>
            <div className='relative w-60 h-60'>
                <Image className='rounded-2xl mx-auto duration-300 py-1 hover:scale-110' src={image} fill objectFit='contain' alt="Anime Photo"/>
            </div>
            <h3 className='inline-block text-center px-1 py-1 duration-300 hover:text-emerald-300 hover:translate-y-2'>{name.length <= 30 ? name : name.substring(0,29) + '...'}</h3>
            </a>
            {liked && <i style={{"color": "red"}} onClick={like} className=" fa-solid fa-heart"></i>}
            {!liked && <i onClick={like} className=" hover:text-red-500 fa-regular fa-heart"></i>}
    </div>
  )
}

export default AnimeTile