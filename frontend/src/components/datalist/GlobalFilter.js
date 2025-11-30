import react, { useState , useEffect ,useRef } from "react";
import { useTable, useGlobalFilter, useAsyncDebounce } from 'react-table' 

// Define a UI for filtering


function GlobalFilter({
    globalFilter,
    setGlobalFilter,
    placeholder
  }) {
    const [value, setValue] = useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
      setGlobalFilter(value || undefined)
    }, 200)



    return (
      <>
      <div className="flex items-center justify-between pb-4 pt-4 pr-4 mb-4">
        <div className='items-center hidden  space-x-2 md:flex-1 md:flex '>
          <span className='w-5/6'>
            <input
              value={value || ""}
              onChange={e => {
                setValue(e.target.value);
                onChange(e.target.value);
              }}
              className='w-5/6 rounded-xl border p-3 text-gray-500 cursor-pointer' 
              type="search"  
              placeholder="Search..."
            />
          </span>
        </div>
      </div>
    </>
    )
  };  

  export default GlobalFilter;