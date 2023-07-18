
import { Inter } from 'next/font/google'
import Login from '@/components/Login'
import { useAuth } from '@/context/AuthContext'
import UserDashboard from '../components/UserDashboard'

const inter = Inter({ subsets: ['latin'] })

export async function getServerSideProps() {

  const response = await fetch('https://api.consumet.org/anime/gogoanime/top-airing', { next: { revalidate: 10 } });

  // Parse the JSON
  const data = await response.json();

  // Finally we return the result
  // inside props as allPokemons
  return {
      props: { topAnime: data.results },
  };
}

export default function Home({topAnime}) {
  const {currentUser} = useAuth()
  return (
    <>
    {currentUser && <UserDashboard topAnime={topAnime}/>}
    {!currentUser && <Login/>}
    </>
  )
}
