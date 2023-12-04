import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"

const usePreviousLocation = () => {
    const location = useLocation();
    const previousLocationRef = useRef(null);

    useEffect(() => {
        previousLocationRef.current = location.pathname;
    }, [location.pathname]);

    return previousLocationRef.current;
}

export default usePreviousLocation;