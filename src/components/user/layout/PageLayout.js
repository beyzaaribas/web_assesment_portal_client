
import React from 'react'
import TopBanner from '../global/topBanner/TopBanner'
import "./PageLayout.css"

const PageLayout = (props) => {
  return (
    <div className='page-layout'>
    <TopBanner img={props.img} title={props.title}> </TopBanner> 
    <div className='page-content'>
    {props.children}
    </div>
    </div>
  )
}

export default PageLayout
