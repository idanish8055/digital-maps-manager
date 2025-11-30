import React, { useState, useEffect } from 'react';
import StatusPill from './StatusPill';
import FormAction from '../../contexts/FormAction';
import Input from '../../contexts/Input';
import useVendorData from '../../hooks/useVendorData';

const CustomFilter = ({ fields, fetchData, setFilterQuery, setShowCart, filterQuery }) => {
  const { vendors, error, loading } = useVendorData();


  const [filter, setFilter] = useState({});

  const fieldsState = {};
  fields.forEach((field) => {
    if (field.id === 'vendor') {
      fieldsState[field.id] = vendors && vendors.length ? vendors[0].id : '';
    } else {
      fieldsState[field.id] = '';
    }
  });
  
  const handleChange = (e) => {
    setFilter({ ...filter, [e.target.id]: e.target.value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.getAttribute('data-action');
    
    if(Object.keys(filter).length > 0){
      if (action && action.toLowerCase().includes('reset')) {
        const blankFilter = {};
        fields.forEach((field) => {
          blankFilter[field.id] = '';
        });
        setFilter(blankFilter);
        setFilterQuery({});
      } else {
        setFilterQuery(filter);
        setShowCart(false);
      }
    }
    else{
      setShowCart(false);
    }
  };

  useEffect(()=>{
    if(Object.keys(filterQuery).length > 0){
      setFilter({ ...filterQuery });
    }
  }, []);
  
  const resetFilterField = (event, field) =>{
    event.preventDefault();
    delete filter[field];
    setFilter({...filter });
  }

  return (
    <div>
      <form className="space-y-6 p-3" onSubmit={handleSubmit}>
        <div className="flex-1 overflow-y-auto hover:overflow-y-auto">
          {fields.map((field) => (
            <React.Fragment key={field.id + field.name}>
              <label className="block -mb-2">
                <span className="text-md font-medium text-slate-700 mb-0">{field.placeholder}</span>
                {field.type === "select" && <button className="button text-sm ml-3 text-primary-700" onClick={(e)=>{ resetFilterField(e, field.id);}}>Reset</button>}
              </label>
              {field.type === 'select' ? (
                <>
                  {field.id === 'vendor' && error !== '' && <div>{error}</div>}
                  <Input
                    key={field.id}
                    handleChange={handleChange}
                    value={filter[field.id] || ''}
                    labelText={field.labelText}
                    labelFor={field.labelFor}
                    id={field.id}
                    name={field.name}
                    type={field.type}
                    isRequired={field.isRequired}
                    placeholder={field.placeholder}
                    options={field.id === 'vendor'
                      ? vendors
                        ? [...vendors.map((vendor) => ({ value: vendor.user_id, label: vendor.username }))]
                        : [{ value: '', label: 'No Vendor' }]
                      : field.options}
                    defaultValue={filter[field.id]}
                  />
                  {/* {field.id === 'status' && <StatusPill value={filter[field.id]} />} */}
                </>
              ) : (
                <Input
                  key={field.id}
                  handleChange={handleChange}
                  value={filter[field.id] || ''}
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
            </React.Fragment>
          ))}
        </div>

        <div className="flex gap-2 border-t absolute bottom-0 w-full p-2 md:p-4 pl-2 md:pl-4 left-0" role="group">
          <FormAction text="Apply Filter" filterAction="apply" />
          <FormAction text="Reset Filter" filterAction="reset" />
        </div>
      </form>
    </div>
  );
};

export default CustomFilter;
