import React, { useEffect, useState } from "react";
import classNames from "classnames";

const InvoiceUpload = ({ onUpload, csvStatusUpdate, loader, pdfUploadError, orderId }) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');

  const onFileChange = (event) => {
    const file = event.target.files[0];
    const fileSize = Math.round(file.size/1024);
    if (file) {
      if (file.type === "application/pdf") {
        setFiles([file]);
        setError("");
      } 
      else {
        setFiles([]);
        setError("Please select a PDF file.");
      }

      if(fileSize > 10240){
        setFiles([]);
        setError("File is too large. File size should not exceed 10 MB");
      }
    }
  };

  const onUploadClick = () => {
    if (files.length > 0) {
      const formData = new FormData();
      formData.append("files", files[0]);
      onUpload(formData);
      setFiles([]);
      setError("");
    } else {
      setError("Please select a PDF file.");
    }
  };

  const onCancelClick = () => {
    if (files.length > 0) {
      setFiles([]);
      setError("");
      // Reset the file input value
      const fileInput = document.querySelector("#csv-file-input");
      if (fileInput) {
        fileInput.value = "";
      }
    }
  };

  const submitBulkUpdateForm = (e) => {
    e.preventDefault();
    // Handle form submission here
    const action = e.nativeEvent.submitter.getAttribute("data-action");
    if (action.includes("upload")) {
      onUploadClick();
    } else {
      onCancelClick();
    }
  };

  const dropzoneClass = classNames(
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "border-2",
    "border-dashed",
    "border-gray-400",
    "rounded-lg",
    "h-40",
    "w-full",
    { "bg-gray-200": files.length > 0 }
  );

  const buttonClass = classNames(
    "px-4",
    "py-2",
    "border",
    "border-transparent",
    "text-base",
    "font-medium",
    "rounded-md",
    "text-white",
    "bg-indigo-600",
    "hover:bg-indigo-700",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
    "focus:ring-indigo-500"
  );

  return (
    <form id="form" onSubmit={submitBulkUpdateForm} encType="multipart/form-data">
      <div className="flex flex-col items-center justify-center w-full">
        <div className={dropzoneClass}>
          {loader ? (
            <div className="loader">
              <div className="loader">
                <div className="flex justify-center items-center h-full	">
                  <div className="h-12 w-12 text-indigo-700 flex items-center">
                    <div className="h-12 w-12 animate-bounce">
                      <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin" fill="#7c3aed" stroke="#7c3aed" strokeWidth="0" viewBox="0 0 16 16">
                        <path d="M8 0c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zM8 4c2.209 0 4 1.791 4 4s-1.791 4-4 4-4-1.791-4-4 1.791-4 4-4zM12.773 12.773c-1.275 1.275-2.97 1.977-4.773 1.977s-3.498-0.702-4.773-1.977-1.977-2.97-1.977-4.773c0-1.803 0.702-3.498 1.977-4.773l1.061 1.061c0 0 0 0 0 0-2.047 2.047-2.047 5.378 0 7.425 0.992 0.992 2.31 1.538 3.712 1.538s2.721-0.546 3.712-1.538c2.047-2.047 2.047-5.378 0-7.425l1.061-1.061c1.275 1.275 1.977 2.97 1.977 4.773s-0.702 3.498-1.977 4.773z"></path>
                      </svg>
                    </div>
                    {/* <div className="h-5 w-4 animate-bounce border-l-2 border-gray-200" style={{ transform: "rotate(-90deg)" }}></div>
                    <div className="h-5 w-4 animate-bounce border-r-2 border-gray-200" style={{ transform: "rotate(90deg)" }}></div> */}
                  </div>
                </div>
              </div>
            </div>
          ) : csvStatusUpdate ? (
            <div className="flex items-center flex-col">
              <div
                className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100"
              >
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <p className="text-lg font-medium text-gray-500">Uploaded successfully!</p>
            </div>
          ) : pdfUploadError ? (
            <p className="text-red-500 mt-2">Error on uploading the file please try again</p>
          ) : files.length > 0 ? (
            <p className="text-lg font-medium text-gray-500">{files[0].name}</p>
          ) : (
            <>
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={onFileChange}
              />
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <button type="button" className="mb-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900" onClick={() => document.querySelector("#csv-file-input").click()}>
                  <svg aria-hidden="true" className="w-full h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                  <span className="font-semibold">Click to upload</span></button>
                <p className="text-xs text-gray-500 dark:text-gray-400">PDF (MAX. 10mb)</p>
              </div>
            </>
          )}
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}
        {files.length > 0 && (
          <div className="flex place-self-end">
            <div className="mt-4">
              <button type="submit" className={buttonClass} data-action="upload">
                Upload
              </button>
            </div>
            <div className="mt-4 ml-4">
              <button type="submit" className={buttonClass} data-action="cancel">
                Cancel
              </button>
            </div>
          </div>
        )}
        <input
          id="csv-file-input"
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={onFileChange}
        />
        <input type="hidden" value={orderId} name="orderId"/>
      </div>
    </form>
  );
};

export default InvoiceUpload;

