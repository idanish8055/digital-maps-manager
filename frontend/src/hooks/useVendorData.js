import { useEffect, useState } from "react";
import { vendorData, } from '../utils/api';

const useVendorData = (queryString) => {
    const [vendors, setVendors] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await vendorData(queryString);
                setVendors(response.data);
                setError(null);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [queryString]);
    return { vendors, error, loading };
};

export default useVendorData;
