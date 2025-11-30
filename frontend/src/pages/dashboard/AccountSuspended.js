import React from "react";
import Logo from '../../assets/RVOnlinefavicon.png';
import { Link } from 'react-router-dom';
import { USER_INFO } from "../../utils/config";
import MapsLogo from '../../assets/maps-logo.png';

const AccountSuspended = () => {
    return (
        <>
            <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow -ml-5">
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between" >
                    <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start" >
                        <a href="#" className="flex items-center space-x-2">
                            <img className="h-14 w-25" src={MapsLogo} alt="logo" />
                            {/* <p className="text-xl font-semibold uppercase text-slate-700 dark:text-navy-100">
                            {MapsLogo}
                            </p> */}
                        </a>
                    </div>
                    <div className="lg:flex flex-grow items-center hidden" >
                        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                            <li className="flex items-center">
                                <Link to="/" className="elative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                                    Back to Homepage
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <section className="items-center max-w-screen-xl m-auto">
                <div className="mt-20 p-4 flex m-auto max-w-screen-xl bg-indigo-950 rounded gap-4 ">
                    <div className="left-icon bg-red-800 text-white font-bold text-2xl rounded-full w-12 h-12 flex items-center justify-center">
                        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                            <path d="M8 6.586L14.293.293a1 1 0 011.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707A1 1 0 011.707.293L8 6.586z" fill="#FFF" fill-rule="evenodd"></path>
                        </svg>
                    </div>
                    <div className="statement-wrapper">
                        <p className="bottom-content-header text-2xl text-red-500 font-semibold">Account under review</p>
                        <p className="bottom-sub-text text-gray-50 text-1xl">Your account is under review by our IT team.</p>
                    </div>
                </div>
                <div className="flex flex-wrap my-40 py-15">
                    <div className="container mx-auto items-center flex flex-wrap">
                        <div className="w-full flex flex-wrap items-center" >
                            <div className="w-1/2 md:w-1/2 lg:w-1/2 px-12 md:px-4 mr-auto ml-auto" >
                                <h2 className="font-semibold text-6xl text-primary-600"> DON’T WORRY </h2>
                                <p className="mt-4 text-lg leading-relaxed text-blueGray-500">Your account will be activate within 24 hours.</p>
                                <p className="mt-4" >They will review your account, make sure your forms adhere to our terms of use, and then activate your account.</p>
                                <div className="mt-12" >
                                    <a href={`mailto:${USER_INFO.EMAIL}`} className="justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"> Contact Support Team </a>
                                </div>
                            </div>
                            <div className="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="296" version="1">
                                    <defs>
                                        <linearGradient id="a" x1="48%" x2="51%" y1="95%" y2="53%">
                                            <stop offset="0%" stop-color="#9EA7DB"></stop>
                                            <stop offset="100%" stop-color="#7986CB"></stop>
                                        </linearGradient>
                                    </defs>
                                    <g fill="none" fill-rule="evenodd"><text fill="#512DA8" font-family="Helvetica" font-size="48" transform="translate(-728 -312)">
                                        <tspan x="256" y="359">DON’T PANIC.</tspan>
                                    </text><text fill="#31416C" font-family="Helvetica" font-size="24" transform="translate(-728 -312)">
                                            <tspan x="256" y="399">We will help you to reactivate your account.</tspan>
                                        </text>
                                        <path fill="#E8EAF6" d="M145 269h10v-89h-10z"></path>
                                        <path fill="#C5CAE9" d="M113 269c0 5 16 10 36 10s36-5 36-10c0-6-16-10-36-10s-36 4-36 10z"></path>
                                        <path fill="#E8EAF6" d="M116 266c0 4 15 8 32 8 18 0 32-4 32-8s-14-8-32-8c-17 0-32 4-32 8zm33-91c-20 0-38-2-38 3 0 6 12 17 38 17s34-17 34-23l-2-1c-5 0-17 4-32 4z"></path>
                                        <path fill="#C5CAE9" d="M155 60c-28 44-43 73-47 86-2 10-19 6-34 3-15-4-29-8-28 2 3 20 76 44 115 37 40-8 42-83 37-111-2-13-10-20-24-20l-19 3z"></path>
                                        <path fill="#9FA8DA" d="M171 65l-8 2-16 48-63 43c22 9 46 13 70 13 34 0 30-87 27-98-1-5-4-8-10-8z"></path>
                                        <path fill="#0D1458" d="M108 264l-1 1c-3-2-5-1-8 4v10c-1 5-2 7-1 11 2 7 12 8 15 0 2-4 0-11-1-13l-1-7-2-5-1-2v1z"></path>
                                        <path fill="#AF8066" d="M87 145c-5 3-4 17-1 31 2 9 8 39 16 91 3 1 5 0 7-1 7-50 7-82 0-96h34l6-23-25-4-20-1c-9 0-14 1-17 3z"></path>
                                        <path fill="#3949AB" d="M83 164l14 71c2-2 5-2 8-1 4 0 8 1 9-11v-26c0-16-4-24-4-26h12c9 0 28 0 35-3 5-2-1-5-18-8l-30-8-17-6-9 18z"></path>
                                        <path fill="#303F9F" d="M83 164l2 12c6-12 12-17 17-15 9 5 19 8 31 10l12-1 2-8-8-2-30-8-17-6-9 18z"></path>
                                        <path fill="#0D1458" d="M25 220c-3 3-8 13-15 16-6 3-15 9-6 12s18-6 21-8c2-2 9 0 14-4 4-3 4-7 1-12-5-3-9-5-13-5l-2 1z"></path>
                                        <path fill="#AF8066" d="M142 126H84c-4 0-8 3-11 8l-48 86v1c0 1 0 3 2 3 10 3 14 3 12 1-2-3-2-6-1-7 40-30 42-50 46-61 3-8 8-10 14-7 45 29 70 27 75-5l-3-2-3-5c-6-8-14-12-24-12h-1z"></path>
                                        <path fill="#3F51B5" d="M77 129c-7 6-19 27-37 61 3 5 9 9 20 10 13-13 20-23 23-30 4-10 6-19 13-18 6 2 20 14 45 18 17 3 27-3 31-18-19-18-31-26-37-25-3 1-10 0-19-1l-20-1c-8 0-15 1-19 4z"></path>
                                        <path fill="#5C6BC0" d="M148 143l-3 2 3 7 4-2 1-2-4-5v-1l-1 1z"></path>
                                        <path fill="#3949AB" d="M151 155c-3-3-5-8-6-13l-1-1s0 13 7 14z"></path>
                                        <path fill="#AF8066" d="M41 43v1c1 2 3 3 7 4 6 2 8 0 10 4 3 4 16 31 28 34 12 4 34-7 39-7 3 0 8-6 14-18h-18c-12 7-21 11-27 13-10 2-9-3-33-30-1-1-3-2-7 0-2 1-6 1-11-2h-1l-1 1z"></path>
                                        <path fill="#7986CB" d="M118 108v-1c-2-7-4-11-4-16 0-2 0-5 2-9-8 3-18 8-20 7-3-2-10-17-5-17 4 0 16-6 35-17v1c3-3 6-5 8-5 5-2 8-2 11-2s6 0 9 2c12 3 14-4 18 23 5 33 5 72 0 79-5 6-14-16-56-25 2-1 2-8 2-20z"></path>
                                        <path fill="#AF8066" d="M163 93c-7-3-10-2-11 2-2 5-4 24-5 26s-36 2-42 3l-9-1c-4-1-9-2-11 0-5 4-4 9 0 6 2-2 6-1 9 2 4 3 8 3 13 0 4-2 14 1 24 3 11 3 21 5 24 2 5-5 13-39 13-43l-1-2-4 2zm-22-54c2 2 1 8-2 18-9 1-16 19 0 20 15 1 16-18 17-22s-1-2-2-4V36c-11 1-16 2-13 3z"></path>
                                        <path fill="url(#a)" d="M156 78c-8 22-11 35-9 37 1 3 7 7 15 11 7-19 10-34 8-44 0-6-2-9-5-9l-9 5z"></path>
                                        <path fill="#835740" d="M140 50v4c10 0 15-4 14-11l-14 7z"></path>
                                        <path fill="#AF8067" d="M148 7l-3 1c-15 2-10 9-13 15-2 3-3 8-3 13 1 11 5 17 13 16 12-3 19-8 21-16 3 0 6-3 5-8-1-2-3-2-7 0 0-14-4-21-13-21z"></path>
                                        <path fill="#986A51" d="M129 34l5-1c2-2 0-4-2-6l-1-1-2 8z"></path>
                                        <path fill="#C94045" d="M137 44c2 1 4 0 7-2l-10-2 3 4z"></path>
                                        <path fill="#262122" d="M136 26l1 2 1-1v-2l-2 1zm9 4v2l2-2v-2l-2 2z"></path>
                                        <path fill="#986A51" d="M145 37c-1 2 1 5 4 5 3 1 5 0 6-2s-1-4-4-5h-2l-4 2z"></path>
                                        <path fill="#0D1458" d="M151 1c-11 0-23 5-24 20 0 7-6 8-2 16 2 8-6 7-6 17v6c6-4 13-6 20-4l2-4c-3 0-5-1-7-3-4-4-6-12-4-20l4-8c6 1 11 0 14-1 5-2 6-3 6 1 0 5 3 7 7 8 4-2 6-1 6 2 0 4-2 5-6 5-1 3-2 7-6 11-3 2-3 12 1 13 5 2-5 23 7 23 6 0 9 6 12 17 13-10 1-11 9-21 11-14-7-24-5-28 6-12-5-9-3-22 1-9-1-15-6-18 0-6-9-10-19-10z"></path>
                                        <path fill="#5C6BC0" d="M37 195c7 7 14 10 20 10l3-3v-2c-16-3-18-9-20-11h-1l-2 6zm58 35c-1 1 0 3 1 6 12 2 16-3 17-4v-4c-7 4-13 4-18 2z"></path>
                                        <path fill="#7986CB" d="M154 65v18l16 12 5 5c1-19-6-33-21-41v6z"></path>
                                        <path fill="#5C6BC0" d="M162 126l3 2 5-26c1-8 2-12 1-14l-9 38z"></path>
                                        <path fill="#FFF" d="M135 96l-2 16v1l9 3h2l2-16-1-2-9-3-1 1z"></path>
                                        <path fill="#ABBFEB" d="M136 103c-1 2 0 4 2 5 2 0 4-1 5-3 0-2-1-4-3-5h-1c-1 0-3 1-3 3z"></path>
                                        <path fill="#AF8066" d="M139 103l-2 2v2l1 1h1v-2h2l-2-3z"></path>
                                        <path fill="#2C1CCB" d="M139 102l-2 1-1 2 1 2 1-1v-2l2-1v2l-1 3 3-1v-4l-1-1h-2z"></path>
                                        <path fill="#ABBFEB" d="M135 109v1l6 1h1l-7-2zm2-15v3c-1 1 0 1 1 1l1-1 1-3-1-1-2 1z"></path>
                                        <path fill="#A2B1D0" d="M145 1c13 5 18 14 17 28-2 13-1 13 4 1l1-2c1-15-3-25-14-27l-4-1-4 1z"></path>
                                        <path fill="#E1ECFF" d="M145 45c6 1 11 0 14-4v-8c1-3 3-6 6-6h1c2 1 3 5 2 9s-5 7-7 6h-1c-3 4-9 6-15 5h-3a2 2 0 112-3l1 1z"></path>
                                        <path stroke="#5C6BC0" stroke-dasharray="4 4" d="M137 152c-5 2-14 1-26-4-17-7-27-14-32 2-4 15-11 29-28 44"></path>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <div className="p-4 flex m-auto max-w-screen-xl mt-8 bg-primary-600 rounded gap-4 mb-4">
                <div className="left-icon bg-white text-gray font-bold text-2xl rounded-full w-12 h-12 flex items-center justify-center">
                    ?
                </div>
                <div className="statement-wrapper">
                    <p className="bottom-content-header text-lg text-white font-semibold">Why do we reviewing your account?</p>
                    <p className="bottom-sub-text text-white mt-2">It is verification process in which we are reviewing the vendor's details to make sure all required details are accurate and then we will activate the account.</p>
                    {/* <p className="terms text-gray-600 mt-4 text-xs">
                        Please refer to our <a href="#" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Terms of Use</a>
                    </p> */}
                </div>
            </div>

        </>
    );
}

export default AccountSuspended;