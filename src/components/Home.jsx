import React from 'react'
import NavBar from './navbar/NavBar'
import CustomCard from "./landing/CustomCard"

const Home = () => {
  return (
    <div>
      <div style={{position: "fixed", zIndex: "10000"}} className='w-full'>
      
        <NavBar />
       </div>
      

    </div>
  )
}

export default Home
