import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {

    const [visible,setVisible]=useState(false);
    const {setShowSearch,getCartCount,navigate,token,setToken,setCartItems}=useContext(ShopContext);

    const logout =()=>{
        navigate('/login')
        localStorage.removeItem('token');
        setToken('');
        setCartItems({});
    }

  return (
    <div className='flex items-center justify-between py-5 font-medium relative'>
        <Link to='/'><img src={assets.logo} className='w-28 sm:w-36' alt="Forever" /></Link>

        {/* Desktop Navigation Links */}
        <ul className='hidden md:flex gap-5 text-sm text-gray-700'>
             <NavLink to='/' className='flex flex-col items-center gap-1'>
                <p>HOME</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
             </NavLink>
             <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                <p>COLLECTION</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
             </NavLink>
             <NavLink to='/about' className='flex flex-col items-center gap-1'>
                <p>ABOUT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
             </NavLink>
             <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                <p>CONTACT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
             </NavLink>
        </ul>

        {/* Right side icons & buttons */}
        <div className="flex items-center gap-3 sm:gap-5">
            <a 
              href="https://forever-i3lw.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className='border border-gray-700 text-gray-800 hover:bg-black hover:text-white px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs transition whitespace-nowrap shadow-xs'
            >
              Admin<span className='hidden sm:inline'> Login</span>
            </a>

            <Link to='/collection'>
              <img onClick={()=>setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="Search" />
            </Link>

            <div className="group relative">
                <img onClick={()=> token ? navigate('/profile') : navigate('/login')} src={assets.profile_icon} className='w-5 cursor-pointer' alt="Profile" />

                {
                    token && 
                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-40'>
                      <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-md'>
                          <p onClick={()=>navigate('/profile')} className='cursor-pointer hover:text-black'>My Profile</p>
                          <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                          <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                      </div>
                    </div>
                }
            </div>

            <Link to='/cart' className='relative'>
                <img src={assets.cart_icon} className='w-5 min-w-5' alt="Cart" />
                <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
            </Link>

            <img onClick={()=>setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer md:hidden' alt="Menu" />
        </div>

        {/* Sidebar drawer menu for small screens */}
        <div className={`fixed top-0 right-0 bottom-0 z-50 overflow-hidden bg-white shadow-xl transition-all duration-300 ${visible ? 'w-full' : 'w-0'}`}>
            <div className='flex flex-col text-gray-600 h-full'>
                <div onClick={()=>setVisible(false)} className="flex items-center gap-4 p-4 border-b cursor-pointer hover:bg-gray-50">
                    <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
                    <p className='font-medium text-black'>Back</p>
                </div>
                <NavLink onClick={()=>setVisible(false)} className='py-3 pl-6 border-b' to='/'>HOME</NavLink>
                <NavLink onClick={()=>setVisible(false)} className='py-3 pl-6 border-b' to='/collection'>COLLECTION</NavLink>
                <NavLink onClick={()=>setVisible(false)} className='py-3 pl-6 border-b' to='/about'>ABOUT</NavLink>
                <NavLink onClick={()=>setVisible(false)} className='py-3 pl-6 border-b' to='/contact'>CONTACT</NavLink>
                <a 
                  onClick={()=>setVisible(false)} 
                  href="https://forever-i3lw.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className='py-3 pl-6 border-b font-semibold text-black bg-gray-50'
                >
                  ADMIN LOGIN ↗
                </a>
            </div>
        </div>
    </div>
  )
}

export default Navbar