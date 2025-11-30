import StatusPill from "../components/datalist/StatusPill";
import { checkRole } from '../auth';
import FormatDateTime from "../contexts/FormatDateTime";

export const OrderFields = () => {
    const handleViewAction = (rowData) => {
        window.location.href = `/order/${rowData?.id ?? ''}`;
    }

    const orderDataFields = [
        // {
        //     Header: "Product ID",
        //     accessor: "id",
        // },
        {
            Header: 'Order Number',
            accessor: 'order_number',
        },
        {
            Header: 'Status',
            accessor: 'order_status',
            Cell: ({ value }) => <StatusPill value={value ? value : "unfulfill"} />,
        },
        ...(checkRole()
            ? [
                {
                    Header: "Customer email",
                    accessor: "customer.email"
                },
            ]
            : [{
                Header: "Customer Name",
                accessor: "",
                Cell: ({ row }) => {
                    const { original } = row;
                    return <div
                        className="mr-2 inline-block px-2 py-1"
                    >
                        {original.customer.first_name} {original.customer.last_name}
                    </div>
                }
            }]),
        {
            id: "numberOfProductsColumn",
            Header: "Number of Products",
            accessor: "line_items",
            Cell: ({ value }) => <div style={{ minWidth: "100px" }}>{value.length}</div>,
        },
        {
            Header: "Order Date & Time",
            accessor: "created_at",
            Cell: ({ value }) => <div className="" >{FormatDateTime(value)}</div>
        },
        {
            Header: "Financial Status",
            accessor: "financial_status",
            Cell: ({ value }) => <StatusPill value={value} />,
        },
        // {
        //     Header: "Fulfillment Status",
        //     accessor: "order_fulfillment_status",
        //     Cell: ({ value }) => <StatusPill value={value} />,
        // },
        {
            Header: "Actions",
            accessor: "mid", // Assuming 'id' is a unique identifier for each product
            Cell: ({ cell }) => (
                <button onClick={() => handleViewAction(cell.row.original)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill='#9f262d'><path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" /></svg>
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

    const orderFilterFields = [
        {
            labelText: "number",
            labelFor: "number",
            id: "number",
            name: "number",
            type: "text",
            autoComplete: "number",
            placeholder: "Number",
            inputMode: "numeric"
        },
        {
            labelText: "Customer email",
            labelFor: "email",
            id: "email",
            name: "email",
            type: "email",
            autoComplete: "email",
            placeholder: "Email",
            inputMode: "email"
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
                { value: "", label: "All" },
                { value: "fulfilled", label: "fulfilled" },
                { value: "partial", label: "partial" },
            ],
        },
    ]

    return { orderDataFields, orderFilterFields, actionFields, perPages };
}


// export { orderDataFields, orderFilterFields, actionFields, perPages }