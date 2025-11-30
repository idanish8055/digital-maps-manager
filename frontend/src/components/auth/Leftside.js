import React from "react";
import LoginImage from '../../assets/login.png';
import SignupImage from '../../assets/signup.png';
import OtpImage from '../../assets/otp.jpg';

const LeftSide = (props) => {
  return (
    <div className="hidden w-full place-items-center lg:grid">
      <div className="w-full max-w-lg p-6">
        {props.page === 'login' && <img className="w-full" src={LoginImage} alt="image" />}
        {props.page === 'signup' && <img className="w-full" src={SignupImage} alt="image" />}
        {props.page === 'otp' && <img className="w-full" src={OtpImage} alt="image" />}
        {props.page === 'resetpassword' && <img className="w-full" src={SignupImage} alt="image" />}
      </div>
    </div>
  );
}

export default LeftSide;






