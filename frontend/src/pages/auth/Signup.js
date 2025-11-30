import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/auth/LoginHeaderCard'
import { USER_API_ENDPOINTS, API_HEADERS, HANDLE_API_ERROR } from '../../utils/config';
import FormAction from '../../contexts/FormAction';
import { signupFields } from "../../utils/formFields";
import Input from "../../contexts/Input";
import LoginHeader from '../../components/auth/Header';
import LoginLeftside from '../../components/auth/Leftside';
import RightForm from '../../components/auth/RightForm';

export default function Signup() {
  const fields = signupFields;
  let fieldsState = {};
  fields.forEach(field => {
    if (field.id === 'role') {
      fieldsState[field.id] = 'admin';
    } else {
      fieldsState[field.id] = '';
    }
  });

  const navigate = useNavigate();
  const [signupState, setSignupState] = useState(fieldsState);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(15);
  const [isSubmitted, setIsSubmitted] = useState(null);

  const handleChange = (e) => {
    setSignupState({ ...signupState, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createAccount();
  };

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (countdown / 15) * circumference;
  //handle Signup API Integration here
  const createAccount = async () => {

    const requiredFields = ['username', 'email', 'password', 'confirm_password'];
    for (const field of requiredFields) {
      if (!signupState[field]) {
        return setError(`${field.replace('_', ' ').charAt(0).toUpperCase() + field.slice(1)} field is required.`);
      }
    }

    const usernameFormat = /^[a-zA-Z0-9\-]+$/;
    if (!signupState.username.match(usernameFormat)) {
      return setError("You are allowed to enter alphanumeric values using hyphen(-) e.g. john-doe001");
    }

    // Define mailformat regex and check if email matches the pattern
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!signupState.email.match(mailformat)) {
      return setError("Enter a valid email address.");
    }

    const passwordFormat = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;
    if (!signupState.password.match(passwordFormat)) {
      return setError("Password must be at least 8 characters long and contain at least one capital letter, one number, and one special character.");
    }

    if (signupState.password !== signupState.confirm_password) {
      return setError("Password and confirm password fields do not match.");
    }

    // Make API call to singup endpoint

    try {
      setIsSubmitted(false);
      const response = await axios.post(USER_API_ENDPOINTS.CREATE_USER, signupState, {
        headers: API_HEADERS
      });
      if (response.status === 201) {
        setIsSubmitted(null);
        const userToken = response.data.user.email_activation_token;
        localStorage.setItem('userEmail', response.data.user.email);
        navigate(`/userverification/${userToken}`);
      }
    } catch (error) {
      const errorMessage = HANDLE_API_ERROR(error);
      setError(errorMessage);
      setIsSubmitted(null);
    }
  };

  return (



    <>
      <div className="min-h-100vh flex grow bg-slate-50 dark:bg-navy-900 -m-4" style={{ minHeight: "102vh" }}>
        <LoginHeader />
        <LoginLeftside page="signup" />
        <RightForm
          heading="Signup to create an account"
          paragraph="Already have an account? "
          linkName="Login"
          linkUrl="/" >

          <form className="mt-8 space-y-6">
            <div className="">
              {
                fields.map(field =>
                  <Input
                    key={field.id}
                    handleChange={handleChange}
                    value={signupState[field.id]}
                    labelText={field.labelText}
                    labelFor={field.labelFor}
                    id={field.id}
                    name={field.name}
                    type={field.type}
                    isRequired={field.isRequired}
                    placeholder={field.placeholder}
                  />
                )
              }
              {error &&
                <div className="bg-red-100 border border-red-200 text-red-700 px-2 py-2 rounded relative" role="alert">
                  <div className="mb-1">
                    <span className="block sm:inline text-xs">{error}</span>
                  </div>
                </div>
              }
              <FormAction handleSubmit={handleSubmit} text="Create Account" isSubmitted={isSubmitted} />
            </div>
          </form>
        </RightForm>

        {showModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-8">
              <p className="text-center font-bold text-lg mb-4">Signed up successfully!</p>
              <svg viewBox="0 0 100 100" width="70%" className='text-center m-auto'>
                <circle cx="50" cy="50" r="40" fill="none" stroke="#34D399" strokeWidth="6"></circle>
                <circle cx="50" cy="50" r="40" fill="none" stroke="#fff" strokeWidth="6" stroke-dasharray="251.32741228718345" strokeDashoffset={(countdown / 15) * 251.32741228718345} transform="rotate(-90 50 50)"></circle>
                <text x="50" y="50" text-anchor="middle" dominant-baseline="middle" font-size="24" font-weight="bold" fill="#34D399">{countdown}</text>
              </svg>
              <p className="text-center font-medium text-gray-700 mt-4">Redirecting to login page in 15 seconds...</p>
              <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 mt-10" onClick={() => { window.location.replace('/'); }}>
                Go to login page
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}