import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import '../Home/Home.css'
function Layout() {
  return (
    <div >
      <div > <Navbar /></div>
       <main> <Outlet/></main>
    </div>
  )
}

export default Layout
