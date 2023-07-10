import React from 'react'

const SearchBar = (props) => {
  return (
      <form className='sticky flex-initial flex w-full justify-center top-0' onSubmit={ props.handleSearch }>
        <input type="search" value={props.search} onChange={(e) => props.setSearch(e.target.value)} placeholder="Search" className='duration-300 border-b-2 border-solid border-white focus:border-cyan-300 max-w-[30ch] w-full border-solid text-black p-1 outline-none rounded-xl'/>
      </form>
  )
}

export default SearchBar