import React, {useEffect, useState} from 'react'
import AnimeTile from './AnimeTile'
import { useAuth } from '@/context/AuthContext'
import Image from 'next/image'

const UserDashboard = ({topAnime}) => {
  const {currentUser} = useAuth();
  const [favorites, setFavorites] = useState([])
  console.log("Favorites:", favorites)

  return (
    <div>
      {/*<h1>Currently Watching</h1>
      <div></div>*/}
  <h1 className='text-2xl'>Top Airing Anime</h1>
      <div className='w-full flex flex-row flex-nowrap justify-start items-center gap-x-20 overflow-auto'>
        {topAnime.map((anime) => {
          return (
            <AnimeTile setFavorites={setFavorites} id={anime.id} image={anime.image} name={anime.title}/>
          )
        })}
      </div>
      <h1 className='text-2xl'>Favorites</h1>
      <div className='w-full flex flex-row flex-nowrap justify-start items-center gap-x-20 overflow-auto'>
        {favorites.length == 0 ? <i className="m-auto fa-solid fa-arrows-spin fa-spin"></i> : favorites?.map((favorite) => {
          return (
            <div className='hover:cursor-pointer p-2'>
              <a href={`/anime/${favorite.id}`}>
            <div className='relative w-60 h-60'>
                <Image className='rounded-2xl mx-auto duration-300 py-1 hover:scale-110' src={favorite.image} fill objectFit='contain' alt="Anime Photo"/>
            </div>
            <h3 className='inline-block text-center px-1 py-1 duration-300 hover:text-emerald-300 hover:translate-y-2'>{favorite.name.length <= 30 ?favorite.name : favorite.name.substring(0,29) + '...'}</h3>
            </a>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default UserDashboard