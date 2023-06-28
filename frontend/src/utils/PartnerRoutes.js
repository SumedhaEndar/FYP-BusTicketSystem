import { Outlet, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

const PartnerRoutes = () => {
    const {user} = useAuthContext()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 1000); // Set the desired time delay in milliseconds
    
        return () => clearTimeout(timer);
    }, []);

    // Loading state while checking authentication
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return(
        (user && user.role === "Partner") ? <Outlet/> : <Navigate to="/partner-login"/>
    )
}

export default PartnerRoutes