import { useState, useEffect, useContext, useReducer } from "react";
import { updateOrderfulfillment, orderTracking } from '../utils/api';
import { useParams } from 'react-router-dom';
import Modal from "../contexts/Modal";
import FormAction from "../contexts/FormAction";
import Input from "../contexts/Input";
import { checkRole } from '../auth';
import { TrackingData } from "../contexts/TrackingData";
import StatusButton from "../contexts/StatusButton";

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
                <div className="h-14 w-14">
                    <img className="h-full w-full object-cover shadow-sm dark:border-transparent bg-gray-100 border rounded-full p-1" src={original.image.src} alt="no image" />
                </div>
                <div className="items-center self-center">
                    <p className="block text-sm font-semibold text-gray-800 dark:text-white truncate">{original.title}</p>
                    <span className="block text-sm text-gray-600 dark:text-white/70">{original.variant_title}</span>
                </div>
            </div>;

        }
    },
    {
        Header: "Vendor",
        accessor: "vendor",
        Cell: ({ value }) => <div className="mr-2 inline-block px-2 py-1 text-white bg-gray-400 rounded-full">
            {value}</div>
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
                return <div style={{ minWidth: "100px" }}>{total}</div>;
            }
        },
    ] : []),
    {
        Header: "Status",
        accessor: "fulfillment_status",
        Cell: ({ row }) => {
            const { original } = row;
            const [data, setData] = useState([]);
            const { orderId } = useParams();
            const [statusState, setStatusState] = useState({
                isUpdating: false,
                updateMessage: "",
                isSuccess: false,
                isError: false,
            });
            const handleUpdateStatus = async () => {
                setStatusState((prevState) => ({ ...prevState, isUpdating: true }));

                // Perform the status update logic here, for example, call an API
                // Simulating an asynchronous API call with a setTimeout
                let queryString = `${orderId}/fulfill/${original.variant_id}`
                try {
                    // Simulating API call
                    const response = await updateOrderfulfillment(queryString, setData);
                    if (response.data.success === true) {
                        setTimeout(() => {
                            setStatusState((prevState) => ({
                                ...prevState,
                                isSuccess: true,
                                isUpdating: false,
                                updateMessage: "Fulfilled ",
                            }));
                        }, 2000);
                    }
                    else {
                        setStatusState((prevState) => ({
                            ...prevState,
                            isError: true,
                            isUpdating: false,
                            updateMessage: "Failed to update",
                        }));
                    }
                } catch (error) {
                    setStatusState((prevState) => ({
                        ...prevState,
                        isError: true,
                        isUpdating: false,
                        updateMessage: "Failed to update",
                    }));
                }
            };
            
            return (
                <div>
                    {original && original.fulfillment_status === null || original.fulfillment_status === 'null' ? (
                        <button
                            onClick={handleUpdateStatus}
                            style={{ minWidth: "120px" }}
                            className={`capitalize flex items-center justify-center px-4 py-2 border border-transparent text-xs font-medium rounded-lg text-white ${statusState.isSuccess ? "bg-green-500" : statusState.isError ? "bg-red-500" : "bg-purple-600 hover:bg-purple-700"
                                }`}
                            disabled={statusState.isUpdating || statusState.isSuccess === true}>
                            {statusState.isUpdating ? (
                                <svg className="animate-spin h-3 w-3 mr-3 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-1.647zm4-1.647l3 1.647C11.865 17.824 13 15.042 13 12H8a7.962 7.962 0 01-.729 3.291z"
                                    />
                                </svg>
                            ) : statusState.isSuccess ? (
                                <svg className="h-3 w-3 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        d="M17.707 5.293a1 1 0 010 1.414l-10 10a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L7 14.586l9.293-9.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ) : statusState.isError ? (
                                <svg className="h-3 w-3 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm0-9a1 1 0 00-1 1v3a1 1 0 102 0V8a1 1 0 00-1-1zm0 6a1 1 0 100 2 1 1 0 000-2z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ) : null}

                            {statusState.isUpdating
                                ? "Updating.."
                                : statusState.isSuccess
                                    ? statusState.updateMessage
                                    : statusState.isError
                                        ? statusState.updateMessage
                                        : "Fulfillment"}
                        </button>
                    ) : (
                        <button style={{ minWidth: "120px" }} className="capitalize flex items-center justify-center px-4 py-2 border border-transparent text-xs font-medium rounded-lg text-white bg-purple-400 ">
                            {original.fulfillment_status ? original.fulfillment_status : 'Disable'}
                        </button>
                    )}
                </div>
            );
        }
    },
    {
        Header: "Tracking",
        accessor: "",
        Cell: ({ row }) => {
            const { orderId } = useParams();
            const { original } = row;
            const [modalOpen, setModalOpen] = useState(false);
            const [isFormValid, setIsFormValid] = useState(true);
            const [error, setError] = useState(null);
            const requiredFields = ["tracking_url", "tracking_number"];
            const rawData = useContext(TrackingData);
            const [fulfillmentData, setfulfillmentData] = useState("");
            const initialState = {
                isUpdating: false,
                isSuccess: false,
                isError: false,
                updateMessage: "",
            };

            const reducer = (state, action) => {
                switch (action.type) {
                    case "UPDATE_START":
                        return {
                            ...state,
                            isUpdating: true,
                            isSuccess: false,
                            isError: false,
                        };
                    case "UPDATE_SUCCESS":
                        return {
                            ...state,
                            isUpdating: false,
                            isSuccess: true,
                            isError: false,
                            updateMessage: "Details Updated",
                        };
                    case "UPDATE_ERROR":
                        return {
                            ...state,
                            isUpdating: false,
                            isSuccess: false,
                            isError: true,
                            updateMessage: "Failed to update",
                        };
                    case "RESET_STATUS":
                        return initialState;
                    default:
                        return state;
                }
            };

            const [statusState, dispatch] = useReducer(reducer, initialState);

            const [data, setData] = useState({
                tracking_url: null,
                tracking_number: null,
                tracking_company: null,
            });

            const fields = TrackingFields;
            const [trackingField, setTrackingField] = useState(
                Object.fromEntries(fields.map((field) => [field.name, ""]))
            );

            useEffect(() => {
                if (rawData.fulfillments.length > 0) {
                    setfulfillmentData(
                        rawData.fulfillments.filter((data) => {
                            return data.line_items.some(
                                (lineItem) => lineItem.id === original.id
                            );
                        })
                    );
                }
            }, [0]);

            const handleOpenModal = () => {
                console.log(orderId, original.variant_id);
                setData({
                    ...data,
                    tracking_url: fulfillmentData[0]?.tracking_url,
                    tracking_number: fulfillmentData[0]?.tracking_number,
                    tracking_company: fulfillmentData[0]?.tracking_company,
                });
                setModalOpen(true);
            };

            const handleCloseModal = () => {
                dispatch({ type: "RESET_STATUS" });
                setModalOpen(false);
            };

            const handleChange = (e) => {
                setTrackingField({ ...trackingField, [e.target.name]: e.target.value });
                setData({ ...data, [e.target.name]: e.target.value });
                //button enable
                const formValues = Object.values(trackingField);
                const isFormValid = requiredFields.every((field) =>
                    formValues.includes(field)
                );
                setIsFormValid(isFormValid);
            };

            const updateTrackingDetails = async () => {
                try {
                    // Simulating API call
                    let queryString = `${orderId}/fulfill/${original.variant_id}`;

                    const response = await orderTracking(
                        fulfillmentData[0]?.id,
                        data
                    );
                    if (response.status === 201) {
                        dispatch({ type: "UPDATE_SUCCESS" });
                    } else {
                        dispatch({ type: "UPDATE_ERROR" });
                    }
                } catch (error) {
                    dispatch({ type: "UPDATE_ERROR" });
                }
            };

            const handleSubmit = async (e) => {
                e.preventDefault();
                for (const field of requiredFields) {
                    if (!data[field]) {
                        return setError(`${field.replace("_", " ")} field is required.`);
                    }
                }

                dispatch({ type: "UPDATE_START" });
                setTimeout(updateTrackingDetails, 2000);
            };
            

            return (
                <div>
                    <button
                        style={{ minWidth: "120px" }}
                        onClick={handleOpenModal}
                        className={`capitalize flex items-center justify-center px-4 py-2 border border-transparent text-xs font-medium rounded-lg text-white bg-pink-500 hover:bg-pink-700`}
                        // disabled={!(fulfillmentData.length > 0)}
                    >
                        Add tracking
                    </button>

                    <Modal
                        isOpen={modalOpen}
                        onClose={handleCloseModal}
                        heading={"Add tracking details"}
                    >
                        <form
                            className="bg-gray-50 space-y-6 rounded-md shadow-md border p-4 py-6 sticky top-0"
                            onSubmit={handleSubmit}
                        >
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
                                                value={data[field.id] || ""}
                                                labelFor={field.labelFor}
                                                id={field.id}
                                                name={field.name}
                                                type={field.type}
                                                placeholder={field.placeholder}
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {error && (
                                <div
                                    className="bg-red-100 border border-red-200 text-red-700 px-2 py-2 rounded relative"
                                    role="alert"
                                >
                                    <span className="block sm:inline text-xs">{error}</span>
                                </div>
                            )}
                            <StatusButton
                                isUpdating={statusState.isUpdating}
                                isSuccess={statusState.isSuccess}
                                isError={statusState.isError}
                                type="submit"
                                updateMessage={statusState.updateMessage}
                                buttonMessage="Update Details"
                            />
                        </form>
                    </Modal>
                </div>
            );
        },
    }

];


export { orderDetailFields };