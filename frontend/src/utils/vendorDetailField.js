export const vendorDetailFiled = [
    {
        labelText: "Username",
        labelFor: "username",
        id: "username",
        name: "username",
        type: "text",
        autoComplete: "username",
        placeholder: "Username",
        isReadonly: true
    },
    {
        labelText: "Email address",
        labelFor: "email",
        id: "email",
        name: "email",
        type: "email",
        autoComplete: "email",
        placeholder: "Email address",
        isReadonly: true
    },
    {
        labelText: "Role",
        labelFor: "role",
        id: "role",
        name: "role",
        type: "text",
        placeholder: "Role",
        isReadonly: true
    },
    {
        id: "status",
        name: "status",
        type: "select",
        labelText: "Status",
        labelFor: "status",
        placeholder: "Select status",
        options: [
            { value: "true", label: "Active" },
            { value: "false", label: "InActive" },
        ],
    },
]

export const vendorAccuntCreateFiled = [
    {
        labelText: "Username",
        labelFor: "username",
        id: "username",
        name: "username",
        type: "text",
        autoComplete: "username",
        placeholder: "Username",
    },
    {
        labelText: "Email address",
        labelFor: "email",
        id: "email",
        name: "email",
        type: "email",
        autoComplete: "email",
        placeholder: "Email address",
    },
    {
        labelText: "Role",
        labelFor: "role",
        id: "role",
        name: "role",
        type: "text",
        placeholder: "Role",
        isReadonly: true
    },
    {
        id: "status",
        name: "status",
        type: "select",
        labelText: "Status",
        labelFor: "status",
        placeholder: "Select status",
        options: [
            { value: "true", label: "Active" },
            { value: "false", label: "InActive" },
        ],
    },
    {
        labelText: "Password",
        labelFor: "password",
        id: "password",
        name: "password",
        type: "password",
        autoComplete: "current-password",
        isRequired: true,
        placeholder: "Password",
        isReadonly: true
    }
]