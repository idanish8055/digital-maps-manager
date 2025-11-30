import React, { useEffect, useState, useRef } from 'react';
import FormAction from '../contexts/FormAction';
import RandomAvatar from '../contexts/RandomAvatar';

const SelectOptions = ({ vendorsData, vendorError, selectVendor, type, setVendorListVisible , isSubmittedVendor, vendorId}) => {
    const [vendors, setVendors] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredVendors, setFilteredVendors] = useState(vendors);
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState('');
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);
    const initialVendorsData = useRef('');

    useEffect(() => {
        initialVendorsData.current = vendorsData;
        if (
            initialVendorsData.current &&
            initialVendorsData.current.length > 0 &&
            vendors.length === 0
        ) {
            setVendors(initialVendorsData.current);
            setError(vendorError);
            setFilteredVendors(initialVendorsData.current);
        }
        let vendorIsExist = vendorsData && vendorsData.filter(vendor => vendor.user_id === vendorId);
        setSearchTerm(vendorId && vendorId !== null ? vendorIsExist[0]?.username : '');
    }, [vendorsData, vendorError, vendors]);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target) &&
                inputRef.current &&
                !inputRef.current.contains(e.target)
            ) {
                setIsOpen(false);
            }
        };

        if(type !== "modal"){
            document.addEventListener('click', handleOutsideClick);

            return () => {
                document.removeEventListener('click', handleOutsideClick);
            };
        }
        
    }, []);

    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchTerm(searchTerm);
        if (vendors && vendors.length > 0) {
            const filtered = vendors.filter((vendor) =>
                vendor.username && vendor.username.toLowerCase().includes(searchTerm)
            );
            setFilteredVendors(filtered);
        }
        setSelectedVendor('');
        setIsOpen(true);
    };

    const handleSelectVendor = (vendor) => {
        setSelectedVendor(vendor.user_id);
        setSearchTerm(vendor.username);
        setIsOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        selectVendor(selectedVendor);
    };

    const handleInputFocus = () => {
        setIsOpen(true);
    };

    useEffect(()=>{
        setVendorListVisible && setVendorListVisible(isOpen);
    }, [isOpen]);

    useEffect(()=>{
        type === "modal" && setIsOpen(true);
    },[]);

    return (
        <form onSubmit={handleSubmit} className={type === "modal" ? 'w-full bg-gray-50 space-y-6 rounded-md sticky top-0' : 'w-full bg-gray-50 mt-8 space-y-6 rounded-md shadow-md border p-4 py-6 sticky top-0'}>
            <div className="-space-y-px">
                <div className='mb-4'>
                    <label htmlFor="vendor-search" className="block text-sm font-medium text-gray-700">
                        Search Vendor:
                    </label>
                    <input
                        type="text"
                        id="vendor-search"
                        value={searchTerm}
                        onChange={handleSearch}
                        onFocus={handleInputFocus}
                        placeholder="Enter vendor's name..."
                        ref={inputRef}
                        className="mt-3 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        style={{
                            position: 'relative',
                            MozAppearance: 'none',
                            WebkitAppearance: 'none',
                            appearance: 'none',
                            border: 'none',
                            border: '1px solid #d1d5db',
                            background: `white url("data:image/svg+xml;utf8,<svg viewBox='0 0 140 140' width='14' height='14' xmlns='http://www.w3.org/2000/svg'><g><path d='m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z' fill='black' /></g></svg>") no-repeat right 5px top 50%`,
                        }}
                    />
                    {error &&
                        <div className="bg-red-100 border border-red-200 text-red-700 px-2 py-2 rounded relative" role="alert">
                            <span className="block sm:inline text-xs">{error}</span>
                        </div>
                    }
                </div>
                {isOpen && filteredVendors.length > 0 && (
                    <div ref={dropdownRef} className="relative mt-2">
                        <ul className="absolute z-10 w-full bg-white rounded shadow-md overflow-auto" style={type === "modal" ? { maxHeight: '400px' } : {maxHeight: '250px'}}>
                            {filteredVendors.map((vendor, i) => (
                                <li
                                    key={i}
                                    onClick={() => handleSelectVendor(vendor)}
                                    className="cursor-pointer hover:bg-gray-300"
                                >
                                    <div className="p-3 bg-gray-100 rounded bg-primary-50 mb-2 hover:bg-gray-300">
                                        <div className='mb-2 space-y-5'>
                                            <div className="flex items-center gap-3">
                                                <div className="relative inline-flex shrink-0 items-center justify-center outline-none h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-500/20 text-primary-500 shrink-0">
                                                    <div className="flex h-full w-full items-center justify-center overflow-hidden text-center transition-all duration-300 rounded-full">
                                                        <RandomAvatar className="max-h-full max-w-full object-cover shadow-sm dark:border-transparent h-10 w-10" customKey={i} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="font-heading text-sm font-light leading-tight text-muted-800 dark:text-white">
                                                        <span>{vendor.username}</span>
                                                    </h4>
                                                    <p className="mb-0 text-gray-500 dark:text-white/70 text-xs flex font-normal"> {vendor.products} Products
                                                        <svg className="fill-primary w-4 h-4 ltr:ml-2 rtl:mr-2" xmlns="http://www.w3.org/2000/svg" width="100" height="100" enableBackground="new 0 0 100 100" viewBox="0 0 100 100">
                                                            <path className="fill-blue-500" d="M88.057,45.286l-5.456-5.455c-1.295-1.295-2.356-3.854-2.356-5.689v-7.715c0-3.67-2.998-6.668-6.667-6.67h-7.718  c-1.833,0-4.395-1.063-5.69-2.357l-5.455-5.455c-2.592-2.592-6.836-2.592-9.428,0l-5.455,5.459c-1.296,1.295-3.861,2.355-5.69,2.355  h-7.715c-3.665,0-6.667,2.998-6.667,6.668v7.715c0,1.828-1.061,4.395-2.356,5.689l-5.456,5.455c-2.594,2.592-2.594,6.836,0,9.432  l5.456,5.455c1.296,1.295,2.356,3.861,2.356,5.689v7.715c0,3.666,3.002,6.668,6.667,6.668h7.715c1.833,0,4.395,1.061,5.69,2.355  l5.455,5.457c2.592,2.59,6.836,2.59,9.428,0l5.455-5.457c1.296-1.295,3.857-2.355,5.69-2.355h7.718c3.669,0,6.667-3.002,6.667-6.668  v-7.715c0-1.836,1.062-4.395,2.356-5.689l5.456-5.455C90.647,52.122,90.647,47.878,88.057,45.286z M44.709,65.001L30,50.29  l4.714-4.713l9.996,9.996l20.577-20.572L70,39.714L44.709,65.001z"></path>
                                                        </svg>
                                                    </p>
                                                </div>
                                                <div className="ms-auto flex items-center">
                                                    <span
                                                        className={`text-sm px-2 py-1 text-sm font-semibold rounded ${vendor.status === false
                                                            ? 'bg-yellow-500 text-white'
                                                            : 'bg-green-500 text-white'
                                                            }`}
                                                    >
                                                        {vendor.status === false ? "Deactivate" : "Active"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div >
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {filteredVendors.length === 0 && <p>No vendors found.</p>}

                <div className="flex justify-end mt-6">
                    <FormAction text="Assign Vendor" isSubmitted={isSubmittedVendor} disabled={isSubmittedVendor === false ? true : !selectedVendor}/>
                </div>
            </div>
        </form>
    );
};

export default SelectOptions;
