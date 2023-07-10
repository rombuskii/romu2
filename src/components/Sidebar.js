import React from 'react'

const Sidebar = ({topAnime}) => {
  return (
    <div className='flex-col gap-y-5'>

            <div><h1 className='text-xl'>Top Airing</h1></div>

            <div>
            {props.topAnime.map((anime) => {
                return (
                    <AnimeTile url={anime.url} name={anime.title} image={anime.image}/>
                )
            })}
            </div>

        </div>
  )
}

export default Sidebar