import StatusPill from "../components/datalist/StatusPill";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { updateProductStatus } from "./api";
import { checkRole } from '../auth';
import noImage from "../assets/noImage.png";

export const ProductFields = () =>{
    const handleViewAction = (rowData) => {
        if (rowData.approved === true) {
            window.location.href = `/product/approved/${rowData.mid}`;
        } else {
            window.location.href = `/product/notapproved/${rowData.mid}`;
        }
    }
    
    const productDataFields = [
        {
            Header: "Product ID",
            accessor: "mid",
            Filter: ({ column }) => (
                <input
                    onChange={(e) => column.setFilter(e.target.value)}
                    placeholder="Search customer"
                />
            ),
        },
        {
            Header: 'Images',
            accessor: 'images',
            // Cell: ({ value }) => <img src={value.src[0]} alt="Product" width="50" height="50" />,
            Cell: ({ value }) => (
                <div>
                    {value && value.map((image, i) => {
                        if (i === 0) {
                            return <img className="max-h-full max-w-full object-cover shadow-sm dark:border-transparent h-12 w-12 bg-gray-100 border rounded-full p-1" key={image.id} src={image.src} alt="Image" />;
                        }
                        return null;
                    })}
                    {
                        value.length === 0 && <img className="max-h-full max-w-full object-cover shadow-sm dark:border-transparent h-12 w-12 bg-gray-100 border rounded-full p-1" src={noImage} alt="Image" />
                    }
                </div>
            )
        },
        {
            Header: "Title",
            accessor: "title",
            Filter: ({ column }) => (
                <input
                    onChange={(e) => column.setFilter(e.target.value)}
                    placeholder="Search deposit"
                />
            ),
        },
        {
            Header: "Product Type",
            accessor: "product_type",
            Cell: ({ value }) => <div style={{ minWidth: "100px" }}>{value}</div>
        },
        {
            Header: "Option",
            accessor: "options",
            Cell: ({ value }) => <div style={{ minWidth: "100px" }}>{value && value.length}</div>
        },
        ...(checkRole()
            ? [
                {
                    Header: "Vendor",
                    accessor: "vendor_email",
                    Cell: ({ value }) =>
                        <div
                            className="mr-2 inline-block px-2 py-1 text-white bg-gray-400 rounded-full"
                        >
                            {value ? value : "Not assigned"}
                        </div>
                },
            ]
            : [
                {
                    Header: "Vendor",
                    accessor: "vendor",
                    Cell: ({ value }) =>
                        <div
                            className="mr-2 inline-block px-2 py-1 text-white bg-gray-400 rounded-full"
                        >
                            {value}
                        </div>
                }
            ]),
        {
            Header: "Status",
            accessor: "status",
            Cell: ({ value }) => <StatusPill value={value} />,
            Filter: ({ column }) => (
                <input
                    onChange={(e) => column.setFilter(e.target.value)}
                    placeholder="Search status"
                />
            ),
        },
        {
            Header: "Admin approval",
            accessor: "approved",
            Cell: ({ row }) => {
                const { original } = row;
                const isAdmin = checkRole();
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
                    let products = [];
                    products.push({ mid: original.mid });
                    // let data = { products: products };
                    const postData = { action: "createProduct", data: products, processedData: []};
    
                    try {
                        // Simulating API call
                        const response = await updateProductStatus(postData);
                        if (response.data.success === true) {
                            setTimeout(() => {
                                setStatusState((prevState) => ({
                                    ...prevState,
                                    isSuccess: true,
                                    isUpdating: false,
                                    updateMessage: "Approved ",
                                }));
                            }, 1200);                        
                        }
                        else if(response.data.success === false && response.data.message === "Bulk Operation is already on going"){
                            setStatusState((prevState) => ({
                                ...prevState,
                                isError: true,
                                isUpdating: false,
                                updateMessage: "Try after sometime",
                            }));
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
                    isAdmin ? <div>
                        {original && original.approved === false ? (
                            <button
                                onClick={handleUpdateStatus}
                                style={{ minWidth: "120px" }}
                                className={`capitalize flex items-center justify-center px-4 py-2 border border-transparent text-xs font-medium rounded-lg text-white ${statusState.isSuccess ? "bg-green-500" : statusState.isError ? "bg-red-500" : "bg-yellow-400 hover:bg-yellow-300"
                                    }`}
                                disabled={statusState.isUpdating}
                            >
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
                                            : "Not approved"}
                            </button>
                        ) : (
                            <button style={{ minWidth: "120px" }} className="capitalize flex items-center justify-center px-4 py-2 border border-transparent text-xs font-medium rounded-lg text-white bg-primary-400 hover:bg-primary-700">
                                {original.approved ? 'Approved' : 'Disable'}
                            </button>
                        )}
                    </div> : <StatusPill value={original.approved} />
                );
            }
        },
        {
            Header: "Actions",
            accessor: "id", // Assuming 'id' is a unique identifier for each product
            Cell: ({ cell }) => (
                <button onClick={() => handleViewAction(cell.row.original)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill='#15a4e6'><path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" /></svg>
                </button >
            ),
        },
    ]
    
    
    const actionFields = [
        {
            label: "Select Action",
            value: "select_option"
        },
        {
            label: "Upload Product",
            value: "upload_product"
        },
        {
            label: "Delete Product",
            value: "delete_product"
        },
        {
            label: "Set as draft",
            value: "draft"
        },
        {
            label: "Set as active",
            value: "active"
        },
        {
            label: "Set as archived",
            value: "archived"
        }
    ];
    
    const actionFieldsVendor = [
        {
            label: "Select option",
            value: "select_option"
        },
        {
            label: "Set as draft",
            value: "draft"
        },
        {
            label: "Set as active",
            value: "active"
        },
        {
            label: "Set as archived",
            value: "archived"
        }
    ];
    
    const shopifyActionFields = [
        {
            label: "Select Action",
            value: "select_option"
        },
        {
            label: "Delete Product",
            value: "delete_product"
        }
    ];
    
    const shopifyProductActionFields = [
        {
            label: "Select Action",
            value: "select_option"
        },
        {
            label: "Assign to Vendor",
            value: "assign_to_vendor"
        }
    ];
    
    const perPages = [
        {
            "label": "50 per page",
            value: 50
        },
        {
            "label": "100 per page",
            value: 100
        },
        {
            "label": "250 per page",
            value: 250
        },
        {
            "label": "500 per page",
            value: 500
        }
    ];
    
    const productFilterFields = [
        {
            labelText: "id",
            labelFor: "id",
            id: "id",
            name: "id",
            type: "text",
            autoComplete: "id",
            placeholder: "Id",
            inputMode: "numeric"
        },
        {
            labelText: "Title",
            labelFor: "title",
            id: "title",
            name: "title",
            type: "text",
            autoComplete: "title",
            placeholder: "Title"
        },
        ...(checkRole()
            ? [
                {
                    id: "vendor",
                    name: "vendor",
                    type: "select",
                    labelText: "vendor",
                    labelFor: "vendor",
                    placeholder: "Select vendor",
                    isRequired: false,
                    options: [],
                }
            ]
            : []),
        {
            id: "approved",
            name: "approved",
            type: "select",
            labelText: "Admin approval",
            labelFor: "approved",
            placeholder: "Admin approval",
            isRequired: false,
            options: [
                { value: true, label: "Yes" },
                { value: false, label: "No" },
            ],
        },
        {
            id: "status",
            name: "status",
            type: "select",
            labelText: "Status",
            labelFor: "status",
            placeholder: "Select status",
            isRequired: false,
            options: [
                { value: "active", label: "Active" },
                { value: "draft", label: "Draft" },
                { value: "archived", label: "Archived" },
            ],
        },
    ]

    return { productDataFields, productFilterFields, actionFields, shopifyActionFields, shopifyProductActionFields, perPages,  actionFieldsVendor }

}



// export { productDataFields, productFilterFields, actionFields, shopifyActionFields, shopifyProductActionFields, perPages,  actionFieldsVendor }