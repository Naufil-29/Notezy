import React from 'react'
import { PlusIcon } from 'lucide-react'
import { Link } from "react-router"

const Navbar = () => {
   const handleLogout = () => { 
    localStorage.removeItem("token");// removes JWT token
    window.location.href = "/auth"; //redirects to login/register page
   }

  return (
    <header className="bg-base-300 border-b border-base-content/10"> 
        <div className="mx-auto max-w-6xl p-4"> 
           <div className="flex items-center justify-between"> 
            <h1 className="text-3xl font-bold text-yellow font-bolder text-outline tracking-tight">Notezy</h1>
            <div className="flex justify-between items-center gap-5">
            <div className="flex items-center gap-4"> 
                <Link to ="/create" className="btn btn-secondary"> 
                <PlusIcon className="size-5" />
                <span>New Note</span>
                </Link>
            </div>
            <button onClick={handleLogout} className="btn bg-red-600 text-white border-black">Logout</button>
            </div>
            </div> 
        </div>
    </header>
  )
}

export default Navbar