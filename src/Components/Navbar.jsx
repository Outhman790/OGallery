import React, {useState} from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
  return (
    <>
    <div className='bg-indigo-600 w-100 flex justify-between items-center px-4 py-4'>
        <nav className='md:flex justify-between items-center mx-auto py-4 px-10 w-screen tracking-tight'>
            <div className='hidden md:block'><h1 className='text-gray-300 text-3xl font-bold text-center '>OGallery</h1></div>
            <div className='hidden md:flex space-x-4 font-medium text-xl'>
                <a className='text-blue-300' href="#">My Images</a>
                <a className='text-blue-300' href="#">My profile</a>
                <a className='text-blue-300' href="#">Login</a>
                <a className='text-blue-300' href="#">Sign up</a>
            </div>
             {/* Mobile view */}
        <div className='md:hidden flex justify-between items-center'> 
          <h1 className='font-bold text-3xl text-gray-300'>OGallery</h1>
          {isOpen ? <IoClose className='text-3xl text-gray-200' onClick={() => setIsOpen(false)} /> : <RxHamburgerMenu className='text-3xl text-gray-200' onClick={() => setIsOpen(true)}/>}
        </div>
          {isOpen &&  <div className='flex flex-col space-y-4 text-center mt-12'>
                <a className='text-gray-100 font-medium text-xl' href="#">My Images</a>
                <a className='text-gray-100 font-medium text-xl' href="#">My profile</a>
                <a className='text-gray-100 font-medium text-xl' href="#">Login</a>
                <a className='text-gray-100 font-medium text-xl' href="#">Sign up</a>
       </div>}
        </nav>
    </div>
    </>
  )
}

export default Navbar