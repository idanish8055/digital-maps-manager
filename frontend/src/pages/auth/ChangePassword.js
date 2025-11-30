import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { USER_API_ENDPOINTS, HANDLE_API_ERROR } from '../../utils/config';
import FormAction from '../../contexts/FormAction';
import { changePasswordFields } from "../../utils/formFields";
import Input from "../../contexts/Input";
import LoginHeader from '../../components/auth/Header';
import LoginLeftside from '../../components/auth/Leftside';
import RightForm from '../../components/auth/RightForm';


const ChangePassword = () => {

    const fields = changePasswordFields;
    let fieldsState = {};
    fields.forEach(field => fieldsState[field.id] = '');

    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [countdown, setCountdown] = useState(15);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    useEffect(() => {
        const token = searchParams.get('token');
        setChangePasswordState(prevState => ({ ...prevState, token }));
    }, [0]);

    const [changePasswordState, setChangePasswordState] = useState(fieldsState);

    const handleChange = (e) => {
        setChangePasswordState({ ...changePasswordState, [e.target.id]: e.target.value })

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        changePasswordUser();
    }

    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (countdown / 15) * circumference;


    //Handle Login API Integration here
    const changePasswordUser = async () => {
        const requiredFields = ['password', 'confirm_password'];
        for (const field of requiredFields) {
            if (!changePasswordState[field]) {
                return setError(`${field.replace('_', ' ').charAt(0).toUpperCase()+field.slice(1)} field is required.`);
            }
        }
        if (changePasswordState.password !== changePasswordState.confirm_password) {
            return setError("Password and confirm password fields do not match.");
        }

        // // Make API call to resetpassword endpoint

        try {
            const response = await axios.put(USER_API_ENDPOINTS.CHANGE_PASSWORD, changePasswordState);
            if (response.status === 201) {
                setShowModal(true);
                setInterval(() => {
                    setCountdown((countdown) => countdown - 1);
                }, 1000);
                setTimeout(() => {
                    window.location.replace('/');
                }, 15000);
            }
        } catch (error) {
            const errorMessage = HANDLE_API_ERROR(error);
            setError(errorMessage);
        }
    };

    return (
        <>
            <div className="min-h-100vh flex grow bg-slate-50 dark:bg-navy-900 -m-4" style={{ minHeight: "102vh" }}>
                <LoginHeader />
                <LoginLeftside />
                <RightForm
                    heading="Change Password"
                    paragraph="Don't have an account yet? "
                    linkName="Signup"
                    linkUrl="/signup" >

                    <form className="mt-8 space-y-6">
                        <div className="-space-y-px">
                            {
                                fields.map(field =>
                                    <Input
                                        key={field.id}
                                        handleChange={handleChange}
                                        value={changePasswordState[field.id]}
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
                        </div>
                        {error &&
                            <div className="bg-red-100 border border-red-200 text-red-700 px-2 py-2 rounded relative" role="alert">
                                <div className="mb-1">
                                    <span className="block sm:inline text-xs">{error}</span>
                                </div>
                            </div>
                        }
                        <FormAction handleSubmit={handleSubmit} text="Reset Password" />
                    </form>
                </RightForm>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-8">
                        <p className="text-center font-bold text-lg mb-4">Password have changed successfully!</p>
                        <svg viewBox="0 0 100 100" width="70%" className="text-center m-auto">
                            <circle cx="50" cy="50" r="40" fill="none" stroke="#34D399" strokeWidth="6"></circle>
                            <circle cx="50" cy="50" r="40" fill="none" stroke="#fff" strokeWidth="6" strokeDasharray="251.32741228718345" strokeDashoffset={(countdown / 15) * 251.32741228718345} transform="rotate(-90 50 50)"></circle>
                            <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" fontSize="24" fontWeight="bold" fill="#34D399">{countdown}</text>
                        </svg>
                        <p className="text-center font-medium text-gray-700 mt-4">Redirecting to login page in 15 seconds...</p>
                        <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 mt-10" onClick={() => { window.location.replace('/'); }}>
                            Go to login page
                        </button>
                    </div>
                </div>
            )}
        </>
    );





}

export default ChangePassword;