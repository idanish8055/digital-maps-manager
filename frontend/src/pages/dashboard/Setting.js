import React, { useState, useEffect } from "react";
import useAuth from '../../hooks/auth-hook';
import { settingFields } from "../../utils/settingFields";
import Input from "../../contexts/Input";
import FormAction from '../../contexts/FormAction';
import Breadcrumb from '../../contexts/Breadcrumb';
import { getStoreSetting, updateStoreSetting, updateEmailTemplate, getStoreSettingEmailTemplate } from '../../utils/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../contexts/Loader';
import EmailTemplateSnapshot from '../../../src/assets/email-template-snapshot.png';
import EmailTemplateWidlArtsSnapshot from '../../../src/assets/email-template-wildarts.png';
import { useRef } from "react";
import CGMDescription from "../../components/quill/CGMDescription";
import Modal from "../../contexts/Modal";
import { EmailTemplatePreview, EmailTemplateWildArtsPreview } from "../../utils/EmailTemplatePreview";
import { selectedProjectName } from "../../auth";

const Setting = () => {
    const Auth = useAuth();
    const { role, name } = useAuth();

    const [showLoader, setShowLoader] = useState(true);
    const requiredFields = ['shop_name', 'shopify_api_key', 'shopify_secret_key', 'shopify_access_token', 'location_id'];
    const [isFormValid, setIsFormValid] = useState(true);
    const [isEmailFormValid, setIsEmailFormValid] = useState(true);
    const [successMessage, setSuccessMessage] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState({
        shop_name: null,
        shopify_api_key: null,
        shopify_secret_key: null,
        shopify_access_token: null,
        location_id: null
    });

    const [templateData, setTemplateData] = useState({
        subject: null,
        message: null,
        important_note: null
    });
    const [modalOpen, setModalOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(true);

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        handleFetchData();
        handleFetchDataEmailTemplate();
    }, []);

    const fields = settingFields;
    const [settingField, setSettingField] = useState(Object.fromEntries(fields.map((field) => [field.name, ""])));
    const [emailSettingField, setEmailSettingField] = useState(Object.fromEntries([{name: "subject"},{name: "message"},{name: "important_note"}].map((field) => [field.name, ""])));
    const [emailTemplateHTML, setEmailTemplateHTML] = useState('');

    const handleChange = (e) => {
        setSettingField({ ...settingField, [e.target.name]: e.target.value });
        setData({ ...data, [e.target.name]: e.target.value });
        const formValues = Object.values(settingField);
        const isFormValid = requiredFields.every((field) => formValues.includes(field));
        setIsFormValid(isFormValid);
    };

    const handleChangeEmailTemplate = (e) => {
        setEmailSettingField({...emailSettingField, [e.target.name]: e.target.value});
        setTemplateData({ ...templateData, [e.target.name]: e.target.value });
        const formValues = Object.values(emailSettingField);
        const isEmailFormIsValid = ['subject', 'message'].every((field) => formValues.includes(field));
        setIsEmailFormValid(isEmailFormIsValid);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        for (const field of requiredFields) {
            if (!data[field]) {
                return setError(`${field.split('_').map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join(' ')} field is required.`);
            }
        }

        const shopNameFormat = /.*.myshopify.com$/;
        if (!data?.shop_name.match(shopNameFormat)) {
            return setError("Please enter a valid shop name.");
        }

        const accessTokenFormat = /^shpat_.*/;
        if (!data?.shopify_access_token.match(accessTokenFormat)) {
            return setError("Please enter a valid access token.");
        }
        setError('');
        updateData();
    }

    const handleSubmitTemplate = (event) => {
        event.preventDefault();
        updateEmailTemplateHandler();
    }

    const updateEmailTemplateHandler = async() => {
        try{
            let response = await updateEmailTemplate(templateData, localStorage.getItem("selectedProject"));

            if (response.status == 201) {
                toast.success("Email template Updated", {
                    position: toast.POSITION.TOP_CENTER
                });
            }
            else {
                toast.error(response.error, {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        }
        catch(err){
            toast.dismiss();
            toast.error("Error", {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }


    const updateData = async () => {
        try {
            const response = await updateStoreSetting(data, localStorage.getItem("selectedProject"));
            toast.dismiss();
            if (response.status == 201) {
                toast.success("Settings Updated", {
                    position: toast.POSITION.TOP_CENTER
                });
            }
            else {
                toast.error(response.error, {
                    position: toast.POSITION.TOP_CENTER
                });
            }
            setIsSubmitted(false);
        }
        catch (error) {
            toast.dismiss();
            toast.error("Error", {
                position: toast.POSITION.TOP_CENTER
            });
            setIsSubmitted(true);
        }
        finally{
            setIsSubmitted(true);
        }

    };

    const handleFetchData = async () => {
        const response = await getStoreSetting(localStorage.getItem("selectedProject"));

        setData({
            shop_name: response.data?.[0]?.shop_name,
            shopify_api_key: response.data?.[0]?.shopify_api_key,
            shopify_secret_key: response.data?.[0]?.shopify_secret_key,
            shopify_access_token: response.data?.[0]?.shopify_access_token,
            location_id: response.data?.[0]?.location_id,
        });
        setError(response.error);
    };

    const handleFetchDataEmailTemplate = async () => {
        const response = await getStoreSettingEmailTemplate(localStorage.getItem("selectedProject"));
        if(response.data){
            setTemplateData({
                message: response.data.message ? response.data.message : "",
                subject: response.data.subject ? response.data.subject : "",
                important_note: response.data.important_note ? response.data.important_note : ""
            });
        }
        
        setError(response.error);
    };

    const onChangeImpNotes = (value) => {
        setTemplateData({...templateData, important_note: value });
        setEmailSettingField({...emailSettingField, important_note: value});
        const formValues = Object.values(emailSettingField);
        const isEmailFormIsValid = ['subject', 'message', 'important_note'].every((field) => formValues.includes(field));
        
        setIsEmailFormValid(isEmailFormIsValid);
    }

    useEffect(()=>{
        // console.log(JSON.stringify(templateData), 'templateData');
        // if(templateData && templateData.message !== null){
        //     let emailTemplate = emailTemplatePreview(templateData);
        //     const parser = new DOMParser();
        //     const emailTemplateHtml = parser.parseFromString(emailTemplate, 'text/html');
        //     setEmailTemplateHTML(emailTemplate);
        //     console.log(emailTemplateHtml, 'emailTemplate');
        // }        
    }, [templateData])

    return (
        <>
            <div className='border-b pb-6'>
                <div className="flex flex-col items-start justify-between pb-2 space-y-4  lg:items-center lg:space-y-0 lg:flex-row">
                    <h1 className="text-2xl font-semibold whitespace-nowrap">Settings</h1>
                    <div className="space-y-6 md:space-x-2 md:space-y-0">
                        <span className="inline-flex items-center justify-center px-4 py-1 space-x-1">
                            <strong>Role: </strong>{role}
                        </span>
                    </div>
                </div>
                <Breadcrumb />
            </div>
            {
                showLoader ?
                    (<Loader setShowLoader={setShowLoader} />) :
                    (<>
                        <div className="grid grid-cols-12 gap-5 pb-6">
                            <div className="col-span-12 lg:col-span-6 mt-8 space-y-6">
                                <div className="max-w-md">
                                    <h2 className="text-lg font-medium mb-4">How to get your Shopify API credentials</h2>
                                    <ol className="list-decimal pl-6 mb-6 ">
                                        <li className="mb-2 text-gray-800">Log in to your Shopify admin panel at <a href="#" className="text-blue-500 hover:underline">https://your-store-name.myshopify.com/admin</a>.</li>
                                        <li className="mb-2 text-gray-800">Click on "Apps" from the left-hand navigation menu.</li>
                                        <li className="mb-2 text-gray-800">Click on "Manage private apps" at the bottom of the page.</li>
                                        <li className="mb-2 text-gray-800">Click on "Create a new private app" button on the top right corner of the page.</li>
                                        <li className="mb-2 text-gray-800">Enter a name for your private app in the "App name" field.</li>
                                        <li className="mb-2 text-gray-800">Enter your email address in the "Emergency developer email" field.</li>
                                        <li className="mb-2 text-gray-800">In the "Admin API" section, enable the areas of your store that you want the app to access. This will determine the permissions of the API credentials.</li>
                                        <li className="mb-2 text-gray-800">In the "Admin API" section, click on "Generate API credentials".</li>
                                        <li className="mb-2 text-gray-800">Your api_key and api_password will be generated. Make sure to save them in a secure location.</li>
                                        <li className="mb-2 text-gray-800">Scroll down to the "Authentication" section to view your api_secret key.</li>
                                        <li className="mb-2 text-gray-800">The store_name is the first part of your store's URL, before .myshopify.com. For example, if your store's URL is <code>https://example.myshopify.com</code>, your store_name is <code>example</code>.</li>
                                    </ol>
                                    <p className="text-sm text-gray-600">Note: Keep in mind that the api_key, api_password, and api_secret are sensitive credentials and should be kept confidential. Do not share them with anyone who doesn't need access to them, and make sure to store them securely.</p>
                                </div>

                            </div>
                            <div className="col-span-12 lg:col-span-6">
                                <form className="bg-lightAlmond mt-8 space-y-6 rounded-md shadow-md border p-4 py-6 sticky top-0" onSubmit={handleSubmit}>
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
                                                        className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
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
                                    <FormAction text="Save" disabled={isFormValid} />
                                </form>
                            </div>
                        </div>
                        <div class="border-b pb-6"></div>
                        <div className="grid grid-cols-12 gap-5 pb-6">
                            <div className="col-span-12 lg:col-span-6 mt-8 space-y-6">
                                <div>
                                    <h2 className="text-lg font-medium mb-4">Customize your email template</h2>
                                    <ol className="list-decimal pl-6 mb-6 ">
                                        <li className="mb-2 text-gray-800">You can customized your email template with these settings.</li>
                                        <li className="mb-2 text-gray-800">You are allowed to change the text and button colors of the email template.</li>
                                        <li className="mb-2 text-gray-800">After making the changes you can check the preview and then save the changes.</li>
                                    </ol>
                                    <div className="shadow-md p-4 w-50 rounded-md" style={{width: "100%", maxWidth: "600px"}}>
                                        <img src={localStorage.getItem("selectedProject") === "maps" ? EmailTemplateSnapshot : EmailTemplateWidlArtsSnapshot} alt="template-snapshot" className={`inline-block mt-1 h-auto transition-all ease-in-out`}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 lg:col-span-6">
                                <form onSubmit={handleSubmitTemplate} className="bg-lightAlmond mt-8 space-y-6 rounded-md shadow-md border p-4 py-6 sticky top-0">
                                    <div className="-space-y-px">
                                        <div>
                                            <label
                                                htmlFor="subject"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Subject
                                            </label>
                                            <div className="mt-1">
                                                <Input
                                                    handleChange={handleChangeEmailTemplate}
                                                    value={templateData.subject || ""}
                                                    labelFor="subject"
                                                    id="subject"
                                                    name="subject"
                                                    type="textarea"
                                                    className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="message"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Message
                                            </label>
                                            <div className="mt-1">
                                                <Input
                                                    handleChange={handleChangeEmailTemplate}
                                                    value={templateData.message || ""}
                                                    labelFor="message"
                                                    id="message"
                                                    name="message"
                                                    type="textarea"
                                                    className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="priceType"
                                                className="block text-sm font-medium text-gray-700 mb-6"
                                            >
                                                Important note
                                            </label>
                                            {/* <div className="mt-1">
                                                <Input
                                                    value={"HELLO THERE!" || ""}
                                                    labelFor="content"
                                                    id="content"
                                                    name="content"
                                                    type="textarea"
                                                    className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div> */}
                                        </div>
                                        <CGMDescription value={templateData.important_note} onChange={onChangeImpNotes} readOnly={false} />
                                    </div>
                                    <div className="flex gap-4">
                                        <button type="button" onClick={()=>{
                                            setModalOpen(!modalOpen);
                                        }} className="mt-5 text-white bg-primary-600 hover:bg-primary-700 py-2 px-4 border border-transparent text-sm font-medium rounded-md">Preview</button>
                                        <button
                                            type={'Button'}
                                            className={`group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md ${isEmailFormValid ? 'text-gray-400 bg-primary-400 cursor-not-allowed' : 'text-white bg-primary-600 hover:bg-primary-700'} mt-5`} 
                                            onClick={handleSubmitTemplate}
                                            disabled={isEmailFormValid}
                                            data-action={'submit'}
                                        >
                                            {isSubmitted === false ? <svg className="animate-spin h-6 w-6 mr-3 ml-3 text-white" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-1.647zm4-1.647l3 1.647C11.865 17.824 13 15.042 13 12H8a7.962 7.962 0 01-.729 3.291z"
                                                />
                                            </svg> : "Save"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        
                        <Modal isOpen={modalOpen} onClose={handleCloseModal} heading={"Email template preview"}>
                            <div className="">
                            {/* {new DOMParser().parseFromString(emailTemplateHTML, 'text/html')} */}
                                {selectedProjectName === "maps" ? <EmailTemplatePreview templateData={templateData}/> : <EmailTemplateWildArtsPreview templateData={templateData}/>}
                                {/* <iframe src="http://127.0.0.1:5500/index.html" width="600" height="630"></iframe> */}
                            </div>
                        </Modal>
                        <ToastContainer />
                    </>)
            }
        </>
    );


}



export default Setting;