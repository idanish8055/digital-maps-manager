import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoJS from "crypto-js";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { USER_API_ENDPOINTS, API_HEADERS, HANDLE_API_ERROR } from '../../utils/config';
import FormAction from '../../contexts/FormAction';
import { loginFields } from "../../utils/formFields";
import Input from "../../contexts/Input";
import RememberMe from '../../components/auth/RememberMe';
import LoginHeader from '../../components/auth/Header';
import LoginLeftside from '../../components/auth/Leftside';
import RightForm from '../../components/auth/RightForm';
import { useAuthContext } from '../../contexts/auth-context';

export default function Login() {
  const Auth = useAuthContext();
  const secretPass = "vendorAppByCedCommerce";

  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [dashboardData, setDashboardData] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(null);
  const [isCookieAvailable, setIsCookieAvailable] = useState(false);

  const fields = loginFields;
  let fieldsState = {};
  fields.forEach(field => fieldsState[field.id] = '');

  const [loginState, setLoginState] = useState(fieldsState);
  // const [token, setToken] = useState('');

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value })

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser();
  }

  useEffect(() => {
    const email = Cookies.get('email');
    const password = Cookies.get('password');
    if (email && password) {
      const bytes = CryptoJS.AES.decrypt(password, secretPass);
      const decryptPassword = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      
      setLoginState({ email, password: decryptPassword });
      setRememberMe(true);
      setIsCookieAvailable(true);
    }
  }, []);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  }
  useEffect(()=>{
    if(loginState.email !== "" && loginState.password !== ""){
      authenticateUser();
    }
  },[isCookieAvailable]);
  //Handle Login API Integration here
  const authenticateUser = async () => {

    // Check if email and password fields are not empty
    if (!loginState.email || !loginState.password) {
      return setError(`${!loginState.email ? "Email" : "Password"} field is required`);
    }
    // Define mailformat regex and check if email matches the pattern
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!loginState.email.match(mailformat)) {
      return setError("Please enter a valid email address");
    }

    // Make API call to login endpoint
    
    try {
      setIsSubmitted(false);
      const response = await axios.post(USER_API_ENDPOINTS.LOGIN, loginState, {
        headers: API_HEADERS
        //   withCredentials: true
      });
      
      if (response.status === 201) {
        const user_data = await response.data;
        Auth.login(user_data.user_id, user_data.token, user_data.role, user_data.name, user_data.email);
        setIsSubmitted(null);
        if (rememberMe) {
          const encryptedPassword = CryptoJS.AES.encrypt(
            JSON.stringify(loginState.password),
            secretPass
          ).toString();
          Cookies.set('email', loginState.email, { expires: 0.0104167 }); // Expires in 15 minutes
          Cookies.set('password', encryptedPassword, { expires: 0.0104167 }); // Expires in 15 minutes
        }
      } 
      else if(response.status === 200 && !response.data.success){
        setIsSubmitted(null);
        navigate(`/userverification/${response.data.email_activation_token}`);
      }
      else {
        setIsSubmitted(null);
        setError('Login failed. Please check your credentials.');
        // You can handle the error here and display an error message to the user
      }
      
    } catch (error) {
      setIsSubmitted(null);

      if (error?.response?.status === 423) {
        navigate('/accountsuspended');
      }
      else {
        const errorMessage = HANDLE_API_ERROR(error);
        setError(errorMessage);
      }
    }
    setIsSubmitted(true);
  };

  return (
    <>
      <div className="min-h-100vh flex grow bg-slate-50 dark:bg-navy-900 -m-4" style={{ minHeight: "102vh" }}>
        <LoginHeader />
        <LoginLeftside
          page="login" />
        <RightForm
          heading="Welcome Back"
          paragraph="Don't have an account yet? "
          linkName="Signup"
          linkUrl="/signup" >

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
              {
                fields.map(field =>
                  <Input
                    key={field.id}
                    handleChange={handleChange}
                    value={loginState[field.id]}
                    labelText={field.labelText}
                    labelFor={field.labelFor}
                    id={field.id}
                    name={field.name}
                    type={field.type}
                    // isRequired={field.isRequired}
                    placeholder={field.placeholder}
                  />

                )
              }
            </div>

            <RememberMe checked={rememberMe} onChange={handleRememberMe} />
            {error &&
              <div className="bg-red-100 border border-red-200 text-red-700 px-2 py-2 rounded relative" role="alert">
                <div className="mb-1">
                  <span className="block sm:inline text-xs">{error}</span>
                </div>  
              </div>
            }
            <FormAction text="Login" isSubmitted={isSubmitted}/>
          </form>
        </RightForm>
      </div>
    </>
  );
}