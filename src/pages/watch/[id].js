import { useRouter } from 'next/router';
import React, {useState, useEffect, useRef} from 'react'
import ReactPlayer from 'react-player';
import { useAuth } from '@/context/AuthContext';
import {doc, getDoc, updateDoc, setDoc, query, limit,  arrayUnion} from 'firebase/firestore'
import { db } from '../../../firebase';
import Editable from '@/components/Editable';


export async function getStaticPaths() {
    return {
      paths: [],
      fallback: true,
    }
  }
  
  export async function getStaticProps(context) {
    let response, list;
    const {params} = context
    try {
    response = await fetch(`https://api.consumet.org/anime/gogoanime/watch/${params.id}`);
    list = await fetch(`https://api.consumet.org/anime/gogoanime/info/${params.id.substring(0, params.id.lastIndexOf('episode') - 1)}`);
  } catch (err) {
    console.log("Something went wrong")
  }
  
    // Finally we return the result
    const episode = await response.json()
    const episodes = await list.json()
    // inside props as allPokemons

    return {
        props: { episode, episodes },
    };
  }

const WatchPage = ({episode, episodes}) => {
    const {currentUser} = useAuth();
    console.log(currentUser)
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true);
    const [input, setInput] = useState('')
    const [comments, setComments] = useState([])
    let name = router.query.id;
    let modified = name?.substring(name.indexOf('episode')).replace('-', " ").toUpperCase();
    const nextEpisode = () => {
        const number = parseInt(name.substring(name.lastIndexOf('-') + 1)) + 1
        const initial = name.substring(0, name.lastIndexOf('-') + 1)
        const next = initial + number
        if(episodes.episodes.map((episode) => episode.id).indexOf(name) < episodes.episodes.length - 1) {
            console.log(episodes.episodes.length - 1)
            router.replace(`/watch/${next}`)
        } else {
            router.replace(`/anime/${name.substring(0, name.lastIndexOf('episode') - 1)}`)
        }
    }

    const prevEpisode = () => {
        const number = parseInt(name.substring(name.lastIndexOf('-') + 1)) - 1
        if(number == 0) {
            router.replace(`/anime/${name.substring(0, name.lastIndexOf('episode') - 1)}`)
            return;
        }
        const initial = name.substring(0, name.lastIndexOf('-') + 1)
        const next = initial + number
        console.log(next)
        router.replace(`/watch/${next}`)
    }

    const getComments = async () => {
        try {
            const docRef = doc(db, "comments", name);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
              const result = docSnap.data();
              
              if (result && result.comment) {
                setComments(result.comment);
              } else {
                // Handle the case when the 'comment' property is missing
                console.log("The 'comment' property is missing in the result");
              }
            } else {
              // Handle the case when the document doesn't exist
              console.log("The document does not exist");
            }
          } catch (error) {
            // Handle any potential errors during the retrieval
            console.error("Error retrieving comments:", error);
          }
    }

    useEffect(() => {
        if(!currentUser) {
            router.push('/')
        }
        getComments();
        setIsLoading(false)

    }, [comments])

    const handleScroll = (event) => {
        const target = event.target;

        if(target.scrollHeight - target.scrollTop === target.clientHeight) {
            console.log('At da bottom!')
        } 
    }

    const comment = async(e) => {
        e.preventDefault();
        let date = new Date().toDateString();
        if(!input) {
            return;
        }
        const docRef = doc(db, "comments", name);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
            await updateDoc(docRef, {comment: arrayUnion({user: currentUser.email, content: input, posted: date})})
        } else {
            await setDoc(docRef, {comment: arrayUnion({user: currentUser.email, content: input, posted: date})})
        }
        setComments((prev) => {
            return [
                ...prev,
                {user: currentUser.email, content: input, posted: date}
            ]
        })
        setInput('');
    }

    return (
        <>
        <i onClick={prevEpisode} className="duration-300 absolute fa-solid fa-circle-left text-xs sm:text-2xl hover:scale-110 hover:translate-x-1 hover:opacity-40 cursor-pointer"> Prev Episode</i>
        <i onClick={nextEpisode} className="duration-300 hover:scale-110 hover:translate-x-1 hover:opacity-40 cursor-pointer absolute text-xs sm:text-2xl right-4 fa-solid fa-circle-right"> Next Episode</i>
        <div className='flex flex-col justify-center items-center gap-10'>
            <h1 className='text-center text-xs sm:text-3xl'>{modified}</h1>
        <div style={{'borderRadius': '25px'}}  className='mx-auto'>
        <ReactPlayer onEnded={nextEpisode} playing={true}  width={''} height={'100%'} url={episode?.sources ? episode.sources[3].url : router.replace('/')} controls/>
        </div> 
            <div onScroll={handleScroll} className='w-full border-black rounded-xl h-screen overflow-scroll bg-black p-4'>
            <h1 className='w-full border-b my-2 block uppercase'>Comments</h1>
            <form onSubmit={comment}>
                <input placeholder='Type away!' className='w-full p-1 bg-gray-600 border-black rounded-lg' type="text" value={input} onChange={e => setInput(e.target.value)}/>
            </form>
            {console.log(comments)}
            {isLoading ? <div className='w-full h-screen flex justify-center items-center'><i className="mx-auto text-2xl sm:text-5xl fa-solid fa-arrows-spin fa-spin"></i></div> : comments?.map((comment) =>// {
               // return (
                    <Editable id={name} user={comment.user} content={comment.content} posted={comment.posted}/>
                    /*
                    <div className='py-2'>
                    <p>{comment.user} : {comment.content} - {comment.posted}</p>
                    </div>
                    */
              //  )
            /*}*/).reverse()}
            </div>
        </div>   
        </>
    )
}

export default WatchPage