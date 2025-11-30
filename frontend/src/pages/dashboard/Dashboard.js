import React, { useState, useEffect, useCallback } from 'react';
import Modal from '../../contexts/Modal';
import CSVUpload from '../../contexts/CSVUpload';
import { vendorData, fetchOrderData, importProductCSV, getSampleProductCSV } from '../../utils/api';
import useAuth from '../../hooks/auth-hook';
import useVendorStatus from '../../hooks/vendor-hook';
import PieChart from '../../contexts/PieChart';
import Loader from '../../contexts/Loader';
import Avatar from '../../assets/avatar.png';
import LineChart from '../../contexts/LineChart';
import { checkRole } from '../../auth';
import CSVExportSample from '../../contexts/CSVExportSample';

const Dashboard = () => {
  const { role, name } = useAuth();
  const [showLoader, setShowLoader] = useState(true);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false)
  const [csvStatusUpdate, setCsvStatusUpdate] = useState(false)
  const [csvError, setCsvError] = useState(false);
  const vendorInfo = useVendorStatus();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenSampleCSV, setModalOpenSampleCSV] = useState(false);

  const [data, setData] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [limitedData, setLimitedData] = useState([]);
  const [value, onChange] = useState(new Date());
  const salesData = vendorInfo && vendorInfo.ordersByMonth ? vendorInfo.ordersByMonth.sales : [0, 0, 0, 0, 0, 0];
  const ordersData = vendorInfo && vendorInfo.ordersByMonth ? vendorInfo.ordersByMonth.orders : [0, 0, 0, 0, 0, 0];

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCsvStatusUpdate(false);
    setLoader(false);
    setCsvError(false);
  };

  const handleOpenModalSampleCSV = () => {
    setModalOpenSampleCSV(true);
  };

  const handleCloseModalSampleCSV = () => {
    setModalOpen(false);
    setModalOpenSampleCSV(false);
    setLoader(false);
    setCsvError(false);
  };

  const handleUpload = async (formData) => {
    setLoader(true);

    try {
      const response = await importProductCSV(formData);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds
      if (response.data.success && response.data.success == true) {
        setLoader(false);
        setCsvStatusUpdate(true);
        setCsvError(false);
      }
    } catch (error) {
      setLoader(false);
      setCsvStatusUpdate(false);
      setCsvError(true);
    }
  };

  //load the data automatically
  useEffect(() => {
    if (vendorInfo) {
      setUserInfo(vendorInfo.info);
      setShowLoader(false);
      if (role === "admin") {
        handleFetchData();
      }
      else {
        handleFetchData();
      }
    }
  }, [vendorInfo]);

  const handleFetchData = useCallback(async (queryString) => {
    try {
      console.log({ role })
      // if (role === "admin") {
      //   const response = await vendorData(queryString);
      //   setData(response.data);
      //   await sliceData(response.data);
      //   setError(response.error);
      // }
      // else 
      if (role === "vendor") {
        const response = await fetchOrderData('page=1&perPage=50');
        setData(response.data);
        await sliceData(response.data.orders);
      }
    } catch (error) {
      setError(error);
    } finally {
      setShowLoader(false);
    }
  }, [role]);

  const sliceData = async (data) => {
    if (data && data.length > 0) {
      return setLimitedData(data.slice(0, 7));;
    }
    return [];
  };

  const csvExportSample = async () => {
    try {
      const response = await getSampleProductCSV();
      if (response.data.status === 201) {
        return true;
      }
      else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }




  return (
    <>
      {
        showLoader ?
          (<Loader setShowLoader={setShowLoader} time='10000' />) :
          (
            <div className='pb-6 min-h-full flex flex-col'>
              {/* main-content-header */}
              <div className="ltablet:max-w-full flex justify-between flex-col gap-4 text-center md:flex-row md:text-left lg:max-w-full border-b">
                <div className="flex flex-col items-start justify-between pb-2 space-y-4  lg:items-center lg:space-y-0 lg:flex-row gap-2">
                  <div className="relative inline-flex shrink-0 items-center justify-center outline-none h-16 w-16 rounded-full">
                    <div className="flex h-full w-full items-center justify-center overflow-hidden text-center transition-all duration-300 rounded-full">
                      <img src={Avatar} className="max-h-full max-w-full object-cover shadow-sm dark:border-transparent h-16 w-16" />
                    </div>
                  </div>
                  <div className='text-start'>
                    <h2 className="font-heading text-xl font-light leading-tight text-muted-800 dark:text-white">
                      <span className='font-semibold'>Welcome back, {name}!</span>
                    </h2>
                    <p className="font-alt text-base font-normal leading-normal leading-normal">
                      <span className="font-medium text-gray-400"> Happy to see you again on your dashboard. </span>
                    </p>
                  </div>
                </div>
                {!checkRole() && <div className="flex flex-row">
                  <div class="mr-2">
                    <button onClick={handleOpenModal} className="inline-flex items-center justify-center px-4 py-1 space-x-1 bg-pink-500 text-white rounded-md shadow hover:bg-pink-600">Import CSV</button>
                  </div>
                  <div class="mr-2">
                    <button onClick={handleOpenModalSampleCSV} className="inline-flex items-center justify-center px-4 py-1 space-x-1 bg-primary-500 text-white rounded-md shadow hover:bg-primary-600">Sample CSV</button>
                  </div>
                </div>}

              </div>

              <Modal isOpen={modalOpenSampleCSV} onClose={handleCloseModalSampleCSV} heading={"CSV UPLOAD"}>
                <h2 className="text-lg font-medium mb-4">How to import the product using CSV</h2>
                <ol className="list-decimal pl-6 mb-6 ">
                  <li className="mb-2 text-gray-800">Firstly, download the sample CSV file.</li>
                  <>
                    <li className="mb-2 text-gray-800">Open the CSV file and enter the product details of each column.</li>
                    <p className="mb-2 text-primary-800">Note: Don't make any changes in the CSV header otherwise the file can't be uploaded.</p>
                  </>
                  <li className="mb-2 text-gray-800">Cross check and verify all the details of the file.</li>
                  <li className="mb-2 text-gray-800">Lastly, use the updated csv file and import it.</li>
                  <li className="mb-2 text-gray-800">To know which columns must contains values, you can check this Shopify <a target="_balnk" href="https://help.shopify.com/en/manual/products/import-export/using-csv" className="text-blue-500 hover:underline">documentation</a>.</li>
                </ol>
                <p className="mb-2 text-black-800">FYI: While importing the CSV data if the product title already exist in our database then we will overwrite it and update it with new data.</p>
                <div class="mt-5 center-align">
                  <CSVExportSample csvExportSample={csvExportSample} />
                </div>

              </Modal>

              <Modal isOpen={modalOpen} onClose={handleCloseModal} heading={"CSV UPLOAD"}>
                <CSVUpload onUpload={handleUpload} csvStatusUpdate={csvStatusUpdate} loader={loader} csvError={csvError} />
              </Modal>
              {/* start-content */}
              {/* <div className='h-full'> */}
              <div className={`grid grid-cols-1 grow gap-5 mt-6 sm:grid-cols-1 ${role === "admin" ? 'xl:grid-cols-6 2xl:grid-cols-6' : 'lg:grid-cols-3'}`}>
                {userInfo ? (
                  userInfo.filter(element => element.name === 'Orders').map((element) => {
                    return <div className="bg-lightAlmond flex flex-col p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg col-span-3 xl:col-span-2 " key={`key-${element.name}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex flex-col space-y-2">
                          <span className="text-gray-600 font-medium">Total {element.name}</span>
                          <span className="text-lg font-semibold">{element.count.toLocaleString("au-AU")}</span>
                        </div>
                        <div className="p-3 rounded bg-primary-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white-600" fill="none" viewBox="0 0 24 24" stroke="#fff">
                            <circle cx="9" cy="21" r="1" className="text-white-400" />
                            <circle cx="20" cy="21" r="1" className="text-white-400" />
                            <path
                              d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
                              className="text-white-600 "
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              stroke="#fff"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className='grow'>
                        <PieChart data={element} type={element.name} />
                      </div>
                    </div>
                  })
                ) : (
                  <div className="bg-lightAlmond p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg ">
                    <p className="text-red-500 mt-2">Error: Failed to fetch data</p>
                  </div>
                )
                }
                <div className="bg-lightAlmond transition-shadow border rounded-lg shadow-sm hover:shadow-lg flex flex-col col-span-3 sm:col-span-3 md:col-span-3 xl:col-span-4 ">
                  <div className="flex items-start justify-between p-4 border-b">
                    <div className="flex flex-col space-y-2">
                      <span className="text-gray-600 font-medium">Order Vs Sales</span>
                    </div>
                  </div>
                  <div className="p-3 grow rounded-lg bg-primary-50 bg-lightAlmond">
                    <LineChart salesData={salesData} ordersData={ordersData} />
                  </div>
                </div>

              </div>
              {/* </div> */}
            </div>
          )
      }

    </>

  );
}

export default Dashboard;
