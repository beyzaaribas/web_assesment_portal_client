import React from 'react'
import "./Logo.css"
import Image from 'next/image'

const Logo = () => {
  return (
    <div className='logo-box'>
    <img src={"/img/logo.svg"}/>
    </div>
  )
}

export default Logo
