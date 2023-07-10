import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import AnimeTile from '@/components/AnimeTile';
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
    response = await fetch(`https://api.consumet.org/anime/gogoanime/${params.name}`);
} catch (err) {
    return;
}
  
    // Finally we return the result
    const searchResult = await response.json()
    // inside props as allPokemons
    return {
        props: { searchResult },
    };
  }

const SearchPage = ({searchResult}) => {
    const {currentUser} = useAuth()
    const router = useRouter();
    const query = router.query.name;

    useEffect(() => {
        {!currentUser && router.push('/')}
    }, [])
  return (
    <div>
        <i onClick={() => router.back()} className="duration-300 absolute fa-solid fa-circle-left text-2xl sm:text-5xl hover:scale-110 hover:translate-x-1 hover:opacity-40 cursor-pointer"></i>
        <h1 className='text-center text-xl sm:text-3xl'>{query.toUpperCase() + ` (${searchResult.results.length})`}</h1>
        <div className='w-full grid grid-cols-1 md:grid-cols-3 sm:grid-cols-4 gap-4 place-items-center justify-center items-center'>
            {searchResult.results.map((result) => {
                return (
                    <AnimeTile setFavorites={null} id={result.id} image={result.image} name={result.title}/>
                )
            })}
        </div>
    </div>
  )
}

export default SearchPage