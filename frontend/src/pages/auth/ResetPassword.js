import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { USER_API_ENDPOINTS, API_HEADERS, HANDLE_API_ERROR } from '../../utils/config';
import FormAction from '../../contexts/FormAction';
import { resetPasswordFields } from "../../utils/formFields";
import Input from "../../contexts/Input";
import LoginHeader from '../../components/auth/Header';
import LoginLeftside from '../../components/auth/Leftside';
import RightForm from '../../components/auth/RightForm';

const ResetPassword = () => {

    const fields = resetPasswordFields;
    let fieldsState = {};
    fields.forEach(field => fieldsState[field.id] = '');
    const navigate = useNavigate();

    const [resetState, setResetState] = useState(fieldsState);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(null);

    const handleChange = (e) => {
        setError("");
        setResetState({ ...resetState, [e.target.id]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        resetPasswordUser();
    }


    //Handle Login API Integration here
    const resetPasswordUser = async () => {
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        
        if (!resetState.email) {
            setError("Email is required.");
        }
        else if(!resetState.email.match(mailformat)) {
            setError("Email is not valid.");
        }
        else{
            setError("");

            try {
                setIsSubmitted(false);
                const response = await axios.post(USER_API_ENDPOINTS.RESET_PASSWORD, resetState, {
                    headers: { 'Content-Type': 'application/json' },
                });
                if (response.status === 200) {
                    setError(null);
                    setSuccess("Reset password link has been sent on your email.");
                    // setTimeout(() => setSuccess(null), 5000);
                    setIsSubmitted(null);
                }
                else{
                    setIsSubmitted(null);
                }
            } catch (error) {
                if (error.response.status === 423) {
                    setIsSubmitted(null);
                    navigate('/accountsuspended');
                }
                else {
                    setIsSubmitted(null);
                    const errorMessage = HANDLE_API_ERROR(error);
                    setError(errorMessage);
                    setSuccess(null);
                }
                
            }
        }        
    };

    return (
        <>
            <div className="min-h-100vh flex grow bg-slate-50 dark:bg-navy-900 -m-4" style={{ minHeight: "102vh" }}>
                <LoginHeader />
                <LoginLeftside page="resetpassword" />
                <RightForm
                    heading="Reset Password"
                    paragraph="Don't have an account yet? "
                    linkName="Login"
                    linkUrl="/" >

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="-space-y-px">
                            {
                                fields.map(field =>
                                    <Input
                                        key={field.id}
                                        handleChange={handleChange}
                                        value={resetState[field.id]}
                                        labelText={field.labelText}
                                        labelFor={field.labelFor}
                                        id={field.id}
                                        name={field.name}
                                        type={field.type}
                                        placeholder={field.placeholder}
                                    />

                                )
                            }
                        </div>
                        {error &&
                            <div className="bg-red-100 border border-red-200 text-red-700 px-2 py-2 rounded relative" role="alert">
                                <span className="block sm:inline text-xs">{error}</span>
                            </div>
                        }
                        {success &&
                            <div className="bg-green-100 border border-green-200 text-green-700 px-2 py-2 rounded relative" role="alert">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline mr-2 text-green-700" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="none" d="M0 0h24v24H0z" />
                                    <path fill="currentcolor" d="M12 2C6.485 2 2 6.485 2 12s4.485 10 10 10 10-4.485 10-10S17.515 2 12 2zm3.293 7.293l-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414l1.293 1.293 3.293-3.293a1 1 0 0 1 1.414 1.414z" />
                                </svg>
                                {/* <strong className="font-bold text-sm">Success! </strong> */}
                                <span className="block sm:inline text-xs">{success}</span>
                            </div>

                        }
                        <FormAction text="Send recovery link" isSubmitted={isSubmitted}/>
                    </form>
                </RightForm>
            </div>
        </>
    );

}

export default ResetPassword;





