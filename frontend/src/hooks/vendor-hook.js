import { useEffect, useState } from "react";
import { getUserInfo } from '../utils/api';

const useVendorStatus = () => {
    const [vendorInfo, setVendorInfo] = useState(null);
    const urlArray = ["/", "/resetpassword", "/changepassword", "/signup", "/userverification"];


    useEffect(() => {
        if (!urlArray.includes(window.location.pathname)) {
            let errorObj = {};
            const fetchData = async () => {
                const response = await getUserInfo(localStorage.getItem("selectedProject"));
                const errorType = response.error ? response.code : false;
                if (errorType) {
                    errorObj = response;
                }
                setVendorInfo(response.data != null ? response.data : errorObj);
                return response;
            };
            fetchData();
        }
    }, []);

    return vendorInfo;
}

export default useVendorStatus;