const PerPage = ({ perPages, changePage }) => {
    return (
        <>
            {/* <label for="itemsshow" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Show Items</label> */}
            <select onChange={changePage} id="itemsshow" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                {perPages.map(item => <option value={item.value}>{item.label}</option>)}
            </select>
        </>
    )
}

export default PerPage;
