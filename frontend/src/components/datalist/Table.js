import React, { useEffect, useState } from 'react';
import { useTable, useGlobalFilter, useAsyncDebounce, useRowSelect, usePagination, useFilters } from 'react-table';
import GlobalFilter from './GlobalFilter';
import { useRowSelectColumn } from '@lineup-lite/hooks';
import { DOTS, useCustomPagination } from './useCustomPagination';
import { Button, PageButton } from './Button';
import Modal from '../../contexts/Modal';
import IndeterminateCheckbox from './IndeterminateCheckbox';
import CrudHandler from './CrudHandler';
import Loader from '../../contexts/Loader';



function Table({ columns, data, filterFields, fetchDataHandler, children, setSelectedIndex, selectRow, dimension, count, showLoader, size, gridType }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    flatColumns,
    selectedFlatRows,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    setFilter,
    visibleColumns,
    state: { selectedRowIds },
  } = useTable({ columns, data },
    useFilters,
    useGlobalFilter,
    usePagination,
    useRowSelect,
    hooks => {
      selectRow &&
        hooks.visibleColumns.push(columns => [

          {
            id: 'selection',
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ])
    }
  );

  const [selectedRows, setSelectedRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [crudAction, setCrudAction] = useState('');
  const [editRow, setEditRow] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [itemPerPage, setItemPerPage] = useState(50);
  // const [showLoader, setShowLoader] = useState(true);

  const { pageIndex } = state;

  // useEffect(() => {
  //   if (!data || data.length === 0) {
  //     setShowLoader(true);
  //   } else {
  //     setShowLoader(false);
  //   }
  // }, [data]);


  const paginationRange = useCustomPagination({
    totalPageCount: pageCount,
    currentPage: pageIndex
  }); //new

  useEffect(() => {
    size ? setPageSize(size) : setPageSize(50);
  }, [size]); //set according to your preferrence

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSelectedRow = (rowId) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(rowId)) {
        return prevSelectedRows.filter((id) => id !== rowId);
      } else {
        return [...prevSelectedRows, rowId];
      }
    });
  };

  useEffect(() => {
    setSelectedRows(Object.keys(selectedRowIds));
    if (setSelectedIndex) setSelectedIndex(handleSelection());
  }, [selectedRowIds]);

  const handleSelection = () => {
    return selectedFlatRows.map(row => row.original.mid);
  }


  return (
    <div>
      {selectRow &&
        <div className='flex flex-row'>
          <div className='mt-4 -mb-4 bg-primary-600 text-white p-2 border border-transparent text-sm font-medium rounded-md mr-2' style={{ maxWidth: '200px' }}>Selected: {selectedRows.length} Items</div>
          <div className='mt-4 -mb-4 bg-primary-600 text-white p-2 border border-transparent text-sm font-medium rounded-md ' style={{ maxWidth: '200px' }}>Total {gridType}: {count} Items</div>
        </div>
      }

      <div>
        {children}
      </div>

      <Modal isOpen={modalOpen} onClose={handleCloseModal} heading={"Delete Product"}>
        <CrudHandler action={crudAction} setModalOpen={modalOpen} fetchData={editRow} />
      </Modal>
      <div className="mt-2 flex flex-col">
        <div className="py-2 align-middle min-w-full">
          <div className="shadow border border-gray-200 sm:rounded-lg overflow-y-auto overflow-x-auto bg-gray-50" style={dimension}>
            <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
              <thead className="sticky top-0 bg-gray-50 bg-lightAlmond">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}
                        className="text-muted-700 dark:text-muted-400 text-left font-sans font-semibold tracking-wider text-xs uppercase border-muted-200 dark:border-muted-700 last:border-e-none dark:bg-muted-800 border-r bg-white bg-lightAlmond px-4 py-5 p-4"
                        style={{ whiteSpace: "nowrap" }}>
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
                {showLoader ? (
                  <tr>
                    <td colSpan={10} rowSpan={10} className="text-black-400 text-center py-10 bg-whiteLinen">
                      <div className="flex justify-center items-center">
                        <Loader setShowLoader={showLoader} time='100000' />
                      </div>
                    </td>
                  </tr>
                ) : page.length > 0 ? (
                  <>
                    {page.map((row, i) => {
                      prepareRow(row);
                      return (
                        <tr
                          {...row.getRowProps()}
                          className="transition-all shadow-sm hover:shadow-lg hover:bg-gray-200 bg-whiteLinen"
                          key={i}
                        >
                          {row.cells.map((cell, i) => {
                            return (
                              <td
                                {...cell.getCellProps()}
                                className="font-alt whitespace-nowrap text-xs text-muted-800 dark:text-white px-4 py-2"
                                key={i}
                              >
                                {cell.render("Cell")}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <tr className="text-black-400 text-sm px-2 py-3 whitespace-nowrap bg-lightAlmond">
                      <td
                        colSpan={10}
                        className="text-center text-black-400 text-sm px-2 py-3 whitespace-nowrap h-20 font-medium tracking-wider uppercase"
                      >
                        No Data To Show
                      </td>
                    </tr>
                  </>
                )}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  )

}

export default Table;
