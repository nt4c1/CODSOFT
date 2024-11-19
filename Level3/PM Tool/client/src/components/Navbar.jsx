import React from "react";
import { MdOutlineSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSidebar } from "../redux/slices/authSlice";
import UserAvatar from "./UserAvatar";
import NotificationPanel from "./NotificationPanel";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className='flex justify-between items-center bg-white px-4 py-3 2xl:py-4 sticky z-10 top-0 shadow'>
      <div className='flex gap-4'>
        <button
          onClick={() => dispatch(setOpenSidebar(true))}
          className='text-2xl text-gray-500 block md:hidden'
          aria-label="Open sidebar"
        >
          ☰
        </button>

        <div className='w-64 2xl:w-[400px] flex items-center py-2 px-3 gap-2 rounded-full bg-[#f3f4f6]'>
          <MdOutlineSearch className='text-gray-500 text-xl' />

          <input
            type='text'
            placeholder='Search....'
            className='flex-1 outline-none bg-transparent placeholder:text-gray-500 text-gray-800'
            aria-label="Search"
          />
          <button 
            className='px-2 text-gray-500 hover:text-gray-800 transition duration-200'
            aria-label="Search button"
          >
            🔍
          </button>
        </div>
      </div>

      <div className='flex gap-2 items-center'>
        <NotificationPanel />
        <div className="flex items-center">
          <UserAvatar />
          <span className="ml-2 text-gray-800">{user.name}</span> {/* Displaying user name */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
