import { useState, useEffect, useContext, useReducer } from "react";
import { updateOrderfulfillment, orderTracking, updateDownloadLimit } from '../utils/api';
import { useParams } from 'react-router-dom';
import Modal from "../contexts/Modal";
import FormAction from "../contexts/FormAction";
import Input from "../contexts/Input";
import { checkRole } from '../auth';
import { TrackingData } from "../contexts/TrackingData";
import StatusButton from "../contexts/StatusButton";
import { ToastContainer, toast } from 'react-toastify';
import StatusPill from "../components/datalist/StatusPill";
import noImage from "../assets/noImage.png";

const TrackingFields = [
    {
        labelText: "Tracking Company",
        labelFor: "tracking_company",
        id: "tracking_company",
        name: "tracking_company",
        type: "text",
        placeholder: "Enter your company name"
    },
    {
        labelText: "Tracking Number",
        labelFor: "tracking_number",
        id: "tracking_number",
        name: "tracking_number",
        type: "text",
        isRequired: true,
        placeholder: "Enter tracking number"
    },
    {
        labelText: "Tracking Url",
        labelFor: "tracking_url",
        id: "tracking_url",
        name: "tracking_url",
        type: "text",
        isRequired: true,
        placeholder: "Enter tracking url"
    },

];

const orderDetailFields = [
    // {
    //     Header: "Items Id",
    //     accessor: "line_id",
    // },
    {
        Header: "Product Details",
        accessor: "line_items",
        Cell: ({ row }) => {
            const { original } = row;
            return <div className="flex space-x-3 rtl:space-x-reverse" >
                {/* <div className="h-14 w-14">
                    <img className="h-full w-full object-cover shadow-sm dark:border-transparent bg-gray-100 border rounded-full p-1" src={original?.image?.src ? original.image.src : noImage} alt="no image" />
                </div> */}
                <div className="items-center self-center">
                    <p className="block text-sm font-semibold text-gray-800 dark:text-white truncate">{original.title}</p>
                    <span className="block text-sm text-gray-600 dark:text-white/70">{original.variant_title}</span>
                    <span className="block text-xs text-gray-400 dark:text-white/70">File Name: {original.file_path}</span>
                </div>
            </div>;

        }
    },
    {
        Header: "Quantity",
        accessor: "quantity",
    },
    {
        Header: "Sku",
        accessor: "sku",
    },
    ...(checkRole() ? [
        {
            Header: "Price",
            accessor: "price",
        },
        {
            Header: "Total",
            accessor: "",
            Cell: ({ row }) => {
                const { original } = row;
                const total = original.price * original.quantity;
                return <div style={{ minWidth: "100px" }}>{total.toFixed()}</div>;
            }
        },
    ] : []),
    {
        Header: "Download limit",
        accessor: "download_limit"
    },
    {
        Header: "Map downloaded",
        accessor: "map_download_count"
    },
    {
        Header: "Remainig count",
        accessor: "",
        Cell: ({row}) => {
            const { original } = row;
            return <div style={{minWidth: ""}}>{original.download_limit - original.map_download_count}</div>
        }
    },
    {
        Header: "Update download count",
        accessor: "",
        Cell: ({ row }) => {
            const { orderId } = useParams();
            const { original } = row;
            const [modalOpen, setModalOpen] = useState(false);
            const [isExceeded, setIsExceeded] = useState(false);
            const [newLimit, setNewLimit] = useState(0);
            // const [newDays, setNewDays] = useState(0);
            const [error, setError] = useState(null);
            const [isValidForm, setIsValidForm] = useState(false);
            const [updatingStatus, setUpdatingStatus] = useState(false);

            useEffect(()=>{
                if(original.download_limit === original.map_download_count){
                    setIsExceeded(true);
                }
            }, []);

            const handleOpenModal = () => {
                setModalOpen(true);
            };


            const handleCloseModal = () => {
                setModalOpen(false);
            };

            const handleSubmit = async (event) => {
                event.preventDefault();
                setUpdatingStatus(true);
                setIsValidForm(false);
                try{
                    let response = await updateDownloadLimit({
                        lineItem_id: original.id,
                        limit: newLimit,
                        orderId
                    });
                    
                    if(response.data.success){
                        setTimeout(()=>{
                            setUpdatingStatus(false);
                            handleCloseModal(); 
                            window.location.reload();
                        }, 2000);
                    }
                    else{
                        setUpdatingStatus(false);
                        isValidForm(true);
                        setError(`Something went wrong!`);
                    }
                }
                catch(err){
                    setUpdatingStatus(false);
                    isValidForm(true);
                    setError(`Something went wrong!`);
                }
                console.log(event);
            }

            const handleChange = (event) => {
                let number = parseInt(event.target.value);
                
                if(number == NaN){
                    setIsValidForm(false);
                    setError(`Number is required`);
                }
                if(number === 0){
                    setIsValidForm(false);
                    setError(`${event.target.name.toUpperCase()} can't be zero`)
                }
                else if(number > 0){
                    setIsValidForm(true);
                    setError("");
                }
                else{
                    setIsValidForm(false);
                    setError(`${event.target.name.toUpperCase()} should be greater than zero`)
                }
                if(event.target.name === "limit"){
                    setNewLimit(event.target.value);
                }
            };


            // console.log(original, "ORIGINAL", newLimit, isValidForm);

            return(
                <div>
                    <button 
                        style={{ minWidth: "120px" }}
                        onClick={handleOpenModal}
                        className={`capitalize flex items-center justify-center px-4 py-2 border border-transparent text-xs font-medium rounded-lg text-white ${!isExceeded ? 'bg-primary-400' : 'bg-primary-600'} hover:bg-primary-700`}
                        disabled={!isExceeded}
                        >Renew limit</button>

                    <Modal
                        isOpen={modalOpen}
                        onClose={handleCloseModal}
                        heading={"Renew download limit"}
                    >
                        <form
                            className="bg-gray-50 space-y-6 rounded-md shadow-md border p-4 py-6 sticky top-0"
                            onSubmit={handleSubmit}
                        >
                            <div className="-space-y-px">
                                <div className="w-full">
                                    <p class="text-sm font-medium text-red-700 mb-1">
                                        *If you renew the limit then it will added with the current limit. 
                                    </p>
                                    <p class="text-sm font-medium text-red-700 mb-5 mr-2">
                                        For example: if you enter 2 to renew then the total limit becomes 3+2=5 times
                                    </p>
                                </div>
                                <div key="limit">
                                    <label
                                        htmlFor="limit"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Limit (in numbers)
                                    </label>
                                    <div className="mt-1 flex items-center">
                                        <Input
                                            handleChange={handleChange}
                                            value={newLimit}
                                            labelFor="limit"
                                            id="limit"
                                            name="limit"
                                            type="number"
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                        />
                                        {newLimit > 0 && <span class="p-2 text-sm">Current limit + {newLimit}</span>}
                                    </div>
                                </div>
                                {/* <div key="days">
                                        <label
                                            htmlFor="limit"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Extend expires date (number of days)
                                        </label>
                                    <div className="mt-1 flex items-center">
                                        <Input
                                            handleChange={handleChange}
                                            value={newDays}
                                            labelFor="days"
                                            id="days"
                                            name="days"
                                            type="number"
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                        /> 
                                        {newDays > 0 ? <span class="p-2 text-sm">Next {newDays} days</span> : <span class="p-2 text-sm">Days</span>}
                                    </div>
                                </div> */}
                            </div>
                            {error && (
                                <div
                                    className="bg-red-100 border border-red-200 text-red-700 px-2 py-2 rounded relative"
                                    role="alert"
                                >
                                    <span className="block sm:inline text-xs">{error}</span>
                                </div>
                            )}
                            <button disabled={!isValidForm} type="submit" className={`w-full capitalize flex items-center justify-center px-4 py-2 border border-transparent text-xs font-medium rounded-lg text-white ${isValidForm ? 'bg-primary' : 'bg-primary-400'}`}>
                                {updatingStatus ? <svg className="animate-spin h-6 w-6 mr-3 ml-3 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-1.647zm4-1.647l3 1.647C11.865 17.824 13 15.042 13 12H8a7.962 7.962 0 01-.729 3.291z"
                                    />
                                </svg> : "Update"}
                            </button>
                        </form>
                    </Modal>
                </div>
            )
        }
    }
    // {
    //     Header: "Status",
    //     accessor: "fulfillment_status",
    //     Cell: ({ row }) => {
    //         const { original } = row;
    //         const [data, setData] = useState([]);
    //         const { orderId } = useParams();
    //         const [statusState, setStatusState] = useState({
    //             isUpdating: false,
    //             updateMessage: "",
    //             isSuccess: false,
    //             isError: false,
    //         });
    //         const handleUpdateStatus = async () => {
    //             setStatusState((prevState) => ({ ...prevState, isUpdating: true }));

    //             // Perform the status update logic here, for example, call an API
    //             // Simulating an asynchronous API call with a setTimeout
    //             let queryString = `${orderId}/fulfill/${original.variant_id}`
    //             try {
    //                 // Simulating API call
    //                 const response = await updateOrderfulfillment(queryString, setData);
    //                 if (response.data.success === true) {
    //                     setTimeout(() => {
    //                         setStatusState((prevState) => ({
    //                             ...prevState,
    //                             isSuccess: true,
    //                             isUpdating: false,
    //                             updateMessage: "Fulfilled ",
    //                         }));
    //                     }, 2000);
    //                 }
    //                 else {
    //                     setStatusState((prevState) => ({
    //                         ...prevState,
    //                         isError: true,
    //                         isUpdating: false,
    //                         updateMessage: "Failed to update",
    //                     }));
    //                 }
    //             } catch (error) {
    //                 setStatusState((prevState) => ({
    //                     ...prevState,
    //                     isError: true,
    //                     isUpdating: false,
    //                     updateMessage: "Failed to update",
    //                 }));
    //             }
    //         };

    //         return (
    //             <div>
    //                 {original && original.fulfillment_status === null || original.fulfillment_status === 'null' ? (
    //                     <button
    //                         onClick={handleUpdateStatus}
    //                         style={{ minWidth: "120px" }}
    //                         className={`capitalize flex items-center justify-center px-4 py-2 border border-transparent text-xs font-medium rounded-lg text-white ${statusState.isSuccess ? "bg-green-500" : statusState.isError ? "bg-red-500" : "bg-primary-600 hover:bg-primary-700"
    //                             }`}
    //                         disabled={statusState.isUpdating || statusState.isSuccess === true}>
    //                         {statusState.isUpdating ? (
    //                             <svg className="animate-spin h-3 w-3 mr-3 text-white" viewBox="0 0 24 24">
    //                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    //                                 <path
    //                                     className="opacity-75"
    //                                     fill="currentColor"
    //                                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-1.647zm4-1.647l3 1.647C11.865 17.824 13 15.042 13 12H8a7.962 7.962 0 01-.729 3.291z"
    //                                 />
    //                             </svg>
    //                         ) : statusState.isSuccess ? (
    //                             <svg className="h-3 w-3 mr-2" viewBox="0 0 20 20" fill="currentColor">
    //                                 <path
    //                                     fillRule="evenodd"
    //                                     d="M17.707 5.293a1 1 0 010 1.414l-10 10a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L7 14.586l9.293-9.293a1 1 0 011.414 0z"
    //                                     clipRule="evenodd"
    //                                 />
    //                             </svg>
    //                         ) : statusState.isError ? (
    //                             <svg className="h-3 w-3 mr-2" viewBox="0 0 20 20" fill="currentColor">
    //                                 <path
    //                                     fillRule="evenodd"
    //                                     d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm0-9a1 1 0 00-1 1v3a1 1 0 102 0V8a1 1 0 00-1-1zm0 6a1 1 0 100 2 1 1 0 000-2z"
    //                                     clipRule="evenodd"
    //                                 />
    //                             </svg>
    //                         ) : null}

    //                         {statusState.isUpdating
    //                             ? "Updating.."
    //                             : statusState.isSuccess
    //                                 ? statusState.updateMessage
    //                                 : statusState.isError
    //                                     ? statusState.updateMessage
    //                                     : "Fulfillment"}
    //                     </button>
    //                 ) : (
    //                     <button style={{ minWidth: "120px" }} className="capitalize flex items-center justify-center px-4 py-2 border border-transparent text-xs font-medium rounded-lg text-white bg-primary-400 ">
    //                         {original.fulfillment_status ? original.fulfillment_status : 'Disable'}
    //                     </button>
    //                 )}
    //             </div>
    //         );
    //     }
    // },

];


export { orderDetailFields };