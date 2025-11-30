import React from "react";


export default function FormAction({
    handleSubmit,
    type = 'Button',
    action = 'submit',
    classes,
    disabled,
    text,
    isSubmitted,
    filterAction
}) {
    return (
        <>
            {
                type === 'Button' ?
                <button
                    type={action}
                    className={`${classes} group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md ${disabled ? 'text-gray-400 bg-primary-400 cursor-not-allowed' : 'text-white bg-primary-600 hover:bg-primary-700'} mt-10`} 
                    onClick={handleSubmit}
                    disabled={disabled}
                    data-action={filterAction}
                >
                    {isSubmitted === false ? <svg className="animate-spin h-6 w-6 mr-3 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-1.647zm4-1.647l3 1.647C11.865 17.824 13 15.042 13 12H8a7.962 7.962 0 01-.729 3.291z"
                        />
                    </svg> : text}
                </button> : <></>
            }
        </>
    )
}