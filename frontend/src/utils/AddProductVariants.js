import React, { useState } from "react";
import { useNavigate } from "react-router";
import Loader from '../../contexts/Loader';
import Breadcrumb from "../../contexts/Breadcrumb";
import { addProductFields, addProductOptionsFields } from "../../utils/addProductFields";
import Input from "../../contexts/Input";
import StatusPill from '../../components/datalist/StatusPill';
import FormAction from "../../contexts/FormAction";
import { ProductImageUpload } from "../../contexts/ProductImageUpload";
import CGMDescription from "../../components/quill/CGMDescription";
import { addShopifyProduct } from "../../utils/addShopifyProduct";

const AddProduct = () => {
    const [showLoader, setShowLoader] = useState(true);
    const [productImages, setProductImages] = useState([]);
    const [richText, setRichText] = useState('');
    const [showOption, setShowOption] = useState(false);
    const navigate = useNavigate();

    const fields = addProductFields;
    let fieldsState = {};
    fields.forEach(field => fieldsState[field.id] = '');

    const optionFields = addProductOptionsFields;
    let optionFiledsState = {};
    optionFields.forEach(field => fieldsState[field.id] = '');


    const [addproduct, setAddProduct] = useState(fieldsState);

    const handleChange = (e) => {
        setAddProduct({ ...addproduct, [e.target.id]: e.target.value });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        // Check which button was clicked
        const action = e.nativeEvent.submitter.innerHTML.toLowerCase();
        if (action.includes('cancel')) {
            navigate(-1, { replace: true });
        } else {
            addShopifyProduct(addproduct, productImages, richText)
        }
    }

    const handleImageUpload = (files) => {
        setProductImages([...productImages, ...files]);
    };

    const handleRemoveImage = (index) => {
        const newImages = [...productImages];
        newImages.splice(index, 1);
        setProductImages(newImages);
    };

    const handleTextChange = (value) => {
        setRichText(value);
    };

    const handleOptions = () => {
        setShowOption(true);
    }

    const handleOptionAdd = () => {

    }

    return (
        <>
            {showLoader ?
                (<Loader setShowLoader={setShowLoader} />) :
                (<div className='border-b pb-6'>
                    <div className="flex flex-col items-start justify-between pb-1 space-y-4 lg:items-center lg:space-y-0 lg:flex-row">
                        <h1 className="text-2xl font-semibold whitespace-nowrap">Product Add</h1>
                    </div>
                    <p className="text-xs pb-4 text-gray-800">Create New product</p>
                    <Breadcrumb />
                </div>)
            }

            <div className="rounded-md border p-4 m-2">
                <form className="space-y-6 p-3" onSubmit={handleSubmit}>
                    <div className="flex flex-wrap -mx-2 overflow-y-auto hover:overflow-y-auto">
                        {fields.map((field) => (
                            field.id !== 'options' ? (
                                <div className="w-full lg:w-1/4 px-2" key={field.id}>
                                    <label className="block -mb-2">
                                        <span className="text-md font-medium text-slate-700 mb-0">{field.placeholder}</span>
                                    </label>
                                    {field.type === 'select' ? (
                                        <Input
                                            key={field.id}
                                            handleChange={handleChange}
                                            value={addproduct[field.id]}
                                            labelText={field.labelText}
                                            labelFor={field.labelFor}
                                            id={field.id}
                                            name={field.name}
                                            type={field.type}
                                            isRequired={field.isRequired}
                                            placeholder={field.placeholder}
                                            options={field.options}
                                        />
                                    ) : (
                                        <Input
                                            key={field.id}
                                            handleChange={handleChange}
                                            value={addproduct[field.id]}
                                            labelText={field.placeholder}
                                            labelFor={field.placeholder}
                                            id={field.id}
                                            name={field.name}
                                            type={field.type}
                                            isRequired={field.isRequired}
                                            placeholder={field.placeholder}
                                            options={field.options}
                                            pattern={field.pattern}
                                            inputMode={field.inputMode}
                                        />
                                    )}
                                </div>
                            ) : null // exclude options field
                        ))}
                        <div className="w-full">
                            <label className="block mb-2">
                                <span className="text-md font-medium text-slate-700 mb-0">Variants</span>
                            </label>
                            <button onClick={handleOptions}>Add options like size or color</button>
                            {showOption ? (
                                <>
                                    <Input
                                        key={fields.optionsName.id}
                                        handleChange={handleChange}
                                        value={addproduct[fields.optionsName.id]}
                                        labelText={fields.optionsName.placeholder}
                                        labelFor={fields.optionsName.placeholder}
                                        id={fields.optionsName.id}
                                        name={fields.optionsName.name}
                                        type={fields.optionsName.type}
                                        isRequired={fields.optionsName.isRequired}
                                        placeholder={fields.optionsName.placeholder}
                                        options={fields.optionsName.options}
                                        pattern={fields.optionsName.pattern}
                                        inputMode={fields.optionsName.inputMode}
                                    />
                                    <button onClick={handleOptionAdd}>Add in variant</button>
                                </>
                            ) : null}
                        </div>
                    </div>
                    <div className="w-full">
                        <label className="block mb-2">
                            <span className="text-md font-medium text-slate-700 mb-0">Product Description</span>
                        </label>
                        <CGMDescription value={richText} onChange={handleTextChange} readOnly={false} />
                    </div>
                    <ProductImageUpload onUpload={handleImageUpload} images={productImages} onRemoveImage={handleRemoveImage} />
                    <div className="flex gap-4 w-32">
                        <FormAction text="Save" data-action="save" />
                        <FormAction text="Cancel" classes="bg-red-500 hover:bg-red-700" data-action="cancel" />
                    </div>
                </form>



            </div>
        </>
    );


}

export default AddProduct;