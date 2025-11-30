import React, { useState } from 'react';
import { NavLink, Link } from "react-router-dom";
import { sidemenu } from "../../utils/sidemenu";
import Logo from '../../assets/maps-logo.png';
import WildArtLogo from '../../assets/wild-art-logo.png';
import Giftbox from '../../assets/giftbox.png';
import useAuth from '../../hooks/auth-hook';
import { checkRole, selectedProjectName } from '../../auth';

const Sidebar = ({ issidebar, islogin, isBreadcrumb, handleCloseBreadcrumb }) => {

  const { logout } = useAuth();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const logoutbtn = () => {
    logout();
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    window.location.replace("/");
  };


  return (
    <>
      {isBreadcrumb ? <div className={` lg:hidden before:content-[''] before:w-full before:h-screen before:z-10 before:fixed before:inset-x-0 before:bg-black/90 before:transition-opacity before:duration-200 before:ease-in-out  before:visible before:opacity-100`} /> : null}
      <aside
        className={`${issidebar ? "lg:w-20 xl:w-20" : "lg:w-64 xl:w-64"}  ${isBreadcrumb ? " w-64 w-64 " : "w-0"} fixed inset-y-0 z-10 flex flex-col flex-shrink-0 max-h-screen overflow-hidden transition-all ease-in-out transform border-r shadow-lg lg:z-auto lg:static lg:shadow-none bg-whiteLinen`}
      >
        {/* Side-bar-header */}
        <div className="flex items-center justify-between flex-shrink-0 p-2 h-[70px]">
          <span
            className="py-2 text-xl font-semibold leading-8 tracking-wider uppercase whitespace-nowrap grow"
            style={issidebar ? { margin: 'auto' } : {}}
          >
            <Link to="/dashboard" className="flex items-center justify-center text-base text-gray-600">
              <img src={selectedProjectName() === "maps" ? Logo : WildArtLogo} alt="logo" className={`inline-block mt-1 h-${!issidebar || isBreadcrumb ?  '10' : '6'} transition-all ease-in-out`} />
            </Link>
          </span>
          <button
            className="p-2 rounded-md lg:hidden close-button"
            onClick={handleCloseBreadcrumb}
          >
            <svg
              className="w-6 h-6 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path className="stroke-2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Side-bar-links */}
        <div
          component="nav"
          aria-labelledby="nested-list-subheader"
          className="flex-1 overflow-auto hover:overflow-y-auto flex flex-col justify-between"
        >
          <ul className="menu" id="side-menu">
            {issidebar === false}
            {sidemenu &&
              sidemenu.map((menuItem, index) => {
                if ((menuItem.role === "admin" || menuItem.role === "both") && checkRole()) {
                  let menuItemType = menuItem.type;
                  let menuHeading = null;

                  if (
                    index > 0 &&
                    sidemenu[index - 1].type === menuItem.type &&
                    sidemenu[index - 1].role === menuItem.role
                  ) {
                    menuItemType = null;
                  } else {
                    menuHeading = (
                      <li
                        className="border-t-[1px] capitalize menu-heading px-4 py-3.5 text-xs font-medium text-gray-500 cursor-default mt-4"
                        data-key="t-menu"
                        key={`menu-heading-${index}`}
                      >
                        {!issidebar ? <span>{menuItem.type}</span> : null}
                      </li>
                    );
                  }

                  return (
                    <React.Fragment key={`menu-item-${menuItem.id}`}>
                      {menuHeading}
                      <li key={menuItem.id} 
                      // className='border-b'
                      >
                        <NavLink
                          className="menu-items text-gray-600 no-underline block p-3.5 hover:bg-opacity-20"
                          to={menuItem.path}
                        >
                          <button
                            className="flex items-center space-x-2 pl-3 h-6 transition-all ease-in-out"
                          >
                            <span className="icon">{menuItem.icon}</span>
                            <span className={`${issidebar ? 'lg:hidden' : ''} whitespace-nowrap`}>{menuItem.name}</span>
                          </button>
                        </NavLink>
                      </li>
                    </React.Fragment>
                  );
                }
                else if ((menuItem.role === "user" || menuItem.role === "both") && !checkRole()) {
                  let menuItemType = menuItem.type;
                  let menuHeading = null;

                  if (
                    index > 0 &&
                    sidemenu[index - 1].type === menuItem.type &&
                    sidemenu[index - 1].role === menuItem.role
                  ) {
                    menuItemType = null;
                  } else {
                    menuHeading = (
                      <li
                        className="ml-1 border-t-[1px] capitalize	menu-heading px-4 py-3.5 text-xs font-medium text-gray-500 cursor-default mt-4"
                        data-key="t-menu"
                        key={`menu-heading-${index}`}
                      >
                        {!issidebar ? <span className='whitespace-nowrap'>{menuItem.name}</span> : null}
                      </li>
                    );
                  }

                  return (
                    <React.Fragment key={`menu-item-${menuItem.id}`}>
                      {menuHeading}
                      <li key={menuItem.id} className='border-b'>
                        <NavLink
                          className="menu-items text-gray-600 no-underline block p-3 hover:bg-opacity-20"
                          to={menuItem.path}
                        >
                          <button
                            className="flex items-center space-x-2 pl-3 h-6 transition-all ease-in-out"
                          >
                            <span className="icon">{menuItem.icon}</span>
                            <span className={`${issidebar ? 'lg:hidden' : ''} whitespace-nowrap`}>{menuItem.name}</span>
                          </button>
                        </NavLink>
                      </li>
                    </React.Fragment>
                  );
                }
                return null;
              })}
          </ul>
        </div>

      </aside>
    </>
  );
};

export default Sidebar;
