import React, { useState } from 'react';
import { useTable, useFilters } from 'react-table';
import StatusPill from '../components/datalist/StatusPill';

const CartDrawer = (props) => {
  // const tableInstance = useTable({ columns, data }, useFilters );
  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow  } = tableInstance;

  const [filterValues, setFilterValues] = useState({});

  // Reset all filters
  // const resetFilters = () => {
  //   setFilterValues({});
  //   columns.forEach((column) => {
  //     column.setFilter(undefined);
  //   });
  // };

  // const handleFilterChange = (event, column) => {
  //   setFilterValues((prevValues) => ({
  //     ...prevValues,
  //     [column.id]: event.target.value,
  //   }));
  // };

  // const handleFilterApply = () => {
  //   columns.forEach((column) => {
  //     const filterValue = filterValues[column.id];
  //     column.setFilter(filterValue);
  //   });
  // };

  return (
    <>
    <div className="cart-drawer fixed right-0 top-0 h-full w-72 sm:w-96 bg-white shadow-lg z-50 ">
      <div className="flex items-center justify-between flex-shrink-0 p-2 bg-gray-100 ">
        <h2 className="text-lg font-medium">Filters</h2>
        <button className="text-gray-500 hover:text-gray-700" onClick={props.onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    {props.children}
    </div>
    </>
    
  );
};

export default CartDrawer;