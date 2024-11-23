import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Header from './Header'



const Sidebar = () => {
  const [open, setOpen] = useState(true)
  const [mobileMenu, setMobileMenu] = useState(false)
  const location = useLocation()

  const Menus = [
    { title: 'Order History', path: '/orders'  },
    { title: 'Cart', path: '/cart' },
    { title: 'Wishlist', path: '/wishlist' },
    { title: 'Account Setting', path: '/' },
    { title: 'Logout', path: '/signin' },

  ]

  return (
    <>
            <Header myaccount={true} signin={false} signup={false}/>

      <div
        className={`${
          open ? 'w-60' : 'w-fit'
        } hidden sm:block relative h-screen duration-300 bg-gray-100 border-r border-gray-200 dark:border-gray-600 p-5 dark:bg-slate-800`}
      >
       
        <Link to='/'>
          <div className={`flex ${open && 'gap-x-4'} items-center`}>
            {/* <img src={Logo} alt='' className='pl-2' /> */}
         
          </div>
        </Link>

        <ul className='pt-6 '>
          {Menus.map((menu, index) => (
            <Link to={menu.path} key={index}>
              <li
                className={`flex items-center  gap-x-6 p-3 text-base font-normal rounded-lg cursor-pointer dark:text-white border-b-2 shadow-lg hover:bg-gray-200 dark:hover:bg-gray-700
                        ${ 'mt-2'} ${
                  location.pathname === menu.path &&
                  'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                {/* <span className='text-2xl'>{menu.src}</span> */}
                <span
                  className={`${
                    !open && 'hidden'
                  } origin-left duration-300 hover:block text-xl`}
                >
                  {menu.title}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
 
      <div className="sm:hidden">
        <div
          className={`${
            mobileMenu ? 'flex' : 'hidden'
          } absolute z-50 flex-col items-center self-end py-8 mt-16 space-y-6 font-bold sm:w-auto left-6 right-6 dark:text-white  bg-gray-50 dark:bg-slate-800 drop-shadow md rounded-xl`}
        >
          {Menus.map((menu, index) => (
            <Link
              to={menu.path}
              key={index}
              onClick={() => setMobileMenu(false)}
            >
              <span
                className={` ${
                  location.pathname === menu.path &&
                  'bg-gray-200 dark:bg-gray-700'
                } p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700`}
              >
                {menu.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Sidebar