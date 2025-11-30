const FilterBadge = ({ filterQuery, onRemove }) => {

    return (
        <>
            {Object.keys(filterQuery).map(key =>
                (filterQuery[key] !== '') ?
                    <div className="inline-flex items-center bg-primary text-white text-sm font-medium mr-2 px-2.5 py-0.5 rounded" >
                        {key.replace('_', " ").toLocaleUpperCase()}: {filterQuery[key]}
                        < button className="ml-2 p-1 text-white-500 hover:text-gray-300" onClick={() => onRemove(key)} >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button >
                    </div>
                    :
                    '')}
        </>

    )
};

export default FilterBadge;
