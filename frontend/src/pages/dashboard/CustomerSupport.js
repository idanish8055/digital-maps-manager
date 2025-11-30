import React, { useState, useEffect } from "react";
import useAuth from '../../hooks/auth-hook';
import Input from '../../contexts/Input';
import FormAction from '../../contexts/FormAction';
import Avatar from '../../assets/avatar.png';
import { customerSupportFields } from "../../utils/customerSupportFields";

const CustomerSupport = () => {
    const { role, name, email } = useAuth();
    const [showLoader, setShowLoader] = useState(true);
    const [error, setError] = useState('');
    const requiredFields = ['username', 'email', 'subject', 'descripition'];
    const [data, setData] = useState({
        username: null,
        email: null,
    });

    useEffect(() => {
        setData({
            username: name,
            email: email,
        });
    }, [name, email, role]);

    const fields = customerSupportFields;
    let fieldsState = {};
    fields.forEach((field) => (fieldsState[field.id] = data[field.id]));


    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        for (const field of requiredFields) {
            if (!data[field]) {
                return setError(`${field.replace('_', ' ')} field is required.`);
            }
        }

    }


    return (
        <>
            <section className="items-center max-w-screen-xl m-auto">
                <div className="pt-12 container mx-auto px-4">
                    <div className="mb-12 flex flex-wrap -mx-4 justify-center">
                        <div className="px-4 relative w-full lg:w-8/12 text-center">
                            <h6 className="mb-2 text-lg font-bold uppercase text-lightBlue-500">We are here</h6>
                            <h2 className="text-4xl font-bold mt-0 mb-1 text-blueGray-700">Are you looking for answers?</h2>
                            <p className="mt-2 mb-4 text-xl leading-relaxed text-blueGray-400">You have no idea who I am. You do not know me at all. Have you ever written a song line that a full crowd would shout when you enter the stage? I do not think so.</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-4 mt-12">
                        <div className="px-4 relative w-full lg:w-3/12 w-full md:w-6/12 w-6/12 border-r">
                            <div className="text-center py-6">
                                <div className="text-white bg-lightBlue-500 shadow-lg rounded rounded-full justify-center items-center inline-flex text-center p-2 mb-6 w-16 h-16">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-bold leading-tight mt-0 mb-2">Address</h4>
                                <div className="mb-4">
                                    <p className="text-blueGray-500">12124 First Street, nr 54</p>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 relative w-full lg:w-3/12 w-full md:w-6/12 w-6/12 border-r">
                            <div className="text-center py-6">
                                <div className="text-white bg-lightBlue-500 shadow-lg rounded rounded-full justify-center items-center inline-flex text-center p-2 mb-6 w-16 h-16">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-bold leading-tight mt-0 mb-2">Email</h4>
                                <div className="mb-4">
                                    <p className="text-blueGray-500">hello@email.com</p>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 relative w-full lg:w-3/12 w-full md:w-6/12 w-6/12 border-r">
                            <div className="text-center py-6">
                                <div className="text-white bg-lightBlue-500 shadow-lg rounded rounded-full justify-center items-center inline-flex text-center p-2 mb-6 w-16 h-16">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 21a4 4 0 11-8 0 4 4 0 018 0zm-4-12a4 4 0 100-8 4 4 0 000 8z" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-bold leading-tight mt-0 mb-2">Phone</h4>
                                <div className="mb-4">
                                    <p className="text-blueGray-500">+1(424) 535 3523</p>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 relative w-full lg:w-3/12 w-full md:w-6/12 w-6/12">
                            <div className="text-center py-6">
                                <div className="text-white bg-lightBlue-500 shadow-lg rounded rounded-full justify-center items-center inline-flex text-center p-2 mb-6 w-16 h-16">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3c1.27 0 2.546.488 3.536 1.464a5.002 5.002 0 010 7.072l-3.536 3.536-3.536-3.536a5.002 5.002 0 010-7.072A4.98 4.98 0 0112 3zm0 0v16m0-16C6.475 3 2 7.477 2 12c0 4.422 4.477 8 10 8s10-3.578 10-8c0-4.423-4.477-9-10-9z" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-bold leading-tight mt-0 mb-2">Contact</h4>
                                <div className="mb-4">
                                    <p className="text-blueGray-500">Andrew Samian</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <div className="bg-primaryGray-100">
                        <div className="w-full px-16 mx-auto px-4 mt-12 mb-6 pt-16">
                            <div className="flex flex-wrap -mx-4 justify-center">
                                <div className="px-4 relative w-full text-center">
                                    <span className="text-orange-500 bg-orange-200 text-xs font-bold inline-block py-1 uppercase uppercase last:mr-0 mr-1 leading-tight rounded px-2">Leave a message</span>
                                    <h2 className="text-4xl font-bold mt-3 mb-1 text-blueGray-700">Tell us more about you</h2>
                                    <p className="mt-2 mb-4 text-xl leading-relaxed text-blueGray-400">There are a lot of people around you that make you feel invincible, but keep in mind, that they say it only to make you smaller. You've made a few bucks, you've found your way to the market.</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-4">
                            <div className="mx-auto px-4 relative w-full md:w-6/12">
                                <div className="relative" >
                                    <div className="relative flex flex-col items-center justify-center gap-4" >
                                        <div className="group/nui-file-headless relative " style={{ zIndex: '1' }}>
                                            <div className="relative h-24 w-24 mb-[-25px]  rounded-full bg-primary-200 p-3" >
                                                <img src={Avatar} className="h-24 w-24 max-h-full max-w-full object-cover shadow-sm dark:border-transparent rounded-full" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-lg p-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl z-2">
                                    <div className="px-4 py-5 flex-auto">
                                        <div className="">
                                            <form className="shadow-md" onSubmit={handleSubmit}>
                                                <div className="-space-y-px">
                                                    {fields.map((field) => (
                                                        <div key={field.name}>
                                                            <label
                                                                htmlFor={field.name}
                                                                className="block text-sm font-medium text-gray-700"
                                                            >
                                                                {field.labelText}
                                                            </label>
                                                            <div className="mt-1">
                                                                <Input
                                                                    handleChange={handleChange}
                                                                    value={data[field.name] || ""}
                                                                    labelFor={field.labelFor}
                                                                    id={field.id}
                                                                    name={field.name}
                                                                    type={field.type}
                                                                    placeholder={field.placeholder}
                                                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                                                    isReadonly={field.isReadonly}
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                {error &&
                                                    <div className="bg-red-100 border border-red-200 text-red-700 px-2 py-2 rounded relative" role="alert">
                                                        <span className="block sm:inline text-xs">{error}</span>
                                                    </div>
                                                }
                                                <FormAction text="Raised Ticket" />
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>);
}

export default CustomerSupport;