import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import FormAction from "../../contexts/FormAction";
import LoginHeader from '../../components/auth/Header';
import LoginLeftside from '../../components/auth/Leftside';
import RightForm from '../../components/auth/RightForm';
import { optVerifyHandler } from "../../utils/api";

const TwoStepVerification = () => {
    const inputsRef = useRef([]);
    const { userToken } = useParams();
    const userEmail = localStorage.getItem('userEmail');
    const [verificationState, setVerificationState] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState(null);
    const [redirectLogin, setRedirectLogin] = useState(false);
    const [success, setSuccess] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(null);

    const handleChange = (e, index) => {
        if (e.nativeEvent.inputType === "insertFromPaste") return;
        const value = e.target.value;
        setSuccess('');
        setError('');
        if (/^[0-9]*$/.test(value)) {
            let tempState = [...verificationState]
            tempState[index] = value.replace(tempState[index], '');
            setVerificationState([...tempState])
        } else {
            // setError('Only input the number');
        }


        if (value !== '' && !isNaN(value)) {
            let nextIndex = index + 1;
            if (nextIndex < inputsRef.current.length) {
                inputsRef.current[nextIndex].focus();
            }
        }
    };
    
    const handlePaste = (e) => {
        const pastedValue = e.clipboardData.getData('text/plain');
        if (/^[0-9]*$/.test(pastedValue)) {
            setVerificationState(prev => prev.map((num, ind) => pastedValue?.[ind] ?? ''));
            let nextIndex = verificationState.length <= pastedValue.length ? verificationState.length - 1 : pastedValue.length;
            inputsRef?.current?.[nextIndex]?.focus()
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitted(false);
        const hasInvalidInput = verificationState.some(
            (value) => !/^[0-9]+$/.test(value)
        );

        if (hasInvalidInput) {
            setSuccess('');
            setError("Please enter valid numbers in all fields.");
            return;
        }

        let newString = verificationState.toString();
        const otp = Number(newString.replace(/,/g, ''));

        try {
            const response = await optVerifyHandler({
                otp: otp,
                token: userToken
            });

            // Handle the response as needed
            if (response.status == 201) {
                setError('');
                setSuccess("Verification successful!");
                setTimeout(() => {
                    setRedirectLogin(true);
                }, 2000);
            }
        } catch (error) {
            setSuccess('')
            setError("Token or OTP expired. Please try again.");
        }
        setIsSubmitted(true);
    };
    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && verificationState[index] === '') {
            // Remove the last character from the previous input field
            const prevIndex = index - 1;
            if (prevIndex >= 0) {
                setVerificationState((prevState) => {
                    const newState = [...prevState];
                    newState[prevIndex] = '';
                    return newState;
                });
                inputsRef.current[prevIndex]?.focus();
            }
        }
    };

    useEffect(() => {
        setError(null);
    }, [verificationState]);
    const isConfirmButtonDisabled =
        verificationState.some((value) => !/^[0-9]+$/.test(value)) ||
        verificationState.some((value) => value === "");

    const handleResendOTP = async () => {
        setVerificationState(["", "", "", "", "", ""]);
        try {
            const response = await axios.post('https://api.mapsofthepast.com/api/user/otp/resend', {
                token: userToken
            });

            if (response.status == 201) {
                setError('');
                setSuccess("OTP Resent to mail");
            }
        } catch (error) {
            setSuccess('');
            setError("Token or OTP expired. Please try again.");
        }

    }

    return (
        <>
            <div className="min-h-100vh flex grow bg-slate-50 dark:bg-navy-900 -m-4" style={{ minHeight: "102vh" }}>
                <LoginHeader />
                <LoginLeftside page="otp" />
                {!redirectLogin ? (
                    <RightForm
                        heading="Two Step Verification"
                        paragraph={`Please enter the 6 digit code sent to ${userEmail}`}
                        linkName=""
                        linkUrl="">
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                            <div className="-space-y-px">
                                <div
                                    className="grid grid-cols-6 gap-2 max-w-[20rem] mx-auto"
                                >
                                    {verificationState.map((value, index) => (
                                        <input
                                            key={index}
                                            id={`input-${index}`}
                                            type="text"
                                            className={`text-center py-2 px-2 block w-full border ${!/^[0-9]*$/.test(value) ? "border-red-500" : "border-gray-400"
                                                } rounded-sm text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10`}
                                            required
                                            // maxLength="1"
                                            pattern="[0-9]*"
                                            title="Please enter only numbers"
                                            value={value}
                                            ref={(el) => (inputsRef.current[index] = el)}
                                            onChange={(e) => handleChange(e, index)}
                                            onKeyDown={(e) => handleKeyDown(e, index)}
                                            onPaste={e => handlePaste(e, index)}
                                        />
                                    ))}
                                </div>
                            </div>
                            {error &&
                                <div className="bg-red-100 border border-red-200 text-red-700 px-2 py-2 rounded relative" role="alert">
                                    <div className="mb-1">
                                        <span className="block sm:inline text-xs">{error}</span>
                                    </div>
                                </div>
                            }
                            {success &&
                                <div className="bg-green-100 border border-green-200 text-green-700 px-2 py-2 rounded relative" role="success">
                                    <span className="block sm:inline text-xs">{success}</span>
                                </div>
                            }
                            <FormAction text="Confirm" disabled={isConfirmButtonDisabled} isSubmitted={isSubmitted} />
                        </form>
                        <p className="text-center text-xs text-gray-600 dark:text-white/70 mt-4"> Didn't received any code ? <button className="text-primary-600 decoration-2 font-medium" onClick={handleResendOTP}> Resend </button> </p>
                    </RightForm>
                ) :
                    (
                        <RightForm
                            heading="Your account have been created"
                            paragraph='Please click to login'
                            linkName="Login"
                            linkUrl="/" />
                    )
                }
            </div>

        </>
    );
};

export default TwoStepVerification;
