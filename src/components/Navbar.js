import React, {useState} from 'react'
import Modal from './Modal'
import SearchBar from './SearchBar'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/AuthContext'
import Image from 'next/image'

const Navbar = () => {
    const [openModal, setOpenModal] = useState(false)
    const [search, setSearch] = useState('')
    const router = useRouter();
    const {currentUser} = useAuth()

    const handleSearch = e => {
      e.preventDefault();
      if(!search) {
        return;
      }
      router.push(`/search/${search}`)
    }
  return (
    <>
    {openModal && <Modal setOpenModal={setOpenModal}/>}
    <div className='z-10 sticky top-0 left-0 w-full bg-slate-900 border-b border-solid border-white text-white flex items-center gap-x-2 justify-between p-4'>
        <h1 onClick={() => router.push('/')} className='duration-300 hover:-translate-y-1 cursor-pointer hover:scale-110 text-3xl sm:text-6xl'>ROMU</h1>
        {currentUser && <SearchBar search={search} setSearch={setSearch} handleSearch={handleSearch}/>}
        {currentUser && currentUser?.photoURL ? <div className=''><Image onClick={() => setOpenModal(true)} src={currentUser.photoURL}  width={100} height={100} className='rounded-3xl duration-300 hover:scale-110 cursor-pointer'/></div> : <i onClick={() => setOpenModal(true)} className="fa-solid fa-user text-xl sm:text-3xl duration-300 hover:opacity-40 cursor-pointer"></i>}
    </div>
    </>
  )
}

export default Navbar