import React from "react";
import { FaHome, FaSearch, FaStore, FaUserFriends } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { MdOutlineOndemandVideo, MdLogout } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaMoon, FaSun } from "react-icons/fa";
import { toggleTheme } from "@/redux/themeSlice";
import axios from "axios";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {setUser } from "@/redux/authSlice";



const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme } = useSelector((store) => store.theme);
  const { user } = useSelector((store) => store.auth);

  const logoutHandler = async () => {
    try{
      const res = await axios.get(`http://localhost:8000/api/v1/auth/logout`)
      if(res.data.success){
        dispatch(setUser(null))
        toast.success(res.data.message);
      }
    } catch(error){
        console.log(error);
    }
  }

  const toProfilePage = () => {
    navigate(`/profile/${user?._id || "me"}`);
  };

  return (
    <nav className="bg-white dark:bg-[#262829] shadow fixed w-full z-50">
      <div className="px-4 py-2 md:py-0 flex justify-between items-center">
        {/* left section logo + search */}
        <div className="flex items-center space-x-3">
          <img
            src={logo}
            alt="Logo"
            className="w-10 h-10 cursor-pointer rounded-[25px]"
            onClick={() => navigate("/")}
          />

          <div className="relative flex items-center dark:bg-[#323233] bg-[#f2f4f7] px-3 py-2 rounded-full">
            <FaSearch className="text-gray-400" />

            <input
              type="text"
              placeholder="Search Facebook"
              className="dark:bg-[#323233] bg-[#f2f4f7] ml-2 outline-none text-sm w-28 md:w-40 text-black dark:text-white"
            />
          </div>
        </div>

        {/* center sections - navigation icons */}

        <div className="hidden md:flex space-x-8 mt-2">
          <button className="border-b-4 border-blue-600 w-[100px] flex items-center justify-center pb-3">
            <FaHome className="text-3xl text-blue-600 cursor-pointer hover:text-blue-700"></FaHome>
          </button>

          <button className="w-[100px] flex items-center justify-center hover:bg-gray-200/10 rounded-lg transition-all">
            <FaUserFriends className="text-3xl text-gray-400 cursor-pointer"></FaUserFriends>
          </button>

          <button className="w-[100px] flex items-center justify-center hover:bg-gray-200/10 rounded-lg transition-all">
            <MdOutlineOndemandVideo className="text-3xl text-gray-400 cursor-pointer"></MdOutlineOndemandVideo>
          </button>

          <button className="w-[100px] flex items-center justify-center hover:bg-gray-200/10 rounded-lg transition-all">
            <FaStore className="text-3xl text-gray-400 cursor-pointer"></FaStore>
          </button>
        </div>

        {/* Right sections - profile & icons */}
        <div className="flex items-center justify-end space-x-4">
          <FaBell className="text-xl text-gray-600 cursor-pointer hover:text-blue-600 hidden md:block" />

          <IoMdMenu className="text-2xl text-gray-600 cursor-pointer hover:text-blue-600 hidden md:block" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage
                  src={user?.profilePicture || "https://github.com/shadcn.png"}
                  alt={user?.firstname || "Profile"}
                />
                <AvatarFallback>
                  {user?.firstname?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-80 bg-[#262829] text-white border-none text-2xl"
              align="start"
            >
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem onClick={toProfilePage}>
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Friends
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Keyboard shortcuts
                  <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="flex gap-2 items-center hover:bg-[#3a3c3d]"
                onClick={() => dispatch(toggleTheme())}
              >
                <div className="bg-[#3a3c3d] text-gray-300 p-2 rounded-full">
                  {
                    theme === 'light' ? <FaMoon className="text-gray-200"></FaMoon> : <FaSun className="text-gray-200"></FaSun>
                  }
                </div>
                Display
              </DropdownMenuItem>

              <DropdownMenuGroup>
                <DropdownMenuItem onClick={logoutHandler} className="flex gap-2 items-center hover:bg-[#3a3c3d]" >
                  <div className="bg-[#3a3c3d] p-2 rounded-full">
                    <MdLogout
                      width={10}
                      height={10}
                      className="text-gray-200"
                    />
                  </div>
                  Log out
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
