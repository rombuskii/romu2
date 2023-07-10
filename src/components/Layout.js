import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import Head from 'next/head'

const Layout = ({children}) => {
  return (
    <div className='flex flex-col min-h-screen relative bg-slate-900 text-white'>
      <Head>
        <title>ROMU</title>
      </Head>
        <Navbar/>
        <main className='flex-1 flex flex-col p-4'>
        {children}
        </main>
        <Footer/>
    </div>
  )
}

export default Layout