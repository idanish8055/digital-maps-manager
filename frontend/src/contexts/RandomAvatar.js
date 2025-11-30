import React from "react";
import Avatar1 from '../assets/avatar.png';
import Avatar2 from '../assets/avatar3.png';
import Avatar3 from '../assets/avatar4.png';
import Avatar4 from '../assets/avatar5.png';
import Avatar5 from '../assets/avatar6.png';
import Avatar6 from '../assets/avatar7.png';
import Avatar7 from '../assets/avatar8.png';
import Avatar8 from '../assets/avatar9.png';

const RandomAvatar = ({ className, customKey }) => {
    const avatars = [Avatar1, Avatar2, Avatar3, Avatar4, Avatar5, Avatar6, Avatar7, Avatar8];
    const randomIndex = Math.floor(Math.random() * avatars.length);
    const randomAvatar = avatars[randomIndex];

    return <img src={randomAvatar} alt="Random Avatar" className={className} data-key={customKey} />;
}

export default RandomAvatar;
