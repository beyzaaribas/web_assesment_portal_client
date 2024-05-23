"use client"
import Link from 'next/link'
import React from 'react'
import "./Nav.css"
import { Building, CardChecklist, ClipboardData, Collection, ColumnsGap, House, People, PersonVcard} from 'react-bootstrap-icons'
import { usePathname } from 'next/navigation';
import { User } from 'lucide'
import { useUserContext } from '@/contexts/UserContext'

const Nav = () => {

  const pathname = usePathname()

  const { user, setUser } = useUserContext();


  console.log(user)

  return (
    <div className='nav' >

      {user && user.userType && user.userType == 1 ? 
        <ul>
            <label className='nav-label'> <span className='label-icon'> <House/> </span> Home </label>
            <li className={pathname == "/" ? "active" : ""}> <span className='nav-icon'> <ColumnsGap/> </span>  <Link href={"/"}> Dashboard </Link> </li>

            <label className='nav-label'> <span className='label-icon'> <Collection/> </span> Evaluation </label>
            <li className={pathname == "/tests" ? "active" : ""}> <span className='nav-icon'> <ClipboardData/> </span>  <Link href={"/tests"}> Tests </Link> </li>

            <li className={pathname == "/results" ? "active" : ""}> <span className='nav-icon' id='results-icon'> <CardChecklist/> </span>  <Link href={"/results"}> Results </Link> </li>
            <li className={pathname == "/categories" ? "active" : ""}> <span className='nav-icon' id='results-icon'> <CardChecklist/> </span>  <Link href={"/categories"}> Categories </Link> </li>

            <label className='nav-label'> <span className='label-icon'> <PersonVcard/> </span> Users </label>
            {/* <li className={pathname == "/companies" ? "active" : ""}> <span className='nav-icon'> <Building/> </span>  <Link href={"/admin/companies"}> Companies </Link> </li> */}
            <li className={pathname == "/customers" ? "active" : ""}> <span className='nav-icon' id='results-icon'> <People/> </span>  <Link href={"/customers"}> Customers </Link> </li>

     </ul>
       :     <ul>
            <label className='nav-label'> <span className='label-icon'> <House/> </span> Home </label>
            <li className={pathname == "/" ? "active" : ""}> <span className='nav-icon'> <ColumnsGap/> </span>  <Link href={"/"}> Dashboard </Link> </li>

            <label className='nav-label'> <span className='label-icon'> <Collection/> </span> Evaluation </label>
            <li className={pathname == "/userTests" ? "active" : ""}> <span className='nav-icon'> <ClipboardData/> </span>  <Link href={"/userTests"}> User Tests </Link> </li>

     </ul>}



     
    </div>
  )
}
 
export default Nav
