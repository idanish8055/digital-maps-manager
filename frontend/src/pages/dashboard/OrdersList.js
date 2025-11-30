import React, { useState, useEffect } from 'react';
import { fetchOrderData } from '../../utils/api';
import { OrderFields } from "../../utils/orderFields";
import Table from '../../components/datalist/Table';
import Pagination from '../../components/datalist/Pagination';
import PerPage from '../../components/datalist/PerPage';
import CartDrawer from '../../contexts/CartDrawer';
import CustomFilter from '../../components/datalist/CustomFilter';
import FilterBadge from '../../components/datalist/FilterBadge';

const GetQuery = (query) => {
    let queryString = '';
    for (const key in query) {
        let value = (query[key].includes('&')) ? query[key].replace("&", "%26") : query[key];
        if (query[key] !== '') queryString += `&${key}=${value}`;
    }
    return queryString;
}

const OrdersList = () => {
    const { orderDataFields, orderFilterFields, actionFields, perPages } = OrderFields();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [error, setError] = useState(null);
    const [size, setSize] = useState(50);
    const [count, setCount] = useState(null);
    const [showLoader, setShowLoader] = useState(true);
    const [selectedAction, setSelectedAction] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [showCart, setShowCart] = useState(false);
    const [search, setSearch] = useState(null);
    const [filterQuery, setFilterQuery] = useState({});
    const [selectedProject, setSelectedProject] = useState(null)


    //load the data automatically
    useEffect(() => {
        let queryString = `page=${page}&perPage=${size}&project=${localStorage.getItem("selectedProject")}`;
        if (search) {
            queryString += `&query=${search}`;
        }

        if (Object.keys(queryString).length > 0) {
            queryString += GetQuery(filterQuery);
        }
        handleFetchData(queryString);
    }, [page, size, search, filterQuery]);



    const handleFetchData = async (queryString) => {
        try {
            setShowLoader(true);
            const response = await fetchOrderData(queryString);
            setSelectedProject("maps");
            setCount(response.data.count)
            setData(response.data.orders);
            setError(response.error);
        } catch (error) {
            setError(error);
        }
        finally {
            setShowLoader(false);
        }
    };

    const handlePageChange = (e) => {
        setPage(e.target.value);
    }


    const onRemove = (key) => {
        const updatedQuery = { ...filterQuery };
        delete updatedQuery[key];
        setFilterQuery(updatedQuery);
    }

    const selectAction = (e) => {
        setSelectedAction(e.target.value);
    }

    const handleNext = () => {
        (page >= 1 && page < (Math.ceil(count / size))) ? setPage(page + 1) : setPage(page);
    }

    const handleChangePage = (e) => {
        setSize(e.target.value);
    }

    const handlePrev = () => {
        (page >= 2) ? setPage(page - 1) : setPage(page);
    }


    return (
        <div className='pb-6'>
            <div className="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
                <h1 className="text-2xl font-semibold whitespace-nowrap">Orders</h1>
                {/* <Breadcrumb /> */}
            </div>
            <Table columns={orderDataFields} setPage={setPage} filterFields={orderFilterFields} setSize={setSize} perPages={perPages} actionFields={actionFields} setSelectedIndex={setSelectedIndex} data={data} selectRow="true" dimension={{ maxHeight: '700px', width: '' }} count={count} size={size} showLoader={showLoader} gridType="orders">
                <div className='flex flex-wrap items-center mt-6 flex flex-row justify-between border-b border-gray-300 mb-6'>
                    <div className='flex-grow-0 flex-shrink-0 w-full max-w-4xl'>
                        <div className='my-3'>
                            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search Your Products ... </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                </div>
                                <input
                                    value={search || ""}
                                    onChange={e => {
                                        setSearch(e.target.value);
                                        //onChange(e.target.value);
                                    }}
                                    className='min-w-[50%] block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                                    type="search"
                                    placeholder="Search orders by Order number"
                                />
                                {orderFilterFields ? (
                                    <>
                                        {/* <input type="search" id="default-search" className="min-w-[50%] block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." /> */}
                                        <button className="flex gap-2 text-white absolute right-2.5 bottom-1.5 py-2 px-5 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500" onClick={() => setShowCart(!showCart)}>
                                            <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} ><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg></span>
                                            <span>Filter</span>
                                        </button>

                                        {showCart && <CartDrawer onClose={() => setShowCart(false)} columns={orderDataFields} data={data} >
                                            <CustomFilter setShowCart={setShowCart} fields={orderFilterFields} filterQuery={filterQuery} setFilterQuery={setFilterQuery} />
                                        </CartDrawer>}
                                    </>) : ""}
                            </div>
                        </div>
                    </div>
                    <div className='flex-grow-0 flex-shrink-0 min-w-150'>
                        <div className='flex'>
                            {perPages && perPages.length > 0 && <PerPage changePage={handleChangePage} perPages={perPages} />}
                        </div>
                    </div>
                </div>

                <div className="flex flex-row justify-between mb-6">
                    {/* <div className="flex items-center gap-2 ">
                        {actionFields && actionFields.length > 0 && <Action actionFields={actionFields} handleAction={handleAction} selectAction={selectAction} />}
                    </div> */}
                    {/* <div className="flex items-center gap-2">
                        <button className={`text-white right-2.5 bottom-1.5 py-2 px-5 border border-transparent text-sm font-medium rounded-md text-white ${selectedProject === 'maps' ? "bg-primary-600 hover:bg-primary-700" : "bg-primary-500  hover:bg-primary-400"} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`} 
                            onClick={()=>{handleProjectToggle("maps")}}>
                            Maps of the past
                        </button>
                        <button className={`text-white right-2.5 bottom-1.5 py-2 px-5 border text-sm font-medium rounded-md text-white ${selectedProject !== 'maps' ? "bg-primary-600 hover:bg-primary-700" : "bg-primary-500  hover:bg-primary-400"} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`} 
                            onClick={()=>{handleProjectToggle("wildarts")}}>
                            Wildarts
                        </button>
                    </div> */}
                    <div className="flex items-start">
                        <Pagination page={page} size={size} handlePageChange={handlePageChange} handleNext={handleNext} count={count} handlePrev={handlePrev} />
                    </div>
                </div>
                <FilterBadge filterQuery={filterQuery} onRemove={onRemove} />
            </Table>
        </div>
    );



}

export default OrdersList;