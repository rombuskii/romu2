
import Image from 'next/image';
import { useRouter } from 'next/router'
import React, {useEffect} from 'react'
import { useAuth } from '@/context/AuthContext';
export async function getStaticPaths() {
  return {
    paths: [
      { params: { name: 'naruto' } },
    ],
    fallback: true,
  }
}

export async function getStaticProps(context) {
  let response;
  const {params} = context
  try {
  response = await fetch(`https://api.consumet.org/anime/gogoanime/info/${params.name}`);
} catch (err) {
  return;
}

  // Finally we return the result
  const anime = await response.json()
  // inside props as allPokemons
  return {
      props: { anime },
  };
}

const AnimePage = ({anime}) => {
  const {currentUser} = useAuth();
  const router = useRouter()
  useEffect(() => {
    if(!currentUser) {
      router.push('/')
    }
  }, [])
  return (typeof anime === 'undefined' ? <i className="m-auto fa-solid fa-arrows-spin fa-spin"></i> : 
    <div className='w-full'>
      <Image className='mx-auto' src={anime.image} height={200} width={200} alt='Anime image'/>
      <div className='text-center py-2 '>
      <h2 className='text-xl inline-block align-middle'>{anime.title}</h2>
      <p className='inline-block align-middle'>{'(' + anime.status + ")"}</p>
      </div>
      <p className='w-full max-w-[80ch] mx-auto'>{anime.description}</p>
      <h2>{anime.subOrDub.toUpperCase()}</h2>
      <div className='w-full grid grid-cols-4 sm:grid-cols-5 gap-4'>
      {anime.episodes.map((episode) => {
        return (
          <div onClick={() => router.push(`/watch/${episode.id}`)} className='duration-300 hover:scale-110 hover:cursor-pointer bg-black my-2 pr-2 w-fit'>
            <div className='p-1 bg-emerald-500 inline'>EP</div>
            <a className=' inline pl-1'>{episode.number}</a>
          </div>
        )
      })}
      </div>
    </div>
  )
}

export default AnimePage