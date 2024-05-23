import React from 'react'
import "./TopBanner.css"

const TopBanner = (props) => {
  return (
    <div className='top-banner'>
     <img src={props.img}></img>  
     <h2 className='banner-title'>{props.title}</h2>
    </div>
  )
}

export default TopBanner
