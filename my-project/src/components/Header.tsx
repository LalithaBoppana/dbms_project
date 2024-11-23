import React from 'react'
interface HeaderProps{
  signin?:boolean;
  signup?:boolean;
  myaccount?:boolean;
}
const Header = ({signin,signup,myaccount}) => {

  return (
    <nav className="flex items-center justify-between flex-wrap bg-red-600 p-6">
  <div className="flex items-center flex-shrink-0 text-black mr-6">
    <span className="font-semibold text-xl tracking-tight">
      TTU 
      </span>
  </div>
  <div className="block lg:hidden">
    <button className="flex items-center px-3 py-2 border rounded text-black border-teal-400 hover:text-white hover:border-white">
      <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
    </button>
  </div>
  <div className="w-full block  lg:flex lg:items-center lg:w-auto ">
    <div className="text-sm lg:flex-grow">
    { signin?  <a href="signin" className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-white mr-4 text-lg">
        SignIn
      </a>:""}
      { signup?<a href="signup" className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-white mr-4 text-lg">
        SignUp
      </a>:""}
     {myaccount?<a href="account" className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-white text-lg">
        My Account
      </a>:""}
    </div>

  </div>
</nav>
  )
}

export default Header