const Action = ({ selectAction, actionFields, handleAction, selectedIndex, bulkOperationData, bulkActionError, role }) => {
    return (
        <>
            {/* <label for="countries" className="whitespace-nowrap block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label> */}
            <div className="flex flex-col" style={{position: "relative"}}>
            <select disabled={selectedIndex && selectedIndex.length > 0 ? false : true} onChange={selectAction} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" style={{ minWidth: "200px" }}>
                {actionFields.map(item => <option value={item.value}>{item.label}</option>)}
            </select>
            {bulkActionError && bulkActionError.error && <span className="text-xs text-red-800" style={{position: "absolute", bottom: -18}}>*{bulkActionError.message}</span>}
            {!bulkActionError && role === "vendor" && <div><span className="w-full text-xs text-black-800" style={{position: "absolute", bottom: -18}}>* For non approved products</span></div>}
            </div>
            <button disabled={selectedIndex && selectedIndex.length > 0 && bulkOperationData.length === 0 ? false : true} onClick={handleAction} className={`py-2 px-5 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 disabled:opacity-75`}>
                Apply
            </button>
        </>
    )
}

export default Action;