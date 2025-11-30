// import React, { useMemo, useState } from 'react';
// import Table from './Table';

// const TableHandler = ({ columnsFileds, filterFields, data, fetchDataHandler, actionFields, perPages }) => {

//   const columns = useMemo(() => columnsFileds);


//   return (
//     <>
//       <Table columns={columns} perPages={perPages} actionFields={actionFields} data={data} filterFields={filterFields} fetchDataHandler={fetchDataHandler} />
//     </>
//   );
// }

// export default TableHandler;




// // Table.js

// import React, { useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
// import { useTable, useGlobalFilter, useAsyncDebounce, useRowSelect, usePagination, useFilters } from 'react-table';
// import GlobalFilter from './GlobalFilter';
// import { useRowSelectColumn } from '@lineup-lite/hooks';
// import { DOTS, useCustomPagination } from './useCustomPagination';
// import { Button, PageButton } from './Button';
// import CartDrawer from '../../contexts/CartDrawer';
// import Action from './Action';
// import Modal from '../../contexts/Modal';
// import IndeterminateCheckbox from './IndeterminateCheckbox';
// import CrudHandler from './CrudHandler';
// // import Products from '../../pages/dashboard/ProductsList';
// import CustomFilter from './CustomFilter';
// import Perpages from './Perpages';



// function Table({ columns, data, filterFields, fetchDataHandler, actionFields, perPages }) {
//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//     flatColumns,
//     selectedFlatRows,
//     page,
//     canPreviousPage,
//     canNextPage,
//     pageOptions,
//     pageCount,
//     gotoPage,
//     nextPage,
//     previousPage,
//     setPageSize,
//     state,
//     preGlobalFilteredRows,
//     setGlobalFilter,
//     setFilter,
//     visibleColumns,
//     state: { selectedRowIds },
//   } = useTable({ columns, data },
//     useFilters,
//     useGlobalFilter,
//     usePagination,
//     useRowSelect,
//     hooks => {
//       hooks.visibleColumns.push(columns => [
//         // Let's make a column for selection
//         {
//           id: 'selection',
//           Header: ({ getToggleAllRowsSelectedProps }) => (
//             <div>
//               <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
//             </div>
//           ),
//           Cell: ({ row }) => (
//             <div>
//               <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
//             </div>
//           ),
//         },
//         ...columns,
//       ])
//     }
//   );

//   const [selectedRows, setSelectedRows] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [crudAction, setCrudAction] = useState('');
//   const [editRow, setEditRow] = useState(null);
//   const [selectAll, setSelectAll] = useState(false);
//   const [showCart, setShowCart] = useState(false);
//   const [selectedAction, setSelectedAction] = useState("");
//   const [showPerPage, setShowPerPage] = useState(25);
//   // const selectedRows = Object.keys(selectedRowIds);

//   const { pageIndex } = state;
//   const paginationRange = useCustomPagination({
//     totalPageCount: pageCount,
//     currentPage: pageIndex
//   }); //new

//   useEffect(() => {
//     setPageSize(50);
//   }, [setPageSize]); //set according to your preferrence

//   const handleCloseModal = () => {
//     setModalOpen(false);
//   };

//   const handleSelectedRow = (rowId) => {
//     setSelectedRows((prevSelectedRows) => {
//       if (prevSelectedRows.includes(rowId)) {
//         return prevSelectedRows.filter((id) => id !== rowId);
//       } else {
//         return [...prevSelectedRows, rowId];
//       }
//     });
//   };

//   useEffect(() => {
//     setSelectedRows(Object.keys(selectedRowIds));
//   }, [selectedRowIds]);

//   const handleSelection = () => {
//     return selectedFlatRows.map(row => row.original.id);
//   }

//   const handleAllSelect = () => {
//     setSelectedRows(data.map(row => row.id));
//     setSelectAll(true);
//     console.log("select all items", data);
//   };


//   //crud-handler

//   // const dataDeleteHandle = () =>{
//   //   if(handleSelection().length > 0){
//   //   setModalOpen(true);
//   //   let method = {data:handleSelection() , event:"delete"};
//   //   console.log(method , handleSelection().length);
//   //   }
//   // }

//   const handleDelete = () => {
//     if (handleSelection().length > 0) {
//       setModalOpen(true);
//       setCrudAction('delete');
//     }
//   }


//   const handleCreate = () => {
//     setModalOpen(true);
//     setCrudAction('create');
//   };

//   const selectAction = (e) => {
//     setSelectedAction(e.target.value);
//   }

//   const handleEdit = () => {
//     setModalOpen(true);
//     setCrudAction('edit');
//   };
//   const handleUpdate = (row) => {
//     setModalOpen(true);
//     setCrudAction('update');
//     setEditRow(row);
//   }

//   const selectPage = () => {

//   }

//   const handleAction = async (e) => {

//     const selectedOption = handleSelection();

//     console.log(selectedOption);

//     // if (selectedOption.length > 0) {
//     //   setModalOpen(true);
//     //   setCrudAction('delete');
//     // }

//     if (selectedAction == 'upload_product') {
//       // const response = await http.post(`${PRODUCT_API_ENDPOINTS.CREATE_PRODUCT}`, {
//       //   mouser_part_numbers: selectedOption
//       // })

//       //console.log(response);
//     }

//     if (selectedAction == 'delete_product') {
//       // const response = await http.post(`${PRODUCT_API_ENDPOINTS.DELETE_PRODUCTS}`, {
//       //   mouser_part_numbers: selectedOption
//       // })


//       // console.log(response);
//     }

//   }



//   return (
//     <div>
//       <GlobalFilter
//         preGlobalFilteredRows={preGlobalFilteredRows}
//         globalFilter={state.globalFilter}
//         setGlobalFilter={setGlobalFilter}
//       />

//       {filterFields ? (
//         <>
//           <div className="space-y-6 md:space-x-2 md:space-y-0">
//             <button className="inline-flex items-center justify-center px-8 p-2  space-x-1 bg-primary-700 text-white rounded-md shadow hover:bg-primary-800 " onClick={() => setShowCart(!showCart)}>
//               <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} ><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg></span>
//               <span>Filter</span>
//             </button>
//           </div>

//           {showCart && <CartDrawer onClose={() => setShowCart(false)} columns={columns} data={data} >
//             <CustomFilter fields={filterFields} fetchData={fetchDataHandler} />
//           </CartDrawer>}
//         </>) : ""}

//       <div>Selected: {selectedRows.length} Items</div>.
//       <button onClick={handleAllSelect}>Select All Items</button>
//       <button onClick={handleDelete}>Product Delete</button>
//       {perPages && perPages.length > 0 && <Perpages perPages={perPages} selectPage={selectPage} />}

//       {actionFields && actionFields.length > 0 && <Action actionFields={actionFields} handleAction={handleAction} selectAction={selectAction} />}
//       <Modal isOpen={modalOpen} onClose={handleCloseModal} heading={"Delete Product"}>
//         <CrudHandler action={crudAction} setModalOpen={modalOpen} fetchData={editRow} />
//       </Modal>
//       <div className="mt-2 flex flex-col">
//         <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
//           <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
//             <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
//               <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-10">
//                   {headerGroups.map((headerGroup) => (
//                     <tr {...headerGroup.getHeaderGroupProps()}>
//                       {headerGroup.headers.map((column) => (
//                         <th {...column.getHeaderProps()}
//                           className="px-2 py-3 text-left text-16 font-medium text-gray-600 uppercase rounded-sm tracking-wider"
//                         >
//                           {column.render("Header")}
//                           {/* {column.id === 'selection' && column.render('Summary')} */}
//                         </th>
//                       ))}
//                       <th className="px-2 py-3 text-left text-16 font-medium text-gray-600 uppercase rounded-sm tracking-wider">Action</th>
//                     </tr>
//                   ))}
//                 </thead>
//                 <tbody {...getTableBodyProps()}
//                   className="bg-white divide-y divide-gray-200">
//                   {
//                     page.length > 0 ? (
//                       <>
//                         {page.map((row, i) => {
//                           prepareRow(row);
//                           return (
//                             <tr {...row.getRowProps()}>
//                               {row.cells.map((cell) => {
//                                 return <td {...cell.getCellProps()} className="text-black-400 text-sm px-2 py-3 whitespace-nowrap">{cell.render("Cell")}</td>
//                               })}
//                               <td className="text-black-400 text-sm px-2 py-3 whitespace-nowrap"> <Link to={`/products/${row.original.id}`} onClick={() => handleUpdate(row)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" height="18"><path d="M14.846 1.403l3.752 3.753.625-.626A2.653 2.653 0 0015.471.778l-.625.625zm2.029 5.472l-3.752-3.753L1.218 15.028 0 19.998l4.97-1.217L16.875 6.875z" fill="#413bbc" fillRule="evenodd"></path><circle fill="#413bbc" cx="10" cy="10" r="3"></circle></svg></Link></td>
//                             </tr>
//                           );
//                         })}
//                       </>
//                     ) : (<>
//                       <tr className="text-black-400 text-sm px-2 py-3 whitespace-nowrap">
//                         <td colSpan={10} className="text-center text-black-400 text-sm px-2 py-3 whitespace-nowrap h-20 font-medium tracking-wider uppercase ">No Data To Show</td>
//                       </tr>
//                     </>)
//                   }

//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="py-3 flex items-center text-center justify-center pt-10">
//         <div className="flex-1 flex justify-between ">
//           <Button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</Button>
//           <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between" aria-label="Pagination">
//             <div className="relative z-0 inline-flex items-center ml-auto mr-auto rounded-md shadow-sm space-x-10" aria-label="Pagination">
//               {paginationRange?.map((pageNumber, index) => {
//                 if (pageNumber === DOTS) {
//                   return (
//                     <PageButton
//                       key={index}>...</PageButton>
//                   );
//                 }

//                 if ((pageNumber - 1) === pageIndex) {
//                   return (
//                     <PageButton
//                       key={index}
//                       className=' active:bg-gray-500 active:border-gray-300'
//                       onClick={() => gotoPage(pageNumber - 1)}>{pageNumber}</PageButton>
//                   );
//                 }

//                 return (
//                   <PageButton
//                     key={index}
//                     className='active:bg-gray-500 active:border-gray-300'
//                     onClick={() => gotoPage(pageNumber - 1)}>{pageNumber}</PageButton>
//                 );
//               })}
//             </div>
//           </div>
//           <Button onClick={() => nextPage()} disabled={!canNextPage}>Next</Button>
//         </div>

//       </div>
//     </div>
//   )

// }

// export default Table;