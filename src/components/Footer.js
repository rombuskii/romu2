import React from 'react'

const Footer = () => {
  return (
    <div className='flex justify-center items-center gap-5 py-3'>
        <a href={'https://instagram.com/'}><i className="fa-brands fa-instagram duration-300 hover:opacity-30 cursor-pointer"></i></a>
        <a href={'https://github.com/ekedayen-e'}><i className="fa-brands fa-github hover:opacity-30 cursor-pointer"></i></a>
        <a href={'https://www.linkedin.com/in/ekedayen-e/'}> <i className="fa-brands fa-linkedin hover:opacity-30 cursor-pointer"></i></a>
    </div>
  )
}

export default Footer