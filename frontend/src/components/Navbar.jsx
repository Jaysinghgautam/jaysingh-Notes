import React from 'react'
import { useNavigate } from 'react-router-dom'
import { post } from '../services/ApiEndPoint'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { logout } from '../Redux/AuthSlice'
import { FaPlus } from "react-icons/fa6";

export default function Navbar() {
  const disptach=useDispatch()
  const navigate=useNavigate()
  const handleLogout=async()=>{
    try {

      const request=await post('/auth/logout')
      const response= request.data
      if (response.success) {
        toast.success(response.message)
         disptach(logout())
        navigate('/login')
      }
      
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message)
      }
      console.log(error)
    }
  }
  return (
  //   <nav className="navbar ">
  //   <div className="container-fluid p-2 ">
  //        <h1>Notes</h1>
  //       <input className=" mx-3   SerachInput " type="search" placeholder="Search"/>
  //       <button type="button" class="btn bg-dark text-white mx-3" onClick={handleLogout}>Logout</button>
      
  //   </div>
  // </nav>

 <nav className="navbar position-fixed top-fixed">
  <div className="container-fluid p-2 ">
    <h1>Notes</h1>
    <input 
      className="mx-3 SerachInput d-none d-sm-block" 
      type="search" 
      placeholder="Search"
    />
    
    <button type="button" className="btn bg-dark text-white mx-3" onClick={handleLogout}>Logout</button>
  </div>
<div className="container-fluid p-2">
                   <div className='rounded-circle  mx-2 d-flex  d-flex justify-content-center align-items-center'
               data-bs-toggle="modal" data-bs-target="#exampleModal"
                style={{backgroundColor:"black",width:"50px",height:"50px",cursor:'pointer'}}>
                  <FaPlus  size={30} className='rounded-circle fs-5 text-white'  />
               </div>
    <input 
      className="mx-3 SerachInput " 
      type="search" 
      placeholder="Search"
    />
</div>
 </nav>
  )
}