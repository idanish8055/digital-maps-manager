import React, { useState } from 'react';

const StatusButton = ({ isUpdating, isSuccess, isError, onClick, updateMessage, type, buttonMessage }) => {
    return (
        <button
            style={{ minWidth: '120px' }}
            className={`w-full capitalize flex items-center justify-center px-4 py-2 border border-transparent text-xs font-medium rounded-lg text-white ${isSuccess ? 'bg-green-500' : isError ? 'bg-red-500' : 'bg-primary-600 hover:bg-primary-700'
                }`}
            disabled={isUpdating || isSuccess}
            onClick={onClick}
            type={type}
        >
            {isUpdating ? (
                <svg className="animate-spin h-3 w-3 mr-3 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-1.647zm4-1.647l3 1.647C11.865 17.824 13 15.042 13 12H8a7.962 7.962 0 01-.729 3.291z"
                    />
                </svg>
            ) : isSuccess ? (
                <svg className="h-3 w-3 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        fillRule="evenodd"
                        d="M17.707 5.293a1 1 0 010 1.414l-10 10a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L7 14.586l9.293-9.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                    />
                </svg>
            ) : isError ? (
                <svg className="h-3 w-3 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm0-9a1 1 0 00-1 1v3a1 1 0 102 0V8a1 1 0 00-1-1zm0 6a1 1 0 100 2 1 1 0 000-2z"
                        clipRule="evenodd"
                    />
                </svg>
            ) : null}

            {isUpdating ? 'Updating..' : isSuccess ? updateMessage : isError ? updateMessage : buttonMessage}
        </button>
    );
};

export default StatusButton;
