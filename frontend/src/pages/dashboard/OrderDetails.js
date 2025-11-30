import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchOrderData, uploadInvoiceHandler, downloadInvoice, deleteOrder, resendOrderEmail } from '../../utils/api';
import Table from '../../components/datalist/Table';
import Action from '../../components/datalist/Action';
import Breadcrumb from '../../contexts/Breadcrumb';
import Loader from '../../contexts/Loader';
import StatusPill from '../../components/datalist/StatusPill';
import { orderDetailFields } from "../../utils/orderDetailsFileds";
import InvoiceUpload from '../../contexts/InvoiceUpload';
import Modal from '../../contexts/Modal';
import FormatDateTime from '../../contexts/FormatDateTime';
import { checkRole } from '../../auth';
import { TrackingData } from '../../contexts/TrackingData';
import { ConfirmModal } from '../../contexts/ConfirmModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderDetails = () => {
    const { orderId } = useParams();
    const [data, setData] = useState({});
    const [showLoader, setShowLoader] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [csvStatusUpdate, setCsvStatusUpdate] = useState(false)
    const [pdfUploadError, setPdfUploadError] = useState(false);
    const [loader, setLoader] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [tableShowLoader, setTableShowLoader] = useState(true);
    const [invoiceUploading, setInvoiceUploading] = useState(null);
    const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
    const [isPerformingAction, setIsPerformingAction] = useState(false);

    useEffect(() => {
        const queryString = `page=1&perPage=1&id=${orderId}&project=${localStorage.getItem("selectedProject")}`
        handleFetchData(queryString);
    }, [orderId]);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setCsvStatusUpdate(false);
        setLoader(false);
        setPdfUploadError(false);
    };

    const handleUpload = async (formData) => {
        setLoader(true);
        formData.append("orderId", orderId);
        setInvoiceUploading(true);
        try {
            const response = await uploadInvoiceHandler(formData);
            // await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds
            if (response.data?.success && response.data?.success == true) {
                setLoader(false);
                setCsvStatusUpdate(true);
                setPdfUploadError(false);

                setTimeout(() => { handleCloseModal(); setInvoiceUploading(null); handleFetchData(`page=1&perPage=1&id=${orderId}&project=${localStorage.getItem("selectedProject")}`); }, 2000);
            }
            else {
                setLoader(false);
                setCsvStatusUpdate(false);
                setPdfUploadError(true);
            }
        } catch (error) {
            setLoader(false);
            setCsvStatusUpdate(false);
            setPdfUploadError(true);
        }
    };
    const downloadInvoiceHandler = async (invoiceKey) => {
        const response = await downloadInvoice(orderId, invoiceKey);
        // window.location.href = response.data.invoice_url;
        window.open(response.data.invoice_url, "_blank");

    }
    const handleFetchData = async (queryString) => {
        try {
            setTableShowLoader(true);
            const response = await fetchOrderData(queryString, setData);
            const preparedData = await dataPrepare(response.data.orders);
            setData(preparedData);
            setError(response.error);
        } catch (error) {
            setError(error);
        }
        finally {
            setTableShowLoader(false);
        }
    };


    const dataPrepare = async (data) => {
        const updateData = data[data.length - 1];
        const formattedDate = FormatDateTime(updateData.created_at);
        const expiresInDate = FormatDateTime(updateData.order_expires_in);
        return {
            orderExpiresIn: expiresInDate,
            orderNumber: updateData.name || "No data",
            billingAddress: updateData.billing_address,
            shippingAddress: updateData.shipping_address,
            productItemsData: updateData.line_items,
            orderPlaceTime: formattedDate,
            customerDetail: updateData.customer,
            numberOfProduct: updateData.line_items.length || 0,
            customNote: updateData.note,
            orderCancel: updateData.cancel_reason,
            shippingMethod: updateData.shipping_lines[0]?.code || "Not found",
            paymentMethod: updateData.payment_gateway_names[0] || "Not found",
            subTotal: updateData.sub_total || 0,
            totalTax: updateData.total_tax || 0,
            financialStatus: updateData.financial_status || "Not found",
            rawData: updateData,
            projectName: updateData.project_name
        };
    };

    const handleBackPage = (e) => {
        e.stopPropagation();
        // navigate(-1);
        window.location.href = '/orderslist';
        //navigate('/orderslist', {replace: true});
        // window.location.reload();
    }

    const onCloseDeleteAlert = () => {
        setOpenDeleteAlert(!openDeleteAlert);
    }

    const productDeleteHandler = async () =>{
        let orders = [];
        orders.push({ id: orderId });
        try {
          // Simulating API call response.data.success
          const response = await deleteOrder(orders);
          
          if (response.data.success === true) {
            setIsPerformingAction(true);
            toast.success('Order is deleting. Please wait...', {
              position: toast.POSITION.TOP_CENTER,
            });
          }
          else if(response.data.success === false){
            toast.error('Something went wrong', {
              position: toast.POSITION.TOP_CENTER,
            });
          }
          setTimeout(()=>{
            window.location.href = "/orderslist";
          }, 3200);
        } catch (error) {
          toast.error('Internal server error. Try again after sometime.', {
            position: toast.POSITION.TOP_CENTER,
          });
        }
    }

    const resendEmailHandler = async() => {
        let orders = [];
        orders.push({id: orderId});

        try{
            let response = await resendOrderEmail(orders, localStorage.getItem("selectedProject"));
            if (response.data.success === true) {
                setIsPerformingAction(true);
                toast.success('Email has been sent', {
                  position: toast.POSITION.TOP_CENTER,
                });
            }
            else if(response.data.success === false){
                toast.error('Something went wrong', {
                  position: toast.POSITION.TOP_CENTER,
                });
            }
        } catch (error) {
            toast.error('Internal server error. Try again after sometime.', {
              position: toast.POSITION.TOP_CENTER,
            });
        }

    }

    return (
        <div className='py-4'>
            <TrackingData.Provider value={data.rawData}>
                {
                    showLoader ?
                        (<Loader setShowLoader={setShowLoader} />) :
                        (<>
                            <div className="flex flex-col items-start justify-between pb-4 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
                                <div className='flex gap-2'>
                                    <button onClick={handleBackPage} className="p-1 border border-transparent text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"><svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg></button>
                                    <h1 className="text-2xl font-semibold whitespace-nowrap">Order Details</h1>
                                </div>
                                
                                <div className="flex flex-col items-start justify-between pb-6 space-y-4 lg:items-center lg:space-y-0 lg:flex-row gap-2">
                                    <div className="space-y-6 md:space-x-2 md:space-y-0">
                                        <button onClick={resendEmailHandler} className="inline-flex items-center justify-center px-4 py-1 space-x-1 bg-primary-600 text-white rounded-md shadow hover:bg-primary-600">Resend email</button>
                                    </div>
                                    <div className="space-y-6 md:space-x-2 md:space-y-0">
                                        <button onClick={()=>{setOpenDeleteAlert(true)}} className="inline-flex items-center justify-center px-4 py-1 space-x-1 bg-primary-800 text-white rounded-md shadow hover:bg-primary-600">Delete</button>
                                    </div>
                                    <ConfirmModal openDeleteAlert={openDeleteAlert} onCloseDeleteAlert={onCloseDeleteAlert} onAction={productDeleteHandler} isPerformingAction={isPerformingAction} orderMessage={false}/>
                                </div>
                            </div>
                            <div className="box mt-4 bg-gray-50 bg-lightAlmond transition-shadow border rounded-lg shadow-sm hover:shadow-lg" >
                                <div className="flex p-4 border-b box-head" >
                                    <div className="flex justify-between w-full items-center" >
                                        <div className="flex justify-start item-start space-y-2 flex-col">
                                            <h1 className="text-base font-semibold text-gray-800 dark:text-white">Order : {data.orderNumber}</h1>
                                            <p className="text-xs font-medium text-gray-500 dark:text-white/70">Id : {orderId}</p>
                                            <p className="text-xs font-medium text-gray-500 dark:text-white/70 ">Created at : {data.orderPlaceTime}</p>
                                            <p className="text-xs font-medium text-gray-500 dark:text-white/70 ">Project : {data.projectName}</p>

                                            {/* <p className="text-xs font-medium text-gray-500 dark:text-white/70 ">Expires at : {data.orderExpiresIn}</p> */}
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            {/* <a className="bg-primary-100 hover:bg-primary-200 dark:bg-primary-700 dark:hover:bg-primary-900 text-primary-500 rounded-lg px-4 py-1 font-sans text-sm font-medium underline-offset-4 transition-colors duration-300" href="/orderlist">Invoice </a> */}
                                            {/* { <p className='rounded-lg px-4 py-1 text-red-700 bg-red-300 text-sm font-medium'>Order cancel reason : {data.cancel_reason}</p>} */}
                                        </div>
                                        
                                        {invoiceUploading ? <div className="h-6 w-6 text-indigo-700 flex items-center">
                                            <div className="h-12 w-12 animate-bounce">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin" fill="#7c3aed" stroke="#7c3aed" strokeWidth="0" viewBox="0 0 16 16">
                                                    <path d="M8 0c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zM8 4c2.209 0 4 1.791 4 4s-1.791 4-4 4-4-1.791-4-4 1.791-4 4-4zM12.773 12.773c-1.275 1.275-2.97 1.977-4.773 1.977s-3.498-0.702-4.773-1.977-1.977-2.97-1.977-4.773c0-1.803 0.702-3.498 1.977-4.773l1.061 1.061c0 0 0 0 0 0-2.047 2.047-2.047 5.378 0 7.425 0.992 0.992 2.31 1.538 3.712 1.538s2.721-0.546 3.712-1.538c2.047-2.047 2.047-5.378 0-7.425l1.061-1.061c1.275 1.275 1.977 2.97 1.977 4.773s-0.702 3.498-1.977 4.773z"></path>
                                                </svg>
                                            </div>
                                        </div> : <div className="flex flex-col items-start justify-between pb-6 space-y-4 lg:items-center lg:space-y-0 lg:flex-row gap-2">
                                            {!checkRole() && <div className="space-y-6 md:space-x-2 md:space-y-0">
                                                <button onClick={handleOpenModal} className="inline-flex items-center justify-center px-4 py-1 space-x-1 bg-pink-500 text-white rounded-md shadow hover:bg-pink-600">{data.invoiceKey ? "Update Invoice" : "Invoice Upload"}</button>
                                            </div>}
                                            {data.invoiceKey ? <div className="space-y-6 md:space-x-2 md:space-y-0">
                                                <button onClick={() => { downloadInvoiceHandler(data.invoiceKey) }} className="inline-flex items-center justify-center px-4 py-1 space-x-1 bg-green-500 text-white rounded-md shadow hover:bg-green-600">Download Invoice</button>
                                            </div> : (checkRole() && data.invoiceKey ? <div className="space-y-6 md:space-x-2 md:space-y-0">
                                                <button className="inline-flex items-center justify-center px-4 py-1 space-x-1 bg-gray-400 text-white rounded-md shadow hover:bg-gray-400" disabled>Invoice not uploaded</button>
                                            </div> : "")}
                                        </div>}
                                        <Modal isOpen={modalOpen} onClose={handleCloseModal} heading={"Upload your invoice"}>
                                            <InvoiceUpload onUpload={handleUpload} csvStatusUpdate={csvStatusUpdate} loader={loader} pdfUploadError={pdfUploadError} orderId={orderId} />
                                        </Modal>
                                    </div>
                                </div>
                                <div className='body p-4'>
                                    <div className="sm:grid grid-cols-12 gap-6 space-y-6 sm:space-y-0">
                                        {/* <div className='col-span-12 flex gap-6'> */}
                                            {checkRole() && <div className={`col-span-12 sm:col-span-6 md:col-span-4  ${checkRole() ? 'lg:col-span-3' : 'lg:col-span-4'} xxl:!col-span-3`}>
                                                <div className="box shadow-none border-0 mb-0">
                                                    <div className="box-body p-0 space-y-2">
                                                        <h5 className="text-base font-semibold text-gray-800 dark:text-white">Billing Address</h5>
                                                        <p className="text-gray-500 dark:text-white/70 text-sm">
                                                            <span className="text-sm font-bold text-gray-600">Name :</span>{" "}
                                                            {data.billingAddress ? data.billingAddress.name : "No data"}
                                                        </p>

                                                        {data.billingAddress && data.billingAddress.company ? <p className="text-gray-500 dark:text-white/70 text-sm">
                                                            <span className="text-sm font-bold text-gray-600">Company :</span>{" "}
                                                            {data.billingAddress.company}
                                                        </p> : <p className="text-gray-500 dark:text-white/70 text-sm">
                                                            <span className="text-sm font-bold text-gray-600">Company :</span>
                                                            {" "}Not found
                                                        </p>}

                                                        {data.billingAddress && data.billingAddress.address1 && <p className="text-gray-500 dark:text-white/70 text-sm">
                                                            <span className="text-sm font-bold text-gray-600">Address 1 :</span>{" "}
                                                            {data.billingAddress.address1}
                                                        </p>}

                                                        {data.billingAddress && data.billingAddress.address2 && <p className="text-gray-500 dark:text-white/70 text-sm">
                                                            <span className="text-sm font-bold text-gray-600">Address 2 :</span>{" "}
                                                            {data.billingAddress.address2}
                                                        </p>}

                                                        {data.billingAddress && data.billingAddress.city ? <p className="text-gray-500 dark:text-white/70 text-sm">
                                                            <span className="text-sm font-bold text-gray-600">City :</span>{" "}
                                                            {data.billingAddress.city}
                                                        </p> : ""}

                                                        <p className="text-gray-500 dark:text-white/70 text-sm">
                                                            
                                                            <span className="text-sm font-bold text-gray-600">State :</span>{" "}
                                                            {data.billingAddress ? data.billingAddress.province : "No data"}
                                                        </p>

                                                        {data.billingAddress && data.billingAddress.phone ? <p className="text-gray-500 dark:text-white/70 text-sm">
                                                            <span className="text-sm font-bold text-gray-600">Phone Number :</span>{" "}
                                                            {data.billingAddress.phone}
                                                        </p> : <p className="text-gray-500 dark:text-white/70 text-sm">
                                                            <span className="text-sm font-bold text-gray-600">Phone Number :</span>
                                                            {" "}Not found
                                                        </p>}

                                                        {data.billingAddress && data.billingAddress.zip && <p className="text-gray-500 dark:text-white/70 text-sm">
                                                            <span className="text-sm font-bold text-gray-600">Postcode :</span>{" "}
                                                            {data.billingAddress.zip}
                                                        </p>}

                                                        <p className="text-gray-500 dark:text-white/70 text-sm">
                                                            <span className="text-sm font-bold text-gray-600">Country :</span>{" "}
                                                            {data.billingAddress ? `${data.billingAddress.country}-${data.billingAddress.country_code}` : "No data"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>}
                                            <div className={`col-span-12 sm:col-span-6 md:col-span-4  ${checkRole() ? 'lg:col-span-3' : 'lg:col-span-4'} xxl:!col-span-3`}>
                                                <div className="box shadow-none border-0 mb-0">
                                                    <div className="box-body p-0 space-y-2">
                                                        <h5 className="text-base font-semibold text-gray-800 dark:text-white">Shipping Address</h5>
                                                        <p className="text-gray-500 dark:text-white/70 text-sm">
                                                            <span className="text-sm font-bold text-gray-600">Name :</span>{" "}
                                                            {data.shippingAddress ? data.shippingAddress.name : "No data"}
                                                        </p>

                                                        {data.shippingAddress && data.shippingAddress.company ? <p className="text-gray-500 dark:text-white/70 text-sm">
                                                            <span className="text-sm font-bold text-gray-600">Company :</span>{" "}
                                                            {data.shippingAddress.company}
                                                        </p> : <p className="text-gray-500 dark:text-white/70 text-sm">
                                                            <span className="text-sm font-bold text-gray-600">Company :</span>
                                                            {" "}Not found
                                                        </p>}

                                                        {data.shippingAddress && data.shippingAddress.address1 && <p className="text-gray-500 dark:text-white/70 text-sm">
                                                            <span className="text-sm font-bold text-gray-600">Address 1 :</span>{" "}
                                                            {data.shippingAddress.address1}
                                                        </p>}

                                                        {data.shippingAddress && data.shippingAddress.address2 && <p className="text-gray-500 dark:text-white/70 text-sm">
                                                            <span className="text-sm font-bold text-gray-600">Address 2 :</span>{" "}
                                                            {data.shippingAddress.address2}
                                                        </p>}

                                                        {data.shippingAddress && data.shippingAddress.city ? <p className="text-gray-500 dark:text-white/70 text-sm">
                                                            <span className="text-sm font-bold text-gray-600">City :</span>{" "}
                                                            {data.shippingAddress.city}
                                                        </p> : ""}

                                                        <p className="text-gray-500 dark:text-white/70 text-sm">
                                                            <span className="text-sm font-bold text-gray-600">State :</span>{" "}
                                                            {data.shippingAddress ? data.shippingAddress.province : "No data"}
                                                        </p>

                                                        {data.shippingAddress && data.shippingAddress.zip && <p className="text-gray-500 dark:text-white/70 text-sm">
                                                            <span className="text-sm font-bold text-gray-600">Postcode :</span>{" "}
                                                            {data.shippingAddress.zip}
                                                        </p>}

                                                        {data.shippingAddress && data.shippingAddress.phone ? <p className="text-gray-500 dark:text-white/70 text-sm">
                                                            <span className="text-sm font-bold text-gray-600">Phone Number :</span>{" "}
                                                            {data.shippingAddress.phone}
                                                        </p> : <p className="text-gray-500 dark:text-white/70 text-sm">
                                                            <span className="text-sm font-bold text-gray-600">Phone Number :</span>
                                                            {" "}Not found
                                                        </p>}

                                                        <p className="text-gray-500 dark:text-white/70 text-sm">
                                                            <span className="text-sm font-bold text-gray-600">Country :</span>{" "}
                                                            {data.shippingAddress ? `${data.shippingAddress.country}-${data.shippingAddress.country_code}` : "No data"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`col-span-12 sm:col-span-6 md:col-span-4  ${checkRole() ? 'lg:col-span-3' : 'lg:col-span-4'} xxl:!col-span-3`}>
                                                <div className="box shadow-none border-0 mb-0">
                                                    <div className="box-body p-0 space-y-2">
                                                        <h5 className="text-base font-semibold text-gray-800 dark:text-white">Shipping Method</h5>
                                                        <p className="text-gray-500 dark:text-white/70 text-sm">{data.shippingMethod ? data.shippingMethod : "No data"}</p>                                            </div>
                                                </div>
                                            </div>
                                            {checkRole() && <div className="col-span-12 sm:col-span-6 md:col-span-4  lg:col-span-3 xxl:!col-span-3">
                                                <div className="box shadow-none border-0 mb-0">
                                                    <div className="box-body p-0 space-y-2">
                                                        <h5 className="text-base font-semibold text-gray-800 dark:text-white">Payment Method</h5>
                                                        <div className="flex flex-col">
                                                            <div className="flex w-full flex-col rounded-sm text-base font-semibold focus:ring-primary dark:bg-bgdark dark:text-white/70">
                                                                <p className="text-gray-500 dark:text-white/70 text-sm"><span className="text-sm font-bold text-gray-600">Type: </span>
                                                                    {data.paymentMethod ? data.paymentMethod : "No Data"}
                                                                </p>

                                                                {data.financialStatus ? <div className="my-3">Status: <StatusPill value={data.financialStatus} /></div> : null}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>}
                                        {/* </div> */}

                                        <div className="col-span-12 box-body pt-0 ">
                                            {data.productItemsData && data.productItemsData.length > 0 ? (
                                                <Table columns={orderDetailFields} data={data.productItemsData} dimension={{ maxHeight: '300px', width: '' }} showLoader={tableShowLoader} />
                                            ) : (
                                                <p>No data available</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {checkRole() && <div className='grid grid-cols-12 gap-6'>
                                <div className="col-span-12 xxl:!col-span-5 md:col-span-6 box mt-4 bg-gray-50 bg-lightAlmond transition-shadow border rounded-lg shadow-sm hover:shadow-lg" >
                                    <div className="flex p-4 border-b box-head">
                                        <div className="flex justify-between w-full items-center">
                                            <div className="flex justify-start item-start space-y-2 flex-col">
                                                <h1 className="text-base font-semibold text-gray-800 dark:text-white">Payment Summary</h1>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box-body p-4" >
                                        <ul className="flex flex-col border">
                                            <li className="p-2 border bg-lightAlmond text-gray-800 dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                <div className="flex justify-between w-full"> Total Items <span className="">{data.numberOfProduct ? data.numberOfProduct : 0}</span>
                                                </div>
                                            </li>
                                            {checkRole() && <li className="p-2 border bg-lightAlmond text-gray-800 dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                <div className="flex justify-between w-full"> SubTotal <span className="">{data.subTotal ? data.subTotal : 0}</span>
                                                </div>
                                            </li>}
                                            {/* <li className="p-2 border bg-white text-gray-800 dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                <div className="flex justify-between w-full"> Tax Charges <span className="">{data.totalTax ? data.totalTax : 0}</span>
                                                </div>
                                            </li> */}
                                            {/* <li className="p-2 border bg-white text-gray-800 dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                <div className="flex justify-between w-full"> Shipping Charges <span className="text-green-500 text-end">{data.shipping_lines?.length > 0 ? `${data.shipping_lines[0].title} (${data.shipping_lines[0].price})` : "Not available"}</span>
                                                </div>
                                            </li> */}
                                            {/* <li className="p-2 border bg-white text-gray-800 dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                <div className="flex justify-between w-full"> Coupon Discount <span className="text-green-500">0%</span>
                                                </div>
                                            </li> */}
                                            {/* <li className="px-2 py-3 border bg-white text-gray-800 dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                <div className="flex justify-between w-full text-xl font-semibold"> Total <span className="">$1500</span>
                                                </div>
                                            </li> */}
                                        </ul>
                                    </div>
                                    {/* <div className="box-footer border p-4">
                                    <a href="#" className="inline-flex items-center justify-center px-4 py-2 space-x-1 bg-pink-500 text-white w-full flex shadow hover:bg-pink-600">Cancel Order</a>
                                </div> */}
                                </div>
                                <div className={`col-span-12 xxl:!col-span-5 md:col-span-6 box mt-4`}>
                                    {<div className='box bg-gray-50 bg-lightAlmond transition-shadow border rounded-lg shadow-sm hover:shadow-lg'>
                                        <div className="flex p-4 border-b box-head">
                                            <div className="flex justify-between w-full items-center">
                                                <div className="flex justify-start item-start space-y-2 flex-col">
                                                    <h1 className="text-base font-semibold text-gray-800 dark:text-white"> Customer Details </h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="box-body">
                                            <div className="flex align-items-center space-x-3 rtl:space-x-reverse">
                                                <div className="flex-auto my-auto space-y-2 p-4">
                                                    <div className="space-x-3">
                                                        <span className="text-sm font-bold text-gray-600">Name :</span>
                                                        <span className="text-sm text-gray-500 dark:text-white/70">{data.customerDetail && data.customerDetail.first_name ? data.customerDetail.first_name : ""} {data.customerDetail && data.customerDetail.last_name ? data.customerDetail.last_name : ""}</span>
                                                    </div>
                                                    {checkRole() && <div className="space-x-3">
                                                        <span className="text-sm font-bold text-gray-600">Email :</span>
                                                        <span className="text-sm text-gray-500 dark:text-white/70">{data.customerDetail && data.customerDetail.email ? data.customerDetail.email : "Not found"}</span>
                                                    </div>}
                                                    {<div className="space-x-3">
                                                        <span className="text-sm font-bold text-gray-600">Phone Number :</span>
                                                        <span className="text-sm text-gray-500 dark:text-white/70">{data.customerDetail && data.customerDetail.phone ? data.customerDetail.phone : "Not found"}</span>
                                                    </div>}
                                                    {checkRole() && <div className="space-x-3">
                                                        <span className="text-sm font-bold text-gray-600">Orders:</span>
                                                        <span className="text-sm text-gray-500 dark:text-white/70">{data.customerDetail && data.numberOfProduct ? data.numberOfProduct : 0}</span>
                                                    </div>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>}
                                    {data.customNote ? <div className="mt-4 box bg-gray-50 bg-lightAlmond transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
                                        <div className="flex p-4 border-b box-head">
                                            <div className="flex justify-between w-full items-center">
                                                <div className="flex justify-start item-start space-y-2 flex-col">
                                                    <h1 className="text-base font-semibold text-gray-800 dark:text-white">Note</h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-4 box-body space-y-2">
                                            <div className="box-body p-0 space-y-2">
                                                <p className="text-gray-500 dark:text-white/70 text-sm">Note By Customer</p>
                                                <p className="text-gray-700 dark:text-white/70 text-sm">{data.customNote ? data.customNote : "No Note"}</p>
                                            </div>
                                        </div>
                                    </div> : ""}
                                </div>
                            </div>}
                        </>)
                }
                <ToastContainer/>
            </TrackingData.Provider >
        </div>
    );
}

export default OrderDetails;