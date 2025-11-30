const Pagination = ({ handleNext, handlePrev, count, size, page, handlePageChange }) => {
    return (
        <>
            <div className="flex items-center justify-center space-x-4">
                <button className="p-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500" onClick={handlePrev}>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                </button>
                <input type="text" value={page} onChange={handlePageChange} className="border border-gray-300 rounded py-2 px-4" style={{ maxWidth: "100px" }} />
                <span className="text-gray-500">of</span>
                <span className="font-bold">{Math.ceil(count / size)}</span>
                <button className="p-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500" onClick={handleNext}>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>
            </div>

        </>
    )
}

export default Pagination;