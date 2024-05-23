import React from 'react'
import "./Sidebar.css"
import Logo from '../logo/Logo'
import Nav from '../nav/Nav'

const Sidebar = () => {
  return (
    <div className='sidebar'>
    <Logo/>
    <Nav/>
    </div>
  )
}

export default Sidebar
