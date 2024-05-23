import React from 'react'
import "./MainContent.css"
import { CircleHalf, DiamondHalf } from 'react-bootstrap-icons'

const MainContentTitle = ({title}) => {
  return (
    <h2 className="main-content-title"><span className='main-content-title-icon'><CircleHalf/></span> {title}</h2>
  )
}

export default MainContentTitle
