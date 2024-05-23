import React from 'react'
import Header from '../header/Header'
import "./MainContent.css"
import MainContentTitle from './MainContentTitle'

const MainContent = ({children, title}) => {


  return (
    <div className="main-content-area">
    <Header/>    

    <div className='main-content'>
    {children}
    </div>

    </div>
  )
}

export default MainContent
