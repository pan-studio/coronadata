import { useEffect, useState } from 'react';

const fetchAllRegion = (resolvedData, url) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        let isMounted = true;

        if (isMounted) {
            setData(resolvedData);
            setLoading(false);
        }
        return () => (isMounted = false);
    }, [resolvedData, waitingTime]);

    return { loading, setLoading, data, setData };
};

export default useFakeFetch;
