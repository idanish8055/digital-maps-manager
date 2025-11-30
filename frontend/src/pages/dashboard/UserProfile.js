import React, { useState, useEffect } from "react";
import useAuth from '../../hooks/auth-hook';
import Avatar from '../../assets/avatar.png';
import Input from '../../contexts/Input';
import { userProfileFields } from "../../utils/userProfile";
import Loader from '../../contexts/Loader';

const UserProfile = () => {
    const [showLoader, setShowLoader] = useState(true);
    const { name, email, role } = useAuth();
    const [data, setData] = useState({
        username: null,
        email: null,
        role: null,
    });

    useEffect(() => {
        setData({
            username: name,
            email: email,
            role: role,
        });
    }, [name, email, role]);

    const fields = userProfileFields;
    let fieldsState = {};
    fields.forEach((field) => (fieldsState[field.id] = data[field.id]));

    const handleChange = (e) => {
        // setData({ ...data, [e.target.name]: e.target.value });
    };


    return (
        <div className="min-h-screen overflow-hidden">
            {showLoader ?
                (<Loader setShowLoader={setShowLoader} />) :
                (<>            <div className="grid gap-8 sm:grid-cols-12">
                    <div className="col-span-12 sm:col-span-4">
                        <div className="flex w-full items-center gap-2">
                            <div className="relative inline-flex shrink-0 items-center justify-center outline-none h-12 w-12 rounded-full">
                                <div className="rounded-full flex h-full w-full items-center justify-center overflow-hidden text-center transition-all duration-300">
                                    <img src={Avatar} className="h-12 w-12 max-h-full max-w-full object-cover shadow-sm dark:border-transparent" />
                                </div >
                                <div className="h-5 w-5 bottom-0 end-0 dark:bg-muted-800 absolute z-10 block overflow-hidden rounded-full bg-white">
                                    <svg className="fill-primary w-4 h-4 relative h-full w-full scale-90 rounded-full object-cover" xmlns="http://www.w3.org/2000/svg" width="100" height="100" enable-background="new 0 0 100 100" viewBox="0 0 100 100"><path className="fill-blue-500" d="M88.057,45.286l-5.456-5.455c-1.295-1.295-2.356-3.854-2.356-5.689v-7.715c0-3.67-2.998-6.668-6.667-6.67h-7.718  c-1.833,0-4.395-1.063-5.69-2.357l-5.455-5.455c-2.592-2.592-6.836-2.592-9.428,0l-5.455,5.459c-1.296,1.295-3.861,2.355-5.69,2.355  h-7.715c-3.665,0-6.667,2.998-6.667,6.668v7.715c0,1.828-1.061,4.395-2.356,5.689l-5.456,5.455c-2.594,2.592-2.594,6.836,0,9.432  l5.456,5.455c1.296,1.295,2.356,3.861,2.356,5.689v7.715c0,3.666,3.002,6.668,6.667,6.668h7.715c1.833,0,4.395,1.061,5.69,2.355  l5.455,5.457c2.592,2.59,6.836,2.59,9.428,0l5.455-5.457c1.296-1.295,3.857-2.355,5.69-2.355h7.718c3.669,0,6.667-3.002,6.667-6.668  v-7.715c0-1.836,1.062-4.395,2.356-5.689l5.456-5.455C90.647,52.122,90.647,47.878,88.057,45.286z M44.709,65.001L30,50.29  l4.714-4.713l9.996,9.996l20.577-20.572L70,39.714L44.709,65.001z"></path></svg>
                                </div>
                            </div >
                            <div className="">
                                <p className="font-heading text-base font-medium leading-none" tag="h2">
                                    {name}
                                </p>
                                <p className="font-alt text-xs font-normal leading-normal leading-normal text-muted-400">
                                    {role}
                                </p>
                            </div>
                        </div >
                        <div className="mt-8 max-w-[240px]">
                            <ul className="space-y-1 font-sans text-sm">
                                <li>
                                    <a href="#" className="bg-primary-900 text-white hover:bg-primary-600  flex items-center gap-2 rounded-lg p-3  duration-300" aria-current="page">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="icon h-4 w-4" style={{ width: '1em', height: '1em' }} viewBox="0 0 256 256">
                                            <g fill="currentColor">
                                                <path d="M192 96a64 64 0 1 1-64-64a64 64 0 0 1 64 64Z" opacity=".2"></path>
                                                <path d="M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8ZM72 96a56 56 0 1 1 56 56a56.06 56.06 0 0 1-56-56Z"></path>
                                            </g>
                                        </svg>
                                        <span>General</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div >

                    <div className="col-span-12 sm:col-span-8">
                        <form className="bg-lightAlmond mt-8 space-y-6 rounded-md shadow-md border p-4 py-6 sticky top-0">
                            <div className="-space-y-px">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-heading text-sm font-medium leading-normal leading-normal uppercase tracking-wider" tag="h2"> General info </p>
                                        <p className="font-sans text-xs font-normal leading-normal leading-normal text-muted-400">Check your account's general information </p>
                                    </div>
                                </div>
                                <div className="mx-auto max-w-lg space-y-12 py-8">
                                    {/* <div className="relative">
                                        <div className="mb-6">
                                            <p className="font-heading text-base font-medium leading-none" tag="h3">Profile picture</p>
                                            <p className="font-sans text-xs font-normal leading-normal leading-normal text-muted-400">This is how others will recognize you</p>
                                        </div>
                                        <div className="relative flex flex-col items-center justify-center gap-4">
                                            <div className="group/nui-file-headless relative">
                                                <div className="relative h-24 w-24">
                                                    <img src={Avatar} alt="Upload preview" className="bg-muted-200 dark:bg-muted-700/60 h-24 w-24 rounded-full object-cover object-center" />
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="relative">
                                        <div className="mb-6">
                                            <p className="font-heading text-base font-medium leading-none" tag="h3">Profile Info</p>
                                            {/* <p className="font-sans text-xs font-normal leading-normal leading-normal text-muted-400">Others diserve to know you more</p> */}
                                        </div>
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
                                                        key={field.name}
                                                        handleChange={handleChange}
                                                        value={data[field.id] || ""}
                                                        labelText={field.labelText || field.placeholder}
                                                        labelFor={field.labelFor || field.placeholder}
                                                        id={field.id}
                                                        name={field.name}
                                                        type={field.type}
                                                        placeholder={field.placeholder}
                                                        options={field.options}
                                                        pattern={field.pattern}
                                                        inputMode={field.inputMode}
                                                        isReadonly={field.isReadonly}
                                                        customclassName=""
                                                    />
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div >

                </>)
            }
        </div >

    );

}

export default UserProfile;