import { useState } from 'react';

const CSVExportSample = ({ csvExportSample }) => {
    const [statusState, setStatusState] = useState({
        isUpdating: false,
        updateMessage: "",
        isSuccess: false,
        isError: false,
    });
    const handleUpdateStatus = async () => {
        setStatusState((prevState) => ({
            ...prevState,
            isUpdating: true,
            updateMessage: "Downloading...",
        }));

        try {
            await csvExportSample();

            setTimeout(() => {
                setStatusState((prevState) => ({
                    ...prevState,
                    isSuccess: true,
                    isUpdating: false,
                    updateMessage: "Done",
                }));
            }, 2000);
            setTimeout(() => {
                setStatusState((prevState) => ({
                    ...prevState,
                    isSuccess: false,
                    isUpdating: false,
                    updateMessage: "",
                }));
            }, 4000);
        } catch (error) {
            setStatusState((prevState) => ({
                ...prevState,
                isError: true,
                isUpdating: false,
                updateMessage: "Failed",
            }));
        }
    };

    return (
        <div className="mr-2">
            <button
                onClick={handleUpdateStatus}
                style={{ minWidth: "130px" }}
                className={`capitalize flex items-center justify-center px-4 py-2 border border-transparent text-xs font-medium rounded-lg text-white ${statusState.isSuccess ? "bg-green-500" : statusState.isError ? "bg-red-500" : "bg-primary-600 hover:bg-primary-700"
                    }`}
                disabled={statusState.isUpdating}
            >
                {statusState.isUpdating ? (
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-1.647zm4-1.647l3 1.647C11.865 17.824 13 15.042 13 12H8a7.962 7.962 0 01-.729 3.291z"
                        />
                    </svg>
                ) : statusState.isSuccess ? (
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            fillRule="evenodd"
                            d="M17.707 5.293a1 1 0 010 1.414l-10 10a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L7 14.586l9.293-9.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                ) : statusState.isError ? (
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm0-9a1 1 0 00-1 1v3a1 1 0 102 0V8a1 1 0 00-1-1zm0 6a1 1 0 100 2 1 1 0 000-2z"
                            clipRule="evenodd"
                        />
                    </svg>
                ) : (
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12 20C6.48 20 2 15.52 2 10C2 4.48 6.48 0 12 0C17.52 0 22 4.48 22 10C22 15.52 17.52 20 12 20ZM12 2C7.59 2 4 5.59 4 10C4 14.41 7.59 18 12 18C16.41 18 20 14.41 20 10C20 5.59 16.41 2 12 2ZM11 7H13V11H16L12 15L8 11H11V7Z"
                            fill="currentColor"
                        />
                    </svg>
                )}

                <span>{statusState.isUpdating
                    ? "Downloading.."
                    : statusState.isSuccess
                        ? statusState.updateMessage
                        : statusState.isError
                            ? statusState.updateMessage
                            : "Sample CSV"}</span>
            </button>
        </div>
    );
};

export default CSVExportSample;
