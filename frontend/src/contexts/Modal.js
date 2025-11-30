import React, { useState, useEffect } from 'react';

const Modal = ({ isOpen, onClose, children, heading, size, type, vendorListVisible }) => {
  const [modalOpen, setModalOpen] = useState(isOpen);

  // close modal when user clicks outside of it
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // close modal when user presses escape key
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  // update modal open state when parent prop changes
  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  return (
    <>
      {modalOpen ? (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 ${size ? size : 'sm:align-middle sm:max-w-xl sm:w-full'}`}>
              <div className="bg-primary-600 px-4 py-3 sm:px-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg leading-6 font-medium text-white">{heading}</h4>
                  <button
                    className="text-gray-300 hover:text-white focus:outline-none focus:text-white transition ease-in-out duration-150"
                    onClick={onClose}
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="bg-white px-4 py-3 sm:p-6 " style={type === "vendor" && vendorListVisible ? {height: '550px'} : {}}> {children}</div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
