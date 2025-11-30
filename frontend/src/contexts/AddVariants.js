import React, { useState, useEffect } from 'react';


const AddVariants = ({ rows, setRows, closeModal, variantList, initialRowData, setError }) => {
    const [error, setErrorVariant] = useState('');
    
    const [optionNames, setOptionNames] = useState({
        option1Name: '',
        option2Name: '',
        option3Name: '',
    });

    const handleChange = (index, field, value) => {
        const updatedRows = [...rows];
        if (index !== 0 && ['option1Name', 'option2Name', 'option3Name'].includes(field)) {
            // Update option names only in the first row
            updatedRows[index] = {
                ...updatedRows[index],
                [field]: rows[0][field],
            };
        } else {
            // Assign option names from the first row to the rest of the rows
            updatedRows[index] = {
                ...updatedRows[index],
                [field]: value,
            };
        }

        const optionValues = Object.keys(updatedRows[index])
            .filter((key) => key.includes('Value'))
            .map((key) => updatedRows[index][key]);

        const nonEmptyValues = optionValues.filter(value => value.trim() !== '');
        updatedRows[index].variantName = nonEmptyValues.length > 1 ? nonEmptyValues.join('/') : nonEmptyValues[0];

        if(updatedRows.length > 1){
            let opt1Name = updatedRows[0].option1Name;
            let opt2Name = updatedRows[0].option2Name;
            let opt3Name = updatedRows[0].option3Name;
            updatedRows.map((row, index) => {
                if(index !== 0){
                    row.option1Name = opt1Name;
                    row.option2Name = opt2Name;
                    row.option3Name = opt3Name;
                }
                return row;
            });
        }

        setRows(updatedRows);
    };

    useEffect(() => {
        rows.map((row) => {
            if(row.sku === '' || row.price === '' || row.option1Name === '' || row.option1Value === '' || row.quantity === ''){
                setErrorVariant("*Required fields are empty.")
            }
            else if(isNaN(+row.price)){
                setErrorVariant("*Price must be a number.")
            }
            else if(isNaN(+row.quantity)){
                setErrorVariant("*Quantity must be a number.")
            }
            else{
                setErrorVariant("")
            }
        });
    }, [rows]);

    const handleAddRow = () => {
        initialRowData.option1Name = rows[0].option1Name;
        initialRowData.option2Name = rows[0].option2Name;
        initialRowData.option3Name = rows[0].option3Name;
        setRows([...rows, initialRowData]);
    };

    const handleSave = () => {
        const validRows = rows.filter(row => {
            const values = Object.values(row);
            return values.some(value => value.trim() !== '');
        });
        variantList(validRows);
        handleCancel();
    };
    
    const handleRemoveRow = (index) => {
        const updatedRows = [...rows];
        updatedRows.splice(index, 1);
        setRows(updatedRows);
    };

    const handleCancel = () => {
        setError(error !== '' ? error : null);
        closeModal(false);
    };

    return (
        <div className="container mx-auto">
            <div className='overflow-auto'>
                <div className='p-2'>
                    <p className='text-black-500 text-sm'><span className='font-bold'>Note:</span> Option1 Name, Option1 Value, Price, SKU, Quantity is required.</p>
                </div>
                <table className="w-full border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2 text-xs w-1/12">Option1 Name <span className="text-red-500">*</span></th>
                            <th className="border px-4 py-2 text-xs w-1/12">Option1 Value <span className="text-red-500">*</span></th>
                            <th className="border px-4 py-2 text-xs w-1/12">Option2 Name</th>
                            <th className="border px-4 py-2 text-xs w-1/12">Option2 Value</th>
                            <th className="border px-4 py-2 text-xs w-1/12">Option3 Name</th>
                            <th className="border px-4 py-2 text-xs w-1/12">Option3 Value</th>
                            <th className="border px-4 py-2 text-xs w-2/12">Variant Name</th>
                            <th className="border px-4 py-2 text-xs w-1/12">Price <span className="text-red-500">*</span></th>
                            <th className="border px-4 py-2 text-xs w-1/12">Compare At Price</th>
                            <th className="border px-4 py-2 text-xs w-1/12">Quantity <span className="text-red-500">*</span></th>
                            <th className="border px-4 py-2 text-xs w-1/12">SKU <span className="text-red-500">*</span></th>
                            <th className="border px-4 py-2 text-xs w-1/12">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => (
                            <tr key={index} className="border">
                                <td className="border">
                                    <input
                                        type="text"
                                        value={row.option1Name}
                                        onChange={(e) => handleChange(index, 'option1Name', e.target.value)}
                                        className={`w-full px-4 py-2 text-xs ${row.option1Name === '' ? 'border border-red-500' : ''}`}
                                        placeholder='name'
                                    />
                                </td>
                                <td className="border">
                                    <input
                                        type="text"
                                        value={row.option1Value}
                                        onChange={(e) => handleChange(index, 'option1Value', e.target.value)}
                                        className={`w-full px-4 py-2 text-xs ${row.option1Value === '' ? 'border border-red-500' : ''}`}
                                        placeholder='value'
                                    />
                                </td>
                                <td className="border">
                                    <input
                                        type="text"
                                        value={row.option2Name}
                                        onChange={(e) => handleChange(index, 'option2Name', e.target.value)}
                                        className="w-full px-4 py-2 text-xs"
                                        placeholder='name'
                                    />
                                </td>
                                <td className="border">
                                    <input
                                        type="text"
                                        value={row.option2Value}
                                        onChange={(e) => handleChange(index, 'option2Value', e.target.value)}
                                        className="w-full px-4 py-2 text-xs"
                                        placeholder='value'
                                    />
                                </td>
                                <td className="border">
                                    <input
                                        type="text"
                                        value={row.option3Name}
                                        onChange={(e) => handleChange(index, 'option3Name', e.target.value)}
                                        className="w-full px-4 py-2 text-xs"
                                        placeholder='name'
                                    />
                                </td>
                                <td className="border">
                                    <input
                                        type="text"
                                        value={row.option3Value}
                                        onChange={(e) => handleChange(index, 'option3Value', e.target.value)}
                                        className="w-full px-4 py-2 text-xs"
                                        placeholder='value'
                                    />
                                </td>
                                <td className="border px-4 py-2 text-xs">{row.variantName}</td>
                                <td className="border">
                                    <input
                                        type="number"
                                        value={row.price}
                                        onChange={(e) => handleChange(index, 'price', e.target.value)}
                                        className={`w-full px-4 py-2 text-xs ${row.price === '' ? 'border border-red-500' : ''}`}
                                        placeholder='price'
                                    />
                                </td>
                                <td className="border">
                                    <input
                                        type="number"
                                        value={row.compareAtPrice}
                                        onChange={(e) => handleChange(index, 'compareAtPrice', e.target.value)}
                                        className={`w-full px-4 py-2 text-xs`}
                                        placeholder='price  '
                                    />
                                </td>
                                <td className="border">
                                    <input
                                        type="number"
                                        value={row.quantity}
                                        onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                                        className={`w-full px-4 py-2 text-xs ${row.quantity === '' ? 'border border-red-500' : ''}`}
                                        placeholder='quantity'
                                    />
                                </td>
                                <td className="border">
                                    <input
                                        type="text"
                                        value={row.sku}
                                        onChange={(e) => handleChange(index, 'sku', e.target.value)}
                                        className={`w-full px-4 py-2 text-xs ${row.sku === '' ? 'border border-red-500' : ''}`}
                                        placeholder='sku'
                                    />
                                </td>
                                <td className="border">
                                    <a
                                        className={`${index === 0 ? 'text-red-300 cursor-not-allowed' : 'cursor-pointer text-red-600 hover:text-red-800'} `}
                                        onClick={index === 0 ? (e)=>{e.preventDefault();} : () => handleRemoveRow(index)}
                                    >
                                        <div className="icon-trash" style={{ float: "left" }}>
                                            <div className="trash-lid" style={index === 0 ? {backgroundColor: "rgb(243 107 125)"} : { backgroundColor: "#e01832" }}></div>
                                            <div className="trash-container" style={index === 0 ? {backgroundColor: "rgb(243 107 125)"} : { backgroundColor: "#e01832" }}></div>
                                            <div className="trash-line-1"></div>
                                            <div className="trash-line-2"></div>
                                            <div className="trash-line-3"></div>
                                        </div>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table >
            </div>
            <p className="text-sm text-red-500">{error}</p>
            <div className="mt-4 flex justify-end">
                <a className={`text-white font-bold py-2 px-4 mr-2 rounded ${error !== '' ? 'bg-primary-300' : 'cursor-pointer bg-primary-500 hover:bg-primary-700'}`} onClick={error !== '' ? (event)=>{event.preventDefault();} : handleAddRow}>
                    Add Row
                </a>
                <a className={`text-white font-bold py-2 px-4 rounded ${error !== '' ? 'bg-green-300' : 'cursor-pointer bg-green-500 hover:bg-green-700'}`} onClick={error !== '' ? (event)=>{event.preventDefault();} : handleSave}>
                    Save
                </a>
                <a className="cursor-pointer ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleCancel}>
                    Cancel
                </a>
            </div>
        </div >
    );
};

export default AddVariants;
