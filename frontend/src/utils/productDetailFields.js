import { checkRole } from '../auth';

export const getProductDetailFields = () => {
    const fields = [
        {
            Header: "Option 1",
            accessor: "options[0]",
        },
        {
            Header: "Option 2",
            accessor: "options[1]",
        },
        {
            Header: "Option 3",
            accessor: "options[2]",
        },
        // {
        //     Header: "Title",
        //     accessor: "title",
        // },
        {
            Header: "SKU",
            accessor: "sku",
        },
        {
            Header: "Quantity",
            accessor: "inventoryQuantities[0].availableQuantity",
        },
        {
            Header: "Original Price",
            accessor: "vendor_price",
        },
        {
            Header: "Compare At Price",
            accessor: "compareAtPrice",
        }
    ];

    const roleBasedFields = checkRole() ? [
        {
            Header: "Selling Price",
            accessor: "price",
        },
    ] : [];

    return [...fields, ...roleBasedFields];
};


export const getApprovedProductDetailFields = () => {
    const fields = [
        {
            Header: "Option 1",
            accessor: "option1",
        },
        {
            Header: "Option 2",
            accessor: "option2",
        },
        {
            Header: "Option 3",
            accessor: "option3",
        },
        {
            Header: "Title",
            accessor: "title",
        },
        {
            Header: "SKU",
            accessor: "sku",
        },
        {
            Header: "Quantity",
            accessor: "inventory_quantity",
        },
        {
            Header: "Original Price",
            accessor: "vendor_price",
        },
        {
            Header: "Compare At Price",
            accessor: "compare_at_price",
        }
    ];

    const roleBasedFields = checkRole() ? [
        {
            Header: "Selling Price",
            accessor: "price",
        },
    ] : [];

    return [...fields, ...roleBasedFields];
};
