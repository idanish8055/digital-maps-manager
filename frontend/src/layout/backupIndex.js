import React, { useState, useEffect} from 'react';
// import { useNavigate ,  useLocation} from "react-router-dom";
import './layout.css';
import Router from '../router/Router';
import Header from '../pages/header/Header';
import Sidebar from '../pages/sidebar/Sidebar';
import { checkLogin } from '../auth/index';



const Index = () => {

  const [islogin, setislogin] = useState(false);
  const [issidebar, sidebaraction] = useState(false);

  const changeSidebar = () => {
    sidebaraction(!issidebar);
  };

  useEffect(() => {
    if (checkLogin()) {
      setislogin(true);
    }
  }, []);

//   const history = useNavigate();
//   const location = useLocation();
//   console.log(location);

//   useEffect(() => {
//     // This function will be called whenever the URL changes
//     // Use history.push to navigate to the new location
//     history.push(location.pathname);
//   }, [location, history]);

  return (
    <div className="layout-div">
      <div className="header-div">
        <Header issidebar={issidebar} islogin={islogin} changeSidebar={changeSidebar} />
      </div>
      <div className="body-div">
        {islogin ? (
          <div className="sidebar-div">
            <Sidebar islogin={islogin} issidebar={issidebar} />
          </div>
        ) : null}

        <div className="content-div">
          <Router />
        </div>
      </div>
    </div>
  );
};

export default Index;
