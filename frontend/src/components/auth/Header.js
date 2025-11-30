import React from "react";
import Logo from '../../assets/maps-logo.png';
import { Link } from "react-router-dom";
import { selectedProject, selectedProjectName } from "../../auth";
import wildArtLogo from "../../assets/wild-art-logo.png"

const Header = () => {

  return (
    <div className="fixed top-0 hidden p-6 lg:block lg:px-12">
      <Link to="/" className="flex items-center space-x-2">
        {selectedProject() && selectedProjectName == "maps" ? 
          <img className="h-12" src={Logo} alt="logo" /> : 
          <img className="h-12" src={wildArtLogo} alt="logo" />}
        
      </Link>
    </div>
  );

}

export default Header;