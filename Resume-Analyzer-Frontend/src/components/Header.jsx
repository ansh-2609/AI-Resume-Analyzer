
// import React, { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Bars3Icon,
//   MagnifyingGlassIcon,
//   BellIcon,
//   UserCircleIcon,
//   BriefcaseIcon,
// } from '@heroicons/react/24/outline';

// function Header({ onMobileMenuOpen }) {
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const [notificationsOpen, setNotificationsOpen] = useState(false);
//   const navigate = useNavigate();
//   const searchRef = useRef(null);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('userId');
//     navigate('/login');
//     setUserMenuOpen(false);
//   };

//   const notifications = [
//     { id: 1, text: 'New job matches found', time: '5 min ago' },
//     { id: 2, text: 'Resume analysis complete', time: '1 hour ago' },
//     { id: 3, text: 'Interview scheduled tomorrow', time: '2 hours ago' },
//   ];

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchRef.current?.value) {
//       console.log('Searching for:', searchRef.current.value);
//     }
//   };

//   return (
//     <header className="sticky top-0 z-30 bg-blue-600 text-white shadow-md">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="flex h-16 items-center justify-between">
//           {/* Logo and Mobile Menu Button */}
//           <div className="flex items-center">
//             <button
//               onClick={onMobileMenuOpen}
//               className="mr-3 inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-blue-700 focus:outline-none lg:hidden"
//             >
//               <Bars3Icon className="h-6 w-6" />
//             </button>

//             <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
//               <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
//                 <BriefcaseIcon className="h-5 w-5 text-blue-600" />
//               </div>
//               <span className="text-xl font-bold">AI Resume Analyzer</span>
//             </div>
//           </div>

//           {/* Search Bar */}
//           <div className="hidden flex-1 max-w-2xl px-6 lg:block">
//             <form onSubmit={handleSearch} className="relative">
//               <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                 <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 ref={searchRef}
//                 type="search"
//                 className="block w-full rounded-lg border-0 bg-white/20 py-2 pl-10 pr-3 text-white placeholder-gray-200 focus:bg-white focus:text-gray-900 focus:ring-0 sm:text-sm"
//                 placeholder="Search jobs or skills..."
//               />
//             </form>
//           </div>

//           {/* Right Side Icons */}
//           <div className="flex items-center space-x-4">
//             {/* Mobile Search Icon */}
//             <button className="rounded-md p-2 text-white hover:bg-blue-700 lg:hidden">
//               <MagnifyingGlassIcon className="h-6 w-6" />
//             </button>

//             {/* Notifications */}
//             <div className="relative">
//               <button
//                 onClick={() => setNotificationsOpen(!notificationsOpen)}
//                 className="relative rounded-md p-2 text-white hover:bg-blue-700"
//               >
//                 <BellIcon className="h-6 w-6" />
//                 {notifications.length > 0 && (
//                   <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs">
//                     {notifications.length}
//                   </span>
//                 )}
//               </button>

//               {notificationsOpen && (
//                 <div className="absolute right-0 mt-2 w-80 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
//                   <div className="max-h-96 overflow-y-auto">
//                     {notifications.map((notification) => (
//                       <div
//                         key={notification.id}
//                         className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
//                         onClick={() => setNotificationsOpen(false)}
//                       >
//                         <p className="text-sm text-gray-900">{notification.text}</p>
//                         <p className="text-xs text-gray-500">{notification.time}</p>
//                       </div>
//                     ))}
//                     <div className="border-t border-gray-100">
//                       <button className="block w-full px-4 py-2 text-left text-sm text-blue-600 hover:bg-gray-50">
//                         View all notifications
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* User Menu */}
//             <div className="relative">
//               <button
//                 onClick={() => setUserMenuOpen(!userMenuOpen)}
//                 className="flex items-center space-x-2 rounded-full p-1 hover:bg-blue-700"
//               >
//                 <div className="h-8 w-8 overflow-hidden rounded-full bg-blue-500">
//                   <UserCircleIcon className="h-full w-full p-1" />
//                 </div>
//               </button>

//               {userMenuOpen && (
//                 <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
//                   <button
//                     onClick={() => {
//                       navigate('/profile');
//                       setUserMenuOpen(false);
//                     }}
//                     className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
//                   >
//                     My Profile
//                   </button>
//                   <button
//                     onClick={() => {
//                       navigate('/settings');
//                       setUserMenuOpen(false);
//                     }}
//                     className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
//                   >
//                     Settings
//                   </button>
//                   <div className="border-t border-gray-100">
//                     <button
//                       onClick={handleLogout}
//                       className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Search Bar */}
//       <div className="border-t border-blue-500 px-4 py-3 lg:hidden">
//         <form onSubmit={handleSearch} className="relative">
//           <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//             <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type="search"
//             className="block w-full rounded-lg border-0 bg-white/20 py-2 pl-10 pr-3 text-white placeholder-gray-200 focus:bg-white focus:text-gray-900 focus:ring-0 sm:text-sm"
//             placeholder="Search jobs or skills..."
//           />
//         </form>
//       </div>
//     </header>
//   );
// }

// export default Header;

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  BellIcon,
  UserCircleIcon,
  BriefcaseIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';
import { logout } from '../store/authSlice';


function Header({ onMobileMenuOpen }) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchRef = useRef(null);

  const isLoggedIn = useSelector((state) => state.auth.isloggedin);

  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === "dark";
  // Check authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    console.log('Login Status:', isLoggedIn);
    // setIsLoggedIn(!!(token && userId));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    dispatch(logout())
    navigate('/login');
    setUserMenuOpen(false);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const notifications = [
    { id: 1, text: 'New job matches found', time: '5 min ago' },
    { id: 2, text: 'Resume analysis complete', time: '1 hour ago' },
    { id: 3, text: 'Interview scheduled tomorrow', time: '2 hours ago' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchRef.current?.value) {
      console.log('Searching for:', searchRef.current.value);
    }
  };

  // return (
  //   <header className={`sticky top-0 z-30 bg-blue-600 text-white shadow-md ${
  //         isLoggedIn ? 'lg:pl-64' : ''
  //       }`}>
  //     <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  //       <div className="flex h-16 items-center justify-between">
  //         {/* Logo and Mobile Menu Button */}
  //         <div className="flex items-center">
  //           <button
  //             onClick={onMobileMenuOpen}
  //             className="mr-3 inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-blue-700 focus:outline-none lg:hidden"
  //           >
  //             <Bars3Icon className="h-6 w-6" />
  //           </button>

  //           <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
  //             <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
  //               <BriefcaseIcon className="h-5 w-5 text-blue-600" />
  //             </div>
  //             <span className="text-xl font-bold">AI Resume Analyzer</span>
  //           </div>
  //         </div>

  //         {/* Search Bar - Only show when logged in */}
  //         {isLoggedIn && (
  //           <div className="hidden flex-1 max-w-2xl px-6 lg:block">
  //             <form onSubmit={handleSearch} className="relative">
  //               <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
  //                 <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
  //               </div>
  //               <input
  //                 ref={searchRef}
  //                 type="search"
  //                 className="block w-full rounded-lg border-0 bg-white/20 py-2 pl-10 pr-3 text-white placeholder-gray-200 focus:bg-white focus:text-gray-900 focus:ring-0 sm:text-sm"
  //                 placeholder="Search jobs or skills..."
  //               />
  //             </form>
  //           </div>
  //         )}

  //         {/* Right Side Icons */}
  //         <div className="flex items-center space-x-4">
  //           {isLoggedIn ? (
  //             // Logged In State
  //             <>
  //               {/* Mobile Search Icon - Only show when logged in */}
  //               <button className="rounded-md p-2 text-white hover:bg-blue-700 lg:hidden">
  //                 <MagnifyingGlassIcon className="h-6 w-6" />
  //               </button>

  //               {/* Notifications */}
  //               <div className="relative">
  //                 <button
  //                   onClick={() => setNotificationsOpen(!notificationsOpen)}
  //                   className="relative rounded-md p-2 text-white hover:bg-blue-700"
  //                 >
  //                   <BellIcon className="h-6 w-6" />
  //                   {notifications.length > 0 && (
  //                     <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs">
  //                       {notifications.length}
  //                     </span>
  //                   )}
  //                 </button>

  //                 {notificationsOpen && (
  //                   <div className="absolute right-0 mt-2 w-80 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
  //                     <div className="max-h-96 overflow-y-auto">
  //                       {notifications.map((notification) => (
  //                         <div
  //                           key={notification.id}
  //                           className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
  //                           onClick={() => setNotificationsOpen(false)}
  //                         >
  //                           <p className="text-sm text-gray-900">{notification.text}</p>
  //                           <p className="text-xs text-gray-500">{notification.time}</p>
  //                         </div>
  //                       ))}
  //                       <div className="border-t border-gray-100">
  //                         <button className="block w-full px-4 py-2 text-left text-sm text-blue-600 hover:bg-gray-50">
  //                           View all notifications
  //                         </button>
  //                       </div>
  //                     </div>
  //                   </div>
  //                 )}
  //               </div>

  //               {/* User Menu */}
  //               <div className="relative">
  //                 <button
  //                   onClick={() => setUserMenuOpen(!userMenuOpen)}
  //                   className="flex items-center space-x-2 rounded-full p-1 hover:bg-blue-700"
  //                 >
  //                   <div className="h-8 w-8 overflow-hidden rounded-full bg-blue-500">
  //                     <UserCircleIcon className="h-full w-full p-1" />
  //                   </div>
  //                 </button>

  //                 {userMenuOpen && (
  //                   <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
  //                     <button
  //                       onClick={() => {
  //                         navigate('/profile');
  //                         setUserMenuOpen(false);
  //                       }}
  //                       className="flex items-center w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
  //                     >
  //                       <UserCircleIcon className="h-5 w-5 mr-2" />
  //                       My Profile
  //                     </button>
  //                     <button
  //                       onClick={() => {
  //                         navigate('/settings');
  //                         setUserMenuOpen(false);
  //                       }}
  //                       className="flex items-center w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
  //                     >
  //                       <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
  //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  //                       </svg>
  //                       Settings
  //                     </button>
  //                     <div className="border-t border-gray-100">
  //                       <button
  //                         onClick={handleLogout}
  //                         className="flex items-center w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
  //                       >
  //                         <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
  //                         Logout
  //                       </button>
  //                     </div>
  //                   </div>
  //                 )}
  //               </div>
  //             </>
  //           ) : (
  //             // Not Logged In State
  //             <div className="flex items-center space-x-3">
  //               <button
  //                 onClick={handleSignup}
  //                 className="hidden md:flex items-center space-x-1 rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
  //               >
  //                 <UserPlusIcon className="h-5 w-5" />
  //                 <span>Sign Up</span>
  //               </button>
  //               <button
  //                 onClick={handleLogin}
  //                 className="flex items-center space-x-1 rounded-md bg-white px-4 py-2 text-sm font-medium text-blue-600 hover:bg-gray-100 transition-colors"
  //               >
  //                 <ArrowRightOnRectangleIcon className="h-5 w-5" />
  //                 <span>Log In</span>
  //               </button>
                
  //               {/* Mobile only signup button */}
  //               <button
  //                 onClick={handleSignup}
  //                 className="md:hidden rounded-md bg-blue-500 p-2 text-white hover:bg-blue-700"
  //               >
  //                 <UserPlusIcon className="h-5 w-5" />
  //               </button>
  //             </div>
  //           )}
  //         </div>
  //       </div>
  //     </div>

  //     {/* Mobile Search Bar - Only show when logged in */}
  //     {isLoggedIn && (
  //       <div className="border-t border-blue-500 px-4 py-3 lg:hidden">
  //         <form onSubmit={handleSearch} className="relative">
  //           <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
  //             <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
  //           </div>
  //           <input
  //             type="search"
  //             className="block w-full rounded-lg border-0 bg-white/20 py-2 pl-10 pr-3 text-white placeholder-gray-200 focus:bg-white focus:text-gray-900 focus:ring-0 sm:text-sm"
  //             placeholder="Search jobs or skills..."
  //           />
  //         </form>
  //       </div>
  //     )}
  //   </header>
  // );
  return (
  <header
    className={`sticky top-0 z-30 shadow-md ${
      isLoggedIn ? "lg:pl-64" : ""
    } ${
      isDark
        ? "bg-blue-700 text-white"
        : "bg-blue-600 text-white"
    }`}
  >
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex h-20 items-center justify-between">

        {/* Logo & Mobile Menu */}
        <div className="flex items-center">
          <button
            onClick={onMobileMenuOpen}
            className={`mr-3 rounded-md p-2 lg:hidden ${
              isDark ? "hover:bg-blue-800" : "hover:bg-blue-700"
            }`}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>

          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
              <BriefcaseIcon className="h-5 w-5 text-blue-600" />
            </div>
            <span className="text-xl font-bold">AI Resume Analyzer</span>
          </div>
        </div>

        {/* Desktop Search */}
        {/* {isLoggedIn && (
          <div className="hidden flex-1 max-w-2xl px-6 lg:block">
            <form onSubmit={handleSearch} className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-300" />
              </div>
              <input
                ref={searchRef}
                type="search"
                className={`block w-full rounded-lg py-2 pl-10 pr-3 text-sm placeholder-gray-200 focus:ring-0 ${
                  isDark
                    ? "bg-white/10 text-white focus:bg-white focus:text-gray-900"
                    : "bg-white/20 text-white focus:bg-white focus:text-gray-900"
                }`}
                placeholder="Search jobs or skills..."
              />
            </form>
          </div>
        )} */}

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              {/* Mobile Search */}
              {/* <button
                className={`rounded-md p-2 lg:hidden ${
                  isDark ? "hover:bg-blue-800" : "hover:bg-blue-700"
                }`}
              >
                <MagnifyingGlassIcon className="h-6 w-6" />
              </button> */}

              {/* Notifications */}
              {/* <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className={`rounded-md p-2 ${
                    isDark ? "hover:bg-blue-800" : "hover:bg-blue-700"
                  }`}
                >
                  <BellIcon className="h-6 w-6" />
                  {notifications.length > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs">
                      {notifications.length}
                    </span>
                  )}
                </button>

                {notificationsOpen && (
                  <div
                    className={`absolute right-0 mt-2 w-80 rounded-md shadow-lg ring-1 ring-black/5 ${
                      isDark ? "bg-gray-800" : "bg-white"
                    }`}
                  >
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`px-4 py-3 cursor-pointer ${
                          isDark
                            ? "hover:bg-gray-700 text-gray-200"
                            : "hover:bg-gray-50 text-gray-900"
                        }`}
                        onClick={() => setNotificationsOpen(false)}
                      >
                        <p className="text-sm">{n.text}</p>
                        <p
                          className={`text-xs ${
                            isDark ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {n.time}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div> */}

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className={`rounded-full p-1 ${
                    isDark ? "hover:bg-blue-800" : "hover:bg-blue-700"
                  }`}
                >
                  <div className="h-8 w-8 rounded-full bg-blue-500">
                    <UserCircleIcon className="h-full w-full p-1" />
                  </div>
                </button>

                {userMenuOpen && (
                  <div
                    className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ring-1 ring-black/5 ${
                      isDark ? "bg-gray-800" : "bg-white"
                    }`}
                  >
                    {[
                      { label: "Settings", action: () => navigate("/settings") },
                    ].map((item) => (
                      <button
                        key={item.label}
                        onClick={() => {
                          item.action();
                          setUserMenuOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-left text-sm ${
                          isDark
                            ? "text-gray-200 hover:bg-gray-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                    <div className="border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={handleLogout}
                        className={`w-full px-4 py-2 text-left text-sm ${
                          isDark
                            ? "text-gray-200 hover:bg-gray-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Logged Out */
            <div className="flex items-center space-x-3">
              <button
                onClick={handleSignup}
                className="hidden md:flex rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-700"
              >
                Sign Up
              </button>
              <button
                onClick={handleLogin}
                className={`rounded-md px-4 py-2 text-sm font-medium ${
                  isDark
                    ? "bg-gray-800 text-white hover:bg-gray-700"
                    : "bg-white text-blue-600 hover:bg-gray-100"
                }`}
              >
                Log In
              </button>
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Mobile Search */}
    {/* {isLoggedIn && (
      <div
        className={`border-t px-4 py-3 lg:hidden ${
          isDark ? "border-blue-800" : "border-blue-500"
        }`}
      >
        <input
          type="search"
          className={`block w-full rounded-lg py-2 pl-10 pr-3 text-sm ${
            isDark
              ? "bg-white/10 text-white placeholder-gray-300 focus:bg-white focus:text-gray-900"
              : "bg-white/20 text-white placeholder-gray-200 focus:bg-white focus:text-gray-900"
          }`}
          placeholder="Search jobs or skills..."
        />
      </div>
    )} */}
  </header>
);

 
//   return (
//   <header
//     className={`sticky top-0 z-30
//       bg-blue-600 dark:bg-gray-900
//       text-white dark:text-gray-100
//       shadow-md
//       ${isLoggedIn ? 'lg:pl-64' : ''}
//     `}
//   >
//     <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//       <div className="flex h-16 items-center justify-between">
//         {/* Logo & Mobile Menu */}
//         <div className="flex items-center">
//           <button
//             onClick={onMobileMenuOpen}
//             className="mr-3 inline-flex items-center justify-center rounded-md p-2
//               text-white
//               hover:bg-blue-700 dark:hover:bg-gray-800
//               focus:outline-none lg:hidden"
//           >
//             <Bars3Icon className="h-6 w-6" />
//           </button>

//           <div
//             className="flex items-center space-x-2 cursor-pointer"
//             onClick={() => navigate('/')}
//           >
//             <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-gray-800">
//               <BriefcaseIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
//             </div>
//             <span className="text-xl font-bold">AI Resume Analyzer</span>
//           </div>
//         </div>

//         {/* Desktop Search */}
//         {isLoggedIn && (
//           <div className="hidden flex-1 max-w-2xl px-6 lg:block">
//             <form onSubmit={handleSearch} className="relative">
//               <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                 <MagnifyingGlassIcon className="h-5 w-5 text-gray-300 dark:text-gray-400" />
//               </div>
//               <input
//                 ref={searchRef}
//                 type="search"
//                 className="block w-full rounded-lg border-0
//                   bg-white/20 dark:bg-gray-800
//                   py-2 pl-10 pr-3
//                   text-white dark:text-gray-100
//                   placeholder-gray-200 dark:placeholder-gray-400
//                   focus:bg-white focus:text-gray-900
//                   dark:focus:bg-gray-700 dark:focus:text-white
//                   focus:ring-0 sm:text-sm"
//                 placeholder="Search jobs or skills..."
//               />
//             </form>
//           </div>
//         )}

//         {/* Right Actions */}
//         <div className="flex items-center space-x-4">
//           {isLoggedIn ? (
//             <>
//               <button className="rounded-md p-2 text-white hover:bg-blue-700 dark:hover:bg-gray-800 lg:hidden">
//                 <MagnifyingGlassIcon className="h-6 w-6" />
//               </button>

//               {/* Notifications */}
//               <div className="relative">
//                 <button
//                   onClick={() => setNotificationsOpen(!notificationsOpen)}
//                   className="relative rounded-md p-2 text-white hover:bg-blue-700 dark:hover:bg-gray-800"
//                 >
//                   <BellIcon className="h-6 w-6" />
//                   <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs">
//                     {notifications.length}
//                   </span>
//                 </button>

//                 {notificationsOpen && (
//                   <div className="absolute right-0 mt-2 w-80 origin-top-right rounded-md
//                     bg-white dark:bg-gray-800
//                     py-1 shadow-lg ring-1 ring-black ring-opacity-5"
//                   >
//                     {notifications.map((n) => (
//                       <div
//                         key={n.id}
//                         className="px-4 py-3 cursor-pointer
//                           hover:bg-gray-50 dark:hover:bg-gray-700"
//                         onClick={() => setNotificationsOpen(false)}
//                       >
//                         <p className="text-sm text-gray-900 dark:text-gray-100">
//                           {n.text}
//                         </p>
//                         <p className="text-xs text-gray-500 dark:text-gray-400">
//                           {n.time}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* User Menu */}
//               <div className="relative">
//                 <button
//                   onClick={() => setUserMenuOpen(!userMenuOpen)}
//                   className="flex items-center rounded-full p-1 hover:bg-blue-700 dark:hover:bg-gray-800"
//                 >
//                   <div className="h-8 w-8 rounded-full bg-blue-500 dark:bg-gray-700">
//                     <UserCircleIcon className="h-full w-full p-1" />
//                   </div>
//                 </button>

//                 {userMenuOpen && (
//                   <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md
//                     bg-white dark:bg-gray-800
//                     py-1 shadow-lg ring-1 ring-black ring-opacity-5"
//                   >
//                     {[
//                       { label: 'My Profile', action: () => navigate('/profile') },
//                       { label: 'Settings', action: () => navigate('/settings') },
//                     ].map((item) => (
//                       <button
//                         key={item.label}
//                         onClick={() => {
//                           item.action();
//                           setUserMenuOpen(false);
//                         }}
//                         className="flex w-full items-center px-4 py-2 text-sm
//                           text-gray-700 dark:text-gray-200
//                           hover:bg-gray-100 dark:hover:bg-gray-700"
//                       >
//                         {item.label}
//                       </button>
//                     ))}

//                     <div className="border-t border-gray-100 dark:border-gray-700">
//                       <button
//                         onClick={handleLogout}
//                         className="flex w-full items-center px-4 py-2 text-sm
//                           text-gray-700 dark:text-gray-200
//                           hover:bg-gray-100 dark:hover:bg-gray-700"
//                       >
//                         Logout
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </>
//           ) : null}
//         </div>
//       </div>
//     </div>

//     {/* Mobile Search */}
//     {isLoggedIn && (
//       <div className="border-t border-blue-500 dark:border-gray-700 px-4 py-3 lg:hidden">
//         <form onSubmit={handleSearch} className="relative">
//           <input
//             type="search"
//             className="block w-full rounded-lg border-0
//               bg-white/20 dark:bg-gray-800
//               py-2 pl-10 pr-3
//               text-white dark:text-gray-100
//               placeholder-gray-200 dark:placeholder-gray-400
//               focus:bg-white focus:text-gray-900
//               dark:focus:bg-gray-700 dark:focus:text-white
//               focus:ring-0 sm:text-sm"
//             placeholder="Search jobs or skills..."
//           />
//         </form>
//       </div>
//     )}
//   </header>
// );

}

export default Header;